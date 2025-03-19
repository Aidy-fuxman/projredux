import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../api/prodService";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

const UpdateProd = () => {
    const { state } = useLocation(); 
    const navigate = useNavigate();
    let currentUser = useSelector(state => state.user.currentUser)
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: state || {} 
    });

    const onSubmit = async (data) => {
        try {
            const token = currentUser?.token;  
            await updateProduct(state._id, data, token); 
            alert("המוצר עודכן בהצלחה");
            navigate(-1); 
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error.message);
            alert("בעיה בעדכון מוצר");
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" }}>
            <TextField label="Product Name" {...register("prodName")} />
            <TextField label="Description" {...register("description")} multiline rows={3} />
            <TextField label="Image URL" {...register("imageUrl")} />
            <TextField label="Price" type="number" {...register("price")} />
            <TextField label="Materials (comma separated)" {...register("materials")} />
            <TextField label="Weight" type="number" {...register("weight")} />
            <TextField label="Made In" {...register("madeIn")} />

            <Button type="submit" variant="contained" color="primary">Update Product</Button>
        </form>
    );
};

export default UpdateProd;
