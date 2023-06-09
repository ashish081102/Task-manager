import React from "react";
import "./TaskForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectData, setData } from "../features/userSlice";
function Task({ taskItem, deleteTask }) {
  const title = taskItem.title;
  const id = taskItem.id;
  const description = taskItem.description;
  const dueD = taskItem.due;
  const comp = taskItem.completed;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(
      setData([
        {
          title: title,
          id: id,
          description: description,
          dueD: dueD,
          completed: comp,
        },
      ])
    );

    navigate("/edittask");
  };
  return (
    <div className="single-task">
      <div className={`single-task-inside ${comp ? "task-completed" : ""} `}>
        <h5>
          <span>
            <i className="far fa-check-circle"></i>
          </span>
          {title}
        </h5>

        <div className="task-links">
          <button onClick={editHandler} className="edit-link">
            <i className="fas fa-edit"></i>
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              deleteTask(id);
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <p className="discrip">{description}</p>
      <p className="dd">{dueD}</p>
    </div>
  );
}

export default Task;
