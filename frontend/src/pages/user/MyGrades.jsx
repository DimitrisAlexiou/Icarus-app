import { useState } from 'react';
import { Row, Col, NavItem, NavLink } from 'reactstrap';
import {
	faBarcode,
	faChartSimple,
	faCircleNodes,
	faDiagramPredecessor,
	faPersonChalkboard,
	faScroll,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCircleDot,
	faClock,
	faCopy,
	faFileLines,
	faLightbulb,
	faCircle,
} from '@fortawesome/free-regular-svg-icons';
import { academicSemesters, getOrdinalSemesters } from '../../utils/semesters';
import { myGradesCategories } from '../../utils/NavigationLinks';
import DoughnutChart from '../../components/charts/Doughnut';

export default function MyGrades({ user }) {
	const [selectedCategory, setSelectedCategory] = useState('Recent Grades');

	const passedCourses = ['Mobile and Wireless Networks Security'];

	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<h3 className="text-gray-800 font-weight-bold">My Grades</h3>
			</Row>

			<Row className="mb-4 animated--grow-in justify-content-center">
				<Col
					md="12"
					lg="11"
					xl="10"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
				>
					<Row className="d-flex justify-content-center">
						{myGradesCategories.map((category) => {
							const { id, text } = category;
							return (
								<Col key={id} className="text-center" xs="auto">
									<NavItem className="nav-item mx-1">
										<NavLink
											style={{ fontSize: '0.9rem' }}
											className={`nav-link ${
												selectedCategory === text
													? 'font-weight-bold text-gray-600 clickable'
													: 'text-gray-500 clickable'
											}`}
											onClick={() => {
												setSelectedCategory(text);
											}}
										>
											<span>{text}</span>
										</NavLink>
									</NavItem>
								</Col>
							);
						})}
					</Row>
				</Col>
			</Row>

			{selectedCategory === 'Recent Grades' ? (
				<Row className="animated--grow-in">
					<Col xl="3">
						<div className="profile_card">
							<div className="card-body">
								<Row className="mb-2 d-flex flex-column align-items-center text-center">
									<Col>
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 18,
											}}
										>
											Period Statistics
										</small>
										<small
											className="text-muted"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 11,
											}}
										>
											ΦΕΒΡΟΥΑΡΙΟΣ 2022-2023
										</small>
									</Col>
									<Col className="mt-2 d-flex flex-column align-items-center text-center">
										<div style={{ width: '210px', height: '210px' }}>
											<DoughnutChart
												user={user}
												labels={['Failed', 'Passed']}
												label={'Courses'}
												colors={['rgb(255, 99, 132)', 'rgb(54, 162, 235)']}
											/>
										</div>
									</Col>
								</Row>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCopy}
													/>
													Registered Courses
												</h6>
												<span className="text-secondary">2</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												throughout the exam period
											</small>
										</Row>
									</li>
								</ul>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCircleCheck}
													/>
													Passed Courses
												</h6>
												<span className="text-secondary">1</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												throughout the exam period
											</small>
										</Row>
									</li>
								</ul>
								<hr />
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faChartSimple}
													/>
													Grade Average
												</h6>
												<span className="text-secondary">6.31</span>
											</Col>
										</Row>
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col xl="9">
						<div className="profile_card">
							<div className="card-body">
								<Row className="mb-2 d-flex flex-column align-items-center text-center">
									<Col>
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 18,
											}}
										>
											Recent Grades
										</small>
									</Col>
								</Row>
								{passedCourses.map((course) => (
									<div key={course}>
										<ul className="list-group list-group-flush">
											<li className="list-group-item">
												<Row>
													<Col className="d-flex justify-content-between flex-wrap">
														<h6
															className="text-gray-600"
															style={{
																fontWeight: '600',
															}}
														>
															<FontAwesomeIcon
																className="mr-2 text-gray-600"
																icon={faFileLines}
															/>
															Mobile and Wireless Networks Security
														</h6>
														<span className="text-secondary">7.5</span>
													</Col>
													<Row className="mt-2">
														<Col xs="12" sm="12" md="4" lg="3" xl="2">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 13,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faBarcode}
																/>
																321-10750
															</small>
														</Col>
														<Col>
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 13,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faPersonChalkboard}
																/>
																ΓΕΩΡΓΙΟΣ ΚΑΜΠΟΥΡΑΚΗΣ, ΓΕΩΡΓΙΟΣ ΣΤΕΡΓΙΟΠΟΥΛΟΣ
																{/* {user.user.name.toUpperCase()} */}
															</small>
														</Col>
													</Row>
												</Row>
											</li>
										</ul>
										<hr />
									</div>
								))}
							</div>
						</div>
					</Col>
				</Row>
			) : selectedCategory === 'Transcript of Records' ? (
				<Row className="animated--grow-in">
					<Col xl="3">
						<div className="profile_card">
							<div className="card-body">
								<Row className="mb-2 d-flex flex-column align-items-center text-center">
									<Col>
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 18,
											}}
										>
											Courses
										</small>
									</Col>
									<Col className="mt-2 d-flex flex-column align-items-center text-center">
										<div style={{ width: '210px', height: '210px' }}>
											<DoughnutChart
												user={user}
												labels={['Registered - Passed', 'Passed']}
												label={'Courses'}
												colors={['rgb(255, 99, 132)', 'rgb(54, 162, 235)']}
											/>
										</div>
									</Col>
								</Row>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCopy}
													/>
													Registered Courses
												</h6>
												<span className="text-secondary">67</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												throughout the course of study
											</small>
										</Row>
									</li>
								</ul>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCircleCheck}
													/>
													Passed Courses
												</h6>
												<span className="text-secondary">54</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												counting towards degree
											</small>
										</Row>
									</li>
								</ul>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCircleNodes}
													/>
													Registered ECTS
												</h6>
												<span className="text-secondary">357</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												throughout the course of study
											</small>
										</Row>
									</li>
								</ul>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faLightbulb}
													/>
													Passed ECTS
												</h6>
												<span className="text-secondary">267</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												counting towards degree
											</small>
										</Row>
									</li>
								</ul>
								<hr />
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faChartSimple}
													/>
													Weighted Grade Average
												</h6>
												<span className="text-secondary">6.31</span>
											</Col>
											<small
												className="text-muted"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												Grade Average
											</small>
										</Row>
									</li>
								</ul>
							</div>
						</div>
					</Col>
					<Col xl="9">
						<div className="profile_card">
							<div className="card-body">
								<Row className="mb-3 d-flex flex-column align-items-center text-center">
									<Col>
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 18,
											}}
										>
											Transcript of records
										</small>
									</Col>
								</Row>
								{academicSemesters.map((semester) => (
									<div className="mb-3" key={semester}>
										<Row className="mb-1">
											<Col>
												<h6
													className="text-gray-700"
													style={{
														fontWeight: '600',
														fontSize: 18,
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faCircleDot}
													/>
													{getOrdinalSemesters(semester)} Semester
												</h6>
											</Col>
										</Row>
										<ul className="list-group list-group-flush">
											<li className="list-group-item">
												<Row>
													<Col className="d-flex justify-content-between flex-wrap">
														<h6
															className="text-gray-600"
															style={{
																fontWeight: '500',
															}}
														>
															<FontAwesomeIcon
																className="mr-2 text-gray-600"
																icon={faFileLines}
															/>
															Mobile and Wireless Networks Security
														</h6>
														<span className="text-secondary">7.5</span>
													</Col>
													<Row className="mt-2">
														<Col xs="12" sm="12" md="3" lg="3" xl="2">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faBarcode}
																/>
																321-10750
															</small>
														</Col>
														<Col xs="12" sm="12" md="5" lg="6" xl="4">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faPersonChalkboard}
																/>
																ΓΕΩΡΓΙΟΣ ΚΑΜΠΟΥΡΑΚΗΣ, ΓΕΩΡΓΙΟΣ ΣΤΕΡΓΙΟΠΟΥΛΟΣ
																{/* {user.user.name.toUpperCase()} */}
															</small>
														</Col>
														<Col xs="12" sm="12" md="4" lg="3" xl="3">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faClock}
																/>
																ΦΕΒΡ 2017-2018
															</small>
														</Col>
														<Col xs="12" sm="12" md="4" lg="3" xl="3">
															<small
																className="text-muted"
																style={{
																	textAlign: 'justify',
																	fontWeight: '600',
																	fontSize: 11,
																}}
															>
																<FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faDiagramPredecessor}
																/>
																OBLIGATORY
																{/* <FontAwesomeIcon
																	className="mr-2 text-gray-600"
																	icon={faCircle}
																/>
																CIRCLE */}
															</small>
														</Col>
													</Row>
												</Row>
											</li>
										</ul>
										<hr />
										<ul className="list-group list-group-flush">
											<li className="list-group-item">
												<Row>
													<Col className="d-flex justify-content-end">
														<Row>
															<Col xs="6" sm="6" md="2">
																<small
																	className="text-muted"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 11,
																	}}
																>
																	Total Courses
																</small>
															</Col>
															<Col>
																<span className="text-secondary">6</span>
															</Col>
															<Col xs="6" sm="6" md="2">
																<small
																	className="text-muted"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 11,
																	}}
																>
																	Grade Average
																</small>
															</Col>
															<Col>
																<span className="text-secondary">5.83</span>
															</Col>
															<Col xs="6" sm="6" md="2">
																<small
																	className="text-muted"
																	style={{
																		textAlign: 'justify',
																		fontWeight: '600',
																		fontSize: 11,
																	}}
																>
																	Total ECTS
																</small>
															</Col>
															<Col>
																<span className="text-secondary">30/30</span>
															</Col>
														</Row>
													</Col>
												</Row>
											</li>
										</ul>
									</div>
								))}
							</div>
						</div>
					</Col>
				</Row>
			) : selectedCategory === 'Thesis' ? (
				<Row className="justify-content-center animated--grow-in">
					<Col xl="10" lg="12" md="12" sm="12" xs="12">
						<div className="profile_card">
							<div className="card-body">
								<Row className="mb-2 d-flex flex-column align-items-center text-center">
									<Col>
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 18,
											}}
										>
											Thesis
										</small>
									</Col>
								</Row>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faScroll}
													/>
													Icarus Student Management System
												</h6>
											</Col>
											<Row className="mt-2">
												<Col xs="12" sm="12" md="4" lg="3" xl="2">
													<small
														className="text-muted"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 13,
														}}
													>
														<FontAwesomeIcon
															className="mr-2 text-gray-600"
															icon={faBarcode}
														/>
														321-00000
													</small>
												</Col>
												<Col>
													<small
														className="text-muted"
														style={{
															textAlign: 'justify',
															fontWeight: '600',
															fontSize: 13,
														}}
													>
														<FontAwesomeIcon
															className="mr-2 text-gray-600"
															icon={faPersonChalkboard}
														/>
														ΚΥΡΙΑΚΟΣ ΚΡΗΤΙΚΟΣ
														{/* {user.user.name.toUpperCase()} */}
													</small>
												</Col>
											</Row>
										</Row>
									</li>
								</ul>
								<hr />
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col className="d-flex justify-content-between flex-wrap">
												<h6
													className="text-gray-600"
													style={{
														fontWeight: '600',
													}}
												>
													<FontAwesomeIcon
														className="mr-2 text-gray-600"
														icon={faChartSimple}
													/>
													Grade
												</h6>
												<span className="text-secondary">6.31</span>
											</Col>
										</Row>
									</li>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			) : null}
		</>
	);
}
