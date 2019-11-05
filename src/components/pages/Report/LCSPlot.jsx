import React, { Component } from "react";
import Plot from "react-plotly.js";

export class LCSPlot extends Component {
  constructor(props) {
    super(props);
    var lcs = this.props.data;
    var i;

    this.long = this.props.long;

    if (this.long) {
      this.width = 800;
      this.height = 400;
      this.bar_gap = 5;
    } else {
      this.width = 400;
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
    }

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
            text: this.y_rounded,
            textposition: "outside",
            hovertemplate: `Rcs: %{y}`
            //hoverinfo: "y"
          }
        ]}
        layout={{
          width: this.width,
          height: this.height,
          //transition: "elastic",
          margin: {
            l: 60,
            r: 0,
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
            title: {
              text: "Local Chroma Shift (<i>R</i><sub>cs,hj</sub>)"
            },
            tickformat: "%"
          },
          bargap: this.bar_gap
        }}
        config={{ displayModeBar: false, responsive: true }}
      />
    );
  }
}

export default LCSPlot;
