import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_REGISTER, API_URL_LOGIN, API_URL_LOGOUT } from '../../constants/config';
import {
	getUserFromLocalStorage,
	addUserToLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/redux/localStorage';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	// user: getUserFromLocalStorage(),
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const register = createAsyncThunk(API_URL_REGISTER, async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const login = createAsyncThunk(API_URL_LOGIN, async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const logout = createAsyncThunk(API_URL_LOGOUT, async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				// addUserToLocalStorage(state.user);
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				// addUserToLocalStorage(state.user);
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				removeUserFromLocalStorage();
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
