import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Toast } from '../../constants/sweetAlertNotification';
import { UserType } from '../../constants/enums';
import CustomSpinner from '../../components/boilerplate/Spinner';
import UpdateProfileForm from '../../components/auth/UpdateProfileForm';

export default function ProfileUpdateCard() {
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Profile updated!',
				icon: 'success',
			});
		}
	}, [isError, isSuccess, message]);

	if (isLoading) return <CustomSpinner />;

	return (
		<>
			<div className="profile_card  animated--grow-in">
				<div className="card-body">
					{user.user.type === UserType.student ? (
						<>
							<Row>
								<Col md="5">
									<label>
										<b>Student Type</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.studentType}
									</p>
								</Col>
								<Col md="4">
									<label>
										<b>Entrance Year</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.entranceYear}
									</p>
								</Col>
								<Col md="3">
									<label>
										<b>Student ID</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.student.studentId}
									</p>
								</Col>
							</Row>
						</>
					) : user.user.type === UserType.instructor ? (
						<>
							<Row>
								<Col md="4">
									<label>
										<b>Entrance Year</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.instructor.instructorEntranceYear}
									</p>
								</Col>
								<Col md="3">
									<label>
										<b>Faculty</b>
									</label>
									<p style={{ textAlign: 'justify' }}>
										{user.user.instructor.facultyType}
									</p>
								</Col>
							</Row>
						</>
					) : null}
					<UpdateProfileForm user={user} />
				</div>
			</div>
		</>
	);
}
