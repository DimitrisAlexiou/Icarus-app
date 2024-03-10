import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	ADD_GRADE,
	DELETE_GRADE,
	DELETE_GRADES,
	FINALIZE_GRADE,
	FINALIZE_GRADES,
	GET_GRADE,
	GET_GRADES,
	GET_STATEMENT_GRADES,
	UPDATE_GRADE,
} from '../actions';
import gradeService from './services/gradeService';

const initialState = {
	grades: [],
	grade: {},
	isLoading: false,
	isEditingTheoryGrade: false,
	isEditingLabGrade: false,
	editGradeId: '',
	examinationType: '',
	teachingToEditId: '',
};

export const addGrade = createAsyncThunk(ADD_GRADE, async (data, thunkAPI) => {
	try {
		return await gradeService.addGrade(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const finalizeGrade = createAsyncThunk(
	FINALIZE_GRADE,
	async (gradeId, thunkAPI) => {
		try {
			return await gradeService.finalizeGrade(gradeId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const finalizeGrades = createAsyncThunk(
	FINALIZE_GRADES,
	async (statementId, thunkAPI) => {
		try {
			return await gradeService.finalizeGrades(statementId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateGrade = createAsyncThunk(
	UPDATE_GRADE,
	async ({ gradeId, data }, thunkAPI) => {
		try {
			return await gradeService.updateGrade(gradeId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGrade = createAsyncThunk(
	GET_GRADE,
	async (gradeId, thunkAPI) => {
		try {
			return await gradeService.getGrade(gradeId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteGrade = createAsyncThunk(
	DELETE_GRADE,
	async (gradeId, thunkAPI) => {
		try {
			return await gradeService.deleteGrade(gradeId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getStatementGrades = createAsyncThunk(
	GET_STATEMENT_GRADES,
	async (statementId, thunkAPI) => {
		try {
			return await gradeService.getStatementGrades(statementId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const getGrades = createAsyncThunk(GET_GRADES, async (_, thunkAPI) => {
	try {
		return await gradeService.getGrades();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteGrades = createAsyncThunk(
	DELETE_GRADES,
	async (_, thunkAPI) => {
		try {
			return await gradeService.deleteGrades();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const gradeSlice = createSlice({
	name: 'grade',
	initialState,
	reducers: {
		resetGrades: () => initialState,
		setEditTheoryGrade: (state, { payload }) => {
			return { ...state, isEditingTheoryGrade: true, ...payload };
		},
		setEditLabGrade: (state, { payload }) => {
			return { ...state, isEditingLabGrade: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addGrade.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addGrade.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.grades = [...state.grades, payload.grade];
			})
			.addCase(addGrade.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(finalizeGrade.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(finalizeGrade.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const finalizedGradeIndex = state.grades.findIndex(
					(grade) => grade._id === payload.finalizedGrade._id
				);
				if (finalizedGradeIndex !== -1)
					state.grades[finalizedGradeIndex] = payload.finalizedGrade;
			})
			.addCase(finalizeGrade.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(finalizeGrades.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(finalizeGrades.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
			})
			.addCase(finalizeGrades.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateGrade.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateGrade.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.grades = state.grades.map((grade) =>
					grade._id === payload.updatedGrade._id ? payload.updatedGrade : grade
				);
			})
			.addCase(updateGrade.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getGrade.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGrade.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.grade = payload;
			})
			.addCase(getGrade.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like the grade that you are trying to view does not exist.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteGrade.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGrade.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.grades = state.grades.filter((grade) => {
					return grade._id !== payload.grade;
				});
			})
			.addCase(deleteGrade.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(getStatementGrades.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStatementGrades.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.grades = payload;
			})
			.addCase(getStatementGrades.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no grades defined for this statement teachings.'
				)
					displayErrorNotification(payload);
			})
			.addCase(getGrades.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGrades.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.grades = payload.grades;
			})
			.addCase(getGrades.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (
					payload !==
					'Seems like there are no course grades registered in the system.'
				)
					displayErrorNotification(payload);
			})
			.addCase(deleteGrades.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteGrades.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload);
			})
			.addCase(deleteGrades.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetGrades, setEditTheoryGrade, setEditLabGrade } =
	gradeSlice.actions;

export default gradeSlice.reducer;
