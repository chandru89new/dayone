import React from "react";
import AppHeader from "../comps/appheader";
import Header from "../comps/header";
import Progress from "../comps/progress";
import TaskList from "../comps/tasklist";
import Footer from "../comps/footer";

export default props => {
  return (
    <>
      <AppHeader>
        <Header />
      </AppHeader>
      <Progress />
      <TaskList />
      <Footer showPurgeLink={props.showPurgeLink} />
    </>
  );
};
