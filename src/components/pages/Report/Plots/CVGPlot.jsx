/**
 * Color Vector Graph
 *
 * A component for the Color Vector Graph specified in the Excel calculator.
 * This graph is fairly extensive and has a lot of moving parts.
 *
 * In it's basic form it is a scatter plot that creates a circular ploygon with the data
 * from (path_x Test, path_y Test) points and (path_x Ref, path_y Ref) points to create two
 * different circles.
 *
 * We then create different color vectors pointing from each Reference point to the Test Point.
 * The Colors are just for aesthetic purposes and are not a standard. However, they are the same
 * colors in the same odrder as the ones from "Numerical Results" when we colors the huebins.
 *
 * From there we create 5 White Reference circles that are -20%, -10%, 0%, +10%, and +20% of
 * the unit circle.
 *
 * Then we overlay the Huebin lines by using some simple geometry and play the huebin labels
 * a little further out than the white reference cirlces
 *
 * Finally, we position the numerical data in all four corners of the graph
 *
 * DONE - Create the ability to turn off the Huebin Labels, Huebin Dividers, and Chroma Isolines. All seperate functionality, mix and match.
 * DONE (Cont.) - Make the options stored in redux store
 * DONE - Put the options putton within the graph on the pop up bar.
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
import { connect } from "react-redux";
import {
  setBinDividers,
  setBinLabels,
  setChromaIsolines
} from "../../../../actions/dataActions";
import PropTypes from "prop-types";

/**
 * CVG Plot Class
 */
export class CVGPlot extends Component {
  /**
   * Very extensive Constructor method. A lot of data is being used in the
   * graph and some of it has to be rounded, other has to be calculated such
   * as the huebin lines and the white reference circles.
   * IMPORTANT - there is a prop called "small". It is a boolean to differentiate
   * the "Basic Results" page CVG graph from the "Graphical Results" CVG graph.
   * The Basic Results CVG graph is larger thus it is not needed to specify what
   * small is, however, you need to specify small as {true} in the Graphical Results page.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.xtest = this.props.xtest; //x tests values
    this.xtest.push(this.xtest[0]); //Make it completely round
    this.ytest = this.props.ytest; //y tests values
    this.ytest.push(this.ytest[0]); //Make it completely round

    this.xref = this.props.xref; //x Ref values
    this.xref.push(this.xref[0]); //Make it completely round
    this.yref = this.props.yref; //x Ref values
    this.yref.push(this.yref[0]); //Make it completely round

    /**
     * Rounding the information on the graph
     */
    this.rf = Math.round(this.props.rf);
    this.rg = Math.round(this.props.rg);
    this.cct = Math.round(this.props.cct);
    this.duv = Math.round(this.props.duv * 10000) / 10000;
    this.small_bool = this.props.small;
    /**
     * Determine if we are dealing with with the small version (Graphical Page)
     * or the Bigger (Basic Results) Plot
     */
    if (this.small_bool) {
      this.arrow_size = 2;
      this.x_size = 325;
      this.y_size = 325;
      this.rg_label = [1.25, 1.2];
      this.rf_label = [-1.25, 1.2];
      this.duv_label = [1.1, -1.25];
      this.cct_label = [-1.1, -1.25];
      this.style = { width: 325, height: 325 };
      this.small_style = {
        position: "inherit",
        display: "inline-block",
        padding: "50 50 50 50"
      };
    } else if (this.props.active === "Intermediate") {
      this.arrow_size = 3;
      this.style = { width: "100%", paddingBottom: "100%" };
      this.x_size = 650;
      this.y_size = 825;
      this.rg_label = [1.35, 1.3];
      this.rf_label = [-1.35, 1.3];
      this.duv_label = [1.2, -1.25];
      this.cct_label = [-1.2, -1.25];
    } else {
      this.arrow_size = 3;
      this.style = { width: "100%", paddingBottom: "100%" };
      this.x_size = 800;
      this.y_size = 800;
      this.rg_label = [1.35, 1.3];
      this.rf_label = [-1.35, 1.3];
      this.duv_label = [1.2, -1.25];
      this.cct_label = [-1.2, -1.25];
    }
    /**
     * Setting up the Reference Circles
     */
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
    this.bin_lines = [];
    this.chroma_isolines_labels = [];
    this.black_x = [];
    this.black_y = [];

