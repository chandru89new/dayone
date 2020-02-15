import React from "react";
import { connect } from "react-redux";
import Project from "../project";
import AddResource from "../addresource";
import { actions } from "../../store/todos";

const mapState = state => ({
  projects: state.projects,
  tasks: Object.fromEntries(
    state.projects.map(p => {
      return [
        p,
        {
          total: state.tasks.filter(t => t.project === p).length,
          done: state.tasks.filter(t => t.project === p && t.status === "done")
            .length
        }
      ];
    })
  )
});

function ProjectList(props) {
  const deleteProject = projectName => {
    props.dispatch({
      type: actions.deleteProject,
      payload: { project: projectName }
    });
  };

  const addProject = projectName => {
    props.dispatch({
      type: actions.addProject,
      payload: { project: projectName.toLowerCase().replace(/( )+/g, "-") }
    });
  };

  return (
    <>
      {props.projects.map(p => (
        <Project
          key={p}
          name={p}
          total={props.tasks[p].total}
          done={props.tasks[p].done}
          pending={props.tasks[p].total - props.tasks[p].done}
          deleteProject={deleteProject}
          hideDelete={props.projects.length < 2}
        />
      ))}
      {!props.hideAdd && (
        <div style={{ marginTop: "1em" }}>
          <AddResource
            name="project"
            placeholder="Type project name and hit Enter"
            callback={addProject}
          />
        </div>
      )}
    </>
  );
}

export default connect(mapState)(ProjectList);
