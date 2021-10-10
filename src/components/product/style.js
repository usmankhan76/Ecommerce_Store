import { makeStyles } from "@mui/styles";

export const useStyling=makeStyles((theme)=>({
    root:{
      maxWidth:'100%',
    // maxWidth:'500px'
    
    '&:hover':{

    boxShadow:' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    cursor: 'pointer',
  
    }
    },
    media:{
        height:'0',
        // paddingTop:'56.25%'
        paddingTop:'100.25%',
        // width:'100%'
    },
    cardActions:{
        display:'flex',
        justifyContent:'flex-end'
    },
    cardContent:{
        display:'flex',
        justifyContent:'space-between'
    },
    productsMain:{
            flexGrow:'1',
            backgroundColor:theme.palette.background.default,
            padding:theme.spacing(3)
    },
    productsToolbar:theme.mixins.toolbar,
    // root:{
    //     flexGrow:1
    // }
    description:{
        display:'flex',
        justifyContent:'start'
    }
}))