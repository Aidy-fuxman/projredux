import { useDispatch } from 'react-redux';
import { add, removeFromCart, decrease } from '../features/cartSlice';

const OneProd = ({ prod, isInCart }) => {
    const disp = useDispatch();

    return (
        <div>
            {/* שינוי ל<a> עם href ו-target="_blank" */}
            {/* <a href={`/ProdDeatails/${prod._id}`} target="_blank">
                <h2>{prod.prodName}</h2>
            </a> */}
            
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
                <input type="button" value="Add to cart" onClick={(e) =>{
                    e.preventDefault()
                     disp(add(prod))}} />
            )}
        </div>
    );
};

export default OneProd;
