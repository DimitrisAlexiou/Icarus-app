import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getUserFromLocalStorage,
	addUserToLocalStorage,
	removeUserFromLocalStorage,
	getLoginFailedAttemptsFromLocalStorage,
	getIsAccountLockedFromLocalStorage,
	setLoginFailedAttemptsToLocalStorage,
	setIsAccountLockedToLocalStorage,
	getLastAttemptedUsernameFromLocalStorage,
	setLastAttemptedUsernameToLocalStorage,
} from '../../utils/localStorage';
import { extractErrorMessage } from '../../utils/errorMessage';
import { resetCalendar } from '../calendar/eventSlice';
import { resetCourses } from '../courses/courseSlice';
import { resetNotes } from '../notes/noteSlice';
import { resetGeneralReview } from '../reviews/generalReviewSlice';
import { resetInstructorReview } from '../reviews/instructorReviewSlice';
import { resetTeachingReview } from '../reviews/teachingReviewSlice';
import {
	CHANGE_PASSWORD,
	FORGOT_PASSWORD,
	GET_PROFILE,
	LOGIN,
	LOGOUT,
	REGISTER,
	RESET,
	UPDATE_PROFILE,
} from '../actions';
import { Toast } from '../../constants/sweetAlertNotification';
import authService from './authService';

const initialState = {
	user: getUserFromLocalStorage(),
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
	loginFailedAttempts: getLoginFailedAttemptsFromLocalStorage(),
	isAccountLocked: getIsAccountLockedFromLocalStorage(),
	lastAttemptedUsername: getLastAttemptedUsernameFromLocalStorage(),
};

export const register = createAsyncThunk(REGISTER, async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
	try {
		// return await authService.login(user);
		const state = thunkAPI.getState();
		const { lastAttemptedUsername } = state.auth;

		if (lastAttemptedUsername !== user.username) {
			thunkAPI.dispatch(
				updateLoginStatus({
					loginFailedAttempts: 0,
					isAccountLocked: false,
					lastAttemptedUsername: user.username,
				})
			);
			setLoginFailedAttemptsToLocalStorage(0);
			setIsAccountLockedToLocalStorage(false);
			setLastAttemptedUsernameToLocalStorage(user.username);
		}

		const response = await authService.login(user);

		if (response) {
			thunkAPI.dispatch(
				updateLoginStatus({
					loginFailedAttempts: 0,
					isAccountLocked: false,
					lastAttemptedUsername: null,
				})
			);
			setLoginFailedAttemptsToLocalStorage(0);
			setIsAccountLockedToLocalStorage(false);
			setLastAttemptedUsernameToLocalStorage(null);
			return response;
		}
	} catch (error) {
		if (
			error.response.status === 400 &&
			error.response.message ===
				'Account is deactivated due to three login failed attempts, please contact the admin.'
		) {
			thunkAPI.dispatch(
				updateLoginStatus({
					loginFailedAttempts: 3,
					isAccountLocked: true,
					lastAttemptedUsername: user.username,
				})
			);
			setLoginFailedAttemptsToLocalStorage(3);
			setIsAccountLockedToLocalStorage(true);
			setLastAttemptedUsernameToLocalStorage(user.username);
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		} else {
			const state = thunkAPI.getState();
			const { loginFailedAttempts } = state.auth;

			if (loginFailedAttempts + 1 === 3) {
				thunkAPI.dispatch(
					updateLoginStatus({
						loginFailedAttempts: 3,
						isAccountLocked: true,
						lastAttemptedUsername: user.username,
					})
				);
				setLoginFailedAttemptsToLocalStorage(3);
				setIsAccountLockedToLocalStorage(true);
				setLastAttemptedUsernameToLocalStorage(user.username);
			} else {
				thunkAPI.dispatch(
					updateLoginStatus({
						loginFailedAttempts: loginFailedAttempts + 1,
						isAccountLocked: false,
						lastAttemptedUsername: user.username,
					})
				);
				setLoginFailedAttemptsToLocalStorage(loginFailedAttempts + 1);
				setIsAccountLockedToLocalStorage(false);
				setLastAttemptedUsernameToLocalStorage(user.username);
			}
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
});

export const logout = createAsyncThunk(LOGOUT, async () => {
	await authService.logout();
});

export const forgotPassword = createAsyncThunk(FORGOT_PASSWORD, async (user, thunkAPI) => {
	try {
		return await authService.forgotPassword(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const changePassword = createAsyncThunk(CHANGE_PASSWORD, async (user, thunkAPI) => {
	try {
		return await authService.changePassword(user);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getProfile = createAsyncThunk(GET_PROFILE, async (_, thunkAPI) => {
	try {
		return await authService.getProfile();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateProfile = createAsyncThunk(
	UPDATE_PROFILE,
	async ({ userId, data }, thunkAPI) => {
		try {
			return await authService.updateProfile(userId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const clearStore = createAsyncThunk(RESET, async (thunkAPI) => {
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
		updateLoginStatus(state, { payload }) {
			state.loginFailedAttempts = payload.loginFailedAttempts;
			state.isAccountLocked = payload.isAccountLocked;
			state.lastAttemptedUsername = payload.lastAttemptedUsername;
		},
		resetLoginStatus(state) {
			state.loginFailedAttempts = 0;
			state.isAccountLocked = false;
			state.lastAttemptedUsername = null;
		},
		updateEnrolledCourses: (state, { payload }) => {
			state.user.user.student.enrolledCourses = payload;
			addUserToLocalStorage(state.user);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = payload;
				addUserToLocalStorage(payload);
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = payload;
				addUserToLocalStorage(payload);
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				removeUserFromLocalStorage();
			})
			.addCase(forgotPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotPassword.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				// state.user = payload;
				// addUserToLocalStorage(payload);
			})
			.addCase(forgotPassword.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePassword.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = payload;
				addUserToLocalStorage(payload);
			})
			.addCase(changePassword.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state) => {
				state.isLoading = false;
				state.user = getUserFromLocalStorage();
			})
			.addCase(getProfile.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfile.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.user.user = payload.updatedUser;
				addUserToLocalStorage(state.user);
			})
			.addCase(updateProfile.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { reset, updateLoginStatus, resetLoginStatus, updateEnrolledCourses } =
	authSlice.actions;
export default authSlice.reducer;
