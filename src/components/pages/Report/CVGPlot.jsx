import React, { Component } from "react";
import Plot from "react-plotly.js";
//import bin_lines from "./bin_lines";

export class CVGPlot extends Component {
  constructor(props) {
    super(props);
    this.xtest = this.props.xtest;
    this.xtest.push(this.xtest[0]);
    this.ytest = this.props.ytest;
    this.ytest.push(this.ytest[0]);

    this.xref = this.props.xref;
    this.xref.push(this.xref[0]);
    this.yref = this.props.yref;
    this.yref.push(this.yref[0]);

    this.rf = Math.round(this.props.rf);
    this.rg = Math.round(this.props.rg);
    this.cct = Math.round(this.props.cct);
    this.duv = Math.round(this.props.duv * 10000) / 10000;
    this.small_bool = this.props.small;
    if (this.small_bool) {
      this.x_size = 325;
      this.y_size = 325;
      this.small_style = {
        position: "inherit",
        display: "inline-block",
        padding: "50 50 50 50"
      };
    } else {
      this.x_size = 600;
      this.y_size = 600;
    }

    this.minus_20p_x = []; // -20% Ref Circle
    this.minus_20p_y = [];
    this.minus_10p_x = []; // -10% Ref Circle
    this.minus_10p_y = [];
    this.even_x = []; // 0% Ref Circle
    this.even_y = [];
    this.plus_10p_x = []; // +10% Ref Circle
    this.plus_10p_y = [];
    this.plus_20p_x = []; // +20% Ref Circle
    this.plus_20p_y = [];
    var theta;
    var i;
    for (theta = 1; theta <= 360; theta++) {
      // -20% Ref Circle
      this.minus_20p_x[theta] = 0.8 * Math.cos((theta * Math.PI) / 180);
      this.minus_20p_y[theta] = 0.8 * Math.sin((theta * Math.PI) / 180);

      // -10% Ref Circle
      this.minus_10p_x[theta] = 0.9 * Math.cos((theta * Math.PI) / 180);
      this.minus_10p_y[theta] = 0.9 * Math.sin((theta * Math.PI) / 180);

      // 0% Ref Circle
      this.even_x[theta] = Math.cos((theta * Math.PI) / 180);
      this.even_y[theta] = Math.sin((theta * Math.PI) / 180);

      // +10% Ref Circle
      this.plus_10p_x[theta] = 1.1 * Math.cos((theta * Math.PI) / 180);
      this.plus_10p_y[theta] = 1.1 * Math.sin((theta * Math.PI) / 180);

      //+20% Ref Circle
      this.plus_20p_x[theta] = 1.2 * Math.cos((theta * Math.PI) / 180);
      this.plus_20p_y[theta] = 1.2 * Math.sin((theta * Math.PI) / 180);
    }

    this.bin_numbers = [];
    theta = 11.5;
    for (i = 1; i <= 16; i++) {
      var x = 1.35 * Math.cos((theta * Math.PI) / 180);
      var y = 1.35 * Math.sin((theta * Math.PI) / 180);
      theta += 22.5;
      this.bin_numbers[i - 1] = {
        x: x,
        y: y,
        xref: "x",
        yref: "y",
        text: `${i}`,
        font: {
          size: 12,
          color: "grey"
        },
        ax: 0,
        ay: 0
      };
    }

    this.bin_lines = [
      {
        x: [-1.5, 1.5],
        y: [0, 0],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-1.39, 1.39],
        y: [-0.57, 0.57],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-1.06, 1.06],
        y: [-1.06, 1.06],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-0.57, 0.57],
        y: [-1.39, 1.39],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [0, 0],
        y: [-1.5, 1.5],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [0.57, -0.57],
        y: [-1.39, 1.39],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [1.06, -1.06],
        y: [-1.06, 1.06],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [1.39, -1.39],
        y: [-0.57, 0.57],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      }
    ];

    const colors = [
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

    this.arrows = [];
    var i_arrow;
    for (i = 0; i < 16; i++) {
      i_arrow = {
        x: this.xtest[i],
        y: this.ytest[i],
        xref: "x",
        yref: "y",
        text: "",
        showarrow: true,
        arrowhead: 2,
        axref: "x",
        ayref: "y",
        ax: this.xref[i],
        ay: this.yref[i],
        arrowcolor: colors[i]
      };
      this.arrows.push(i_arrow);
    }
  }
  render() {
    return (
      <div style={this.small_style}>
        <div align="center">
          <Plot
            data={[
              ...this.bin_lines,
              {
                x: [0],
                y: [0],
                type: "scatter",
                mode: "markers+lines",
                marker: {
                  size: 22,
                  width: 50,
                  color: "white",
                  symbol: "circle",
                  opacity: 0.8
                },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                x: [0],
                y: [0],
                type: "scatter",
                mode: "markers+lines",
                marker: {
                  size: 30,
                  width: 50,
                  color: "white",
                  symbol: "circle",
                  opacity: 0.7
                },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                x: [0],
                y: [0],
                type: "scatter",
                mode: "markers",
                marker: {
                  size: 8,
                  width: 50,
                  color: "grey",
                  symbol: "cross-thin-open"
                },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "-20%",
                x: this.minus_20p_x,
                y: this.minus_20p_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "white" },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "-10%",
                x: this.minus_10p_x,
                y: this.minus_10p_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "white" },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "0%",
                x: this.even_x,
                y: this.even_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "white" },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "10%",
                x: this.plus_10p_x,
                y: this.plus_10p_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "white" },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "20%",
                x: this.plus_20p_x,
                y: this.plus_20p_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "white" },
                showlegend: false,
                hoverinfo: "skip"
              },
              {
                name: "Test",
                x: this.xtest,
                y: this.ytest,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "red" }
              },
              {
                name: "Reference",
                x: this.xref,
                y: this.yref,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "black" }
              }
            ]}
            layout={{
              showlegend: false,
              autosize: true,
              width: this.x_size,
              height: this.y_size,

              margin: {
                t: 0,
                l: 0,
                b: 0,
                r: 0
              },

              xaxis: {
                visible: false,
                range: [-1.5, 1.5],
                title: {
                  text: ""
                }
                //showticklabels: false
              },
              yaxis: {
                visible: false,
                range: [-1.5, 1.5],
                title: {
                  text: ""
                },
                tickformat: ""
                //showticklabels: false
              },
              images: [
                {
                  source: "https://i.imgur.com/QkpOGSJ.png",
                  //source: "http://localhost:8000/CVGbackground.png",
                  //source: "http://localhost:8000/CVG_bin_lines.png",
                  xref: "x",
                  yref: "y",
                  x: -1.5,
                  y: 1.5,
                  sizex: 3,
                  sizey: 3,
                  sizing: "stretch",
                  layer: "below"
                }
              ],
              annotations: [
                ...this.arrows,
                {
                  x: -1.35,
                  y: 1.3,
                  xref: "x",
                  yref: "y",
                  text: `<b>${this.rf}</b><br /><i>R<sub>f</sub></i>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  ax: 0,
                  ay: 0
                },
                {
                  x: 1.35,
                  y: 1.3,
                  xref: "x",
                  yref: "y",
                  text: `<b>${this.rg}</b><br /><i>R<sub>g</sub></i>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  ax: 0,
                  ay: 0
                },
                {
                  x: 1.15,
                  y: -1.25,
                  xref: "x",
                  yref: "y",
                  text: `<i>D<sub>uv</sub></i><br /><b>${this.duv}</b><br />`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  ax: 0,
                  ay: 0
                },
                {
                  x: -1.25,
                  y: -1.25,
                  xref: "x",
                  yref: "y",
                  text: `<i>CCT</i><br /><b>   ${this.cct} K</b>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  ax: 0,
                  ay: 0
                },
                {
                  x: -0.15,
                  y: -0.7,
                  xref: "x",
                  yref: "y",
                  text: `-20%`,
                  font: {
                    size: 11,
                    color: "white"
                  },
                  ax: 0,
                  ay: 0
                },
                {
                  x: -0.25,
                  y: -1.11,
                  xref: "x",
                  yref: "y",
                  text: `+20%`,
                  font: {
                    size: 11,
                    color: "white"
                  },
                  ax: 0,
                  ay: 0
                },
                ...this.bin_numbers
              ]
            }}
            config={{ displayModeBar: false }}
          />
        </div>
        <br />
        {this.small_bool ? (
          <div align="center">
            <h5>Color Vector Graphic</h5>
            The Color Vector Graphic (CVG) shows a normalized version of the{" "}
            <br />
            average change in (a', b') coordinates of CAM02-UCS for the CES{" "}
            <br />
            within each hue-angle bin. Alternative versions of the CVG are{" "}
            <br />
            available in the CVG sheet. Elements of this graphic can be turned{" "}
            <br />
            on or off using the menu on the Main sheet (requires recalculation).{" "}
            <br />
            [Background is for visual orientation only]
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default CVGPlot;
