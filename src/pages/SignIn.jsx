import React, { useState } from "react";
import { Drawer, TextField, Button, IconButton, Typography, Box, InputAdornment } from "@mui/material";
import { getUserNamePassword_login } from "../api/userService";
import { userIn } from '../features/userSlice';
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { saveToLocalStorage } from "../utils/storage";
const SingIn = ({ open, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let disp = useDispatch();
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };


   
    
    const onSubmit = (data) => {
        getUserNamePassword_login(data)
            .then(res => {
                disp(userIn(res.data));
                saveToLocalStorage("user", res.data);
                onClose();
                navigate("/ProdList");
            })
            .catch(err => {
                alert("Cannot login: " + (err.response?.data?.message || "Unknown error"));
            });
    };
    
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{ pointerEvents: 'auto' }} // הוסף את זו אם הבעיה עדיין נמשכת
        >
            <Box
                sx={{
                    width: { xs: "100vw", sm: 400 },
                    p: 2,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                {/* כפתור סגירה (X) */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* כותרת */}
                <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
                    <Typography variant="h5" component="h2">
                        היכנסו לחשבון שלכם
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        באפשרותכם לקבל חוויה מותאמת אישית יותר
                    </Typography>
                </Box>

                {/* טופס התחברות עם react-hook-form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField
                        label="שם משתמש"
                        variant="outlined"
                        type="text"
                        {...register("userName", {
                            required: "נא להזין שם משתמש",
                            minLength: { value: 3, message: "שם משתמש חייב להיות לפחות 3 תווים" }
                        })}
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                    />
                    <TextField
                        label="סיסמה"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        {...register("password", { 
                            required: "נא להזין סיסמה", 
                            minLength: { value: 6, message: "סיסמה חייבת להכיל לפחות 6 תווים" } 
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* שכחתם את הסיסמה? */}
                    <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                        שכחתם את הסיסמה?
                    </Typography>

                    {/* כפתור כניסה */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, backgroundColor: "#000", "&:hover": { backgroundColor: "#333" } }}
                    >
                        כניסה
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SingIn;
