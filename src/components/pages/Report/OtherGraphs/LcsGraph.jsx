import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import Card from "pnnl-react-core/lib/Card";

class LcsGraph extends PureComponent {
  constructor(props) {
    super(props);
    var lcs = this.props.data;

    this.data2 = [
      {
        name: "bin1",
        value1: lcs[0],
        amt: 2400
      },
      {
        name: "bin2",
        value2: lcs[1],
        amt: 2400
      },
      {
        name: "bin3",
        value3: lcs[2],
        amt: 2400
      },
      {
        name: "bin4",
        value4: lcs[3],
        amt: 2400
      },
      {
        name: "bin5",
        value5: lcs[4],
        amt: 2400
      },
      {
        name: "bin6",
        value6: lcs[5],
        amt: 2400
      },
      {
        name: "bin7",
        value7: lcs[6],
        amt: 2400
      },
      {
        name: "bin8",
        value8: lcs[7],
        amt: 2400
      },
      {
        name: "bin9",
        value9: lcs[8],
        amt: 2400
      },
      {
        name: "bin10",
        value10: lcs[9],
        amt: 2400
      },
      {
        name: "bin11",
        value11: lcs[10],
        amt: 2400
      },
      {
        name: "bin12",
        value12: lcs[11],
        amt: 2400
      },
      {
        name: "bin13",
        value13: lcs[12],
        amt: 2400
      },
      {
        name: "bin14",
        value14: lcs[13],
        amt: 2400
      },
      {
        name: "bin15",
        value15: lcs[14],
        amt: 2400
      },
      {
        name: "bin16",
        value16: lcs[15],
        amt: 2400
      }
    ];
  }

  render() {
    return (
      <BarChart
        width={800}
        height={400}
        data={this.data2}
        barGap={0}
        barCategoryGap="1%"
        barSize={100}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
          left: 20
        }}
      >
        <XAxis />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="value1" fill="#b45c60" />
        <Bar dataKey="value2" fill="#cb7761" />
        <Bar dataKey="value3" fill="#cb824b" />
        <Bar dataKey="value4" fill="#d7ad67" />
        <Bar dataKey="value5" fill="#ac9a5d" />
        <Bar dataKey="value6" fill="#919E60" />
        <Bar dataKey="value7" fill="#678B5F" />
        <Bar dataKey="value8" fill="#62B08F" />
        <Bar dataKey="value9" fill="#7CBABA" />
        <Bar dataKey="value10" fill="#2C797D" />
        <Bar dataKey="value11" fill="#54778C" />
        <Bar dataKey="value12" fill="#7189B1" />
        <Bar dataKey="value13" fill="#988CA9" />
        <Bar dataKey="value14" fill="#735876" />
        <Bar dataKey="value15" fill="#8F6682" />
        <Bar dataKey="value16" fill="#B97B8E" />
      </BarChart>
    );
  }
}

export default LcsGraph;
