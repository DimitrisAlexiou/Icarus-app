import { convertToPercentage, getProgressBarColor } from '../../../utils/progressBar';

export default function TeachingReviewCard({ teachingReview }) {
	return (
		<>
			<h5 className="d-flex align-items-center mb-3 font-weight-bold mb-4">
				{teachingReview.teaching.course.title}
			</h5>
			<p>Clear Course Objectives</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.clear_course_objectives)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.clear_course_objectives)}%`,
					}}
					aria-valuenow={teachingReview.clear_course_objectives}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Material</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.course_material)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.course_material)}%`,
					}}
					aria-valuenow={teachingReview.course_material}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Comprehension</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.course_comprehension)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.course_comprehension)}%`,
					}}
					aria-valuenow={teachingReview.course_comprehension}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Difficulty</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.course_difficulty)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.course_difficulty)}%`,
					}}
					aria-valuenow={teachingReview.course_difficulty}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Course Activities</p>
			<div className="progress mb-3" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.course_activities)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.course_activities)}%`,
					}}
					aria-valuenow={teachingReview.course_activities}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
			<p>Examination Method</p>
			<div className="progress" style={{ height: '5px' }}>
				<div
					className={`progress-bar ${getProgressBarColor(
						convertToPercentage(teachingReview.examination_method)
					)}`}
					role="progressbar"
					style={{
						width: `${convertToPercentage(teachingReview.examination_method)}%`,
					}}
					aria-valuenow={teachingReview.examination_method}
					aria-valuemin="0"
					aria-valuemax="100"
				></div>
			</div>
		</>
	);
}
