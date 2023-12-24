import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	DEFINE_MASTER,
	DELETE_MASTER,
	DELETE_MASTERS,
	GET_MASTER,
	GET_MASTERS,
	UPDATE_MASTER,
} from '../actions';
import masterProgramService from './services/masterProgramService';

const initialState = {
	masters: [],
	master: {},
	isLoading: false,
	isEditingMaster: false,
	editMasterId: '',
};

export const defineMaster = createAsyncThunk(
	DEFINE_MASTER,
	async (data, thunkAPI) => {
		try {
			return await masterProgramService.defineMaster(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateMaster = createAsyncThunk(
	UPDATE_MASTER,
	async ({ masterId, data }, thunkAPI) => {
		try {
			return await masterProgramService.updateMaster(masterId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getMaster = createAsyncThunk(
	GET_MASTER,
	async (masterId, thunkAPI) => {
		try {
			return await masterProgramService.getMaster(masterId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getMasters = createAsyncThunk(GET_MASTERS, async (_, thunkAPI) => {
	try {
		return await masterProgramService.getMasters();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteMaster = createAsyncThunk(
	DELETE_MASTER,
	async (masterId, thunkAPI) => {
		try {
			return await masterProgramService.deleteMaster(masterId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteMasters = createAsyncThunk(
	DELETE_MASTERS,
	async (thunkAPI) => {
		try {
			return await masterProgramService.deleteMasters();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const masterProgramSlice = createSlice({
	name: 'master',
	initialState,
	reducers: {
		resetMaster: () => initialState,
		setEditMaster: (state, { payload }) => {
			return { ...state, isEditingMaster: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(defineMaster.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(defineMaster.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.master = payload.master;
				state.masters = [...state.masters, payload.master];
			})
			.addCase(defineMaster.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateMaster.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateMaster.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedMasterIndex = state.masters.findIndex(
					(master) => master._id === payload.updatedMaster._id
				);
				if (updatedMasterIndex !== -1)
					state.masters[updatedMasterIndex] = payload.updatedMaster;
			})
			.addCase(updateMaster.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getMasters.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMasters.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.masters = payload;
			})
			.addCase(getMasters.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there are no defined master programs.')
					displayErrorNotification(payload);
			})
			.addCase(getMaster.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMaster.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.master = payload;
			})
			.addCase(getMaster.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the master porgram that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteMaster.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteMaster.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.masters = state.masters.filter((master) => {
					return master._id !== payload.master;
				});
			})
			.addCase(deleteMaster.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteMasters.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteMasters.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.masters = [];
			})
			.addCase(deleteMasters.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload.message);
			});
	},
});

export const { resetMaster, setEditMaster } = masterProgramSlice.actions;
export default masterProgramSlice.reducer;
