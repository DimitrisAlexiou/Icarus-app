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

export const AssessmentStatus = {
	Finalized: 'Finalized',
	Pending: 'Pending',
};

export const AssessmentType = {
	Assessment: 'Assessment',
	Vaccine: 'Vaccine',
};
