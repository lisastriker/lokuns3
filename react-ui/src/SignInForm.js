import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, Button as Button1 } from '@material-ui/core';
import { useState } from 'react';
import firebase from 'firebase/app';
import "firebase/firestore";
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
const InputLabel = styled(InputLabel1)`
  font-family: roboto;
  font-size: 1.5em;
  font-weight: 400;
  width: 100%;
  text-align:center;
  margin-top:10px;
  margin-bottom:40px;
`

const Button = styled(Button1)`
  width:80%;
  background-color:#1B203C;
  border-radius:10px;
  color:white;
  :hover{
    background-color:grey;
  }
`

const Input = styled(Input1)`
  padding-left:10px;  
  background:white;
  width:100%;
  border:solid black 0.5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin-bottom:10px;
  border-radius:5px;
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
  padding: 50px;
  border: 2px solid black;
  max-width:30%;
  width:30%;
`
const Type = styled(Typography)`
  margin: 5px 0px 5px 0px;
  text-align:left;
  word-wrap: break-word;
  font-size:0.8em;
`
//Need to protect some of these routes
function SignInForm(){
let history = useHistory();
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errorMessage, setErrorMessage] = useState("")
function signIn(email, password){
  console.log("I'm here")
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log("Signed in")
    localStorage.setItem('useruid', userCredential.user.uid)
    console.log(userCredential.user)
    history.push("/home");
  })
  .catch((error) => {
    setErrorMessage(error.message);
  });
}
  return <MainContainer ><Container><FormGroupStyled>
  <InputLabel htmlFor="my-input">Sign In</InputLabel>  
  <Input required={true} placeholder="Email Address" id="my-input" aria-describedby="my-helper-text" value={email} onChange={(event) => setEmail(event.target.value)}/>
  <Input required={true} type="password" id="my-input" aria-describedby="my-helper-text" value={password} onChange={(event) => setPassword(event.target.value)}/>
  <Button type="submit" label="submit" onClick={() => signIn(email, password)}>Submit</Button>
  <Type>{errorMessage}</Type>
  <Type htmlFor="my-input">If you don't have an account sign up.</Type>  
  <Button type="submit" style={{ backgroundColor:"#FF9F1C"}}label="Sign Up" href="/user">Sign Up</Button>
  </FormGroupStyled>
  </Container>
  </MainContainer>

}

export default SignInForm