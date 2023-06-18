import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DegreeRulesSchema } from '../../schemas/admin/DegreeRules';
import { FormCheckbox } from '../form/FormCheckbox';
import { defineDegreeRules, updateDegreeRules } from '../../features/admin/degreeRulesSlice';
import FormErrorMessage from '../form/FormErrorMessage';

export default function DegreeRulesForm({ degreeRules, isEditingDegreeRules, editDegreeRulesId }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					cycles: degreeRules ? degreeRules.cycles : 0,
					courses: degreeRules ? degreeRules.courses : 0,
					cycleCourses: degreeRules ? degreeRules.cycleCourses : 0,
					practice: degreeRules ? degreeRules.practice : false,
				}}
				validationSchema={DegreeRulesSchema}
				onSubmit={(values, { setSubmitting }) => {
					const degreeRules = {
						cycles: values.cycles,
						courses: values.courses,
						cycleCourses: values.cycleCourses,
						practice: values.practice,
					};
					if (isEditingDegreeRules) {
						dispatch(
							updateDegreeRules({
								degreeRulesId: editDegreeRulesId,
								data: degreeRules,
							})
						);
						setSubmitting(false);
						return;
					}
					dispatch(defineDegreeRules(degreeRules));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<Row>
							<Col md="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="courses"
									/>
									<Label for="courses" className="text-gray-600">
										Obligatory passed Courses
									</Label>
									<ErrorMessage name="courses" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="cycles"
									/>
									<Label for="cycles" className="text-gray-600">
										Obligatory closed Cycles
									</Label>
									<ErrorMessage name="cycles" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="cycleCourses"
									/>
									<Label for="cycleCourses" className="text-gray-600">
										Passed courses for Cycle completion
									</Label>
									<ErrorMessage
										name="cycleCourses"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="mx-1 mb-3" check>
									<Field name="practice" component={FormCheckbox} />
									<Label for="practice" className="text-gray-500">
										Obligatory Practice
									</Label>
								</FormGroup>
							</Col>
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
									) : isEditingDegreeRules ? (
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
