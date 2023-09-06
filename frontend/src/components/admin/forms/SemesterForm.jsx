import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SemesterSchema, SemesterUpdateSchema } from '../../../schemas/admin/Semester';
import {
	defineSemester,
	setEditSemester,
	updateSemester,
} from '../../../features/admin/semesterSlice';
import { SemesterType } from '../../../constants/enums';
import { academicYears } from '../../../utils/academicYears';
import FormErrorMessage from '../../form/FormErrorMessage';
// import DatePickerField from '../../form/DatePickerField';

export default function SemesterForm({
	semester,
	isEditingSemester,
	editSemesterId,
	setAddingSemester,
}) {
	const dispatch = useDispatch();

	// const renderDatePickerFields = (type) => {
	// 	if (type !== SemesterType.Any) return <DatePickerField />;
	// };

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
					academicYear: semester ? semester.academicYear : '',
					// startDate: semester ? new Date(semester.startDate) : new Date(),
					// endDate: semester ? new Date(semester.endDate) : new Date(),
				}}
				validationSchema={isEditingSemester ? SemesterUpdateSchema : SemesterSchema}
				onSubmit={(values, { setSubmitting }) => {
					const semester = {
						type: values.type,
						academicYear: values.academicYear,
					};
					if (values.type !== SemesterType.Any) {
						// semester.startDate = values.startDate;
						// semester.endDate = values.endDate;
						semester.grading = values.grading;
					}
					if (isEditingSemester) {
						dispatch(
							updateSemester({
								semesterId: editSemesterId,
								data: semester,
							})
						);
						setSubmitting(false);
						dispatch(
							setEditSemester({
								isEditingSemester: false,
								editSemesterId: '',
							})
						);
						return;
					}
					dispatch(defineSemester(semester));
					setAddingSemester(false);
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset, values }) => (
					<Form>
						<Row>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									{isEditingSemester ? (
										<Input
											type="text"
											className="form-control"
											value={values.type}
											disabled
										/>
									) : (
										<Field as="select" className="form-control" name="type">
											<option default>Select semester type</option>
											<option value={SemesterType.Winter}>
												{SemesterType.Winter}
											</option>
											<option value={SemesterType.Spring}>
												{SemesterType.Spring}
											</option>
											<option value={SemesterType.Any}>
												{SemesterType.Any}
											</option>
										</Field>
									)}
									<Label for="type" className="text-gray-600">
										Semester type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="academicYear">
										<option default> Select academic year </option>
										{academicYears.map((year) => (
											<option
												key={year.value}
												value={year.value}
												label={year.label}
											/>
										))}
									</Field>

									<Label for="academicYear" className="text-gray-600">
										Academic year
									</Label>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col></Col>
							<Col md="5">{renderGradingField(values.type)}</Col>
						</Row>
						{/* <Row>{renderDatePickerFields(values.type)}</Row> */}
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
