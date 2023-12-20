import { useState } from 'react';
import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons';
import useGeneralreview from '../../hooks/review/useGeneralReview';
import GeneralReviewForm from '../../components/review/forms/GeneralReviewForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import CarouselComponent from '../../components/Carousel';
import CurrentSemester from '../../components/boilerplate/CurrentSemester';
import Header from '../../components/boilerplate/Header';

export default function GeneralReview() {
	const {
		user,
		enrolledCourses,
		isTeachingsLoading,
		isSemesterLoading,
		isGeneralaReviewLoading,
		findTeaching,
		dispatch,
	} = useGeneralreview();

	const [selectedTeaching, setSelectedTeaching] = useState(null);
	const [formIsVisible, setFormIsVisible] = useState(false);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const handleTeachingClick = (teaching) => {
		setSelectedTeaching((prevTeaching) => {
			return prevTeaching === teaching ? null : teaching;
		});
		setFormIsVisible(true);
		setFormIsOpen(true);
	};

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'General Review'}
			/>

			<Row className="mb-4 animated--grow-in">
				<Col>
					<h3 className="mb-5 text-gray-800 font-weight-bold animated--grow-in">
						General Review
					</h3>
				</Col>
				<CurrentSemester />
			</Row>

			<Row className="mt-3 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<Header title="enrolled courses" />
				</Col>
			</Row>

			{isSemesterLoading || isTeachingsLoading ? (
				<Spinner card />
			) : enrolledCourses.length > 0 ? (
				<CarouselComponent
					objects={enrolledCourses}
					renderItem={(enrolledCourse) => {
						const teaching = findTeaching(enrolledCourse);
						return (
							<>
								<CardTitle
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 15,
									}}
									className="text-light-cornflower-blue mb-2"
								>
									<Row>
										<Col>{teaching?.course?.title}</Col>
										<Col
											xs="2"
											sm="2"
											md="2"
											className="d-flex justify-content-end"
										>
											{formIsOpen && selectedTeaching === teaching ? (
												<FontAwesomeIcon
													className="text-muted clickable"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 13,
													}}
													icon={faMinus}
													onClick={() => {
														setFormIsVisible(false);
														setFormIsOpen(false);
													}}
												/>
											) : (
												<FontAwesomeIcon
													className="text-muted clickable"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 15,
													}}
													icon={faEllipsis}
													onClick={(e) => {
														e.stopPropagation();
														handleTeachingClick(teaching);
													}}
												/>
											)}
										</Col>
									</Row>
								</CardTitle>
								<CardText>
									<small
										className="text-muted"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 13,
										}}
									>
										{teaching?.course?.isObligatory ? 'Obligatory' : 'Optional'}
									</small>
								</CardText>
								<CardText
									style={{
										textAlign: 'justify',
										fontWeight: '600',
										fontSize: 11,
									}}
								>
									{teaching?.course?.courseId}
								</CardText>
							</>
						);
					}}
					onObjectClick={(teaching) => {
						setSelectedTeaching(teaching);
					}}
				/>
			) : (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					You have no enrolled courses available.
				</span>
			)}

			{selectedTeaching && formIsVisible ? (
				<Row className="justify-content-center animated--grow-in">
					<Col sm="12" md="10" lg="8" xl="8">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Leave your review
								</h6>
							</div>
							<div className="card-body">
								{isGeneralaReviewLoading ? (
									<Spinner card />
								) : (
									<GeneralReviewForm
										user={user}
										teaching={selectedTeaching}
										setFormIsVisible={setFormIsVisible}
										setFormIsOpen={setFormIsOpen}
										dispatch={dispatch}
									/>
								)}
							</div>
						</div>
					</Col>
				</Row>
			) : enrolledCourses.length ? (
				<span className="mb-5 text-gray-500 animated--grow-in d-flex justify-content-center">
					Select a course to review.
				</span>
			) : null}
		</>
	);
}
