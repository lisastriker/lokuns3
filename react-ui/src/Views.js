import firebase from '@firebase/app';
import { Typography } from '@material-ui/core';
import { firebaseConfig } from "./firebaseConfig"
var db = firebase.firestore()
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

function Views(props){
  if(props.uid.length !== 0 ){
    db.collection("views").doc(props.uid).set({
      uid:props.uid,
    }).then(() => {})
  
  }

  return(
    <Typography>{props.uid}</Typography>
  )
}

export default Views