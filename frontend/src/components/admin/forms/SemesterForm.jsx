import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { SemesterSchema } from '../../../schemas/admin/Semester';
import {
	defineSemester,
	setEditSemester,
	updateSemester,
} from '../../../features/admin/semesterSlice';
import { SemesterType } from '../../../constants/enums';
import { academicYears } from '../../../utils/academicYears';
import NumberField from '../../form/NumberField';
import SelectField from '../../form/SelectField';
import TextField from '../../form/TextField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function SemesterForm({
	semester,
	isEditingSemester,
	editSemesterId,
	setAddingSemester,
	dispatch,
}) {
	const renderGradingField = (type) => {
		if (type !== SemesterType.Any)
			return <NumberField min="1" name="grading" label="Grading period" />;
	};

	return (
		<>
			<Formik
				initialValues={{
					type: semester ? semester.type : '',
					grading: semester ? semester.grading : 1,
					academicYear: semester ? semester.academicYear : '',
				}}
				validationSchema={SemesterSchema}
				onSubmit={(values, { setSubmitting }) => {
					const semester = {
						type: values.type,
						academicYear: values.academicYear,
					};
					if (values.type !== SemesterType.Any)
						semester.grading = values.grading;

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
								{isEditingSemester ? (
									<TextField
										name="type"
										label="Semester type"
										value={values.type}
										disabled={true}
									/>
								) : (
									<SelectField
										name="type"
										label="Semester type"
										options={
											<>
												<option className="text-gray-300" default>
													Select semester type
												</option>
												<option value={SemesterType.Winter}>
													{SemesterType.Winter}
												</option>
												<option value={SemesterType.Spring}>
													{SemesterType.Spring}
												</option>
												<option value={SemesterType.Any}>
													{SemesterType.Any}
												</option>
											</>
										}
									/>
								)}
							</Col>
							<Col>{renderGradingField(values.type)}</Col>
						</Row>
						<Row>
							<Col md="7">
								{isEditingSemester ? (
									<TextField
										name="academicYear"
										label="Academic year"
										value={values.academicYear}
										disabled={true}
									/>
								) : (
									<SelectField
										name="academicYear"
										label="Academic year"
										options={
											<>
												<option className="text-gray-300" default>
													Select academic year
												</option>
												{academicYears.map((year) => (
													<option
														key={year.value}
														value={year.value}
														label={year.label}
													/>
												))}
											</>
										}
									/>
								)}
							</Col>
						</Row>
						<Row className="mb-3">
							<ClearButton
								onClick={handleReset}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingSemester ? (
										'Update'
									) : (
										'Configure'
									)
								}
								disabled={isSubmitting}
							/>
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
}
