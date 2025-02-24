import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, MenuItem, Container, Typography, Box } from "@mui/material";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Checkout Data:", data);
    alert("ההזמנה הושלמה בהצלחה! תודה על הרכישה.");
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
