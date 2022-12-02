import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_REGISTER, API_URL_LOGIN } from '../../constants/config';
import {
	getUserFromLocalStorage,
	addUserToLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/redux/localStorage';
import userService from './userService';

const initialState = {
	user: getUserFromLocalStorage(),
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const registerUser = createAsyncThunk(API_URL_REGISTER, async (userData, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await userService.registerUser(userData, token);
		return await userService.registerUser(userData);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const loginUser = createAsyncThunk(API_URL_LOGIN, async (userData, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await userService.loginUser(userData, token);
		return await userService.loginUser(userData);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: (state) => initialState,
		logoutUser: (state) => {
			state.user = null;
			removeUserFromLocalStorage();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				const { user } = payload;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload.status === 'error';
				state.message = action.payload.message;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				const { user } = payload;
				state.user = user;
				addUserToLocalStorage(user);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload.status === 'error';
				state.message = action.payload.message;
			});
	},
});

export const { reset, logoutUser } = userSlice.actions;
export default userSlice.reducer;
