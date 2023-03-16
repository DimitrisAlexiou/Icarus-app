import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import reviewService from './reviewService';

const initialState = {
	review: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineReview = createAsyncThunk(
	API_URL_ADMIN + '/defineReview',
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await reviewService.defineReview(data, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getReview = createAsyncThunk(API_URL_ADMIN + '/getReview', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await reviewService.getReview(token);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteReview = createAsyncThunk(
	API_URL_ADMIN + '/deleteReview',
	async (reviewId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await reviewService.deleteReview(reviewId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		resetReview: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineReview.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Review configuration defined successfully!',
					icon: 'success',
				});
				state.review = action.payload;
			})
			.addCase(defineReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReview.fulfilled, (state, action) => {
				state.isLoading = false;
				state.review = action.payload;
			})
			.addCase(getReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteReview.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteReview.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;
