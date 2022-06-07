import { FormGroup, FormFeedback, Input, Label } from 'reactstrap';

export default function CourseForm({ onChange, formCourseData }) {
	return (
		<>
			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="text"
					className="form-control"
					id="cid"
					name="cid"
					value={formCourseData.cid}
					onChange={onChange}
					required
				/>
				<Label for="cid" className="text-gray-600">
					Course ID
				</Label>
				<FormFeedback type="invalid">Please provide a course ID !</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="text"
					className="form-control"
					id="title"
					name="title"
					value={formCourseData.title}
					onChange={onChange}
					required
				/>
				<Label for="title" className="text-gray-600">
					Course Title
				</Label>
				<FormFeedback type="invalid">
					Please provide course title !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="select"
					className="form-control"
					id="type"
					name="type"
					value={formCourseData.type}
					onChange={onChange}
					required
				>
					<option default>Select course type</option>
					<option>Undergraduate</option>
					<option>Master</option>
					<option>Mixed</option>
				</Input>
				<Label for="type" className="text-gray-600">
					Course Type
				</Label>
				<FormFeedback type="invalid">
					Please select the type of course !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="textarea"
					className="form-control"
					style={{ height: '180px', text_align: 'justify' }}
					id="description"
					name="description"
					value={formCourseData.description}
					onChange={onChange}
					required
				/>
				<Label for="description" className="text-gray-600">
					Course Description
				</Label>
				<FormFeedback type="invalid">
					Please provide a description for the course !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="select"
					className="form-control"
					id="semester"
					name="semester"
					value={formCourseData.semester}
					onChange={onChange}
					required
				>
					<option default>Select course semester</option>
					<option>Winter</option>
					<option>Spring</option>
					<option>Any</option>
				</Input>
				<Label for="semester" className="text-gray-600">
					Course Semester
				</Label>
				<FormFeedback type="invalid">
					Please select the course semester !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="select"
					className="form-control"
					id="year"
					name="year"
					value={formCourseData.year}
					onChange={onChange}
					required
				>
					<option default>Select course year</option>
					<option>1</option>
					<option>2</option>
					<option disabled={formCourseData.type === 'master'}>3</option>
					<option disabled={formCourseData.type === 'master'}>4</option>
					<option disabled={formCourseData.type === 'master'}>5</option>
				</Input>
				<Label for="year" className="text-gray-600">
					Course Year
				</Label>
				<FormFeedback type="invalid">
					Please select the course year !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="select"
					min="1"
					max="5"
					className="form-control"
					id="cycle"
					name="cycle"
					value={formCourseData.cycle}
					onChange={onChange}
					required
				>
					<option default>Select course cycle</option>
					<option>Security</option>
					<option>Software Engineering</option>
					<option>Information Systems</option>
					<option>Communication Systems</option>
					<option>AI</option>
				</Input>
				<Label for="cycle" className="text-gray-600">
					Course Cycle
				</Label>
				<FormFeedback type="invalid">
					Please select the course cycle !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="form-floating mb-3" floating>
				<Input
					type="number"
					min="0"
					className="form-control"
					id="ects"
					name="ects"
					value={formCourseData.ects}
					onChange={onChange}
					required
				/>
				<Label for="ects" className="text-gray-600">
					Course ECTS
				</Label>
				<FormFeedback type="invalid">
					Please provide the course ECTS !
				</FormFeedback>
			</FormGroup>

			<FormGroup className="mx-1 mb-3" check>
				<Input
					type="checkbox"
					id="hasLab"
					name="hasLab"
					value={formCourseData.hasLab}
					defaultChecked={false}
					// onChangeCheckBox={onChangeCheckBox}
					// onChangeCheckBox={() => setHasLab(!hasLab)}
					required
				/>
				<Label for="hasLab" className="text-gray-500">
					Course Lab
				</Label>
			</FormGroup>

			<FormGroup className="mx-1 mb-3" check>
				<Input
					type="checkbox"
					id="isObligatory"
					name="isObligatory"
					value={formCourseData.isObligatory}
					// onChangeCheckBox={checked ? 'true' : 'false'}
					// ={onChangeCheckBox}
					// onChange={onChange}
					required
				/>
				<Label for="isObligatory" className="text-gray-500">
					Obligatory Course
				</Label>
			</FormGroup>
		</>
	);
}
