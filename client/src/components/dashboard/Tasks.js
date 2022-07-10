import React from "react";
import Task from "./Task";
const Tasks = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task}></Task>
      ))}
    </div>
  );
};

export default Tasks;
