import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup ,ActivationPage} from './Routes.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import axios from 'axios'
import { server } from './server.js'
function App() {
  useEffect(()=>{
    axios.get(`${server}/user/getuser`,{withCredentials:true}).then((res)=>{
      toast.success(res.data.message)
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/activation/:activation_token" element={<ActivationPage/>} />
      </Routes>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </BrowserRouter>
  )
}

export default App
