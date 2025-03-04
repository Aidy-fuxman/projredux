import { useDispatch } from 'react-redux';
import { add, removeFromCart, decrease } from '../features/cartSlice';

const OneProd = ({ prod, isInCart }) => {
    const disp = useDispatch();

    return (
        <div>
            <img src={prod.imageUrl} alt={prod.prodName} />
            <h2>{prod.price} ₪</h2>

            {isInCart ? (
                <div>
                    <span>{prod.price * prod.qty}</span>
                    <button onClick={() => disp(decrease(prod))}>-</button>
                    <span>{prod.qty}</span>
                    <button onClick={() => disp(add(prod))}>+</button>
                    <button onClick={() => disp(removeFromCart(prod))}>
                        Remove from cart
                    </button>
                </div>
            ) : (
                <input
                    type="button"
                    value="Add to cart"
                    onClick={(e) => {
                        e.preventDefault(); // מונע את התגובה ברירת המחדל
                        disp(add(prod));
                    }}
                />
            )}
        </div>
    );
};

export default OneProd;
