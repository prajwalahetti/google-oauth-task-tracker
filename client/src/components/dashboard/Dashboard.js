import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Header from "./Header";
import Tasks from "./Tasks";
import { useState,useEffect } from "react";
import AddTask from "./AddTask";
import store from "../../store";
import { fetchTasks } from "../../actions/tasks";
const Dashboard = ({ auth: { user }, tasks: { tasks } }) => {
  const [showAddTask, setShowAddTask] = useState(true);
  useEffect(() => {
    const fetchT = () => {
      store.dispatch(fetchTasks());    };
    fetchT();
   

  },[]);
  return (
    <div>
      <Header
        title={user.displayName}
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      ></Header>
      {showAddTask && <AddTask></AddTask>}
      {tasks.length > 0 ? <Tasks tasks={tasks}></Tasks> : "NO TASKS TO SHOW"}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tasks: state.tasks,
});
export default connect(mapStateToProps, {})(Dashboard);
