import { cartService } from "@/services/cart.service";
import { getToken } from "@/utils";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateCartAction = createAction("cart/update");
export const deleteCartAction = createAction("cart/delete");

export const getCartAction = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    if (getToken()) {
      try {
        const res = await cartService.getCart();
        return thunkApi.fulfillWithValue(res?.data);
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    open: false,
    loading: {},
  },
  reducers: {
    onSetCart: (state, { payload }) => {
      state.cart = payload;
    },
    onSetOpenCart: (state, { payload }) => {
      state.open = payload;
    },
    onSetLoading: (state, { payload: { id, loading } = {} } = {}) => {
      state.loading[id] = loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAction.fulfilled, (state, { payload }) => {
      state.cart = payload;
    });
  },
});
export default cartSlice.reducer;
export const { onSetCart, onSetOpenCart, onUpdateCart, onSetLoading } =
  cartSlice.actions;
