import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { useEffect } from 'react'
import axios from "axios"
import { setUserData } from './redux/userSlice.js'
export const serverUrl = "http://localhost:8000"
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
     const fetchUser = async ()=> {
         try {
           const res = await axios.get(serverUrl + "/api/user/current-user" , {withCredentials:true})
           dispatch(setUserData(res.data))
         } catch (error) {
             console.log(error)
             dispatch(setUserData(null))
         }
     }
     fetchUser()
  },[])
  return (
    <Routes>
      <Route path='/'  element={<Home/>}/>
    </Routes>
  )
}

export default App