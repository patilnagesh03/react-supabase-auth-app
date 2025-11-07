import React, { useState } from "react";
import "./styles/AddTaskForm.css";

export default function AddTaskForm({ onSubmitTask }) {
  const [input, setInput] = useState({ title: "", description: "" });
  const [isClickSubmit, setIsClickSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.title.trim() || !input.description.trim()) return;
    onSubmitTask(input);

    setInput({ title: "", description: "" });
  };

  const handleMessage = () => {
    setIsClickSubmit(!isClickSubmit);

    setTimeout(() => {
      setIsClickSubmit(false);
    }, 1500);
  };
  return (
    <div className="Add-Task">
      {isClickSubmit && (
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success : </strong> Your task is added successfully! Click on
          "View Task" to preview your task(s).
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Title your task"
          maxLength={40}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows={6}
          cols={30}
          id="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Describe your task here..."
          required
        ></textarea>
        <div className="submit-btn">
          <button
            type="submit"
            onClick={handleMessage}
            disabled={!input.title.trim() || !input.description.trim()}
            style={{
              cursor:
                !input.title.trim() || !input.description.trim()
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
