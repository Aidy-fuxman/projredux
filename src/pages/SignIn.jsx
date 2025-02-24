import {userIn} from '../features/userSlice';
import { useForm } from "react-hook-form";
import { addUser_singUp } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
    let navigate = useNavigate()//נותן את האפשרות לנווט לכתובת אחרת דרך קוד תכנותי
    let { register, formState: { errors }, handleSubmit } = useForm();
    let disp = useDispatch();
    return(
        <>
        <input type="text" />
        <input type="text" />
        
        </>
    )


}
export default SignIn;