import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProdList from '../src/pages/ProdList'
import SignUp from '../src/pages/SignUp'
import SignIn from '../src/pages/SignIn'
import AddProd from './components/AddProd'
import ApdateProd from './components/ApdateProd'
import HomePage from './pages/HomePage'

import CartList from '../src/pages/CartList'
import ProdDeatails from '../src/components/ProdDeatails'
import NavBar from '../src/components/NavBar'
import { Route, Routes } from 'react-router-dom'
import CheckOut from './pages/Checkout'


function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="SignIn" element={<SignIn />} />
        <Route path="Signup" element={<SignUp />} />
        <Route path="list" element={<ProdList />} >
          <Route path="ProdDeatails/:id" element={<ProdDeatails/>} />
        </Route>
        <Route path="CartList" element={<CartList />} />
        <Route path="*" element={<HomePage/>} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/ApdateProd" element={<ApdateProd />} />
        <Route path="/AddProd" element={<AddProd />} />
      </Routes>




    </>
  )
}

export default App
