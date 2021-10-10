import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import React from 'react'
import store from '../assets/commerce.png'
import { useStyling } from './style'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
export default function AppBarCreation({badgeValue}) {
    const classes=useStyling()
    const {pathname}=useLocation()
    return (
        <>
         <AppBar position="fixed" elevation={0} color='inherit' className={classes.appbar}>
             <Toolbar>
                 <Typography component={Link} to={'/'} variant='h6' color="inherit" className={classes.title}>
                     <img src={store} height='25px' alt="store" className={classes.image}/>
                     E-Commerace
                 </Typography>
                 <div  className={classes.grow}></div>
                 <div className={classes.button}>
                     {pathname==='/'&& <IconButton component={Link} to={'cart'} aria-label='Show Cart Items' color="inherit">
                         <Badge badgeContent={badgeValue} color='error' >
                            <ShoppingCart/>  
                         </Badge>

                     </IconButton>}
                 </div>
             </Toolbar>
             </AppBar>   
        </>
    )
}
