import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, resetCourses } from '../../features/courses/courseSlice';
import { getCycles } from '../../features/admin/cyclesSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import { Col } from 'reactstrap';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseItem from '../../components/course/CourseItem';
import CycleCourseItem from '../../components/course/CycleCourseItem';
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
			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				Obligatory Courses
			</h1>
			{courses.length ? (
				courses.map((course) => (
					<Col
						key={course._id}
						xs="12"
						sm="12"
						md="11"
						lg="10"
						xl="6"
						className="mb-3 mx-3 animated--grow-in"
					>
						{course.type === 'Undergraduate' && course.isObligatory ? (
							<CourseItem key={course._id} course={course} />
						) : (
							<CourseItem key={course._id} course={course} cycles={cycles} />
						)}
					</Col>
				))
			) : (
				<Notification
					icon={<FontAwesomeIcon icon={faBook} />}
					message={'There are no undergraduate courses available right now !'}
					link={'/course'}
					linkMessage={'Back to Courses'}
				/>
			)}
		</>

		// course.type === 'Undergraduate' && (
		// 		{/* <div className="row mb-3">
		// 				<div className="col-6">
		// 					<h1 className="h3 mb-3 text-gray-800 font-weight-bold">
		// 						Undergraduate Courses
		// 					</h1>
		// 				</div>
		// 				<div className="col-6 mb-3 px-3 d-flex justify-content-end">
		// 					<Link
		// 						to="/course"
		// 						className="btn btn-light-cornflower-blue align-self-center"
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
		// )
		// )}
	);
}
