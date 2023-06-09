import React, { useRef, useState } from "react";
import "./SignIn.css";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert, Stack } from "@mui/material";

function SignIn() {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState("");
  const signInHandler = (event) => {
    event.preventDefault();
    const mail = emailRef.current.value;
    const pass = passRef.current.value;
    if (mail === "") {
      setError(<Alert severity="error">Email is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (pass === "") {
      setError(<Alert severity="error">Password is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      event.preventDefault();
      auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passRef.current.value
        )
        .then((authUser) => {
          // console.log(authUser);
        })
        .catch((error) => {
          setError(<Alert severity="error">Wrong Email or Password</Alert>);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };
  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;

    if (email === "") {
      setError(
        <Alert severity="error">You have to enter your register email</Alert>
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (email) {
      sendPasswordResetEmail(auth, email)
        .then((data) => {
          setError(
            <Alert severity="info">Check your mail for reset link</Alert>
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        })
        .catch((error) => {
          setError(
            <Alert severity="error">
              You have to enter your register email
            </Alert>
          );
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  return (
    <div className="limiter">
      {error}
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-33">Sign In</span>
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                ref={emailRef}
              />
              <span className="focus-input100-1"></span>
              <span className="focus-input100-2"></span>
            </div>
            <div
              className="wrap-input100 rs1 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                ref={passRef}
              />
              <span className="focus-input100-1"></span>
              <span className="focus-input100-2"></span>
            </div>
            <div className="container-login100-form-btn m-t-20">
              <button className="login100-form-btn" onClick={signInHandler}>
                Sign in
              </button>
            </div>
            <div className="text-center p-t-45 p-b-4">
              <span className="txt1">Forgot </span>
              <p className="txt2 hov1" onClick={forgotPasswordHandler}>
                Password?
              </p>
            </div>
            <div className="text-center">
              <span className="txt1">Create an account? </span>
              <Link to="/signup" className="txt2 hov1">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
