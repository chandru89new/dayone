const storageKey = "tasks";
const projectsKey = "projects";
const currentProjectKey = "current_project";
const defaultCurrentProjectName = "misc";

const saveToDB = key => obj => {
  return localStorage.setItem(key, JSON.stringify(obj));
};

export const actions = {
  addTask: "ADD_TASK",
  toggleTask: "TOGGLE_TASK",
  deleteTask: "DELETE_TASK",
  changeProject: "CHANGE_PROJECT",
  addProject: "ADD_PROJECT"
};

const initState = {
  tasks: JSON.parse(localStorage.getItem(storageKey) || "[]"),
  projects: JSON.parse(localStorage.getItem(projectsKey)) || [
    "misc",
    "algoshelf"
  ],
  currentProject:
    JSON.parse(localStorage.getItem(currentProjectKey)) ||
    defaultCurrentProjectName
};

export const store = (state = initState, action) => {
  let newState = state;
  switch (action.type) {
    case actions.addTask:
      if (!action.payload.task) break;
      newState = {
        ...state,
        tasks: state.tasks.concat({
          id: Math.ceil(Math.random() * 10000 + 1),
          name: action.payload.task,
          status: "pending",
          time: new Date(),
          project: state.currentProject
        })
      };
      break;
    case actions.toggleTask:
      if (!action.payload.id) break;
      const toggleStatus = status =>
        status === "pending" ? "done" : "pending";
      newState = {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? { ...t, status: toggleStatus(t.status) }
            : t
        )
      };
      break;
    case actions.deleteTask:
      if (!action.payload.id) break;
      newState = {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload.id)
      };
      break;
    case actions.changeProject:
      if (!action.payload.project) break;
      newState = {
        ...state,
        currentProject: action.payload.project
      };
      break;
    case actions.addProject:
      if (!action.payload.project) break;
      newState = {
        ...state,
        projects: state.projects.concat(action.payload.project),
        currentProject: action.payload.project
      };
      break;
    default:
      break;
  }
  saveToDB(storageKey)(newState.tasks);
  saveToDB(currentProjectKey)(newState.currentProject);
  saveToDB(projectsKey)(newState.projects);
  return newState;
};
