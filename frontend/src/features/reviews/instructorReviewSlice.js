import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	CREATE_INSTRUCTOR_REVIEW,
	DELETE_INSTRUCTOR_REVIEW,
	DELETE_INSTRUCTOR_REVIEWS,
	DELETE_USER_INSTRUCTOR_REVIEWS,
	GET_INSTRUCTOR_REVIEW,
	GET_INSTRUCTOR_REVIEWS,
	GET_INSTRUCTOR_REVIEWS_TOTAL_NUMBER,
	GET_USER_INSTRUCTOR_REVIEWS,
	UPDATE_INSTRUCTOR_REVIEW,
} from '../actions';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import instructorReviewService from './services/instructorReviewService';

const initialState = {
	instructorReviews: [],
	instructorReview: {},
	isLoading: false,
	isEditingInstructorReview: false,
	editInstructorReviewId: '',
	totalInstructorReviews: 0,
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

export const updateInstructorReview = createAsyncThunk(
	UPDATE_INSTRUCTOR_REVIEW,
	async ({ reviewId, data }, thunkAPI) => {
		try {
			return await instructorReviewService.updateInstructorReview(
				reviewId,
				data
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getInstructorReview = createAsyncThunk(
	GET_INSTRUCTOR_REVIEW,
	async (reviewId, thunkAPI) => {
		try {
			return await instructorReviewService.getInstructorReview(reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteInstructorReview = createAsyncThunk(
	DELETE_INSTRUCTOR_REVIEW,
	async (reviewId, thunkAPI) => {
		try {
			return await instructorReviewService.deleteInstructorReview(reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserInstructorReviews = createAsyncThunk(
	GET_USER_INSTRUCTOR_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await instructorReviewService.getUserInstructorReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserInstructorReviews = createAsyncThunk(
	DELETE_USER_INSTRUCTOR_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await instructorReviewService.deleteUserInstructorReviews();
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

export const getInstructorReviewsTotalNumber = createAsyncThunk(
	GET_INSTRUCTOR_REVIEWS_TOTAL_NUMBER,
	async (_, thunkAPI) => {
		try {
			return await instructorReviewService.getInstructorReviewsTotalNumber();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteInstructorReviews = createAsyncThunk(
	DELETE_INSTRUCTOR_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await instructorReviewService.deleteInstructorReviews();
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
		setEditInstructorReview: (state, { payload }) => {
			return { ...state, isEditingInstructorReview: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createInstructorReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createInstructorReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.instructorReviews = [...state.instructorReviews, payload.review];
			})
			.addCase(createInstructorReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateInstructorReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateInstructorReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedInstructorReviewIndex = state.instructorReviews.findIndex(
					(instructorReview) =>
						instructorReview._id === payload.updatedReview._id
				);
				if (updatedInstructorReviewIndex !== -1)
					state.instructorReviews[updatedInstructorReviewIndex] =
						payload.updatedReview;
			})
			.addCase(updateInstructorReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getInstructorReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.instructorReview = payload;
			})
			.addCase(getInstructorReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the Instructor review that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteInstructorReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteInstructorReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.instructorReviews = state.instructorReviews.filter(
					(instructorReview) => {
						return instructorReview._id !== payload.review;
					}
				);
			})
			.addCase(deleteInstructorReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getUserInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserInstructorReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.instructorReviews = payload;
			})
			.addCase(getUserInstructorReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					`Seems like you haven't submitted any Instructor reviews yet.`
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteUserInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserInstructorReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.instructorReviews = [];
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteUserInstructorReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getInstructorReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.instructorReviews = payload.reviews;
				state.totalInstructorReviews = payload.totalReviews;
			})
			.addCase(getInstructorReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no Instructor reviews registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getInstructorReviewsTotalNumber.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getInstructorReviewsTotalNumber.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.totalInstructorReviews = payload;
				}
			)
			.addCase(
				getInstructorReviewsTotalNumber.rejected,
				(state, { payload }) => {
					state.isLoading = false;
					displayErrorNotification(payload);
				}
			)
			.addCase(deleteInstructorReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteInstructorReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteInstructorReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetInstructorReview, setEditInstructorReview } =
	instructorReviewSlice.actions;
export default instructorReviewSlice.reducer;
