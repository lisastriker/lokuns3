import { AppBar, IconButton, InputBase, Toolbar, Typography, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LokunsLogo from './assets/lokunsorange.png'
import { Link } from 'react-router-dom'
import firebase from '@firebase/app';
import { useEffect, useState } from 'react';
function AppBarComponent(props) {
  const [name, setName] = useState("")
  var db = firebase.firestore()
  var userUID = localStorage.getItem('useruid') ? localStorage.getItem('useruid') : false
  if(userUID){
    db.collection("users").doc(userUID).get().then((doc)=>{
      if (doc.exists) {
        setName(doc.data().name)
      } else { setName("")}
    })
  }
  return (
  <AppBar position="static" style={{"min-width":"400px", backgroundColor:"#FF9F1C"}}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
    >
      <Link to="/home"><img alt="homelogo" src={LokunsLogo}/></Link>
    </IconButton>
    <div style={{marginLeft:"auto"}}>
      <Typography style={{display:"inline-flex", padding:"10px"}}>{userUID ? name : ""}</Typography>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton >
      <Link class="ProfileIcon" to="/signin"><AccountCircleIcon/></Link>
      </IconButton>
      <IconButton
        aria-label="show more"
        aria-haspopup="true"
        color="inherit"
      >
        <MoreHorizIcon />
      </IconButton>
    </div>
  </Toolbar>

</AppBar>
)
}

export default AppBarComponent
