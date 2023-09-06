import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import {
	DEFINE_CYCLES,
	DELETE_CYCLE,
	DELETE_CYCLES,
	GET_CYCLE,
	GET_CYCLES,
	UPDATE_CYCLES,
} from '../actions';
import cyclesService from './services/cyclesService';

const initialState = {
	cycles: [],
	cycle: {},
	isLoading: false,
	isEditingCycle: false,
	editCycleId: '',
};

export const defineCycle = createAsyncThunk(DEFINE_CYCLES, async (data, thunkAPI) => {
	try {
		return await cyclesService.defineCycle(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateCycle = createAsyncThunk(UPDATE_CYCLES, async ({ cycleId, data }, thunkAPI) => {
	try {
		return await cyclesService.updateCycle(cycleId, data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getCycle = createAsyncThunk(GET_CYCLE, async (cycleId, thunkAPI) => {
	try {
		return await cyclesService.getCycle(cycleId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const getCycles = createAsyncThunk(GET_CYCLES, async (_, thunkAPI) => {
	try {
		return await cyclesService.getCycles();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCycle = createAsyncThunk(DELETE_CYCLE, async (cycleId, thunkAPI) => {
	try {
		return await cyclesService.deleteCycle(cycleId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteCycles = createAsyncThunk(DELETE_CYCLES, async (thunkAPI) => {
	try {
		return await cyclesService.deleteCycles();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const cyclesSlice = createSlice({
	name: 'cycle',
	initialState,
	reducers: {
		resetCycles: () => initialState,
		setEditCycle: (state, { payload }) => {
			return { ...state, isEditingCycle: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineCycle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineCycle.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.cycles = [...state.cycles, ...payload.cycles];
			})
			.addCase(defineCycle.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(updateCycle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCycle.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				const updatedCycleIndex = state.cycles.findIndex(
					(cycle) => cycle._id === payload.updatedCycle._id
				);
				if (updatedCycleIndex !== -1)
					state.cycles[updatedCycleIndex] = payload.updatedCycle;
			})
			.addCase(updateCycle.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(getCycle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCycle.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.cycle = payload;
			})
			.addCase(getCycle.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like the cycle that you are trying to view does not exist.')
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(getCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCycles.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.cycles = payload;
			})
			.addCase(getCycles.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there are no defined cycles.')
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteCycle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCycle.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.cycles = state.cycles.filter((cycle) => {
					return cycle._id !== payload.cycle;
				});
			})
			.addCase(deleteCycle.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload.message,
					icon: 'error',
				});
			})
			.addCase(deleteCycles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCycles.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.cycles = [];
			})
			.addCase(deleteCycles.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetCycles, setEditCycle } = cyclesSlice.actions;
export default cyclesSlice.reducer;
