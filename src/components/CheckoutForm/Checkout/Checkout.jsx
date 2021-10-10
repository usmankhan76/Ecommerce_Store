import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { useStyling } from './style'
import {commerce} from '../../lib/commerce'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const steps=['Shipping Address', 'Payment Details']
export default function CheckOut({cart,order,onCaptureCheckout,error,refreshCart}) {
    const classes=useStyling()
    const navigate=useNavigate()
    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken,setCheckoutToken]=useState(null)
    const[shippingData,setShippingData]=useState({})
    const[isFinished,setIsFinished]=useState(false)
    useEffect(()=>{
                const generateToken=async()=>{
                try {const token=await commerce.checkout.generateToken(cart.id,{type:'cart'})
                
                    // console.log("this is the token",token)
                    setCheckoutToken(token)
                }catch(error){
                    navigate('/')
                    }
                }
                generateToken()
                
    },[cart])
            // setCheckoutToken(checkoutToken)

            const nextStep=()=>setActiveStep((prevActiveState)=>prevActiveState+1)
            const backStep=()=>setActiveStep((prevActiveState)=>prevActiveState-1)
            const next=(data)=>{
                console.log("data",data)
                setShippingData(data);
                nextStep()
            }
            const timeout=()=>{
                setTimeout(() => {
                    setIsFinished(true)
                }, 3000);
            }
    let Confirmation=()=>order.customer ?(
        <>
        <div>
            <Typography variant='h5'> Thank you for your purchase ,{order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider/>
            <Typography variant='subtitle2'>Order ref:{order.customer_reference}</Typography>
        </div>
        <br/>
        <Button component={Link} to={'/'} variant="outlined" type="button">Back To Home</Button>
     </>   
        ):
        // isFinished?(
        //     <>
        //     <div>
        //         <Typography variant='h5'> Thank you for your purchase ,{order.customer.firstname} {order.customer.lastname}</Typography>
        //         <Divider/>
        //     </div>
        //     <br/>
        //     <Button component={Link} to={'/'} variant="outlined" type="button">Back To Home</Button>

        //     </>
        // ):
    (
            // <div className={classes.spinner}>
            //     <CircularProgress/>
            // </div>'
             <>
        <div>
            <Typography variant='h5'> Thank you for your purchase </Typography>
            <Divider/>
        </div>
        <br/>
        {/* {refreshCart()} */}
        <Button component={Link} to={'/'} variant="outlined" type="button" onClick={refreshCart}>Back To Home</Button>
     </> 
        );



        if(error){  
            <>
        <Typography variant='h5'>Error:{error}</Typography>
        <br/>
        <Button component={Link} to={'/'} variant="outlined" type="button" >Back To Home</Button>

            </>
        }
console.log("token",checkoutToken)
console.log("shippindata",shippingData)
    const Form=()=> activeStep===0?
                <AddressForm checkoutToken={checkoutToken} next={next}/>
                :<PaymentForm shippingData={shippingData} 
                checkoutToken={checkoutToken} 
                onCaptureCheckout={onCaptureCheckout}
                backStep={backStep}
                timeout={timeout}
                nextStep={nextStep}/>
    return (
        <>
        {/* <div style={{marginTop:'80px', border:'2px solid'}}></div> */}
        <CssBaseline/>
        <div className={classes.toolbar}></div>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep ===steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
        </>
    )
}
