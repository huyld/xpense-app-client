import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import AppliedRoute from 'src/components/Routing/AppliedRoute';
import AuthenticatedRoute from 'src/components/Routing/AuthenticatedRoute';
import UnauthenticatedRoute from 'src/components/Routing/UnauthenticatedRoute';

import Home from 'src/containers/Home/Home';
import Login from 'src/containers/Login/Login';
import Signup from 'src/containers/Signup/Signup';
import NotFound from 'src/containers/NotFound/NotFound';

import NewAccount from 'src/containers/Account/NewAccount';
import AccountList from 'src/containers/Account/AccountList';
import Account from 'src/containers/Account/Account';

import CategoryList from 'src/containers/Category/CategoryList';
import Category from 'src/containers/Category/Category';

function Routes(props) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={props.childProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} props={props.childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={props.childProps} />

      <AuthenticatedRoute path="/accounts/new" exact component={NewAccount} props={props.childProps} />
      <AuthenticatedRoute path="/accounts/:id" exact component={Account} props={props.childProps} />
      <AuthenticatedRoute path="/accounts" exact component={AccountList} props={props.childProps} />

      <AuthenticatedRoute path="/categories" exact component={CategoryList} props={props.childProps} />
      <AuthenticatedRoute path="/categories/new" exact component={Category} props={{ isEditMode: false, ...props.childProps }} />
      <AuthenticatedRoute path="/categories/:id" exact component={Category} props={{ isEditMode: true, ...props.childProps}} />
      <Route component={NotFound} />
    </Switch>
  );
}

Routes.propTypes = {
  childProps: PropTypes.object
};

export default Routes;
