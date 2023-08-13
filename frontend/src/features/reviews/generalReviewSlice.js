import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { CREATE_GENERAL_REVIEW, GET_GENERAL_REVIEWS } from '../actions';
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
	CREATE_GENERAL_REVIEW,
	async (data, thunkAPI) => {
		try {
			return await generalReviewService.createGeneralReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGeneralReviews = createAsyncThunk(GET_GENERAL_REVIEWS, async (_, thunkAPI) => {
	try {
		return await generalReviewService.getGeneralReviews();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

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
			.addCase(createGeneralReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			})
			.addCase(getGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGeneralReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.teachingReviews = payload;
			})
			.addCase(getGeneralReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				state.message = payload;
			});
	},
});

export const { resetGeneralReview } = generalReviewSlice.actions;
export default generalReviewSlice.reducer;
