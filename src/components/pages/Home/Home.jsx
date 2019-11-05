import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "react-bootstrap/es/Grid";
import Card from "pnnl-react-core/lib/Card";
//import ProfilePopover from "pnnl-react-core/lib/ProfilePopover";

const Home = ({ me }) => {
  if (me.id) {
    return (
      <Grid className="home-container">
        <h1>ANSI/IES TM-30-18 Advanced Calculation Web Tool</h1>
        {
          //<ProfilePopover person={me} />
        }
        {/*
        <ActionBar>
          <Col xs={4}>
            <Action to="/submit" icon="share" text="Submit" />
          </Col>
          <Col xs={4}>
            <Action to="/details" icon="info" text="Details" />
          </Col>
          <Col xs={4}>
            <Action to="/delete" icon="trash" text="Delete" />
          </Col>
        </ActionBar>
        */}

        <Card>
          <h1>Instructions</h1>
          <ol>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
          </ol>
        </Card>
        <br />
        <br />
        <Card>
          <h1>Troubleshoot</h1>
          <ol>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
            <li>
              Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
              turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
              feugiat etiam adipiscing, sed id. Netus aliquam tincidunt
              vestibulum accumsan a, lectus laoreet nibh non purus in amet, sed
              neque viverra semper vitae non magnis, magna bibendum turpis
              dictumst sit fusce, vehicula donec enim accumsan in in. Ac hac
              elit, rutrum sem habitant nibh vestibulum nullam sit, fringilla
              turpis ut nunc lacus magna proin, nibh lacus dui cupidatat tempor
              nullam. Ultrices varius et vivamus. Pellentesque suspendisse, eu
              pulvinar quis inceptos{" "}
            </li>
          </ol>
        </Card>
      </Grid>
    );
  }

  return (
    <div className="home-container">
      <h1>Home Page Title</h1>
      <p>No Data was fetched yet.</p>
    </div>
  );
};

Home.propTypes = {
  /**
   * A Person object for the person you want to create the card for.
   *
   *
   * The object needs to have the same naming convention as: https://api.pnl.gov/operations/v2/people/{hid}/?expand=space,facility
   * */
  me: PropTypes.shape({
    id: PropTypes.string,
    portraitLink: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    title: PropTypes.string
  })
};

Home.defaultProps = {
  me: {}
};

const mapStateToProps = state => {
  const { me } = state;
  return {
    me
  };
};

export default connect(mapStateToProps)(Home);
