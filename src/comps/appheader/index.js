import React from "react";
import Logo from "../logo";
import "./style.sass";

function AppHeader(props) {
  return (
    <div className="header">
      <Logo />
      <div className="wrapper">{props.children}</div>
    </div>
  );
}

export default AppHeader;
