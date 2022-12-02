import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Tooltip } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import { FormCheckbox } from '../FormCheckbox';
import { getCourses, reset } from '../../features/courses/courseSlice';
import FormErrorMessage from '../FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';

const CourseForm = ({ initialValues, handleChange, values, setFieldValue }) => {
	// export default function CourseForm() {
	const { courses, courseIsLoading, isSuccess } = useSelector((state) => state.courses);

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

	const [tooltipIdOpen, setTooltipIdOpen] = useState(false);
	const tooltipId = () => {
		setTooltipIdOpen(!tooltipIdOpen);
	};

	const [tooltipYearOpen, setTooltipYearOpen] = useState(false);
	const tooltipYear = () => {
		setTooltipYearOpen(!tooltipYearOpen);
	};

	const [hasPrerequisites, setHasPrerequisites] = useState(false);
	const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
	const [isObligatory, setIsObligatory] = useState(true);

	const handlePrerequisites = () => {
		setHasPrerequisites(!hasPrerequisites);
	};

	const handleAddPrerequisite = () => {
		const values = [...prerequisites];
		values.push({
			title: '',
		});
		setPrerequisites(values);
	};

	const handleRemovePrerequisite = (index) => {
		const values = [...prerequisites];
		values.splice(index, 1);
		setPrerequisites(values);
	};

	const handleInputChange = (index, event) => {
		const values = [...prerequisites];
		const updatedValue = event.target.name;
		values[index][updatedValue] = event.target.value;

		setPrerequisites(values);
	};

	const handleIsObligatory = () => {
		setIsObligatory(!isObligatory);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);

	if (courseIsLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Row>
				<Col md="4">
					<FormGroup id="courseIdTooltip" className="form-floating mb-3" floating>
						<Field type="text" className="form-control" name="courseId" id="courseId" />
						<Label for="courseId" className="text-gray-600">
							Course ID
						</Label>
						<ErrorMessage name="courseId" component={FormErrorMessage} />
					</FormGroup>
					<Tooltip
						placement="top"
						isOpen={tooltipIdOpen}
						target="courseIdTooltip"
						toggle={tooltipId}
					>
						Course ID: 321/xxxx or 321/xxxxx
					</Tooltip>
				</Col>
				<Col md="8">
					<FormGroup className="form-floating mb-3" floating>
						<Field type="text" className="form-control" name="title" id="title" />
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
							id="type"
							value={values.type}
							onChange={async (e) => {
								const { value } = e.target;
								const _years = await courseYear(value);
								console.log(_years);
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
							name="isObligatory"
							component={FormCheckbox}
							onClick={handleIsObligatory}
							defaultChecked
						/>
						<Label for="isObligatory" className="text-gray-500">
							Obligatory
						</Label>
					</FormGroup>
				</Col>
				<Col md="3">
					<FormGroup className="mx-1 mb-3 mt-3" check>
						<Field
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
						<Field name="hasLab" component={FormCheckbox} />
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
							<option value={'Winter'}>Winter</option>
							<option value={'Spring'}>Spring</option>
							<option value={'Any'}>Any</option>
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
							id="year"
							value={values.year}
							onChange={handleChange}
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
					<Tooltip
						placement="top"
						isOpen={tooltipYearOpen}
						target="courseYearTooltip"
						toggle={tooltipYear}
					>
						You must select the course type first in order to assign year for the course
					</Tooltip>
				</Col>
				<Col md="6">
					{!isObligatory && (
						<>
							<FormGroup className="form-floating mb-3" floating>
								<Field
									as="select"
									min="1"
									max="5"
									className="form-control"
									name="cycle"
								>
									<option default>Select course cycle</option>
									<option value={'Security'}>Security</option>
									<option value={'Software Engineering'}>
										Software Engineering
									</option>
									<option value={'Information Systems'}>
										Information Systems
									</option>
									<option value={'Communication Systems'}>
										Communication Systems
									</option>
									<option value={'AI'}>AI</option>
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
					<Button color="info" className="mb-3" onClick={() => handleAddPrerequisite()}>
						Add Prerequisite
					</Button>
					<Row className="mb-3">
						{prerequisites.map((field, index) => (
							<>
								<Col md="3">
									<FormGroup className="form-floating mb-3" floating>
										<Field
											as="select"
											className="form-control"
											name="prerequisites"
										>
											<option default>Select prerequisite</option>
											{courses.map((course) => (
												<option value={course.title}>{course.title}</option>
											))}
										</Field>
										<Label for="prerequisites" className="text-gray-600">
											Prerequisite {index + 1}
										</Label>
										<ErrorMessage
											name="prerequisites"
											component={FormErrorMessage}
										/>
									</FormGroup>
								</Col>
								<Col md="2">
									<FormGroup className="form-floating mb-3" floating>
										<Field
											as="select"
											className="form-control"
											name="prerequisiteType"
										>
											<option default>Select type</option>
											<option value={'Hard'}>Hard</option>
											<option value={'Soft'}>Soft</option>
										</Field>
										<Label for="prerequisiteType" className="text-gray-600">
											Prerequisite Type
										</Label>
										<ErrorMessage
											name="prerequisiteType"
											component={FormErrorMessage}
										/>
									</FormGroup>
								</Col>
								<Col md="1" className="mb-3">
									<Button
										variant="secondary"
										onClick={() => handleRemovePrerequisite(index)}
									>
										X
									</Button>
								</Col>
							</>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default CourseForm;
