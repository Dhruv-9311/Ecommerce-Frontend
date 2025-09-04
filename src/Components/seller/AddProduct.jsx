import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AddProduct = () => {

  const nameRef = useRef()
  const brandRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()
  const categoryRef = useRef()
  const ratingRef = useRef()
  const imageRef = useRef()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",nameRef.current.value);
    formData.append("brand",brandRef.current.value);
    formData.append("description",descRef.current.value);
    formData.append("price",priceRef.current.value);
    formData.append("category",categoryRef.current.value);
    formData.append("rating",ratingRef.current.value);
    formData.append("image",imageRef.current.files[0]);
    
    fetch("http://localhost:3000/api/seller/products",{
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
      // Clear form after successful submission
      e.target.reset();
      navigate("/");
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
            <p className="text-gray-600">Fill in the details below to add your product to the marketplace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input 
                type="text" 
                id="name"
                placeholder='Enter product name' 
                ref={nameRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Product Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Product Brand
              </label>
              <input 
                type="text" 
                id="brand"
                placeholder='Enter brand name' 
                ref={brandRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea 
                id="description"
                placeholder='Enter product description' 
                ref={descRef}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400 resize-none"
                required
              />
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input 
                    type="number" 
                    id="price"
                    placeholder='0.00' 
                    ref={priceRef}
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category
                </label>
                <input 
                  type="text" 
                  id="category"
                  placeholder='Enter category' 
                  ref={categoryRef}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Rating and Image Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Rating
                </label>
                <input 
                  type="number" 
                  id="rating"
                  placeholder='0-5' 
                  ref={ratingRef}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <input 
                  type="file" 
                  id="image"
                  ref={imageRef}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type='submit'
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;