import React, { useState } from "react";
import "./styles/Home.css";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useSnackbar } from "../Context/SnackbarContext";
// import { supabase } from "../supabaseClient";

export default function Home() {
  const [isAddTask, setIsAddTask] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const { successMsg, session, signOut } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  // const handleAddTask = async () => {
  //   const { error } = await supabase
  //     .from("public.tasks")
  //     .insert({ id: 1, title: "Task 1", description: "This is task 1" });

  //   if (error) {
  //     return "An error occured", error;
  //   }
  // };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const clickAddTask = isAddTask && !isViewTask && session;
  const clickViewTask = isViewTask && !isAddTask;

  const addHandle = () => {
    if (session) {
      setIsAddTask(!isAddTask);
      setViewLoading(!viewLoading);
    } else {
      navigate("/signin");
    }
  };

  const viewHandle = () => {
    setIsViewTask(!isViewTask);
    setAddLoading(!addLoading);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      showSnackbar("You’ve signed out. See you again soon!", "success");
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error.message);
      showSnackbar(
        "Couldn’t sign you out. Please refresh and try again.",
        "error"
      );
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU4bBVzmsTV4JIRuea5DL0HmYQJ7NZjTcltiCNVqSmLio0wkGMcLdjP1-2vozdP5nNRIU&usqp=CAU"
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
            />
            Task Manager
          </a>
          {/* <a className="navbar-brand" href="/">
            Home
          </a>
          <a className="navbar-brand" href="/">
            About
          </a>
          <a className="navbar-brand" href="/">
            Contact
          </a> */}

          <div className="register-btn">
            {session ? (
              // <Link to="/signOut">
              //   <input type="submit" onClick={handleSignOut} value="Sign Out" />
              // </Link>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle text-white fw-semibold"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item-text">{session?.user?.email}</li>
                  <li className="dropdown-item-text"></li>

                  <li>
                    <button className="dropdown-item " onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <input type="submit" value="Sign In" />
              </Link>
            )}
          </div>
        </div>
      </nav>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      <div className="add-btn">
        <p>
          Welcome to Task Manager! Stay organized and boost your productivity
          with our intuitive task management system. Keep track of your daily
          tasks, set priorities, and never miss a deadline.
        </p>
        {/* <p>This paragraph is added just for checking the Auto Deploy.</p> */}
        <button
          // onClick={() => setIsAddTask(!isAddTask)}
          onClick={addHandle}
          disabled={addLoading}
          title={isViewTask ? "Close 'View Tasks' first" : ""}
        >
          {isAddTask ? "Close" : "Add Task"}
        </button>

        <button
          // onClick={() => setIsViewTask(!isViewTask)}
          onClick={viewHandle}
          disabled={viewLoading}
          title={isAddTask ? "Close 'Add Tasks' first" : ""}
        >
          {isViewTask ? "Close" : "View Task"}
        </button>
      </div>
      {clickAddTask && <AddTaskForm onSubmitTask={handleAddTask} />}
      {clickViewTask && <TaskList addTask={tasks} />}
    </>
  );
}
