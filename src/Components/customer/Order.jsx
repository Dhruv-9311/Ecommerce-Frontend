const Order = ({order, products}) => {
  const productsInOrder = (order?.products || [])
    .map((item) => {
      // item can be an id or a populated product
      if (item && typeof item === 'object' && item._id) return item;
      return products?.find((p) => p._id === item);
    })
    .filter(Boolean);

  const orderDate = order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">Order Date: {orderDate}</p>
          <p className="font-semibold">Total Amount: ₹{order?.totalAmount ?? 0}</p>
        </div>
        
        <div className="space-y-3">
          {productsInOrder.map((product) => (
            <div key={product._id} className="flex items-center space-x-3">
              <img 
                src={`https://ecommerce-backend-6z5x.vercel.app/${product.imageUrl}`}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order;