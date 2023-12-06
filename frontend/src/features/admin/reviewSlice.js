import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	DEFINE_REVIEW,
	DELETE_REVIEW,
	GET_REVIEW,
	UPDATE_REVIEW,
} from '../actions';
import reviewService from './services/reviewService';

const initialState = {
	review: null,
	isLoading: false,
	isEditingReview: false,
	editReviewId: '',
};

export const defineReview = createAsyncThunk(
	DEFINE_REVIEW,
	async (data, thunkAPI) => {
		try {
			return await reviewService.defineReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getReview = createAsyncThunk(GET_REVIEW, async (_, thunkAPI) => {
	try {
		return await reviewService.getReview();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateReview = createAsyncThunk(
	UPDATE_REVIEW,
	async ({ reviewId, data }, thunkAPI) => {
		try {
			return await reviewService.updateReview(reviewId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteReview = createAsyncThunk(
	DELETE_REVIEW,
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
			.addCase(defineReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.review = payload.review;
			})
			.addCase(defineReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('endDate' && 'startDate'))
					displayErrorNotification(
						'Review end date must be greater than review starting date.'
					);
				else displayErrorNotification(payload);
			})
			.addCase(getReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.review = payload;
			})
			.addCase(getReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
						'Seems like there is no review statement configuration defined for this semester.' &&
					payload !==
						'Seems like there is no defined semester for current period. Define a semester first in order to define review statement configuration.'
				) {
					displayErrorNotification(payload);
				}
			})
			.addCase(updateReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.review = payload.updatedReview;
			})
			.addCase(updateReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('endDate' && 'startDate'))
					displayErrorNotification(
						'Review end date must be greater than review starting date.'
					);
				else displayErrorNotification(payload);
			})
			.addCase(deleteReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.review = null;
			})
			.addCase(deleteReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetReview, setEditReview } = reviewSlice.actions;
export default reviewSlice.reducer;
