import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
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
	'api/review/instructor',
	async (instructorReviewData, thunkAPI) => {
		try {
			return await instructorReviewService.createInstructorReview(instructorReviewData);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructorReviews = createAsyncThunk(
	'/api/review/instructor/all',
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
		reset: (state) => initialState,
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
			.addCase(createInstructorReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = action.payload;
			})
			.addCase(getInstructorReviews.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = instructorReviewSlice.actions;
export default instructorReviewSlice.reducer;
