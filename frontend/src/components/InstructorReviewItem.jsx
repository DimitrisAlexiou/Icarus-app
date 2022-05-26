export default function InstructorReviewItem({ instructorReview }) {
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
						Good Organization : {instructorReview.good_organization}
					</p>
					<p className="card-text">
						Clear Comprehensive Answers:{' '}
						{instructorReview.clear_comprehensive_answers}
					</p>
					<p className="card-text">
						Student Participation : {instructorReview.student_participation}
					</p>
					<p className="card-text">
						Course Consistency : {instructorReview.course_consistency}
					</p>
					<p className="card-text">
						Instuctor Approachable : {instructorReview.instructor_approachable}
					</p>
				</div>
			</div>
		</>
	);
}
