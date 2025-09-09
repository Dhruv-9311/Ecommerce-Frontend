import React from 'react'

const CartProduct = ({ product,handleRemoveFromCart }) => {
    

  
  

  
  return (
    <div className="group flex items-center gap-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-3">
      <div className="flex-none w-24 h-24 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
        {product.imageUrl && (
          <img
            src={`https://completebazaar-backend.onrender.com/${product.imageUrl}`}
            alt={product?.name}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-medium text-gray-900 truncate">{product?.name}</h2>
            {product?.brand && (
              <div className="text-xs text-gray-600 truncate">{product.brand}</div>
            )}
          </div>
          <span className="text-base font-semibold text-gray-900 shrink-0">₹{product?.price}</span>
        </div>
      </div>
      <div className="flex-none">
        <button
          type="button"
          onClick={() =>handleRemoveFromCart(product._id)}
          className="text-sm px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
    
  )
}

export default CartProduct