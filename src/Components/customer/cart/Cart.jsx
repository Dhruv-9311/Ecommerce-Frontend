import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItems from './CartItems'
import { fetchCustomerProducts, removeFromCart } from '../../../store/slices/customerSlice'
import CartSummary from './CartSummary'

const Cart = () => {

  const {products, cart, isLoading, error} = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(fetchCustomerProducts());
}, [dispatch]);

const handleRemoveFromCart = (productId) => {
  dispatch(removeFromCart(productId));
}

const productsInCart = products.filter(product => cart.includes(product._id))


  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
      </div>

      {isLoading && (
        <div className="text-gray-600">Loading products...</div>
      )}

      {!isLoading && error && (
        <div className="text-red-600">{String(error)}</div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3">
            <CartItems productsInCart={productsInCart} handleRemoveFromCart={handleRemoveFromCart} />
          </div>
          <div className="lg:col-span-1">
            <CartSummary productsInCart={productsInCart} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart