import React, { PureComponent } from "react";
import { Chart } from "react-google-charts";
import Card from "pnnl-react-core/lib/Card";

class LHSGoogleGraph extends PureComponent {
  constructor(props) {
    super(props);
    var lcs = this.props.data;

    this.data = [
      [
        "Huebin-Angle",
        "Local-Hue Shift",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "string",
          calc: "stringify"
        }
      ],
      ["1", lcs[0], "color: #b45c60", null],
      ["2", lcs[1], "color: #cb7761", null],
      ["3", lcs[2], "#cb824b", null],
      ["4", lcs[3], "#d7ad67", null],
      ["5", lcs[4], "#ac9a5d", null],
      ["6", lcs[5], "#919E60", null],
      ["7", lcs[6], "#678B5F", null],
      ["8", lcs[7], "#62B08F", null],
      ["9", lcs[8], "#7CBABA", null],
      ["10", lcs[9], "#2C797D", null],
      ["11", lcs[10], "#54778C", null],
      ["12", lcs[11], "#7189B1", null],
      ["13", lcs[12], "#988CA9", null],
      ["14", lcs[13], "#735876", null],
      ["15", lcs[14], "#8F6682", null],
      ["16", lcs[15], "#B97B8E", null]
    ];
    //var formatter = new window.google.visualization.NumberFormat({
    //  pattern: "#%"
    //});
    //formatter.format(this.data, 1);

    //this.data = [

    //]
  }

  render() {
    return (
      <Card>
        <Chart
          width={"800px"}
          height={"300px"}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={this.data}
          options={{
            title: "Local Hue Shift",
            legend: { position: "none" },
            bar: { groupWidth: "99%" },
            hAxis: {
              title: "Hue-Angle Bin (j)"
            },
            vAxis: {
              title: "Local Hue Shift (Rhs,hj)"
            },
            legend: "none"
          }}
          // For tests
          rootProps={{ "data-testid": "4" }}
        />
      </Card>
    );
  }
}

export default LHSGoogleGraph;
