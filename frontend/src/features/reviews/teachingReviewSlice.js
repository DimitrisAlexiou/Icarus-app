import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
	'api/review/teaching',
	async (teachingReviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await teachingReviewService.createTeachingReview(
				teachingReviewData,
				token,
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	},
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
			});
	},
});

export const { reset } = teachingReviewSlice.actions;
export default teachingReviewSlice.reducer;
