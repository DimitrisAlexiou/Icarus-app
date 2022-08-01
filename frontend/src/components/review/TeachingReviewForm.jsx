import { FormGroup, FormFeedback, Input, Label } from 'reactstrap';

export default function TeachingReviewForm({ onChange, teachingReviewData }) {
	return (
		<>
			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="clear_course_objectives"
					name="clear_course_objectives"
					value={teachingReviewData.clear_course_objectives}
					onChange={onChange}
					required
				/>
				<Label for="clear_course_objectives" className="text-gray-600">
					Clear course objectives
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="course_material"
					name="course_material"
					value={teachingReviewData.course_material}
					onChange={onChange}
					required
				/>
				<Label for="course_material" className="text-gray-600">
					Course material matching the course objectives
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="course_comprehension"
					name="course_comprehension"
					value={teachingReviewData.course_comprehension}
					onChange={onChange}
					required
				/>
				<Label for="course_comprehension" className="text-gray-600">
					Better course comprehension due to course material
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="examination_method"
					name="examination_method"
					value={teachingReviewData.examination_method}
					onChange={onChange}
					required
				/>
				<Label for="examination_method" className="text-gray-600">
					Examination method and grading criteria awareness
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="course_difficulty"
					name="course_difficulty"
					value={teachingReviewData.course_difficulty}
					onChange={onChange}
					required
				/>
				<Label for="course_difficulty" className="text-gray-600">
					Course difficulty level
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="range"
					min="1"
					max="5"
					className="form-control form-range"
					id="course_activities"
					name="course_activities"
					value={teachingReviewData.course_activities}
					onChange={onChange}
					required
				/>
				<Label for="course_activities" className="text-gray-600">
					Better course comprehension due to labs/projects/tutorials
				</Label>
				<FormFeedback type="invalid">Please give your feedback!</FormFeedback>
			</FormGroup>
		</>
	);
}
