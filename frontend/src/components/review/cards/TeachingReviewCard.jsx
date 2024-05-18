const TeachingReviewCard = ({
	review,
	getProgressBarColor,
	convertToPercentage,
}) => {
	return (
		<>
			<p>Clear Course Objectives</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.clear_course_objectives)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.clear_course_objectives)}%`,
					}}
					aria-valuenow={review?.clear_course_objectives}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Material</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.course_material)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.course_material)}%`,
					}}
					aria-valuenow={review?.course_material}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Comprehension</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.course_comprehension)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.course_comprehension)}%`,
					}}
					aria-valuenow={review?.course_comprehension}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Difficulty</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.course_difficulty)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.course_difficulty)}%`,
					}}
					aria-valuenow={review?.course_difficulty}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Activities</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.course_activities)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.course_activities)}%`,
					}}
					aria-valuenow={review?.course_activities}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Examination Method</p>
			<div className="progress" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.examination_method)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.examination_method)}%`,
					}}
					aria-valuenow={review?.examination_method}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
		</>
	);
};

export default TeachingReviewCard;
