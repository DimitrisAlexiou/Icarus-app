import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_CALENDAR } from '../../constants/config';
import { extractErrorMessage } from '../../utils/errorMessage';
import { Toast } from '../../constants/sweetAlertNotification';
import eventService from './eventService';

const initialState = {
	events: [],
	event: {},
	isLoading: false,
};

export const getEvents = createAsyncThunk(API_URL_CALENDAR, async (_, thunkAPI) => {
	try {
		return await eventService.getEvents();
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const addEvent = createAsyncThunk(API_URL_CALENDAR + '/add', async (data, thunkAPI) => {
	try {
		return await eventService.addEvent(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(extractErrorMessage(error));
	}
});

export const deleteEvent = createAsyncThunk(
	API_URL_CALENDAR + '/delete',
	async (eventId, thunkAPI) => {
		try {
			return await eventService.deleteEvent(eventId);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const deleteEvents = createAsyncThunk(
	API_URL_CALENDAR + '/delete_all',
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(getEvents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getEvents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.events = action.payload;
			})
			.addCase(getEvents.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(addEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addEvent.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: 'Event added!',
					icon: 'success',
				});
				state.events = [...state.events, action.payload];
			})
			.addCase(addEvent.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(deleteEvent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.isLoading = false;
				const deletedEventId = action.payload._id;
				state.events = [
					...state.events,
					state.events.filter((event) => event._id !== deletedEventId),
				];
				// state.events = state.events.filter((event) => event._id !== deletedEventId);
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteEvent.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			})
			.addCase(deleteEvents.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEvents.fulfilled, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Success',
					text: action.payload.message,
					icon: 'success',
				});
			})
			.addCase(deleteEvents.rejected, (state, action) => {
				state.isLoading = false;
				Toast.fire({
					title: 'Something went wrong!',
					text: action.payload.message,
					icon: 'error',
				});
			});
	},
});

export const { resetCalendar } = eventSlice.actions;
export default eventSlice.reducer;
