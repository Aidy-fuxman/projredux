

import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem, Container, Typography, Box, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../api/orderService";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dis = useDispatch();
  let navigate = useNavigate();
  let cart = useSelector((st) => st.cart.cartArr) || [];
  const cUser = useSelector((state) => state.user.currentUser);

  const onSubmit = (data) => {
    data.products = cart;
    data.userId = cUser?._id;
    addOrder(data, cUser?.token)
      .then((res) => {
        console.log(res);
        alert("ההזמנה הושלמה בהצלחה! תודה על הרכישה.");
        navigate("/list");
        dis(clearCart());
      })
      .catch((err) => {
        console.log(err);
        alert("cannot add order  " + err.response?.data?.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom color="black">
        טופס סיום הזמנה ותשלום
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="הכנס שם מלא"
          {...register("fullName", { required: { value: true, message: "זהו שדה חובה" } })}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        {errors.fullName && <Typography color="error">{errors.fullName.message}</Typography>}

        <TextField
          fullWidth
          variant="standard"
          placeholder="הכנס כתובת למשלוח"
          {...register("address", { required: { value: true, message: "זהו שדה חובה" } })}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        {errors.address && <Typography color="error">{errors.address.message}</Typography>}

        <Tooltip title="מספר טלפון חייב לכלול 9-10 ספרות בלבד.">
          <TextField
            fullWidth
            variant="standard"
            placeholder="הכנס מספר טלפון"
            {...register("phone", {
              required: { value: true, message: "זהו שדה חובה" },
              pattern: {
                value: /^\d{9,10}$/,
                message: "מספר טלפון לא תקין",
              },
            })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </Tooltip>
        {errors.phone && <Typography color="error">{errors.phone.message}</Typography>}

        <TextField
          fullWidth
          variant="standard"
          placeholder="הכנס אימייל"
          {...register("email", {
            required: { value: true, message: "זהו שדה חובה" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "כתובת אימייל לא תקינה",
            },
          })}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        {errors.email && <Typography color="error">{errors.email.message}</Typography>}

        <TextField
          select
          fullWidth
          variant="standard"
          placeholder="בחר אמצעי תשלום"
          {...register("paymentMethod", { required: { value: true, message: "בחר אמצעי תשלום" } })}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        >
          <MenuItem value="credit_card">כרטיס אשראי</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
          <MenuItem value="bank_transfer">העברה בנקאית</MenuItem>
        </TextField>
        {errors.paymentMethod && <Typography color="error">{errors.paymentMethod.message}</Typography>}

        <TextField
          fullWidth
          variant="standard"
          placeholder="הערות להזמנה (לא חובה)"
          multiline
          rows={3}
          {...register("notes")}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          סיים והמשך לתשלום
        </Button>
      </Box>
    </Container>
  );
};

export default CheckOut;
