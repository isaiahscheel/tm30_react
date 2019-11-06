import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "react-bootstrap/es/Grid";
import Card from "pnnl-react-core/lib/Card";
//import ProfilePopover from "pnnl-react-core/lib/ProfilePopover";

const Home = ({ me }) => {
  return (
    <Grid className="home-container">
      <h1>ANSI/IES TM-30-18 Advanced Calculation Web Tool</h1>
      {console.log("Version 0.1.2")
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
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
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
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
          <li>
            Lorem ipsum dolor sit amet, cras sit tortor, enim nulla aenean in
            turpis curabitur ipsum. Enim quam enim hymenaeos lorem quis, cras
            feugiat etiam adipiscing, sed id. Netus aliquam tincidunt vestibulum
            accumsan a, lectus laoreet nibh non purus in amet, sed neque viverra
            semper vitae non magnis, magna bibendum turpis dictumst sit fusce,
            vehicula donec enim accumsan in in. Ac hac elit, rutrum sem habitant
            nibh vestibulum nullam sit, fringilla turpis ut nunc lacus magna
            proin, nibh lacus dui cupidatat tempor nullam. Ultrices varius et
            vivamus. Pellentesque suspendisse, eu pulvinar quis inceptos{" "}
          </li>
        </ol>
      </Card>
    </Grid>
  );
};

export default Home;
