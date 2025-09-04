import React from 'react'
import CartProduct from './CartProduct'

const CartItems = ({ productsInCart, handleRemoveFromCart }) => {
  if (!productsInCart || productsInCart.length === 0) {
    return <div className="text-gray-600">No products found in your cart.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {productsInCart.map((product) => (
        <CartProduct product={product} key={product._id} handleRemoveFromCart={handleRemoveFromCart} />
      ))}
    </div>
  )
}

export default CartItems