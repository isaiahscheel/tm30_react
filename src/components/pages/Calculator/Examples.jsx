import React from "react";
import Button from "react-bootstrap/es/Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import data from "./ExamplesSpds.json";
import exampleHeaders from "./ExampleHeaders.json";

class Examples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example_number: "",
      loading: false,
      data: [],
      tableReady: false,
      disabled: true
    };
    var i;
    var header_length = exampleHeaders.headers.length;
    this.examples = [];
    for (i = 0; i < header_length; i++) {
      this.examples.push(exampleHeaders.headers[i]["Example"]);
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    if (this.state.example_number !== "") {
      var exSpd = [];
      var i;
      for (i = 0; i < 401; i++) {
        exSpd.push(data.data[i][this.state.example_number]);
      }
      console.log(exSpd);
      event.preventDefault();
      this.setState({ loading: true }, () => {
        axios.defaults.headers.common = {};
        axios.defaults.headers.common.accept = "application/json";
        axios
          .post(
            "https://cors-anywhere.herokuapp.com/https://dtn3.pnl.gov:8080/api/tm30Paste",
            {
              info: exSpd
            }
          )
          .then(res => {
            return res.data;
          })
          .then(data => {
            //console.log(data.data);
            this.setState({
              loading: false,
              data: data.data,
              tableReady: true
            });
            /**
             * Not Really Used anymore but still could be used later
             */
            //localStorage.setItem("data", JSON.stringify(this.state.data));
            /**
             * Pushes the data to the Reports page and redirects to that page
             */
            this.props.history.push({
              pathname: "/Report",
              state: {
                data: this.state.data
              }
            });
          });
      });
    }
  }
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({ example_number: event.target.value, disabled: true });
    } else {
      this.setState({ example_number: event.target.value, disabled: false });
    }
    //console.log(this.state.example_number);
  }
  render() {
    const loading = this.state.loading;
    //console.log(exampleHeaders.headers[0]["Example"]);
    let optionItems = this.examples.map(example => (
      <option key={example} value={example}>
        {example}
      </option>
    ));

    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.example_number} onChange={this.handleChange}>
          <option value="">Choose an Example</option>
          {optionItems}
        </select>
        <br />
        {loading ? (
          <div>
            <label>
              {" "}
              Calculating Results <br />{" "}
              <LoadingSpinner color="copper" size={6} />{" "}
            </label>
          </div>
        ) : (
          <Button bsSize="sm" type="submit" disabled={this.state.disabled}>
            Calculate
          </Button>
        )}
        {/*this.state.tableReady ? (
          <div>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Wavelength</th>
                  <th>Power Value</th>
                </tr>
              </thead>
              <tbody>
                {/*this.state.data.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.wavelength}</td>
                      <td>{item.powerValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )*/}
      </form>
    );
  }
}

export default withRouter(Examples);
