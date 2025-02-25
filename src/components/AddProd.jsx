import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProd } from '../features/prodSlice';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import {addProduct} from '../api/prodService'
import { useNavigate } from "react-router-dom";

const AddProd = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate=useNavigate();

    // פונקציה לשליחת הטופס
    const onSubmit = (data) => {
        addProduct(data).then(res=>{
            console.log(res.data)
            alert("added successfuly")
            dispatch(addProd(data));
            navigate("/prodList")
        }).catch(err => {
            console.log(err)
            alert("cannot add")})
       
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '600px',
                margin: '0 auto',
                padding: 2,
                backgroundColor: '#f7f7f7',
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" align="center">הוסף מוצר</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="שם המוצר"
                            variant="outlined"
                            fullWidth
                            {...register('prodName', { required: 'נא להזין שם מוצר' })}
                            error={!!errors.prodName}
                            helperText={errors.prodName?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="תיאור"
                            variant="outlined"
                            fullWidth
                            {...register('description')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="תמונה (URL)"
                            variant="outlined"
                            fullWidth
                            {...register('imageUrl', { required: 'נא להזין URL לתמונה' })}
                            error={!!errors.imageUrl}
                            helperText={errors.imageUrl?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="מחיר"
                            variant="outlined"
                            fullWidth
                            type="number"
                            {...register('price', { required: 'נא להזין מחיר' })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="משקל"
                            variant="outlined"
                            fullWidth
                            type="number"
                            {...register('weight')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="המדינה בה יוצר"
                            variant="outlined"
                            fullWidth
                            {...register('madeIn')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="חומרים"
                            variant="outlined"
                            fullWidth
                            {...register('materials')}
                            helperText="הזן חומרים מופרדים בפסיק"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#000',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                        >
                            הוסף מוצר
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProd;
