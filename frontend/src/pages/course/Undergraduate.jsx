import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCourses } from '../../features/courses/courseSlice';
import { Col, Input, Nav, NavItem, Row } from 'reactstrap';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CourseType } from '../../constants/enums';
import Skeleton from '../../components/boilerplate/Skeleton';
import CourseItem from '../../components/course/CourseItem';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Notification from '../../components/boilerplate/Notification';
import PageButton from '../../components/buttons/PageButton';
import Search from '../../components/boilerplate/Search';

export default function UndergraduateCourses() {
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

	const [Obligatory, setObligatory] = useState(true);
	const [filteredCourses, setFilteredCourses] = useState([]);

	useEffect(() => {
		const filtered = courses.filter(
			(course) =>
				course.type === CourseType.Undergraduate && course.isObligatory === Obligatory
		);
		setFilteredCourses(filtered);
	}, [courses, Obligatory]);

	const handleNavigationClick = (isObligatory) => {
		setObligatory(isObligatory);
	};

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		if (!hasMore || isFetching) return;

	// 		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// 		if (scrollTop + clientHeight >= scrollHeight - 20) {
	// 			dispatch(getCourses());
	// 			dispatch(getCycles());
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [dispatch, hasMore, isFetching]);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col sm="12" xs="12" md="12" lg="9">
					<BreadcrumbNav
						className="animated--grow-in"
						link={'/course'}
						header={'Courses'}
						active={'Undergraduate Courses'}
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
				<Col xs="12" sm="12" md="9" className="text-sm-left text-center">
					<h3 className="mt-sm-0 mt-3 text-gray-800 font-weight-bold animated--grow-in">
						Undergraduate
					</h3>
				</Col>
				<Col
					xs="12"
					sm="12"
					md="3"
					className="mt-sm-0 mt-3 d-flex justify-content-end align-items-center"
				>
					<Nav className="justify-content-between navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
						<div className="navbar-nav">
							<NavItem className="nav-item mx-1">
								<NavLink
									className={`nav-link ${
										Obligatory === true ? 'font-weight-bold text-gray-500' : ''
									}`}
									onClick={() => handleNavigationClick(true)}
								>
									<span className="ml-2">Obligatory</span>
								</NavLink>
							</NavItem>
							<NavItem className="nav-item mx-1">
								<NavLink
									className={`nav-link ${
										Obligatory === false ? 'font-weight-bold text-gray-500' : ''
									}`}
									onClick={() => handleNavigationClick(false)}
								>
									<span className="ml-2">Cycles</span>
								</NavLink>
							</NavItem>
						</div>
					</Nav>
				</Col>
			</Row>

			{filteredCourses.length ? (
				<>
					<Row className="justify-content-center animated--grow-in">
						{filteredCourses.map((course) => (
							<Col
								key={course._id}
								xs="12"
								sm="12"
								md="12"
								lg="5"
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
					{filteredCourses.length ? (
						<Col className="d-flex justify-content-end">
							<h6 className="mb-3 text-gray-400 font-weight-bold animated--grow-in">
								{filteredCourses.length} course
								{filteredCourses.length > 1 && 's'} found
							</h6>
						</Col>
					) : null}
					{numOfPages > 1 ? <PageButton /> : null}
				</>
			) : (
				<Notification
					icon={<FontAwesomeIcon icon={faBook} />}
					message={'There are no Undergraduate courses available right now !'}
					link={'/course'}
					// linkMessage={'Back to Studies'}
				/>
			)}
		</>
	);
}
