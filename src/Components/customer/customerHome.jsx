import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import CustomerProduct from './CustomerProduct'

import { fetchPublicProducts, fetchCustomerProducts, addToCart, removeFromCart } from '../../store/slices/customerSlice'

const customerHome = () => {

  const {products, cart, isLoading, error} = useSelector((state) => state.customer);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isLoggedIn) {
      // If logged in, fetch full customer data (products + cart + orders)
      dispatch(fetchCustomerProducts());
    } else {
      // If not logged in, fetch only public products
      dispatch(fetchPublicProducts());
    }
  }, [dispatch, isLoggedIn]);

const handleAddToCart = (productId) => {
  if (!isLoggedIn) {
    alert("Please log in to add items to cart");
    return;
  }
  dispatch(addToCart(productId));
}

const handleRemoveFromCart = (productId) => {
  if (!isLoggedIn) {
    alert("Please log in to manage your cart");
    return;
  }
  dispatch(removeFromCart(productId));
}

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Browse Products</h1>
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
            <CustomerProduct product={product} cart={cart} key={product._id} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
          ))}
        </div>
      )}
    </div>
  )
}

export default customerHome