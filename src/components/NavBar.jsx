import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import SignIn from "../pages/SignIn"; // הוספת SignIn

const NavBar = () => {
    let cUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    // 🔹 הוספת סטייט לשליטה על ה-Drawer
    const [openSignIn, setOpenSignIn] = useState(false);

    return (
        <nav>
            <ul>
                <li><Link to="">דף הבית </Link></li>
                <li><Link to="/list">רשימת מוצרים </Link></li>
                <li><Link to="/CartList">🧺</Link></li>
                {cUser ? (
                    <button onClick={() => dispatch(userOut())}>התנתקות</button>
                ) : (
                    <>
                        <li><Link to="/SignUp">הרשמה</Link></li>
                        <li><button onClick={() => setOpenSignIn(true)}>כניסה</button></li>
                    </>
                )}

                {cUser && cUser.role === "admin" && (<>
                    <li><Link to="/AddProd">הוספת מוצר</Link></li>
                    <li><Link to="/ApdateProd">עדכון מוצר</Link></li></>
                )}
            </ul>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
        </nav>
    );
};

export default NavBar;
