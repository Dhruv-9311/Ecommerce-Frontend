import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}

export const fetchSellerProducts = createAsyncThunk("seller/fetchProducts", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://ecommerce-backend-6z5x.vercel.app/api/seller/products", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.message || "Failed to fetch products");
  }
  return body.products;
});

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
      addProduct: (state, action) => {
        state.products.push(action.payload);
      },
      deleteProduct: (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSellerProducts.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchSellerProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = action.payload;
        })
        .addCase(fetchSellerProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "Failed to fetch products";
        });
    },
});

export const { addProduct, deleteProduct } = sellerSlice.actions;
export default sellerSlice.reducer;
