import React from "react";
import "./style.sass";
import { Link } from "react-router-dom";

const defaultFn = () => {
  console.warn("No function given");
};
function Project({
  name,
  total,
  done,
  pending,
  hideDelete = false,
  deleteProject = defaultFn
}) {
  const confirmDelete = () => {
    const c = window.confirm("Are you sure? This is undoable");
    if (!c) return;
    deleteProject(name);
  };

  return (
    <div className="project">
      <div>
        <div style={{ fontWeight: "bold" }}>
          <Link to={`/${name}`}>{name}</Link>
        </div>
        <div className="meta">
          Tasks: {total} total | {done} done | {pending} pending
        </div>
      </div>
      <div className="tools">
        {!hideDelete && (
          <a href="#" className="del-link" onClick={confirmDelete}>
            Delete
          </a>
        )}
      </div>
    </div>
  );
}

export default Project;
