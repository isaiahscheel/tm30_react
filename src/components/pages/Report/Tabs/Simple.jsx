/**
 * Simple.
 *
 * The simple Report page. Only has the CVG plot and a few words about the graph.
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

/**
 * Simple Class
 */
export class Simple extends Component {
  constructor(props) {
    super(props);
    this.tm30 = this.props.tm30; //The data from the JSON file
    this.input = this.props.input;
  }
  /**
   * Render function
   */
  render() {
    /**
     * The simple report that just contains a card and the CVG plot
     */
    return (
      <Grid>
        <Card>
          <Row>
            <Col align="center">
              <div
                style={{
                  width: "80%"
                }}
              >
                <Row align="center">
                  <h2
                    style={{
                      color: "black"
                    }}
                  >
                    ANSI/IES TM-30-18 Color Rendition
                  </h2>
                </Row>
                <CVGPlot
                  xtest={this.tm30.path_xtest}
                  ytest={this.tm30.path_ytest}
                  xref={this.tm30.path_xref}
                  yref={this.tm30.path_yref}
                  rf={this.tm30.rg}
                  rg={this.tm30.rf}
                  cct={this.tm30.CCT[0]}
                  duv={this.tm30.DUV[0]}
                  lcs={this.tm30.local_chroma_shift}
                  lhs={this.tm30.local_hue_shift}
                  lcf={this.tm30.local_color_fidelity}
                />
                <Row align="center">
                  Color are for visual orientation purpose only. <br />
                  Created with the ANSI/IES TM-30-18 Web Calculator
                </Row>
              </div>
            </Col>
          </Row>
        </Card>
      </Grid>
    );
  }
}
/**
 * Exporting the simple report component
 */
export default Simple;
