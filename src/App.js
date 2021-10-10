 import './App.css';
import {AppBarCreation,Products,Cart,CheckOut} from './components'

import { commerce } from './components/lib/commerce';
import { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';

function App() {
  const[products,setProducts]=useState([])
  const[cart,setCart]=useState({})
  const[order,setOrder]=useState({})
  const[errorMessage,setErrorMessage]=useState('')
  const takeProducts=async()=>{
     const {data}=await commerce.products.list()
     setProducts(data)
  }
  const takeCarts=async()=>{
    const response=await commerce.cart.retrieve();
    setCart(response)
  }
  const handleAddToCart=async(productId,quantity)=>{
      const item= await commerce.cart.add(productId,quantity)
      setCart(item.cart)
  }

  

  const handleUpdateCartQty=async(productId,quantity)=>{
    const {cart}= await commerce.cart.update(productId,{quantity})
     setCart(cart)

  }
  const hnadleRemoveFromCart=async(productId)=>{
    const {cart}=await commerce.cart.remove(productId)
    setCart(cart)
  }
  const handleEmptyCart=async()=>{
    const {cart}=await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart=async()=>{
    const newCart=await commerce.cart.refresh()
    setCart(newCart)
  }
  const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>{
 try {
     const incomingOrder=await commerce.checkout.capture(checkoutTokenId,newOrder);
     setOrder(incomingOrder);
     refreshCart()

 } catch (error) {
   setErrorMessage(error.data.error.message)
 }
  }

  useEffect(()=>{
    takeProducts()
    takeCarts()
  },[])
  // console.log("this is the products:",products)
  console.log("this is the cart:",cart)
  console.log("this is the cart items:",cart.total_items)
  return (
    <>
          <AppBarCreation badgeValue={cart? cart.total_items : 0}/>
    <Routes>
  
        
          <Route path='/' element={products?<Products products={products} 
         onAddToCart={handleAddToCart}  />:'..Loading'}/>
         <Route path='/cart' element={<Cart 
         cart={cart}
          handleUpdateCartQty={handleUpdateCartQty}
          hnadleRemoveFromCart={hnadleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
         />}/>
         <Route path='/checkout' element={<CheckOut 
         order={order}
         onCaptureCheckout={handleCaptureCheckout}
         cart={cart}
         error={errorMessage}
         refreshCart={refreshCart}
         />}/>
          
         
    </Routes>
    </>
  );
}

export default App;
