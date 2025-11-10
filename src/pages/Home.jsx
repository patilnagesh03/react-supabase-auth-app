import React, { useState } from "react";
import "./styles/Home.css";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Home() {
  const [isAddTask, setIsAddTask] = useState(false);
  const [isViewTask, setIsViewTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const { successMsg, session, signOut } = useAuth();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      console.log("Error signing out:", error.message);
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
              <Link to="/signOut">
                <input type="submit" onClick={handleSignOut} value="Sign Out" />
              </Link>
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
