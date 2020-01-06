/**
 * Vector Shift Plot
 *
 * A component for the Shift in Vector Shift graph. Each of the 99 pairs
 * of test and reference coordinates can be plotted as a vector using the test and ref a' and b'.
 * Vectors are pointed from ref to test points.
 *
 * The color of the vectors come from a constant JSON file in the Data file.
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
import SampleColors from "../../../../Data/DefaultSampleColors.json";

/**
 * VSPlot Class
 */
export class VSPlot extends Component {
  /**
   * Constructor that grabs the data from the props.
   * Also fills the "arrows" variable with annotations that
   * are the vectors for each pair of points.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.a_test_coordinates = this.props.a_test_coordinates;
    this.b_test_coordinates = this.props.b_test_coordinates;
    this.a_ref_coordinates = this.props.a_ref_coordinates;
    this.b_ref_coordinates = this.props.b_ref_coordinates;

    this.arrows = [];
    var i;
    var i_arrow;
    for (i = 0; i < 99; i++) {
      i_arrow = {
        x: this.a_test_coordinates[i],
        y: this.b_test_coordinates[i],
        xref: "x",
        yref: "y",
        text: "",
        showarrow: true,
        arrowhead: 2,
        arrowwidth: 1.2,
        axref: "x",
        ayref: "y",
        ax: this.a_ref_coordinates[i],
        ay: this.b_ref_coordinates[i],
        arrowcolor: `rgb(${SampleColors.colors[i][0]},${SampleColors.colors[i][1]}, ${SampleColors.colors[i][2]})`
      };
      this.arrows.push(i_arrow);
    }
  }
  /**
   * Render method for VSPlot
   */
  render() {
    return (
      <div style={{ position: "inherit", display: "inline-block" }}>
        <Plot
          data={[
            {
              name: "Test Source",
              x: 0,
              y: 0,
              type: "scatter",
              mode: "markers",
              marker: {
                symbol: "diamond",
                color: "red"
              }
            },
            {
              name: "Reference Illuminant",
              x: 0,
              y: 0,
              type: "scatter",
              mode: "markers",
              marker: {
                color: "black"
              }
            }
          ]}
          layout={{
            width: 450,
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
                source: "https://i.imgur.com/KNiCAwI.png",
                xref: "x",
                yref: "y",
                x: -40,
                y: 40,
                sizex: 80,
                sizey: 80,
                sizing: "stretch",
                layer: "below"
              }
            ],
            annotations: [...this.arrows]
          }}
          config={{ displayModeBar: false }}
        />
        <div align="center">
          <h5>Vector Shifts</h5>
          Each of the 99 pairs of test and reference coordinates can be plotted{" "}
          <br />
          as a vector. This chart does not show the J' dimension, which is also{" "}
          <br />
          included in color fidelity calculations. [Coloring is for visual{" "}
          <br />
          orientation only]
        </div>
      </div>
    );
  }
}

export default VSPlot;
