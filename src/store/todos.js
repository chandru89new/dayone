const storageKey = "tasks";
const projectsKey = "projects";

const saveToDB = key => obj => {
  return localStorage.setItem(key, JSON.stringify(obj));
};

const countPriorityTasks = project => tasks =>
  tasks.filter(t => t.project === project && t.priority).length;

export const actions = {
  addTask: "ADD_TASK",
  toggleTask: "TOGGLE_TASK",
  deleteTask: "DELETE_TASK",
  changeProject: "CHANGE_PROJECT",
  purgeTasks: "PURGE_TASKS",
  togglePriority: "TOGGLE_PRIORITY",
  addProject: "ADD_PROJECT",
  deleteProject: "DELETE_PROJECT",
  editProjectName: "EDIT_PROJECT_NAME"
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
      const setPriority = (initPriority, status) =>
        toggleStatus(status) === "done" ? false : initPriority;
      newState = {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id
            ? {
                ...t,
                priority: setPriority(t.priority, t.status),
                status: toggleStatus(t.status)
              }
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
      const allowPrioritizingTask =
        countPriorityTasks(action.payload.project)(state.tasks) < 3
          ? true
          : false;
      const togglePriority = initPriority => {
        if (initPriority) return !initPriority;
        else if (allowPrioritizingTask) return !initPriority;
        else return initPriority;
      };
      newState = {
        ...state,
        tasks: state.tasks.map(t => {
          if (
            t.project === action.payload.project &&
            t.id === action.payload.id
          ) {
            return {
              ...t,
              priority: togglePriority(t.priority)
            };
          } else {
            return t;
          }
        })
      };
      break;
    case actions.deleteProject:
      if (!action.payload.project) break;
      newState = {
        ...state,
        projects: state.projects.filter(p => p !== action.payload.project),
        tasks: state.tasks.filter(t => t.project !== action.payload.project)
      };
      break;
    default:
      break;
  }
  saveToDB(storageKey)(newState.tasks);
  saveToDB(projectsKey)(newState.projects);
  return newState;
};
