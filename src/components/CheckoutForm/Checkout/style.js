import { makeStyles } from "@mui/styles";

export const useStyling=makeStyles((theme)=>({
    toolbar:theme.mixins.toolbar,
    stepper:{
        padding:theme.spacing(3,0,5)
    },
    paper:{
            marginTop:'theme.spacing(3) !important',
            marginBottom:theme.spacing(3),
        padding:theme.spacing(2),
        alignItems:'center',
        [theme.breakpoints.down('xs')]:{
            width:'100%',
            marginTop:60,
        },
        [theme.breakpoints.up(600+theme.spacing(3)*2)]:{
            marginTop:theme.spacing(6),
            marginBottom:theme.spacing(6),
            padding:theme.spacing(3)
        }
    },
    layout:{
            marginTop: '5%',
                width: 'auto',
       
             marginLeft: theme.spacing(2),
             marginRight: theme.spacing(2),
              [theme.breakpoints.up('sm')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
       backgroundColor:'lightgreen !important',

      
    },
    buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: '20px 0',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
    }
}))