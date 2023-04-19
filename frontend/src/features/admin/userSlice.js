import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_USERS } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import userService from './userService';

const initialState = {
	users: [],
	user: null,
	students: [],
	instructors: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getUsers = createAsyncThunk(API_URL_USERS, async (_, thunkAPI) => {
	try {
		return await userService.getUsers();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getStudents = createAsyncThunk(API_URL_USERS + '/students', async (_, thunkAPI) => {
	try {
		return await userService.getStudents();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getInstructors = createAsyncThunk(
	API_URL_USERS + '/instructors',
	async (_, thunkAPI) => {
		try {
			return await userService.getInstructors();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const addUser = createAsyncThunk(`${API_URL_USERS}/add`, async (data, thunkAPI) => {
	try {
		return await userService.addUser(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateUser = createAsyncThunk(
	`${API_URL_USERS}/:userId/edit`,
	async (userId, data, thunkAPI) => {
		try {
			return await userService.updateUser(userId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateUser = createAsyncThunk(
	`${API_URL_USERS}/:userId/activate`,
	async (userId, data, thunkAPI) => {
		try {
			return await userService.activateUser(userId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUser = createAsyncThunk(`${API_URL_USERS}/:userId`, async (userId, thunkAPI) => {
	try {
		return await userService.deleteUser(userId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteUsers = createAsyncThunk(API_URL_USERS + '/delete_all', async (_, thunkAPI) => {
	try {
		return await userService.deleteUsers();
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
			.addCase(getStudents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.students = action.payload;
			})
			.addCase(getStudents.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.instructors = action.payload;
			})
			.addCase(getInstructors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(addUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addUser.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'User created!',
					icon: 'success',
				});
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
			.addCase(activateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.users.map((user) =>
					user._id === action.payload._id ? action.payload : user
				);
			})
			.addCase(activateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'User deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				Toast.fire({
					title: 'Something went wrong!',
					text: 'User did not deleted!',
					icon: 'error',
				});
			})
			.addCase(deleteUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUsers.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Users deleted!',
					icon: 'success',
				});
			})
			.addCase(deleteUsers.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				Toast.fire({
					title: 'Something went wrong!',
					text: 'Users did not deleted!',
					icon: 'error',
				});
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
