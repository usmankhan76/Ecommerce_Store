import { Container, Grid, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import { useStyle } from './style'

export default function Cart({cart,
    handleUpdateCartQty,
    hnadleRemoveFromCart,
    handleEmptyCart}) {
        
    console.log("This is the cart",cart)
    const classes=useStyle()

    const EmptyCart=()=>(
        <Typography variant='subtitle1' >You have no items in shopping cart, 
        <Link to={'/'}>start adding some</Link>!</Typography>
    )
    const FilledCart=()=>(
        <>
        <Grid container spacing={3} >
            { cart && cart.line_items.map((product)=>{
               return <Grid item sm={6} md={4} xs={12} key={product.id}>
                    <CartItem product={product}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={hnadleRemoveFromCart}/>
                </Grid>
            })}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h5" >
                Total Amount:{cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      type='button'
                      onClick={()=>handleEmptyCart()}
                      className={classes.emptybtn}
                     gutterBottom
                    >
                      Empty Cart
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      type='button'
                      className={classes.checkoutButton}
                      component={Link}
                      to={'/checkout'}
                    >
                      Check Out
                    </Button>
                </div>
        </div>
        </>
    )
    if(!cart.line_items)return '...Loading'
    
    return (
        
        <Container >
            <div className={classes.toolbar}></div>
            <Typography className={classes.title} variant='h3' gutterBottom>
                Your Shoping Cart
            </Typography>
            {cart && !cart.line_items.length?<EmptyCart/>:<FilledCart/>}
        </Container>
    )
}
