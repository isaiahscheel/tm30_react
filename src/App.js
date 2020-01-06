import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import Grid from "react-bootstrap/es/Grid";
import Header from "pnnl-react-core/lib/Header";
import WebFooter from "pnnl-react-core/lib/WebFooter";
//import "bootstrap/dist/css/bootstrap.min.css";
import "react-datasheet/lib/react-datasheet.css";

import Home from "./components/pages/Home";
import Calc from "./components/pages/Calculator";
import Report from "./components/pages/Report";
import Profile from "./components/pages/Profile";
import FourOhFour from "./components/pages/404";
import Navigation from "./components/core/Navigation";
import Footer from "./components/core/Navigation/Footer";
import { fetchLoggedInUser } from "./actions/me";

class App extends Component {
  componentWillMount() {
    //const { dispatch } = this.props;
    //dispatch(fetchLoggedInUser("self"));
  }

  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          <Header
            appLogo={`${process.env.PUBLIC_URL}/images/ies-logo.jpg`}
            appTitle="ANSI/IES TM-30-18 Calculator"
            primaryNav={<Navigation />}
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
                <Route exact path="/profile" component={Profile} />
                <Route component={FourOhFour} />
              </Switch>
            </Grid>
          </main>
          <footer>{<Footer />}</footer>
        </div>
      </HashRouter>
    );
  }
}

/*
const mapStateToProps = state => {
  const { me } = state;
  return {
    me
  };
};
*/

//export default connect(mapStateToProps, null)(App);

export default App;
