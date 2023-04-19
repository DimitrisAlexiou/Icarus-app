import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import teachingReviewService from './teachingReviewService';

const initialState = {
	teachingReviews: [],
	teachingReview: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createTeachingReview = createAsyncThunk(
	'api/review/teaching/:teachingId',
	async ({ data, teachingId }, thunkAPI) => {
		try {
			return await teachingReviewService.createTeachingReview(data, teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserTeachingReviews = createAsyncThunk(
	'/api/review/teaching',
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReviews = createAsyncThunk(
	'/api/review/teaching/all',
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingReviewSlice = createSlice({
	name: 'teachingReview',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTeachingReview.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createTeachingReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserTeachingReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = action.payload;
			})
			.addCase(getUserTeachingReviews.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = action.payload;
			})
			.addCase(getTeachingReviews.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = teachingReviewSlice.actions;
export default teachingReviewSlice.reducer;
