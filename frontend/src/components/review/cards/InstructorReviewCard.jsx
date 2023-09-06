import { convertToPercentage, getProgressBarColor } from '../../../utils/progressBar';

export default function InstructorReviewCard({ instructorReview }) {
	return (
		<>
			<h5 className="d-flex align-items-center mb-3 font-weight-bold mb-4">
				{instructorReview.teaching.course.title}
			</h5>
			<p>Good Organization</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(instructorReview.good_organization)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(instructorReview.good_organization)}%`,
					}}
					aria-valuenow={instructorReview.good_organization}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Clear Comprehensive Answers</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(instructorReview.clear_comprehensive_answers)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(
							instructorReview.clear_comprehensive_answers
						)}%`,
					}}
					aria-valuenow={instructorReview.clear_comprehensive_answers}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Student Participation</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(instructorReview.student_participation)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(instructorReview.student_participation)}%`,
					}}
					aria-valuenow={instructorReview.student_participation}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Consistency</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(instructorReview.course_consistency)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(instructorReview.course_consistency)}%`,
					}}
					aria-valuenow={instructorReview.course_consistency}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Instuctor Approachable</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(instructorReview.instructor_approachable)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(instructorReview.instructor_approachable)}%`,
					}}
					aria-valuenow={instructorReview.instructor_approachable}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
		</>
	);
}
