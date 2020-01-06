/**
 * Paste.
 *
 * A component for the Paste option of the calculator.
 * A user can paste in an SPD and run the TM30
 * Calculation with that input.
 *
 * !The backend can not handle anything that is not a 380-780 by 1 step SPD as of 11.07.2019
 *
 * !Backend can handle integer values of wavelength size. as of 12.16.2019
 *
 * TODO Implement the Linear Interpolation functionality to the Pasting option.
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React, { Component } from "react";
import Button from "react-bootstrap/es/Button";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Card from "pnnl-react-core/lib/Card";
//import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ReactDataSheet from "react-datasheet";
//import "react-datasheet/lib/react-datasheet.css";
import SPDxWavelength from "../../Report/Plots/SPDxWavelength";
//Redux
import { setSPDxWavelength } from "../../../../actions/dataActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPasteOpen } from "../../../../actions/dataActions";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    boxShadow: theme.shadows[10],
    fontSize: 14
  }
}))(Tooltip);

/**
 * Paste Class
 */
export class Paste extends Component {
  /**
   * Constructor that sets the state and binds some handler functions
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.SPDs = [];
    this.wavelengths = [];
    this.spd_temp = [];
    this.wavelengths_temp = [];
    this.state = {
      spd_paste: "", //the SPD string inputed to the text area
      spd_array: [], //the SPD array that is made from splicing the string
      wavelength_array: [],
      loading: false, //Boolean to control the loader
      data: [], //Data that is returned from the C code
      wavelength_start: 380, //The starting wavelength with default value of 380
      wavelength_end: 780, //The ending wavelength with default value of 780
      step: 1, //The step size with default value of 1
      disabled: true, //Boolean to control if the button is disabled or not. Default is that it is.
      name: "",
      displayTable: false,
      grid: [
        [
          { readOnly: true, value: "Wavelength" },
          { readOnly: true, value: "SPD" }
        ]
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSPDChange = this.handleSPDChange.bind(this);
    this.handleSubmitTable = this.handleSubmitTable.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    /*
    var i;
    for (i = 0; i < 401; i++) {
      this.state.grid.push([
        {
          readOnly: true,
          value: i + parseInt(this.state.wavelength_start),
          className: "cell"
        },
        { value: "" }
      ]);
    }
    */
  }
  /*
  populateSPDcells = () => {
    this.setState(
      {
        grid: [
          [
            { readOnly: true, value: "Wavelength" },
            { readOnly: true, className: "cell", value: "SPD" }
          ]
        ]
      },
      function() {
        var i;
        var spd_length =
          this.state.wavelength_end - this.state.wavelength_start + 1;
        for (i = 0; i < spd_length; i += parseInt(this.state.step)) {
          this.state.grid.push([
            {
              readOnly: true,
              value: i + parseInt(this.state.wavelength_start),
              className: "cell"
            },
            { value: "" }
          ]);
        }
      }
    );
  };
  */

  populateSPDcells = () => {
    this.props.setSPDxWavelength([], []);
    var grid_items = [];
    var i;
    var spd_length =
      this.state.wavelength_end - this.state.wavelength_start + 1;
    for (i = 0; i < spd_length; i += parseInt(this.state.step)) {
      grid_items.push([
        {
          readOnly: true,
          value: i + parseInt(this.state.wavelength_start),
          className: "cell"
        },
        { value: "" }
      ]);
    }
    this.setState({
      grid: [
        [
          { readOnly: true, value: "Wavelength" },
          { readOnly: true, className: "cell", value: "SPD" }
        ],
        ...grid_items
      ]
    });
  };

  updateGraph = () => {
    this.spd_temp = [];
    this.wavelengths_temp = [];
    var array_i;
    var next_spd;
    for (array_i = 1; array_i < this.state.grid.length; array_i++) {
      this.wavelengths_temp.push(this.state.grid[array_i][0].value);
      next_spd = this.state.grid[array_i][1].value;
      if (next_spd !== "") {
        this.spd_temp.push(this.state.grid[array_i][1].value);
      }
    }
    this.props.setSPDxWavelength(this.spd_temp, this.wavelengths_temp);
  };

  /**
   * Start of Handler functions-----------------------------------
   */

  handleLeave = event => {
    console.log(this.state);
    this.populateSPDcells();
  };

  handleCreateTable = event => {
    this.setState({
      displayTable: true
    });
    this.props.setPasteOpen();
    this.populateSPDcells();
  };

  /**
   * Function that handles when the SPD paste text area is changed.
   * Stores the value in state and checks if it should unlock
   * the 'Calculation' button by checking all the other fields
   */
  handleSPDChange = event => {
    this.setState({ spd_paste: event.target.value }, function() {
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };
  /**
   * Function that handles when the Start Wavelength is changed.
   * Stores the value in state and checks if it should unlock
   * the 'Calculation' button by checking all the other fields
   */
  handleStartChange = event => {
    this.setState({ wavelength_start: event.target.value }, function() {
      //console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };
  /**
   * Function that handles when the End Wavelength is changed.
   * Stores the value in state and checks if it should unlock
   * the 'Calculation' button by checking all the other fields
   */
  handleEndChange = event => {
    this.setState({ wavelength_end: event.target.value }, function() {
      //console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };
  /**
   * Function that handles when the End Wavelength is changed.
   * Stores the value in state and checks if it should unlock
   * the 'Calculation' button by checking all the other fields
   */
  handleStepChange = event => {
    this.setState({ step: parseInt(event.target.value) }, function() {
      //console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  /**
   * Handle the submission of a psted in SPD
   * @param {*} event
   */
  handleSubmit(event) {
    /**
     * Check to see if the SPD is 380-780 by a step of 1
     * !This calculator does not allow for any other type of SPD
     * !than 380-780 by 1 for the time being.
     */
    if (
      false
      //this.state.wavelength_start !== 380 ||
      //this.state.wavelength_end !== 780 ||
      //this.state.step !== 1
    ) {
      alert("Sorry SPDs other than 380-780 by stepd of 1 are not permitted");
    } else {
      this.setState(
        {
          wavelength_array: []
        },
        function() {
          var i;
          var array_i = 0;
          for (
            i = this.state.wavelength_start;
            i <= this.state.wavelength_end;
            i += this.state.step
          ) {
            console.log(
              `i = ${i} array_i = ${array_i} start = ${this.state.wavelength_start} end = ${this.state.wavelength_end}`
            );
            this.state.wavelength_array[array_i] = i;
            array_i++;
          }
          //console.log(this.state.wavelength_array);
        }
      );
      /**
       * Set state to place the text area SPD Paste as an array into spd_array
       */
      this.setState(
        { spd_array: this.state.spd_paste.split("\n") },
        function() {
          console.log(this.state.spd_array);
          if (
            this.state.spd_array.length === this.state.wavelength_array.length
          ) {
            this.setState({ loading: true }, () => {
              axios.defaults.headers.common = {};
              axios.defaults.headers.common.accept = "application/json";
              axios
                .post("/tm30Paste", {
                  spd: this.state.spd_array,
                  wavelength: this.state.wavelength_array
                })
                .then(res => {
                  return res.data;
                })
                .then(data => {
                  /**
                   * Set the state that loading is false,
                   * data is the json from the C code
                   * and tableReady is true
                   *
                   * TODO: TableReady is no longer used. Could take out.
                   */
                  this.setState({
                    loading: false,
                    data: data.data,
                    tableReady: true
                  });
                  /**
                   * Used later to store the data in cache
                   * localStorage.setItem("data", JSON.stringify(this.state.data));
                   */
                  console.log(this.state);
                  /**
                   * Pushes the data to the Reports page and redirects to that page
                   */
                  this.props.history.push({
                    pathname: "/Report",
                    state: {
                      data: this.state.data
                    }
                  });
                });
            });
          } else {
            alert(
              "Error: Length of SPD array does not match length of wavelength array."
            );
          }
        }
      );
    }
  }

  /**
   * Handle the submission of a psted in SPD
   * @param {*} event
   */
  handleSubmitTable(event) {
    this.wavelengths = [];
    this.SPDs = [];
    //console.log(this.state.grid);
    //console.log(this.state.grid.length);
    //console.log(this.state.grid[1][0].value);
    var next_spd;
    if (
      false
      //this.state.wavelength_start !== 380 ||
      //this.state.wavelength_end !== 780 ||
      //this.state.step !== 1
    ) {
      alert("Sorry SPDs other than 380-780 by stepd of 1 are not permitted");
    } else {
      this.setState(
        {
          wavelength_array: [],
          spd_array: []
        },
        function() {
          var array_i;
          for (array_i = 1; array_i < this.state.grid.length; array_i++) {
            this.wavelengths.push(this.state.grid[array_i][0].value);
            next_spd = this.state.grid[array_i][1].value;
            if (next_spd !== "") {
              this.SPDs.push(this.state.grid[array_i][1].value);
            }
          }
          if (
            this.wavelengths.length === this.SPDs.length &&
            !(this.SPDs.length === 0)
          ) {
            this.setState(
              {
                loading: true,
                spd_array: this.SPDs,
                wavelength_array: this.wavelengths
              },
              () => {
                axios.defaults.headers.common = {};
                axios.defaults.headers.common.accept = "application/json";
                axios
                  //.post("http://localhost:5000/api/tm30Paste", {
                  .post("http://lampprod03.pnl.gov:8081/api/tm30Paste", {
                    spd: this.state.spd_array,
                    wavelength: this.state.wavelength_array
                  })
                  .then(res => {
                    return res.data;
                  })
                  .then(data => {
                    this.setState({
                      loading: false,
                      data: data.data,
                      tableReady: true
                    });
                    console.log(this.state);
                    this.props.history.push({
                      pathname: "/Report",
                      state: {
                        data: this.state.data,
                        name: this.state.name
                      }
                    });
                  });
              }
            );
          } else {
            alert(
              "Error: Length of SPD array does not match length of wavelength array."
            );
          }
        }
      );
    }
  }
  /**
   * End of Handler functions-----------------------------------
   */

  /**
   * Render function for Paste
   */
  render() {
    var loading = this.state.loading;
    return (
      <Card>
        <Grid>
          <h3>Paste SPD Data</h3>
          <Row>
            <Col xs={2}>
              <form>
                <div style={{ position: "inherit", display: "inline-block" }}>
                  <label>
                    Start Wavelength (nm):
                    <br />
                    <LightTooltip
                      title="Recommended value is 380 nm. Value may not be greater than 400 nm."
                      placement="right"
                    >
                      <input
                        onChange={this.handleStartChange}
                        //onBlur={this.handleLeave}
                        defaultValue={380}
                      ></input>
                    </LightTooltip>
                  </label>
                  <br />
                  <label>
                    End Wavelength (nm):
                    <br />
                    <LightTooltip
                      title="Recommended value is 780 nm. Value may not be less than 700 nm."
                      placement="right"
                    >
                      <input
                        onChange={this.handleEndChange}
                        defaultValue={780}
                      ></input>
                    </LightTooltip>
                  </label>
                  <br />
                  <label>
                    Interval (nm):
                    <br />
                    <LightTooltip
                      title="Recommended value is 1 nm. Value may not be greater than 5 nm."
                      placement="right"
                    >
                      <input
                        onChange={this.handleStepChange}
                        //onBlur={this.handleLeave}
                        defaultValue={1}
                      ></input>
                    </LightTooltip>
                  </label>
                </div>
                {loading ? (
                  <div>
                    <br />
                    <label>
                      {" "}
                      Calculating Results <br />{" "}
                      <LoadingSpinner color="copper" size={6} />{" "}
                    </label>
                  </div>
                ) : (
                  <div>
                    <LightTooltip
                      title="Create Table for Wavelengths"
                      placement="bottom"
                    >
                      <span>
                        <Button bsSize="sm" onClick={this.handleCreateTable}>
                          Create Table
                        </Button>
                      </span>
                    </LightTooltip>

                    <div
                      style={{
                        width: "5%",
                        display: "inline-block"
                      }}
                    />

                    <LightTooltip
                      title="Runs the calculation when enough data is entered"
                      placement="bottom"
                    >
                      <span>
                        <Button
                          bsSize="sm"
                          onClick={this.handleSubmitTable}
                          //disabled={this.state.disabled}
                        >
                          Calculate
                        </Button>
                      </span>
                    </LightTooltip>
                  </div>
                )}
              </form>
            </Col>
            <Col xs={9}>
              {this.props.paste_open ? (
                <div>
                  <label>
                    Name of SPD:
                    <br />
                    <input
                      onChange={this.handleNameChange}
                      defaultValue={""}
                    ></input>
                  </label>

                  <br />
                  <SPDxWavelength
                    spd={this.props.SPDxWavelength.spd}
                    wavelength={this.props.SPDxWavelength.wavelengths}
                  />
                  <br />

                  <ReactDataSheet
                    data={this.state.grid}
                    valueRenderer={cell => cell.value}
                    onCellsChanged={changes => {
                      const grid = this.state.grid.map(row => [...row]);
                      changes.forEach(({ cell, row, col, value }) => {
                        grid[row][col] = { ...grid[row][col], value };
                      });
                      this.setState({ grid });
                      this.updateGraph();
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        </Grid>
      </Card>
    );
  }
}

Paste.propTypes = {
  setSPDxWavelength: PropTypes.func.isRequired,
  setPasteOpen: PropTypes.func.isRequired
  //data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  SPDxWavelength: {
    spd: state.dataReducers.spd,
    wavelengths: state.dataReducers.wavelengths
  },
  paste_open: state.dataReducers.paste_open
});

/**
 * Export withRouter so we can jump to the Reports page
 */
export default withRouter(
  connect(mapStateToProps, { setSPDxWavelength, setPasteOpen })(Paste)
);
