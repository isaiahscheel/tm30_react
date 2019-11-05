import React, { Component } from "react";
import Plot from "react-plotly.js";

export class ELFPlot extends Component {
  constructor(props) {
    super(props);
    this.spd_test = this.props.test;
    this.spd_ref = this.props.ref_spd;
    this.caption = this.props.caption;
    var i;

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
              name: "Test",
              x: this.wavelength,
              y: this.spd_test,
              type: "scatter",
              mode: "lines+points",
              marker: { color: "red" }
            },
            {
              name: "Reference",
              x: this.wavelength,
              y: this.spd_ref,
              type: "scatter",
              mode: "lines+points",
              marker: { color: "black" }
            }
          ]}
          layout={{
            width: 600,
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
                text: "Wavelength (nm)"
              }
            },
            yaxis: {
              title: {
                text: "Radiant Power  (Equal Luminous Flux)"
              },
              tickformat: "",
              showticklabels: false
            }
          }}
          config={{ displayModeBar: false }}
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
