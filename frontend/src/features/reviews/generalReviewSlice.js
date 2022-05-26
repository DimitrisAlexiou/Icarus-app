import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import generalReviewService from './generalReviewService';

const initialState = {
	generalReviews: [],
	generalReview: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create General Review
export const createGeneralReview = createAsyncThunk(
	'api/review/general',
	async (generalReviewData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await generalReviewService.createGeneralReview(
				generalReviewData,
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

// Get All General Reviews
export const getGeneralReviews = createAsyncThunk(
	'/api/review/general/all',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await generalReviewService.getGeneralReviews(token);
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

export const generalReviewSlice = createSlice({
	name: 'generalReview',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGeneralReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGeneralReview.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createGeneralReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGeneralReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = action.payload;
			})
			.addCase(getGeneralReviews.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = generalReviewSlice.actions;
export default generalReviewSlice.reducer;
