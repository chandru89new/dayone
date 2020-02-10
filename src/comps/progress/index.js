import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./style.sass";

const mapStore = store => {
  const done = store.tasks.filter(t => t.status === "done");
  return {
    tasks: {
      all: store.tasks,
      done: done
    }
  };
};

const filterByProject = project => tasks =>
  tasks.filter(t => t.project === project);

function Progress(props) {
  let { project } = useParams();
  const projFilter = filterByProject(project);

  const progress = () => {
    const total = projFilter(props.tasks.all).length;
    const done = projFilter(props.tasks.done).length;
    const p = !total ? 0 : (done * 100) / total;
    return {
      style: {
        width: p + "%"
      },
      value: parseInt(p)
    };
  };
  return (
    <div className="progress">
      <div className="overlay" style={progress().style}>
        <span className="overlay-text">{progress().value + "%"}</span>
      </div>
    </div>
  );
}

export default connect(mapStore)(Progress);
