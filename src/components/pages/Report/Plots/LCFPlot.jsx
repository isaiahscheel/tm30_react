/**
 * Local Hue Shift Bar Graph
 *
 * A component for the Local Hue Shift Bar Graph. Your basic
 * bar graph with the "local_hue_shift" data from the returned JSON
 * from the C code. There are a few conditionals if it is Big (Graphical Results)
 * or not (the basic results). The difference between the two is pixel size and
 * spacing between the bars.
 *
 * TODO - Add the Samples per bin (m) above each bar
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
 * LHSPlot Class
 */
export class LHSPlot extends Component {
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
    var lcs = this.props.data; //The lcs variable name is a remnant of copying and pasting from another component
    var i;
    this.long = this.props.long;
    /**
     * Check whether it is the long graph or not.
     * The long graph is used in the graphical results
     * tab in the report page.
     */
    if (this.long) {
      this.width = 1600;
      this.height = 400;
      this.bar_gap = 5;
    } else {
      this.style = { width: "100%", paddingBottom: "48%" };
      //this.width = 550;
      //this.height = 400;
      this.bar_gap = 0;
    }

    this.x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.y = [
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

    this.y_rounded = [];

    for (i = 0; i < 16; i++) {
      this.y_rounded[i] = `${Math.round(this.y[i])}`;
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
  }
  /**
   * Render method for the LCFPlot
   */
  render() {
    return (
      <div>
        <Plot
          useResizeHandler={true}
          style={this.style}
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
                size: 14
              },
              text: this.y_rounded,
              textposition: "outside",
              hovertemplate: `R<sub>f,h%{x}</sub>: %{text}`
            }
          ]}
          layout={{
            //width: this.width,
            height: this.height,
            margin: {
              l: 60,
              r: 10,
              b: 45,
              t: 0
              //pad: 4
            },
            xaxis: {
              title: {
                text: "Hue-Angle Bin (<i>j</i>)"
              },
              tickmode: "linear"
            },
            yaxis: {
              range: [0, 115],
              title: {
                text: "Local Color Fidelity (R<sub>f,h<i>j</i></sub>)",
                font: {
                  size: 20
                }
              },
              tickformat: ""
            },
            bargap: this.bar_gap
          }}
          config={{
            displaylogo: false,
            modeBarButtonsToAdd: ["toImage"]
          }}
          config={{
            displaylogo: false,
            modeBarButtons: [["toImage"]],
            responsive: true,
            toImageButtonOptions: {
              format: "png", // one of png, svg, jpeg, webp
              filename: "Local Color Fidelity",
              height: 700,
              width: 900,
              scale: 1.5 // Multiply title/legend/axis/canvas sizes by this factor
            }
          }}
        />
      </div>
    );
  }
}

export default LHSPlot;
