import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import generalReviewService from './generalReviewService';

const initialState = {
	generalReviews: [],
	generalReview: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const createGeneralReview = createAsyncThunk(
	'api/review/general',
	async (data, thunkAPI) => {
		try {
			return await generalReviewService.createGeneralReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGeneralReviews = createAsyncThunk(
	'/api/review/general/all',
	async (_, thunkAPI) => {
		try {
			return await generalReviewService.getGeneralReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const generalReviewSlice = createSlice({
	name: 'generalReview',
	initialState,
	reducers: {
		resetGeneralReview: () => initialState,
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

export const { resetGeneralReview } = generalReviewSlice.actions;
export default generalReviewSlice.reducer;
