import React from "react";
import "./styles/TaskList.css";

export default function TaskList({ addTask = [] }) {
  return (
    <div className="task-list">
      <h3>Tasks</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addTask.length > 0 ? (
            addTask.map((task, idx) => (
              <tr key={idx} className="task-item">
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className="action-buttons">
                  <button className="update-btn">Update</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <p>task(s) not yet added!</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
