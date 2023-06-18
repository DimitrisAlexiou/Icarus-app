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
	isLoading: false,
	isEditingUser: false,
	editUserId: '',
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

export const updateUser = createAsyncThunk(
	API_URL_USERS + '/update',
	async ({ userId, data }, thunkAPI) => {
		try {
			return await userService.updateUser(userId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateUser = createAsyncThunk(
	API_URL_USERS + '/activate',
	async (userId, thunkAPI) => {
		try {
			await userService.activateUser(userId);
			return thunkAPI.dispatch(getUsers());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deActivateUser = createAsyncThunk(
	API_URL_USERS + '/deactivate',
	async (userId, thunkAPI) => {
		try {
			await userService.deActivateUser(userId);
			return thunkAPI.dispatch(getUsers());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUser = createAsyncThunk(API_URL_USERS + '/delete', async (userId, thunkAPI) => {
	try {
		await userService.deleteUser(userId);
		return thunkAPI.dispatch(getUsers());
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
		resetUsers: () => initialState,
		setEditUser: (state, { payload }) => {
			return { ...state, isEditingUser: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(getStudents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.students = action.payload;
			})
			.addCase(getStudents.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(getInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.instructors = action.payload;
			})
			.addCase(getInstructors.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users.map((user) =>
					user._id === action.payload._id ? action.payload : user
				);
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(activateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users.map((user) =>
					user._id === action.payload._id ? action.payload : user
				);
			})
			.addCase(activateUser.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
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
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: 'User did not deleted!',
					// text: action.payload.message,
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
			.addCase(deleteUsers.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: 'Users did not deleted!',
					// text: action.payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetUsers, setEditUser } = userSlice.actions;
export default userSlice.reducer;
