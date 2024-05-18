import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';

const initialState = {
	reviews: [],
	review: {},
	isLoading: false,
	isEditingReview: false,
	editReviewId: '',
	totalReviews: 0,
};

export const createReview = (action, type, service) =>
	createAsyncThunk(action, async (data, thunkAPI) => {
		try {
			return await service.createReview(type, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const updateReview = (action, type, service) =>
	createAsyncThunk(action, async ({ reviewId, data }, thunkAPI) => {
		try {
			return await service.updateReview(type, reviewId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const getReview = (action, type, service) =>
	createAsyncThunk(action, async (reviewId, thunkAPI) => {
		try {
			return await service.getReview(type, reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const deleteReview = (action, type, service) =>
	createAsyncThunk(action, async (reviewId, thunkAPI) => {
		try {
			return await service.deleteReview(type, reviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const getUserReviews = (action, type, service) =>
	createAsyncThunk(action, async (_, thunkAPI) => {
		try {
			return await service.getUserReviews(type);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const deleteUserReviews = (action, type, service) =>
	createAsyncThunk(action, async (_, thunkAPI) => {
		try {
			return await service.deleteUserReviews(type);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const getReviews = (action, type, service) =>
	createAsyncThunk(action, async (_, thunkAPI) => {
		try {
			return await service.getReviews(type);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

export const deleteReviews = (action, type, service) =>
	createAsyncThunk(action, async (_, thunkAPI) => {
		try {
			return await service.deleteReviews(type);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	});

const reviewSlice = (name, type, service) => {
	createSlice({
		name: name,
		initialState,
		reducers: {
			resetReview: () => initialState,
			setEditReview: (state, { payload }) => {
				return { ...state, isEditingReview: true, ...payload };
			},
		},
		extraReducers: (builder) => {
			builder
				.addCase(createReview(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					createReview(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						displaySuccessNotification(payload.message);
						state.reviews = [...state.reviews, payload.review];
					}
				)
				.addCase(createReview(type, service).rejected, (state, { payload }) => {
					state.isLoading = false;
					displayErrorNotification(payload);
				})
				.addCase(updateReview(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					updateReview(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						displaySuccessNotification(payload.message);
						const updatedReviewIndex = state.reviews.findIndex(
							(review) => review._id === payload.updatedReview._id
						);
						if (updatedReviewIndex !== -1)
							state.reviews[updatedReviewIndex] = payload.updatedReview;
					}
				)
				.addCase(updateReview(type, service).rejected, (state, { payload }) => {
					state.isLoading = false;
					displayErrorNotification(payload);
				})
				.addCase(getReview(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(getReview(type, service).fulfilled, (state, { payload }) => {
					state.isLoading = false;
					state.review = payload;
				})
				.addCase(getReview(type, service).rejected, (state, { payload }) => {
					state.isLoading = false;
					if (
						payload !==
						`Seems like the ${type.toLowerCase()} review that you are trying to view does not exist.`
					)
						displayErrorNotification(payload);
				})
				.addCase(deleteReview(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					deleteReview(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						displaySuccessNotification(payload.message);
						state.reviews = state.reviews.filter((review) => {
							return review._id !== payload.review;
						});
					}
				)
				.addCase(deleteReview(type, service).rejected, (state, { payload }) => {
					state.isLoading = false;
					displayErrorNotification(payload);
				})
				.addCase(getUserReviews(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					getUserReviews(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						state.reviews = payload;
					}
				)
				.addCase(
					getUserReviews(type, service).rejected,
					(state, { payload }) => {
						state.isLoading = false;
						if (
							payload !==
							`Seems like you haven't submitted any ${type.toLowerCase()} reviews yet.`
						)
							displayErrorNotification(payload);
					}
				)
				.addCase(deleteUserReviews(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					deleteUserReviews(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						state.reviews = [];
						displaySuccessNotification(payload.message);
					}
				)
				.addCase(
					deleteUserReviews(type, service).rejected,
					(state, { payload }) => {
						state.isLoading = false;
						displayErrorNotification(payload);
					}
				)
				.addCase(getReviews(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(getReviews(type, service).fulfilled, (state, { payload }) => {
					state.isLoading = false;
					state.reviews = payload.reviews;
					state.totalReviews = payload.totalReviews;
				})
				.addCase(getReviews(type, service).rejected, (state, { payload }) => {
					state.isLoading = false;
					if (
						payload !==
						`Seems like there are no ${type.toLowerCase()} reviews registered in the system.`
					)
						displayErrorNotification(payload);
				})
				.addCase(deleteReviews(type, service).pending, (state) => {
					state.isLoading = true;
				})
				.addCase(
					deleteReviews(type, service).fulfilled,
					(state, { payload }) => {
						state.isLoading = false;
						displaySuccessNotification(payload.message);
					}
				)
				.addCase(
					deleteReviews(type, service).rejected,
					(state, { payload }) => {
						state.isLoading = false;
						displayErrorNotification(payload);
					}
				);
		},
	});
};
export const { resetReview, setEditReview } = reviewSlice.actions;
export default reviewSlice.reducer;
