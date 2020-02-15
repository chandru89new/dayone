import React from "react";
import AppHeader from "../comps/appheader";
import { Link } from "react-router-dom";
import ProjectList from "../comps/projectlist";

export default () => {
  return (
    <>
      <AppHeader>
        <div>Your projects:</div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </AppHeader>
      <ProjectList />
    </>
  );
};
