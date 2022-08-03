import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getGeneralReviews,
	reset,
} from '../../features/reviews/generalReviewSlice';
import GeneralReviewItem from '../../components/review/GeneralReviewItem';
import Spinner from '../../components/boilerplate/Spinner';

export default function GeneralReviews() {
	const { generalReview, isLoading, isSuccess } = useSelector(
		(state) => state.generalReview,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getGeneralReviews());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<div>
						<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
							General Reviews !
						</h1>
					</div>

					<div className="row">
						<div className="col-sm-12 col-md-6 col-lg-4 g-4 mb-3">
							<div className="col">
								{generalReview.map((generalReview) => (
									<GeneralReviewItem
										key={generalReview._id}
										generalReview={generalReview}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
