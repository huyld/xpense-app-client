import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from 'src/components/AppliedRoute';
import Home from 'src/containers/Home/Home';
import Login from 'src/containers/Login/Login';
import Signup from 'src/containers/Signup/Signup';
import NotFound from 'src/containers/NotFound/NotFound';

function Routes(props) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={props.childProps} />
      <AppliedRoute path="/login" exact component={Login} props={props.childProps} />
      <AppliedRoute path="/signup" exact component={Signup} props={props.childProps} />
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  childProps: PropTypes.object
};

export default Routes;
