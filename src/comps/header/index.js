import React from "react";
import "./style.sass";
import { withRouter, NavLink as Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

const mapState = state => {
  const filterByStatus = status => tasks =>
    tasks.filter(t => t.status === status);
  return {
    projects: state.projects,
    tasks: {
      todo: filterByStatus("pending")(state.tasks),
      done: filterByStatus("done")(state.tasks),
      all: state.tasks
    }
  };
};

const defaultLinks = [
  { id: "todo", link: "", text: "Todo" },
  { id: "done", link: "done", text: "Done" },
  { id: "all", link: "all", text: "All" }
];

function Header(props) {
  let { project } = useParams();
  const filterByProject = project => tasks =>
    tasks.filter(t => t.project === project);
  const changeProject = e => {
    props.history.push(`/${e.target.value}`);
  };

  return (
    <div className="header">
      <div className="logo">dayone</div>
      <div className="wrapper">
        <div className="nav-container">
          {defaultLinks.map(link => {
            return (
              <Link
                key={link.link}
                className="nav-link"
                exact
                activeClassName="active"
                to={`/${project}/${link.link}`}
              >
                {link.text} (
                {filterByProject(project)(props.tasks[link.id]).length})
              </Link>
            );
          })}
        </div>
        <div>
          Project:{" "}
          <select onChange={changeProject} defaultValue={project}>
            {props.projects.map(project => {
              return (
                <option key={project} value={project}>
                  {project}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default connect(mapState)(withRouter(Header));