    this.cog = {
      width: 1792,
      path:
        "m 1024,640 q 0,106 -75,181 -75,75 -181,75 -106,0 -181,-75 -75,-75 -75,-181 0,-106 75,-181 75,-75 181,-75 106,0 181,75 75,75 75,181 z m 512,109 V 527 q 0,-12 -8,-23 -8,-11 -20,-13 l -185,-28 q -19,-54 -39,-91 35,-50 107,-138 10,-12 10,-25 0,-13 -9,-23 -27,-37 -99,-108 -72,-71 -94,-71 -12,0 -26,9 l -138,108 q -44,-23 -91,-38 -16,-136 -29,-186 -7,-28 -36,-28 H 657 q -14,0 -24.5,8.5 Q 622,-111 621,-98 L 593,86 q -49,16 -90,37 L 362,16 Q 352,7 337,7 323,7 312,18 186,132 147,186 q -7,10 -7,23 0,12 8,23 15,21 51,66.5 36,45.5 54,70.5 -27,50 -41,99 L 29,495 Q 16,497 8,507.5 0,518 0,531 v 222 q 0,12 8,23 8,11 19,13 l 186,28 q 14,46 39,92 -40,57 -107,138 -10,12 -10,24 0,10 9,23 26,36 98.5,107.5 72.5,71.5 94.5,71.5 13,0 26,-10 l 138,-107 q 44,23 91,38 16,136 29,186 7,28 36,28 h 222 q 14,0 24.5,-8.5 Q 914,1391 915,1378 l 28,-184 q 49,-16 90,-37 l 142,107 q 9,9 24,9 13,0 25,-10 129,-119 165,-170 7,-8 7,-22 0,-12 -8,-23 -15,-21 -51,-66.5 -36,-45.5 -54,-70.5 26,-50 41,-98 l 183,-28 q 13,-2 21,-12.5 8,-10.5 8,-23.5 z",
      ascent: 1500,
      descent: 0
    };

    this.hashtag = {
      width: 600,
      path:
        "M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z",
      ascent: 500,
      descent: 0
    };

    this.circle = {
      width: 600,
      path:
        "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z",
      ascent: 500,
      descent: 0
    };

    this.colors = ["#e41a1c", "#377eb8", "#4daf4a"];

    var theta;
    for (theta = 1; theta <= 361; theta++) {
      this.black_x[theta] = Math.cos((theta * Math.PI) / 180);
      this.black_y[theta] = Math.sin((theta * Math.PI) / 180);
    }
    var i;
    for (i = 0; i < 16; i++) {
      var distance = Math.sqrt(
        Math.pow(this.xref[i] - this.xtest[i], 2) +
          Math.pow(this.yref[i] - this.ytest[i], 2)
      );
      if (distance.toFixed(3) <= 0.029) {
        if (this.xref[i] > this.xtest[i]) {
          this.xref[i] = this.xtest[i] + 0.04;
          this.yref[i] = this.ytest[i] + 0.04;
        } else {
          this.xref[i] = this.xtest[i] - 0.04;
          this.yref[i] = this.ytest[i] - 0.04;
        }
      }
    }

