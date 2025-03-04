import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { useState } from "react";
import SignIn from "../pages/SignIn";
import { AppBar, Toolbar, Button, IconButton, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NavBar = () => {
    let cUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [openSignIn, setOpenSignIn] = useState(false);

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "#faf0e6",  // צבע עץ בהיר מאוד (צבע שמנת בהיר)
            boxShadow: "none",
            width: "100%",  // שינה ל-100%
            left: 0,        // אפסתי את ה-left
            top: 0,
            borderBottom: "1px solid #ccc"
        }}>
            <Toolbar sx={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                {/* Home Icon (on the right side) */}
                <IconButton component={Link} to="/CartList" sx={{ fontSize: 32, marginLeft: 2, color: "#6a4e23" }}>
                    <ShoppingCartIcon />
                </IconButton>

                {/* Menu Buttons */}
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    {/* User Authentication */}
                    {cUser ? (
                        <>
                            <Button onClick={() => dispatch(userOut())} sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>התנתקות</Button>
                            {cUser.role === "admin" && (
                                <Button component={Link} to="/AddProd" sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>
                                    <AddCircleIcon sx={{ marginRight: 1 }} /> הוספת מוצר
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setOpenSignIn(true)} sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>כניסה</Button>
                            <Button component={Link} to="/SignUp" sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>הרשמה</Button>
                        </>
                    )}

                    <Button component={Link} to="/list" sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>רשימת מוצרים</Button>

                    {/* Home Icon (on the left side) */}
                    <IconButton edge="start" component={Link} to="/" sx={{ fontSize: 32, marginRight: 5, color: "#6a4e23" }}>
                        <HomeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
        </AppBar>
    );
};

export default NavBar;
