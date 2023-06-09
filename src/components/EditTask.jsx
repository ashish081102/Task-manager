import React, { useEffect, useRef, useState } from "react";
import "./TaskForm.css";
import { useSelector } from "react-redux";
import { selectData, selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import db from "./firebase";
import { Alert } from "@mui/material";

function EditTask() {
  const user = useSelector(selectUser);
  const data = useSelector(selectData);
  const [error, setError] = useState("");
  const title = useRef();
  const descrip = useRef();
  const dueD = useRef();
  const comp = useRef();
  const dateHandler = (e) => {
    // const date = new Date();
    e.target.type = "date";
    e.target.min = new Date().toISOString().split("T")[0];
  };
  const updateTaskHandler = async (e) => {
    e.preventDefault();

    const taskId = data[0].id;
    const newData = {
      title: title.current.value,
      description: descrip.current.value,
      id: taskId,
      due: dueD.current.value,
      completed: comp.current.checked,
    };
    if (newData.title === "") {
      setError(<Alert severity="error">Title is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (newData.description === "") {
      setError(<Alert severity="error">Description is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (newData.due === "") {
      setError(<Alert severity="error">Due Date is Required</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("tasks")
        .doc(taskId)
        .update(newData);

      setError(<Alert severity="success">Task updated</Alert>);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      {error}
      <form className="single-task-form">
        <h4>Edit Task</h4>
        <div className="form-control">
          <label>Task ID</label>
          <p className="task-edit-id">{data[0].id}</p>
        </div>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="task-edit-name"
            defaultValue={data[0].title}
            ref={title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            className="task-edit-name"
            defaultValue={data[0].description}
            ref={descrip}
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">Due Date</label>
          <input
            type="text"
            // name="name"
            classNameName="task-input"
            placeholder="Enter due date"
            onFocus={dateHandler}
            onBlur={(e) => (e.target.type = "text")}
            defaultValue={data[0].dueD}
            ref={dueD}
          />
        </div>
        <div className="form-control">
          <label htmlFor="completed">completed</label>
          <input
            type="checkbox"
            name="completed"
            className="task-edit-completed"
            checked={data.completed}
            ref={comp}
          />
        </div>
        <button
          type="submit"
          className="block btn task-edit-btn"
          onClick={updateTaskHandler}
        >
          edit
        </button>
        <div className="form-alert"></div>
      </form>
      <Link to="/tasklist" className="btn back-link">
        back to tasks list
      </Link>
    </div>
  );
}

export default EditTask;
