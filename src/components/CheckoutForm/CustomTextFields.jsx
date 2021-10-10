import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller,  useFormContext } from 'react-hook-form'

export default function FormInput({required,name,label}) {
    const {control}=useFormContext()
    return (
        <Grid item xs={12} sm={6}>
            <Controller
            render={() => (
                <TextField
                name={name}
                fullWidth 
                variant='standard'
                label={label}
                required
                defaultValue=""
                />
            )}
            control={control}
            

            />
        </Grid>
    )
}
