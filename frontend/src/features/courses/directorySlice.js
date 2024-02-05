import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	CREATE_DIRECTORY,
	DELETE_DIRECTORIES,
	DELETE_DIRECTORY,
	GET_DIRECTORIES,
	GET_DIRECTORY,
	UPDATE_DIRECTORY,
} from '../actions';
import directoryService from './services/directoryService';

const initialState = {
	directories: [],
	directory: {},
	isLoading: false,
	isEditingDirectory: false,
	editDirectoryId: '',
};

export const getDirectory = createAsyncThunk(
	GET_DIRECTORY,
	async ({ teachingId, directoryId }, thunkAPI) => {
		try {
			return await directoryService.getDirectory(teachingId, directoryId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const createDirectory = createAsyncThunk(
	CREATE_DIRECTORY,
	async ({ teachingId, data }, thunkAPI) => {
		try {
			return await directoryService.createDirectory(teachingId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateDirectory = createAsyncThunk(
	UPDATE_DIRECTORY,
	async ({ teachingId, directoryId, data }, thunkAPI) => {
		try {
			return await directoryService.updateDirectory(
				teachingId,
				directoryId,
				data
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteDirectory = createAsyncThunk(
	DELETE_DIRECTORY,
	async ({ teachingId, directoryId }, thunkAPI) => {
		try {
			return await directoryService.deleteDirectory(teachingId, directoryId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteDirectories = createAsyncThunk(
	DELETE_DIRECTORIES,
	async (teachingId, thunkAPI) => {
		try {
			return await directoryService.deleteDirectories(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getDirectories = createAsyncThunk(
	GET_DIRECTORIES,
	async (teachingId, thunkAPI) => {
		try {
			return await directoryService.getDirectories(teachingId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const directorySlice = createSlice({
	name: 'directory',
	initialState,
	reducers: {
		resetDirectories: () => initialState,
		setEditDirectory: (state, { payload }) => {
			return { ...state, isEditingDirectory: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDirectories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDirectories.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.directories = payload;
			})
			.addCase(getDirectories.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !== `Seems like this teaching does not have any directories.`
				)
					displayErrorNotification(payload);
			})
			.addCase(getDirectory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDirectory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.directory = payload;
			})
			.addCase(getDirectory.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(createDirectory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createDirectory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.directories = [...state.directories, payload.directory];
			})
			.addCase(createDirectory.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateDirectory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateDirectory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedDirectoryIndex = state.directories.findIndex(
					(directory) => directory._id === payload.updatedDirectory._id
				);
				if (updatedDirectoryIndex !== -1)
					state.directories[updatedDirectoryIndex] = payload.updatedDirectory;
			})
			.addCase(updateDirectory.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteDirectory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteDirectory.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.messsage);
				state.directories = state.directories.filter((directory) => {
					return directory._id !== payload.directory;
				});
			})
			.addCase(deleteDirectory.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteDirectories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteDirectories.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.directories = null;
				displaySuccessNotification(payload.message);
			})
			.addCase(deleteDirectories.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetDirectories, setEditDirectory } = directorySlice.actions;
export default directorySlice.reducer;
