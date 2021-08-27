import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, Button as Button1 } from '@material-ui/core';
import styled from 'styled-components'
import "firebase/firestore";
import firebase from '@firebase/app';
import { firebaseConfig } from "./firebaseConfig"
import { useHistory } from 'react-router-dom';
require('firebase/auth');

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
const Button = styled(Button1)`
  width:80%;
  background-color:#1B203C;
  border-radius:10px;
  color:white;
  :hover{
    background-color:grey;
  }
`

function ProfilePage(){
  let history = useHistory();
  async function logOut(){
    try {
  
      await firebase.auth().signOut();
      sessionStorage.clear()
      history.push("/")
  
    } catch (error) {
      console.log(error);
    }
  }
  return <div>
      <Button label="Sign Out" onClick={() => logOut()}>Sign Out</Button>
      I"M THE PROFILE PAGE</div>
}

export default ProfilePage