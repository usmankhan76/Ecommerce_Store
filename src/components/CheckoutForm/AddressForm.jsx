import { Button, Grid, InputLabel,  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { commerce } from '../lib/commerce'
import FormInput from './CustomTextFields'
import { useStyling } from './style'
import { Link } from 'react-router-dom'
export default function AddressForm({checkoutToken,next }) {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods=useForm()
    // console.log("countries before",shippingCountries)
    console.log("",shippingSubdivision)

    const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    const subDivsions=Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}))
    const options=shippingOptions.map((sO)=>({id:sO.id,label:`${sO.description} - (${sO.price.formatted_with_symbol})`}))
    
    const fetchShippingCountries=async(checkoutTokenID)=>{
        const {countries}=await commerce.services.localeListShippingCountries(checkoutTokenID)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    // console.log("countries",countries)
  const fetchSubdivisions= async(countrycode)=>{
      const {subdivisions}=await commerce.services.localeListSubdivisions(countrycode)
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.entries(subdivisions)[0])

  }
  const fetchShippingOptions= async (checkoutTokenID,country,region)=>{
      const options = await commerce.checkout.getShippingOptions(checkoutTokenID,{country , region}); 
      setShippingOptions(options)
      setShippingOption(options[0].id)
  }
    
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[])
    useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])
      useEffect(()=>{
      if(shippingSubdivision )fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
      },[shippingSubdivision,])

     const classes=useStyling()
    return (
        <>
            <Typography variant='h6' gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods}> 
                <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,
                    shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                            <FormInput name="firstName"  label="First Name"/>
                            <FormInput name="lastName"  label="Last Name"/>
                            <FormInput name="address1"  label="Address"/>
                            <FormInput name="email"  label="Email"/>
                            <FormInput name="city"  label="City"/>
                            <FormInput name="zip"  label="ZIP / Postal Code"/>
                             
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Country</InputLabel>
                              
                                    <select className={classes.select} value={shippingCountry}
                                    onChange={(e)=>setShippingCountry(e.target.value)}
                                    > 
                                     {countries.map((country)=>(
                                            <option 
                                            value={country.id}
                                            key={country.id}
                                            className={classes.selectOption}
                                              >
                                                {country.label}</option>

                                              ))}
                                        
                                       
                                    </select>
                                  
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivisions</InputLabel>
                                  <select className={classes.select} value={shippingSubdivision}
                                    onChange={(e)=>setShippingSubdivision(e.target.value)}
                                    > 
                                       {subDivsions.map((subDivision)=>(
                                            <option 
                                            value={subDivision.id}
                                            key={subDivision.id}
                                            className={classes.selectOption}
                                              >
                                                {subDivision.label}</option>

                                              ))}
                                       
                                    </select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Options</InputLabel>
                                  <select className={classes.select} value={shippingOption}
                                    onChange={(e)=>setShippingOption(e.target.value)}
                                    > 
                                        {options.map((singleOption)=>(
                                            <option 
                                            value={singleOption.id}
                                            key={singleOption.id}
                                            className={classes.selectOption}
                                              >
                                                {singleOption.label}</option>

                                              ))}
                                       
                                    </select>
                            </Grid>
                    </Grid>
                    <div style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
                            <Button variant='outlined' component={Link} to={'/cart'} >Back To Cart</Button>
                            <Button type='submit' variant='contained'  >Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

