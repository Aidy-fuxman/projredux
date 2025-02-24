import { useEffect, useState } from "react";
import { getAllProduct, getTotalPages } from "../api/prodService";
import { CircularProgress } from '@mui/material';
import OneProd from '../components/OneProd';
import { setArrProd } from "../features/prodSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const ProdList = () => {
    let [arr, setArr] = useState([]);
    let [status, setStatus] = useState("init");
    let [totalPages, setTotalPages] = useState(3);
    let dispatch = useDispatch()

    useEffect(() => {
        setStatus('pending')
        getAllProduct(1).then(res => {
            console.log(res);
            setArr(res.data);
            dispatch(setArrProd(res.data))
        }).catch(err => {
            console.log(err)
            alert("Cannot load the products")
        }).finally(() => {
            setStatus("finish")
        })


        getTotalPages().then(res => {
            setTotalPages(res.data.pages);
        }).catch(err => {
            console.log(err)
            alert("cannot load the total pages")
        })
    }, []);


    let arrBtnPgs = [];
    for (let i = 1; i < totalPages; i++) {
        arrBtnPgs.push(<input key={i} type="button" value={i} onClick={() => { }} />);
    };

    return (
        <div>
            <h1>list of products</h1>
            {arrBtnPgs}
            {status == "pending" ? <CircularProgress />
                : arr.map(item => <li key={item._id}>
                    <Link to={`ProdDeatails/${item._id}`}>
                        <OneProd prod={item} isInCart={false} />
                    </Link>
                </li>)}
            <Outlet />
        </div>);



}
export default ProdList;