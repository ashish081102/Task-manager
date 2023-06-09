import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { auth } from "./firebase";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Alert } from "@mui/material";
function SignUp() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  const [error, setError] = useState("");
  const register = (event) => {
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
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passRef.current.value
        )
        .then((authUser) => {
          // console.log(authUser);
          // console.log("Ashish")
          navigate("/");
        })
        .catch((error) => {
          setError(<Alert severity="error">Wrong Email or Password</Alert>);
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
          <AiOutlineArrowLeft
            onClick={() => navigate("/")}
            className="back-arrow"
          />
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-33">Sign Up</span>
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
              <button className="login100-form-btn" onClick={register}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
