import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_TEACHING } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import teachingService from './teachingService';

const initialState = {
	teachings: [],
	teaching: {},
	totalTeachings: 0,
	numOfPages: 1,
	page: 1,
	isLoading: false,
	isEditingTeaching: false,
	editTeachingId: '',
};

export const updateTeaching = createAsyncThunk(
	API_URL_TEACHING + '/update',
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await teachingService.updateTeaching(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeaching = createAsyncThunk(
	API_URL_TEACHING + '/get',
	async (teachingId, thunkAPI) => {
		try {
			return await teachingService.getTeaching(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeaching = createAsyncThunk(
	API_URL_TEACHING + '/delete',
	async (teachingId, thunkAPI) => {
		try {
			await teachingService.deleteTeaching(teachingId);
			return thunkAPI.dispatch(getTeachings());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachings = createAsyncThunk(API_URL_TEACHING + '/get_all', async (_, thunkAPI) => {
	try {
		const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().teachings;
		let url = `?page=${page}`;
		// let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
		return await teachingService.getTeachings(url);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteTeachings = createAsyncThunk(
	API_URL_TEACHING + '/delete_all',
	async (_, thunkAPI) => {
		try {
			return await teachingService.deleteTeachings();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingSlice = createSlice({
	name: 'teaching',
	initialState,
	reducers: {
		resetTeachings: () => initialState,
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		setEditTeaching: (state, { payload }) => {
			return { ...state, isEditingTeaching: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTeaching.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Teaching updated!',
					icon: 'success',
				});
				state.teachings.map((teaching) =>
					teaching._id === action.payload._id ? action.payload : teaching
				);
			})
			.addCase(updateTeaching.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(getTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeaching.fulfilled, (state, action) => {
				state.isLoading = false;
				state.teaching = action.payload;
			})
			.addCase(getTeaching.rejected, (state, action) => {
				state.isLoading = false;
				if (
					action.payload.message !==
					'Seems like the teaching that you are trying to view does not exist.'
				)
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload.message,
						icon: 'error',
					});
			})
			.addCase(deleteTeaching.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeaching.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
				// state.filter((teaching) => teaching._id !== action.payload);
				// state.teachings = [
				// 	...state.teachings,
				// 	state.teachings.filter((teaching) => teaching._id !== action.payload._id),
				// ];
			})
			.addCase(deleteTeaching.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(getTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachings.fulfilled, (state, action) => {
				state.isLoading = false;
				state.teachings = action.payload;
				state.numOfPages = action.payload.numOfPages;
				state.totalTeachings = action.payload.totalTeachings;
			})
			.addCase(getTeachings.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(deleteTeachings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachings.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteTeachings.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetTeachings, changePage, handleChange, setEditTeaching } = teachingSlice.actions;
export default teachingSlice.reducer;
