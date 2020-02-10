import React from "react";
import "./App.sass";
import Header from "./comps/header";
import TaskList from "./comps/tasklist";
import AddTask from "./comps/addtask";
// import Purge from "./comps/purge";
import Progress from "./comps/progress";
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
          <Header />
          <Progress />
          <div>
            <Switch>
              <Route exact path="/:type">
                <TaskList />
              </Route>
              <Route exact path="/">
                <TaskList />
                <AddTask />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
