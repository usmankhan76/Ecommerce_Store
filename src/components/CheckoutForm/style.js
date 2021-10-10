import { makeStyles } from "@mui/styles";

export const useStyling=makeStyles((theme)=>({
 select:{
      fontSize:'18px',
    //  fontFamily:'serif',
    
     padding:"20px",
     border:'0',
     width:'100%',
     borderBottom:"1px solid rgba(0,0,1.80, 0.50)",
     [theme.breakpoints.down('sm')]:{
         width:'100%'
     },
     '&:hover':{
     borderBottom:"2px solid rgba(0,0,1.80, 2.50)",

     }
 },
 selectOption:{
     fontSize:'15px',
     fontFamily:'serif',
     '&:hover':{
         color:'green'
     }
 }


}))