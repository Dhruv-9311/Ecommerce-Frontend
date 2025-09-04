import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  {login}  from '../../store/slices/authSlice'

const Login = () => {

  
  const emailRef = useRef()
  const passwordRef = useRef()
 
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    
    fetch("https://ecommerce-backend-6z5x.vercel.app/api/auth/login",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        email: emailRef.current.value,
        password: passwordRef.current.value,
        
      }),
    }).then(response => response.json())
    .then(data => {
      if (data.errors) {
        // Handle validation errors
        const validationErrors = {};
        data.errors.forEach(error => {
          validationErrors[error.path] = error.msg;
        });
        setErrors(validationErrors);
      } else if (data.message === 'Login successful') {
        console.log("Success:", data);
        dispatch(login(data));
        navigate("/");
      } else {
        setErrors({ submit: data.message });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      setErrors({ submit: 'Network error. Please try again.' });
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Login to your account</h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Create a password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {errors.submit && <p className="text-red-500 text-xs mt-2 text-center">{errors.submit}</p>}
            </div>
          </form>

         
          
        </div>
      </div>
    </div>
  )
}

export default Login;