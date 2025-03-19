import { useForm } from "react-hook-form";
import { addUser_singUp } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userIn } from '../features/userSlice';
import { saveToLocalStorage } from "../utils/storage";
import { TextField, Button, Container, Typography, Box, Tooltip } from "@mui/material";

const SignUp = () => {
    let navigate = useNavigate();
    let { register, formState: { errors }, handleSubmit } = useForm();
    let disp = useDispatch();

    const saveFunction = (data) => {
        addUser_singUp(data)
            .then(res => {
                disp(userIn(res.data));
                saveToLocalStorage("user", res.data);
                navigate("/prodList");
            })
            .catch(err => {
                alert("בעיה בהוספת משתמש למערכת");
            });
    };

    return (
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
            <Typography variant="h4" gutterBottom color="black">
                הרשמה
            </Typography>
            <Box component="form" onSubmit={handleSubmit(saveFunction)} sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="הכנס שם"
                    {...register("userName", { required: { value: true, message: "זהו שדה חובה" } })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />
                {errors.userName && <Typography color="error">{errors.userName.message}</Typography>}

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="הכנס אימייל"
                    type="email"
                    {...register("email", {
                        required: { value: true, message: "זהו שדה חובה" },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "כתובת המייל אינה תקינה"
                        }
                    })}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                />
                {errors.email && <Typography color="error">{errors.email.message}</Typography>}

                <Tooltip title="הסיסמה חייבת לכלול לפחות 6 תווים, אות אחת ומספר אחד.">
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="הכנס סיסמה"
                        type="password"
                        {...register("password", {
                            required: { value: true, message: "זהו שדה חובה" },
                            minLength: { value: 6, message: "הסיסמה חייבת לכלול לפחות 6 תווים" },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: "הסיסמה חייבת לכלול לפחות אות אחת ומספר אחד"
                            }
                        })}
                        inputRef={register("password").ref}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                </Tooltip>
                {errors.password && <Typography color="error">{errors.password.message}</Typography>}

                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="phone"
                    {...register("phone", {
                        required: { value: true, message: "זהו שדה חובה" },
                        minLength: { value: 10, message: "טלפון לפחות 10 תווים" }
                    })}
                    inputRef={register("phone").ref}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                />
                {errors.phone && <Typography color="error">{errors.phone.message}</Typography>}

                <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}>
                    הרשמה
                </Button>
            </Box>
        </Container>
    );
};

export default SignUp;
