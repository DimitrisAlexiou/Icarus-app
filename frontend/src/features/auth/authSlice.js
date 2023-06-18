import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	API_URL_REGISTER,
	API_URL_LOGIN,
	API_URL_LOGOUT,
	API_URL_FORGOT_PASSWORD,
	API_URL_USER,
} from '../../constants/config';
import {
	getUserFromLocalStorage,
	addUserToLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/localStorage';
import { extractErrorMessage } from '../../utils/errorMessage';
import { resetCalendar } from '../calendar/eventSlice';
import { resetCourses } from '../courses/courseSlice';
import { resetNotes } from '../notes/noteSlice';
import { resetGeneralReview } from '../reviews/generalReviewSlice';
import { resetInstructorReview } from '../reviews/instructorReviewSlice';
import { resetTeachingReview } from '../reviews/teachingReviewSlice';
import authService from './authService';

const initialState = {
	user: getUserFromLocalStorage(),
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

export const forgotPassword = createAsyncThunk(API_URL_FORGOT_PASSWORD, async (user, thunkAPI) => {
	try {
		return await authService.forgotPassword(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const changePassword = createAsyncThunk(
	API_URL_USER + '/change-password',
	async (user, thunkAPI) => {
		try {
			return await authService.changePassword(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getProfile = createAsyncThunk(API_URL_USER, async (_, thunkAPI) => {
	try {
		return await authService.getProfile();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateProfile = createAsyncThunk(API_URL_USER + '/update', async (user, thunkAPI) => {
	try {
		return await authService.updateProfile(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const clearStore = createAsyncThunk(API_URL_USER + '/clearStore', async (thunkAPI) => {
	try {
		await thunkAPI.dispatch(resetCalendar());
		await thunkAPI.dispatch(resetCourses());
		await thunkAPI.dispatch(resetNotes());
		await thunkAPI.dispatch(resetInstructorReview());
		await thunkAPI.dispatch(resetGeneralReview());
		await thunkAPI.dispatch(resetTeachingReview());
		// thunkAPI.dispatch(reset());
		// thunkAPI.dispatch(reset());
		// thunkAPI.dispatch(reset());
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
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
				addUserToLocalStorage(state.user);
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
				addUserToLocalStorage(state.user);
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
			})
			.addCase(forgotPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// state.user = action.payload;
				// addUserToLocalStorage(state.user);
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				addUserToLocalStorage(state.user);
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const { user } = action.payload;
				state.auth.user = user;
				addUserToLocalStorage(user);
				// if (state.auth.user) {
				// 	console.log(state.auth.user);
				// 	state.auth.user = state.auth.user.map((user) =>
				// 		user._id === action.payload._id ? action.payload : user
				// 	);
				// }
				// return { ...state };
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
