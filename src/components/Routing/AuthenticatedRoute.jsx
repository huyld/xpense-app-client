import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
          to={`/login?redirect=${props.location.pathname}${props.location
            .search}`}
        />}
  />;

AuthenticatedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  props: PropTypes.object,
};

export default AuthenticatedRoute;
