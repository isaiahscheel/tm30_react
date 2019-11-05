import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Grid from "react-bootstrap/es/Grid";
import Header from "pnnl-react-core/lib/Header";
//import WebFooter from "pnnl-react-core/lib/WebFooter";
//import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/pages/Home";
import Calc from "./components/pages/Calculator";
import Report from "./components/pages/Report";
import FourOhFour from "./components/pages/404";
import Navigation from "./components/core/Navigation";
import { fetchLoggedInUser } from "./actions/me";

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchLoggedInUser("self"));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            appLogo={`${process.env.PUBLIC_URL}/images/ies-logo.jpg`}
            appTitle="IES/PNNL TM30"
            primaryNav={<Navigation user={this.props.me} />}
            hasSearch={false}
            className="titlebar"
          />
          <main>
            <Grid>
              <Switch>
                <Route path="/Report" component={Report} />
                <Route path="/calc" component={Calc} />
                <Route path="/home" component={Home} />
                <Route exact path="/" component={Home} />
                <Route component={FourOhFour} />
              </Switch>
            </Grid>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { me } = state;
  return {
    me
  };
};

export default connect(
  mapStateToProps,
  null
)(App);