import { memo, useState } from 'react';
import { Row, Col, Button, Spinner, Tooltip } from 'reactstrap';
import { Formik, Form, FieldArray } from 'formik';
import { updateTeaching } from '../../../features/courses/teachingSlice';
import { TeachingSchema } from '../../../schemas/course/Teaching';
import NumberField from '../../form/NumberField';
import TextField from '../../form/TextField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function TeachingForm({
	teaching,
	editTeachingId,
	setModal,
	dispatch,
}) {
	const [tooltip, setTooltipOpen] = useState(null);

	const TooltipComponent = memo(({ field }) => {
		return (
			<Tooltip
				placement="top"
				isOpen={tooltip === field}
				target={field === 'theory' ? 'theoryTooltip' : 'labTooltip'}
				toggle={() => setTooltipOpen(tooltip === field ? null : field)}
			>
				{field === 'theory'
					? 'Course has no lab, so the theory weight can not be edited'
					: 'Course has no lab, so the lab weight can not be edited'}
			</Tooltip>
		);
	});

	return (
		<>
			<Formik
				initialValues={{
					theoryWeight: teaching ? teaching.theoryWeight : 0,
					labWeight: teaching ? teaching.labWeight : 0,
					theoryGradeRetentionYears: teaching
						? teaching.theoryGradeRetentionYears
						: 0,
					labGradeRetentionYears: teaching
						? teaching.labGradeRetentionYears
						: 0,
					theoryGradeThreshold: teaching ? teaching.theoryGradeThreshold : 0,
					labGradeThreshold: teaching ? teaching.labGradeThreshold : 0,
					books: teaching ? teaching.books : [],
				}}
				enableReinitialize={true}
				validationSchema={TeachingSchema}
				onSubmit={(values, { setSubmitting }) => {
					const teachingData = {
						theoryWeight: values.theoryWeight,
						labWeight: values.labWeight,
						theoryGradeRetentionYears: values.theoryGradeRetentionYears,
						labGradeRetentionYears: values.labGradeRetentionYears,
						theoryGradeThreshold: values.theoryGradeThreshold,
						labGradeThreshold: values.labGradeThreshold,
						books: values.books.some(Boolean) ? values.books : [],
						course: teaching.course._id,
						semester: teaching.semester._id,
					};
					dispatch(
						updateTeaching({ teachingId: editTeachingId, data: teachingData })
					);
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset }) => (
					<Form>
						<Row>
							<Col md="12" lg="6">
								<NumberField
									id="theoryTooltip"
									min="0"
									max="100"
									name="theoryWeight"
									disabled={teaching.course.hasLab ? false : true}
									label="Theory Weight"
								/>
								{teaching.course.hasLab ? null : (
									<TooltipComponent field={'theory'} />
								)}
							</Col>
							<Col>
								<NumberField
									id="labTooltip"
									min="0"
									max="100"
									name="labWeight"
									disabled={teaching.course.hasLab ? false : true}
									label="Lab Weight"
								/>
								{teaching.course.hasLab ? null : (
									<TooltipComponent field={'lab'} />
								)}
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<NumberField
									min="0"
									name="theoryGradeRetentionYears"
									label="Theory Grade Retention Years"
								/>
							</Col>
							<Col>
								<NumberField
									min="0"
									name="labGradeRetentionYears"
									label="Lab Grade Retention Years"
								/>
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<NumberField
									min="0"
									step="0.1"
									name="theoryGradeThreshold"
									label="Theory Grade Threshold"
								/>
							</Col>
							<Col>
								<NumberField
									min="0"
									step="0.1"
									name="labGradeThreshold"
									label="Lab Grade Threshold"
								/>
							</Col>
						</Row>
						<small
							className="text-muted pill-label mb-3"
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 12,
							}}
						>
							Recommended Books
						</small>
						<FieldArray name="books">
							{({ push, remove }) => (
								<Row>
									<Col lg="2" xl="2" className="mb-3">
										<Button
											color="info"
											onClick={() => push('')}
											disabled={isSubmitting}
										>
											Add Book
										</Button>
									</Col>
									<Col lg="9" xl="9">
										{values.books.map((_, index) => (
											<div key={index}>
												<Row>
													<Col>
														<TextField
															name={`books.${index}`}
															label={`Book ${index + 1}`}
														/>
													</Col>
													<Col
														xs="2"
														sm="2"
														md="2"
														lg="1"
														xl="1"
														className="mb-3 text-right"
													>
														<Button
															color="warning"
															onClick={() => remove(index)}
															disabled={isSubmitting}
														>
															-
														</Button>
													</Col>
												</Row>
											</div>
										))}
									</Col>
								</Row>
							)}
						</FieldArray>
						<Row>
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
									) : (
										'Update'
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
