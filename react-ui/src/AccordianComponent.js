import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import DoctorForm from './DoctorForm'
function AccordianComponent(props){

  return (
    <AccordionDetails style={{display:"flex", "wordBreak":"break-word", "flexDirection":"column"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Typography style={{whiteSpace: 'pre-line', textAlign:"left", padding:"0 5px 0 40px", width:"60%"}}>{props.data.Body}</Typography>
      <div style={{display:"flex", flexDirection:"column", alignItems:"start", paddingRight:"20px"}}> 
      <DoctorForm uid={props.id} finalNumber={props.number}/>
      </div>
      </div>
      <br/>
      <Typography>Email sent on : {props.data.Date}</Typography>
    </AccordionDetails>
  )
}

export default AccordianComponent