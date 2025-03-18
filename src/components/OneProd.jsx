
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { removeProd } from '../features/prodSlice';
// import { deleteProductById } from '../api/prodService';
// import { Button, IconButton, Card, CardContent, Typography, CardMedia } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { add, removeFromCart, decrease } from '../features/cartSlice';
// import CartDrawer from '../components/CartDrawer';
// import { useState } from 'react';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';





// const OneProd = ({ prod, isInCart,onDelete }) => {
//     const dispatch = useDispatch();
//     const cUser = useSelector((state) => state.user.currentUser);
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//     const handleDrawerToggle = (open) => {
//         setIsDrawerOpen(open);
//         if (open) {
//             setTimeout(() => setIsDrawerOpen(false), 10000); // סגירה אוטומטית אחרי 10 שניות
//         }
//     };

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         if (!cUser?.token) {
//             alert("Unauthorized: No token provided.");
//             return;
//         }
//         try {
//             await deleteProductById(prod._id, cUser.token);
//             onDelete(prod._id)
//             dispatch(removeProd(prod._id));
//         } catch (error) {
//             console.error("Error deleting product:", error.response?.data || error.message);
//             alert("Failed to delete product: " + (error.response?.data?.message || error.message));
//         }
//     };

//     return (
//         <Card sx={{
//             width: '100%',
//             maxWidth: 300,
//             height: 300,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 1, // הוספת ריפוד פנימי לכרטיס
//             boxShadow: 3,
//             borderRadius: 3,
//             transition: 'transform 0.3s ease-in-out',
//             '&:hover': {
//                 transform: 'scale(1.05)', 
//                 boxShadow: 6,
//             },
//             backgroundColor: '#f9f9f9',
//         }}>
//             <Link to={`/list/ProdDeatails/${prod._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                 <CardMedia
//                     component="img"
//                     height="180"
//                     image={`src/assets/${prod.imageUrl}`} 
//                     alt={prod.prodName}
//                     sx={{ objectFit: 'cover', marginBottom: 2 }}
//                 />
//                 <CardContent sx={{ textAlign: 'center' }}>
//                     <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
//                         {prod.prodName}
//                     </Typography>
//                     <Typography variant="h5" sx={{ color: 'green', marginTop: 1, fontSize: '1.4rem' }}>
//                         {prod.price} ₪
//                     </Typography>
//                 </CardContent>
//             </Link>
        
//             {isInCart ? (
//                 <div>
//                     <span>{prod.price * prod.cnt}</span>
//                     <button onClick={() => dispatch(decrease(prod))}>-</button>
//                     <span>{prod.cnt}</span>
//                     <button onClick={() => dispatch(add(prod))}>+</button>
//                     <button onClick={() => dispatch(removeFromCart(prod))}>Remove from cart</button>
//                 </div>
//             ) : (
    

//                 <IconButton color="primary" aria-label="add to shopping cart">
//                 <AddShoppingCartIcon  onClick={(e) => {
//                         e.preventDefault();
//                         dispatch(add(prod)); // הוספת המוצר לסל
//                         handleDrawerToggle(true); // פתיחת ה-Drawer
//                     }} />
//               </IconButton>
//             )}
        
//             {cUser?.role === "admin" && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
//                     <IconButton component={Link} to={`/UpdateProd/${prod._id}`} state={prod} color="primary">
//                         <Edit />
//                     </IconButton>
//                     <IconButton onClick={handleDelete} color="error">
//                         <Delete />
//                     </IconButton>
//                 </div>
//             )}
        
//             <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
//         </Card>
        
//     );
// };

// export default OneProd;
import { useEffect, useState } from "react";
import { getAllProduct, getTotalPages } from "../api/prodService";
// import { CircularProgress, Grid, Typography, Button, Stack, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { removeProd } from '../features/prodSlice';
import { deleteProductById } from '../api/prodService';
import { IconButton, CardContent, Typography, CardMedia , Stack } from '@mui/material';
import { Edit, Delete ,Remove,Add ,RemoveShoppingCart } from '@mui/icons-material';
import { add, removeFromCart, decrease } from '../features/cartSlice';
import CartDrawer from '../components/CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const OneProd = ({ prod, isInCart, onDelete }) => {
    const dispatch = useDispatch();
    const cUser = useSelector((state) => state.user.currentUser);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = (open) => {
        setIsDrawerOpen(open);
        if (open) {
            setTimeout(() => setIsDrawerOpen(false), 3000);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!cUser?.token) {
            alert("Unauthorized: No token provided.");
            return;
        }
        try {
            await deleteProductById(prod._id, cUser.token);
            onDelete(prod._id);
            dispatch(removeProd(prod._id));
        } catch (error) {
            console.error("Error deleting product:", error.response?.data || error.message);
            alert("Failed to delete product: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            border: '1px solid #ddd',  // מסגרת עדינה
            borderRadius: '8px',       // קצוות מעוגלים מעט
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)', // צל עדין ליוקרה
            backgroundColor: 'white'   // רקע לבן נקי
        }}>
        
            <Link to={`/list/ProdDeatails/${prod._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    image={`/${prod.imageUrl}`} 
                    alt={prod.prodName}
                    sx={{
                        width: '100%',
                        maxWidth: 300,
                        height: 250,
                        objectFit: 'contain',
                        marginBottom: 1
                    }}
                />
                <CardContent sx={{ padding: 0 }}>
                    <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        {prod.prodName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'black', marginTop: 1, fontSize: '2rem',fontWeight: 'bold'
 }}>
                     ₪   {prod.price} 
                    </Typography>
                </CardContent>
            </Link>

            {isInCart ? (
                <div>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', marginBottom: 1 }}>
                    סה"כ: ₪ {prod.price * prod.cnt} 
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <IconButton color="primary" onClick={() => dispatch(decrease(prod))}>
                        <Remove />
                    </IconButton>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {prod.cnt}
                    </Typography>
                    <IconButton color="primary" onClick={() => dispatch(add(prod))}>
                        <Add />
                    </IconButton>
                    <IconButton color="error" onClick={() => dispatch(removeFromCart(prod))}>
                        <RemoveShoppingCart />
                    </IconButton>
                </Stack>
            </div>
            ) : (
                <IconButton color="#000000" aria-label="add to shopping cart">
                    <AddShoppingCartIcon style={{ color: "#000000" }} onClick={(e) => {
                        e.preventDefault();
                        dispatch(add(prod));
                        handleDrawerToggle(true);
                    }} />
                </IconButton>
            )}

            {cUser?.role === "admin" && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <IconButton component={Link} to={`/UpdateProd/${prod._id}`} state={prod} color="black">
                        <Edit  style={{ color: "#000000" }}/>
                    </IconButton>
                    <IconButton onClick={handleDelete} color="error">
                        <Delete />
                    </IconButton>
                </div>
            )}

            <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </div>
    );
};

export default OneProd;