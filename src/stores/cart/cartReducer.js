import { getCart } from "@/utils";
import { createAction, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: () => ({
    cart: getCart(),
    open: false,
    loading: {},
  }),
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
  // extraReducers: (builder) => {
  //   builder.addCase(getCartAction.fulfilled, (state, { payload }) => {
  //     state.cart = payload;
  //   });
  // },
});
export default cartSlice.reducer;
export const {
  actions: { onSetCart, onSetOpenCart, onUpdateCart, onSetLoading },
  name,
  getInitialState,
} = cartSlice;
export const updateCartAction = createAction(`${name}/update`);
export const deleteCartAction = createAction(`${name}/delete`);
export const getCartAction = createAction(`${name}/get`);
export const clearCartAction = createAction(`${name}/clear`);
export const setCartAction = createAction(`${name}/set`)