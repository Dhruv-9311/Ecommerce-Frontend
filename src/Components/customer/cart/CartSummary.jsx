import React from 'react'
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../store/slices/customerSlice';
const CartSummary = ({ productsInCart }) => {
  const dispatch = useDispatch();
  const totalItems = productsInCart?.length || 0;
  const subtotal = (productsInCart || []).reduce((acc, product) => acc + (product.price || 0), 0);
  const gst = +(subtotal * 0.18).toFixed(2);
  const shipping = totalItems === 0 ? 0 : (subtotal >= 1000 ? 0 : 99);
  const grandTotal = +(subtotal + gst + shipping).toFixed(2);
  const handleOrder = () => {
    dispatch(createOrder(productsInCart));
  }
  return (
    <aside className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Cart Summary</h2>
      <div className="space-y-1 text-sm text-gray-700 mb-4">
        <div className="flex justify-between"><span>Items</span><span>{totalItems}</span></div>
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between"><span>GST (18%)</span><span>₹{gst}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
        <hr className="my-2" />
        <div className="flex justify-between font-medium text-gray-900"><span>Total</span><span>₹{grandTotal}</span></div>
      </div>
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors" onClick={handleOrder} disabled={totalItems === 0}>Order</button>
    </aside>
  )
}

export default CartSummary