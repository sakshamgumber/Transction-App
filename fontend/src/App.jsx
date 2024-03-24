import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/signup'
import { Signin } from './components/sigin'
import { Payment } from './components/Payment'
import { Dashboard } from './components/dashboard'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import axios from "axios"
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup label="Sign up" email="Email"signinfo="sign up" firstname="Name" lastname="LastName" information="Enter your information to create an accoumnt" />}/>
      <Route path="/dashboard" element={ <Dashboard/>}/>
      <Route path="/payment" element={ <Payment />}/>
      <Route path="/signin" element={<Signin label="Sign In" signinfo="sign in" information="Enter Your credentials to access your account"/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
