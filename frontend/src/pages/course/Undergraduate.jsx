import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, reset } from '../../features/courses/courseSlice';
import CourseItem from '../../components/course/CourseItem';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CycleCourseItem from '../../components/course/CycleCourseItem';
import Notification from '../../components/boilerplate/Notification';
import Spinner from '../../components/boilerplate/Spinner';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function UndergraduateCourses() {
	const { courses, isLoading } = useSelector((state) => state.courses);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav link={'/course'} header={'Courses'} active={'Obligatory Courses'} />
			<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Obligatory Courses</h1>
				{courses.map(
					(course) => (
						// course.isObligatory === true ? (
						// course.hasPrerequisites === true ? (

						<CourseItem key={course._id} course={course} />
					)
					// ) : (
					// null
					// )
					// ) : (
					// 	<Notification
					// 		icon={<FontAwesomeIcon icon={faBook} />}
					// 		message={'There are no undergraduate courses available right now !'}
					// 		link={'/course'}
					// 		linkMessage={'Back to Courses'}
					// 	/>
					// )
				)}
			</div>
		</>

		// course.type === 'Undergraduate' ? (
		// 	<div>
		// 		{/* <div className="row mb-3">
		// 				<div className="col-6">
		// 					<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
		// 						Undergraduate Courses
		// 					</h1>
		// 				</div>
		// 				<div className="col-6 mb-3 px-3 d-flex justify-content-end">
		// 					<Link
		// 						to="/course"
		// 						className="btn btn-light-cornflower-blue btn-small align-self-center"
		// 					>
		// 						Back
		// 					</Link>
		// 				</div>
		// 			</div> */}
		// 		{/* <div className="row d-flex justify-content-center">
		// 			{courses.map((course) =>
		// 				course.isObligatory === true ? (
		// 					<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
		// 						<div className="col">
		// 							<h5 className="h5 mb-4 text-gray-600">
		// 								Obligatory Courses
		// 							</h5>
		// 							<CourseItem key={course._id} course={course} />
		// 						</div>
		// 					</div>
		// 				) : (
		// 					<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
		// 						<div className="col">
		// 							<h5 className="h5 mb-4 text-gray-600">Cycles</h5>
		// 							<CycleCourseItem key={course._id} course={course} />
		// 						</div>
		// 					</div>
		// 				)
		// 			)}
		// 		</div> */}
		// 		<div className="row d-flex justify-content-center">
		// 			<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
		// 				<div className="col">
		// 					<h5 className="h5 mb-4 text-gray-600">Obligatory Courses</h5>
		// 					<CourseItem key={course._id} course={course} />
		// 				</div>
		// 			</div>
		// 			<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
		// 				<div className="col">
		// 					<h5 className="h5 mb-4 text-gray-600">Cycles</h5>
		// 					<CycleCourseItem key={course._id} course={course} />
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// )
		// 	: (
		// 	<Notification
		// 		icon={<FontAwesomeIcon icon={faBook} />}
		// 		message={'There are no undergraduate courses available right now !'}
		// 		link={'/course'}
		// 		linkMessage={'Back to Courses'}
		// 	/>
		// )
		// )}
		// </>
	);
}
