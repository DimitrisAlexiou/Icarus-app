import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../utils/errorMessage';
import {
	displayErrorNotification,
	displaySuccessNotification,
} from '../../constants/sweetAlertNotification';
import {
	CREATE_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
	DELETE_EVENTS,
	GET_EVENTS,
} from '../actions';
import eventService from './eventService';

const initialState = {
	events: [],
	event: {},
	isLoading: false,
	isEditingEvent: false,
	editEventId: '',
};

export const getEvents = createAsyncThunk(GET_EVENTS, async (_, thunkAPI) => {
	try {
		return await eventService.getEvents();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const addEvent = createAsyncThunk(
	CREATE_EVENT,
	async (data, thunkAPI) => {
		try {
			return await eventService.addEvent(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const updateEvent = createAsyncThunk(
	UPDATE_EVENT,
	async ({ eventId, data }, thunkAPI) => {
		try {
			return await eventService.updateEvent(eventId, data);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteEvent = createAsyncThunk(
	DELETE_EVENT,
	async (eventId, thunkAPI) => {
		try {
			return await eventService.deleteEvent(eventId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteEvents = createAsyncThunk(
	DELETE_EVENTS,
	async (_, thunkAPI) => {
		try {
			return await eventService.deleteEvents();
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		resetCalendar: () => initialState,
		setEditEvent: (state, { payload }) => {
			return { ...state, isEditingEvent: true, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEvents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getEvents.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.events = payload;
			})
			.addCase(getEvents.rejected, (state, { payload }) => {
				state.isLoading = false;
				if (payload !== 'Seems like there are no events.')
					displayErrorNotification(payload);
			})
			.addCase(addEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addEvent.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.events = [...state.events, payload.event];
			})
			.addCase(addEvent.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(updateEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateEvent.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				const updatedEventIndex = state.events.findIndex(
					(event) => event._id === payload.updatedEvent._id
				);
				if (updatedEventIndex !== -1)
					state.events[updatedEventIndex] = payload.updatedEvent;
			})
			.addCase(updateEvent.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEvent.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.events = state.events.filter((event) => {
					return event._id !== payload.event;
				});
			})
			.addCase(deleteEvent.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			})
			.addCase(deleteEvents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEvents.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				displaySuccessNotification(payload.message);
				state.events = null;
			})
			.addCase(deleteEvents.rejected, (state, { payload }) => {
				state.isLoading = false;
				displayErrorNotification(payload);
			});
	},
});

export const { resetCalendar, setEditEvent } = eventSlice.actions;
export default eventSlice.reducer;
