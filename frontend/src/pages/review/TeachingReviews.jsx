import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTeachingReviews, reset } from '../../features/reviews/teachingReviewSlice';
import TeachingReviewItem from '../../components/review/TeachingReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

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
			<div>
				<div>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Teaching Reviews !</h1>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-6 col-lg-4 g-4 mb-3">
						<div className="col">
							{teachingReview.map((teachingReview) => (
								<TeachingReviewItem
									key={teachingReview._id}
									teachingReview={teachingReview}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
