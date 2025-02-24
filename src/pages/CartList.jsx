import { useSelector, useDispatch } from 'react-redux';
import OneProd from '../components/OneProd';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'; // ייבוא הרכיב Button

const CartList = () => {
    const cartItems = useSelector((state) => state.cart.cartArr);
    const qtyInCart = useSelector((state) => state.cart.qtyInCart);
    const sumOfCart = useSelector((state) => state.cart.sumOfCart);
    const navigate = useNavigate();
    const dis = useDispatch();

    const handleRemove = (id) => {
        dis(removeFromCart(id)); // הסרה של מוצר מהסל
    };

    return (
        <div>
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <OneProd prod={item} isInCart={true} />
                            </li>
                        ))}
                    </ul>

                    <div>
                        <label>סה"כ מוצרים בסל</label>
                        <span>{qtyInCart}</span>
                        <label>סה"כ לתשלום:</label>
                        <span>{sumOfCart}</span>
                    </div>

                    <Button variant="contained" color="primary" onClick={() => navigate("/CheckOut")}>
                        המשך לסיום הזמנה
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CartList;
