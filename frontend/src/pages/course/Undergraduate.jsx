import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, resetCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import { Col, Row } from 'reactstrap';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseItem from '../../components/course/CourseItem';
import Spinner from '../../components/boilerplate/Spinner';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Notification from '../../components/boilerplate/Notification';

export default function UndergraduateCourses() {
	const {
		courses,
		isLoading,
		isError: isCourseError,
		message: courseMessage,
	} = useSelector((state) => state.courses);
	const {
		cycles,
		isLoading: cyclesIsLoading,
		isError: cyclesIsError,
		message: cyclesMessage,
	} = useSelector((state) => state.cycles);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isCourseError) {
			if (courseMessage !== 'Seems like there are no courses!') {
				Toast.fire({
					title: 'Something went wrong!',
					text: courseMessage,
					icon: 'error',
				});
			}
		}
		if (cyclesIsError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: cyclesMessage,
				icon: 'error',
			});
		}
		dispatch(resetCourses());
	}, [dispatch, isCourseError, cyclesIsError, courseMessage, cyclesMessage]);

	useEffect(() => {
		dispatch(getCourses());
		dispatch(getCycles());
	}, [dispatch]);

	if (isLoading || cyclesIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/course'}
				header={'Courses'}
				active={'Obligatory Courses'}
			/>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Obligatory Courses
			</h3>
			{courses.length ? (
				<Row className="justify-content-center animated--grow-in">
					{courses.map((course) => (
						<Col
							key={course._id}
							xs="12"
							sm="12"
							md="12"
							lg="5"
							className="mb-3 mx-auto"
						>
							{course.type === 'Undergraduate' && course.isObligatory ? (
								<CourseItem key={course._id} course={course} />
							) : (
								<CourseItem key={course._id} course={course} cycles={cycles} />
							)}
						</Col>
					))}
				</Row>
			) : (
				<Notification
					icon={<FontAwesomeIcon icon={faBook} />}
					message={'There are no undergraduate courses available right now !'}
					link={'/course'}
					linkMessage={'Back to Courses'}
				/>
			)}
		</>
	);
}
