import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { getUser, setToken, setUser } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginThunkAction = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = await authService.login(data);
      if (res?.data) {
        setToken(res?.data);
        const user = await userService.getProfile();
        if (user?.data) {
          setUser(user?.data);
          thunkApi.dispatch(onSetUser(user?.data));
        }
      }
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  initialState: {
    user: getUser(),
    status: "idle",
  },
  name: "auth",
  reducers: {
    onLogout: (state) => {
      state.user = null;
    },
    onSetUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  // extraReducers: (builder) => {},
});
export default authSlice.reducer;
export const { onLogout, onSetUser } = authSlice.actions;
