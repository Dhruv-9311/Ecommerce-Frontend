import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSellerProducts } from '../../store/slices/sellerSlice'
import { useEffect } from 'react'
import SellerProduct from './SellerProduct'
import { deleteProduct } from '../../store/slices/sellerSlice'

const sellerHome = () => {

  const {products, isLoading, error} = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(fetchSellerProducts());
}, [dispatch]);

const handleDeleteProduct = async(productId)=> {
  const token = localStorage.getItem("token")
  const response = await fetch(`https://completebazaar-backend.onrender.com/api/seller/products/${productId}`,{
    method: "DELETE",
    
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if(response.ok){
    dispatch(deleteProduct(productId))
  } else{
    const data = await response.json()
    console.log(data);
  }
}


  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Your Products</h1>
        <a
          href="/add-product"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span className="text-lg leading-none">＋</span>
          <span>Add Product</span>
        </a>
      </div>

      {isLoading && (
        <div className="text-gray-600">Loading products...</div>
      )}

      {!isLoading && error && (
        <div className="text-red-600">{String(error)}</div>
      )}

      {!isLoading && !error && products?.length === 0 && (
        <div className="text-gray-600">No products found.</div>
      )}

      {!isLoading && !error && products?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <SellerProduct product={product} key={product._id} handleDelete={handleDeleteProduct} />
          ))}
        </div>
      )}
    </div>
  )
}

export default sellerHome