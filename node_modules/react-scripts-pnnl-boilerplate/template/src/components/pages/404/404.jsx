import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const FourOhFour = ({ location }) => (
  <Grid className="home-container">
    <h1>Page Does Not Exist</h1>
    <p>A page does not exist here at the requested location: {location.pathname}</p>
    <p>
      <Link to="/">Go Back Home</Link>
    </p>
  </Grid>
);

FourOhFour.propTypes = {
  location: PropTypes.object,
};

export default FourOhFour;