import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ADMIN } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import cyclesService from './cyclesService';

const initialState = {
	cycles: null,
	isLoading: false,
	isEditingCycles: false,
	editCyclesId: '',
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
	async ({ cyclesId, data }, thunkAPI) => {
		try {
			return await cyclesService.updateCycles(cyclesId, data);
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
	async (cyclesId, thunkAPI) => {
		try {
			return await cyclesService.deleteCycles(cyclesId);
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
		setEditCycles: (state, { payload }) => {
			return { ...state, isEditingCycles: true, ...payload };
		},
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
					text: 'Cycles configuration defined!',
					icon: 'success',
				});
				state.cycles = action.payload;
			})
			.addCase(defineCycles.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(updateCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCycles.fulfilled, (state) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Cycles configuration updated!',
					icon: 'success',
				});
				// state.cycles = action.payload;
			})
			.addCase(updateCycles.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
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
				if (action.payload !== 'Seems like there are no defined cycles.')
					Toast.fire({
						title: 'Something went wrong!',
						text: action.payload.message,
						icon: 'error',
					});
			})
			.addCase(deleteCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCycles.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteCycles.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetCycles, setEditCycles } = cyclesSlice.actions;
export default cyclesSlice.reducer;
