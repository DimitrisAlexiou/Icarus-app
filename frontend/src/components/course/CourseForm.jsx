import { useState, useRef, forwardRef, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormGroup, Label, Row, Col, Button, Tooltip, Spinner } from 'reactstrap';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CourseSchema } from '../../schemas/course/Course';
import { createCourse, updateCourse } from '../../features/courses/courseSlice';
import { FormCheckbox } from '../form/FormCheckbox';
import { CourseType, PrerequisiteType } from '../../constants/enums';
import FormErrorMessage from '../form/FormErrorMessage';

export default function CourseForm({
	course,
	courses,
	cycles,
	semesters,
	isEditingCourse,
	editCourseId,
}) {
	const courseYearOptions = useMemo(
		() => ({
			[CourseType.Undergraduate]: [
				{ value: 1, label: '1' },
				{ value: 2, label: '2' },
				{ value: 3, label: '3' },
				{ value: 4, label: '4' },
				{ value: 5, label: '5' },
			],
			[CourseType.Mixed]: [
				{ value: 1, label: '1' },
				{ value: 2, label: '2' },
				{ value: 3, label: '3' },
				{ value: 4, label: '4' },
				{ value: 5, label: '5' },
			],
			[CourseType.Master]: [
				{ value: 1, label: '1' },
				{ value: 2, label: '2' },
			],
		}),
		[]
	);

	const ctc = useRef(null);
	const [tooltipIdOpen, setTooltipIdOpen] = useState(false);
	const tooltipId = () => {
		setTooltipIdOpen(!tooltipIdOpen);
	};

	const [hasPrerequisites, setHasPrerequisites] = useState(false);
	const [isObligatory, setIsObligatory] = useState(true);

	const handlePrerequisites = () => {
		setHasPrerequisites(!hasPrerequisites);
	};

	const handleIsObligatory = () => {
		setIsObligatory(!isObligatory);
	};

	const CourseTooltipComponent = forwardRef((props, ref) => {
		const { ctc } = props;
		return (
			<Tooltip
				ref={ctc}
				placement="top"
				isOpen={tooltipIdOpen}
				target="courseIdTooltip"
				toggle={tooltipId}
			>
				Course ID: 321/xxxx or 321/xxxxx
			</Tooltip>
		);
	});

	useEffect(() => {
		setHasPrerequisites(course && course.prerequisites && course.prerequisites.length > 0);
	}, [course]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Formik
				initialValues={{
					courseId: course ? course.courseId : '',
					title: course ? course.title : '',
					type: course ? course.type : '',
					isObligatory: course ? course.isObligatory : true,
					hasPrerequisites: course ? course.hasPrerequisites : false,
					hasLab: course ? course.hasLab : false,
					description: course ? course.description : '',
					semester: course ? course.semester : '',
					ects: course ? course.ects : 0,
					year: course ? course.year : '',
					cycle: course ? course.cycle : '',
					prerequisites: course ? course.prerequisites : [],
				}}
				enableReinitialize={true}
				validationSchema={CourseSchema}
				onSubmit={(values, { setSubmitting }) => {
					const courseData = {
						courseId: values.courseId,
						title: values.title,
						type: values.type,
						isObligatory: values.isObligatory,
						hasPrerequisites: values.hasPrerequisites,
						hasLab: values.hasLab,
						description: values.description,
						semester: values.semester,
						ects: values.ects,
						year: values.year,
						cycle: values.cycle ? values.cycle : null,
						prerequisites: values.prerequisites.some(Boolean)
							? values.prerequisites
							: [],
						isActive: course ? course.isActive : false,
					};
					if (isEditingCourse) {
						console.log(courseData);
						dispatch(updateCourse({ courseId: editCourseId, data: courseData }));
						setSubmitting(false);
						return;
					}
					console.log(courseData);
					dispatch(createCourse(courseData));
					setSubmitting(false);
					navigate('/course');
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
						<Row>
							<Col md="4">
								<FormGroup
									id="courseIdTooltip"
									className="form-floating mb-3"
									floating
								>
									<Field type="text" className="form-control" name="courseId" />
									<Label for="courseId" className="text-gray-600">
										Course ID
									</Label>
									<ErrorMessage name="courseId" component={FormErrorMessage} />
								</FormGroup>
								<CourseTooltipComponent ctc={ctc} />
							</Col>
							<Col md="8">
								<FormGroup className="form-floating mb-3" floating>
									<Field type="text" className="form-control" name="title" />
									<Label for="title" className="text-gray-600">
										Course Title
									</Label>
									<ErrorMessage name="title" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col md="4">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										as="select"
										className="form-control"
										name="type"
										value={values.type}
										onChange={async (e) => {
											const { value } = e.target;
											const _years = courseYearOptions[value] || [];
											setFieldValue('type', value);
											setFieldValue('year', '');
											setFieldValue('years', _years);
										}}
									>
										<option default>Select course type</option>
										{Object.entries(courseYearOptions).map(([type, years]) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</Field>
									<Label for="type" className="text-gray-600">
										Course Type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="3">
								<FormGroup className="mx-1 mb-3 mt-3" check>
									<Field
										type="checkbox"
										name="isObligatory"
										component={FormCheckbox}
										onClick={handleIsObligatory}
									/>
									<Label for="isObligatory" className="text-gray-500">
										Obligatory
									</Label>
								</FormGroup>
							</Col>
							<Col md="3">
								<FormGroup className="mx-1 mb-3 mt-3" check>
									<Field
										type="checkbox"
										name="hasPrerequisites"
										component={FormCheckbox}
										onClick={handlePrerequisites}
									/>
									<Label for="hasPrerequisites" className="text-gray-500">
										Prerequisites
									</Label>
								</FormGroup>
							</Col>
							<Col md="2">
								<FormGroup className="mx-1 mb-3 mt-3" check>
									<Field type="checkbox" name="hasLab" component={FormCheckbox} />
									<Label for="hasLab" className="text-gray-500">
										Lab
									</Label>
								</FormGroup>
							</Col>
						</Row>

						<FormGroup className="form-floating mb-3" floating>
							<Field
								as="textarea"
								className="form-control"
								style={{ height: '180px', text_align: 'justify' }}
								name="description"
							/>
							<Label for="description" className="text-gray-600">
								Course Description
							</Label>
							<ErrorMessage name="description" component={FormErrorMessage} />
						</FormGroup>

						<Row>
							<Col md="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="semester">
										<option default>Select course semester</option>
										{semesters.map((semester) => (
											<option key={semester._id} value={semester._id}>
												{semester.type}
											</option>
										))}
									</Field>
									<Label for="semester" className="text-gray-600">
										Course Semester
									</Label>
									<ErrorMessage name="semester" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										className="form-control"
										name="ects"
									/>
									<Label for="ects" className="text-gray-600">
										Course ECTS
									</Label>
									<ErrorMessage name="ects" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col md="6">
								<FormGroup
									id="courseYearTooltip"
									className="form-floating mb-3"
									floating
								>
									<Field
										as="select"
										className="form-control"
										name="year"
										value={values.year}
										disabled={!values.type}
									>
										<option default>Select course year</option>
										{course ? (
											<option>{course.year}</option>
										) : (
											values.years &&
											values.years.map((y) => (
												<option key={y.value} value={y.value}>
													{y.label}
												</option>
											))
										)}
									</Field>
									<Label for="year" className="text-gray-600">
										Course Year
									</Label>
									<ErrorMessage name="year" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="6">
								{!isObligatory || (course && course.cycle) ? (
									<>
										<FormGroup className="form-floating mb-3" floating>
											<Field
												as="select"
												className="form-control"
												name="cycle"
											>
												<option default>Select course cycle</option>
												{cycles.names.map((cycle) => (
													<option key={cycle._id} value={cycle._id}>
														{cycle.cycle}
													</option>
												))}
											</Field>
											<Label for="cycle" className="text-gray-600">
												Course Cycle
											</Label>
											<ErrorMessage
												name="cycle"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</>
								) : null}
							</Col>
						</Row>

						{hasPrerequisites ? (
							<>
								<FormGroup className="form-floating mb-3" floating>
									<FieldArray
										name="prerequisites"
										render={(arrayHelpers) => (
											<>
												<Row className="mb-3">
													<Col xs="6" sm="6">
														<Button
															color="info"
															onClick={() =>
																arrayHelpers.push({
																	prerequisite: '',
																	prerequisiteType: '',
																})
															}
														>
															Add Prerequisite
														</Button>
													</Col>
													<Col className="text-right">
														{values.prerequisites.length > 1 && (
															<Button
																color="warning"
																onClick={() => arrayHelpers.pop()}
															>
																-
															</Button>
														)}
													</Col>
												</Row>
												{values.prerequisites.length > 0 &&
													values.prerequisites.map(
														(prerequisite, index) => (
															<Row key={prerequisite._id}>
																<Col md="6">
																	<FormGroup
																		className="form-floating mb-3"
																		floating
																	>
																		<Field
																			as="select"
																			className="form-control"
																			name={`prerequisites.${index}.prerequisite`}
																		>
																			<option default>
																				Select prerequisite
																			</option>
																			{courses.map(
																				(course) => (
																					<option
																						key={
																							course._id
																						}
																						value={
																							course._id
																						}
																					>
																						{
																							course.title
																						}
																					</option>
																				)
																			)}
																		</Field>
																		<Label
																			for={`prerequisites.${index}.prerequisite`}
																			className="text-gray-600"
																		>
																			Prerequisite {index + 1}
																		</Label>
																		<ErrorMessage
																			name={`prerequisites.${index}.prerequisite`}
																			component={
																				FormErrorMessage
																			}
																		/>
																	</FormGroup>
																</Col>
																<Col>
																	<FormGroup
																		className="form-floating"
																		floating
																	>
																		<Field
																			as="select"
																			className="form-control"
																			name={`prerequisites.${index}.prerequisiteType`}
																		>
																			<option default>
																				Select type
																			</option>
																			<option
																				value={
																					PrerequisiteType.Hard
																				}
																			>
																				Hard
																			</option>
																			<option
																				value={
																					PrerequisiteType.Soft
																				}
																			>
																				Soft
																			</option>
																		</Field>
																		<Label
																			for={`prerequisites.${index}.prerequisiteType`}
																			className="text-gray-600"
																		>
																			Prerequisite Type
																		</Label>
																		<ErrorMessage
																			name={`prerequisites.${index}.prerequisiteType`}
																			component={
																				FormErrorMessage
																			}
																		/>
																	</FormGroup>
																</Col>
															</Row>
														)
													)}
											</>
										)}
									/>
									<ErrorMessage
										name="prerequisites"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</>
						) : null}

						<Row>
							<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
								<Button
									onClick={() => {
										handleReset();
										if (!course) {
											setHasPrerequisites(false);
											setIsObligatory(true);
										}
									}}
									disabled={!dirty || isSubmitting}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-sm-right text-center mt-sm-0 mt-3">
								<Button color="primary" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingCourse ? (
										'Update'
									) : (
										'Create'
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
