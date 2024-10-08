import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ERROR, INFO, MAX_FILE_SIZE, SUCCESS, WARNING } from './strings';

const MySwal = withReactContent(Swal);

export const Toast = MySwal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	customClass: {
		popup: 'colored-toast',
	},
	showConfirmButton: false,
	timer: 4500,
	timerProgressBar: true,
	showCloseButton: true,
});

export const fileSizeAlert = (fileName) => {
	Swal.fire(
		`File '${fileName}' exceeds the maximum size limit (${MAX_FILE_SIZE}MB). Please choose a smaller file!`
	);
};

export const enrollAlert = (callback) => {
	Swal.fire({
		title: 'Enroll to Course?',
		text: 'You will be enrolled to this course if accept!',
		icon: INFO,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Enroll',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};

export const finalizeAlert = (title, text, callback) => {
	Swal.fire({
		title: title,
		text: text,
		icon: WARNING,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Finalize',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};

export const deleteAlert = (callback) => {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: WARNING,
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, Delete',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};

export const downloadAlert = (callback) => {
	Swal.fire({
		title: 'Download PDF?',
		text: 'The requested PDF file will be downloaded if accept!',
		icon: INFO,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Download',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};

export const displayNotification = (title, text, icon) => {
	Toast.fire({
		title,
		text,
		icon,
	});
};

export const displaySuccessNotification = (text) => {
	Toast.fire({
		title: 'Success',
		text,
		icon: SUCCESS,
	});
};

export const displayErrorNotification = (text) => {
	Toast.fire({
		title: 'Something went wrong!',
		text,
		icon: ERROR,
	});
};
