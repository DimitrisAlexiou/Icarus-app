import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { getTeachingReviews, reset } from '../../features/reviews/teachingReviewSlice';
import TeachingReviewItem from '../../components/review/TeachingReviewItem';
import Spinner from '../../components/boilerplate/Spinner';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function TeachingReviews() {
	const { teachingReview, isLoading, isSuccess } = useSelector((state) => state.teachingReview);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getTeachingReviews());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/review'}
				header={'Reviews'}
				active={'Teaching Reviews'}
			/>

			<h1 className="h3 mb-5 text-gray-800 font-weight-bold animated--grow-in">
				Teaching Reviews
			</h1>

			<Row className="animated--grow-in">
				<Col sm="12" md="6" lg="4" className="g-4 mb-3">
					{teachingReview.map((teachingReview) => (
						<TeachingReviewItem
							key={teachingReview._id}
							teachingReview={teachingReview}
						/>
					))}
				</Col>
			</Row>
		</>
	);
}
