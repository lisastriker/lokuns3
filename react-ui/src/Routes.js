
import React from 'react';
import User from './User';
// import { About } from './views/About';
import { NavBar } from './components/NavBar';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path="/User" component={User} />  
      </Switch>
      </Router>
    </div>
  );
};

// <Route exact path="/">
// {/* <Redirect to="/Home" />
// </Route>
// <Route exact path="/About" component={About} /> */}