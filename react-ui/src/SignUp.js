import { Typography, FormGroup, InputLabel as InputLabel1, TextField as TextField1, Button as Button1, FormHelperText, makeStyles} from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import firebase from '@firebase/app';
import { useHistory } from 'react-router-dom';
import { firebaseConfig } from "./firebaseConfig"
import SignInForm from './SignInForm'
import "firebase/firestore";
require('firebase/auth');
var firebaseui = require('firebaseui');
require('firebase/auth')

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
var db = firebase.firestore()
const Type = styled(Typography)`
  text-align:left;
  word-wrap: break-word;
  font-size:0.8em;
`

const Button = styled(Button1)`
  margin-top: 10px;
  width:80%;
  background-color:#1B203C;
  border-radius:10px;
  color:white;
  :hover{
    background-color:grey;
  }
`
const InputLabel = styled(InputLabel1)`
  font-family: roboto;
  font-size: 1.5em;
  font-weight: 400;
  width: 100%;
  text-align:center;
  margin-top:10px;
  margin-bottom:20px;
`


const TextField = styled(TextField1)`
  .MuiOutlinedInput-root {
    input {
      padding:5px 0 5px 10px;
    }
  }
  .MuiFormHelperText-root{
    margin:0;
  }
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  border-radius:10px;
  height: 100%;
  width: 100%;
  background-color:white;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
  box-sizing:border-box;
  width:50%;
  padding: 20px;
  border: 2px solid black;
  max-width:30%;
`

function SignUp(){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [name, setName] = useState("")
const [address, setAddress] = useState("")
const [medical, setMedical] = useState("")
const [phone, setPhone] = useState("")
const [errorMessage, setErrorMessage] = useState("")
const [nameError, setNameError] = useState("")
let history = useHistory();

function signUp(email, password){
  console.log("Here")
  if(name.length!==0 && address.length!==0 && medical.length!==0){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      db.collection("users").doc(userCredential.user.uid).set({
        uid:userCredential.user.uid,
        name: name,
        address:address,
        email: email,
        password: password,
        medical:medical,
        phone:phone
      }).then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
      console.log(userCredential.user.uid)
      history.push("/signin");
      // ...
    })
    .catch((error) => {
      setErrorMessage(error.message)
      console.log(error.message)
    });
  }
  
}

  return <MainContainer ><Container><FormGroupStyled>
  <InputLabel htmlFor="my-input">Sign Up</InputLabel>  
  <TextField helperText={name === ""? 'Please Input Your Name': <br></br>} error={name === ""? 'Please Input Your Name': ''} required={true} variant="outlined" placeholder="Name"  aria-describedby="my-helper-text" value={name} onChange={(event) => setName(event.target.value)}/>  
  <TextField helperText={address === ""? 'Please Input Your Address': <br></br>} error={address === ""? 'Please Input Your Name': ''} required={true}  variant="outlined" placeholder="Address"   aria-describedby="my-helper-text" value={address} onChange={(event) =>setAddress(event.target.value)}/>
  <TextField helperText={phone === ""? 'Please Input Your Phone Number': <br></br>} error={phone === ""? 'Please Input Your Name': ''} required={true} variant="outlined" placeholder="Phone Number"   aria-describedby="my-helper-text" value={phone} onChange={(event) => setPhone(event.target.value)}></TextField>
  <TextField helperText={email === ""? 'Please Input Your Email Address': <br></br>} error={email === ""? 'Please Input Your Name': ''} required={true}  variant="outlined" placeholder="Email"   aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)}></TextField>
  <TextField helperText={password === ""? 'Please Input Your Password': <br></br>} error={password === ""? 'Please Input Your Name': ''} required={true} type="password"  variant="outlined" placeholder="Password"   aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)}/>
  <TextField helperText={medical === ""? 'Please Input Your License': <br></br>} error={medical === ""? 'Please Input Your Name': ''} required={true} variant="outlined" placeholder="Medical License Number"  aria-describedby="my-helper-text" value={medical} onChange={(event) => setMedical(event.target.value)}/>
  <Button type="submit" label="submit" onClick={() => signUp(email, password)}>Submit</Button>
  <Type>{errorMessage}</Type>
  </FormGroupStyled>
  </Container>
  </MainContainer>

}

export default SignUp