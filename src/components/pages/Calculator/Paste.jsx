import React, { Component } from "react";
import Button from "react-bootstrap/es/Button";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import axios from "axios";
import data from "./ExamplesSpds.json";

export class Paste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spd_paste: "",
      spd_array: [],
      loading: false,
      data: [],
      wavelength_start: 380,
      wavelength_end: 780,
      step: 1,
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSPDChange = this.handleSPDChange.bind(this);

    console.log(data.data[0]["CIE F1"]);
  }

  handleSPDChange = event => {
    this.setState({ spd_paste: event.target.value }, function() {
      console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  handleStartChange = event => {
    this.setState({ wavelength_start: event.target.value }, function() {
      console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  handleEndChange = event => {
    this.setState({ wavelength_end: event.target.value }, function() {
      console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  handleStepChange = event => {
    this.setState({ step: event.target.value }, function() {
      console.log("setState completed", this.state);
      if (
        this.state.spd_paste !== "" &&
        this.state.step !== "" &&
        this.state.wavelength_end !== "" &&
        this.state.wavelength_start !== ""
      ) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  handleSubmit(event) {
    if (
      this.state.wavelength_start !== 380 ||
      this.state.wavelength_end !== 780 ||
      this.state.step !== 1
    ) {
      alert("Sorry SPDs other than 380-780 by stepd of 1 are not permitted");
    } else {
      this.setState(
        { spd_array: this.state.spd_paste.split("\n") },
        function() {
          console.log("setState completed", this.state);
          //event.preventDefault();
          console.log(this.state.spd_array.length);
          if (this.state.spd_array.length == 401) {
            this.setState({ loading: true }, () => {
              axios.defaults.headers.common = {};
              axios.defaults.headers.common.accept = "application/json";
              axios
                .post(
                  "https://cors-anywhere.herokuapp.com/http://dtn3.pnl.gov:8080/api/tm30Paste",
                  {
                    //.post("http://localhost:5000/api/tm30Paste", {
                    info: this.state.spd_array
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
          } else {
            alert("SPD size does not match interval size (error code: 409)");
          }
        }
      );
    }
  }
  render() {
    var loading = this.state.loading;
    return (
      <div>
        <h2>Option C</h2>
        <form>
          <div style={{ position: "inherit", display: "inline-block" }}>
            <label>
              Start Wavelength (nm):
              <br />
              <input
                onChange={this.handleStartChange}
                defaultValue={380}
              ></input>
            </label>
            <br />
            <label>
              End Wavelength (nm):
              <br />
              <input onChange={this.handleEndChange} defaultValue={780}></input>
            </label>
            <br />
            <label>
              Interval (nm):
              <br />
              <input onChange={this.handleStepChange} defaultValue={1}></input>
            </label>
          </div>
          <div
            style={{
              position: "inherit",
              display: "inline-block",
              width: "5%"
            }}
          ></div>
          <div style={{ position: "inherit", display: "inline-block" }}>
            <h3>Paste in your SPD</h3>
            <textarea
              rows="5"
              cols="50"
              onChange={this.handleSPDChange}
            ></textarea>
          </div>
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
            <Button
              bsSize="sm"
              onClick={this.handleSubmit}
              disabled={this.state.disabled}
            >
              Calculate
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Paste);
