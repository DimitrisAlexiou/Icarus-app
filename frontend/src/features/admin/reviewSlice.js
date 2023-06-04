import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import reviewService from './reviewService';

const initialState = {
	review: null,
	isLoading: false,
	isEditingReview: false,
	editReviewId: '',
};

export const defineReview = createAsyncThunk(
	API_URL_ADMIN + '/defineReview',
	async (data, thunkAPI) => {
		try {
			return await reviewService.defineReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getReview = createAsyncThunk(API_URL_ADMIN + '/getReview', async (_, thunkAPI) => {
	try {
		return await reviewService.getReview();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateReview = createAsyncThunk(
	API_URL_ADMIN + '/updateReview',
	async ({ reviewId, data }, thunkAPI) => {
		try {
			await reviewService.updateAssessment(reviewId, data);
			return thunkAPI.dispatch(getReview());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteReview = createAsyncThunk(
	API_URL_ADMIN + '/deleteReview',
	async (reviewId, thunkAPI) => {
		try {
			return await reviewService.deleteReview(reviewId);
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
		setEditReview: (state, { payload }) => {
			return { ...state, isEditingReview: true, ...payload };
		},
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
					text: 'Review configuration defined!',
					icon: 'success',
				});
				state.review = action.payload;
			})
			.addCase(defineReview.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
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
				if (action.payload !== 'Seems like there is no review statement period defined.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload,
						icon: 'error',
					});
			})
			.addCase(updateReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateReview.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Review configuration updated!',
					icon: 'success',
				});
				// state.review = action.payload;
			})
			.addCase(updateReview.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteReview.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload,
					icon: 'success',
				});
			})
			.addCase(deleteReview.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			});
	},
});

export const { resetReview, setEditReview } = reviewSlice.actions;
export default reviewSlice.reducer;
