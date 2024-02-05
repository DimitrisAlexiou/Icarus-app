export const passwordRegex =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
export const nameRegex = /^[A-Za-z ]+$/;
export const surnameRegex = /^[A-Za-z ]+$/;
export const usernameRegex = /^icsd[0-9]{5}$/;
export const studentIdRegex = /^321\/\d{7}$/;
export const eventTitleRegex = /^[A-Za-z0-9 ]+$/;
export const courseIdRegex = /^321-\d{4,5}$/;
export const masterCourseIdRegex = /^[0-9]{4}$/;
export const courseTitleRegex = /^[A-Za-z\s-]+$/;
export const noteTitleRegex = /^[A-Za-z0-9 ]+$/;
export const directoryNameRegex = /^[A-Za-z\s-]+$/;
