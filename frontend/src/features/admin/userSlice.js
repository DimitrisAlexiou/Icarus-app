import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	ACTIVATE_USER,
	DEACTIVATE_USER,
	DELETE_USER,
	DELETE_USERS,
	GET_INSTRUCTORS,
	GET_STUDENTS,
	GET_USERS,
	UPDATE_USER,
	ADD_USER,
} from '../actions';
import userService from './services/userService';

const initialState = {
	users: [],
	user: null,
	students: [],
	instructors: [],
	isLoading: false,
	isEditingUser: false,
	editUserId: '',
	totalInstructors: 0,
	totalStudents: 0,
	totalUsers: 0,
};

export const getUsers = createAsyncThunk(GET_USERS, async (_, thunkAPI) => {
	try {
		return await userService.getUsers();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getStudents = createAsyncThunk(
	GET_STUDENTS,
	async (_, thunkAPI) => {
		try {
			return await userService.getStudents();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructors = createAsyncThunk(
	GET_INSTRUCTORS,
	async (_, thunkAPI) => {
		try {
			return await userService.getInstructors();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const addUser = createAsyncThunk(ADD_USER, async (user, thunkAPI) => {
	try {
		return await userService.addUser(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateUser = createAsyncThunk(
	UPDATE_USER,
	async ({ userId, data }, thunkAPI) => {
		try {
			return await userService.updateUser(userId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const activateUser = createAsyncThunk(
	ACTIVATE_USER,
	async (userId, thunkAPI) => {
		try {
			return await userService.activateUser(userId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deactivateUser = createAsyncThunk(
	DEACTIVATE_USER,
	async (userId, thunkAPI) => {
		try {
			return await userService.deactivateUser(userId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUser = createAsyncThunk(
	DELETE_USER,
	async (userId, thunkAPI) => {
		try {
			return await userService.deleteUser(userId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUsers = createAsyncThunk(
	DELETE_USERS,
	async (_, thunkAPI) => {
		try {
			return await userService.deleteUsers();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

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
			.addCase(getUsers.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.users = payload.users;
				state.totalUsers = payload.totalUsers;
			})
			.addCase(getUsers.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !== 'Seems like there are no users registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getStudents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudents.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.students = payload.students;
				state.totalStudents = payload.totalStudents;
			})
			.addCase(getStudents.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no students registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getInstructors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructors.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.instructors = payload.instructors;
				state.totalInstructors = payload.totalInstructors;
			})
			.addCase(getInstructors.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no instructors registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(addUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.users = [...state.users, payload.user];
			})
			.addCase(addUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedUserIndex = state.users.findIndex(
					(user) => user._id === payload.updatedUser._id
				);
				if (updatedUserIndex !== -1)
					state.users[updatedUserIndex] = payload.updatedUser;
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(activateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activateUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const activatedUserIndex = state.users.findIndex(
					(user) => user._id === payload.activatedUser._id
				);
				if (activatedUserIndex !== -1)
					state.users[activatedUserIndex].isActive = true;
			})
			.addCase(activateUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deactivateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deactivateUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const deactivatedUserIndex = state.users.findIndex(
					(user) => user._id === payload.deactivatedUser._id
				);
				if (deactivatedUserIndex !== -1)
					state.users[deactivatedUserIndex].isActive = false;
			})
			.addCase(deactivateUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.users = state.users.filter((user) => {
					return user._id !== payload.user;
				});
			})
			.addCase(deleteUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUsers.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
				state.users = [];
			})
			.addCase(deleteUsers.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetUsers, setEditUser } = userSlice.actions;
export default userSlice.reducer;
