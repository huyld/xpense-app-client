import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'src/containers/Home/Home';
import NotFound from 'src/containers/NotFound/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
