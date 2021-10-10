import { makeStyles } from "@mui/styles"

export const useStyle=makeStyles(theme=>({
    toolbar:theme.mixins.toolbar,
    title:{
        marginTop:'5%'
    },
    cardDetails:{
        display:'flex',
        justifyContent:'space-between',
        marginTop:'30px',
        width:'100%',  
          
        // backgroundColor:'lightseagreen'
    },
    emptybtn:{
        minWidth:'150px !important',
        [theme.breakpoints.down('xs')]:{
            marginBottom:'5px !important' 
        },
        [theme.breakpoints.up('xs')]:{
        marginRight:'20px !important',
        // backgroundColor:'red !important',
        },
        [theme.breakpoints.down('sm')]:{
            //   marginLeft:'108px !important',
              marginLeft:'18px !important',
              marginBottom:'10px !important'
        }
    },
    checkoutButton:{
        minWidth:'150px !important',
        // backgroundColor:'green !important',
        [theme.breakpoints.down('sm')]:{
        // marginLeft:'108px !important'
        marginLeft:'18px !important'
        }
    }



}))