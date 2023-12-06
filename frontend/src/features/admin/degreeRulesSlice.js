import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	DEFINE_DEGREE_RULES,
	DELETE_DEGREE_RULES,
	GET_DEGREE_RULES,
	UPDATE_DEGREE_RULES,
} from '../actions';
import degreeRulesService from './services/degreeRulesService';

const initialState = {
	degreeRules: null,
	isLoading: false,
	isEditingDegreeRules: false,
	editDegreeRulesId: '',
};

export const defineDegreeRules = createAsyncThunk(
	DEFINE_DEGREE_RULES,
	async (data, thunkAPI) => {
		try {
			return await degreeRulesService.defineDegreeRules(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getDegreeRules = createAsyncThunk(
	GET_DEGREE_RULES,
	async (_, thunkAPI) => {
		try {
			return await degreeRulesService.getDegreeRules();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateDegreeRules = createAsyncThunk(
	UPDATE_DEGREE_RULES,
	async ({ degreeRulesId, data }, thunkAPI) => {
		try {
			return await degreeRulesService.updateDegreeRules(degreeRulesId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteDegreeRules = createAsyncThunk(
	DELETE_DEGREE_RULES,
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
		setEditDegreeRules: (state, { payload }) => {
			return { ...state, isEditingDegreeRules: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineDegreeRules.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.degreeRules = payload.degreeRules;
			})
			.addCase(defineDegreeRules.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDegreeRules.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.degreeRules = payload;
			})
			.addCase(getDegreeRules.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there are no defined degree rules.')
					displayErrorNotification(payload);
			})
			.addCase(updateDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateDegreeRules.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.degreeRules = payload.updatedDegreeRules;
			})
			.addCase(updateDegreeRules.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteDegreeRules.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteDegreeRules.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.degreeRules = null;
			})
			.addCase(deleteDegreeRules.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetDegreeRules, setEditDegreeRules } =
	degreeRulesSlice.actions;
export default degreeRulesSlice.reducer;
