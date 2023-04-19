import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import degreeRulesService from './degreeRulesService';

const initialState = {
	degreeRules: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineDegreeRules = createAsyncThunk(
	API_URL_ADMIN + '/define',
	async (data, thunkAPI) => {
		try {
			return await degreeRulesService.defineDegreeRules(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getDegreeRules = createAsyncThunk(API_URL_ADMIN + '/get', async (_, thunkAPI) => {
	try {
		return await degreeRulesService.getDegreeRules();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateDegreeRules = createAsyncThunk(
	API_URL_ADMIN + '/update',
	async (degreeRulesId, data, thunkAPI) => {
		try {
			return await degreeRulesService.updateDegreeRules(degreeRulesId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteDegreeRules = createAsyncThunk(
	API_URL_ADMIN + '/delete',
	async (degreeRulesId, thunkAPI) => {
		try {
			return await degreeRulesService.deleteDegreeRules(degreeRulesId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const degreeRulesSlice = createSlice({
	name: 'degreeRules',
	initialState,
	reducers: {
		resetDegreeRules: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineDegreeRules.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Degree rules assigned!',
					icon: 'success',
				});
				state.degreeRules = action.payload;
			})
			.addCase(defineDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDegreeRules.fulfilled, (state, action) => {
				state.isLoading = false;
				state.degreeRules = action.payload;
			})
			.addCase(getDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateDegreeRules.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Degree Rules updated!',
					icon: 'success',
				});
				state.degreeRules = action.payload;
			})
			.addCase(updateDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteDegreeRules.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetDegreeRules } = degreeRulesSlice.actions;
export default degreeRulesSlice.reducer;
