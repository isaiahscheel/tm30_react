/**
 * Examples.
 *
 * A component for the drop down menu of all the different examples.
 * Takes the headers (names) of each example from the "ExampleHeaders.json" file.
 * Makes an api call to the server using the "ExamplesSpds.json" data.
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React from "react";
import Button from "react-bootstrap/es/Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import data from "../../../../Data/ExamplesSpds.json";
import exampleHeaders from "../../../../Data/ExampleHeaders.json";
import Grid from "react-bootstrap/es/Grid";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";
import ReactDataSheet from "react-datasheet";
import SPDxWavelength from "../../Report/Plots/SPDxWavelength";
//Redux
import { setSPDxWavelength } from "../../../../actions/dataActions";
import { setExampleOpen } from "../../../../actions/dataActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * Examples Class
 */
class Examples extends React.Component {
  /**
   * Constructor method that creates the state and "examples" array
   * which holds all the examples names, imported from "ExampleHeaders.json"
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      example_number: "",
      loading: false,
      data: [],
      tableReady: false,
      disabled: true,
      name: "",
      grid: [
        [
          { readOnly: true, value: "Wavelength" },
          { readOnly: true, className: "cell", value: "SPD" }
        ]
      ]
    };
    var i;
    var header_length = exampleHeaders.headers.length;
    this.examples = [];
    /**
     * Push all the example names into "this.examples"
     */
    for (i = 0; i < header_length; i++) {
      this.examples.push(exampleHeaders.headers[i]["Example"]);
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * Handler function to perform the necessary steps to make the API command.
   * The function is called when 'Calculate' button under the examples is clicked
   * @param {*} event
   */
  handleSubmit(event) {
    var wavelength = [];
    if (this.state.example_number !== "") {
      var exSpd = []; //The example SPD being grabbed from the "ExamplesSpds.json" file
      var i;
      for (i = 0; i < 401; i++) {
        exSpd.push(data.data[i][this.state.example_number]);
        wavelength.push(380 + i);
      }
      event.preventDefault();
      /**
       * Set the loading state to true to enable the spinner icon
       */
      this.setState({ loading: true }, () => {
        axios.defaults.headers.common = {};
        axios.defaults.headers.common.accept = "application/json";
        /**
         * Call to the API with the Example SPD Information.
         */
        axios
          //.post("http://lampprod03.pnl.gov:8081/api/tm30Paste", {
          .post("https://rcdemo.pnnl.gov/api/tm30Paste", {
            //.post("https://lampprod03.pnl.gov/api/tm30Paste", {
            //.post("http://localhost:5000/api/tm30Paste", {
            spd: exSpd,
            wavelength: wavelength
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            /**
             * Set the state that loading is now false (No Spinner),
             * data is now the JSON from the TM30 Web C program,
             * and table ready is true
             * TODO: TableReady isn't really needed anymore due to not having a table on the Calculator page.
             */
            this.setState({
              loading: false,
              data: data.data,
              tableReady: true
            });

            /**
             * Redux command that we can use later to cache the data
             * localStorage.setItem("data", JSON.stringify(this.state.data));
             */

            /**
             * Pushes the data to the Reports page and redirects to that page
             */
            this.props.history.push({
              pathname: "/Report",
              state: {
                data: this.state.data,
                name: this.state.name
              }
            });
          });
      });
    }
  }

  populateSPDcells = () => {
    var grid_items = [];
    var wavelength_temp = [];
    var spd_temp = [];
    var i;
    for (i = 0; i < 401; i++) {
      grid_items.push([
        {
          readOnly: true,
          value: i + 380,
          className: "cell"
        },
        { value: data.data[i][this.state.example_number] }
      ]);
      wavelength_temp[i] = i + 380;
      spd_temp[i] = data.data[i][this.state.example_number];
    }
    this.props.setSPDxWavelength(spd_temp, wavelength_temp);
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

  /**
   * Function that handles a change in the drop down menu.
   * Basically the only functionality is that if the value is not equal to "" (Choose Example)
   * then the button is disabled. Doesn't allow the user to send empty data or invalid data.
   * @param {*} event   //The event of changeing the drop down menu
   */
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({
        example_number: event.target.value,
        disabled: true,
        tableReady: false
      });
    } else {
      var example = event.target.value;
      this.setState(
        {
          example_number: example,
          disabled: false,
          tableReady: true,
          //name: example.substr(example.indexOf(" ") + 1)
          name: example
        },
        () => {
          this.props.setExampleOpen();
          this.populateSPDcells();
        }
      );
    }
  }
  /**
   * Render the component
   */
  render() {
    const loading = this.state.loading; //If the loading spinner should be visible
    /**
     * Mapping the example names stored in "this.example" to be actual drop-down menu items
     */
    let optionItems = this.examples.map(example => (
      <option key={example} value={example}>
        {example}
      </option>
    ));
    /**
     * Return of the render
     */
    return (
      /**
       * Start of the form with a submission handler from above
       */
      <Grid>
        <Row>
          <Col xs={3}>
            <form onSubmit={this.handleSubmit}>
              <select
                value={this.state.example_number}
                onChange={this.handleChange}
              >
                <option value="">Choose an Example</option>
                {optionItems}
              </select>
              <br />
              <br />
              {loading ? (
                <div>
                  <label>
                    {" "}
                    Calculating Results <br />{" "}
                    <LoadingSpinner color="copper" size={6} />{" "}
                  </label>
                </div>
              ) : (
                <Button
                  bsSize="sm"
                  type="submit"
                  disabled={this.state.disabled}
                >
                  Calculate
                </Button>
              )}
            </form>
          </Col>
          <Col xs={8}>
            {this.props.example_open ? (
              <div>
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
                  }}
                />
              </div>
            ) : (
              <div />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

Examples.propTypes = {
  setSPDxWavelength: PropTypes.func.isRequired,
  setExampleOpen: PropTypes.func.isRequired
  //data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  SPDxWavelength: {
    spd: state.dataReducers.spd,
    wavelengths: state.dataReducers.wavelengths
  },
  example_open: state.dataReducers.example_open
});

/**
 * Export withRouter to be able to jump to the Reports page with the JSON Data
 */
export default withRouter(
  connect(mapStateToProps, { setSPDxWavelength, setExampleOpen })(Examples)
);
//export default withRouter(Examples);
