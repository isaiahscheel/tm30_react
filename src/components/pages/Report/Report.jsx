/**
 * Report.
 *
 * The main Report page. By default it will display the Basic tab.
 * From there you can navigate using the page chnager at the top.
 * The other options are Graphical, Numerical, Simple, Intermediate, and Full.
 * These are all based off of the Excel calculator.
 *
 * TODO - Break the Basic Report into a component instead of living inside the Reports page.
 *
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React from "react";
import Card from "pnnl-react-core/lib/Card";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import LHSPlot from "./Plots/LHSPlot";
import LCSPlot from "./Plots/LCSPlot";
import LCFPlot from "./Plots/LCFPlot";
import ELFPlot from "./Plots/ELFPlot";
import CVGPlot from "./Plots/CVGPlot";
import Pagination from "react-bootstrap/es/Pagination";
import Numerical from "./Tabs/Numerical";
import Graphical from "./Tabs/Graphical";
import Button from "react-bootstrap/es/Button";
import Simple from "./Tabs/Simple";
import Intermediate from "./Tabs/Intermediate";
//import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Pdf from "react-to-pdf";
import { withStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import htmlToImage from "html-to-image";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import {
  setBinDividers,
  setBinLabels,
  setChromaIsolines
} from "../../../actions/dataActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//var htmlToImage = require("html-to-image");
const ref = React.createRef();

const CustCheckBox = withStyles({
  root: {
    color: "#d3761d",
    "&$checked": {
      color: "#d3761d"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

/**
 * Report Class
 */
