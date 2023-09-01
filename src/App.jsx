// import { useState } from 'react'

import { Routes, Route, NavLink } from "react-router-dom"
import Wk1 from "./App_wk1"
import Wk2 from './App_wk2'
import Wk3 from './App_wk3'
import Wk4 from './BasicExample'

function App() {

  const style = ({ isActive }) => {
    return {
      color: isActive ? 'blue' : ''
    }
  }

  return (
    <>
      <div>
        <NavLink to="/Wk1" style={style}>第一週作業</NavLink> |
        <NavLink to="/Wk2" style={style}>第二週作業</NavLink> |
        <NavLink to="/" style={style}>第三週作業</NavLink> |
        <NavLink to="/Wk4" style={style}>第4週作業</NavLink> 
      </div>
      <hr />
    
      <Routes>
        <Route path="/Wk1" element={<Wk1 />}></Route>
        <Route path="/Wk2" element={<Wk2 />}></Route>
        <Route path="/" element={<Wk3 />}></Route>
        <Route path="/Wk4" element={<Wk4 />}></Route>
      </Routes>
    </>
  )
}

export default App
