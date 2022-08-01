import { FormGroup, FormFeedback, Input, Label } from 'reactstrap';

export default function InstructorReviewForm({
	onChange,
	instructorReviewData,
}) {
	return (
		<>
			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="good_organization"
					name="good_organization"
					value={instructorReviewData.good_organization}
					onChange={onChange}
					required
				/>
				<Label for="good_organization" className="text-gray-600">
					Good organization of presentation material
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="clear_comprehensive_answers"
					name="clear_comprehensive_answers"
					value={instructorReviewData.clear_comprehensive_answers}
					onChange={onChange}
					required
				/>
				<Label for="clear_comprehensive_answers" className="text-gray-600">
					Clear and comprehensive answers/exemplifications/examples
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="student_participation"
					name="student_participation"
					value={instructorReviewData.student_participation}
					onChange={onChange}
					required
				/>
				<Label for="student_participation" className="text-gray-600">
					Active student participation encouragement
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="course_consistency"
					name="course_consistency"
					value={instructorReviewData.course_consistency}
					onChange={onChange}
					required
				/>
				<Label for="course_consistency" className="text-gray-600">
					Consistency in course obligations
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="instructor_approachable"
					name="instructor_approachable"
					value={instructorReviewData.instructor_approachable}
					onChange={onChange}
					required
				/>
				<Label for="instructor_approachable" className="text-gray-600">
					Instructor was approachable in general
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>
		</>
	);
}
