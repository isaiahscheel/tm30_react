import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import "./styles/main.less";
//import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import configureStore from "./store";

const history = createBrowserHistory();
// Set initial state for application
const initialState = {};
const store = configureStore(history, initialState);

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("app-container")
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
