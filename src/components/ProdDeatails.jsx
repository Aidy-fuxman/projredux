import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/ProdDeatails.css";
import { Button, Drawer, IconButton } from '@mui/material';
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { add, removeFromCart, decrease } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import CartList from '../pages/CartList';




const ProdDeatails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        left: false,
    });

    const disp = useDispatch();

    const toggleDrawer = (open) => () => {
        setState({ left: open });
    };

    // מחפשים את המוצר לפי ה-id מתוך ה-Redux store
    const prod = useSelector(state => state.products.arrProd.find(p => p._id === id));

    if (!prod) {
        return <h2>מוצר לא נמצא</h2>;
    }

    return (
        <div className="container">
            <div className="inner">
                <h1>{prod.prodName}</h1>
                <img src={prod.imageUrl} alt={prod.prodName} />
                <h2>מחיר: {prod.price} ₪</h2>
                <p>חומרים: {prod.materials}</p>
                <p>משקל: {prod.weight}</p>
                <p>תיאור: {prod.description}</p>
                <p>נוצר ב: {prod.madeIn}</p>
                <p> תאריך יצור: {prod.dateOfCreation}</p>
                <button onClick={() => navigate(-1)}>חזור</button>
            </div>

            <Drawer anchor="left" open={state.left}>
                <div style={{
                    position: 'relative',
                    width: '440px',
                    maxWidth: '100%',
                    height: '100vh',
                    padding: '20px',
                    paddingRight: '15px',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    <IconButton
                        onClick={toggleDrawer(false)}
                        style={{ position: 'absolute', top: '10px', right: '0', zIndex: 1000 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <CartList/>
            </Drawer>
            <Button
                onClick={() => {
                    toggleDrawer(true)(); 
                    disp(add(prod)); 
                }}
                style={{
                    background: '#1C3959',
                    color: "#FFFFFF",
                    width: '150px',
                    height: '30px',
                    borderRadius: '5px',
                    opacity: 1,
                    boxSizing: 'border-box',
                    border: '1px solid #1C3959',
                    marginTop: '-10px',
                }}
            >
                הוסף לסל
            </Button>
        </div>
    );
};

export default ProdDeatails;
