import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import teachingReviewService from './teachingReviewService';

const initialState = {
	teachingReviews: [],
	teachingReview: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create Teaching Review for Course (User Teaching)
export const createTeachingReview = createAsyncThunk(
	'api/review/teaching/:teachingId',
	async ({ teachingReviewData, teachingId }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await teachingReviewService.createTeachingReview(
				teachingReviewData,
				teachingId,
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Get User Teaching Reviews
export const getUserTeachingReviews = createAsyncThunk(
	'/api/review/teaching',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await teachingReviewService.getUserTeachingReviews(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

// Get all Teaching Reviews
export const getTeachingReviews = createAsyncThunk(
	'/api/review/teaching/all',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await teachingReviewService.getTeachingReviews(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingReviewSlice = createSlice({
	name: 'teachingReview',
	initialState,
	reducers: {
		reset: (state) => initialState,
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
