// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { userOut } from "../features/userSlice";
// import { useState } from "react";
// import SignIn from "../pages/SignIn";
// import { AppBar, Toolbar, Button, IconButton, Box, Typography, CardMedia } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import HomeIcon from "@mui/icons-material/Home";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { clearCart } from "../features/cartSlice";
// import { Badge } from "@mui/material";

// const NavBar = () => {
//     let cUser = useSelector((state) => state.user.currentUser);
//     let qtyInCart = useSelector((state) => state.cart.qtyInCart)
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

//             <Toolbar sx={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
//                 <IconButton component={Link} to="/CartList" sx={{ fontSize: 32, marginLeft: 2, color: "white" }}>
//                     <Badge badgeContent={qtyInCart} color="error" showZero>
//                         <ShoppingCartIcon />
//                     </Badge>
//                 </IconButton>


              
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
                 
//                     <Typography variant="h6" sx={{
//                         marginRight: 100,
//                         color: "white",
//                         fontSize: "18px",
//                         fontWeight: 500,
//                         whiteSpace: "nowrap"
//                     }}>
//                         {cUser ? `שלום, ${cUser.userName}` : "שלום, אורח"}
//                     </Typography>

                  
//                     {cUser ? (
//                         <>
                           
//                             <Button onClick={() => { dispatch(userOut()); dispatch(clearCart()) }} sx={{ fontSize: 18, color: "white" }}>התנתקות</Button>
                           

//                             {cUser.role === "admin" && (
//                                 <Button component={Link} to="/AddProd" sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap" }}>
//                                     <AddCircleIcon sx={{ marginRight: 1 }} /> הוספת מוצר
//                                 </Button>
//                             )}
//                         </>
//                     ) : (
//                         <>
//                             <Button onClick={() => setOpenSignIn(true)} sx={{ fontSize: 18, color: "white" }}>כניסה</Button>
//                             <Button component={Link} to="/SignUp" sx={{ fontSize: 18, color: "white" }}>הרשמה</Button>
//                         </>
//                     )}

//                     <Button component={Link} to="/list" sx={{ fontSize: 18, color: "white" ,  whiteSpace: "nowrap"}}>הרהיטים שלנו</Button>
                 
//                     <IconButton edge="start" component={Link} to="/" sx={{ fontSize: 32,  color: "white" }}>
//                         <HomeIcon />
//                     </IconButton>
         
//                 </Box>
//                 <CardMedia
//                     component="img"
//                     image={`/t.png`}
//                     sx={{
//                         width: 170,
//                         objectFit: 'contain',
//                         marginRight: 5,
                        
//                     }}
//                 />
              
//             </Toolbar>
            
//             <SignIn open={openSignIn} onClose={() => setOpenSignIn(false)} />
//         </AppBar>
//     );
// };

// export default NavBar;




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
            backgroundColor: "black",  
            boxShadow: "none",
            width: "100%",  
            left: 0,        
            top: 0,
            borderBottom: "1px solid #ccc"
        }}>

            <Toolbar sx={{ width: "100%", height: 70, display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                <IconButton component={Link} to="/CartList" sx={{ fontSize: 32, marginLeft: 2, color: "white" }}>
                    <Badge badgeContent={qtyInCart} color="error" showZero>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{
                        marginRight: 100,
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 500,
                        whiteSpace: "nowrap"
                    }}>
                        {cUser ? `שלום, ${cUser.userName}` : "שלום, אורח"}
                    </Typography>

                    {cUser ? (
                        <>
                            <Button onClick={() => { dispatch(userOut()); dispatch(clearCart()) }} sx={{ fontSize: 18, color: "white", marginRight: 2 }}>התנתקות</Button>

                            {cUser.role === "admin" && (
                                <Button component={Link} to="/AddProd" sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap", marginRight: 2 }}>
                                    <AddCircleIcon sx={{ marginRight: 1 }} /> הוספת מוצר
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setOpenSignIn(true)} sx={{ fontSize: 18, color: "white", marginRight: 2 }}>כניסה</Button>
                            <Button component={Link} to="/SignUp" sx={{ fontSize: 18, color: "white", marginRight: 2 }}>הרשמה</Button>
                        </>
                    )}

                    <Button component={Link} to="/list" sx={{ fontSize: 18, color: "white", whiteSpace: "nowrap", marginRight: 2 }}>הרהיטים שלנו</Button>

                    <IconButton edge="start" component={Link} to="/" sx={{ fontSize: 32, color: "white" }}>
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
