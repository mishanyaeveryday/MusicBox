import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Error from './components/Error';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollTop from './components/ScrollTop';
import './App.css';
import './index.css';
function App() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar/>
      <div style={{ flexGrow: "2", alignContent: "center" }}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      </div>
      <Footer/>
      <ScrollTop />
    </div>
  )
}

export default App
