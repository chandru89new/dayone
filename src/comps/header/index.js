import React from "react";
import "./style.sass";
import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../../store/todos";

const mapState = state => {
  const filterCurrentProject = task => task.project === state.currentProject;
  const filterStatus = status => task => task.status === status;
  const filterTodo = filterStatus("pending");
  const filterDone = filterStatus("done");
  const todo = state.tasks.filter(filterCurrentProject).filter(filterTodo);
  const done = state.tasks.filter(filterCurrentProject).filter(filterDone);
  return {
    todo: todo.length,
    done: done.length,
    all: state.tasks.filter(filterCurrentProject).length,
    currentProject: state.currentProject,
    projects: state.projects
  };
};

const defaultLinks = [
  { id: "todo", link: "/", text: "Todo" },
  { id: "done", link: "/done", text: "Done" },
  { id: "all", link: "/all", text: "All" }
];

function Header(props) {
  const changeProject = e => {
    props.dispatch({
      type: actions.changeProject,
      payload: { project: e.target.value }
    });
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
                to={link.link}
              >
                {link.text} ({props[link.id]})
              </Link>
            );
          })}
        </div>
        <div>
          Project:{" "}
          <select onChange={changeProject} defaultValue={props.currentProject}>
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

export default connect(mapState)(Header);
