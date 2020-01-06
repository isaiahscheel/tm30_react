/**
 * Numerical.
 *
 * A component for the Numerical tab in the Reports page.
 * Based off of the Excel 'Results Nimerical' tab in the
 * IES TM30 Excel Calculator
 *
 * This page displays every single output from the C code JSON file.
 * A lot of Data is being displayed and the tables often get very large and cluttered
 * The tables are scrollable and it looks fine on mac but
 * on PC they look a little odd with the scrollbars always there
 *
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React, { Component } from "react";
import Table from "react-bootstrap/es/Table";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Card from "pnnl-react-core/lib/Card";

/**
 * Numerical Class
 */
export class Numerical extends Component {
  /**
   * Constructor for the Numerical class.
   * Sets tm30 from the props. Tm30 is the 'Numerical Results' from the
   * returned JSON from the C code. If you are unsure of the formatting
   * check the server side return JSON to see how it is formatted.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.tm30 = this.props.tm30;
    this.input = this.props.input;

    this.lcs = []; //Local Chroma Shift Data
    this.lhs = []; //Local Hue Shift Data
    this.lcf = []; //Local Color Fidelity Data
    this.huebin_row = []; //Array of row objects
    this.sample_count = []; //Sample Count Data
    this.atest = []; //Local a' Test Coordinate
    this.btest = []; //Local b' Test Corrdinate
    this.aref = []; //Local a' Reference Coordinate
    this.bref = []; //Local b' Reference Coordinate
    this.da = []; //da_relative Data
    this.db = []; //db_relative Data
    this.pathxref = []; //path_x ref Data
    this.pathyref = []; //path_y ref Data
    this.pathxtest = []; //path_x test Data
    this.pathytest = []; //path_y test Data
    this.ces = []; //CES Constants stored in this array later on
    this.color_sample_fidelity = []; //Color Sample Fidelity Data
    this.j_test_coordinates = []; //J' Test Coordinates
    this.a_test_coordinates = []; //a' Test Coordinates
    this.b_test_coordinates = []; //b' Test Coordinaters
    this.j_ref_coordinates = []; //J' Reference Coordinates
    this.a_ref_coordinates = []; //a' Reference Coordinates
    this.b_ref_coordinates = []; //b' Reference Coordinates
    this.hue_angle_bin = []; //Hue-angle Bin Data (Which huebin each sample is in)
    this.normalized_SPD_test = []; //Normalized SPD Test Data
    this.normalized_SPD_ref = []; //Normalized SPD Ref Data
    this.spd = []; //The original SPD
    this.wavelength = this.input.Wavelength;

    /**
     * The standard Huebin Colors. Not calculated
     * Not a standard, only used for asthetic purposes
     */
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

