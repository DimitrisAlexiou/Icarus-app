import { ADMIN, INSTRUCTOR, STUDENT } from './strings';

export const UserType = {
	student: STUDENT,
	instructor: INSTRUCTOR,
	admin: ADMIN,
};

export const FacultyType = {
	DEP: 'DEP',
	EDIP: 'EDIP',
	ETEP: 'ETEP',
};

export const Degree = {
	Assistant: 'Assistant',
	Associate: 'Associate',
	Professor: 'Professor',
};

export const CourseType = {
	Undergraduate: 'Undergraduate',
	Master: 'Master',
	Mixed: 'Mixed',
};

export const CourseObligation = {
	Obligatory: 'Obligatory',
	Optional: 'Optional',
};

export const PrerequisiteType = {
	Hard: 'Hard',
	Soft: 'Soft',
};

export const StudentType = {
	Undergraduate: 'Undergraduate',
	Master: 'Master',
	PhD: 'PhD',
};

export const SemesterType = {
	Winter: 'Winter',
	Spring: 'Spring',
	Any: 'Any',
};

export const ExaminationType = {
	Progress: 'Progress',
	Final: 'Final',
	Exercise: 'Exercise',
	Project: 'Project',
};

export const Examination = {
	Theory: 'Theory',
	Lab: 'Lab',
};

export const AssessmentStatus = {
	Finalized: 'Finalized',
	Pending: 'Pending',
};

export const GradingStatus = {
	Graded: 'Graded',
	Pending: 'Pending',
};

export const AssessmentType = {
	Assessment: 'Assessment',
	Vaccine: 'Vaccine',
};

export const DoughnutType = {
	Period: 'Period',
	General: 'General',
};

export const MyGradesMenu = {
	Recent: 'Recent Grades',
	Grades: 'Grades',
	Thesis: 'Thesis',
};

export const ProfileMenu = {
	Overview: 'overview',
	Security: 'security',
};

export const PortfolioMenu = {
	Documents: 'Documents',
	Announcements: 'Announcements',
	Exercises: 'Exercises',
	Calendar: 'Calendar',
	Messages: 'Messages',
	Chat: 'Chat',
};

export const ExamPeriods = {
	FEB: 'FEB',
	JUN: 'JUN',
	SEP: 'SEP',
};
