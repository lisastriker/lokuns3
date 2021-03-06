import SignInForm from "./SignInForm";
import AppBarComponent from './Appbar'
import Home from './Home'
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';
import User from './User'
import styled from 'styled-components';
import Views from './Views'
import ClinicLanding from './ClinicLanding'
import AccordionComponent from './AccordianComponent'
import ProtectedRoute  from './ProtectedRoute';
import ProfilePage from './ProfilePage'
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import firebase from '@firebase/app';
function App(){
  //This is not rerendering because no state is changing

  //Always remember the / must be the last route
  
  return(
    <Router>
    <div className="App" style={{backgroundColor:"grey", height:"100%"}}>
    <AppBarComponent/>
      <Switch>
      <Route path="/user">
        <User />                                    
      </Route>
      <Route path="/cliniclanding">
        <ClinicLanding />
      </Route>
      <ProtectedRoute path='/signout' component={ProfilePage} redirectPath="/"></ProtectedRoute>
      <ProtectedRoute path='/home' component={Home} redirectPath="/"></ProtectedRoute>
      <Route path="/"><SignInForm></SignInForm></Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App

