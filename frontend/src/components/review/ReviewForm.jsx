import { Row, Col, CardTitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CourseObligation, ReviewType } from '../../constants/enums';
import useReview from '../../hooks/review/useReview';
import InstructorReviewForm from './forms/InstructorReviewForm';
import TeachingReviewForm from './forms/TeachingReviewForm';
import GeneralReviewForm from './forms/GeneralReviewForm';
import BreadcrumbNav from '../boilerplate/Breadcrumb';
import Spinner from '../boilerplate/spinners/Spinner';
import CarouselComponent from '../Carousel';
import PillHeader from '../boilerplate/headers/PillHeader';
import HeaderWithSemester from '../boilerplate/headers/HeaderWithSemester';
import FormHeader from '../boilerplate/headers/FormHeader';

export const getReviewFormComponent = (reviewType) => {
	switch (reviewType) {
		case ReviewType.General:
			return GeneralReviewForm;
		case ReviewType.Teaching:
			return TeachingReviewForm;
		case ReviewType.Instructor:
			return InstructorReviewForm;
		default:
			return null;
	}
};

export default function ReviewForm({ reviewType }) {
	const {
		user,
		enrolledCourses,
		isTeachingsLoading,
		isSemesterLoading,
		isLoading,
		selectedTeaching,
		setSelectedTeaching,
		formIsOpen,
		setFormIsOpen,
		formIsVisible,
		setFormIsVisible,
		findTeaching,
		handleTeachingClick,
		dispatch,
	} = useReview(reviewType);

	const ReviewFormComponent = getReviewFormComponent(reviewType);

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={`${reviewType}`}
			/>

			<HeaderWithSemester title={`${reviewType}`} />

			<Row className="mt-3 mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="enrolled courses" />
				</Col>
			</Row>

			{isSemesterLoading || isTeachingsLoading || isLoading ? (
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
											<FontAwesomeIcon
												className="text-muted clickable"
												style={{
													textAlign: 'justify',
													fontWeight: '700',
													fontSize: 15,
												}}
												icon={
													formIsOpen && selectedTeaching === teaching
														? faMinus
														: faEllipsis
												}
												onClick={(e) => {
													if (formIsOpen && selectedTeaching === teaching) {
														setFormIsVisible(false);
														setFormIsOpen(false);
													} else {
														e.stopPropagation();
														handleTeachingClick(teaching);
													}
												}}
											/>
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
										{teaching?.course?.isObligatory
											? CourseObligation.Obligatory
											: CourseObligation.Optional}
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
							<FormHeader title="Leave your review" />
							<div className="card-body">
								{isLoading ? (
									<Spinner card />
								) : (
									<ReviewFormComponent
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
