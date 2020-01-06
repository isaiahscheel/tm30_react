/**
 * Local Chroma Shift Bar Graph
 *
 * A component for the Chroma Shift Bar Graph. Your basic
 * bar graph with the "local_chroma_shift" data from the returned JSON
 * from the C code. There are a few conditionals if it is Big (Graphical Results)
 * or not (the basic results). The difference between the two is pixel size and
 * spacing between the bars.
 *
 * TODO - Add the Samples per bin (m) above each bar
 * TODO - Shows the exact percentages over the hover rather than the rounded
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
import Card from "pnnl-react-core/lib/Card";
/**
 * LCSPlot Class
 */
export class LCSPlot extends Component {
  /**
   * Constructor that pulls in data from the props.
   * Also uses the "long" variable boolean to check
   * if it is the graph for the Graphical page
   * which will make the graph longer and have more
   * spacing in between the bars
   * @param {*} props
   */
  constructor(props) {
    super(props);
    var lcs = this.props.data;
    var i;

    this.long = this.props.long;
    this.intermediate = this.props.active;
    /**
     * Check whether it is the long graph or not.
     * The long graph is used in the graphical results
     * tab in the report page.
     */
    if (this.long) {
      this.width = 800;
      this.height = 400;
      this.bar_gap = 5;
    } else if (this.intermediate) {
      this.width = 550;
      this.height = 325;
    } else {
      this.width = 550;
      this.height = 400;
      this.bar_gap = 0;
    }

    this.x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.y = [
      lcs[0] / 100,
      lcs[1] / 100,
      lcs[2] / 100,
      lcs[3] / 100,
      lcs[4] / 100,
      lcs[5] / 100,
      lcs[6] / 100,
      lcs[7] / 100,
      lcs[8] / 100,
      lcs[9] / 100,
      lcs[10] / 100,
      lcs[11] / 100,
      lcs[12] / 100,
      lcs[13] / 100,
      lcs[14] / 100,
      lcs[15] / 100
    ];

    this.y_rounded = [];

    for (i = 0; i < 16; i++) {
      this.y_rounded[i] = `${Math.round(this.y[i] * 100)}%`;
      //this.y[i] = `${(Math.round(this.y[i] * 100) / 100).toFixed(2)}`;
    }
    /**
     * Colors for each bar/Huebin. Used throughout the code.
     */
    this.bar_colors = [
      "#b45c60",
      "#cb7761",
      "#cb824b",
      "#d7ad67",
      "#ac9a5d",
      "#919E60",
      "#678B5F",
      "#62B08F",
      "#7CBABA",
      "#2C797D",
      "#54778C",
      "#7189B1",
      "#988CA9",
      "#735876",
      "#8F6682",
      "#B97B8E"
    ];
    this.y_full = [
      lcs[0],
      lcs[1],
      lcs[2],
      lcs[3],
      lcs[4],
      lcs[5],
      lcs[6],
      lcs[7],
      lcs[8],
      lcs[9],
      lcs[10],
      lcs[11],
      lcs[12],
      lcs[13],
      lcs[14],
      lcs[15]
    ];
  }
  render() {
    return (
      <Plot
        useResizeHandler={true}
        style={{ width: "100%" }}
        title={null}
        data={[
          {
            name: "",
            type: "bar",
            x: this.x,
            y: this.y,
            marker: {
              color: this.bar_colors
            },
            textfont: {
              size: 30
            },
            outsidetextfont: {
              size: 30
            },
            text: this.y_rounded,
            textangle: "-90",
            textposition: "outside",
            hovertemplate: `R<sub>cs,h%{x}</sub>: %{y:.2f}`
            //hoverinfo: "y"
          }
        ]}
        layout={{
          //width: this.width,
          height: this.height,
          margin: {
            l: 70,
            r: 10,
            b: 45,
            t: 10,
            pad: 4
          },
          xaxis: {
            title: {
              text: "Hue-Angle Bin (<i>j</i>)"
            },
            tickmode: "linear"
          },
          yaxis: {
            range: [-0.4, 0.4],
            tickmode: "array",
            tickvals: [0, 0.1, 0.2, 0.3, 0.4, -0.1, -0.2, -0.3, -0.4],
            ticktext: [
              "0%",
              "10%",
              "20%",
              "30%",
              "40%",
              "-10%",
              "-20%",
              "-0%",
              "-40%"
            ],
            title: {
              text:
                "Local Chroma Shift (<i>R</i><sub>cs,h<i>j</i></sub>) <br />",
              font: {
                size: 20
              }
            }
            //tickformat: ""
          },
          bargap: this.bar_gap
        }}
        config={{
          displaylogo: false,
          modeBarButtons: [["toImage"]],
          responsive: true,
          toImageButtonOptions: {
            format: "png", // one of png, svg, jpeg, webp
            filename: "Local Chroma Shift",
            height: 700,
            width: 900,
            scale: 1.5 // Multiply title/legend/axis/canvas sizes by this factor
          }
        }}
      />
    );
  }
}

export default LCSPlot;
