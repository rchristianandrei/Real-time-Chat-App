import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { GlobalContext } from "./contexts/globalContext";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login"
import Chat from "./components/Chat/Chat"
import { getUser } from "./services/sessionStorageServices";
import { connectToWSS, disconnectToWSS } from "./services/wsServices";

function App() {

  const userObj = getUser()
  const [user, setUser] = userObj ? useState(userObj) : useState(null)

  useEffect(() => {
    if(!userObj) return

    connectToWSS(userObj.id)

    return () => {
      disconnectToWSS()
    }
    
  },[])

  return (
    <GlobalContext.Provider value = {{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat></Chat>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
