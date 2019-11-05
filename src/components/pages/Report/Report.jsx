import React from "react";
import Card from "pnnl-react-core/lib/Card";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
//import { Col, Row } from "react-bootstrap";
import LHSPlot from "./LHSPlot";
import LCSPlot from "./LCSPlot";
import LCFPlot from "./LCFPlot";
import ELFPlot from "./ELFPlot";
import CVGPlot from "./CVGPlot";
import Pagination from "react-bootstrap/es/Pagination";
import Numerical from "./Numerical";
import Graphical from "./Graphical";
//import { connect } from "react-redux";

class Report extends React.Component {
  state = {
    active: "Basic"
  };
  constructor(props) {
    super(props);
    this.pageChanged = this.pageChanged.bind(this);
    this.items = [];
    this.basic = "Basic";
    this.numerical = "Numerical";
    this.simple = "Simple";
    this.graphical = "Graphical";
    this.intermediate = "Intermediate";
    this.full = "Full";
  }

  pageChanged(e) {
    console.log(e.target.text);
    if (!(e.target.text == null)) {
      this.setState({
        active: e.target.text
      });
    }
  }

  render() {
    return (
      <div>
        {!(this.props.location.state == null) ? (
          <div>
            {
              // <ResultsTable data={this.props.location.state.data} />
            }
          </div>
        ) : (
          <div>
            <h1>Report Page</h1>
            <Card>
              <h2>No data Calculated</h2>

              <ol>
                <li>Click on Calculator above</li> <br />
                <li>Choose which way to calculate data</li> <br />
                <li>Click Calculate and you will be redirected here</li>
              </ol>
            </Card>
          </div>
        )}
        {!(this.props.location.state == null) ? (
          <Grid>
            {
              //console.log(this.props.location.state.data)
            }
            <Row>
              <Col xs={4}></Col>
              <Col xs={4}>
                {this.state.active === "Basic" ||
                this.state.active === "Graphical" ||
                this.state.active === "Numerical" ? (
                  <h1 align="center">{`${this.state.active}`} Results</h1>
                ) : (
                  <h1 align="center">{`${this.state.active}`} Report</h1>
                )}
              </Col>
              <Col xs={4}></Col>
            </Row>
            <Row>
              <Col align="center">
                <Pagination onClick={this.pageChanged}>
                  <Pagination.Item
                    key={this.basic}
                    active={
                      this.basic === this.state.active ||
                      this.state.active == null
                    }
                  >
                    {this.basic}
                  </Pagination.Item>
                  <Pagination.Item
                    key={this.graphical}
                    active={this.graphical === this.state.active}
                  >
                    {this.graphical}
                  </Pagination.Item>
                  <Pagination.Item
                    key={this.numerical}
                    active={this.numerical === this.state.active}
                  >
                    {this.numerical}
                  </Pagination.Item>
                  <Pagination.Item
                    key={this.simple}
                    active={this.simple === this.state.active}
                  >
                    {this.simple}
                  </Pagination.Item>
                  <Pagination.Item
                    key={this.intermediate}
                    active={this.intermediate === this.state.active}
                  >
                    {this.intermediate}
                  </Pagination.Item>
                  <Pagination.Item
                    key={this.full}
                    active={this.full === this.state.active}
                  >
                    {this.full}
                  </Pagination.Item>
                </Pagination>
              </Col>
            </Row>
            {this.state.active === "Basic" ? (
              <div>
                <Row>
                  <Col xs={7}>
                    {" "}
                    <Card>
                      <ELFPlot
                        test={
                          this.props.location.state.data.tm30.Numerical_Results
                            .normalized_SPD_test
                        }
                        ref_spd={
                          this.props.location.state.data.tm30.Numerical_Results
                            .normalized_SPD_ref
                        }
                      ></ELFPlot>
                    </Card>
                  </Col>

                  <Col xs={5}>
                    <Card>
                      <LCSPlot
                        data={
                          this.props.location.state.data.tm30.Numerical_Results
                            .local_chroma_shift
                        }
                      ></LCSPlot>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={7}>
                    <Card>
                      <CVGPlot
                        xtest={
                          this.props.location.state.data.tm30.Numerical_Results
                            .path_xtest
                        }
                        ytest={
                          this.props.location.state.data.tm30.Numerical_Results
                            .path_ytest
                        }
                        xref={
                          this.props.location.state.data.tm30.Numerical_Results
                            .path_xref
                        }
                        yref={
                          this.props.location.state.data.tm30.Numerical_Results
                            .path_yref
                        }
                        rf={
                          this.props.location.state.data.tm30.Numerical_Results
                            .rg
                        }
                        rg={
                          this.props.location.state.data.tm30.Numerical_Results
                            .rf
                        }
                        cct={
                          this.props.location.state.data.tm30.Numerical_Results
                            .CCT[0]
                        }
                        duv={
                          this.props.location.state.data.tm30.Numerical_Results
                            .DUV[0]
                        }
                      ></CVGPlot>
                    </Card>
                  </Col>
                  <Col xs={5}>
                    <Card>
                      <LHSPlot
                        data={
                          this.props.location.state.data.tm30.Numerical_Results
                            .local_hue_shift
                        }
                      ></LHSPlot>
                    </Card>

                    <br />

                    <Card>
                      <LCFPlot
                        data={
                          this.props.location.state.data.tm30.Numerical_Results
                            .local_color_fidelity
                        }
                      ></LCFPlot>
                    </Card>
                  </Col>
                </Row>
              </div>
            ) : (
              <div></div>
            )}
            {this.state.active === "Numerical" ? (
              <Numerical
                tm30={this.props.location.state.data.tm30.Numerical_Results}
              />
            ) : (
              <div></div>
            )}
            {this.state.active === "Graphical" ? (
              <Graphical
                tm30={this.props.location.state.data.tm30.Numerical_Results}
              />
            ) : (
              <div></div>
            )}
          </Grid>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Report;
