import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute=({Component,role})=>{

let user= useSelector(state=>state.user.currentUser);

return user&&user.role==role?<Component/>:<Navigate to="/SignIn"/>;
};
export default PrivateRoute;
