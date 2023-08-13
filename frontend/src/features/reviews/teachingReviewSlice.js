import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	CREATE_TEACHING_REVIEW,
	GET_TEACHING_REVIEWS,
	GET_USER_TEACHING_REVIEWS,
} from '../actions';
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
	CREATE_TEACHING_REVIEW,
	async ({ data, teachingId }, thunkAPI) => {
		try {
			return await teachingReviewService.createTeachingReview(data, teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserTeachingReviews = createAsyncThunk(
	GET_USER_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReviews = createAsyncThunk(GET_TEACHING_REVIEWS, async (_, thunkAPI) => {
	try {
		return await teachingReviewService.getTeachingReviews();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const teachingReviewSlice = createSlice({
	name: 'teachingReview',
	initialState,
	reducers: {
		resetTeachingReview: () => initialState,
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
			.addCase(createTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(getUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = payload;
			})
			.addCase(getUserTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(getTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = payload;
			})
			.addCase(getTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			});
	},
});

export const { resetTeachingReview } = teachingReviewSlice.actions;
export default teachingReviewSlice.reducer;
