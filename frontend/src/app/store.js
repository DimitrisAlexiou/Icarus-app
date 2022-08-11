import { configureStore } from '@reduxjs/toolkit';
import { courseSlice } from '../features/courses/courseSlice';
import { noteSlice } from '../features/notes/noteSlice';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';

export const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		notes: noteSlice.reducer,
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
	},
});
