import React, { useEffect } from "react";
import { connect } from "react-redux";
import clipb from "clipboard";
import "./style.sass";
import Logo from "../logo";

const mapState = state => state;

function Exporter(props) {
  useEffect(() => {
    new clipb("#export-btn");
  }, []);
  return (
    <>
      <Logo />
      <div className="export-container">
        <div>
          <a
            id="export-btn"
            href="#"
            data-clipboard-text={JSON.stringify(props.tasks)}
          >
            Copy Tasks
          </a>
        </div>
        <div>
          <a
            id="export-btn"
            href="#"
            data-clipboard-text={JSON.stringify(props.projects)}
          >
            Copy Projects
          </a>
        </div>
      </div>
    </>
  );
}

export default connect(mapState)(Exporter);
