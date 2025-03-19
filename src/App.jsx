import { useState, useEffect } from 'react';
import './App.scss';
import ProdList from '../src/pages/ProdList';
import SignUp from '../src/pages/SignUp';
import SignIn from '../src/pages/SignIn';
import AddProd from './components/AddProd';
import UpdateProd from './components/UpdateProd';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import CartList from '../src/pages/CartList';
import ProdDeatails from '../src/components/ProdDeatails';
import NavBar from '../src/components/NavBar';
import { Route, Routes } from 'react-router-dom';
import CheckOut from '../src/pages/CheckOut';
import { getFromLocalStorage } from "./utils/storage";
import { useDispatch } from "react-redux";
import { userIn } from './features/userSlice';
import CartDrawer from './components/CartDrawer';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = getFromLocalStorage("user");
    if (savedUser) {
      dispatch(userIn(savedUser));
    }
  }, []);



 

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "20px" }}>
      <Routes>
        <Route path="SignIn" element={<SignIn />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="list" element={<ProdList onOpenDrawer={() => console.log("Drawer opened!")} />}>
          <Route path="ProdDeatails/:id" element={<ProdDeatails />} />
        </Route>
        <Route path="CartList" element={<CartList />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/UpdateProd/:id" element={<PrivateRoute role="admin" Component={UpdateProd} />} />
        <Route path="/AddProd" element={<PrivateRoute role="admin" Component={AddProd} />} />
        <Route path="/CartDrawer" element={<CartDrawer/>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
