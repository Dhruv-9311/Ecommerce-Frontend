import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { useDispatch } from 'react-redux'


const NavBar = () => {

    const { isLoggedIn, userType } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
                
                {/* Left side - Logo and Add Products */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-purple-500 transition-colors duration-200">
                        Complete Bazaar
                    </Link>

                    {isLoggedIn && userType === "seller" && (
                    <Link 
                        to="/add-product" 
                        className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-indigo-50 border border-gray-200"
                    >
                        <span className="text-base">＋</span>
                        <span>Add Product</span>
                    </Link>
                    )}

                    {isLoggedIn && userType === "customer" && (
                        <div className="hidden sm:flex items-center space-x-3 ml-6">
                            <Link to="/cart" className="inline-flex gap-2 items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 border-gray-200">
                                <span>🛒</span>
                                <span>Cart</span>
                            </Link>
                            <Link to="/orders" className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 border-gray-200">
                                <span>📦</span>
                                <span>Orders</span>
                            </Link>
                        </div>
                    )}
                </div>
                
                
                {/* Right side - Auth buttons */}
                <div className="flex items-center space-x-3 ml-auto">
                    {isLoggedIn ? (
                        <Link 
                            to="/logout" 
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-red-50 border border-gray-200" onClick={handleLogout}
                        >
                            <span>↩︎</span>
                            <span>Logout</span>
                        </Link>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="inline-flex items-center gap-2 text-gray-700 hover:text-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-indigo-50 border border-gray-200"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>   
  )
}

export default NavBar;