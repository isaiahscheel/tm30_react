/**
 * Shift in Hue-Chroma Plane
 *
 * A component for the Shift in Hue-Chroma Plane graph. Plots each of the 99 CES
 * a' and b' points for both the test and reference. No lines are drawn. Just your typical
 * scatter plot with the gradient background.
 *
 * Red Diamond - Test (a',b')
 * Black Circle - Ref (a', b')
 *
 * The is also a J' for these coordinates but this graph does not deal with that. You can find
 * J' along with the a' and b' i nthe returned JSON from the C code.
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
 * SHPPlot class
 */
export class SHPPlot extends Component {
  /**
   * Constructor that just takes data from the props and puts
   * them into variables
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.a_test_coordinates = this.props.a_test_coordinates;
    this.b_test_coordinates = this.props.b_test_coordinates;
    this.a_ref_coordinates = this.props.a_ref_coordinates;
    this.b_ref_coordinates = this.props.b_ref_coordinates;
  }
  /**
   * Render method for SHPPlot
   */
  render() {
    return (
      <div style={{ position: "inherit", display: "inline-block" }}>
        <Plot
          data={[
            {
              name: "Test Source",
              x: this.a_test_coordinates,
              y: this.b_test_coordinates,
              type: "scatter",
              mode: "markers",
              marker: {
                symbol: "diamond",
                color: "red"
              }
            },
            {
              name: "Reference Illuminant",
              x: this.a_ref_coordinates,
              y: this.b_ref_coordinates,
              type: "scatter",
              mode: "markers",
              marker: {
                color: "black"
              }
            }
          ]}
          layout={{
            width: 400,
            height: 400,
            margin: {
              l: 60,
              r: 40,
              b: 45,
              t: 10,
              pad: 4
            },
            legend: {
              xanchor: "center",
              yanchor: "top",
              y: -0.2,
              x: 0.5,
              orientation: "h"
            },
            xaxis: {
              ticks: "outside",
              showline: true,
              showgrid: false,
              title: {
                text: "a'"
              },
              range: [-40, 40]
            },
            yaxis: {
              ticks: "outside",
              showline: true,
              showgrid: false,
              title: {
                text: "b'"
              },
              range: [-40, 40]
            },
            images: [
              {
                source: "https://i.imgur.com/QkpOGSJ.png",
                xref: "x",
                yref: "y",
                x: -40,
                y: 40,
                sizex: 80,
                sizey: 80,
                sizing: "stretch",
                layer: "below"
              }
            ]
          }}
          config={{ displayModeBar: false }}
        />
        <div align="center">
          <h5>Shift in Hue-Chroma Plane</h5>
          The (a', b') coordinates of CAM02-UCS are calculated for each of the
          99 <br />
          CES under the test and reference conditions. Rf os based on the
          average <br />
          color difference of the 99 CES in CAM02-UCS (also including the J'{" "}
          <br />
          dimension). [Background is for visual orientation only]
        </div>
      </div>
    );
  }
}

export default SHPPlot;
