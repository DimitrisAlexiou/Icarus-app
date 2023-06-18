import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AssessmentSchema } from '../../schemas/admin/Assessment';
import { defineAssessment, updateAssessment } from '../../features/admin/assessmentSlice';
import FormErrorMessage from '../form/FormErrorMessage';
import DatePickerField from '../form/DatePickerField';

export default function AssessmentForm({
	assessment,
	isEditingAssessment,
	editAssessmentId,
	semester,
}) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					startDate: assessment ? assessment.startDate : new Date(),
					endDate: assessment ? assessment.endDate : new Date(),
					period: assessment ? assessment.period : 0,
				}}
				validationSchema={AssessmentSchema}
				onSubmit={(values, { setSubmitting }) => {
					const assessment = {
						vaccineStartDate: values.startDate,
						vaccineEndDate: values.endDate,
						period: values.period,
						semester: semester._id,
					};
					if (isEditingAssessment) {
						dispatch(
							updateAssessment({
								assessmentId: editAssessmentId,
								data: assessment,
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineAssessment(assessment));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="1"
										className="form-control"
										name="period"
									/>
									<Label for="period" className="text-gray-600">
										Assessment statement period
									</Label>
									<ErrorMessage name="period" component={FormErrorMessage} />
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
									) : isEditingAssessment ? (
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
