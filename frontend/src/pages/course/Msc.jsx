import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Input } from 'reactstrap';
import { getCourses } from '../../features/courses/courseSlice';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseType } from '../../constants/enums';
import CourseItem from '../../components/course/CourseItem';
import Notification from '../../components/boilerplate/Notification';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import PageButton from '../../components/buttons/PageButton';
import Skeleton from '../../components/boilerplate/Skeleton';
import Search from '../../components/boilerplate/Search';

export default function MscCourses() {
	const {
		courses,
		page,
		numOfPages,
		search,
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		isLoading,
	} = useSelector((state) => state.courses);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	const masterCourses = courses.filter(
		(course) => course.type === CourseType.Master && course.isObligatory
	);

	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col sm="12" xs="12" md="12" lg="9">
					<BreadcrumbNav
						className="animated--grow-in"
						link={'/course'}
						header={'Courses'}
						active={'Master Courses'}
					/>
				</Col>
				<Col className="d-flex justify-content-end">
					<Input
						type="text"
						placeholder={`Search . . .`}
						// value={searchQuery}
						// onChange={handleSearchQueryChange}
					/>
				</Col>
			</Row>

			{/* <Search /> */}

			<Row className="mb-3 animated--grow-in">
				<Col sm="12" xs="12" md="12" lg="9">
					<h3 className="mb-3 text-gray-800 font-weight-bold animated--grow-in">
						Master
					</h3>
				</Col>
				{masterCourses.length ? (
					<Col className="d-flex justify-content-end">
						<h6 className="mb-3 text-gray-400 font-weight-bold animated--grow-in">
							{masterCourses.length} course
							{masterCourses.length > 1 && 's'} found
						</h6>
					</Col>
				) : null}
			</Row>
			{masterCourses.length ? (
				<>
					<Row className="d-flex justify-content-center animated--grow-in">
						{masterCourses.map((course) => (
							<Col
								key={course._id}
								xs="12"
								sm="12"
								md="12"
								lg="5"
								xl="5"
								className="mb-3 mx-auto"
							>
								{isLoading ? (
									<Skeleton />
								) : (
									<CourseItem key={course._id} course={course} />
								)}
							</Col>
						))}
					</Row>
					{numOfPages > 1 ? <PageButton /> : null}
				</>
			) : (
				<Notification
					icon={<FontAwesomeIcon icon={faBook} />}
					message={'There are no Msc courses available right now !'}
					link={'/course'}
					// linkMessage={'Back to Studies'}
				/>
			)}
		</>
	);
}
