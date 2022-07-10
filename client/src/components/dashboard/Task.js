import React from "react";
import store from "../../store";
import { FaTimes } from "react-icons/fa";

import { deleteTask, toggleTask } from "../../actions/tasks";
const Task = ({ task }) => {
  return (
    <div>
      <div
        className={`task ${task.reminder ? "reminder" : ""}`}
        style={{ display: "inline-block", width: "90%" }}
        onClick={() => store.dispatch(toggleTask(task._id))}
      >
        <h3>{task.text} </h3>
        <p>{task.day}</p>
      </div>
      <div
        className="delete-button"
        style={{ display: "inline-block", alignItems: "center" }}
      >
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => store.dispatch(deleteTask(task._id))}
        />
      </div>
    </div>
  );
};

export default Task;
