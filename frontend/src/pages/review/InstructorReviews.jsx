import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getInstructorReviews,
	resetInstructorReview,
} from '../../features/reviews/instructorReviewSlice';
import InstructorReviewItem from '../../components/review/InstructorReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function InstructorReviews() {
	const { instructorReview, isLoading, isSuccess } = useSelector(
		(state) => state.instructorReview
	);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(resetInstructorReview());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getInstructorReviews());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div>
				<div>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Instructor Reviews !</h1>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-6 col-lg-4 g-4 mb-3">
						<div className="col">
							{instructorReview.map((instructorReview) => (
								<InstructorReviewItem
									key={instructorReview._id}
									instructorReview={instructorReview}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
