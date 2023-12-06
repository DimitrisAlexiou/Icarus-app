import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	CREATE_GENERAL_REVIEW,
	DELETE_GENERAL_REVIEW,
	DELETE_GENERAL_REVIEWS,
	DELETE_USER_GENERAL_REVIEWS,
	GET_GENERAL_REVIEW,
	GET_GENERAL_REVIEWS,
	GET_USER_GENERAL_REVIEWS,
	UPDATE_GENERAL_REVIEW,
} from '../actions';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import generalReviewService from './services/generalReviewService';

const initialState = {
	generalReviews: [],
	generalReview: {},
	isLoading: false,
	isEditingGeneralReview: false,
	editGeneralReviewId: '',
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

export const updateGeneralReview = createAsyncThunk(
	UPDATE_GENERAL_REVIEW,
	async ({ generalReviewId, data }, thunkAPI) => {
		try {
			return await generalReviewService.updateGeneralReview(
				generalReviewId,
				data
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGeneralReview = createAsyncThunk(
	GET_GENERAL_REVIEW,
	async (generalReviewId, thunkAPI) => {
		try {
			return await generalReviewService.getGeneralReview(generalReviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteGeneralReview = createAsyncThunk(
	DELETE_GENERAL_REVIEW,
	async (generalReviewId, thunkAPI) => {
		try {
			return await generalReviewService.deleteGeneralReview(generalReviewId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getUserGeneralReviews = createAsyncThunk(
	GET_USER_GENERAL_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await generalReviewService.getUserGeneralReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteUserGeneralReviews = createAsyncThunk(
	DELETE_USER_GENERAL_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await generalReviewService.deleteUserGeneralReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGeneralReviews = createAsyncThunk(
	GET_GENERAL_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await generalReviewService.getGeneralReviews();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteGeneralReviews = createAsyncThunk(
	DELETE_GENERAL_REVIEWS,
	async (_, thunkAPI) => {
		try {
			return await generalReviewService.deleteGeneralReviews();
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
		setEditGeneralReview: (state, { payload }) => {
			return { ...state, isEditingGeneralReview: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGeneralReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createGeneralReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.generalReviews = [...state.generalReviews, payload.generalReview];
			})
			.addCase(createGeneralReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateGeneralReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateGeneralReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedGeneralReviewIndex = state.generalReviews.findIndex(
					(generalReview) =>
						generalReview._id === payload.updatedGeneralReview._id
				);
				if (updatedGeneralReviewIndex !== -1)
					state.generalReviews[updatedGeneralReviewIndex] =
						payload.updatedGeneralReview;
			})
			.addCase(updateGeneralReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getGeneralReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGeneralReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.generalReview = payload;
			})
			.addCase(getGeneralReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the general review that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteGeneralReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGeneralReview.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.generalReviews = state.generalReviews.filter((generalReview) => {
					return generalReview._id !== payload.generalReview;
				});
			})
			.addCase(deleteGeneralReview.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getUserGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserGeneralReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.generalReviews = payload;
			})
			.addCase(getUserGeneralReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					`Seems like you haven't submitted any general reviews yet.`
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteUserGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserGeneralReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteUserGeneralReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGeneralReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.generalReviews = payload;
			})
			.addCase(getGeneralReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no general reviews registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteGeneralReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGeneralReviews.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteGeneralReviews.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetGeneralReview, setEditGeneralReview } =
	generalReviewSlice.actions;
export default generalReviewSlice.reducer;
