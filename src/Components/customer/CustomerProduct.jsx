import React from 'react'

const CustomerProduct = ({ product, cart = [], handleAddToCart, handleRemoveFromCart }) => {

  const isInCart = cart.includes(product._id);
  

  
  return (
    <div className="group h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {product.imageUrl && (
        <div className="h-56 bg-gray-50 flex items-center justify-center">
          <img
            src={`https://completebazaar-backend.onrender.com/${product.imageUrl}`}
            alt={product?.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">{product?.name}</h2>
            {product?.brand && (
              <div className="text-xs text-gray-600">{product.brand}</div>
            )}
          </div>
          {product?.rating !== undefined && (
            <span className="shrink-0 inline-flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
              <span>⭐</span>
              <span className="font-medium">{product?.rating}</span>
            </span>
          )}
        </div>

        {product?.category && (
          <span className="w-fit text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
        )}

        {product?.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">₹{product?.price}</span>
          <div className="flex items-center gap-2">
            {isInCart ? (
              <button
                type="button"
                onClick={() =>handleRemoveFromCart(product._id)}
                className="text-sm px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                Remove From Cart
              </button>
            ) : (
            <button
              type="button"
              onClick={() =>handleAddToCart(product._id)}
              className="text-sm px-3 py-1.5 rounded-md border border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              Add To Cart
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CustomerProduct