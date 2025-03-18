// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { addProd } from '../features/prodSlice';
// import { TextField, Button, Box, Typography, Grid } from '@mui/material';
// import { addProduct } from '../api/prodService'
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AddProd = () => {

//     let currentUser = useSelector(state => state.user.currentUser)
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // פונקציה לשליחת הטופס
//     const onSubmit = (data) => {
//         addProduct(data, currentUser?.token).then(res => {
//             console.log(res.data)
//             alert("added successfuly")
//             // dispatch(addProd(data));
//             navigate("/prodList")
//         }).catch(err => {
//             console.log(err)
//             alert("cannot add" + err.response?.data?.message)
//         })

//     };
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//                 maxWidth: '600px',
//                 margin: '0 auto',
//                 padding: 2,
//                 backgroundColor: '#f7f7f7',
//                 borderRadius: 2,
//             }}
//         >
//             <Typography variant="h4" align="center">הוסף מוצר</Typography>

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                         <TextField
//                             label="שם המוצר"
//                             variant="outlined"
//                             fullWidth
//                             {...register('prodName', { required: 'נא להזין שם מוצר' })}
//                             error={!!errors.prodName}
//                             helperText={errors.prodName?.message}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="תיאור"
//                             variant="outlined"
//                             fullWidth
//                             {...register('description')}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="תמונה (URL)"
//                             variant="outlined"
//                             fullWidth
//                             {...register('imageUrl', { required: 'נא להזין URL לתמונה' })}
//                             error={!!errors.imageUrl}
//                             helperText={errors.imageUrl?.message}
//                         />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="מחיר"
//                             variant="outlined"
//                             fullWidth
//                             type="number"
//                             {...register('price', { required: 'נא להזין מחיר' })}
//                             error={!!errors.price}
//                             helperText={errors.price?.message}
//                         />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="משקל"
//                             variant="outlined"
//                             fullWidth
//                             type="number"
//                             {...register('weight')}
//                         />
//                     </Grid>

//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             label="המדינה בה יוצר"
//                             variant="outlined"
//                             fullWidth
//                             {...register('madeIn')}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <TextField
//                             label="חומרים"
//                             variant="outlined"
//                             fullWidth
//                             {...register('materials')}
//                             helperText="הזן חומרים מופרדים בפסיק"
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             fullWidth
//                             sx={{
//                                 backgroundColor: '#000',
//                                 '&:hover': { backgroundColor: '#333' }
//                             }}
//                         >
//                             הוסף מוצר
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Box>
//     );
// };

// export default AddProd;
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProd } from '../features/prodSlice';
import { TextField, Button, Box, Typography, Grid, Container, Tooltip } from '@mui/material';
import { addProduct } from '../api/prodService';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProd = () => {

    let currentUser = useSelector(state => state.user.currentUser);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // פונקציה לשליחת הטופס
    const onSubmit = (data) => {
        addProduct(data, currentUser?.token).then(res => {
            console.log(res.data);
            alert("added successfuly");
            // dispatch(addProd(data));
            navigate("/prodList");
        }).catch(err => {
            console.log(err);
            alert("cannot add" + err.response?.data?.message);
        });
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Typography variant="h4" gutterBottom color="black">
                הוסף מוצר
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="שם המוצר"
                    {...register("prodName", { required: { value: true, message: "זהו שדה חובה" } })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />
                {errors.prodName && <Typography color="error">{errors.prodName.message}</Typography>}

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="תיאור המוצר"
                    {...register("description")}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="הכנס URL לתמונה"
                    {...register("imageUrl", { required: { value: true, message: "זהו שדה חובה" } })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />
                {errors.imageUrl && <Typography color="error">{errors.imageUrl.message}</Typography>}

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="מחיר"
                    type="number"
                    {...register("price", { required: { value: true, message: "זהו שדה חובה" } })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />
                {errors.price && <Typography color="error">{errors.price.message}</Typography>}

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="משקל"
                    type="number"
                    {...register("weight")}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="המדינה בה יוצר"
                    {...register("madeIn")}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="חומרים"
                    {...register("materials")}
                    helperText="הזן חומרים מופרדים בפסיק"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    הוסף מוצר
                </Button>
            </Box>
        </Container>
    );
};

export default AddProd;

