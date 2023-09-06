import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import statementService from './services/statementService';
import {
	CREATE_STATEMENT,
	UPDATE_STATEMENT,
	GET_STATEMENT,
	DELETE_STATEMENT,
	GET_STATEMENTS,
	DELETE_STATEMENTS,
} from '../actions';

const initialState = {
	statements: [],
	statement: {},
	isLoading: false,
	isEditingStatement: false,
	editStatementId: '',
};

export const getStudentStatements = createAsyncThunk(GET_STATEMENTS, async (_, thunkAPI) => {
	try {
		return await statementService.getStudentStatements();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const createStatement = createAsyncThunk(CREATE_STATEMENT, async (data, thunkAPI) => {
	try {
		return await statementService.createStatement(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const updateStatement = createAsyncThunk(
	UPDATE_STATEMENT,
	async ({ statementId, data }, thunkAPI) => {
		try {
			return await statementService.updateStatement(statementId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getStatement = createAsyncThunk(GET_STATEMENT, async (statementId, thunkAPI) => {
	try {
		return await statementService.getStatement(statementId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteStatement = createAsyncThunk(DELETE_STATEMENT, async (statementId, thunkAPI) => {
	try {
		return await statementService.deleteStatement(statementId);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

// export const getStatements = createAsyncThunk(GET_STATEMENTS, async (_, thunkAPI) => {
// 	try {
// 		return await statementService.getStatements();
// 	} catch (error) {
// 		return thunkAPI.rejectWithValue(extractErrorMessage(error));
// 	}
// });

export const deleteStatements = createAsyncThunk(DELETE_STATEMENTS, async (_, thunkAPI) => {
	try {
		return await statementService.deleteStatements();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const statementSlice = createSlice({
	name: 'statement',
	initialState,
	reducers: {
		resetStatements: () => initialState,
		setEditStatement: (state, { payload }) => {
			return { ...state, isEditingStatement: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStudentStatements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStudentStatements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.statements = payload;
			})
			.addCase(getStudentStatements.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== `Seems like you haven't submitted a course statement yet.`)
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(createStatement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createStatement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.statements = [...state.statements, payload.statement];
			})
			.addCase(createStatement.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(updateStatement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateStatement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				const updatedStatementIndex = state.statements.findIndex(
					(statement) => statement._id === payload.updatedStatement._id
				);
				if (updatedStatementIndex !== -1)
					state.statements[updatedStatementIndex] = payload.updatedStatement;
			})
			.addCase(updateStatement.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			.addCase(getStatement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStatement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.statement = payload;
			})
			.addCase(getStatement.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the statement that you are trying to view does not exist.'
				)
					Toast.fire({
						title: 'Something went wrong!',
						text: payload,
						icon: 'error',
					});
			})
			.addCase(deleteStatement.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteStatement.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload.message,
					icon: 'success',
				});
				state.statements = state.statements.filter((statement) => {
					return statement._id !== payload.statement;
				});
			})
			.addCase(deleteStatement.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			})
			// .addCase(getStatements.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(getStatements.fulfilled, (state, { payload }) => {
			// 	state.isLoading = false;
			// 	state.statements = payload;
			// })
			// .addCase(getStatements.rejected, (state, { payload }) => {
			// 	state.isLoading = false;
			// 	Toast.fire({
			// 		title: 'Something went wrong!',
			// 		text: payload,
			// 		icon: 'error',
			// 	});
			// })
			.addCase(deleteStatements.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteStatements.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: payload,
					icon: 'success',
				});
			})
			.addCase(deleteStatements.rejected, (state, { payload }) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: payload,
					icon: 'error',
				});
			});
	},
});

export const { resetStatements, setEditStatement } = statementSlice.actions;
export default statementSlice.reducer;
