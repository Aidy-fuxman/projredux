import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { useState } from "react";
import SignIn from "../pages/SignIn";
import { AppBar, Toolbar, Button, IconButton, Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

const NavBar = () => {
    let cUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [openSignIn, setOpenSignIn] = useState(false);

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "white",
            boxShadow: "none",
            width: "80%",  // צמצום אורך ה-NavBar
            left: "10%",  // מיקום ה-NavBar
            top: 0,
            borderBottom: "1px solid #ccc"
        }}>
            <Toolbar sx={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                {/* Home Icon (on the right side) */}
                <IconButton color="primary" component={Link} to="/CartList" sx={{ fontSize: 32, marginLeft: 2 }}>
                    <ShoppingCartIcon />
                </IconButton>

                {/* Menu Buttons */}
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    {/* User Authentication */}
                    {cUser ? (
                        <Button color="primary" onClick={() => dispatch(userOut())} sx={{ fontSize: 18, marginLeft: 3 }}>התנתקות</Button>
                    ) : (
                        <>
                            <Button color="primary" onClick={() => setOpenSignIn(true)} sx={{ fontSize: 18, marginLeft: 3 }}>כניסה</Button>
                            <Button color="primary" component={Link} to="/SignUp" sx={{ fontSize: 18, marginLeft: 3 }}>הרשמה</Button>
                        </>
                    )}

                    <Button color="primary" component={Link} to="/list" sx={{ fontSize: 18, marginLeft: 3 }}>רשימת מוצרים</Button>

                    {/* Home Icon (on the left side) */}
                    <IconButton edge="start" color="primary" component={Link} to="/" sx={{ fontSize: 32, marginLeft: 3 }}>
                        <HomeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
        </AppBar>
    );
};

export default NavBar;
