import React, { useRef, useState } from "react";
import "./TaskForm.css";
import { CiLogout } from "react-icons/ci";
import db, { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Alert } from "@mui/material";

function TaskForm() {
  const title = useRef();
  const descrip = useRef();
  const dueD = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  const dateHandler = (e) => {
    // const date = new Date();
    e.target.type = "date";
    e.target.min = new Date().toISOString().split("T")[0];
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(dueD.current.value.toString());
    // console.log(user.uid);
    const title1 = title.current.value;
    const description = descrip.current.value;
    const due = dueD.current.value;
    if (title1 === "") {
      setError(<Alert severity="error">Title is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (description === "") {
      setError(<Alert severity="error">Description is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (due === "") {
      setError(<Alert severity="error">Due Date is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      const taskId = title.current.value + Math.ceil(Math.random() * 100);
      db.collection("users") //we are going in to the users
        .doc(user?.uid) //Going to that particular user
        .collection("tasks") //going into that users order
        .doc(taskId)
        .set({
          id: taskId,
          title: title.current.value,
          description: descrip.current.value,
          due: dueD.current.value,
          completed: false,
        });
      title.current.value = "";
      descrip.current.value = "";
      dueD.current.value = "";
      setError(<Alert severity="success">Task successfully added</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <>
      {error}
      <div className="task">
        <form className="task-form">
          <CiLogout className="logout-logo" onClick={signOut} />
          <h4>task manager</h4>
          <div className="form-control">
            <input
              type="text"
              // name="name"
              className="task-input"
              placeholder="Enter Title"
              ref={title}
            />
            <input
              type="text"
              // name="name"
              className="task-input"
              placeholder="Enter description"
              ref={descrip}
            />
            <input
              type="text"
              // name="name"
              className="task-input"
              placeholder="Enter due date"
              onFocus={dateHandler}
              onBlur={(e) => (e.target.type = "text")}
              ref={dueD}
            />
            <button
              type="submit"
              className="btn submit-btn"
              onClick={submitHandler}
            >
              submit
            </button>
          </div>
          <div className="form-alert"></div>
        </form>
        <button className="btn btn-list" onClick={() => navigate("/tasklist")}>
          Show Tasks
        </button>
      </div>
    </>
  );
}

export default TaskForm;
