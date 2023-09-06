import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner, Tooltip } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { updateTeaching } from '../../../features/courses/teachingSlice';
import { TeachingSchema } from '../../../schemas/course/Teaching';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function TeachingForm({ teaching, editTeachingId, setModal }) {
	const dispatch = useDispatch();
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
					theoryGradeRetentionYears: teaching ? teaching.theoryGradeRetentionYears : 0,
					labGradeRetentionYears: teaching ? teaching.labGradeRetentionYears : 0,
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
					dispatch(updateTeaching({ teachingId: editTeachingId, data: teachingData }));
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset }) => (
					<Form>
						<Row>
							<Col md="12" lg="6">
								<FormGroup
									className="form-floating mb-3"
									id="theoryTooltip"
									floating
								>
									<Field
										type="number"
										min="0"
										max="100"
										className="form-control"
										name="theoryWeight"
										disabled={teaching.course.hasLab ? false : true}
									/>
									<Label for="theoryWeight" className="text-gray-600">
										Theory Weight
									</Label>
									<ErrorMessage
										name="theoryWeight"
										component={FormErrorMessage}
									/>
								</FormGroup>
								{teaching.course.hasLab ? null : (
									<TooltipComponent field={'theory'} />
								)}
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" id="labTooltip" floating>
									<Field
										type="number"
										min="0"
										max="100"
										className="form-control"
										name="labWeight"
										disabled={teaching.course.hasLab ? false : true}
									/>
									<Label for="labWeight" className="text-gray-600">
										Lab Weight
									</Label>
									<ErrorMessage name="labWeight" component={FormErrorMessage} />
								</FormGroup>
								{teaching.course.hasLab ? null : <TooltipComponent field={'lab'} />}
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="theoryGradeRetentionYears"
									/>
									<Label
										for="theoryGradeRetentionYears"
										className="text-gray-600"
									>
										Theory Grade Retention Years
									</Label>
									<ErrorMessage
										name="theoryGradeRetentionYears"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="labGradeRetentionYears"
									/>
									<Label for="labGradeRetentionYears" className="text-gray-600">
										Lab Grade Retention Years
									</Label>
									<ErrorMessage
										name="labGradeRetentionYears"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="12" lg="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										step="0.1"
										className="form-control"
										name="theoryGradeThreshold"
									/>
									<Label for="theoryGradeThreshold" className="text-gray-600">
										Theory Grade Threshold
									</Label>
									<ErrorMessage
										name="theoryGradeThreshold"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										step="0.1"
										className="form-control"
										name="labGradeThreshold"
									/>
									<Label for="labGradeThreshold" className="text-gray-600">
										Lab Grade Threshold
									</Label>
									<ErrorMessage
										name="labGradeThreshold"
										component={FormErrorMessage}
									/>
								</FormGroup>
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
														<FormGroup
															className="form-floating mb-3"
															key={index}
															floating
														>
															<Field
																type="text"
																className="form-control"
																name={`books.${index}`}
															/>
															<Label
																for={`books.${index}`}
																className="text-gray-600"
															>
																{`Book ${index + 1}`}
															</Label>
															<ErrorMessage
																name={`books.${index}`}
																component={FormErrorMessage}
															/>
														</FormGroup>
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
									) : (
										'Update'
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
