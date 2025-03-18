import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userOut } from "../features/userSlice";
import { useState } from "react";
import SignIn from "../pages/SignIn";
import { AppBar, Toolbar, Button, IconButton, Box, Typography, CardMedia } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { clearCart } from "../features/cartSlice";
import { Badge } from "@mui/material";

const NavBar = () => {
    let cUser = useSelector((state) => state.user.currentUser);
    let qtyInCart = useSelector((state) => state.cart.qtyInCart)
    const dispatch = useDispatch();
    const [openSignIn, setOpenSignIn] = useState(false);

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "black",  // צבע עץ בהיר מאוד (צבע שמנת בהיר)
            boxShadow: "none",
            width: "100%",  // שינה ל-100%
            left: 0,        // אפסתי את ה-left
            top: 0,
            borderBottom: "1px solid #ccc"
        }}>

            <Toolbar sx={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                {/* Home Icon (on the right side) */}
                <IconButton component={Link} to="/CartList" sx={{ fontSize: 32, marginLeft: 2, color: "white" }}>
                    <Badge badgeContent={qtyInCart} color="error" showZero>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>


                {/* Menu Buttons */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Greeting message */}
                    <Typography variant="h6" sx={{
                        marginRight: 100,
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 500,
                        whiteSpace: "nowrap"
                    }}>
                        {cUser ? `שלום, ${cUser.userName}` : "שלום, אורח"}
                    </Typography>

                    {/* User Authentication */}
                    {cUser ? (
                        <>
                           
                            <Button onClick={() => { dispatch(userOut()); dispatch(clearCart()) }} sx={{ fontSize: 18, color: "white" }}>התנתקות</Button>
                            {/* <Button onClick={() => dispatch(userOut({ dispatch }))} sx={{ fontSize: 18, marginRight: 5, color: "#6a4e23" }}>התנתקות</Button> */}

                            {cUser.role === "admin" && (
                                <Button component={Link} to="/AddProd" sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
                                    <AddCircleIcon sx={{ marginRight: 1 }} /> הוספת מוצר
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setOpenSignIn(true)} sx={{ fontSize: 18, color: "white" }}>כניסה</Button>
                            <Button component={Link} to="/SignUp" sx={{ fontSize: 18, color: "white" }}>הרשמה</Button>
                        </>
                    )}

                    <Button component={Link} to="/list" sx={{ fontSize: 18, color: "white" ,  whiteSpace: "nowrap"}}>הרהיטים שלנו</Button>
                 
                    <IconButton edge="start" component={Link} to="/" sx={{ fontSize: 32,  color: "white" }}>
                        <HomeIcon />
                    </IconButton>
         
                </Box>
                <CardMedia
                    component="img"
                    image={`/t.png`}
                    sx={{
                        width: 170,
                        objectFit: 'contain',
                        marginRight: 5,
                        
                    }}
                />
              
            </Toolbar>
            
            <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
        </AppBar>
    );
};

export default NavBar;


// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { userOut } from "../features/userSlice";
// import { useState } from "react";
// import SignIn from "../pages/SignIn";
// import { AppBar, Toolbar, Button, IconButton, Box, Typography, CardMedia, Badge } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import HomeIcon from "@mui/icons-material/Home";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { clearCart } from "../features/cartSlice";

// const NavBar = () => {
//     let cUser = useSelector((state) => state.user.currentUser);
//     let qtyInCart = useSelector((state) => state.cart.qtyInCart);
//     const dispatch = useDispatch();
//     const [openSignIn, setOpenSignIn] = useState(false);

//     return (
//         <AppBar position="fixed" sx={{
//             backgroundColor: "black",
//             boxShadow: "none",
//             width: "100%",
//             left: 0,
//             top: 0,
//             borderBottom: "1px solid #ccc"
//         }}>
//             <Toolbar sx={{
//                 width: "100%",
//                 height: 70,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "0 20px"
//             }}>
                
//                 {/* לוגו בצד ימין */}
//                 <CardMedia
//                     component="img"
//                     image={`/t.png`}
//                     sx={{
//                         width: 170,
//                         objectFit: 'contain',
//                         marginRight: "auto"
//                     }}
//                 />

//                 {/* כפתורים ותפריט */}
//                 <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     flexWrap: "nowrap",
//                     gap: "10px"
//                 }}>
//                     <Button component={Link} to="/list" sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                         הרהיטים שלנו
//                     </Button>

//                     {/* משתמש מחובר */}
//                     {cUser ? (
//                         <>
//                             <Typography variant="h6" sx={{
//                                 color: "white",
//                                 fontSize: "18px",
//                                 fontWeight: 500,
//                                 whiteSpace: "nowrap"
//                             }}>
//                                 {`שלום, ${cUser.userName}`}
//                             </Typography>

//                             <Button onClick={() => { dispatch(userOut()); dispatch(clearCart()) }}
//                                 sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                                 התנתקות
//                             </Button>

//                             {cUser.role === "admin" && (
//                                 <Button component={Link} to="/AddProd"
//                                     sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                                     <AddCircleIcon sx={{ marginRight: 1 }} /> הוספת מוצר
//                                 </Button>
//                             )}
//                         </>
//                     ) : (
//                         <>
//                             <Button onClick={() => setOpenSignIn(true)}
//                                 sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                                 כניסה
//                             </Button>
//                             <Button component={Link} to="/SignUp"
//                                 sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                                 הרשמה
//                             </Button>
//                         </>
//                     )}

//                     {/* אייקון עגלת קניות */}
//                     <IconButton component={Link} to="/CartList" sx={{ fontSize: 32, color: "white" }}>
//                         <Badge badgeContent={qtyInCart} color="error" showZero>
//                             <ShoppingCartIcon />
//                         </Badge>
//                     </IconButton>

//                     {/* אייקון בית */}
//                     <IconButton edge="start" component={Link} to="/" sx={{ fontSize: 32, color: "white" }}>
//                         <HomeIcon />
//                     </IconButton>
//                 </Box>

//             </Toolbar>

//             <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
//         </AppBar>
//     );
// };

// export default NavBar;

