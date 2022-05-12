import { configureStore } from '@reduxjs/toolkit';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
	reducer: {
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
		// auth: authReducer,
	},
});
