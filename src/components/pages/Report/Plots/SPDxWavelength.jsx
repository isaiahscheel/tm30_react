import React, { Component } from "react";
import Plot from "react-plotly.js";

export class SPDxWavelength extends Component {
  /**
   * Constructor that grabs the data passed in the props
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.errors = [];
  }
  render() {
    return (
      <div>
        <Plot
          useResizeHandler={true}
          style={{ width: "100%" }}
          data={[
            {
              name: "SPD Value",
              x: this.props.wavelength,
              y: this.props.spd,
              type: "scatter",
              mode: "lines+points",
              hovertemplate: "%{y:.4f}",
              marker: { color: "black" }
            }
          ]}
          layout={{
            //width: 800,
            height: 200,
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
              b: 60,
              t: 20,
              pad: 4
            },
            xaxis: {
              title: {
                text: "Wavelength (nm)"
              },
              tick0: 380,
              dtick: 50,
              range: [380, 780]
            },
            yaxis: {
              title: {
                text: "SPD Value"
              },
              tickformat: ".1f",
              tick0: 0.0,
              dtick: 0.2,
              range: [0.0, 1.0]
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
      </div>
    );
  }
}

export default SPDxWavelength;
