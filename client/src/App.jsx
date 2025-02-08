import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {ServiceContext, serviceBuilder} from "./services/serviceContext";
import { GlobalContext } from "./contexts/globalContext";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import Chat from "./components/Chat/Chat"

function App() {

  const userObj = JSON.parse(sessionStorage.getItem("user"))
  const [user, setUser] = userObj ? useState(userObj) : useState(null)

  useEffect(() => {
    if(!userObj) return

    const ws = new WebSocket("ws://localhost:3001")

    ws.onopen = function(){
      ws.send(JSON.stringify({type: "register", id:userObj.id}))
    }
    ws.onmessage = function(ev) {
      console.log(JSON.parse(ev.data))
    }
    
  },[user])

  return (
    <ServiceContext.Provider value={serviceBuilder}>
    <GlobalContext.Provider value = {{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat></Chat>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
    </ServiceContext.Provider>
  )
}

export default App
