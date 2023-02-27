import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { delayDuration } from "@/utils";
import handleError from "@/utils/handleError";
import {
  clearPassword,
  clearToken,
  clearUser,
  getToken,
  getUser,
  setToken,
  setUser,
} from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = await authService.login(data);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      return thunkApi.fulfillWithValue(user?.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginByCodeAction = createAsyncThunk(
  "auth/login-by-code",
  async (code, thunkApi) => {
    try {
      const res = await authService.loginByCode(code);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      return thunkApi.fulfillWithValue(user?.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const changePasswordByCodeAction = createAsyncThunk(
  "auth/change-password-by-code",
  async (data, thunkApi) => {
    try {
      const res = await userService.changePasswordByCode(data);
      setToken(res?.data);
      const user = await userService.getProfile();
      setUser(user?.data);
      return thunkApi.fulfillWithValue(user.data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    clearToken();
    clearUser();
    clearPassword();
    thunkApi.dispatch(onLogout());
  }
);

export const setUserAction = createAsyncThunk(
  "auth/setUser",
  async (data, thunkApi) => {
    setUser(data); //====localStorage
    thunkApi.dispatch(onSetUser(data));
  }
);

export const getUserAction = createAsyncThunk(
  "auth/getUser",
  async (_, thunkApi) => {
    if (getToken()) {
      try {
        const user = await userService.getProfile();
        setUser(user?.data);
        thunkApi.dispatch(onSetUser(user?.data));
      } catch (error) {
        handleError(error);
      }
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
export const { onLogout, onSetUser } = authSlice.actions;
