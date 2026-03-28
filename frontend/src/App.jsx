import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup ,ActivationPage,HomePage,ProductsPage ,BestSellingPage,Event,Faq} from './Routes.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import Store from './redux/store.js'
import {loadUser} from './redux/actions/user.js'
function App() {
  useEffect(()=>{
    Store.dispatch(loadUser())
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/activation/:activation_token" element={<ActivationPage/>} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/best-selling" element={<BestSellingPage/>}/>
        <Route path="/events" element={<Event/>}/>
         <Route path="/faq" element={<Faq/>}/>

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
