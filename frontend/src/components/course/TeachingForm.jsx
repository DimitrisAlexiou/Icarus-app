import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Field, ErrorMessage, FieldArray } from 'formik';
import FormErrorMessage from '../FormErrorMessage';

const TeachingForm = ({ initialValues }) => {
	// export default function TeachingForm() {
	return (
		<>
			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="labWeight"
						/>
						<Label for="labWeight" className="text-gray-600">
							Lab Weight
						</Label>
						<ErrorMessage name="labWeight" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="theoryWeight"
						/>
						<Label for="theoryWeight" className="text-gray-600">
							Theory Weight
						</Label>
						<ErrorMessage name="theoryWeight" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="theoryGrade"
						/>
						<Label for="theoryGrade" className="text-gray-600">
							Theory Grade
						</Label>
						<ErrorMessage name="theoryGrade" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="labGrade"
						/>
						<Label for="labGrade" className="text-gray-600">
							Lab Grade
						</Label>
						<ErrorMessage name="labGrade" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>

			<Row>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="theoryGradeThreshold"
						/>
						<Label for="theoryGradeThreshold" className="text-gray-600">
							Theory Grade Threshold
						</Label>
						<ErrorMessage
							name="theoryGradeThreshold"
							component={FormErrorMessage}
						/>
					</FormGroup>
				</Col>
				<Col md="6">
					<FormGroup className="form-floating mb-3" floating>
						<Field
							type="number"
							min="0"
							className="form-control"
							name="labGradeThreshold"
						/>
						<Label for="labGradeThreshold" className="text-gray-600">
							Lab Grade Threshold
						</Label>
						<ErrorMessage
							name="labGradeThreshold"
							component={FormErrorMessage}
						/>
					</FormGroup>
				</Col>
			</Row>

			{/* <FormGroup className="form-floating mb-3" floating>
                <Field
                    type="text"
                    className="form-control"
                    name="books"
                />
                <Label for="books" className="text-gray-600">
                    Recommended Books
                </Label>
                <ErrorMessage name="books" component={FormErrorMessage} />
            </FormGroup> */}
		</>
	);
};

export default TeachingForm;

{
	/* <FieldArray name="books" className="form-floating mb-3" floating>
	render=
	{(arrayHelpers) => (
		<div>
			{values.books && values.books.length > 0 ? (
				values.books.map((book, index) => (
					<div key={index}>
						<Field name={`books.${index}`} className="form-control" />
						<Button
							type="button"
							onClick={() => arrayHelpers.remove(index)} // remove a book from the list
						>
							-
						</Button>
						<Button
							type="button"
							onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
						>
							+
						</Button>
						<Label for="books" className="text-gray-600">
							Recommended Books
						</Label>
						<ErrorMessage name="books" component={FormErrorMessage} />
					</div>
				))
			) : (
				<Button type="button" onClick={() => arrayHelpers.push('')}>
					show this when user has removed all books from the list
					Add book
				</Button>
			)}
		</div>
	)}
</FieldArray>; */
}
