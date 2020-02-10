import React, { useState } from "react";
import useKeyListener from "./usekeylistener";
import "./style.sass";
import { connect } from "react-redux";
import { actions } from "../../store/todos";
import { useParams } from "react-router-dom";

function AddTask(props) {
  let { project } = useParams();
  const { mode, toggleMode } = useKeyListener();
  const [task, setTask] = useState("");

  const focusInput = id =>
    document.getElementById(id) && document.getElementById(id).focus();

  if (mode === "edit") {
    setTimeout(() => focusInput("task-input"), 0);
  }

  const handleTaskInput = e => {
    const key = e.keyCode || e.which;
    if (key === 13) {
      props.dispatch({
        type: actions.addTask,
        payload: { task: e.target.value, project }
      });
      toggleMode("edit");
      setTask("");
      return;
    }
    setTask(e.target.value);
  };

  return (
    <div className="add-task-container">
      {mode === "view" ? (
        <div className="help-text">
          Ctrl+Space to{" "}
          <a onClick={() => toggleMode("view")} href="#">
            add a new task
          </a>
        </div>
      ) : (
        <div className="add-task-form">
          <input
            id="task-input"
            type="text"
            placeholder="Enter task and type enter"
            onKeyUp={handleTaskInput}
            defaultValue={task}
          />
        </div>
      )}
    </div>
  );
}

export default connect(null)(AddTask);
