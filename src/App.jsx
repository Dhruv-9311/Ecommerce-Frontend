

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/seller/AddProduct";
import NavBar from "./nav/NavBar"
import Signup from "./Components/auth/Signup"
import Login from "./Components/auth/Login"
import SellerHome from "./Components/seller/sellerHome"
import CustomerHome from "./Components/customer/customerHome"
import { useSelector } from "react-redux"
import Cart from "./Components/customer/cart/Cart"
import Orders from "./Components/customer/Orders";


function App() {
  const {userType} = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
        <div className="min-h-screen bg-gray-100 ">
          <div>
            <NavBar/>
            <Routes>
              <Route path= "/" element={userType === "seller" ? <SellerHome/> : <CustomerHome/>}/>
              <Route path= "/add-product" element={<AddProduct/>}/>
              <Route path= "/login" element={<Login/>}/>
              <Route path= "/signup" element={<Signup/>}/>
              <Route path ="/cart" element ={<Cart/>}/>
              <Route path ="/orders" element ={<Orders/>}/>


            </Routes>
            
          </div>
         </div>
    </BrowserRouter>
  )
  }

export default App;
