import React from "react";
import "./App.sass";
import Header from "./comps/header";
import TaskList from "./comps/tasklist";
import Redirector from "./comps/redirector";
import Progress from "./comps/progress";
import Footer from "./comps/footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { store as todos } from "./store/todos";
import RawForms from "./comps/rawforms";
const store = createStore(todos);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/raw">
              <RawForms />
            </Route>
            <Route exact path="/:project/:type">
              <Header />
              <Progress />
              <TaskList />
              <Footer showPurgeLink={true} />
            </Route>
            <Route exact path="/:project">
              <Header />
              <Progress />
              <TaskList />
              <Footer />
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
