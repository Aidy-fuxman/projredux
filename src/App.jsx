import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProdList from '../src/pages/ProdList'
import SignUp from '../src/pages/SignUp'
import SignIn from '../src/pages/SignIn'
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
          <Route path="ProdDeatails/:id" element={<ProdDeatails />} />
        </Route>
        <Route path="CartList" element={<CartList />} />
        <Route path="*" element={<h1>דף הבית</h1>} />
        <Route path="/CheckOut" element={<CheckOut />} />
      </Routes>




    </>
  )
}

export default App
