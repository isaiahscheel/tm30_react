/**
 * Home.
 *
 * A component for the Homepage of the tm30 web calculator.
 * Contains instructions and uses for the calculator.
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React from "react";
import Grid from "react-bootstrap/es/Grid";
import Card from "pnnl-react-core/lib/Card";
import { red } from "@material-ui/core/colors";
import { rgbToHex } from "@material-ui/core/styles";
//import Footer from "pnnl-react-core/lib/WebFooter/WebFooter";

/**
 * Home Class
 */
const Home = () => {
  /**
   * Return for the Home class. Mostly instructions and boilerplate info.
   */
  return (
    <div>
      <Grid className="home-container">
        <br />
        <br />
        <Card>
          <h1>Overview</h1>
          <ul>
            <li>
              This Web Application has been approved and copyrighted by the
              Illuminating Engineering Society (IES) for use in conjunction with
              ANSI/IES TM-30-18. In the event of any discrepancy between the
              calculation tool should be directed to Michael Royer at
              michael.royer@pnnl.gov
            </li>
            <li>
              This calculation tool requires the use of an internet connection
              to send data to a remote server that runs the calculations. It
              works on both PC and Mac. The tool works with an inputed SPD from
              380 - 780 by a specified step.{" "}
              <span style={{ color: "red" }}>
                <b>As of 12/07/2020 the step size can only be an integer.</b>
              </span>
            </li>
            <li>
              There is no way to manipulate the C code running on the remote
              server. Please contact Michael Royer if a change is necessary.
            </li>
          </ul>
        </Card>
        <br />
        <br />
        <Card>
          <h1>Instructions</h1>
          <ol>
            <li>
              Ensure that you have internet access and are able to send data. If
              you do not have an internet connection and attempt to send an SPD
              (via the 'Calculate button') you will get an endless loading icon.
              Please refresh your browser and connect to internet.
              <ul>
                <li>
                  If you do have internet connection and get an endless loading
                  icon, refresh the page and/or right click on white space,
                  click 'inspect', click on 'console' and read the output
                  message
                </li>
              </ul>
            </li>
            <li>
              Use the "Data Input" tab to input the spectral power distribution
              (SPD) and its associated attributes for a light source.
              <ul>
                <li>
                  The SPD may be input by A) selecting an SPD from the
                  'examples' drop-down menu, B) importing an SPDX-format file
                  (using the "Import .spdx file" button), or C) pasting the
                  power values from another document (using the "Paste" tab).
                </li>
                <li>
                  If an SPD is chosen from the library or imported from an
                  SPDX-format file, the calculation will be performed once the
                  user clicks 'calculate'.
                </li>
                <li>
                  If the values are pasted, you must adjust the start
                  wavelength, end wavelength, and increment to match the data
                  you have entered; these inputs are in the 'Pate' tab and will
                  create a table to paste into once the user click 'Create
                  Table'. The preferred wavelength range is 380 to 780 nm. The
                  increment, which describes the difference in wavelength for
                  consecutive values in the SPD, should always be 5 nm or less.
                  1 nm is preferred. After pasting the SPD and entering the
                  parameters, click "Calculate" to initiate the calculation.
                </li>
                <li>
                  <b>Important - This web app actually can't do this yet </b>
                  This web app can calculate display values for color samples to
                  illustrate the effect of the test source relative to the
                  reference illuminant. These visualizations increase the
                  calculation time. This feature can be turned off using the
                  check box on the "Main" sheet.
                </li>
                <li>
                  The display of the Color Vector Graphic can be altered by the
                  user by checking or unchecking the boxes corresponding to the
                  bin labels, bin divider lines, and polar increments.
                </li>
                <li>
                  All user-input and calculated data can be cleared by going
                  back to the data input tab or navigating away and then back.
                  Refreshing on the report page will not clear the data.
                </li>
              </ul>
            </li>
            <li>
              An overview of the calculation results is provided in the
              "Calculator" sheet. Additional results are available in the
              "Results Graphical" and "Results Numerical" sheets. The "CVG"
              sheet provides different versions of the Color Vector Graphic that
              do not change in response to the user input on the "Calculator"
              sheet.
            </li>
            <li>
              Three versions of printable reports are available in sheets
              "Simple Report", "Intermediate Report", and "Full Report". Simply
              click on the "Image" button to download the report. Printing size
              is up to the user.
            </li>
            <li>
              <b>Important - This web app actually can't do this yet </b> -
              Three libraries of SPDs are included in this workbook. SPDs may be
              stored in the "User SPDs" library for recall via the main
              calculation, or to be calculated as a group (numerical results
              only). New SPDs can be added by to the library by adding the
              header information and power values. <br /> The "Commercial SPDs"
              library includes SPDs provided by manufacturers. It may not be
              modified by the user. Please check for updates at
              http://www.ies.org/redirect/tm-30/. <br /> The "Example SPDs"
              library includes a set of SPDs intended to help users understand
              ANSI/IES TM-30-18. This Library has been populated with a subset
              of SPDs used in: Kevin W. Houser, Minchen Wei, Aurélien David,
              Michael R. Krames, and Xiangyou Sharon Shen. Optics Express, Vol.
              21, Issue 8, pp. 10393-10411 (2013) -
              http://dx.doi.org/10.1364/OE.21.010393. Please refer to this
              manuscript for additional specifics and citations regarding the
              origins of the SPDs. These SPDs serve only as examples and should
              not be considered official representations of any lamp technology
              or manufacturer. The dataset is not intended to be a statistical
              sample for use in analyses.
            </li>
            <li>
              <b>Important - This web app actually can't do this yet </b> - The
              "Multiple Calculator" sheet allows for simultaneous calculation of
              a large number of SPDs from any of the three libraries. It
              provides numerical results only. Calculating large numbers of SPDs
              may require considerable time.
            </li>
            <li>
              <b>Important - Not Needed for web app </b> - The sheets not
              previously mentioned (gray color) include data that is used in the
              calculations, such as the reflectance factors of each of the 99
              CES. It may be informative to view these tabs, but the values must
              not be modified.
            </li>
            <li>
              <b>Important - Not Needed for web app </b> - Do not modify the
              position of any cells within this workbook, as it may cause errors
              in the code used to execute the calculation.
            </li>
          </ol>
        </Card>
        <br />
        <br />
        <Card>
          <h1>Troubleshoot</h1>
          <ol>
            <li>
              If you receive an endless spinning circle please check your
              connection. If your connection is fine, refresh the web page and
              try again. If that doesn't work, right click on white space and
              click 'inspect', from there navigate to 'console', and see your
              error message.
              <ul>
                <li>
                  Potential errors could be a 404 - Server down or unreachable
                </li>
              </ul>
            </li>
            <li>
              If none of your calculations are working, the server is most
              likely down for maintenance
            </li>
          </ol>
        </Card>
      </Grid>
    </div>
  );
};
/**
 * Export command
 */
export default Home;
