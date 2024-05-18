import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col, Button, Spinner } from 'reactstrap';
import {
	assignLabGrading,
	assignTheoryGrading,
	unassignLabGrading,
	unassignTheoryGrading,
} from '../../../features/courses/teachingSlice';
import { TeachingGradingSchema } from '../../../schemas/course/TeachingGrading';
import { ExaminationType } from '../../../constants/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import NumberField from '../../form/NumberField';
import SelectField from '../../form/SelectField';
import RadioField from '../../form/RadioField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function TeachingGradingForm({
	teaching,
	editTeachingId,
	isEditingTeachingGrading,
	setModalGrading,
	user,
	dispatch,
}) {
	const canEditTheory =
		teaching?.theoryInstructors?.some(
			(instructor) => instructor?.user?._id === user?.user?._id
		) || user?.user?.isAdmin;

	const canEditLab =
		teaching?.labInstructors?.some(
			(instructor) => instructor?.user?._id === user?.user?._id
		) || user?.user?.isAdmin;

	const defaultSelectedPart = canEditTheory
		? 'theory'
		: canEditLab
		? 'lab'
		: 'theory';

	const [selectedPart, setSelectedPart] = useState(defaultSelectedPart);

	return (
		<>
			<Row
				className={teaching?.course?.hasLab ? 'justify-content-center' : null}
			>
				<Col md="6">
					<Row className="align-items-center mb-3">
						<Col>
							<RadioField
								name="theory"
								value="theory"
								label="Theory"
								checked={selectedPart === 'theory'}
								onChange={() => setSelectedPart('theory')}
								disabled={!canEditTheory}
							/>
						</Col>
						{canEditTheory && teaching?.theoryExamination?.length ? (
							<Col className="text-right">
								<FontAwesomeIcon
									className="text-danger clickable"
									style={{
										textAlign: 'justify',
										fontWeight: '700',
										fontSize: 16,
									}}
									icon={faXmarkCircle}
									onClick={() => {
										deleteAlert(() =>
											dispatch(unassignTheoryGrading(teaching?._id))
										);
										setModalGrading(false);
									}}
								/>
							</Col>
						) : null}
					</Row>
				</Col>
				{teaching?.course?.hasLab ? (
					<Col md="6">
						<Row className="align-items-center mb-3">
							<Col>
								<RadioField
									name="lab"
									value="lab"
									label="Lab"
									checked={selectedPart === 'lab'}
									onChange={() => setSelectedPart('lab')}
									disabled={!canEditLab}
								/>
							</Col>
							{canEditLab && teaching?.labExamination?.length ? (
								<Col className="text-right">
									<FontAwesomeIcon
										className="text-danger clickable"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 16,
										}}
										icon={faXmarkCircle}
										onClick={() => {
											deleteAlert(() =>
												dispatch(unassignLabGrading(teaching?._id))
											);
											setModalGrading(false);
										}}
									/>
								</Col>
							) : null}
						</Row>
					</Col>
				) : null}
			</Row>

			<Formik
				initialValues={{
					theoryExamination: teaching?.theoryExamination?.length
						? teaching.theoryExamination
						: [
								{
									type: '',
									weight: '',
									lowerGradeThreshold: '',
								},
						  ],
					labExamination: teaching?.labExamination?.length
						? teaching.labExamination
						: [
								{
									type: '',
									weight: '',
									lowerGradeThreshold: '',
								},
						  ],
				}}
				enableReinitialize={true}
				validationSchema={TeachingGradingSchema(selectedPart)}
				onSubmit={(values, { setSubmitting }) => {
					const teachingGradingData = {
						theoryExamination: values.theoryExamination,
						labExamination: values.labExamination,
					};
					if (selectedPart === 'theory' && canEditTheory) {
						dispatch(
							assignTheoryGrading({
								teachingId: editTeachingId,
								data: teachingGradingData.theoryExamination,
							})
						);
					} else if (selectedPart === 'lab' && canEditLab) {
						dispatch(
							assignLabGrading({
								teachingId: editTeachingId,
								data: teachingGradingData.labExamination,
							})
						);
					}
					setSelectedPart('theory');
					setSubmitting(false);
					setModalGrading(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, setFieldValue, resetForm }) => (
					<Form>
						{selectedPart === 'theory' ? (
							<>
								{values.theoryExamination.map((_, index) => (
									<div key={index}>
										<Row>
											<Col className="mb-3">
												<small
													className="text-muted pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Examination {index + 1}
												</small>
											</Col>
											{index === 0 ? (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="info"
														onClick={() =>
															setFieldValue('theoryExamination', [
																...values.theoryExamination,
																{},
															])
														}
														disabled={isSubmitting}
													>
														+
													</Button>
												</Col>
											) : (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="warning"
														onClick={() =>
															setFieldValue(
																'theoryExamination',
																values.theoryExamination.filter(
																	(_, i) => i !== index
																)
															)
														}
													>
														-
													</Button>
												</Col>
											)}
										</Row>
										<Row>
											<Col md="6">
												<SelectField
													name={`theoryExamination[${index}].type`}
													label="Examination Type"
													options={
														<>
															<option className="text-gray-300" default>
																Select exam type
															</option>
															{Object.values(ExaminationType).map((type) => (
																<option key={type} value={type}>
																	{type}
																</option>
															))}
														</>
													}
												/>
											</Col>
											<Col md="6">
												<NumberField
													name={`theoryExamination[${index}].weight`}
													min="0"
													max="100"
													label="Weight"
												/>
											</Col>
										</Row>
										<Row>
											<Col md="6">
												<NumberField
													name={`theoryExamination[${index}].lowerGradeThreshold`}
													min="0"
													max="10"
													step="0.5"
													label="Lower Grade Threshold"
												/>
											</Col>
										</Row>
									</div>
								))}
							</>
						) : (
							<>
								{values.labExamination.map((_, index) => (
									<div key={index}>
										<Row>
											<Col className="mb-3">
												<small
													className="text-muted pill-label"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 12,
													}}
												>
													Examination {index + 1}
												</small>
											</Col>
											{index === 0 ? (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="info"
														onClick={() =>
															setFieldValue('labExamination', [
																...values.labExamination,
																{},
															])
														}
														disabled={isSubmitting}
													>
														+
													</Button>
												</Col>
											) : (
												<Col xs="2" sm="2" md="2" className="mb-3 text-right">
													<Button
														type="button"
														color="warning"
														onClick={() =>
															setFieldValue(
																'labExamination',
																values.labExamination.filter(
																	(_, i) => i !== index
																)
															)
														}
													>
														-
													</Button>
												</Col>
											)}
										</Row>
										<Row>
											<Col md="6">
												<SelectField
													name={`labExamination[${index}].type`}
													label="Examination Type"
													options={
														<>
															<option className="text-gray-300" default>
																Select exam type
															</option>
															{Object.values(ExaminationType).map((type) => (
																<option key={type} value={type}>
																	{type}
																</option>
															))}
														</>
													}
												/>
											</Col>
											<Col md="6">
												<NumberField
													name={`labExamination[${index}].weight`}
													min="0"
													max="100"
													label="Weight"
												/>
											</Col>
										</Row>
										<Row>
											<Col md="6">
												<NumberField
													name={`labExamination[${index}].lowerGradeThreshold`}
													min="0"
													max="10"
													step="0.5"
													label="Lower Grade Threshold"
												/>
											</Col>
										</Row>
									</div>
								))}
							</>
						)}
						<Row>
							<ClearButton
								onClick={() => resetForm()}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingTeachingGrading &&
									  (teaching?.theoryExamination?.length ||
											teaching?.labExamination?.length) ? (
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
