import React from "react";
import Button from "react-bootstrap/es/Button";
import axios from "axios";
import LoadingSpinner from "pnnl-react-core/lib/Loader";
import { withRouter } from "react-router-dom";

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    this.formData = new FormData();
    this.state = {
      loading: false,
      data: [],
      tableReady: false,
      disabled: true
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    /**
     * Send file to server
     * */
    this.setState({ loading: true }, () => {
      this.formData.append("file", this.fileInput.current.files[0]);
      axios
        .post("http://localhost:5000/api/uploadSPDX", this.formData)
        .then(res => {
          return res.data;
        })
        .then(data => {
          console.log(data.data);
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

  handleChange(event) {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        disabled: true
      });
    } else {
      this.setState({
        disabled: false
      });
    }
  }

  render() {
    const loading = this.state.loading;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Import .spdx file:
          <input
            type="file"
            ref={this.fileInput}
            onChange={this.handleChange}
          />
        </label>
        <br />
        {loading ? (
          <div>
            <label>
              {" "}
              Calculating Results <br />{" "}
              <LoadingSpinner color="copper" size="6" />{" "}
            </label>
          </div>
        ) : (
          <Button bsSize="sm" type="submit" disabled={true}>
            Calculate
          </Button>
        )}
        {this.state.tableReady ? (
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
                {this.state.data.map(function(item, key) {
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
        )}
      </form>
    );
  }
}
export default withRouter(FileInput);
