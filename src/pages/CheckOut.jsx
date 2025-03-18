import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem, Container, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../api/orderService";
import { useNavigate } from "react-router-dom";
import {clearCart} from "../features/cartSlice"
const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dis = useDispatch();
  let navigate=useNavigate();
  let cart = useSelector(st => st.cart.cartArr) || [];
  const cUser = useSelector((state) => state.user.currentUser);


  const onSubmit = (data) => {
    console.log(cart);
    data.products = cart;
    console.log("📦 שולח הזמנה:", data);
    data.userId = cUser?._id;
    addOrder(data, cUser?.token).then(res => {
      console.log(res)
      alert("ההזמנה הושלמה בהצלחה! תודה על הרכישה.");
      navigate("/list")
      dis(clearCart())
    }).catch(err => {
      console.log(err)
      alert("cannot add order" + err.response?.data?.message)
      
    })

  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" gutterBottom>
          טופס סיום הזמנה ותשלום
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="שם מלא"
            {...register("fullName", { required: "שדה חובה" })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="כתובת למשלוח"
            {...register("address", { required: "שדה חובה" })}
            error={!!errors.address}
            helperText={errors.address?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="מספר טלפון"
            {...register("phone", {
              required: "שדה חובה",
              pattern: {
                value: /^\d{9,10}$/,
                message: "מספר טלפון לא תקין",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            margin="normal"
          />

          <TextField
            fullWidth
            label="אימייל"
            {...register("email", {
              required: "שדה חובה",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "כתובת אימייל לא תקינה",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="אמצעי תשלום"
            {...register("paymentMethod", { required: "בחר אמצעי תשלום" })}
            error={!!errors.paymentMethod}
            helperText={errors.paymentMethod?.message}
            margin="normal"
          >
            <MenuItem value="credit_card">כרטיס אשראי</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
            <MenuItem value="bank_transfer">העברה בנקאית</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="הערות להזמנה (לא חובה)"
            multiline
            rows={3}
            {...register("notes")}
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            סיים והמשך לתשלום
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CheckOut;
