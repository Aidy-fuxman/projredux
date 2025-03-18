import React from "react";
import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CartList from '../pages/CartList';

const CartDrawer = ({ isOpen, onClose }) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
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
                    onClick={onClose}
                    style={{ position: 'absolute', top: '10px', right: '0', zIndex: 1000 }}
                >
                    <CloseIcon />
                </IconButton>
                <CartList isSmallCart={true} />
            </div>
        </Drawer>
    );
};

export default CartDrawer;
