import { useState, useEffect, useRef, forwardRef } from 'react';
import { FormGroup, Label, Row, Col, Button, Tooltip } from 'reactstrap';
import { Form, Field, FieldArray, ErrorMessage } from 'formik';
import { FormCheckbox } from '../FormCheckbox';
import SubmitButton from '../buttons/SubmitButton';
import FormErrorMessage from '../FormErrorMessage';

export default function CourseForm({
	courses,
	cycles,
	semesters,
	values,
	setFieldValue,
	isSubmitting,
	dirty,
	handleReset,
}) {
	const courseYear = (type) => {
		return new Promise((resolve, reject) => {
			switch (type) {
				case 'Undergraduate':
					resolve([
						{ value: '1', label: '1' },
						{ value: '2', label: '2' },
						{ value: '3', label: '3' },
						{ value: '4', label: '4' },
						{ value: '5', label: '5' },
					]);
					break;
				case 'Master':
					resolve([
						{ value: '1', label: '1' },
						{ value: '2', label: '2' },
					]);
					break;
				case 'Mixed':
					resolve([
						{ value: '1', label: '1' },
						{ value: '2', label: '2' },
						{ value: '3', label: '3' },
						{ value: '4', label: '4' },
						{ value: '5', label: '5' },
					]);
					break;
				default:
					resolve([]);
			}
		});
	};

	const ctc = useRef(null);
	const ytc = useRef(null);

	const [tooltipIdOpen, setTooltipIdOpen] = useState(false);
	const tooltipId = () => {
		setTooltipIdOpen(!tooltipIdOpen);
	};

	const [tooltipYearOpen, setTooltipYearOpen] = useState(false);
	const tooltipYear = () => {
		setTooltipYearOpen(!tooltipYearOpen);
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
		return (
			<Tooltip
				ref={ref}
				placement="top"
				isOpen={tooltipIdOpen}
				target="courseIdTooltip"
				toggle={tooltipId}
			>
				Course ID: 321/xxxx or 321/xxxxx
			</Tooltip>
		);
	});

	const YearTooltipComponent = forwardRef((props, ref) => {
		return (
			<Tooltip
				ref={ref}
				placement="top"
				isOpen={tooltipYearOpen}
				target="courseYearTooltip"
				toggle={tooltipYear}
			>
				You must select the course type first in order to assign year for the course
			</Tooltip>
		);
	});

	useEffect(() => {
		if (!dirty) {
			setIsObligatory(true);
			setHasPrerequisites(false);
		}
	}, [dirty]);

	return (
		<>
			<Form>
				<Row>
					<Col md="4">
						<FormGroup id="courseIdTooltip" className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="courseId" />
							<Label for="courseId" className="text-gray-600">
								Course ID
							</Label>
							<ErrorMessage name="courseId" component={FormErrorMessage} />
						</FormGroup>
						<CourseTooltipComponent ref={ctc} />
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
									const _years = await courseYear(value);
									setFieldValue('type', value);
									setFieldValue('year', '');
									setFieldValue('years', _years);
								}}
							>
								<option default>Select course type</option>
								<option value={'Undergraduate'}>Undergraduate</option>
								<option value={'Master'}>Master</option>
								<option value={'Mixed'}>Mixed</option>
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
								{semesters.map((semester, index) => (
									<option key={index} value={semester._id}>
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
							<Field type="number" min="0" className="form-control" name="ects" />
							<Label for="ects" className="text-gray-600">
								Course ECTS
							</Label>
							<ErrorMessage name="ects" component={FormErrorMessage} />
						</FormGroup>
					</Col>
				</Row>

				<Row>
					<Col md="6">
						<FormGroup id="courseYearTooltip" className="form-floating mb-3" floating>
							<Field
								as="select"
								className="form-control"
								name="year"
								value={values.year}
							>
								<option default>Select course year</option>
								{values.years &&
									values.years.map((y) => (
										<option key={y.value} value={y.value}>
											{y.label}
										</option>
									))}
							</Field>
							<Label for="year" className="text-gray-600">
								Course Year
							</Label>
							<ErrorMessage name="year" component={FormErrorMessage} />
						</FormGroup>
						<YearTooltipComponent ref={ytc} />
					</Col>
					<Col md="6">
						{!isObligatory && (
							<>
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="cycle">
										<option default>Select course cycle</option>
										{cycles.names.map((cycle, index) => (
											<option key={index} value={cycle._id}>
												{cycle.cycle}
											</option>
										))}
									</Field>
									<Label for="cycle" className="text-gray-600">
										Course Cycle
									</Label>
									<ErrorMessage name="cycle" component={FormErrorMessage} />
								</FormGroup>
							</>
						)}
					</Col>
				</Row>

				{hasPrerequisites && (
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
													+
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
											values.prerequisites.map((prerequisite, index) => (
												<Row key={index}>
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
																{courses.map((course, index) => (
																	<option
																		key={index}
																		value={course._id}
																	>
																		{course.title}
																	</option>
																))}
															</Field>
															<Label
																for={`prerequisites.${index}.prerequisite`}
																className="text-gray-600"
															>
																Prerequisite {index + 1}
															</Label>
															<ErrorMessage
																name={`prerequisites.${index}.prerequisite`}
																component={FormErrorMessage}
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
																<option default>Select type</option>
																<option value={'Hard'}>Hard</option>
																<option value={'Soft'}>Soft</option>
															</Field>
															<Label
																for={`prerequisites.${index}.prerequisiteType`}
																className="text-gray-600"
															>
																Prerequisite Type
															</Label>
															<ErrorMessage
																name={`prerequisites.${index}.prerequisiteType`}
																component={FormErrorMessage}
															/>
														</FormGroup>
													</Col>
												</Row>
											))}
									</>
								)}
							/>
							<ErrorMessage name="prerequisites" component={FormErrorMessage} />
						</FormGroup>
					</>
				)}

				<Row>
					<Col className="mb-3">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					<Col className="text-right px-0">
						<SubmitButton
							color={'primary'}
							message={'Create Course'}
							disabled={isSubmitting}
						/>
					</Col>
				</Row>
			</Form>
		</>
	);
}
