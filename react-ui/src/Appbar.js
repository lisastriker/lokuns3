import { AppBar, IconButton, InputBase, Toolbar, Typography, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LokunsLogo from './assets/lokunsorange.png'
import { Link } from 'react-router-dom'
import firebase from '@firebase/app';
import { useEffect, useState } from 'react';
import { ContactSupportOutlined } from '@material-ui/icons';
function AppBarComponent(props) {
  // const [name, setName] = useState("")
  // var db = firebase.firestore()
  // var userUID = localStorage.getItem('useruid') ? localStorage.getItem('useruid') : false
  // var userEmail = localStorage.getItem('email')
  // useEffect(()=>{
    
  //   if(userUID){
  //     db.collection("users").doc(userUID).get().then((doc)=>{
  //       if (doc.exists) {
  //         setName(doc.data().name)
  //         console.log(name)
  //       } else { setName("")}
  //     })
  //   }
  // },[userUID])

  return (
  <AppBar position="static" style={{"min-width":"400px", backgroundColor:"#FF9F1C", border:"none", paddingTop:"5px"}}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
    >
      <Link to="/home"><img alt="homelogo" src={LokunsLogo}/></Link>
    </IconButton>
    <div style={{marginLeft:"auto"}}>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton >
      <Link class="ProfileIcon" to="/signout"><AccountCircleIcon/></Link>
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
