import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Get the value of specific param of querystring in URL
 *
 * @param {string} name name of the param
 * @param {string} [url=window.location.href]
 * @returns
 */
function getQuerystringParamValue(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  const redirect = getQuerystringParamValue('redirect');
  return <Route
    {...rest}
    render={props =>
      !cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
          to={redirect === '' || redirect === null ? '/' : redirect} />}
  />;
};

export default UnauthenticatedRoute;
