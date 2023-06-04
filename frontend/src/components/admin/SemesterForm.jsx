import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SemesterSchema } from '../../schemas/admin/Semester';
import { defineSemester, updateSemester } from '../../features/admin/semesterSlice';
import FormErrorMessage from '../FormErrorMessage';
import DatePickerField from '../DatePickerField';

export default function SemesterForm({ semester, isEditingSemester, editSemesterId }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					type: semester ? semester.type : '',
					grading: semester ? semester.grading : 0,
					startDate: semester ? semester.startDate : new Date(),
					endDate: semester ? semester.endDate : new Date(),
				}}
				validationSchema={SemesterSchema}
				onSubmit={(values, { setSubmitting }) => {
					const semester = {
						type: values.type,
						grading: values.grading,
						startDate: values.startDate,
						endDate: values.endDate,
					};
					if (isEditingSemester) {
						dispatch(
							updateSemester({
								semesterId: editSemesterId,
								data: semester,
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineSemester(semester));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col md="8">
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="type">
										<option default>Select semester type</option>
										<option value={'Winter'}>Winter</option>
										<option value={'Spring'}>Spring</option>
										<option value={'Any'}>Any</option>
									</Field>
									<Label for="type" className="text-gray-600">
										Semester type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="1"
										className="form-control"
										name="grading"
									/>
									<Label for="grading" className="text-gray-600">
										Grading period
									</Label>
									<ErrorMessage name="grading" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<DatePickerField />
						</Row>
						<Row className="mb-3">
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button type="submit" color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingSemester ? (
										'Update'
									) : (
										'Configure'
									)}
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
