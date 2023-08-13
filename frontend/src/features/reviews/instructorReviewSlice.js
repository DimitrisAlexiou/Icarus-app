import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { CREATE_INSTRUCTOR_REVIEW, GET_INSTRUCTOR_REVIEWS } from '../actions';
import instructorReviewService from './instructorReviewService';

const initialState = {
	instructorReviews: [],
	instructorReview: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createInstructorReview = createAsyncThunk(
	CREATE_INSTRUCTOR_REVIEW,
	async (data, thunkAPI) => {
		try {
			return await instructorReviewService.createInstructorReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructorReviews = createAsyncThunk(
	GET_INSTRUCTOR_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await instructorReviewService.getInstructorReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const instructorReviewSlice = createSlice({
	name: 'instructorReview',
	initialState,
	reducers: {
		resetInstructorReview: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createInstructorReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createInstructorReview.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createInstructorReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(getInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = payload;
			})
			.addCase(getInstructorReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			});
	},
});

export const { resetInstructorReview } = instructorReviewSlice.actions;
export default instructorReviewSlice.reducer;
