import React from "react";
import Col from "react-bootstrap/es/Col";
import NavBar from "pnnl-react-core/lib/NavBar";
import NavItem from "pnnl-react-core/lib/NavItem";

const Navigation = () => (
  <NavBar>
    <Col sm={1} componentClass="ul">
      <NavItem to="/" icon="home" text="Home" onlyActiveOnIndex />
    </Col>
    <Col sm={1} componentClass="ul">
      <NavItem to="/calc" icon="software" text="Calculator" />
    </Col>
    <Col sm={1} componentClass="ul">
      <NavItem to="/Report" icon="report" text="Report" />
    </Col>
    <Col sm={1} componentClass="ul">
      <NavItem to="/Profile" icon="person" text="Profile" />
    </Col>
  </NavBar>
);

export default Navigation;
