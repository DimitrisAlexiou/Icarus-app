import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/redux/errorMessage';
import vaccineReassessmentService from './vaccineReassessmentService';

const initialState = {
	vaccineReassessment: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineVaccineReassessment = createAsyncThunk(
	API_URL_ADMIN,
	async (vaccineReassessment, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			return await vaccineReassessmentService.defineVaccineReassessment(vaccineReassessment);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getVaccineReassessment = createAsyncThunk(API_URL_ADMIN, async (_, thunkAPI) => {
	try {
		// const token = thunkAPI.getState().auth.user.token;
		return await vaccineReassessmentService.getVaccineReassessment();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteVaccineReassessment = createAsyncThunk(
	API_URL_ADMIN,
	async (vaccineReassessmentId, thunkAPI) => {
		try {
			// const token = thunkAPI.getState().auth.user.token;
			return await vaccineReassessmentService.deleteVaccineReassessment(
				vaccineReassessmentId
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const vaccineReassessmentSlice = createSlice({
	name: 'vaccineReassessment',
	initialState,
	reducers: {
		resetVaccineReassessment: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineVaccineReassessment.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineVaccineReassessment.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(defineVaccineReassessment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
		// .addCase(getVaccineReassessment.pending, (state) => {
		// 	state.isLoading = true;
		// });
		// .addCase(getVaccineReassessment.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.vaccineReassessment = action.payload;
		// })
		// .addCase(getVaccineReassessment.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isError = true;
		// 	state.message = action.payload;
		// })
		// .addCase(deleteVaccineReassessment.fulfilled, (state, action) => {
		// 	state.isLoading = false;
		// 	state.isSuccess = true;
		// 	state.message = action.payload;
		// });
	},
});

export const { resetVaccineReassessment } = vaccineReassessmentSlice.actions;
export default vaccineReassessmentSlice.reducer;
