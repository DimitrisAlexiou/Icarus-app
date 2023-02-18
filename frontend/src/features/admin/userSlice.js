import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_USERS } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import userService from './userService';

const initialState = {
	users: [],
	user: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getUsers = createAsyncThunk(API_URL_USERS, async (_, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await userService.getUsers(token);
		return await userService.getUsers();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const addUser = createAsyncThunk(`${API_URL_USERS}/add`, async (userData, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await userService.addUser(userData, token);
		return await userService.addUser(userData);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateUser = createAsyncThunk(
	`${API_URL_USERS}/:userId/edit`,
	async (userId, userData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await userService.updateUser(userId, userData, token);
			return await userService.updateUser(userId, userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateUser = createAsyncThunk(
	`${API_URL_USERS}/activate/:userId`,
	async (userId, userData, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			// return await userService.activateUser(userId, userData, token);
			return await userService.activateUser(userId, userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUser = createAsyncThunk(`${API_URL_USERS}/:userId`, async (userId, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		// return await userService.deleteUser(userId, token);
		return await userService.deleteUser(userId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addUser.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(addUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users.map((user) =>
					user._id === action.payload._id ? action.payload : user
				);
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
