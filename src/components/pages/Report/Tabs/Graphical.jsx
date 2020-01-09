/**
 * Graphical.
 *
 * A component for the Graphical tab in the Reports page.
 * Based off of the Excel 'Results Graphical' tab in the
 * IES TM30 Excel Calculator
 *
 * This page has multiple graphs and explanation of the graphs.
 * A lot of Data is being visualized and is all done with the
 * Plotly module.
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
import Data1931 from "../../../../Data/CIE_1931";
import Data1976 from "../../../../Data/CIE_1976";
import ELFPlot from "../Plots/ELFPlot";
import CIEPlot from "../Plots/CIEPlot";
import SHPPlot from "../Plots/SHPPlot";
import HBAPlot from "../Plots/HBAPlot";
import CVGPlot from "../Plots/CVGPlot";
import VSPlot from "../Plots/VSPlot";
import LCFPlot from "../Plots/LCFPlot";
import LCSPlot from "../Plots/LCSPlot";
import LHSPlot from "../Plots/LHSPlot";

/**
 * Graphical Class
 */
export class Graphical extends Component {
  /**
   * Constructor for the Graphical page
   * Mostly just to bring in the data from the props
   * "this.tm30" is the "Numerical_Results" object from the JSON results file
   * if you are unsure of the format of the JSON take a look server side to see how
   * the JSONs get formated and how to access the data
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.tm30 = this.props.tm30; //The data from the JSON file
    this.input = this.props.input;
    this.state = {
      options: this.props.options
    };
  }
  /**
   * Render function for thr Graphical tab.
   */
  render() {
    /**
     * Return value of the Render
     * TODO: Some spacing issues need to be fixed and inline formatting is sloppy.
     */
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <h2 align="center">Test Source and Reference Illuminant </h2>
          </Row>
          <Card>
            <Row>
              <Row>
                <Col md={4} align="center">
                  <ELFPlot
                    test={this.tm30.normalized_SPD_test}
                    ref_spd={this.tm30.normalized_SPD_ref}
                    wavelengths={this.input.Wavelength}
                    caption={true}
                    small={true}
                  ></ELFPlot>
                </Col>

                <Col md={4} align="center">
                  <CIEPlot
                    spectrum_locus_x={Data1931.Spectrum_Locus.x}
                    spectrum_locus_y={Data1931.Spectrum_Locus.y}
                    blackbody_locus_x={Data1931.Blackbody_Locus.x}
                    blackbody_locus_y={Data1931.Blackbody_Locus.y}
                    x_label={"x"}
                    y_label={"y"}
                    test_source={[this.tm30.x[0], this.tm30.y[0]]}
                    reference_illuminant={[this.tm30.x[1], this.tm30.y[1]]}
                  ></CIEPlot>
                </Col>
                <Col md={4} align="center">
                  <CIEPlot
                    spectrum_locus_x={Data1976.Spectrum_Locus.u_prime}
                    spectrum_locus_y={Data1976.Spectrum_Locus.v_prime}
                    blackbody_locus_x={Data1976.Blackbody_Locus.u_prime}
                    blackbody_locus_y={Data1976.Blackbody_Locus.v_prime}
                    x_label={"u'"}
                    y_label={"v'"}
                    test_source={[this.tm30.u[0], this.tm30.v[0]]}
                    reference_illuminant={[this.tm30.u[1], this.tm30.v[1]]}
                  ></CIEPlot>
                </Col>
              </Row>
            </Row>
          </Card>
          <br />
          <Row>
            <h2 align="center">Color Rendition by Hue-Angle Bin</h2>
          </Row>

          <Card>
            <Row>
              <Col md={6} align="center">
                <SHPPlot
                  a_test_coordinates={this.tm30.a_test_coordinates}
                  b_test_coordinates={this.tm30.b_test_coordinates}
                  a_ref_coordinates={this.tm30.a_ref_coordinates}
                  b_ref_coordinates={this.tm30.b_ref_coordinates}
                />
                <div
                  style={{
                    width: "5%",
                    position: "inherit",
                    display: "inline-block"
                  }}
                />
              </Col>
              <Col md={6} align="center">
                <HBAPlot
                  a_prime_test_j={this.tm30.a_prime_test_j}
                  b_prime_test_j={this.tm30.b_prime_test_j}
                  a_prime_ref_j={this.tm30.a_prime_ref_j}
                  b_prime_ref_j={this.tm30.b_prime_ref_j}
                />

                <div
                  style={{
                    width: "5%",
                    position: "inherit",
                    display: "inline-block"
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} align="center">
                <CVGPlot
                  xtest={this.tm30.path_xtest}
                  ytest={this.tm30.path_ytest}
                  xref={this.tm30.path_xref}
                  yref={this.tm30.path_yref}
                  rf={this.tm30.rg}
                  rg={this.tm30.rf}
                  cct={this.tm30.CCT[0]}
                  duv={this.tm30.DUV[0]}
                  small={true}
                  options={this.state.options}
                />
                <div
                  style={{
                    width: "5%",
                    position: "inherit",
                    display: "inline-block"
                  }}
                />
              </Col>
              <Col md={6} align="center">
                <VSPlot
                  a_test_coordinates={this.tm30.a_test_coordinates}
                  b_test_coordinates={this.tm30.b_test_coordinates}
                  a_ref_coordinates={this.tm30.a_ref_coordinates}
                  b_ref_coordinates={this.tm30.b_ref_coordinates}
                />
                <div
                  style={{
                    width: "2%",
                    position: "inherit",
                    display: "inline-block"
                  }}
                />
              </Col>
            </Row>
          </Card>
          <br />
          <Row>
            <h2 align="center">Color Rendition by Hue-Angle Bin</h2>
          </Row>
          <Row>
            <Card>
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  width: "60%"
                }}
              >
                <LCSPlot
                  data={this.tm30.local_chroma_shift}
                  long={true}
                ></LCSPlot>
              </div>
              <div
                style={{
                  width: "2%",
                  position: "inherit",
                  display: "inline-block"
                }}
              />
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingTop: "2%"
                }}
              >
                <h5>Local Chroma Shift</h5>
                Local Chroma Shift is determined from the average radial change{" "}
                <br />
                for the color evaluation samples within each hue-angle bin.
                Chroma <br />
                shift is a funciton of absolute chroma, so Local Chroma Shift{" "}
                <br />
                values are represented as a percentage. The number of samples
                per <br />
                bin (m), which can vary based on the CCT used for the
                calculation, <br />
                is shown at the top. [The colors of the bars are for visual{" "}
                <br />
                orientation only.]
              </div>
            </Card>
          </Row>
          <br />
          <Row>
            <Card>
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  width: "60%"
                }}
              >
                <LHSPlot data={this.tm30.local_hue_shift} long={true}></LHSPlot>
              </div>
              <div
                style={{
                  width: "2%",
                  position: "inherit",
                  display: "inline-block"
                }}
              />
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingTop: "2%"
                }}
              >
                <h5>Local Hue Shift</h5>
                Local hue shift is deteremined from the average change <br />
                perpendicular to the hue-angle bin for the color evaluation{" "}
                <br />
                samples within each hue-angle bin. The number of samples per bin{" "}
                <br />
                (m), which can vary based on the CCT used for the calculation,
                is <br />
                shown at the top. [The colors of the bars are for visual <br />
                orientation only.]
              </div>
            </Card>
          </Row>
          <br />
          <Row>
            <Card>
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  width: "60%"
                }}
              >
                <LCFPlot
                  data={this.tm30.local_color_fidelity}
                  long={true}
                ></LCFPlot>
              </div>
              <div
                style={{
                  width: "2%",
                  position: "inherit",
                  display: "inline-block"
                }}
              />
              <div
                style={{
                  position: "inherit",
                  display: "inline-block",
                  verticalAlign: "top",
                  paddingTop: "2%"
                }}
              >
                <h5>Local Color Fidelity</h5>
                Local Color Fidelity is the average difference in CAM02-UCS for{" "}
                <br />
                the color evaluation samples in each hue-angle bin. The number
                of <br />
                samples per bin, which can vary based on the CCT used for the{" "}
                <br />
                calculation, is shown at the top. [The colors of the bars are
                for <br />
                visual orientation only.]
              </div>
            </Card>
          </Row>
        </Grid>
      </div>
    );
  }
}
/**
 * Export the Graphical component
 */
export default Graphical;
