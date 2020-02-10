const storageKey = "tasks";
const projectsKey = "projects";

const saveToDB = key => obj => {
  return localStorage.setItem(key, JSON.stringify(obj));
};

export const actions = {
  addTask: "ADD_TASK",
  toggleTask: "TOGGLE_TASK",
  deleteTask: "DELETE_TASK",
  changeProject: "CHANGE_PROJECT",
  addProject: "ADD_PROJECT",
  purgeTasks: "PURGE_TASKS",
  togglePriority: "TOGGLE_PRIORITY"
};

const initState = {
  tasks: JSON.parse(localStorage.getItem(storageKey) || "[]"),
  projects: JSON.parse(localStorage.getItem(projectsKey)) || ["misc"]
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
          project: action.payload.project,
          priority: false
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
    case actions.addProject:
      if (!action.payload.project) break;
      newState = {
        ...state,
        projects: state.projects.concat(action.payload.project)
      };
      break;
    case actions.purgeTasks:
      if (!action.payload.project) break;
      newState = {
        ...state,
        tasks: state.tasks.filter(t => {
          if (t.project === action.payload.project && t.status === "done")
            return false;
          else return true;
        })
      };
      break;
    case actions.togglePriority:
      if (!action.payload.id || !action.payload.project) break;
      newState = {
        ...state,
        tasks: state.tasks.map(t => {
          if (
            t.project === action.payload.project &&
            t.id === action.payload.id
          ) {
            return { ...t, priority: !t.priority };
          } else {
            return t;
          }
        })
      };
      break;
    default:
      break;
  }
  saveToDB(storageKey)(newState.tasks);
  saveToDB(projectsKey)(newState.projects);
  return newState;
};
