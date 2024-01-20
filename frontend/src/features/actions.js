import { createAction } from '@reduxjs/toolkit';

export const RESET = createAction('app/reset');

export const GET_TEACHINGS = createAction('teaching/get_teachings');
export const GET_INSTRUCTOR_TEACHINGS = createAction(
	'teaching/get_instructor_teachings'
);
export const GET_TEACHING = createAction('teaching/get_teaching');
export const GET_TEACHING_BY_COURSE_ID = createAction(
	'teaching/get_teaching_by_courseId'
);
export const UPDATE_TEACHING = createAction('teaching/update_teaching');
export const DELETE_TEACHING = createAction('teaching/delete_teaching');
export const DELETE_TEACHINGS = createAction('teaching/delete_teachings');
export const ASSIGN_THEORY_INSTRUCTORS = createAction(
	'teaching/assign_theory_instructors'
);
export const ASSIGN_LAB_INSTRUCTORS = createAction(
	'teaching/assign_lab_instructors'
);
export const UNASSIGN_THEORY_INSTRUCTORS = createAction(
	'teaching/unassign_theory_instructors'
);
export const UNASSIGN_LAB_INSTRUCTORS = createAction(
	'teaching/unassign_lab_instructors'
);
export const ASSIGN_THEORY_GRADING = createAction(
	'teaching/assign_theory_grading'
);
export const ASSIGN_LAB_GRADING = createAction('teaching/assign_lab_grading');
export const UNASSIGN_THEORY_GRADING = createAction(
	'teaching/unassign_theory_grading'
);
export const UNASSIGN_LAB_GRADING = createAction(
	'teaching/unassign_lab_grading'
);

export const GET_COURSES = createAction('course/get_courses');
export const GET_COURSE = createAction('course/get_course');
export const UPDATE_COURSE = createAction('course/update_course');
export const DELETE_COURSE = createAction('course/delete_course');
export const DELETE_COURSES = createAction('course/delete_courses');
export const CREATE_COURSE = createAction('course/create_course');
export const ACTIVATE_COURSE = createAction('course/activate_course');
export const DEACTIVATE_COURSE = createAction('course/deactivate_course');
export const ENROLL_COURSE = createAction('course/enroll_course');
export const UNENROLL_COURSE = createAction('course/unenroll_course');
export const GET_ENROLLED_COURSES = createAction('course/get_enrolled_courses');

export const CREATE_STATEMENT = createAction('course/create_statement');
export const FINALIZE_STATEMENT = createAction('course/finalize_statement');
export const GET_STUDENT_STATEMENTS = createAction(
	'course/get_student_statements'
);
export const GET_STATEMENT = createAction('course/get_statement');
export const UPDATE_STATEMENT = createAction('course/update_statement');
export const DELETE_STATEMENT = createAction('course/delete_statement');
export const GET_STATEMENTS = createAction('course/get_statements');
export const DELETE_STATEMENTS = createAction('course/delete_statements');

export const GET_NOTES = createAction('note/get_notes');
export const GET_USER_NOTES = createAction('note/get_user_notes');
export const GET_NOTE = createAction('note/get_note');
export const CREATE_NOTE = createAction('note/create_note');
export const UPDATE_NOTE = createAction('note/update_note');
export const DELETE_NOTE = createAction('note/delete_note');
export const DELETE_NOTES = createAction('note/delete_notes');
export const DELETE_USER_NOTES = createAction('note/delete_user_notes');
export const UPDATE_IMPORTANCE = createAction('note/update_importance');
export const DELETE_CATEGORY = createAction('note/delete_category');

export const CREATE_GENERAL_REVIEW = createAction(
	'review/create_general_review'
);
export const UPDATE_GENERAL_REVIEW = createAction(
	'review/update_general_review'
);
export const GET_GENERAL_REVIEW = createAction('review/get_general_review');
export const DELETE_GENERAL_REVIEW = createAction(
	'review/delete_general_review'
);
export const GET_USER_GENERAL_REVIEWS = createAction(
	'review/get_user_general_reviews'
);
export const DELETE_USER_GENERAL_REVIEWS = createAction(
	'review/delete_user_general_reviews'
);
export const GET_GENERAL_REVIEWS = createAction('review/get_general_reviews');
export const DELETE_GENERAL_REVIEWS = createAction(
	'review/delete_general_reviews'
);

export const CREATE_INSTRUCTOR_REVIEW = createAction(
	'review/create_instructor_review'
);
export const UPDATE_INSTRUCTOR_REVIEW = createAction(
	'review/update_instructor_review'
);
export const GET_INSTRUCTOR_REVIEW = createAction(
	'review/get_instructor_review'
);
export const DELETE_INSTRUCTOR_REVIEW = createAction(
	'review/delete_instructor_review'
);
export const GET_USER_INSTRUCTOR_REVIEWS = createAction(
	'review/get_user_instructor_reviews'
);
export const DELETE_USER_INSTRUCTOR_REVIEWS = createAction(
	'review/delete_user_instructor_reviews'
);
export const GET_INSTRUCTOR_REVIEWS = createAction(
	'review/get_instructor_reviews'
);
export const DELETE_INSTRUCTOR_REVIEWS = createAction(
	'review/delete_instructor_reviews'
);

