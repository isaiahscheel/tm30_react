import React, { Component } from "react";
import Plot from "react-plotly.js";

export class CIEPlot extends Component {
  constructor(props) {
    super(props);
    this.spectrum_locus_x = this.props.spectrum_locus_x;
    this.spectrum_locus_y = this.props.spectrum_locus_y;
    this.blackbody_locus_x = this.props.blackbody_locus_x;
    this.blackbody_locus_y = this.props.blackbody_locus_y;
    this.x_label = this.props.x_label;
    this.y_label = this.props.y_label;
    this.test_source = this.props.test_source;
    this.reference_illuminant = this.props.reference_illuminant;
    var i;

    console.log(this.test_source);

    if (this.x_label === "x") {
      this.x_legend = 0.4;
      this.y_legend = 0.95;
      this.year = "1931";
    } else {
      this.x_legend = 0.6;
      this.y_legend = 0.1;
      this.year = "1976";
    }

    this.wavelength = [];
    for (i = 0; i < 400; i++) {
      this.wavelength[i] = i + 380;
    }
  }
  render() {
    return (
      <div style={{ position: "inherit", display: "inline-block" }}>
        <Plot
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
            width: 500,
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
