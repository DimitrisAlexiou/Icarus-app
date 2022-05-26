import { configureStore } from '@reduxjs/toolkit';
import { courseSlice } from '../features/courses/courseSlice';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';

export const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
	},
});
