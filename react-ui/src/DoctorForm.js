import { Typography, FormGroup, InputLabel as InputLabel1, Input as Input1, Button as Button1, TextField} from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firebaseConfig } from "./firebaseConfig"
import firebase from '@firebase/app';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import "firebase/firestore";
import DatePicker from 'react-date-picker';
import VisibilityIcon from '@material-ui/icons/Visibility';
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
const Type = styled(Typography)`
  text-align:left;
  word-wrap: break-word;
  font-size:0.8em;
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
const InputLabel = styled(InputLabel1)`
  color:black;
  font-family: roboto;
  font-size: 1.5em;
  font-weight: 400;
  width: 100%;
  text-align:center;
  margin-top:10px;
  margin-bottom:40px;
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
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

`
const Container = styled.div`
  border-radius:10px;
  background-color:#fafafa;
  display:flex;
  justify-content: center;
  align-items: center;
  
`

const FormGroupStyled = styled(FormGroup)`
  padding: 20px;
  border: 2px solid black;
  max-width:100%;
`
const TextStyled = styled(TextField)`
  border:solid 2px black;
`

const ContainerForTime = styled.div`
  display:flex;
  flex-direction:column
`
function DoctorForm(props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [medical, setMedical] = useState("")
  const [finalNumberValue, setFinalNumberValue] = useState(0)
  const [submitNumber ,setSubmitNumber] = useState(0)
  const [day, setDay] = useState("")
  const [date, setDate] = useState("")
  // const location = useLocation()
  // console.log(location.state.useruid)
  //Get userUID --> Fix this below
  var userUID =  localStorage.getItem('useruid') 
  var db = firebase.firestore()
  // console.log(`I am userUID ${userUID}`)
  // console.log(`I am propsuid ${props.uid}`)
  //Get sign in USERUID
  useEffect(()=>{
    if(userUID){
      db.collection("users").doc(userUID).get().then((doc)=>{
        db.collection("submit").doc(props.uid).set({
          uid:props.uid
        }, {merge: true}).then()
        if (doc.exists) {
          setName(doc.data().name)
          setAddress(doc.data().address)
          setEmail(doc.data().email)
          setMedical(doc.data().medical)
          // console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      }).then(()=>{
        //My submitNumber not rerendering. Fix later
        if(props.uid){
          db.collection("submit").doc(props.uid).get().then((doc)=>{
            setSubmitNumber(doc.data().submits)
          console.log(doc.data())})
        } else {console.log(`no props ${props.uid}`)}
      })
    }
  },[userUID, db, props.uid, submitNumber])
  
    

  //Count number of views
  const onLikePress = () => {
    console.log("CLick is happening")
    db.collection("submit").doc(props.uid).update({submits:firebase.firestore.FieldValue.increment(1)
    }).then(()=>{
      console.log("Updated")
    }).catch((err)=>console.log(err))
    
  }
  
  //Update the submit view count and open whatsapp
  const openInNewTab = (url, url2) => {
    if(props.uid.length !== 0 ){
      onLikePress()
    }
    if(finalNumberValue.length !== 0 ){
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    } else {
      const newWindow = window.open(url2, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
    }
    
    //Very interesting using setFInalNumberValue for the input field to be changed!
  }
  //Convert day to nice format
  useEffect(()=>{
    if(day){ 
      const dateArray = day.toDateString().split(' ')
      setDate(dateArray.join('-'))
      console.log(date)
    }
  }, [day]) 
// s://stark-sea-54746.herokuapp.com
  //Send phone number url to submit form (abit confusing) Send the sms to the clinic we have not coded doctor.
  const uncoded = finalNumberValue.length > 7 ? encodeURIComponent(`http://www.localhost:3000/cliniclanding?uid=${props.uid}&day=${date}&userid=${userUID}&phone=${finalNumberValue} `) : encodeURIComponent(`https://stark-sea-54746.herokuapp.com/cliniclanding?uid=${props.uid}&day=${date}&userid=${userUID}&phone=${props.finalNumber} `)
  const encoded = encodeURIComponent(`Hi i'm ${name}, my medical license number is ${medical}, i would like to apply for the slot on ${date} at `)
  const encodedMessage = `${uncoded} ${encoded}`
  
    return <MainContainer ><Container><FormGroupStyled>
    <div style={{display:"flex", flexDirection:"row", alignSelf:"flex-end"}}>
    <VisibilityIcon></VisibilityIcon>
    <Typography style={{paddingLeft:"5px"}}>Applicants: {submitNumber}</Typography>
    </div>
    <InputLabel htmlFor="my-input">Booking Details</InputLabel> 
    <Input required={true} disabled={true}  placeholder="Name" id="my-input" aria-describedby="my-helper-text"  value={name}/>
    <Input required={true} disabled={true} placeholder="Address" id="my-input" aria-describedby="my-helper-text"  value={address}/>
    <Input required={true} disabled={true} placeholder="Email" id="my-input" aria-describedby="my-helper-text"  value={email}></Input>  
    <Input required={true} disabled={true} placeholder="Medical License Number" id="my-input" aria-describedby="my-helper-text" value={medical}/>
    <InputLabel1 style={{textAlign: "left", padding:"5px 5px 5px 0"}} >Select date: </InputLabel1>
    <div style={{display:"flex", flexDirection:"rows"}}>
    <DatePicker
        onChange={(event) => setDay(event)}
        value={day}
      />
    </div>
    <div style={{display:"flex", flexDirection:"row", justifyContent:"start", paddingTop:"5px", textAlign:"left"}}>
    <ContainerForTime>
      <Typography>Start Time</Typography>
      <TextStyled
        id="time"
        type="time"
        freesolo
        defaultValue="12:00"
        InputProps={{
          shrink: true, 
          disableUnderline: true 
        }}
      />
      </ContainerForTime>
      <ContainerForTime>
      <Typography>End Time</Typography>
      <TextStyled
        id="time"
        type="time"
        defaultValue="12:00"
        InputProps={{
          step: 1800, // 5 min
          disableUnderline: true 
        }}
      />
      </ContainerForTime>
      </div>
    <InputLabel1 style={{textAlign: "left", padding:"5px 0 5px 0"}} >Send a whatsapp message to</InputLabel1>
    <Input defaultValue={props.finalNumber} onChange={(e) => setFinalNumberValue(e.target.value)}></Input>
    <Button type="submit" label="Book" onClick={() => openInNewTab(`https://api.whatsapp.com/send/?phone=65${finalNumberValue}&text=${encodedMessage}`, `https://api.whatsapp.com/send/?phone=65${props.finalNumber}&text=${encodedMessage}`)}>Book Now</Button>
    </FormGroupStyled>
    </Container>
    </MainContainer>;
  
}

export default DoctorForm