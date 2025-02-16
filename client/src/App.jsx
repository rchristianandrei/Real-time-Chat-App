import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { GlobalContext } from "./contexts/globalContext";
import { WebSocketContext, wsMethods } from "./contexts/webSocketContext";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import Chat from "./components/Chat/Chat"
import { getUser } from "./services/sessionStorageServices";

function App() {

  const userObj = getUser()
  const [user, setUser] = userObj ? useState(userObj) : useState(null)

  useEffect(() => {
    if(!userObj) return

    const ws = new WebSocket("ws://localhost:3001")

    ws.onopen = function(){
      ws.send(JSON.stringify({type: "register", id:userObj.id}))
    }
    ws.onmessage = function(ev) {
      wsMethods.get().forEach(element => {
        element(JSON.parse(ev.data))
      });
    }
    
  },[user])

  return (
    <WebSocketContext.Provider value={wsMethods}>
    <GlobalContext.Provider value = {{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat></Chat>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
    </WebSocketContext.Provider>
  )
}

export default App
