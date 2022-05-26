export default function TeachingReviewItem({ teachingReview }) {
	return (
		<>
			<div className="card border-left-sky-blue-crayola">
				<div className="card-header py-3"></div>
				<div className="card-body">
					<p
						className="card-text"
						// 		style="
						// 	text-align: justify;
						// 	font-weight: 300;
						// 	font-size: 90%;
						// 	overflow: hidden;
						// 	text-overflow: ellipsis;
						// 	display: -webkit-box;
						// 	line-height: 20px;
						// 	max-height: 80px;
						// 	-webkit-line-clamp: 3;
						// 	-webkit-box-orient: vertical;
						// "
					>
						Clear Course objectives : {teachingReview.clear_course_objectives}
					</p>
					<p className="card-text">
						Course Material : {teachingReview.course_material}
					</p>
					<p className="card-text">
						Course Comprehension : {teachingReview.course_comprehension}
					</p>
					<p className="card-text">
						Examination Method : {teachingReview.examination_method}
					</p>
					<p className="card-text">
						Course Difficulty : {teachingReview.course_difficulty}
					</p>
					<p className="card-text">
						Course Activities : {teachingReview.course_activities}
					</p>
				</div>
			</div>
		</>
	);
}
