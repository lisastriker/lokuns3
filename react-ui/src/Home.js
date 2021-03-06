import logo from './logo.svg';
import './App.css';
import {  ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { firebaseConfig } from "./firebaseConfig"
import firebase from 'firebase/app';
import "firebase/firestore";
import { Pagination } from '@material-ui/lab'
import AppBarComponent from './Appbar'
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';
import User from './User'
import SignInForm from './SignInForm'
import styled from 'styled-components';
import Views from './Views'
import ClinicLanding from './ClinicLanding'
import AccordionComponent from './AccordianComponent'
import ProtectedRoute  from './ProtectedRoute';
import ProfilePage from './ProfilePage'
import { useHistory, useLocation } from 'react-router-dom';
//Use npm run server to start backend, then use npm start
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
var db = firebase.firestore()

function Home() {
  const [loaded, setLoaded] = useState(false)
  const [firebaseData, setFirebaseData] = useState([])
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")
  const uid = localStorage.getItem("useruid")
  const handleAccordionChange = (number) => (event, isExpanded) => {
    // console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? number : false);
  };
  
  const userProfile = localStorage.getItem('useruid')
  useEffect(()=>{
    console.log(userProfile)
  },[])

  const parseData = (db) => {
   const dataArray = [];
    const snapshot = db.collection('emails').orderBy('Timestamp', 'desc').get();
       snapshot.then(
        (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const document = { ...doc.data(), id: doc.id , TimeStamp: doc.TimeStamp};
                // console.log(doc.id)
                dataArray.push(document)
            });//--> resolve when data is ready
        },
      ).then(()=> {
      const newArray = dataArray.map(item => {
        const stringRequest1 = /(You received this message because you are subscribed to the Google Groups "LocumSg" group.).*/g
        const stringRequest2 = /(To unsubscribe from this group and stop receiving emails from it, send an email to locumsg\+unsubscribe@googlegroups.com.).*/g
        const stringRequest3 = /(To view this discussion on the web visit).*/g
        const stringRequest4 = /\r?\n\r/g
        const stringBody = String(item.Body)
        const sanitize = stringBody.replaceAll(stringRequest1, '')
        const sanitize2 = sanitize.replaceAll(stringRequest2, '')
        const sanitize3 = sanitize2.replaceAll(stringRequest3, '')
        const sanitize4 = sanitize3.replaceAll(stringRequest4, '')
        const sanitize5 = sanitize4.replaceAll('>', '')
        return { Body: sanitize5, id:item.id, Email: item.Email, Date: item.Date, Subject: item.Subject, JobId: item.JobId}
      })
      setFirebaseData(newArray)
      setLoaded(true)
      })
  };

  function getName(){
      if(uid){
      db.collection("users").doc(uid).get().then((doc)=>{
        if (doc.exists) {
          setName(doc.data().name)
          console.log(name)
        } else { setName("")}
      })
    }
  }
  useEffect(() => {
    parseData(db)
    getName()
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const accordionObject = [firebaseData][0]
  console.log(accordionObject)
  const slice = accordionObject.slice(indexOfFirstPost, indexOfLastPost)
  //Memoize this
  const listAccordian = slice.map(data => {
    if(data.Body !== undefined){
      const dataBefore = data.Body.replaceAll(/ /g, '')
      const number = dataBefore.match(/\d{8}/g)
      // console.log(number)
      // console.log(number.length)
      var finalNumber = 0
      if(number !== null){
        finalNumber = 0
        if(number.length > 1) {
          for(var i=0; i<number.length; i++){
            if(number[i].substring(0,1) === '8' || number[i].substring(0,1) === '9'){
              finalNumber = number[i]
              console.log(`This number has 8 and is ${number[i]}`)
            }
          }
        }     
    
        if(number.length===1){
          const numberString = number.toString()
          if(numberString.substring(0,1) === '8' || numberString.substring(0,1) === '9'){
          finalNumber = numberString
          console.log(numberString) 
          } else { console.log("Number no 8 or 9")}
        }
      }
    }

    return(        
    <Accordion style={{backgroundColor:"#fafafa"}} expanded={expandedPanel === data.id} onChange={handleAccordionChange(data.id)}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography style={{fontWeight:"bold"}}>
      Job ID:{data.JobId}
    </Typography>
    &nbsp;
    <Typography>{data.Subject}</Typography>
    </AccordionSummary>
    <AccordionComponent data={data} id={data.id} number={finalNumber}></AccordionComponent>
    </Accordion>)
  })

    return (
        <div style={{width:"100%", flexDirection:"column", display:"flex"}}>
        <div style={{
          position:"absolute", top:"5px", right:"20px",
          backgroundColor:"rgb(255, 159, 28)", marginBottom:"10px",
          textAlign:"right", color:"white"
        }}>
        <Typography style={{display:"inline-flex"}}>{name}</Typography>
        </div>
        <div style={{alignItems:"center"}}>
        {loaded ? listAccordian : null} 
        <Pagination style={{backgroundColor:"white", marginTop:"10px"}} shape="rounded" color="secondary" variant="outlined" page={page} count={Math.ceil(firebaseData.length / postsPerPage)} onChange={handleChange}/>
        </div>
        </div>
    )
}

export default Home;
//Fix home later
{/* <Route path="/home" render={()=>userProfile? <Home></Home> : <Redirect to={{path:'/'}}></Redirect>}>
ProtectedRoute path='/' component={SignInForm} redirectPath='/profile'></ProtectedRoute */}