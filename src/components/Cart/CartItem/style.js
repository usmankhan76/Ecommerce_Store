import { makeStyles } from "@mui/styles";

export const useStyling=makeStyles((theme)=>({
media:{
    height:'260px'
},
cardContent:{
    display:'flex',
    justifyContent:'space-between',

},
cardActions:{
//    display:'flex',
    justifyContent:'space-between',

},
buttons:{
    display:'flex',
    alignItems:'center'
}

}))