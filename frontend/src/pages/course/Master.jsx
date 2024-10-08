import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Card, CardText, CardTitle, Col, Input, Nav, Row } from 'reactstrap';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaStudiovinari } from 'react-icons/fa';
import useCourses from '../../hooks/course/useCourses';
import useMasters from '../../hooks/course/useMasters';
import Skeleton from '../../components/boilerplate/Skeleton';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import CourseItem from '../../components/course/CourseItem';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Notification from '../../components/boilerplate/Notification';
import PageButton from '../../components/buttons/PageButton';
import BackButton from '../../components/buttons/BackButton';
import CarouselComponent from '../../components/Carousel';
import Search from '../../components/form/Search';

export default function Master() {
	const { user } = useSelector((state) => state.auth);
	const { masterId } = useParams();
	const { numOfPages, totalCourses, isLoading, courses } = useCourses();
	const { master } = useMasters(masterId);

	return (
		<>
			{user ? (
				<>
					<Row>
						<Col sm="12" xs="12" md="12" lg="9">
							<BreadcrumbNav
								link={'/course/msc'}
								header={'Master'}
								active={master.title}
							/>
						</Col>
						<Col className="animated--grow-in d-flex justify-content-end">
							<Input
								type="text"
								placeholder={`Search . . .`}
								// value={searchQuery}
								// onChange={handleSearchQueryChange}
							/>
						</Col>
					</Row>

					{/* <Search /> */}

					<Row className="mb-4 animated--grow-in">
						<Col className="text-sm-left text-center">
							<h3 className="mt-sm-0 mt-md-3 mt-lg-0 mt-3 text-gray-800 font-weight-bold animated--grow-in">
								{master.title}
							</h3>
						</Col>
						{courses.length ? (
							<Col
								xl="3"
								lg="2"
								md="2"
								sm="12"
								className="mt-sm-0 mt-md-3 mt-lg-0 d-flex justify-content-end"
							>
								<h6 className="text-gray-400 font-weight-bold">
									{totalCourses} course
									{totalCourses > 1 && 's'}
								</h6>
							</Col>
						) : null}
					</Row>

					{courses.length ? (
						<>
							<Row className="justify-content-center animated--grow-in">
								{courses.map((course) => (
									<Col
										key={course._id}
										xs="12"
										sm="12"
										md="12"
										lg="9"
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
							message={`There are no ${master.title} courses available right now !`}
							link={'/course/msc'}
						/>
					)}
				</>
			) : (
				<div className="bg-gradient-primary">
					<div className="container">
						<Row className="justify-content-left">
							<Nav className="logo">
								<NavLink
									className="sidebar-brand d-flex align-items-center mt-3"
									to="/"
								>
									<div className="logo-brand-icon rotate-15">
										<FaStudiovinari />
									</div>
									<span
										style={{ fontSize: '1.3rem' }}
										className="sidebar-brand-text mx-3 mt-3"
									>
										Icarus
									</span>
								</NavLink>
							</Nav>
						</Row>
						<Row className="justify-content-center">
							<Col xl="10" lg="12" md="10" sm="12" xs="12">
								<div className="card o-hidden border-0 shadow-lg my-4 animated--grow-in">
									<div className="card-body p-4">
										<Row className="mb-4 animated--grow-in">
											<Col>
												<h3 className="text-gray-800 font-weight-bold">
													{master.title}
												</h3>
											</Col>
										</Row>

										{isLoading ? (
											<Spinner card />
										) : courses.length ? (
											<>
												<Row className="justify-content-center animated--grow-in">
													<Card body color="success">
														<CarouselComponent
															objects={courses}
															renderItem={(course) => (
																<>
																	<CardTitle
																		style={{
																			textAlign: 'justify',
																			fontWeight: '700',
																			fontSize: 15,
																		}}
																		className="text-light-cornflower-blue mb-2"
																	>
																		{course.title}
																	</CardTitle>
																	<CardText>
																		<small
																			className="text-muted"
																			style={{
																				textAlign: 'justify',
																				fontWeight: '700',
																				fontSize: 13,
																				overflow: 'hidden',
																				textOverflow: 'ellipsis',
																				display: '-webkit-box',
																				lineHeight: '20px',
																				maxHeight: '80px',
																				WebkitLineClamp: 3,
																				WebkitBoxOrient: 'vertical',
																			}}
																		>
																			{course.description}
																		</small>
																	</CardText>
																	<Row>
																		<Col>
																			<CardText
																				style={{
																					textAlign: 'justify',
																					fontWeight: '600',
																					fontSize: 11,
																				}}
																			>
																				{course.courseId}
																			</CardText>
																		</Col>
																		<Col className="d-flex justify-content-end">
																			<CardText
																				style={{
																					textAlign: 'justify',
																					fontWeight: '600',
																					fontSize: 11,
																				}}
																			>
																				<small
																					className="text-muted pill-label"
																					style={{
																						textAlign: 'justify',
																						fontWeight: '700',
																						fontSize: 10,
																					}}
																				>
																					ECTS
																				</small>
																				{course.ects}
																			</CardText>
																		</Col>
																		<Col className="d-flex justify-content-end">
																			<CardText
																				style={{
																					textAlign: 'justify',
																					fontWeight: '600',
																					fontSize: 11,
																				}}
																			>
																				<small
																					className="text-muted pill-label"
																					style={{
																						textAlign: 'justify',
																						fontWeight: '700',
																						fontSize: 10,
																					}}
																				>
																					Year
																				</small>
																				{course.year}
																			</CardText>
																		</Col>
																	</Row>
																</>
															)}
														/>
													</Card>
												</Row>
												<Row className="mt-3 animated--grow-in">
													<Col>
														<BackButton url={'/studies'} />
													</Col>
													<Col className="d-flex justify-content-end">
														<h6 className="text-gray-400 font-weight-bold">
															{totalCourses.length} course
															{totalCourses.length > 1 && 's'}
														</h6>
													</Col>
													{numOfPages > 1 ? <PageButton /> : null}
												</Row>
											</>
										) : (
											<Notification
												icon={<FontAwesomeIcon icon={faBook} />}
												message={`There are no ${master.title} courses available right now !`}
												link={user ? '/course/msc' : '/studies'}
											/>
										)}
									</div>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			)}
		</>
	);
}
