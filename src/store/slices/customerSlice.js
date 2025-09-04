import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    cart:[],
    orders:[],
    isLoading: false,
    error: null,
}

export const fetchCustomerProducts = createAsyncThunk("customer/fetchCustomerData", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://ecommerce-backend-6z5x.vercel.app/api/customer/data", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.message || "Failed to fetch products");
  }
  return body;
});

export const addToCart = createAsyncThunk("customer/addToCart", async (productId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://ecommerce-backend-6z5x.vercel.app/api/customer/cart/${productId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.message || "Failed to add to cart");
  }
  return body;
})

export const removeFromCart = createAsyncThunk("customer/removeFromCart", async (productId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://ecommerce-backend-6z5x.vercel.app/api/customer/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.message || "Failed to remove from cart");
  }
  return body;
})

export const createOrder = createAsyncThunk("customer/createOrder", async (order) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://ecommerce-backend-6z5x.vercel.app/api/customer/order`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.message || "Failed to create order");
  }
  return body;
})
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCustomerProducts.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchCustomerProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          const {products,cart,orders} = action.payload;
          state.products = products;
          state.cart = cart;
          state.orders = orders;
        })
        .addCase(fetchCustomerProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "Failed to fetch products";
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
          state.cart = action.payload
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
          state.cart = action.payload
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
          state.orders.push(action.payload)
          state.cart = []
        })
    },
});

export default customerSlice.reducer;