      this.huebin_row.push(
        <tr>
          <td style={{ backgroundColor: this.colors[i] }}>
            <b>{i + 1}</b>
          </td>
          <td>{this.lcs[i]}%</td>
          <td>{this.lhs[i].toFixed(2)}</td>
          <td>{this.lcf[i]}</td>
          <td>{this.sample_count[i]}</td>
          <td>{this.atest[i].toFixed(2)}</td>
          <td>{this.btest[i].toFixed(2)}</td>
          <td>{this.aref[i].toFixed(2)}</td>
          <td>{this.bref[i].toFixed(2)}</td>
          <td>{this.da[i].toFixed(2)}</td>
          <td>{this.db[i].toFixed(2)}</td>
          <td>{this.pathxref[i].toFixed(2)}</td>
          <td>{this.pathyref[i].toFixed(2)}</td>
          <td>{this.pathxtest[i].toFixed(2)}</td>
          <td>{this.pathytest[i].toFixed(2)}</td>
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
          <td>{this.j_test_coordinates[i].toFixed(2)}</td>
          <td>{this.a_test_coordinates[i].toFixed(2)}</td>
          <td>{this.b_test_coordinates[i].toFixed(2)}</td>
          <td>{this.j_ref_coordinates[i].toFixed(2)}</td>
          <td>{this.a_ref_coordinates[i].toFixed(2)}</td>
          <td>{this.b_ref_coordinates[i].toFixed(2)}</td>
          <td>{this.hue_angle_bin[i]}</td>
        </tr>
      );
    }
    for (i = 0; i < this.wavelength.length; i++) {
      this.normalized_SPD_test.push(
        Math.round(this.tm30.normalized_SPD_test[i] * 10000) / 10000
      );
      this.normalized_SPD_ref.push(
        Math.round(this.tm30.normalized_SPD_ref[i] * 10000) / 10000
      );

      this.spd.push(
        <tr>
          <td>{this.wavelength[i]}</td>
          <td>
            <font color="#fd191f">
              {this.normalized_SPD_test[i].toFixed(4)}
            </font>
          </td>
          <td>
            <font color="#021f5f">{this.normalized_SPD_ref[i].toFixed(4)}</font>
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
                      <th
                        style={{ borderBottom: "none", paddingBottom: "0px" }}
                      >
                        Fidelity Index
                      </th>
                      <th
                        style={{ borderBottom: "none", paddingBottom: "0px" }}
                      >
                        Gamut Index
                      </th>
                    </tr>
                    <tr>
                      <th style={{ borderTop: "none", paddingTop: "0px" }}>
                        <i>R</i>
                        <sub>f</sub>
                      </th>
                      <th style={{ borderTop: "none", paddingTop: "0px" }}>
                        <i>R</i>
                        <sub>g</sub>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{Math.round(this.tm30.rg)}</td>
                      <td>{Math.round(this.tm30.rf)}</td>
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
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Hue-Angle Bin
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Local Chroma Shift
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Local Hue Shift
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Local Color Fidelity
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Sample Count
                    </th>
                    <th
                      colSpan="2"
                      style={{ borderBottom: "none", paddingBottom: "0px" }}
                    >
                      Test <br /> Coordinates
                    </th>
                    <th
                      colSpan="2"
                      style={{ borderBottom: "none", paddingBottom: "0px" }}
                    >
                      Reference Coordinates
                    </th>
                    <th
                      colSpan="6"
                      style={{ borderBottom: "none", paddingBottom: "0px" }}
                    >
                      Color Vector Graphics Elements <br />
                      &nbsp;
                    </th>
                  </tr>

                  <tr>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>j</i>
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>R</i>
                      <sub>
                        cs,h<i>j</i>
                      </sub>
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>R</i>
                      <sub>
                        hs,h<i>j</i>
                      </sub>
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>R</i>
                      <sub>
                        f,h<i>j</i>
                      </sub>
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>m</i>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>a</i>'
                      <sub>
                        test,<i>j</i>
                      </sub>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>b</i>'
                      <sub>
                        test,<i>j</i>
                      </sub>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>a</i>'
                      <sub>
                        ref,<i>j</i>
                      </sub>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>b</i>'
                      <sub>
                        ref,<i>j</i>
                      </sub>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      da relative
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      db relative
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      path_x ref
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      path_y ref
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      path_x test
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      path_y test
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.huebin_row[0]}
                  {this.huebin_row[1]}
                  {this.huebin_row[2]}
                  {this.huebin_row[3]}
                  {this.huebin_row[4]}
                  {this.huebin_row[5]}
                  {this.huebin_row[6]}
                  {this.huebin_row[7]}
                  {this.huebin_row[8]}
                  {this.huebin_row[9]}
                  {this.huebin_row[10]}
                  {this.huebin_row[11]}
                  {this.huebin_row[12]}
                  {this.huebin_row[13]}
                  {this.huebin_row[14]}
                  {this.huebin_row[15]}
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
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Sample
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Color Sample Fidelity
                    </th>
                    <th
                      colSpan={3}
                      style={{ borderBottom: "none", paddingBottom: "0px" }}
                    >
                      Test Coordinates
                    </th>
                    <th
                      colSpan={3}
                      style={{
                        borderBottom: "none",
                        paddingBottom: "0px"
                      }}
                    >
                      Reference Coordinates
                    </th>
                    <th style={{ borderBottom: "none", paddingBottom: "0px" }}>
                      Hue-Angle Bin
                    </th>
                  </tr>
                  <tr>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>i</i>
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>R</i>
                      <sub>
                        f,CES<i>i</i>
                      </sub>
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>
                        J'
                        <sub>t,i</sub>{" "}
                      </i>{" "}
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>a</i>'
                      <sub>
                        t,<i>i</i>
                      </sub>{" "}
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>b</i>'
                      <sub>
                        t,<i>i</i>
                      </sub>{" "}
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>J</i>'
                      <sub>
                        r,<i>i</i>
                      </sub>{" "}
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>a</i>'
                      <sub>
                        r,<i>i</i>
                      </sub>{" "}
                    </th>
                    <th
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        paddingTop: "0px"
                      }}
                    >
                      {" "}
                      <i>b</i>'
                      <sub>
                        r,<i>i</i>
                      </sub>{" "}
                    </th>
                    <th style={{ borderTop: "none", paddingTop: "0px" }}>
                      <i>j</i>
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
                      <th
                        colSpan={3}
                        style={{ borderBottom: "none", paddingBottom: "0px" }}
                      >
                        NORMALIZED SPECTRAL POWER DISTRIBUTION (Y = 100)
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          paddingTop: "0px"
                        }}
                      >
                        Wavelength(nm)
                      </th>
                      <th
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                          paddingTop: "0px"
                        }}
                      >
                        <font color="#fd191f">Test</font>
                      </th>
                      <th
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          paddingTop: "0px"
                        }}
                      >
                        <font color="#021f5f">Refereance</font>
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
                      <th
                        style={{
                          borderBottom: "none",
                          paddingTop: "0px"
                        }}
                      ></th>
                      <th
                        colSpan={2}
                        style={{
                          borderBottom: "none"
                        }}
                      >
                        Summary data
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          borderTop: "none",
                          paddingTop: "0px"
                        }}
                      ></th>
                      <th
                        style={{
                          borderTop: "none",
                          paddingTop: "0px",
                          borderRight: "none"
                        }}
                      >
                        <font color="fd191f">Test</font>
                      </th>

                      <th
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          paddingTop: "0px"
                        }}
                      >
                        <font color="021f5f">Refereance</font>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>CCT</th>

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
                      <th>
                        <i>D</i>
                        <sub>uv</sub>
                      </th>
                      <td>
                        <font color="fd191f">
                          {(
                            Math.round(this.tm30.DUV[0] * 10000) / 10000
                          ).toFixed(4)}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {(
                            Math.round(this.tm30.DUV[1] * 10000) / 10000
                          ).toFixed(4)}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i>x</i>
                      </th>
                      <td>
                        <font color="fd191f">
                          {(Math.round(this.tm30.x[0] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {(Math.round(this.tm30.x[1] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i>y</i>
                      </th>
                      <td>
                        <font color="fd191f">
                          {(Math.round(this.tm30.y[0] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {(Math.round(this.tm30.y[1] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i>u'</i>
                      </th>
                      <td>
                        <font color="fd191f">
                          {(Math.round(this.tm30.u[0] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {(Math.round(this.tm30.u[1] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <i>v'</i>
                      </th>
                      <td>
                        <font color="fd191f">
                          {(Math.round(this.tm30.v[0] * 10000) / 10000).toFixed(
                            4
                          )}
                        </font>
                      </td>
                      <td>
                        <font color="021f5f">
                          {(Math.round(this.tm30.v[1] * 10000) / 10000).toFixed(
                            4
                          )}
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
