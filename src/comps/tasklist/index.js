import React from "react";
import Task from "../task/";
import { useParams } from "react-router-dom";
import "./style.sass";
import { actions } from "../../store/todos";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  tasks: state.tasks
});

function TaskList(props) {
  let { project, type } = useParams();

  const filterTasksByProject = project => tasks =>
    tasks.filter(t => t.project === project);
  const filterTasksByType = type => tasks => {
    if (!type) return tasks.filter(({ status }) => status === "pending");
    if (type === "done") return tasks.filter(({ status }) => status === "done");
    if (type === "all") return tasks;
  };
  const toggleStatus = ({ taskId }) => {
    props.dispatch({
      type: actions.toggleTask,
      payload: { id: taskId }
    });
  };

  const deleteTask = ({ taskId }) => {
    props.dispatch({
      type: actions.deleteTask,
      payload: { id: taskId }
    });
  };

  const projectTasks = filterTasksByProject(project);

  return filterTasksByType(type)(projectTasks(props.tasks)).length ? (
    filterTasksByType(type)(projectTasks(props.tasks)).map(task => {
      return (
        <Task
          key={task.id}
          id={task.id}
          status={task.status}
          name={task.name}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
        />
      );
    })
  ) : (
    <div>No tasks{type ? " " + type : ""}.</div>
  );
}

export default connect(mapStateToProps)(TaskList);
