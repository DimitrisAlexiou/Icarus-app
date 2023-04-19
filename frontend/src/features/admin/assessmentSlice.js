import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import AssessmentService from './assessmentService';

const initialState = {
	assessment: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineAssessment = createAsyncThunk(
	API_URL_ADMIN + '/defineAssessment',
	async (data, thunkAPI) => {
		try {
			return await AssessmentService.defineAssessment(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getAssessment = createAsyncThunk(
	API_URL_ADMIN + '/getAssessment',
	async (_, thunkAPI) => {
		try {
			return await AssessmentService.getAssessment();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteAssessment = createAsyncThunk(
	API_URL_ADMIN + '/deleteAssessment',
	async (assessmentId, thunkAPI) => {
		try {
			return await AssessmentService.deleteAssessment(assessmentId);
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
				state.isError = true;
				state.message = action.payload;
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
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteAssessment.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteAssessment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
