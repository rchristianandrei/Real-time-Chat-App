import { BrowserRouter, Routes, Route } from "react-router-dom";

import {ServiceContext, serviceBuilder} from "./services/serviceContext";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import Chat from "./components/Chat/Chat"
import { useState } from "react";

function App() {

  const userObj = JSON.parse(sessionStorage.getItem("user"))

  const [user, setUser] = userObj ? useState(userObj) : useState({})

  return (
    <>
    <ServiceContext.Provider value={serviceBuilder}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat user={user}></Chat>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login setUser={setUser}></Login>}></Route>
          </Routes>
          </BrowserRouter>
    </ServiceContext.Provider>
    </>
  )
}

export default App
