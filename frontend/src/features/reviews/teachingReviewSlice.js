import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	CREATE_TEACHING_REVIEW,
	UPDATE_TEACHING_REVIEW,
	GET_TEACHING_REVIEW,
	DELETE_TEACHING_REVIEW,
	GET_USER_TEACHING_REVIEWS,
	DELETE_USER_TEACHING_REVIEWS,
	GET_TEACHING_REVIEWS,
	DELETE_TEACHING_REVIEWS,
	GET_TEACHING_REVIEWS_TOTAL_NUMBER,
} from '../actions';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import teachingReviewService from './services/teachingReviewService';

const initialState = {
	teachingReviews: [],
	teachingReview: {},
	isLoading: false,
	isEditingTeachingReview: false,
	editTeachingReviewId: '',
	totalTeachingReviews: 0,
};

export const createTeachingReview = createAsyncThunk(
	CREATE_TEACHING_REVIEW,
	async (data, thunkAPI) => {
		try {
			return await teachingReviewService.createTeachingReview(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateTeachingReview = createAsyncThunk(
	UPDATE_TEACHING_REVIEW,
	async ({ reviewId, data }, thunkAPI) => {
		try {
			return await teachingReviewService.updateTeachingReview(reviewId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReview = createAsyncThunk(
	GET_TEACHING_REVIEW,
	async (reviewId, thunkAPI) => {
		try {
			return await teachingReviewService.getTeachingReview(reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeachingReview = createAsyncThunk(
	DELETE_TEACHING_REVIEW,
	async (reviewId, thunkAPI) => {
		try {
			return await teachingReviewService.deleteTeachingReview(reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserTeachingReviews = createAsyncThunk(
	GET_USER_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserTeachingReviews = createAsyncThunk(
	DELETE_USER_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.deleteUserTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReviews = createAsyncThunk(
	GET_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getTeachingReviewsTotalNumber = createAsyncThunk(
	GET_TEACHING_REVIEWS_TOTAL_NUMBER,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.getTeachingReviewsTotalNumber();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteTeachingReviews = createAsyncThunk(
	DELETE_TEACHING_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await teachingReviewService.deleteTeachingReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const teachingReviewSlice = createSlice({
	name: 'teachingReview',
	initialState,
	reducers: {
		resetTeachingReview: () => initialState,
		setEditTeachingReview: (state, { payload }) => {
			return { ...state, isEditingTeachingReview: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.teachingReviews = [...state.teachingReviews, payload.review];
			})
			.addCase(createTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedTeachingReviewIndex = state.teachingReviews.findIndex(
					(teachingReview) => teachingReview._id === payload.updatedReview._id
				);
				if (updatedTeachingReviewIndex !== -1)
					state.teachingReviews[updatedTeachingReviewIndex] =
						payload.updatedReview;
			})
			.addCase(updateTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReview = payload;
			})
			.addCase(getTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the Teaching review that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteTeachingReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachingReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.teachingReviews = state.teachingReviews.filter(
					(teachingReview) => {
						return teachingReview._id !== payload.review;
					}
				);
			})
			.addCase(deleteTeachingReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReviews = payload;
			})
			.addCase(getUserTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					`Seems like you haven't submitted any Teaching reviews yet.`
				)
					displayErrorNotification(payload);
			})
			.addCase(getTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReviews = payload.reviews;
				state.totalTeachingReviews = payload.totalReviews;
			})
			.addCase(getTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no Teaching reviews registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getTeachingReviewsTotalNumber.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getTeachingReviewsTotalNumber.fulfilled,
				(state, { payload }) => {
					state.isLoading = false;
					state.totalTeachingReviews = payload;
				}
			)
			.addCase(getTeachingReviewsTotalNumber.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteUserTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.teachingReviews = [];
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteUserTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteTeachingReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTeachingReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteTeachingReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetTeachingReview, setEditTeachingReview } =
	teachingReviewSlice.actions;
export default teachingReviewSlice.reducer;

// import { ReviewType } from '../../constants/enums';
// import { reviewSlice } from './reviewSlice';
// import reviewService from './services/reviewService';

// const teachingReviewSlice = reviewSlice(
// 	'teachingReview',
// 	ReviewType.Teaching,
// 	reviewService
// );

// export const { resetReview, setEditReview } = teachingReviewSlice;
// export const {
// 	createReview,
// 	updateReview,
// 	getReview,
// 	deleteReview,
// 	getUserReviews,
// 	deleteUserReviews,
// 	getReviews,
// 	deleteReviews,
// } = teachingReviewSlice.actions;
// export default teachingReviewSlice.reducer;
