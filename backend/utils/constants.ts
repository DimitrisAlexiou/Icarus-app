export const passwordRegex =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
export const usernameRegex = /^icsd[0-9]{5}$/;
export const surnameRegex = /^[A-Za-z ]+$/;
export const nameRegex = /^[A-Za-z ]+$/;
export const studentIdRegex = /^321\/\d{7}$/;
export const courseIdRegex = /^321-\d{4,5}$/;
export const masterCourseIdRegex = /^[0-9]{4}$/;
export const courseTitleRegex = /^[A-Za-z\s-]+$/;
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const allowedFileTypes = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/zip',
	'application/gzip',
	'text/plain',
	'image/jpeg',
	'image/png',
];
export const noteFileUploadDestinationPath = '/user/notes/uploads';
export const teachingFileUploadDestination =
	'path/to/upload/directory/Documents';
export const teachingDocumentUploadDestination = 'document/uploads/';
export const STUDENT = 'Student';
export const INSTRUCTOR = 'Instructor';
export const ADMIN = 'Admin';
