import React from 'react'
import { Grid} from '@mui/material'
import Product from './Product'
import { useStyling } from './style'
export default function Products({products,onAddToCart}) {
    // const objArray=[
    //     {id:1,name:'Laptop',price:'$500',description:'Apple MacBook',img:'https://cdn.pixabay.com/photo/2014/05/02/21/49/laptop-336373_960_720.jpg' },
    //     {id:2,name:'Shoes',price:'$100',description:'Runing Shoes',img:'https://cdn.pixabay.com/photo/2017/07/02/19/24/dumbbells-2465478_960_720.jpg' },
    //     {id:3,name:'Mobile',price:'$300',description:'New Samsung  Zip Model 5g ',img:'https://images.samsung.com/is/image/samsung/assets/pk/smartphones/galaxy-z-flip/images/galaxy-z-flip_highlight_kv_end.png' },
    // ]
    const classes=useStyling()
    return (
        // <Container>
        <main className={classes.productsMain}>
            <div className={classes.productsToolbar}></div>
            <Grid container  boxShadow={4} spacing={4}  >
             
                  {products ?products.map((product)=>(
                  <Grid  item lg={3} md={4} sm={6} xs={12} key={product.id}  >
                  <Product product={product} 
                  handleAddToCart={onAddToCart}/>
                  </Grid>
                  )
              ):<h1>...Loading</h1>}
              </Grid>
              
            
        </main>
        //  </Container>
    )
}
