import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ERROR, INFO, SUCCESS, WARNING } from './strings';

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
});

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

export const finalizeAlert = (callback) => {
	Swal.fire({
		title: 'Finalize Course Statement?',
		text: 'Your current course statement will be finalized if accept!',
		icon: INFO,
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
