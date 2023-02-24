import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { delayDuration } from "@/utils";
import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    const startTime = Date.now();
    try {
      const res = await authService.login(data);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      await delayDuration(startTime, 1000);
      return thunkApi.fulfillWithValue(user.data);
    } catch (error) {
      await delayDuration(startTime, 1000);
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const loginByCodeAction = createAsyncThunk(
  "auth/login-by-code",
  async (code, thunkApi) => {
    const startTime = Date.now();
    try {
      const res = await authService.loginByCode(code);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      await delayDuration(startTime, 1000);
      return thunkApi.fulfillWithValue(user.data);
    } catch (error) {
      await delayDuration(startTime, 1000);
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);
export const changePasswordByCodeAction = createAsyncThunk(
  "auth/change-password-by-code",
  async (data, thunkApi) => {
    const startTime = Date.now();
    try {
      const res = await userService.changePasswordByCode(data);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      await delayDuration(startTime, 1000);
      return thunkApi.fulfillWithValue(user.data);
    } catch (error) {
      await delayDuration(startTime, 1000);
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      clearToken();
      clearUser();
      thunkApi.dispatch(onLogout());
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
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
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = "success";
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(loginByCodeAction.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(
      changePasswordByCodeAction.fulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});
export default authSlice.reducer;
export const { onLogout } = authSlice.actions;
