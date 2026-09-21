import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login, Signup ,ActivationPage,HomePage,ProductsPage ,BestSellingPage,Event,Faq, ProductDetailsPage,ProfilePage} from './routes/Routes.js'
import { ShopCreateProduct } from './routes/ShopRoutes.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import Store from './redux/store.js'
import { loadSeller, loadUser } from './redux/actions/user.js'
import { getAllProducts } from './redux/actions/product.js'
import { getAllEvents } from './redux/actions/event.js'
import OrderSuccessPage from './pages/OrderSuccessPages.jsx'
import ProtectedRoute from './routes/ProtectedRoute.js'
import { useSelector } from 'react-redux'
import ShopCreatePage from './pages/ShopCreate.jsx'
import SellerActivationPage from './pages/SellerActivationPage.jsx'
import ShopLoginPage from './pages/ShopLoginPage.jsx'
import ShopDashboardPage from './pages/ShopDashboardPage.jsx'
import ShopHomePage from './pages/Shop/ShopHomePage.jsx'
import SellerProtectedRoute from './routes/SellerProtectedRoute.jsx'
import ShopAllProducts from './pages/Shop/ShopAllProducts.jsx'
import ShopCreateEvents from './pages/Shop/ShopCreateEvents.jsx'
import ShopAllEvents from './pages/Shop/ShopAllEvent.jsx'
import ShopAllCoupouns from './pages/Shop/ShopAllCoupouns.jsx'
const AppRoutes = () => {
  const { isAuthenticated }=useSelector((state)=>state.user)
  const location = useLocation()
  const isSellerPage = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/shop/')

  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(getAllProducts())
    Store.dispatch(getAllEvents())

    if (isSellerPage) {
      Store.dispatch(loadSeller())
    }
  }, [isSellerPage])
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/activation/:activation_token" element={<ActivationPage/>} />
        <Route path="/seller/activation/:activation_token" 
        element={<SellerActivationPage/>} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/best-selling" element={<BestSellingPage/>}/>
        <Route path="/events" element={<Event/>}/>
         <Route path="/faq" element={<Faq/>}/>
        <Route path="/order-success" element={<OrderSuccessPage/>}/>
   
         <Route path="/Signup" element={<Signup/>}/>  
              <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage/>
                </ProtectedRoute>
              }/>
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
         
          <Route path="/shop/:id" 
          element={
            <SellerProtectedRoute>
              <ShopHomePage/>
            </SellerProtectedRoute>
          } />
           <Route path="/dashboard-create-product" 
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct/>
            </SellerProtectedRoute>
          } />
           <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
         <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          }
        />
         <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          }
        />
           <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          }
        />
          <Route path="/dashboard" element={<ShopDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
    </>
  )
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default App
