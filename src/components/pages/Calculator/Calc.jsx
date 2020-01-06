/**
 * Calc.
 *
 * A component for the Calculator page of the program.
 * Contains three different "Sections" or input options
 *
 * A - Example
 * - The user is able to select an Example SPD to send to the server for it to run
 *
 * B - File Input
 * - The user is able to choose an SPDX file that the app will parse and send the SPD and Wavelength information to the Server
 *
 * C - Paste Option
 * - The user is able to specify the details on their Wavelength 9Start, end, and Step size)
 * and then paste in the SPD (In a newline seperated format) to send to the Server to run
 *
 * !The backend can not handle anything that is not a 380-780 by 1 step SPD as of 11.07.2018
 *
 * TODO Implement the Linear Interpolation functionality to the Pasting option.
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React from "react";
import Grid from "react-bootstrap/es/Grid";
import Card from "pnnl-react-core/lib/Card";
import Examples from "./Sections/Examples";
import FileInput from "./Sections/FileInput";
import Paste from "./Sections/Paste";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";
import Pagination from "react-bootstrap/es/Pagination";
/**
 * The Calc class. Just uses all three options as seperate components
 */
class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.examples = "Examples";
    this.import_file = "Import File";
    this.paste_data = "Paste Data";
    this.state = {
      width: 0,
      height: 0,
      active: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
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
  render() {
    return (
      <div
        style={{
          height: this.state.height - 300
        }}
      >
        <Grid>
          <br />
          <Row>
            <Col xs={12}></Col>
          </Row>
          <Row>
            <Col align="center">
              <Pagination onClick={this.pageChanged}>
                <Pagination.Item
                  key={this.examples}
                  active={
                    this.examples === this.state.active ||
                    this.state.active == null
                  }
                >
                  Examples
                </Pagination.Item>
                <Pagination.Item
                  key={this.import_file}
                  active={this.import_file === this.state.active}
                >
                  Import File
                </Pagination.Item>
                <Pagination.Item
                  key={this.paste_data}
                  active={this.paste_data === this.state.active}
                >
                  Paste Data
                </Pagination.Item>
              </Pagination>
            </Col>
          </Row>
          <br />
          {this.state.active === this.examples || this.state.active == null ? (
            <div>
              {" "}
              <Col xs={12}>
                <Card>
                  <h2>Input SPD from Library</h2>
                  {/*<label>
        User:
        <select id="User" name="User">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
        </select>
      </label>
      <br />
      <label>
        Commercial:
        <select id="Commercial" name="Commercial">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
        </select>
      </label>
      <br />
      */}
                  <label>Example:</label>
                  <div className="select">
                    <Examples cvg_options={this.state} />
                  </div>
                </Card>
              </Col>
            </div>
          ) : (
            <div></div>
          )}
          {this.state.active === this.import_file ? (
            <div>
              {" "}
              <Card>
                <h2>Import .spdx File</h2>
                <FileInput />
              </Card>
            </div>
          ) : (
            <div></div>
          )}

          {this.state.active === this.paste_data ? (
            <div>
              {" "}
              <Paste />
            </div>
          ) : (
            <div></div>
          )}
          <Row>
            <Col xs={12}>
              <br />
              {/*
              <Card>
                <h2>CVG Options</h2>
                <div>
                  <FormControlLabel
                    control={
                      <CustCheckBox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={this.state.bin_labels}
                        onChange={this.handleBinLabels}
                      />
                    }
                    labelPlacement="End"
                    label={
                      <span style={{ fontSize: "1.85rem" }}>Bin Labels</span>
                    }
                  />

                  <FormControlLabel
                    control={
                      <CustCheckBox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={this.state.bin_dividers}
                        onChange={this.handleBinDividers}
                      />
                    }
                    labelPlacement="End"
                    label={
                      <span style={{ fontSize: "1.85rem" }}>Bin Dividers</span>
                    }
                  />
                  
                  <FormControlLabel
                    control={
                      <CustCheckBox
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                        checked={this.state.chroma_isolines}
                        onChange={this.handleChromaIsolines}
                      />
                    }
                    labelPlacement="End"
                    label={
                      <span style={{ fontSize: "1.85rem" }}>
                        Chroma Isolines
                      </span>
                    }
                  />
                  
                </div>
              </Card>
              */}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Calc;
