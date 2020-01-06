/**
 * Equal Luminous Flux Plot
 *
 * A component for the Equal Luminous Flux graph based off of the excel calculator.
 * Pretty straightforward graph that creates two lines from the returned Data from the C code.
 * The red line is the normalized_SPD_test data and the black line is the normalized_SPD_ref
 * data. Both can be found in the JSON that is returned from the C code.
 *
 * TODO - Place the legend inside the graph rather than on the outside.
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
 * The ELFPlot Class
 */
export class ELFPlot extends Component {
  /**
   * Constructor that grabs the data passed in the props
   * The Caption variable is a boolean which determines if it is
   * used for the Basic page (no caption) or the Graphical page
   * where it does have a caption
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.spd_test = this.props.test;
    this.spd_ref = this.props.ref_spd;
    this.caption = this.props.caption;
    this.small_style = {
      position: "inherit",
      display: "inline-block"
    };
    var i;
    /**
     * Creating the wavelength array which is the X-value of the ordered
     * pair for each line and data set.
     *
     * TODO - Will have to change this once we implement Linear interpolation.
     */
    this.wavelength = this.props.wavelengths;
    console.log(this.wavelength);
    //for (i = 0; i < 400; i++) {
    //  this.wavelength[i] = i + 380;
    //}
  }
  /**
   * Return method for the ELFPlot
   */
  render() {
    return (
      <div style={this.small_style}>
        <Plot
          useResizeHandler={true}
          style={{ width: "100%" }}
          data={[
            {
              name: "Test",
              x: this.wavelength,
              y: this.spd_test,
              type: "scatter",
              mode: "lines+points",
              hovertemplate: "%{y:.4f}",
              marker: { color: "red" }
            },
            {
              name: "Reference",
              x: this.wavelength,
              y: this.spd_ref,
              type: "scatter",
              mode: "lines+points",
              hovertemplate: "%{y:.4f}",
              marker: { color: "black" }
            }
          ]}
          layout={{
            //width: 800,
            height: 400,
            legend: {
              xanchor: "center",
              yanchor: "top",
              y: -0.2,
              x: 0.5,
              orientation: "h"
            },
            margin: {
              l: 60,
              r: 30,
              b: 45,
              t: 0,
              pad: 4
            },
            xaxis: {
              title: {
                text: "Wavelength (nm)"
              },
              tick0: 380,
              dtick: 50
            },
            yaxis: {
              title: {
                text: "Radiant Power (Equal Luminous Flux)"
              },
              tickformat: "",
              showticklabels: false
            }
          }}
          config={{
            displaylogo: false,
            modeBarButtons: [["toImage"]],
            responsive: true,
            toImageButtonOptions: {
              format: "png", // one of png, svg, jpeg, webp
              filename: "Equal Luminous Flux",
              height: 700,
              width: 900,
              scale: 1.5 // Multiply title/legend/axis/canvas sizes by this factor
            }
          }}
        />
        {this.caption ? (
          <div align="center">
            <h5>Spectral Power Distribution Comparison </h5>
            Each SPD has been normalized so that the luminance factor (Y) is
            100, <br /> as it is done in IES TM-30 calculations.
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ELFPlot;
