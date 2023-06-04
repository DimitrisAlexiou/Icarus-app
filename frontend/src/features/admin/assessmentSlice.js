import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import assessmentService from './assessmentService';

const initialState = {
	assessment: null,
	isLoading: false,
	isEditingAssessment: false,
	editAssessmentId: '',
};

export const defineAssessment = createAsyncThunk(
	API_URL_ADMIN + '/defineAssessment',
	async (data, thunkAPI) => {
		try {
			return await assessmentService.defineAssessment(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getAssessment = createAsyncThunk(
	API_URL_ADMIN + '/getAssessment',
	async (_, thunkAPI) => {
		try {
			return await assessmentService.getAssessment();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateAssessment = createAsyncThunk(
	API_URL_ADMIN + '/updateAssessment',
	async ({ assessmentId, data }, thunkAPI) => {
		try {
			await assessmentService.updateAssessment(assessmentId, data);
			return thunkAPI.dispatch(getAssessment());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteAssessment = createAsyncThunk(
	API_URL_ADMIN + '/deleteAssessment',
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
			.addCase(defineAssessment.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Assessment configuration defined!',
					icon: 'success',
				});
				state.assessment = action.payload;
			})
			.addCase(defineAssessment.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(getAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAssessment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.assessment = action.payload;
			})
			.addCase(getAssessment.rejected, (state, action) => {
				state.isLoading = false;
				if (
					action.payload !==
					'Seems like there is no assessment statement duration period defined for current semester.'
				)
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload,
						icon: 'error',
					});
			})
			.addCase(updateAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAssessment.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Assessment configuration updated!',
					icon: 'success',
				});
				// state.assessment = action.payload;
			})
			.addCase(updateAssessment.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteAssessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAssessment.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload,
					icon: 'success',
				});
			})
			.addCase(deleteAssessment.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			});
	},
});

export const { resetAssessment, setEditAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
