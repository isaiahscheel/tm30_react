import React, { Component } from "react";
import Table from "react-bootstrap/es/Table";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Card from "pnnl-react-core/lib/Card";

export class Numerical extends Component {
  constructor(props) {
    super(props);
    this.tm30 = this.props.tm30;

    this.lcs = [];
    this.lhs = [];
    this.lcf = [];
    this.lcs_lhs_lcf = [];
    this.sample_count = [];
    this.atest = [];
    this.btest = [];
    this.aref = [];
    this.bref = [];
    this.da = [];
    this.db = [];
    this.pathxref = [];
    this.pathyref = [];
    this.pathxtest = [];
    this.pathytest = [];
    this.ces = [];
    this.color_sample_fidelity = [];
    this.j_test_coordinates = [];
    this.a_test_coordinates = [];
    this.b_test_coordinates = [];
    this.j_ref_coordinates = [];
    this.a_ref_coordinates = [];
    this.b_ref_coordinates = [];
    this.hue_angle_bin = [];
    this.normalized_SPD_test = [];
    this.normalized_SPD_ref = [];
    this.spd = [];

    this.colors = [
      "#b45c60",
      "#cb7761",
      "#cb824b",
      "#d7ad67",
      "#ac9a5d",
      "#919E60",
      "#678B5F",
      "#62B08F",
      "#7CBABA",
      "#2C797D",
      "#54778C",
      "#7189B1",
      "#988CA9",
      "#735876",
      "#8F6682",
      "#B97B8E"
    ];

    var i;
    for (i = 0; i < 16; i++) {
      this.lcs.push(Math.round(this.tm30.local_chroma_shift[i]));
      this.lhs.push(Math.round(this.tm30.local_hue_shift[i] * 100) / 100);
      this.lcf.push(Math.round(this.tm30.local_color_fidelity[i]));
      this.sample_count.push(this.tm30.sample_count[i]);
      this.atest.push(Math.round(this.tm30.a_prime_test_j[i] * 100) / 100);
      this.btest.push(Math.round(this.tm30.b_prime_test_j[i] * 100) / 100);
      this.aref.push(Math.round(this.tm30.a_prime_ref_j[i] * 100) / 100);
      this.bref.push(Math.round(this.tm30.b_prime_ref_j[i] * 100) / 100);
      this.da.push(Math.round(this.tm30.da_relative[i] * 100) / 100);
      this.db.push(Math.round(this.tm30.db_relative[i] * 100) / 100);
      this.pathxref.push(Math.round(this.tm30.path_xref[i] * 100) / 100);
      this.pathyref.push(Math.round(this.tm30.path_yref[i] * 100) / 100);
      this.pathxtest.push(Math.round(this.tm30.path_xtest[i] * 100) / 100);
      this.pathytest.push(Math.round(this.tm30.path_ytest[i] * 100) / 100);

      this.lcs_lhs_lcf.push(
        <tr>
          <td style={{ "background-color": this.colors[i] }}>
            <b>{i + 1}</b>
          </td>
          <td>{this.lcs[i]}%</td>
          <td>{this.lhs[i]}</td>
          <td>{this.lcf[i]}</td>
          <td>{this.sample_count[i]}</td>
          <td>{this.atest[i]}</td>
          <td>{this.btest[i]}</td>
          <td>{this.aref[i]}</td>
          <td>{this.bref[i]}</td>
          <td>{this.da[i]}</td>
          <td>{this.db[i]}</td>
          <td>{this.pathxref[i]}</td>
          <td>{this.pathyref[i]}</td>
          <td>{this.pathxtest[i]}</td>
          <td>{this.pathytest[i]}</td>
        </tr>
      );
    }

    for (i = 0; i < 99; i++) {
      //CES
      this.color_sample_fidelity.push(
        Math.round(this.tm30.color_sample_fidelity[i])
      );
      this.j_test_coordinates.push(
        Math.round(this.tm30.j_test_coordinates[i] * 100) / 100
      );
      this.a_test_coordinates.push(
        Math.round(this.tm30.a_test_coordinates[i] * 100) / 100
      );
      this.b_test_coordinates.push(
        Math.round(this.tm30.b_test_coordinates[i] * 100) / 100
      );
      this.j_ref_coordinates.push(
        Math.round(this.tm30.j_ref_coordinates[i] * 100) / 100
      );
      this.a_ref_coordinates.push(
        Math.round(this.tm30.a_ref_coordinates[i] * 100) / 100
      );
      this.b_ref_coordinates.push(
        Math.round(this.tm30.b_ref_coordinates[i] * 100) / 100
      );
      this.hue_angle_bin.push(this.tm30.hue_angle_bin[i]);

      this.ces.push(
        <tr>
          <td>CES{i + 1 < 10 ? `0${i + 1}` : i + 1}</td>
          <td>{this.color_sample_fidelity[i]}</td>
          <td>{this.j_test_coordinates[i]}</td>
          <td>{this.a_test_coordinates[i]}</td>
          <td>{this.b_test_coordinates[i]}</td>
          <td>{this.j_ref_coordinates[i]}</td>
          <td>{this.a_ref_coordinates[i]}</td>
          <td>{this.b_ref_coordinates[i]}</td>
          <td>{this.hue_angle_bin[i]}</td>
        </tr>
      );
    }
    for (i = 0; i < 400; i++) {
      this.normalized_SPD_test.push(
        Math.round(this.tm30.normalized_SPD_test[i] * 10000) / 10000
      );
      this.normalized_SPD_ref.push(
        Math.round(this.tm30.normalized_SPD_ref[i] * 10000) / 10000
      );

      this.spd.push(
        <tr>
          <td>{i + 380}</td>
          <td>
            <font color="#fd191f">{this.normalized_SPD_test[i]}</font>
          </td>
          <td>
            <font color="#021f5f">{this.normalized_SPD_ref[i]}</font>
          </td>
        </tr>
      );
    }
  }
  render() {
    return (
      <div>
        <Grid fluid={true}>
          <h2 align="center">Color Rendition Global Averages </h2>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Card className="CardOverflowScoll">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        Fidelity Index <hr /> R<sub>f</sub>
                      </th>
                      <th>
                        Gamut Index <hr /> R<sub>g</sub>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{Math.round(this.tm30.rf)}</td>
                      <td>{Math.round(this.tm30.rg)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <h2 align="center">Color Rendition Local Averages </h2>
            <Card className="CardOverflowScoll">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      Hue-Angle Bin <hr /> <i>j</i>
                    </th>
                    <th align="center">
                      Local Chroma Shift <hr /> R
                      <sub>
                        cs,h<i>j</i>
                      </sub>
                    </th>
                    <th>
                      Local Hue Shift <hr /> R
                      <sub>
                        hs,h<i>j</i>
                      </sub>
                    </th>
                    <th>
                      Local Color Fidelity <hr /> R
                      <sub>
                        f,h<i>j</i>
                      </sub>
                    </th>
                    <th>
                      Sample Count <hr /> <i>m</i>
                    </th>
                    <th colSpan="2">
                      Test Coordinates <hr />{" "}
                      <Col xs={6}>
                        <i>
                          a'
                          <sub>test,j</sub>
                        </i>{" "}
                      </Col>
                      <Col xs={6}>
                        <i>
                          b'<sub>test,j</sub>
                        </i>
                      </Col>
                    </th>
                    <th colSpan="2">
                      Reference Coordinates <hr />{" "}
                      <Col xs={6}>
                        <i>
                          a'
                          <sub>ref,j</sub>
                        </i>{" "}
                      </Col>
                      <Col xs={6}>
                        <i>
                          b'<sub>ref,j</sub>
                        </i>
                      </Col>
                    </th>
                    <th colSpan="6">
                      Reference Coordinates <hr /> <Col xs={2}>da relative</Col>
                      <Col xs={2}>db relative</Col>
                      <Col xs={2}>path_x ref</Col>
                      <Col xs={2}>path_y ref</Col>
                      <Col xs={2}>path_x test</Col>
                      <Col xs={2}>path_y test</Col>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.lcs_lhs_lcf[0]}
                  {this.lcs_lhs_lcf[1]}
                  {this.lcs_lhs_lcf[2]}
                  {this.lcs_lhs_lcf[3]}
                  {this.lcs_lhs_lcf[4]}
                  {this.lcs_lhs_lcf[5]}
                  {this.lcs_lhs_lcf[6]}
                  {this.lcs_lhs_lcf[7]}
                  {this.lcs_lhs_lcf[8]}
                  {this.lcs_lhs_lcf[9]}
                  {this.lcs_lhs_lcf[10]}
                  {this.lcs_lhs_lcf[11]}
                  {this.lcs_lhs_lcf[12]}
                  {this.lcs_lhs_lcf[13]}
                  {this.lcs_lhs_lcf[14]}
                  {this.lcs_lhs_lcf[15]}
                </tbody>
              </Table>
            </Card>
          </Row>
          <h2 align="center">
            Color Rendition of Color Evaluation Samples (CES)
          </h2>
          <Row>
            <Card className="SampleTable">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      Sample
                      <hr /> <i>i</i>
                    </th>
                    <th>
                      Color Sample Fidelity <hr /> R<sub>f</sub>,CES<i>i</i>
                    </th>
                    <th colSpan={3}>
                      Test Coordinates <hr />
                      <Col xs={4} padding="0">
                        <i>
                          J'
                          <sub>t,i</sub>
                        </i>{" "}
                      </Col>
                      <Col xs={4}>
                        <i>
                          a'<sub>t,i</sub>
                        </i>
                      </Col>
                      <Col xs={4}>
                        <i>
                          b'<sub>t,i</sub>
                        </i>
                      </Col>
                    </th>
                    <th colSpan={3}>
                      Reference Coordinates <hr />
                      <Col xs={4}>
                        <i>
                          J'
                          <sub>r,i</sub>
                        </i>{" "}
                      </Col>
                      <Col xs={4}>
                        <i>
                          a'<sub>r,i</sub>
                        </i>
                      </Col>
                      <Col xs={4}>
                        <i>
                          b'<sub>r,i</sub>
                        </i>
                      </Col>
                    </th>
                    <th>
                      Hue-Angle Bin <hr /> <i>j</i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.ces.map((component, index) => (
                    <React.Fragment key={index}>{component}</React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Row>
          <Row>
            <h2 align="center">
              Test Source and Reference Illuminant Properties
            </h2>
          </Row>
          <Row>
            <Col xs={7}>
              <Card className="SampleTable">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>
                        NORMALIZED SPECTRAL POWER DISTRIBUTION (Y = 100) <hr />
                        <Row className="row-no-gutters">
                          <Col xs={4}>Wavelength(nm)</Col>
                          <Col xs={4}>
                            <font color="#fd191f">Test</font>
                          </Col>{" "}
                          <Col xs={4}>
                            <font color="#021f5f">Refereance</font>
                          </Col>
                        </Row>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.spd.map((component, index) => (
                      <React.Fragment key={index}>{component}</React.Fragment>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xs={5}>
              <Card className="CardOverflowScoll">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="no-padding" ColSpan={3}>
                        <Row className="row-no-gutters">
                          <Col xs={3}></Col>
                          <Col xs={9}>
                            Summary data <hr />{" "}
                          </Col>{" "}
                          <Col xs={4} />
                          <Col xs={4}>
                            <font color="fd191f">
                              <center>Test</center>
                            </font>
                          </Col>{" "}
                          <Col xs={4}>
                            <font color="021f5f">Refereance</font>
                          </Col>
                        </Row>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>CCT</b>
                      </td>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.CCT[0])}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.CCT[1])}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>DUV</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.DUV[0] * 10000) / 1000}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.DUV[1] * 10000) / 1000}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>x</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.x[0] * 10000) / 1000}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.x[1] * 10000) / 1000}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>y</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.y[0] * 10000) / 1000}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.y[1] * 10000) / 1000}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>u'</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.u[0] * 10000) / 1000}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.u[1] * 10000) / 1000}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>v'</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.v[0] * 10000) / 1000}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.v[1] * 10000) / 1000}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>LER</th>
                      <td>
                        <font color="fd191f">
                          {Math.round(this.tm30.LER[0])}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {Math.round(this.tm30.LER[1])}
                        </font>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Numerical;
