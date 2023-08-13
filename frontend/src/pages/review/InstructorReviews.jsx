import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getInstructorReviews } from '../../features/reviews/instructorReviewSlice';
import InstructorReviewItem from '../../components/review/InstructorReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function InstructorReviews() {
	const { instructorReviews, isLoading } = useSelector((state) => state.instructorReview);

	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getInstructorReviews());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<h5 className="mb-5 text-gray-500 font-weight-bold animated--grow-in">
				Instructor Reviews
			</h5>

			<Row className="mb-5 justify-content-center animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{instructorReviews.map((instructorReview) => (
						<InstructorReviewItem
							key={instructorReview._id}
							instructorReview={instructorReview}
						/>
					))}
				</Col>
			</Row>
		</>
	);
}
