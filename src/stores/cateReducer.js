import { productService } from "@/services/product.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategoryAction = createAsyncThunk(
  "categoryList/get",
  async (_, thunkApi) => {
    try {
      const res = await productService.getCategory();
      thunkApi.dispatch(onSetCategoryList(res?.data));
    } catch (error) {
      throw error;
    }
  }
);

const cateSlice = createSlice({
  name: "categoryList",
  initialState: {
    categoryList: [],
  },

  reducers: {
    onSetCategoryList: (state, { payload }) => {
      state.categoryList = payload;
    },
  },
});
export default cateSlice.reducer;
export const { onSetCategoryList } = cateSlice.actions;
