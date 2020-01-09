import React, { Component } from "react";
import Card from "pnnl-react-core/lib/Card";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Profpic from "react-rounded-image";
import MyPhoto from "./light.jpg";
import Button from "react-bootstrap/es/Button";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <div
        style={{
          height: this.state.height - 300
        }}
      >
        <Grid>
          <br />

          <Card>
            <Row align="center">
              <Profpic
                image={MyPhoto}
                roundedColor="#321124"
                imageWidth="150"
                imageHeight="150"
                roundedSize="13"
              />
              <h3>First Last</h3>
            </Row>
            <Row>
              <Col md={6} align="center">
                <select>
                  <option value="">Saved SPDs</option>
                  <option value="">CIE F1 March 9, 2019</option>
                  <option value="">BBR Dec 12, 2019</option>
                  <option value="">E1C1 June 1, 2019</option>
                </select>
              </Col>
              <Col md={6} align="center">
                <select>
                  <option value="">User SPDs</option>
                </select>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row align="center">
              <Button>Sign Out</Button>
            </Row>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Profile;
