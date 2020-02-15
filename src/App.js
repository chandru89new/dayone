import React from "react";
import "./App.sass";
import PageRaw from "./pages/raw";
import PageProjects from "./pages/projects";
import PageTasks from "./pages/tasks";
import Redirector from "./comps/redirector";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { store as todos } from "./store/todos";
const store = createStore(todos);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/projects">
              <PageProjects />
            </Route>
            <Route exact path="/raw">
              <PageRaw />
            </Route>
            <Route exact path="/:project/:type">
              <PageTasks showPurgeLink={true} />
            </Route>
            <Route exact path="/:project">
              <PageTasks showPurgeLink={false} />
            </Route>
            <Route exact path="/">
              <Redirector />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
