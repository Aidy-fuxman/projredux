
import { useSelector, useDispatch } from 'react-redux';
import OneProd from '../components/OneProd';
import { Grid, Container, Typography, Box, Card, CardContent, Divider, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";



const CartList = ({ isSmallCart }) => {
    const cartItems = useSelector((state) => state.cart.cartArr) || [];
    const qtyInCart = useSelector((state) => state.cart.qtyInCart);
    const sumOfCart = useSelector((state) => state.cart.sumOfCart);
    const navigate = useNavigate();
    const dis = useDispatch();

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>Your Shopping Cart</Typography>
            {cartItems.length === 0 ? (<>
                <Typography align="center">
                    <img src='/emptyCart.png' alt="Empty Cart" />
                </Typography>
                <Typography align="center" variant="h6" sx={{ marginTop: 2 }}>
                    Your cart is empty
                </Typography>
            </>
            ) : (
                <>
                    {/* אם זה סל קטן, נציג מוצר אחד בשורה, אחרת שלושה בשורה */}
                    <Grid container spacing={isSmallCart ? 2 : 4}>
                        {cartItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={isSmallCart ? 12 : 4} key={index}>
                                <OneProd prod={item} isInCart={true} />
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{
                        maxWidth: 400,
                        margin: '20px auto',
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: 3,
                        backgroundColor: '#f9f9f9',
                        textAlign: 'center'
                    }}>
                        <Card sx={{ p: 2 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="center" mb={2}>
                                    <PointOfSaleIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                                </Box>

                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                    <ShoppingCartIcon color="primary" />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>סה"כ מוצרים בסל</Typography>
                                    <Typography variant="h6">{qtyInCart}</Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <PaidIcon color="success" />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>סה"כ לתשלום</Typography>
                                    <Typography variant="h6">₪ {sumOfCart} </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    <Button variant="contained" color="primary"
                        sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
                        onClick={() => navigate("/CheckOut")}>
                        המשך לסיום הזמנה
                    </Button>
                </>
            )}
        </Container>
    );
};

export default CartList;