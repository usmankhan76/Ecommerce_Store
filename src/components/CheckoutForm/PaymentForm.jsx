import { Button, Divider, Typography } from '@mui/material'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import Review from './Review'
 

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
export default function PaymentForm({shippingData,checkoutToken,backStep,onCaptureCheckout,nextStep,timeout}) {
    console.log("shippinData is :",shippingData)
    const handleSubmit=async (event,elements,stripe)=>{
        event.preventDefault();
        if(!stripe || !elements) return;
        const cardElement=elements.getElement(CardElement);
        const {error,paymentMethod}= await stripe.createPaymentMethod({type:'card',card:cardElement})
        if(error){
            console.log(['error'],error);
        }else{
            const oderData={
                line_items:checkoutToken.live.line_items,
                customer:{firstname:shippingData.firstname,
                    lastname:shippingData.lastname,
                    email:shippingData.email},
                    shipping:{name:'International',
                    street:shippingData.address1 ,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry
            },
                fulfillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'Test gateway',
                    stripe:{ 
                        payment_method_id:paymentMethod.id
                    }
                }
             
            }
            onCaptureCheckout(checkoutToken.id,oderData)
            // timeout()
            nextStep()
        }
    }
    return (
        <div>
            <Review checkoutToken={checkoutToken} />
            <Divider/>
            <Typography variant='h6' gutterBottom style={{margin:'20px o'}}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements,stripe})=>(
                        <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}> 
                            <CardElement/>
                            <br/>  <br/>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                <Button variant='outlined' onClick={()=>backStep()}>Back</Button>
                                <Button variant='contained' type="submit" disabled={!stripe}>
                                    pay {checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>

                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}
