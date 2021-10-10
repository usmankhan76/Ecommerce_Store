import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useStyling } from './style'

export default function CartItem({product,onUpdateCartQty,onRemoveFromCart}) {
    console.log("for buttons",product.id,product.quantity)
    const classes=useStyling()
    return (
        <Card>
            <CardMedia
            image={product.image.url}
            alt={product.name}
            className={classes.media}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant='v4'>{product.name}</Typography>
                <Typography variant='v5'>{product.price.formatted_with_symbol}</Typography>  
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button component='button' size="small"
                    onClick={()=>onUpdateCartQty(product.id,product.quantity - 1)}
                    >-</Button>
                    <Typography>{product.quantity}</Typography>
                    <Button component='button' size="small"
                    onClick={()=>onUpdateCartQty(product.id,product.quantity + 1 )}
                    
                    >+</Button>
                </div>
                <Button variant='contained' component='button' color='error'
                onClick={()=>onRemoveFromCart(product.id)}

                >Remove</Button>
            </CardActions>
        </Card>
    )
}
