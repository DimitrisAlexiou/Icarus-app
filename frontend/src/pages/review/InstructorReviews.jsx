import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getInstructorReviews } from '../../features/reviews/instructorReviewSlice';
import InstructorReviewItem from '../../components/review/InstructorReviewItem';
import Spinner from '../../components/boilerplate/Spinner';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function InstructorReviews() {
	const { instructorReview, isLoading, isSuccess } = useSelector(
		(state) => state.instructorReview
	);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	return () => {
	// 		if (isSuccess) {
	// 			dispatch(reset());
	// 		}
	// 	};
	// }, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getInstructorReviews());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'Instructor Reviews'}
			/>

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				Instructor Reviews
			</h1>

			<Row className="animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{instructorReview.map((instructorReview) => (
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
