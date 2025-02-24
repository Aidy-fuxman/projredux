import { userIn } from '../features/userSlice';
import { useForm } from "react-hook-form";
import { addUser_singUp } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";


const SignUp = () => {
    let navigate = useNavigate()//נותן את האפשרות לנווט לכתובת אחרת דרך קוד תכנותי
    let { register, formState: { errors }, handleSubmit } = useForm();
    let disp = useDispatch();

    const saveFunction = (data) => {
        addUser_singUp(data).then(res => {
            console.log(res.data)
            alert("added successfuly")
            disp(userIn(res.data))
            navigate("/prodList")

        }).catch(err => {
            console.log(err)
            alert("cannot add")

        })
    }
    return (
        <form onSubmit={handleSubmit(saveFunction)}>
            <input type="text" placeholder="הכנס שם" {...register("userName", { required: { value: true, message: "זהו שדה חובה" } })} />
            {errors.userName && <div style={{ color: "red" }} className="err">{errors.userName.message}</div>}

            <input
                type="email" // שדה מסוג אימייל
                placeholder="הכנס אימייל"
                {...register("email", {
                    required: { value: true, message: "זהו שדה חובה" },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "כתובת המייל אינה תקינה"
                    }
                })}
            />

            {errors.email && <div style={{ color: "red" }} className="err">{errors.email.message}</div>}

            {/* <input
                type="role" // שדה מסוג אימייל
                placeholder="הכנס תפקיד"
                {...register("role", {
                    required: { value: true, message: "זהו שדה חובה" },
             
                })}

            />
            {errors.role && <div style={{ color: "red" }} className="err">{errors.role.message}
            </div>} */}
            <div>
                <input
                    id="password"
                    type="password"
                    placeholder="הכנס סיסמה"
                    {...register("password", {
                        required: { value: true, message: "זהו שדה חובה" },
                        minLength: { value: 6, message: "הסיסמה חייבת לכלול לפחות 6 תווים" },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: "הסיסמה חייבת לכלול לפחות אות אחת ומספר אחד"
                        }
                    })}
                    data-tooltip-id="password-tooltip"
                />
                {errors.password && <div style={{ color: "red" }} className="err">{errors.password.message}</div>}

                <Tooltip id="password-tooltip" place="top" effect="solid">
                    הסיסמה חייבת לכלול לפחות 6 תווים, אות אחת ומספר אחד.
                </Tooltip>
            </div>



            <input type="text" placeholder="phone" {...register("phone", {
                required: { value: true, message: "זהו שדה חובה" },
                minLength: { value: 10, message: "טלפון לפחות 10 תווים" }
            })} />

            {errors.phone && <div style={{ color: "red" }} className="err">{errors.phone.message}</div>}

            <input type="submit" />
        </form>);
}

export default SignUp;