export const CREATE_TEACHING_REVIEW = createAction(
	'review/create_teaching_review'
);
export const UPDATE_TEACHING_REVIEW = createAction(
	'review/update_teaching_review'
);
export const GET_TEACHING_REVIEW = createAction('review/get_teaching_review');
export const DELETE_TEACHING_REVIEW = createAction(
	'review/delete_teaching_review'
);
export const GET_USER_TEACHING_REVIEWS = createAction(
	'review/get_user_teaching_reviews'
);
export const DELETE_USER_TEACHING_REVIEWS = createAction(
	'review/delete_user_teaching_reviews'
);
export const GET_TEACHING_REVIEWS = createAction('review/get_teaching_reviews');
export const DELETE_TEACHING_REVIEWS = createAction(
	'review/delete_teaching_reviews'
);

export const GET_USER_EVENTS = createAction('event/get_user_events');
export const CREATE_EVENT = createAction('event/create_event');
export const UPDATE_EVENT = createAction('event/update_event');
export const DELETE_EVENT = createAction('event/delete_event');
export const GET_EVENTS = createAction('event/get_events');
export const DELETE_EVENTS = createAction('event/delete_events');

export const REGISTER = createAction('auth/register');
export const LOGIN = createAction('auth/login');
export const LOGOUT = createAction('auth/logout');
export const FORGOT_PASSWORD = createAction('auth/forgot_password');
export const CHANGE_PASSWORD = createAction('user/profile/change_password');
export const UPDATE_PROFILE = createAction('user/profile/update_profile');
export const GET_PROFILE = createAction('user/profile/get_profile');

export const GET_USERS = createAction('user/get_users');
export const GET_STUDENTS = createAction('user/get_students');
export const GET_INSTRUCTORS = createAction('user/get_instructors');
export const ADD_USER = createAction('user/add_user');
export const UPDATE_USER = createAction('user/update_user');
export const ACTIVATE_USER = createAction('user/activate_user');
export const DEACTIVATE_USER = createAction('user/deactivate_user');
export const DELETE_USER = createAction('user/delete_user');
export const DELETE_USERS = createAction('user/delete_users');

export const DEFINE_ASSESSMENT = createAction(
	'admin/configuration/define_assessment'
);
export const GET_ASSESSMENT = createAction(
	'admin/configuration/get_assessment'
);
export const UPDATE_ASSESSMENT = createAction(
	'admin/configuration/update_assessment'
);
export const DELETE_ASSESSMENT = createAction(
	'admin/configuration/delete_assessment'
);

export const DEFINE_REVIEW = createAction('admin/configuration/define_review');
export const GET_REVIEW = createAction('admin/configuration/get_review');
export const UPDATE_REVIEW = createAction('admin/configuration/update_review');
export const DELETE_REVIEW = createAction('admin/configuration/delete_review');

export const DEFINE_DEGREE_RULES = createAction(
	'admin/configuration/define_degree_rules'
);
export const GET_DEGREE_RULES = createAction(
	'admin/configuration/get_degree_rules'
);
export const UPDATE_DEGREE_RULES = createAction(
	'admin/configuration/update_degree_rules'
);
export const DELETE_DEGREE_RULES = createAction(
	'admin/configuration/delete_degree_rules'
);

export const DEFINE_CYCLES = createAction('admin/configuration/define_cycles');
export const UPDATE_CYCLES = createAction('admin/configuration/update_cycles');
export const GET_CYCLE = createAction('admin/configuration/get_cycle');
export const GET_CYCLES = createAction('admin/configuration/get_cycles');
export const DELETE_CYCLE = createAction('admin/configuration/delete_cycle');
export const DELETE_CYCLES = createAction('admin/configuration/delete_cycles');

export const DEFINE_SEMESTER = createAction(
	'admin/configuration/define_semester'
);
export const UPDATE_SEMESTER = createAction(
	'admin/configuration/update_semester'
);
export const GET_SEMESTER = createAction('admin/configuration/get_semester');
export const DELETE_SEMESTER = createAction(
	'admin/configuration/delete_semester'
);
export const GET_SEMESTERS = createAction('admin/configuration/get_semesters');

export const DEFINE_MASTER = createAction('admin/configuration/define_master');
export const UPDATE_MASTER = createAction('admin/configuration/update_master');
export const GET_MASTER = createAction('admin/configuration/get_master');
export const GET_MASTERS = createAction('admin/configuration/get_masters');
export const DELETE_MASTER = createAction('admin/configuration/delete_master');
export const DELETE_MASTERS = createAction(
	'admin/configuration/delete_masters'
);

export const GET_ANNOUNCEMENT = createAction('announcement/get_announcement');
export const CREATE_ANNOUNCEMENT = createAction(
	'announcement/create_announcement'
);
export const UPDATE_ANNOUNCEMENT = createAction(
	'announcement/update_announcement'
);
export const DELETE_TEACHING_ANNOUNCEMENT = createAction(
	'announcement/delete_teaching_announcement'
);
export const GET_INSTRUCTOR_ANNOUNCEMENTS = createAction(
	'announcement/get_instructor_announcements'
);
export const DELETE_INSTRUCTOR_ANNOUNCEMENTS = createAction(
	'announcement/delete_instructor_announcements'
);
export const GET_TEACHING_ANNOUNCEMENTS = createAction(
	'announcement/get_teaching_announcements'
);
export const DELETE_TEACHING_ANNOUNCEMENTS = createAction(
	'announcement/delete_teaching_announcements'
);
export const DELETE_ANNOUNCEMENTS = createAction(
	'announcement/delete_announcements'
);
export const GET_ANNOUNCEMENTS = createAction('announcement/get_announcements');
export const DOWNLOAD_ENROLLED_STUDENTS_PDF = createAction(
	'teaching/download_enrolled_students_pdf'
);
