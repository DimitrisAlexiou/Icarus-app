import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Toast = MySwal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	customClass: {
		popup: 'colored-toast',
	},
	showConfirmButton: false,
	timer: 3500,
	timerProgressBar: true,
});

export const enrollAlert = (callback) => {
	Swal.fire({
		title: 'Enroll to Course?',
		text: 'You will be enrolled to this course if accept!',
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Enroll',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};

export const deleteAlert = (callback) => {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, Delete',
	}).then((result) => {
		if (result.isConfirmed) callback();
	});
};
