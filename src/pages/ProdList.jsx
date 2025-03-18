

import { useEffect, useState } from "react";
import { getAllProduct, getTotalPages } from "../api/prodService";
import { CircularProgress, Grid, Card, CardContent, Typography, Button, Stack, Container } from '@mui/material';
import OneProd from '../components/OneProd';
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProdList = () => {
    let [arr, setArr] = useState([]);
    let [status, setStatus] = useState("init");
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState();
    let dispatch = useDispatch();

    function onDelete(id) {
        let copy = arr.filter(item => item._id !== id)
        setArr(copy)
    }

    useEffect(() => {
        setStatus('pending');
        getAllProduct(currentPage).then(res => {
            setArr(res.data);
        }).catch(err => {
            console.log(err);
            alert("Cannot load the products");
        }).finally(() => {
            setStatus("finish");
        });
    }, [currentPage]);

    useEffect(() => {
        getTotalPages().then(res => {
            setTotalPages(res.data.pages);
        }).catch(err => {
            console.log(err);
            alert("Cannot load the total pages");
        });
    }, [arr]);

    return (
        <Container maxWidth="lg">
            {/* <Typography variant="h4" align="center" gutterBottom>רשימת מוצרים</Typography> */}

            <Grid container spacing={4}>
                {status === "pending" ?
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        style={{ minHeight: '100vh' }} // מוודא שהעיגול יהיה במרכז המסך
                    >
                        <CircularProgress />
                    </Grid> :
                    arr.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <OneProd prod={item} isInCart={false} onDelete={onDelete} />
                        </Grid>
                    ))
                }
            </Grid>
            <Stack direction="row" spacing={1} justifyContent="center" marginBottom={2}>
                {[...Array(totalPages)].map((_, i) => (
                    <Button
                        key={i + 1}
                        variant="contained"
                        onClick={() => setCurrentPage(i + 1)}
                        sx={{
                            width: 50,
                            height: 50,
                            minWidth: 50,
                            borderRadius: "50%",
                            backgroundColor: currentPage === i + 1 ? "black" : "transparent",
                            color: currentPage === i + 1 ? "white" : "black",
                            fontSize: "20px", // הגדלת גודל המספר
                            fontWeight: "bold",
                            boxShadow: "none", // ללא צל
                            "&:hover": {
                                backgroundColor: "black",
                                color: "white",
                            },
                        }}
                    >
                        {i + 1}
                    </Button>
                ))}
            </Stack>
            <Outlet />
        </Container>
    );
}

export default ProdList;