import React, { useEffect, useState } from "react";
import { actions } from "../../store/todos";
import { useParams, Link } from "react-router-dom";
import "./style.sass";
import { connect } from "react-redux";
import AddTask from "../addtask";
import clipb from "clipboard";

function Footer(props) {
  let { project } = useParams();
  let [exportData, setExportData] = useState("{}");

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
  useEffect(() => {
    new clipb("#export-btn");
    const data = `tasks:\n${JSON.stringify(
      props.tasks
    )}\n\nprojects:\n${JSON.stringify(props.projects)}`;
    setExportData(data);
  }, []);

  return (
    <>
      <div className="footer">
        <div>
          <AddTask />
        </div>
        <div>
          <a href="#" id="export-btn" data-clipboard-text={exportData}>
            Export
          </a>
        </div>
        {props.showPurgeLink && (
          <div>
            <a
              style={{ cursor: "pointer", color: "red" }}
              onClick={confirmPurge}
            >
              Purge Done
            </a>
          </div>
        )}
      </div>
    </>
  );
}

const mapState = state => state;
export default connect(mapState)(Footer);
