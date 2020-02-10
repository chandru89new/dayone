import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.sass";

const mapStore = store => {
  const done = store.tasks.filter(t => t.status === "done");
  if (!done || !done.length)
    return {
      total: store.tasks.length,
      done: done.length,
      progress: 0
    };
  return {
    total: store.tasks.length,
    done: done.length,
    progress: (done.length * 100) / store.tasks.length
  };
};

function Progress(props) {
  const computedStyle = () => {
    return {
      width: props.progress + "%"
    };
  };
  return (
    <div className="progress">
      <div className="overlay" style={computedStyle()}></div>
    </div>
  );
}

export default connect(mapStore)(withRouter(Progress));
