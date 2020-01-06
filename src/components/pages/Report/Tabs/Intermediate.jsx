/**
 * Intermediate.
 *
 * The Intermediate Report page. Contains the CVG Plot, LCS Plot, and LHS Plot
 *
 * TODO - Sloppy spacing. Using divs with inline styling. Hopefully fix that in the future
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React, { Component } from "react";
import Card from "pnnl-react-core/lib/Card";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import CVGPlot from "../Plots/CVGPlot";
import LHSPlot from "../Plots/LHSPlot";
import LCSPlot from "../Plots/LCSPlot";
import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
  orientation: "landscape",
  unit: "in",
  format: [8.5, 11]
};
/**
 * Intermediate class
 */
export class Intermediate extends Component {
  constructor(props) {
    super(props);
    this.tm30 = this.props.tm30; //The data from the JSON file
    this.input = this.props.input;
    this.state = {};
  }
  /**
   * Method that returns a simple object with the height of the inputted parameter
   * @param {int} num
   */
  holder(num) {
    return { height: num };
  }
  /**
   * Render method
   */
  render() {
    /**
     * Creates Intermediate page. Uses the CVG, LCS, and LHS plots
     */
    return (
      <div style={{}} align="center">
        <Row align="center">
          <h2
            style={{
              color: "black"
            }}
          >
            ANSI IES TM-30-18 Color Rendition
          </h2>
          <Col xs={12} md={7}>
            <CVGPlot
              xtest={this.tm30.path_xtest}
              ytest={this.tm30.path_ytest}
              xref={this.tm30.path_xref}
              yref={this.tm30.path_yref}
              rf={this.tm30.rg}
              rg={this.tm30.rf}
              cct={this.tm30.CCT[0]}
              duv={this.tm30.DUV[0]}
              active="Intermediate"
            ></CVGPlot>
          </Col>
          <Col xs={12} md={5}>
            <div style={this.holder(325)}>
              <LCSPlot
                data={this.tm30.local_chroma_shift}
                active="Intermediate"
              ></LCSPlot>
            </div>

            <div style={this.holder(325)}>
              <LHSPlot
                data={this.tm30.local_hue_shift}
                active="Intermediate"
              ></LHSPlot>
            </div>
          </Col>
        </Row>
        <Row align="center">
          Color are for visual orientation purpose only. Created with the
          ANSI/IES TM-30-18 Web Calculator
        </Row>
      </div>
    );
  }
}
/**
 * Export the component
 */
export default Intermediate;
