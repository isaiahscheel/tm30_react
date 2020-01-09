/**
 * Chromaticity Comparison (CIE 1931) and (CIE 1976).
 *
 * A component for the Chromaticity Comparison plots in the Graphical Results tab.
 * This component is a little special in the case that it is used for two different
 * plots that are very similar. There is a constant polygon in both of them that use
 * different data. The CIE 1931 uses "CIE_1931.json" in the Data folder and the
 * CIE 1976 plot uses "CIE_1976.json" for its polygon. You will find a few
 * conditional statements throughout the code to figure out which graph it is because
 * there are a few constants that are different such as the axes and positioning of the
 * legends.
 *
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React, { Component } from "react";
import Plot from "react-plotly.js";

/**
 * CIEPlot class
 */
export class CIEPlot extends Component {
  /**
   * Constructor for the Plot.
   * Getting the props is very important because
   * this class is used for two different plots.
   * How the code deciphers the difference is from the
   * x_label and y_label attributes when callsed.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.spectrum_locus_x = this.props.spectrum_locus_x; //Data passed in from one of the JSON files specified above.
    this.spectrum_locus_y = this.props.spectrum_locus_y; //Data passed in from one of the JSON files specified above.
    this.blackbody_locus_x = this.props.blackbody_locus_x; //Data passed in from one of the JSON files specified above.
    this.blackbody_locus_y = this.props.blackbody_locus_y; //Data passed in from one of the JSON files specified above.
    this.x_label = this.props.x_label; //Passed in from calling the component, label 'x' if you want the (CIE 1931) Plot
    this.y_label = this.props.y_label; //Passed in from calling the component, label 'y' if you want the (CIE 1931) Plot
    this.test_source = this.props.test_source; //The test source point (An ordered pair) can be found in the returned Data from C code
    this.reference_illuminant = this.props.reference_illuminant; //The reference illuminant point (An ordered pair) can be found in the returned Data from C code
    this.style = { width: "100%" };
    var i;

    /**
     * Determining which plot we are calling and setting some constants
     */
    if (this.x_label === "x") {
      this.x_legend = 0.4;
      this.y_legend = 0.95;
      this.year = "1931";
    } else {
      this.x_legend = 0.6;
      this.y_legend = 0.1;
      this.year = "1976";
    }

    /**
     * Creating the wavelength array
     *
     * TODO - Will have to change with interpolation I think
     */
    this.wavelength = [];
    for (i = 0; i < 400; i++) {
      this.wavelength[i] = i + 380;
    }
  }
  /**
   * Render function of the CIEPlot component
   */
  render() {
    return (
      <div style={{ position: "inherit", display: "inline-block" }}>
        <Plot
          style={this.style}
          data={[
            {
              name: "Spectrum",
              x: this.spectrum_locus_x,
              y: this.spectrum_locus_y,
              type: "scatter",
              mode: "lines+points",
              marker: { color: "black" },
              showlegend: false
            },
            {
              name: "Blackbody",
              x: this.blackbody_locus_x,
              y: this.blackbody_locus_y,
              type: "scatter",
              mode: "lines+points",
              marker: { color: "black" },
              showlegend: false
            },
            {
              name: "Test Source",
              x: [this.test_source[0]],
              y: [this.test_source[1]],
              type: "scatter",
              mode: "markers",
              marker: { color: "red", symbol: "x-thin-open", size: 10 }
            },
            {
              name: "Referance Illuminant",
              x: [this.reference_illuminant[0]],
              y: [this.reference_illuminant[1]],
              type: "scatter",
              mode: "markers",
              marker: { color: "black", symbol: "square-open", size: 12 }
            }
          ]}
          layout={{
            //width: 500,
            height: 400,
            margin: {
              l: 60,
              r: 40,
              b: 45,
              t: 10,
              pad: 4
            },
            xaxis: {
              title: {
                text: this.x_label
              }
            },
            yaxis: {
              title: {
                text: this.y_label
              },
              tickformat: ""
            },
            legend: {
              x: this.x_legend,
              y: this.y_legend
            }
          }}
          config={{ displayModeBar: false }}
        />
        <div align="center">
          <h5>Chromaticity Comparison ({this.year}) </h5>
          The CIE {this.year} Standard 2° Colorimetric Observer is used for
          calculations.
        </div>
      </div>
    );
  }
}

export default CIEPlot;
