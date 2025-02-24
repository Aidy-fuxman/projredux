import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { useDispatch } from 'react-redux';
const NavBar = () => {

    let cUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    return (<nav>
        <ul>
            {/* הצגת הקישורים */}
            <li><Link to="">דף הבית </Link></li>
            <li><Link to="/list">רשימת מוצרים </Link></li>
            <li><Link to="/CartList">🧺</Link></li>
            {cUser ?
                <button onClick={() => dispatch(userOut())}>התנתקות</button> :
                <>
                    <li><Link to="/SignUp">הרשמה</Link></li>
                    <li><Link to="/SignIn">כניסה</Link></li>
                    {/* <li><Link to="/list">מוצרים</Link></li> */}
                </>

            }
            {cUser && cUser.role === "admin" && (
                <li><Link to="/AddProd">הוספת מוצר</Link></li>
            )}


        </ul>



    </nav>)



}
export default NavBar;