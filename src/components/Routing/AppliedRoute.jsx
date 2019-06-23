import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const AppliedRoute = ({ component: C, props: cProps, ...rest }) => {
  return <Route {...rest} render={props => <C {...props} {...cProps} />} />;
};

AppliedRoute.propTypes = {
  component: PropTypes.func,
  props: PropTypes.object,
};

export default AppliedRoute;