    /**
     * An array of the vector colors
     */
    const colors = [
      "#e32f32",
      "#e54f4f",
      "#fa843b",
      "#feb73c",
      "#cbcb50",
      "#7fb951",
      "#44c00b",
      "#109c7b", //8
      "#22bbaf", //9
      "#13a2bb", //10
      "#0f82c0", //11
      "#3c62a8", //12
      "#6d67ac", //13
      "#6a4e84", //14
      "#9d69a0", //15
      "#a65081" //16
    ];
    /**
     * Setting up the vector arrays
     */
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
        arrowwidth: this.arrow_size,
        axref: "x",
        ayref: "y",
        ax: this.xref[i],
        ay: this.yref[i],
        arrowcolor: colors[i]
      };
      this.arrows.push(i_arrow);
    }
  }

  clearChromaIsolines = () => {
    console.log("Clearing isolines");
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
    this.chroma_isolines_labels = [];
  };

  handleBinLabels = event => {
    console.log("Handle Bin Labels");
    var bin_labels;
    if (this.props.bin_labels) {
      bin_labels = false;
    } else {
      bin_labels = true;
    }
    this.props.setBinLabels(bin_labels);
  };

  handleBinDividers = event => {
    var bin_dividers;
    if (this.props.bin_dividers) {
      bin_dividers = false;
    } else {
      bin_dividers = true;
    }
    this.props.setBinDividers(bin_dividers);
  };

  handleChromaIsolines = event => {
    var chroma_isolines;
    if (this.props.chroma_isolines) {
      chroma_isolines = false;
    } else {
      chroma_isolines = true;
    }
    this.props.setChromaIsolines(chroma_isolines);
  };

  /**
   * Setting up the bin lines
   */
  createBinLines = () => {
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
  };
  /**
   * Setting up the Bin Numbers
   */
  createBinNumbers = () => {
    this.bin_numbers = [];
    var theta = 11.5;
    var i;
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
  };

  createChromaIsolines = () => {
    var theta;
    var i;
    for (theta = 1; theta <= 361; theta++) {
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
    this.chroma_isolines_labels = [
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
      }
    ];
  };
  /**
   * Render function for the CVGPlot
   */
  render() {
    if (this.props.bin_labels) {
      this.createBinLines();
    } else {
      this.bin_lines = [];
    }
    if (this.props.bin_dividers) {
      this.createBinNumbers();
    } else {
      this.bin_numbers = [];
    }
    if (this.props.chroma_isolines) {
      console.log("chroma_isoline: ", this.props.chroma_isolines);
      this.createChromaIsolines();
    } else {
      console.log("chroma_isoline: ", this.props.chroma_isolines);
      this.clearChromaIsolines();
    }
    return (
      <div style={this.small_style}>
        <div align="center">
          <Plot
            useResizeHandler={true}
            style={this.style}
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
                x: this.black_x,
                y: this.black_y,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "black" },
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
                marker: { color: "red" },
                hovertemplate: `%{y:.2f}`
              },
              {
                /*
                name: "Reference",
                x: this.xref,
                y: this.yref,
                type: "scatter",
                line: { shape: "spline", smoothing: 1.3 },
                mode: "lines+points",
                connectgaps: true,
                marker: { color: "black" }
                */
              }
            ]}
            layout={{
              showlegend: false,
              autosize: true,
              //width: this.x_size,
              //height: width;

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
              },
              yaxis: {
                visible: false,
                range: [-1.5, 1.5],
                title: {
                  text: ""
                },
                tickformat: ""
              },
              images: [
                {
                  source: "https://i.imgur.com/QkpOGSJ.png",
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
                  x: this.rf_label[0],
                  y: this.rf_label[1],
                  xref: "x",
                  yref: "y",
                  text: `<b>${this.rf}</b><br /><i>R</i><sub>f</sub>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  align: "left",
                  ax: 0,
                  ay: 0
                },
                {
                  x: this.rg_label[0],
                  y: this.rg_label[1],
                  xref: "x",
                  yref: "y",
                  text: `<b>${this.rg}</b><br /><i>R</i><sub>g</sub>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  align: "right",
                  ax: 0,
                  ay: 0
                },
                {
                  x: this.duv_label[0],
                  y: this.duv_label[1],
                  xref: "x",
                  yref: "y",
                  text: `<i>D</i><sub>uv</sub><br /><b>${this.duv}</b><br />`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  align: "right",
                  ax: 0,
                  ay: 0
                },
                {
                  x: this.cct_label[0],
                  y: this.cct_label[1],
                  xref: "x",
                  yref: "y",
                  text: `CCT<br><b>${this.cct} K</b>`,
                  font: {
                    size: 20,
                    color: "black"
                  },
                  align: "left",
                  ax: 0,
                  ay: 0
                },
                ...this.chroma_isolines_labels,
                ...this.bin_numbers
              ]
            }}
            config={{
              displaylogo: false,
              modeBarButtons: [
                ["toImage"],

                [
                  {
                    name: "Bin Dividers",
                    icon: this.cog,
                    click: this.handleBinLabels
                  }
                ],
                [
                  {
                    name: "Bin Labels",
                    icon: this.hashtag,
                    click: this.handleBinDividers
                  }
                ],
                [
                  {
                    name: "Chroma Isolines",
                    icon: this.circle,
                    click: this.handleChromaIsolines
                  }
                ]
              ],
              responsive: true,
              toImageButtonOptions: {
                format: "png", // one of png, svg, jpeg, webp
                filename: "Color Vector Graph",
                height: 900,
                width: 900,
                scale: 1.5 // Multiply title/legend/axis/canvas sizes by this factor
              }
            }}
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

CVGPlot.propTypes = {
  setBinLabels: PropTypes.func.isRequired,
  setBinDividers: PropTypes.func.isRequired,
  setChromaIsolines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bin_labels: state.dataReducers.bin_labels,
  bin_dividers: state.dataReducers.bin_dividers,
  chroma_isolines: state.dataReducers.chroma_isolines
});

export default connect(mapStateToProps, {
  setBinLabels,
  setBinDividers,
  setChromaIsolines
})(CVGPlot);
