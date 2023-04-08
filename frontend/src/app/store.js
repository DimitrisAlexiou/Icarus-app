import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { userSlice } from '../features/admin/userSlice';
import { semesterSlice } from '../features/admin/semesterSlice';
import { reviewSlice } from '../features/admin/reviewSlice';
import { degreeRulesSlice } from '../features/admin/degreeRulesSlice';
import { assessmentSlice } from '../features/admin/assessmentSlice';
import { cyclesSlice } from '../features/admin/cyclesSlice';
import { courseSlice } from '../features/courses/courseSlice';
import { noteSlice } from '../features/notes/noteSlice';
import { eventSlice } from '../features/calendar/eventSlice';
import { teachingReviewSlice } from '../features/reviews/teachingReviewSlice';
import { instructorReviewSlice } from '../features/reviews/instructorReviewSlice';
import { generalReviewSlice } from '../features/reviews/generalReviewSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		users: userSlice.reducer,
		courses: courseSlice.reducer,
		notes: noteSlice.reducer,
		events: eventSlice.reducer,
		cycles: cyclesSlice.reducer,
		teachingReview: teachingReviewSlice.reducer,
		instructorReview: instructorReviewSlice.reducer,
		generalReview: generalReviewSlice.reducer,
		semesters: semesterSlice.reducer,
		review: reviewSlice.reducer,
		degreeRules: degreeRulesSlice.reducer,
		assessment: assessmentSlice.reducer,
	},
});
