import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SemesterSchema } from '../../schemas/admin/Semester';
import { defineSemester, updateSemester } from '../../features/admin/semesterSlice';
import FormErrorMessage from '../form/FormErrorMessage';
import DatePickerField from '../form/DatePickerField';
import { SemesterType } from '../../constants/enums';

export default function SemesterForm({ semester, isEditingSemester, editSemesterId }) {
	const dispatch = useDispatch();

	const renderDatePickerFields = (type) => {
		if (type !== SemesterType.Any) return <DatePickerField />;
	};

	const renderGradingField = (type) => {
		if (type !== SemesterType.Any)
			return (
				<FormGroup className="form-floating mb-3" floating>
					<Field type="number" min="1" className="form-control" name="grading" />
					<Label for="grading" className="text-gray-600">
						Grading period
					</Label>
					<ErrorMessage name="grading" component={FormErrorMessage} />
				</FormGroup>
			);
	};

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
					};
					if (values.type !== SemesterType.Any) {
						semester.startDate = values.startDate;
						semester.endDate = values.endDate;
					}
					// startDate: values.type !== SemesterType.Any ? values.startDate : null,
					// endDate: values.type !== SemesterType.Any ? values.endDate : null,
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
				{({ isSubmitting, dirty, handleReset, values }) => (
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
							<Col>{renderGradingField(values.type)}</Col>
						</Row>
						<Row>{renderDatePickerFields(values.type)}</Row>
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
