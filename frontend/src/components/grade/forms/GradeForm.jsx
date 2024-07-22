import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	addGrade,
	updateGrade,
	setEditTheoryGrade,
	setEditLabGrade,
} from '../../../features/courses/gradeSlice';
import { GradeSchema } from '../../../schemas/course/Grade';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import NumberField from '../../form/NumberField';

export default function GradeForm({
	grade,
	type,
	examination,
	examId,
	teachingId,
	statementId,
	userId,
	isEditingTheoryGrade,
	isEditingLabGrade,
	editGradeId,
	dispatch,
}) {
	const initialValue = grade && grade.length > 0 ? grade[0].exam.grade : 1;
	const initialValues = { [type]: initialValue };

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={GradeSchema(type)}
			onSubmit={(values, { setSubmitting }) => {
				if (isEditingTheoryGrade || isEditingLabGrade) {
					const updateGradeData = {
						exam: {
							...grade[0].exam,
							grade: values[type],
							examId: examId,
						},
						teachingId: teachingId,
						statementId: statementId,
						userId: userId,
					};
					dispatch(
						updateGrade({
							gradeId: editGradeId,
							data: updateGradeData,
						})
					);
					if (isEditingTheoryGrade)
						dispatch(
							setEditTheoryGrade({
								isEditingTheoryGrade: false,
								editGradeId: '',
								examinationType: '',
								examId: '',
								teachingToEditId: '',
							})
						);
					else
						dispatch(
							setEditLabGrade({
								isEditingLabGrade: false,
								editGradeId: '',
								examinationType: '',
								examId: '',
								teachingToEditId: '',
							})
						);
				} else {
					const examData = {
						type: type,
						examination: examination,
						grade: values[type],
						examId: examId,
					};
					const gradeData = {
						exam: examData,
						teachingId: teachingId,
						statementId: statementId,
						userId: userId,
					};
					dispatch(addGrade(gradeData));
				}
				setSubmitting(false);
			}}
			validateOnMount
		>
			{({ isSubmitting }) => (
				<Form>
					<Row className="align-items-center">
						<Col xl="3" lg="5" md="6" xs="10">
							<NumberField
								min="0"
								max="10"
								step="0.5"
								name={type}
								label={type}
							/>
						</Col>
						<Col xl="1" lg="1" md="1" sm="1" xs="1">
							<Button
								type="submit"
								className="btn btn-light"
								style={{
									fontWeight: 500,
									fontSize: 15,
								}}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Spinner size="sm" color="dark" type="grow" />
								) : (
									<FontAwesomeIcon icon={faCircleCheck} />
								)}
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
}
