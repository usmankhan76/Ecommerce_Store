import { Badge, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useStyling } from './style';
export default function Product({product,handleAddToCart}) {
    const classes=useStyling()
    return (
        <Card    className={classes.root} elevation={3}>
            <CardMedia
                className={classes.media}
                // component='img'
                image={product.image.url}
                title={product.name}
            />
            <CardContent >
                <div  className={classes.cardContent}>
                    <Typography variant="subtitle1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" >
                        {product.price.formated_with_symbol}
                    </Typography>
                </div>
                <Typography 
                className={classes.description}
                 dangerouslySetInnerHTML={{__html:product.description}} 
                variant="body2"
                 color='textSecondary'/>
                        
                
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart" 
                onClick={()=>handleAddToCart(product.id,1)}
                color="inherit">
                          <AddShoppingCartIcon/>  
                        
                </IconButton>
            </CardActions>
        </Card>
    )
}
