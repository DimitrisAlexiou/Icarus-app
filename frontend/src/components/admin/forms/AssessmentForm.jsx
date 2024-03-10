import { Label, Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { AssessmentSchema } from '../../../schemas/admin/Assessment';
import {
	defineAssessment,
	setEditAssessment,
	updateAssessment,
} from '../../../features/admin/assessmentSlice';
import DatePickerField from '../../form/DatePickerField';
import NumberField from '../../form/NumberField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function AssessmentForm({
	assessment,
	isEditingAssessment,
	editAssessmentId,
	semester,
	dispatch,
}) {
	return (
		<>
			<Formik
				initialValues={{
					startDate: assessment
						? new Date(assessment.vaccineStartDate)
						: new Date(),
					endDate: assessment
						? new Date(assessment.vaccineEndDate)
						: new Date(),
					period: assessment ? assessment.period : 1,
					semesterStartDate: new Date(semester.startDate),
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
						dispatch(
							setEditAssessment({
								isEditingAssessment: false,
								editAssessmentId: '',
							})
						);
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
								<NumberField
									min="1"
									name="period"
									label="Assessment statement period"
								/>
							</Col>
						</Row>
						<Row>
							<Label
								for="period"
								className="text-gray-300 d-flex justify-content-center"
							>
								Vaccine / Reassessment
							</Label>
							<DatePickerField />
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
									) : isEditingAssessment ? (
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
