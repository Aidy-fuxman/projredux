import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/ProdDeatails.css"
const ProdDeatails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
                {/* כפתור חזרה לדף הקודם */}
                <button onClick={() => navigate(-1)}>חזור</button>
            </div>
        </div>
    );
};

export default ProdDeatails;
