import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { sidebarSlice } from '../features/sidebarSlice';
import { courseSlice } from '../features/courses/courseSlice';
import { noteSlice } from '../features/notes/noteSlice';
import { cyclesSlice } from '../features/admin/cyclesSlice';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';

export const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		notes: noteSlice.reducer,
		cycles: cyclesSlice.reducer,
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
		auth: authSlice.reducer,
		sidebar: sidebarSlice.reducer,
	},
});
