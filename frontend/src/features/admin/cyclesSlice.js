import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import cyclesService from './cyclesService';

const initialState = {
	cycles: [],
	cycle: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const defineCycles = createAsyncThunk(
	API_URL_ADMIN + '/defineCycles',
	async (data, thunkAPI) => {
		try {
			return await cyclesService.defineCycles(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateCycles = createAsyncThunk(
	API_URL_ADMIN + '/updateCycles',
	async (data, thunkAPI) => {
		try {
			return await cyclesService.updateCycles(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getCycles = createAsyncThunk(API_URL_ADMIN + '/getCycles', async (_, thunkAPI) => {
	try {
		return await cyclesService.getCycles();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCycles = createAsyncThunk(
	API_URL_ADMIN + '/deleteCycles',
	async (_, thunkAPI) => {
		try {
			return await cyclesService.deleteCycles();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const cyclesSlice = createSlice({
	name: 'cycle',
	initialState,
	reducers: {
		resetCycles: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineCycles.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Cycles defined!',
					icon: 'success',
				});
				state.cycles = action.payload;
			})
			.addCase(defineCycles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCycles.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Cycles updated!',
					icon: 'success',
				});
			})
			.addCase(updateCycles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCycles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cycles = action.payload;
			})
			.addCase(getCycles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteCycles.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(deleteCycles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { resetCycles } = cyclesSlice.actions;
export default cyclesSlice.reducer;
