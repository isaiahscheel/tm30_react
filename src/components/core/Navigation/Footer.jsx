import React, { Component } from "react";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Grid>
          <Row>
            <Col xs={12}>
              <div className="footer-top">
                <img
                  className="footer-picture"
                  src={`${process.env.PUBLIC_URL}/images/ies-logo.jpg`}
                />
                <br />
                ©1906-2019 Illuminating Engineering Society
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <div className="footer-bottom">
                <a href="https://www.ies.org/terms-of-use/"> Terms of Use</a> |{" "}
                <a href="https://www.ies.org/privacy-policy/">Privacy Policy</a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;
