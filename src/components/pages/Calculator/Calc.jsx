import React from "react";
import Grid from "react-bootstrap/es/Grid";
import Card from "pnnl-react-core/lib/Card";
import Button from "react-bootstrap/es/Button";
import Examples from "./Examples";
import FileInput from "./FileInput";
import Paste from "./Paste";
import LuxPy from "./LuxPy";

const Calc = () => {
  return (
    <Grid>
      <h1>TM30 Calculator</h1>
      <br />
      <Card>
        <h2>Option A</h2>

        <label>
          User:
          <select id="User" name="User">
            <option value="one">1</option>
            <option value="two">2</option>
            <option value="three">3</option>
          </select>
        </label>
        <br />
        <label>
          Commercial:
          <select id="Commercial" name="Commercial">
            <option value="one">1</option>
            <option value="two">2</option>
            <option value="three">3</option>
          </select>
        </label>
        <br />
        <label>Example:</label>
        <div className="select">
          <Examples />
        </div>
      </Card>
      <br />
      <Card>
        <h2>Option B</h2>
        <FileInput />
      </Card>
      <br />
      <Card>
        <Paste />
      </Card>
      <br />
    </Grid>
  );
};

export default Calc;
