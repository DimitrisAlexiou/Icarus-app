import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import degreeRulesService from './degreeRulesService';

const initialState = {
	degreeRules: null,
	isLoading: false,
	isEditingDegreeRules: false,
	editDegreeRulesId: '',
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
	async ({ degreeRulesId, data }, thunkAPI) => {
		try {
			await degreeRulesService.updateDegreeRules(degreeRulesId, data);
			return thunkAPI.dispatch(getDegreeRules());
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteDegreeRules = createAsyncThunk(
	API_URL_ADMIN + '/delete',
	async (degreeRulesId, thunkAPI) => {
		try {
			await degreeRulesService.deleteDegreeRules(degreeRulesId);
			return thunkAPI.dispatch(getDegreeRules());
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
		setEditDegreeRules: (state, { payload }) => {
			return { ...state, isEditingDegreeRules: true, ...payload };
		},
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
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
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
				if (action.payload !== 'Seems like there are no defined degree rules.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload,
						icon: 'error',
					});
			})
			.addCase(updateDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateDegreeRules.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Degree Rules updated!',
					icon: 'success',
				});
				// state.degreeRules = state.degreeRules.map((degreeRule) => {
				// 	if (degreeRule.action.payload.id === action.payload.id)
				// 		return { ...degreeRule, ...action.payload };
				// 	return degreeRule;
				// });
			})
			.addCase(updateDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			})
			.addCase(deleteDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteDegreeRules.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload,
					icon: 'success',
				});
			})
			.addCase(deleteDegreeRules.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload,
					icon: 'error',
				});
			});
	},
});

export const { resetDegreeRules, setEditDegreeRules } = degreeRulesSlice.actions;
export default degreeRulesSlice.reducer;
