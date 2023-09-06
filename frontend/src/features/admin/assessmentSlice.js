import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import {
	DEFINE_ASSESSMENT,
	DELETE_ASSESSMENT,
	GET_ASSESSMENT,
	UPDATE_ASSESSMENT,
} from '../actions';
import assessmentService from './services/assessmentService';

const initialState = {
	assessment: null,
	isLoading: false,
	isEditingAssessment: false,
	editAssessmentId: '',
};

export const defineAssessment = createAsyncThunk(DEFINE_ASSESSMENT, async (data, thunkAPI) => {
	try {
		return await assessmentService.defineAssessment(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getAssessment = createAsyncThunk(GET_ASSESSMENT, async (_, thunkAPI) => {
	try {
		return await assessmentService.getAssessment();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateAssessment = createAsyncThunk(
	UPDATE_ASSESSMENT,
	async ({ assessmentId, data }, thunkAPI) => {
		try {
			return await assessmentService.updateAssessment(assessmentId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteAssessment = createAsyncThunk(
	DELETE_ASSESSMENT,
	async (assessmentId, thunkAPI) => {
		try {
			return await assessmentService.deleteAssessment(assessmentId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const assessmentSlice = createSlice({
	name: 'assessment',
	initialState,
	reducers: {
		resetAssessment: () => initialState,
		setEditAssessment: (state, { payload }) => {
			return { ...state, isEditingAssessment: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineAssessment.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.assessment = payload.assessment;
			})
			.addCase(defineAssessment.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('vaccineEndDate' && 'vaccineStartDate'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Vaccine end date must be greater than vaccine starting date.',
						icon: 'error',
					});
				else
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(getAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAssessment.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.assessment = payload;
			})
			.addCase(getAssessment.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
						'Seems like there is no assessment statement configuration defined for this semester.' &&
					payload !==
						'Seems like there is no defined semester for current period. Define a semester first in order to define assessment statement configuration.'
				) {
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
				}
			})
			.addCase(updateAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAssessment.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.assessment = payload.updatedAssessment;
			})
			.addCase(updateAssessment.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload.includes('vaccineEndDate' && 'vaccineStartDate'))
					Toast.fire({
						title: 'Something went wrong!',
						text: 'Vaccine end date must be greater than vaccine starting date.',
						icon: 'error',
					});
				else
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAssessment.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.assessment = null;
			})
			.addCase(deleteAssessment.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { resetAssessment, setEditAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
