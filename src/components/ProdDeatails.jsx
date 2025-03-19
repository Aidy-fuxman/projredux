import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Button, CircularProgress } from '@mui/material';
import React from "react";
import { add } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import CartDrawer from "../components/CartDrawer";
import "../styles/ProdDeatails.scss"
import { getProductById } from "../api/prodService";
import { useEffect } from "react";
import {  IconButton, Typography, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';

const ProdDeatails = () => {
    const [prod, setProd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const disp = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then(res => setProd(res.data))
            .catch(err => setError("המוצר לא נמצא או שגיאה בשרת"))
            .finally(() => setLoading(false));
    }, [id]);



    
    const handleDrawerToggle = (open) => {
        setIsDrawerOpen(open);
    };


    if (loading) return <CircularProgress />;
    if (error) return <h2>{error}</h2>;
    if (!prod) return <h2>מוצר לא נמצא</h2>;

    return(
    <div className="container">
    <div className="inner">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            {prod.prodName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1C3959', marginBottom: '8px' }}>
            מחיר: {prod.price} ₪
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>חומרים:</strong> {prod.materials}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>משקל:</strong> {prod.weight}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <strong>תיאור:</strong> {prod.description}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '8px', direction: 'rtl', textAlign: 'right' }}>
            <strong>נוצר ב:</strong> {prod.madeIn}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
            <strong>תאריך יצור:</strong> {new Date(prod.dateOfCreation).toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric' })}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* כפתור חזרה עם חץ מעלה */}
            <IconButton onClick={() => navigate(-1)} sx={{ color: '#1C3959', fontSize: '24px' }}>
                <ArrowBackIosIcon />
            </IconButton>

            
            <Button
                onClick={() => {
                    disp(add(prod));
                    handleDrawerToggle(true); 
                }}
                sx={{
                    backgroundColor: 'black',
                    color: '#FFFFFF',
                    width: '200px',
                    height: '40px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#163b56',
                    }
                }}
                startIcon={<AddShoppingCartIcon />}
            >
                הוסף לסל
            </Button>
        </Box>
    </div>

    <div className="product-image">
        <img src={`/${prod.imageUrl}`} alt={prod.prodName} style={{ maxWidth: '100%', borderRadius: '10px' }} />
    </div>

    <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
</div>)};

export default ProdDeatails;
