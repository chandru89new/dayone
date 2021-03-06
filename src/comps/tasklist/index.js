import React from "react";
import Task from "../task/";
import { useParams } from "react-router-dom";
import AddResource from "../addresource";
import "./style.sass";
import { actions } from "../../store/todos";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  tasks: state.tasks
});

const filterTasksByProject = project => tasks =>
  tasks.filter(t => t.project === project);

const filterTasksByType = type => tasks => {
  if (!type) return tasks.filter(({ status }) => status === "pending");
  if (type === "done") return tasks.filter(({ status }) => status === "done");
  if (type === "all") return tasks;
};

function TaskList(props) {
  let { project, type } = useParams();

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

  const addTask = taskName => {
    props.dispatch({
      type: actions.addTask,
      payload: { task: taskName, project: project }
    });
  };

  const projectTasks = filterTasksByProject(project);

  const togglePriority = ({ taskId }) => {
    props.dispatch({
      type: actions.togglePriority,
      payload: { project, id: taskId }
    });
  };

  let tasks = filterTasksByType(type)(projectTasks(props.tasks));
  let priorityTasks = tasks.filter(t => t.priority);
  let dePriorityTasks = tasks.filter(t => !t.priority);

  return filterTasksByType(type)(projectTasks(props.tasks)).length ? (
    <>
      {priorityTasks.map((task, idx) => {
        return (
          <div key={task.id}>
            <Task
              id={task.id}
              status={task.status}
              name={task.name}
              time={new Date(task.time)}
              priority={task.priority || false}
              toggleStatus={toggleStatus}
              deleteTask={deleteTask}
              togglePriority={togglePriority}
            />
          </div>
        );
      })}
      {priorityTasks.length ? <div className="spacer" /> : ""}
      {dePriorityTasks.map((task, idx) => {
        return (
          <div key={task.id}>
            <Task
              id={task.id}
              status={task.status}
              name={task.name}
              time={new Date(task.time)}
              priority={task.priority || false}
              toggleStatus={toggleStatus}
              deleteTask={deleteTask}
              togglePriority={togglePriority}
            />
          </div>
        );
      })}
      {!props.hideAdd && (
        <div style={{ marginTop: "1em" }}>
          <AddResource
            name="task"
            placeholder="Type task name and hit Enter"
            callback={addTask}
          />
        </div>
      )}
    </>
  ) : (
    <>
      <div style={{ marginTop: "2em" }}>No tasks.</div>
      {!props.hideAdd && (
        <div style={{ marginTop: "1em" }}>
          <AddResource
            name="task"
            placeholder="Type task name and hit Enter"
            callback={addTask}
          />
        </div>
      )}
    </>
  );
}

export default connect(mapStateToProps)(TaskList);
