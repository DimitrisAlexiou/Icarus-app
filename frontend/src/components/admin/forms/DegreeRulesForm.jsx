import { Row, Col, Spinner } from 'reactstrap';
import { Formik, Form } from 'formik';
import { DegreeRulesSchema } from '../../../schemas/admin/DegreeRules';
import {
	defineDegreeRules,
	setEditDegreeRules,
	updateDegreeRules,
} from '../../../features/admin/degreeRulesSlice';
import NumberField from '../../form/NumberField';
import CheckBoxField from '../../form/CheckBoxField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function DegreeRulesForm({
	degreeRules,
	isEditingDegreeRules,
	editDegreeRulesId,
	dispatch,
}) {
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
						dispatch(
							setEditDegreeRules({
								isEditingDegreeRules: false,
								editDegreeRulesId: '',
							})
						);
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
								<NumberField
									name="courses"
									min="0"
									label="Obligatory Courses"
								/>
							</Col>
							<Col>
								<NumberField name="cycles" min="0" label="Obligatory Cycles" />
							</Col>
						</Row>
						<Row>
							<Col md="7">
								<NumberField
									name="cycleCourses"
									min="0"
									label="Cycle completion"
								/>
							</Col>
							<Col>
								<CheckBoxField name="practice" label="Practice" />
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
									) : isEditingDegreeRules ? (
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
