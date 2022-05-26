import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses, reset } from '../features/courses/courseSlice';
import { Spinner } from 'reactstrap';
import CourseItem from '../components/CourseItem';

export default function Courses() {
	const { courses, isLoading, isSuccess } = useSelector(
		(state) => state.courses,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	if (isLoading) {
		return (
			<Spinner color="primary" type="grow">
				Loading...
			</Spinner>
		);
	}

	return (
		// isAuthenticated && (
		// 	<>
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<div class="row mb-3">
					<div class="col-6">
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							Courses !
						</h1>
					</div>
					<div class="col-6 mb-3 px-3 d-flex justify-content-end">
						<Link
							to="/course/new"
							// type="button"
							class="btn btn-light-cornflower-blue btn-small align-self-center"
						>
							Add Course
						</Link>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-6 col-lg-4 g-4 mb-3">
						<div className="col">
							{courses.map((course) => (
								<CourseItem key={course._id} course={course} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
		// 	</>
		// )
	);
}
