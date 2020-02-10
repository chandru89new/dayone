import React from "react";
import { actions } from "../../store/todos";
import { useParams } from "react-router-dom";
import "./style.sass";
import { connect } from "react-redux";

function Footer(props) {
  let { project } = useParams();

  const purge = () => {
    props.dispatch({
      type: actions.purgeTasks,
      payload: { project }
    });
  };

  const confirmPurge = () => {
    const c = window.confirm("Are you sure?");
    if (!c) return;
    else purge();
  };
  return (
    <div className="footer">
      <a style={{ cursor: "pointer", color: "red" }} onClick={confirmPurge}>
        Purge Done
      </a>
    </div>
  );
}

const mapState = state => state;
export default connect(mapState)(Footer);
