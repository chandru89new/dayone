import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const mapState = state => ({
  projects: state.projects
});

function Redirector(props) {
  const project = props.projects[0];
  const path = `/${project}`;
  return <Redirect to={path} />;
}

export default connect(mapState)(Redirector);
