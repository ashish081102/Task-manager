import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import SignIn from "./components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./components/firebase";
import { login, logout, selectUser } from "./features/userSlice";
import SignUp from "./components/SignUp";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <SignIn /> : <TaskForm />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/tasklist",
      element: <TaskList />,
    },
    {
      path: "/edittask",
      element: <EditTask />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
