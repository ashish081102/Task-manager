import React, { useEffect, useState } from "react";
import Task from "./Task";
import "./TaskForm.css";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
function TaskList() {
  const navigate = useNavigate();
  const [tasklist, setTasks] = useState([]);
  const user = useSelector(selectUser);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    setLoding(true);
    fetchdata();
    setLoding(false);
  }, []);
  async function fetchdata() {
    const tasksCollection = await db
      .collection("users")
      .doc(user?.uid)
      .collection("tasks")
      .orderBy("due", "desc")
      .get();

    setTasks(tasksCollection.docs.map((doc) => doc.data()));
  }
  async function deleteHandler(taskId) {
    db.collection("users")
      .doc(user?.uid)
      .collection("tasks")
      .doc(taskId)
      .delete();

    setLoding(true);
    fetchdata();
    setLoding(false);
  }
  return (
    <div>
      <section className="tasks-container">
        {loding && <p>Loading...</p>}

        <button className="btn back-btn" onClick={() => navigate("/")}>
          Back to Task Form
        </button>

        <div className="tasks">
          {/* {console.log(tasklist)} */}
          {tasklist.map((task) => (
            <Task key={task.id} taskItem={task} deleteTask={deleteHandler} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TaskList;
