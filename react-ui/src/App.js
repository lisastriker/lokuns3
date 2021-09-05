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

function App(){
  var userProfile = localStorage.getItem('useruid')
  return(
    <Router>
    <div className="App" style={{backgroundColor:"grey", height:"100%"}}>
    <AppBarComponent userProfile={userProfile}/>
      <Switch>
      <Route path="/user">
        <User />                                    
      </Route>
      <Route path="/cliniclanding">
        <ClinicLanding />
      </Route>
      <ProtectedRoute path='/home' component={Home} redirectPath="/"></ProtectedRoute>
      {userProfile ? <Route path="/signout"><ProfilePage/></Route> :<Route path="/"><SignInForm></SignInForm></Route>}
      </Switch>
    </div>
    </Router>
  )
}

export default App