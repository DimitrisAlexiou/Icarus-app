import { useState } from 'react';
import { Row, Col, NavItem, NavLink } from 'reactstrap';
import { activityCategories } from '../../utils/NavigationLinks';
import { ReviewType } from '../../constants/enums';
import useUserReviews from '../../hooks/review/useUserReviews';
import ReviewCard from '../../components/review/cards/ReviewCard';
import ReviewSection from '../../components/review/ReviewSection';
import Header from '../../components/boilerplate/headers/Header';

export default function Activity() {
	const [selectedCategory, setSelectedCategory] = useState('Reviews');
	const {
		generalReviews,
		isGeneralReviewLoading,
		instructorReviews,
		isInstructorReviewLoading,
		teachingReviews,
		isTeachingReviewLoading,
		handleDeleteReview,
		handleDeleteReviews,
	} = useUserReviews();

	return (
		<>
			<Header title="Activity" />

			<Row className="mb-4 animated--grow-in justify-content-center">
				<Col
					md="12"
					lg="11"
					xl="10"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
				>
					<Row className="d-flex justify-content-center">
						{activityCategories.map((portfolioCategory) => {
							const { id, text, icon } = portfolioCategory;
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
											<Col>{icon}</Col>
											<span>{text}</span>
										</NavLink>
									</NavItem>
								</Col>
							);
						})}
					</Row>
				</Col>
			</Row>

			<Row className="animated--grow-in">
				{selectedCategory === 'Reviews' ? (
					<Row className="mb-4 justify-content-center animated--grow-in">
						<ReviewSection
							title="Teaching"
							reviews={teachingReviews}
							isLoading={isTeachingReviewLoading}
							reviewType={ReviewType.Teaching}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={handleDeleteReview}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.Teaching)
							}
						/>

						<ReviewSection
							title="Instructor"
							reviews={instructorReviews}
							isLoading={isInstructorReviewLoading}
							reviewType={ReviewType.Instructor}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={(reviewId) =>
								handleDeleteReview(ReviewType.Instructor, reviewId)
							}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.Instructor)
							}
						/>

						<ReviewSection
							title="General"
							reviews={generalReviews}
							isLoading={isGeneralReviewLoading}
							reviewType={ReviewType.General}
							ReviewCardComponent={ReviewCard}
							handleDeleteReview={(reviewId) =>
								handleDeleteReview(ReviewType.General, reviewId)
							}
							handleDeleteReviews={() =>
								handleDeleteReviews(ReviewType.General)
							}
						/>
					</Row>
				) : selectedCategory === 'ACTIVITY' ? null : selectedCategory ===
				  'ACTIVITY' ? null : null}
			</Row>
		</>
	);
}
