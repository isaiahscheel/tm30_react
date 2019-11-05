import React from "react";
import Card from "pnnl-react-core/lib/Card";

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    /*
        this.state = {
          data: [],
        };
    let data = [];
    if (localStorage && localStorage.getItem('data')) {
       data = JSON.parse(localStorage.getItem('data'));
      }
     this.setState({data: data})
     */
  }

  render() {
    return (
      <div>
        {console.log(this.props.data)}
        {this.props.data.length > 0 ? (
          <div class="tableCard">
            <Card>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Wavelength</th>
                    <th>Power Value</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.map(function(item, key) {
                    return (
                      <tr key={key}>
                        <td>{Number((item.wavelength).toFixed(5))}</td>
                        <td>{Number((item.powerValue).toFixed(5))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ResultsTable;
