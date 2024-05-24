import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Route Components
import Home from "./pages/Home"

// End's Here

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
