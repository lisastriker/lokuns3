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
  const [name, setName] = useState("")
  const [profile,setProfile] = useState("")
  var db = firebase.firestore()
  //This is not rerendering because no state is changing
  const userProfile = localStorage.getItem('useruid' == null) ? "" : localStorage.getItem('useruid')
  useEffect(()=>{
    if(localStorage.getItem('useruid' !== null)){
      const userProfile = localStorage.getItem('useruid')
      db.collection("users").doc(userProfile).get().then((doc)=>{
        if (doc.exists) {
          setName(doc.data().name)
        } else { setName("")}
      })
    }   
  },[userProfile])
  
  //Always remember the / must be the last route
  
  return(
    <Router>
    <div className="App" style={{backgroundColor:"grey", height:"100%"}}>
    <AppBarComponent name={name}/>
      <Switch>
      <Route path="/user">
        <User />                                    
      </Route>
      <Route path="/cliniclanding">
        <ClinicLanding />
      </Route>
      <ProtectedRoute path='/home' component={Home} redirectPath="/"></ProtectedRoute>
      <ProtectedRoute path='/signout' component={ProfilePage} redirectPath="/"></ProtectedRoute>
      <Route path="/"><SignInForm></SignInForm></Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App

