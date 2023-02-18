import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { userSlice } from '../features/admin/userSlice';
import { semesterSlice } from '../features/admin/semesterSlice';
import { vaccineReassessmentSlice } from '../features/admin/vaccineReassessmentSlice';
import { cyclesSlice } from '../features/admin/cyclesSlice';
import { courseSlice } from '../features/courses/courseSlice';
import { noteSlice } from '../features/notes/noteSlice';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		users: userSlice.reducer,
		courses: courseSlice.reducer,
		notes: noteSlice.reducer,
		cycles: cyclesSlice.reducer,
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
		semester: semesterSlice.reducer,
		vaccineReassessment: vaccineReassessmentSlice.reducer,
	},
});
