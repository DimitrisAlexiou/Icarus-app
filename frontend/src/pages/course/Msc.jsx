import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getCourses } from '../../features/courses/courseSlice';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseItem from '../../components/course/CourseItem';
import Notification from '../../components/boilerplate/Notification';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';

export default function MscCourses() {
	const { courses, isLoading, isError } = useSelector((state) => state.courses);
	const {
		cycles,
		isLoading: cyclesIsLoading,
		isError: cyclesIsError,
		message: cyclesMessage,
	} = useSelector((state) => state.cycles);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/course'}
				header={'Courses'}
				active={'Master Courses'}
			/>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Master Courses
			</h3>
			{courses.length ? (
				<Row className="d-flex justify-content-center animated--grow-in">
					{courses.map((course) => (
						<Col
							key={course._id}
							xs="12"
							sm="12"
							md="12"
							lg="5"
							xl="5"
							className="mb-3 mx-auto"
						>
							{course.type === 'Master' && course.isObligatory ? (
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
					message={'There are no Msc courses available right now !'}
					link={'/course'}
					linkMessage={'Back to Courses'}
				/>
			)}
		</>
	);
}
