import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';
import { resetInstructorReview } from '../../features/reviews/instructorReviewSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import InstructorReviewForm from '../../components/review/InstructorReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import CarouselComponent from '../../components/Carousel';

export default function InstructorReview() {
	const {
		isError,
		isSuccess,
		isLoading: isInstructorReviewLoading,
		message,
	} = useSelector((state) => state.instructorReview);
	const { semester, isLoading: isSemesterLoading } = useSelector((state) => state.semesters);
	const { user } = useSelector((state) => state.auth);

	const [selectedCourse, setSelectedCourse] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError)
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});

		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Review submitted!',
				icon: 'success',
			});
			navigate('/review');
		}
		dispatch(getSemester());
		dispatch(resetInstructorReview());
	}, [dispatch, isError, isSuccess, message, navigate]);

	if (isInstructorReviewLoading || isSemesterLoading) return <Spinner />;

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'Instructor Review'}
			/>

			<Row className="mb-5 animated--grow-in">
				<Col>
					<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
						Instructor Review
					</h3>
				</Col>
				{semester ? (
					<Col xl="3" md="6" className="text-right">
						<Card className="card-note">
							<CardBody>
								<CardTitle>
									<Col>
										<h6> Current Semester</h6>
									</Col>
									<Col>
										<h3>{semester.type}</h3>
									</Col>
								</CardTitle>
							</CardBody>
						</Card>
					</Col>
				) : null}
			</Row>

			<h6 className="mb-4 animated--grow-in" style={{ fontWeight: 700, textAlign: 'center' }}>
				Enrolled courses
			</h6>
			{user.user.student.enrolledCourses.length ? (
				<CarouselComponent
					objects={user.user.student.enrolledCourses}
					title={'title'}
					description={'isObligatory'}
					subtext={'courseId'}
				/>
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					You have no enrolled courses available.
				</span>
			)}

			{selectedCourse ? (
				<Row className="justify-content-center animated--grow-in">
					<Col sm="12" md="10" lg="8" xl="8">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Leave your review
								</h6>
							</div>
							<div className="card-body">
								<InstructorReviewForm />
							</div>
						</div>
					</Col>
				</Row>
			) : user.user.student.enrolledCourses.length ? (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					Select a course to review.
				</span>
			) : null}
		</>
	);
}