class Report extends React.Component {
  /**
   * Create state and the active field.
   * "active" is responsible for which
   * tab you currently are on.
   *
   */
  /**
   * Constructor that mostly just defines constants so Report's render
   * knows which page to display based off of the state and which tab is
   * selected on the page.
   * Also binds the pageChanged handler.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    if (!(this.props.location.state == null)) {
      this.json = JSON.stringify(this.props.location.state.data);
      var convert = require("xml-js");
      this.xml = convert.json2xml(this.props.location.state.data, {
        compact: true,
        spaces: 4
      });
    }
    this.pageChanged = this.pageChanged.bind(this);
    this.items = [];
    this.basic = "Basic";
    this.numerical = "Numerical";
    this.simple = "Simple";
    this.graphical = "Graphical";
    this.intermediate = "Intermediate";
    this.full = "Full";
    this.state = {
      active: "Basic",
      width: 0,
      height: 0,
      bin_labels: true,
      bin_dividers: true,
      chroma_isolines: true,
      loading: false
    };
    if (!(this.props.location.state == null)) {
      this.name = this.props.location.state.name;
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleHTMLtoImage = this.handleHTMLtoImage.bind(this);
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

  handleJSONDownload = () => {
    var fileDownload = require("js-file-download");
    fileDownload(this.json, `${this.props.location.state.name}.json`);
  };

  handleXMLDownload = () => {
    var fileDownload = require("js-file-download");
    fileDownload(this.xml, `${this.props.location.state.name}.xml`);
  };

  holder(num) {
    return { height: num };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = event => {
    this.setState({
      anchorEl: null
    });
  };

  handleBinLabels = event => {
    var bin_labels;
    if (this.props.bin_labels) {
      bin_labels = false;
    } else {
      bin_labels = true;
    }
    this.props.setBinLabels(bin_labels);
  };

  handleBinDividers = event => {
    var bin_dividers;
    if (this.props.bin_dividers) {
      bin_dividers = false;
    } else {
      bin_dividers = true;
    }
    this.props.setBinDividers(bin_dividers);
  };

  handleChromaIsolines = event => {
    var chroma_isolines;
    if (this.props.chroma_isolines) {
      chroma_isolines = false;
    } else {
      chroma_isolines = true;
    }
    this.props.setChromaIsolines(chroma_isolines);
  };

  handleHTMLtoImage = event => {
    if (
      this.state.active === "Intermediate" ||
      this.state.active === "Simple"
    ) {
      var name = `${this.name}-${this.state.active}.png`;
      var fileDownload = require("js-file-download");
      htmlToImage
        .toBlob(document.getElementById(`${this.state.active}`))
        .then(function(dataUrl) {
          fileDownload(dataUrl, name);
        });
    }
  };

  /**
   * This isn't working the way it is intended
   */
  /*
  handleHTMLtoImage = event => {
    this.startSpinner(this.stopSpinner);
  };

  startSpinner(_callback) {
    //console.log(this.state.active);
    var name = `${this.name}-${this.state.active}.png`;
    var fileDownload = require("js-file-download");
    this.setState(
      {
        loading: true
      },
      () => {
        console.log(this.state.loading);
        htmlToImage
          .toBlob(document.getElementById(`${this.state.active}`))
          .then(function(dataUrl) {
            fileDownload(dataUrl, name);
          });
        _callback();
      }
    );
  }

  stopSpinner = () => {
    this.setState({
      loading: false
    });
    console.log(this.state.loading);
  };
  */
  /**
   * Handler for changing the tab on the Reports page.
   * @param {*} e //The event of changing tabs. Contains the tesxt of the tab
   */
  pageChanged(e) {
    if (!(e.target.text == null)) {
      this.setState({
        active: e.target.text
      });
    }
  }
  /**
   * Render function for the Reports page.
   * Fairly extensive because Report is the handler for all the
   * Report pages explained above. So depending on which tab is selected,
   * the page will display different content.
   *
   * If an SPD calculation has not been calculated then there will be instructions on how to run
   * one rather than errors showing.
   * ! If the user leaves the tab then the SPD information will leave Cache
   *
   */
  render() {
    return (
      <div>
        {!(this.props.location.state == null) ? (
          <div></div>
        ) : (
          <div
            style={{
              height: this.state.height - 300
            }}
          >
            <br />
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
              //(this.name = this.props.location.state.name)
            }
            <Row>
              <Col xs={4}></Col>
              <Col xs={4} align="center">
                {this.props.location.state.name === "" ? (
                  <h1 align="center">No SPD Name Specified</h1>
                ) : (
                  <div>
                    <h1 align="center">{this.props.location.state.name}</h1>
                    <div>Download Data:</div>
                    <Button onClick={this.handleJSONDownload}>JSON</Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button onClick={this.handleXMLDownload}>XML</Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {/*}
                    <Pdf
                      targetRef={ref}
                      filename={`${this.props.location.state.name}.pdf`}
                      x={75}
                      y={50}
                      options={options}
                    >
                      {({ toPdf }) => <Button onClick={toPdf}>PDF</Button>}
                    </Pdf>
                */}
                    {this.state.loading ? (
                      <div>
                        <br />
                        <label>
                          {" "}
                          Downloading Image <br />{" "}
                          <LoadingSpinner color="copper" size={6} />{" "}
                        </label>
                      </div>
                    ) : (
                      <Button onClick={this.handleHTMLtoImage}>Image</Button>
                    )}
                    {
                      //<Save />
                    }
                    <br />
                    <br />
                    <div>
                      {/*
                      <Button onClick={this.handleClick}>Options</Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem>
                          {" "}
                          <FormControlLabel
                            control={
                              <CustCheckBox
                                icon={
                                  <CheckBoxOutlineBlankIcon
                                    style={{ fontSize: 20 }}
                                  />
                                }
                                checkedIcon={
                                  <CheckBoxIcon style={{ fontSize: 20 }} />
                                }
                                checked={this.props.bin_labels}
                                onChange={this.handleBinLabels}
                              />
                            }
                            labelPlacement="end"
                            label={
                              <span style={{ fontSize: "1.5rem" }}>
                                Bin Labels
                              </span>
                            }
                          />
                        </MenuItem>
                        <MenuItem>
                          {" "}
                          <FormControlLabel
                            control={
                              <CustCheckBox
                                icon={
                                  <CheckBoxOutlineBlankIcon
                                    style={{ fontSize: 20 }}
                                  />
                                }
                                checkedIcon={
                                  <CheckBoxIcon style={{ fontSize: 20 }} />
                                }
                                checked={this.props.bin_dividers}
                                onChange={this.handleBinDividers}
                              />
                            }
                            labelPlacement="end"
                            label={
                              <span style={{ fontSize: "1.5rem" }}>
                                Bin Dividers
                              </span>
                            }
                          />
                        </MenuItem>
                        <MenuItem>
                          {" "}
                          <FormControlLabel
                            control={
                              <CustCheckBox
                                icon={
                                  <CheckBoxOutlineBlankIcon
                                    style={{ fontSize: 20 }}
                                  />
                                }
                                checkedIcon={
                                  <CheckBoxIcon style={{ fontSize: 20 }} />
                                }
                                checked={this.props.chroma_isolines}
                                onChange={this.handleChromaIsolines}
                              />
                            }
                            labelPlacement="end"
                            label={
                              <span style={{ fontSize: "1.5rem" }}>
                                Chroma Isolines
                              </span>
                            }
                          />
                        </MenuItem>
                      </Menu>
                          */}
                    </div>
                  </div>
                )}
                {/*this.state.active === "Basic" ||
                this.state.active === "Graphical" ||
                this.state.active === "Numerical" ? (
                  <h1 align="center">{`${this.state.active}`} Results</h1>
                ) : (
                  <h1 align="center">{`${this.state.active}`} Report</h1>
                )*/}
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
              <div
                style={{
                  width: "125%",
                  marginLeft: "-15%",
                  padding: "50, 50, 50, 50"
                }}
                ref={ref}
                id="Basic"
              >
                <br />
                <Row>
                  <Col xs={12} md={7}>
                    {" "}
                    <Card>
                      <div style={this.holder(400)}>
                        <ELFPlot
                          test={
                            this.props.location.state.data.tm30
                              .Numerical_Results.normalized_SPD_test
                          }
                          ref_spd={
                            this.props.location.state.data.tm30
                              .Numerical_Results.normalized_SPD_ref
                          }
                          wavelengths={
                            this.props.location.state.data.tm30.input.Wavelength
                          }
                        ></ELFPlot>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={12} md={5}>
                    <Card>
                      <div style={this.holder(400)}>
                        <LCSPlot
                          data={
                            this.props.location.state.data.tm30
                              .Numerical_Results.local_chroma_shift
                          }
                        ></LCSPlot>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={12} md={7}>
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
                  <Col xs={12} md={5}>
                    <Card>
                      <div style={this.holder(400)}>
                        <LHSPlot
                          data={
                            this.props.location.state.data.tm30
                              .Numerical_Results.local_hue_shift
                          }
                        ></LHSPlot>
                      </div>
                    </Card>

                    <br />

                    <Card>
                      <div style={this.holder(380)}>
                        <LCFPlot
                          data={
                            this.props.location.state.data.tm30
                              .Numerical_Results.local_color_fidelity
                          }
                        ></LCFPlot>
                      </div>
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
                input={this.props.location.state.data.tm30.input}
              />
            ) : (
              <div></div>
            )}
            {this.state.active === "Graphical" ? (
              <Graphical
                tm30={this.props.location.state.data.tm30.Numerical_Results}
                input={this.props.location.state.data.tm30.input}
              />
            ) : (
              <div></div>
            )}
            {this.state.active === "Simple" ? (
              <div ref={ref} id="Simple">
                <Simple
                  tm30={this.props.location.state.data.tm30.Numerical_Results}
                  input={this.props.location.state.data.tm30.input}
                />
              </div>
            ) : (
              <div></div>
            )}
            {this.state.active === "Intermediate" ? (
              <div>
                <div
                  style={
                    {
                      //width: "115%",
                      //marginLeft: "-10%",
                      //padding: "50, 50, 50, 50"
                    }
                  }
                  ref={ref}
                  id="Intermediate"
                >
                  <Card>
                    <Intermediate
                      tm30={
                        this.props.location.state.data.tm30.Numerical_Results
                      }
                      input={this.props.location.state.data.tm30.input}
                      active={this.state.active}
                    />
                  </Card>
                </div>
              </div>
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

Report.propTypes = {
  setBinLabels: PropTypes.func.isRequired,
  setBinDividers: PropTypes.func.isRequired,
  setChromaIsolines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bin_labels: state.dataReducers.bin_labels,
  bin_dividers: state.dataReducers.bin_dividers,
  chroma_isolines: state.dataReducers.chroma_isolines
});
/**
 * Export the Report Component
 */
export default connect(mapStateToProps, {
  setBinLabels,
  setBinDividers,
  setChromaIsolines
})(Report);
