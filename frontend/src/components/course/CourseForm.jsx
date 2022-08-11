import { FormGroup, Label, Row, Col } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from '../FormErrorMessage';
import { FormCheckbox } from '../FormCheckbox';

const CourseForm = ({ initialValues }) => {
	// export default function CourseForm() {
	return (
		<>
			<Row>
				<Col md="4">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="text"
							className="form-control"
							name="cid"
							// placeholder="321/xxxx | 321/xxxxx"
						/>
						<Label for="cid" className="text-gray-600">
							Course ID
						</Label>
						<ErrorMessage name="cid" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="8">
					<FormGroup className="form-floating mb-3" floating>
						<Field type="text" className="form-control" name="title" />
						<Label for="title" className="text-gray-600">
							Course Title
						</Label>
						<ErrorMessage name="title" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="type">
							<option default>Select course type</option>
							<option value={'Undergraduate'}>Undergraduate</option>
							<option value={'Master'}>Master</option>
							<option value={'Mixed'}>Mixed</option>
						</Field>
						<Label for="type" className="text-gray-600">
							Course Type
						</Label>
						<ErrorMessage name="type" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="prerequisites">
							<option default>Select course prerequisites type</option>
							<option value={'None'}>None</option>
							<option value={'Hard'}>Hard</option>
							<option value={'Soft'}>Soft</option>
						</Field>
						<Label for="prerequisites" className="text-gray-600">
							Course Prerequisites type
						</Label>
						<ErrorMessage name="prerequisites" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<FormGroup className="form-floating mb-3" floating>
				<Field
					as="textarea"
					className="form-control"
					style={{ height: '180px', text_align: 'justify' }}
					name="description"
				/>
				<Label for="description" className="text-gray-600">
					Course Description
				</Label>
				<ErrorMessage name="description" component={FormErrorMessage} />
			</FormGroup>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="semester">
							<option default>Select course semester</option>
							<option value={'Winter'}>Winter</option>
							<option value={'Spring'}>Spring</option>
							<option value={'Any'}>Any</option>
						</Field>
						<Label for="semester" className="text-gray-600">
							Course Semester
						</Label>
						<ErrorMessage name="semester" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="6">
					{/* {initialValues.type === 'Master' ? (
                        <FormGroup className="form-floating mb-3" floating>
                            <Field as="select" className="form-control" name="year">
                                <option default>Select course year</option>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                            </Field>
                            <Label for="year" className="text-gray-600">
                                Course Year
                            </Label>
                            <ErrorMessage name="year" component={FormErrorMessage} />
                        </FormGroup>
                    ) : (
                        <FormGroup className="form-floating mb-3" floating>
                            <Field as="select" className="form-control" name="year">
                                <option default>Select course year</option>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                                <option value={'3'}>3</option>
                                <option value={'4'}>4</option>
                                <option value={'5'}>5</option>
                            </Field>
                            <Label for="year" className="text-gray-600">
                                Course Year
                            </Label>
                            <ErrorMessage name="year" component={FormErrorMessage} />
                        </FormGroup>
                    )} */}
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="year">
							<option default>Select course year</option>
							<option value={'1'}>1</option>
							<option value={'2'}>2</option>
							<option value={'3'}>3</option>
							<option value={'4'}>4</option>
							<option value={'5'}>5</option>
						</Field>
						<Label for="year" className="text-gray-600">
							Course Year
						</Label>
						<ErrorMessage name="year" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							as="select"
							min="1"
							max="5"
							className="form-control"
							name="cycle"
						>
							<option default>Select course cycle</option>
							<option value={'Security'}>Security</option>
							<option value={'Software Engineering'}>
								Software Engineering
							</option>
							<option value={'Information Systems'}>Information Systems</option>
							<option value={'Communication Systems'}>
								Communication Systems
							</option>
							<option value={'AI'}>AI</option>
						</Field>
						<Label for="cycle" className="text-gray-600">
							Course Cycle
						</Label>
						<ErrorMessage name="cycle" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field type="number" min="0" className="form-control" name="ects" />
						<Label for="ects" className="text-gray-600">
							Course ECTS
						</Label>
						<ErrorMessage name="ects" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="mx-1 mb-3" check>
						<Field name="hasLab" component={FormCheckbox} />
						<Label for="hasLab" className="text-gray-500">
							Course Lab
						</Label>
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="mx-1 mb-3" check>
						<Field name="isObligatory" component={FormCheckbox} />

						<Label for="isObligatory" className="text-gray-500">
							Obligatory Course
						</Label>
					</FormGroup>
				</Col>
			</Row>
		</>
	);
};

export default CourseForm;
