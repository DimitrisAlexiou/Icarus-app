import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { reset } from '../../features/auth/authSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import CustomSpinner from '../boilerplate/Spinner';
import ChangePasswordForm from '../auth/ChangePasswordForm';

export default function ChangePassword() {
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError)
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});

		if (isSuccess)
			Toast.fire({
				title: 'Success',
				text: 'Password updated!',
				icon: 'success',
			});

		dispatch(reset());
	}, [dispatch, isError, isSuccess, message]);

	if (isLoading) return <CustomSpinner />;

	return (
		<>
			<h5 className="text-gray-800 font-weight-bold animated--grow-in mb-4 mx-4">
				Change Password
			</h5>

			<Row className="d-flex justify-content-center">
				<Col xl="8" lg="8" md="10" sm="12" xs="12">
					<div className="profile_card animated--grow-in">
						<div className="card-body">
							<ChangePasswordForm />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
