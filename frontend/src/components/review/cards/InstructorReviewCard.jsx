const InstructorReviewCard = ({
	review,
	getProgressBarColor,
	convertToPercentage,
}) => {
	return (
		<>
			<p>Good Organization</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.good_organization)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.good_organization)}%`,
					}}
					aria-valuenow={review?.good_organization}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Clear Comprehensive Answers</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.clear_comprehensive_answers)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(
							review?.clear_comprehensive_answers
						)}%`,
					}}
					aria-valuenow={review?.clear_comprehensive_answers}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Student Participation</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.student_participation)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.student_participation)}%`,
					}}
					aria-valuenow={review?.student_participation}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Consistency</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.course_consistency)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.course_consistency)}%`,
					}}
					aria-valuenow={review?.course_consistency}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Instuctor Approachable</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(review?.instructor_approachable)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(review?.instructor_approachable)}%`,
					}}
					aria-valuenow={review?.instructor_approachable}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
		</>
	);
};

export default InstructorReviewCard;
