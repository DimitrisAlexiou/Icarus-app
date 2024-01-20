import { useState, useEffect, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	FormGroup,
	Label,
	Row,
	Col,
	Button,
	Tooltip,
	Spinner,
} from 'reactstrap';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CourseSchema } from '../../../schemas/course/Course';
import {
	createCourse,
	setEditCourse,
	updateCourse,
} from '../../../features/courses/courseSlice';
import {
	CourseType,
	PrerequisiteType,
	SemesterType,
} from '../../../constants/enums';
import FormErrorMessage from '../../form/FormErrorMessage';
import NumberField from '../../form/NumberField';
import TextField from '../../form/TextField';
import SelectField from '../../form/SelectField';
import TextAreaField from '../../form/TextAreaField';
import CheckBoxField from '../../form/CheckBoxField';
import ClearButton from '../../buttons/ClearButton';
import SubmitButton from '../../buttons/SubmitButton';

export default function CourseForm({
	course,
	courses,
	cycles,
	masters,
	isEditingCourse,
	editCourseId,
	dispatch,
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

	const [tooltip, setTooltipOpen] = useState(false);
	const [hasPrerequisites, setHasPrerequisites] = useState(false);
	const [isObligatory, setIsObligatory] = useState(true);

	const handlePrerequisites = () => {
		setHasPrerequisites(!hasPrerequisites);
	};

	const handleIsObligatory = () => {
		if (isEditingCourse && course.cycle) {
			setIsObligatory(true);
		}
		setIsObligatory(!isObligatory);
	};

	const TooltipComponent = memo(({ type }) => {
		return (
			<Tooltip
				placement="top"
				isOpen={tooltip}
				target="courseIdTooltip"
				toggle={() => setTooltipOpen(!tooltip)}
			>
				{type === CourseType.Undergraduate || type === CourseType.Mixed
					? 'Course ID: 321-xxxx or 321-xxxxx'
					: type === CourseType.Master
					? 'Course ID: 1000..up to 9999'
					: 'Select the course type first'}
			</Tooltip>
		);
	});

	useEffect(() => {
		setHasPrerequisites(
			course && course.prerequisites && course.prerequisites.length > 0
		);
	}, [course]);

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
					master: course ? course.master : '',
					prerequisites: course ? course.prerequisites : [],
				}}
				enableReinitialize={true}
				validationSchema={CourseSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log('Entered onSubmit');
					const courseData = {
						courseId: values.courseId,
						title: values.title,
						type: values.type,
						isObligatory: values.isObligatory,
						hasPrerequisites: values.prerequisites.some(Boolean)
							? values.hasPrerequisites
							: false,
						hasLab: values.hasLab,
						description: values.description,
						semester: values.semester,
						ects: values.ects,
						year: values.year,
						cycle: values.cycle ? values.cycle : null,
						master: values.master ? values.master : null,
						prerequisites: values.prerequisites.some(Boolean)
							? values.prerequisites
							: [],
						isActive: course ? course.isActive : false,
					};
					console.log(courseData);
					if (isEditingCourse) {
						console.log('Updating course:', courseData);
						dispatch(
							updateCourse({ courseId: editCourseId, data: courseData })
						);
						setSubmitting(false);
						dispatch(
							setEditCourse({ isEditingCourse: false, editCourseId: '' })
						);
					} else {
						console.log('Creating course:', courseData);
						dispatch(createCourse(courseData));
						setSubmitting(false);
						navigate('/course');
					}
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
					<Form>
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
										Type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="8">
								<TextField name="title" label="Title" />
							</Col>
						</Row>
						<Row className="align-items-center">
							<Col md="4">
								<TextField
									id="courseIdTooltip"
									name="courseId"
									label="ID"
									disabled={!values.type}
								/>
								<TooltipComponent type={values.type} />
							</Col>
							<Col md="3">
								<CheckBoxField
									name="isObligatory"
									label="Obligatory"
									onClick={handleIsObligatory}
									disabled={!values.type || values.type === CourseType.Master}
								/>
							</Col>
							<Col md="3">
								<CheckBoxField
									name="hasPrerequisites"
									label="Prerequisites"
									onClick={handlePrerequisites}
								/>
							</Col>
							<Col md="2">
								<CheckBoxField name="hasLab" label="Lab" />
							</Col>
						</Row>
						<TextAreaField name="description" label="Description" />
						<Row>
							<Col md="6">
								<SelectField
									name="semester"
									label="Semester"
									options={
										<>
											<option className="text-gray-300" default>
												Select course semester
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
							</Col>
							<Col md="3">
								<NumberField name="ects" min="0" step="0.5" label="ECTS" />
							</Col>
							<Col md="3">
								<SelectField
									name="year"
									label="Year"
									value={values.year}
									disabled={!values.type}
									options={
										<>
											<option className="text-gray-300" default>
												Select course year
											</option>
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
										</>
									}
								/>
							</Col>
						</Row>
						<Row>
							{values.type === CourseType.Master ? (
								<Col md="6">
									<SelectField
										name="master"
										label="Master Program"
										options={
											<>
												<option className="text-gray-300" default>
													Select master program
												</option>
												{masters.map((master) => (
													<option key={master._id} value={master._id}>
														{master.title}
													</option>
												))}
											</>
										}
									/>
								</Col>
							) : null}
							<Col md="6">
								{isEditingCourse &&
								course.cycle &&
								isObligatory === false ? null : !isObligatory ||
								  (course && course.cycle) ? (
									<>
										<SelectField
											name="cycle"
											label="Cycle"
											options={
												<>
													{course ? (
														<option>{course.cycle.cycle}</option>
													) : (
														<>
															<option className="text-gray-300" default>
																Select course cycle
															</option>
															{cycles.map((cycle) => (
																<option key={cycle._id} value={cycle._id}>
																	{cycle.cycle}
																</option>
															))}
														</>
													)}
												</>
											}
										/>
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
													{!isEditingCourse ? (
														<Col className="text-right">
															{values.prerequisites.length > 1 ? (
																<Button
																	color="warning"
																	onClick={() => arrayHelpers.pop()}
																>
																	-
																</Button>
															) : null}
														</Col>
													) : null}
												</Row>
												{values.prerequisites.length > 0 &&
													values.prerequisites.map((prerequisite, index) => (
														<Row key={index}>
															<Col md="6">
																<SelectField
																	name={`prerequisites.${index}.prerequisite`}
																	label={`Prerequisite ${index + 1}`}
																	options={
																		<>
																			<option className="text-gray-300" default>
																				Select prerequisite
																			</option>
																			{courses.map((course) => (
																				<option
																					key={course._id}
																					value={course._id}
																				>
																					{course.title}
																				</option>
																			))}
																		</>
																	}
																/>
															</Col>
															<Col md="5">
																<SelectField
																	name={`prerequisites.${index}.prerequisiteType`}
																	label="Prerequisite Type"
																	options={
																		<>
																			<option className="text-gray-300" default>
																				Select type
																			</option>
																			<option value={PrerequisiteType.Hard}>
																				{PrerequisiteType.Hard}
																			</option>
																			<option value={PrerequisiteType.Soft}>
																				{PrerequisiteType.Soft}
																			</option>
																		</>
																	}
																/>
															</Col>
															{isEditingCourse ? (
																<Col md="1" className="text-right">
																	{values.prerequisites.length > 1 ? (
																		<Button
																			color="warning"
																			onClick={() => arrayHelpers.remove(index)}
																		>
																			-
																		</Button>
																	) : isEditingCourse &&
																	  values.prerequisites.length > 0 ? (
																		<Button
																			color="warning"
																			onClick={() => arrayHelpers.remove(index)}
																		>
																			-
																		</Button>
																	) : null}
																</Col>
															) : null}
														</Row>
													))}
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
							<ClearButton
								onClick={() => {
									handleReset();
									if (!course) {
										setHasPrerequisites(false);
										setIsObligatory(true);
									}
								}}
								disabled={!dirty || isSubmitting}
							/>
							<SubmitButton
								body={
									isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : isEditingCourse ? (
										'Update'
									) : (
										'Create'
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
