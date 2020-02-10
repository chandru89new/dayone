import React, { useState } from "react";
import "./style.sass";

const defaultFunction = () => {
  console.warn("no function given for this action");
};

function Task({
  id,
  name,
  status,
  time,
  priority,
  toggleStatus = defaultFunction,
  deleteTask = defaultFunction,
  togglePriority = defaultFunction
}) {
  const [editMode, setEditMode] = useState(false);
  const taskId = `task-${id}`;
  const getStatusFromChecked = checked => (checked ? "done" : "pending");
  const toggleTaskStatus = e => {
    return toggleStatus({
      taskId: id
    });
  };
  const isPending = status => status === "pending";
  const formatTime = time => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short"
    }).format(time);
  };

  const doDeleteTask = () => {
    const c = window.confirm("Cant be undone. You sure?");
    if (!c) return;
    else deleteTask({ taskId: id });
  };

  const priorityToggle = () => {
    return togglePriority({
      taskId: id
    });
  };
  return (
    <>
      {editMode ? (
        <div>Show edit form</div>
      ) : (
        <div className="task">
          <div>
            <input
              id={taskId}
              type="checkbox"
              onChange={toggleTaskStatus}
              checked={!isPending(status)}
            />
            <label
              className={isPending(status) ? "" : "strikethrough"}
              htmlFor={taskId}
            >
              {name}
            </label>
          </div>
          {/* <span>
            <small onClick={e => setEditMode(true)}>edit</small>
          </span> */}
          <div>
            <small>{formatTime(time)}</small>
            <span>
              &nbsp; &bull; &nbsp;
              <small className="priority-link" onClick={priorityToggle}>
                {priority ? "de-prior" : "prioritize"}
              </small>
            </span>
            &nbsp; &bull; &nbsp;
            <small className="del-link" onClick={doDeleteTask}>
              del
            </small>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
