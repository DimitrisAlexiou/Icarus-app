import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { CourseSchema } from '../../schemas/Course';
import { getCourses, reset } from '../../features/courses/courseSlice';
import { Toast } from '../../constants/sweetAlertNotification';
import courseService from '../../features/courses/courseService';
import FormErrorMessage from '../../components/FormErrorMessage';
import Spinner from '../../components/boilerplate/Spinner';
import CancelButton from '../../components/buttons/CancelButton';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function UndergraduateCourses() {
	// const { isAuthenticated, isLoading } = useAuth0();
	const {
		courses,
		isLoading: courseIsLoading,
		isSuccess,
	} = useSelector((state) => state.courses);

	const initialValues = {
		prerequisite: '',
		prerequisiteType: '',
	};

	const [hasPrerequisites, sethasPrerequisites] = useState(false);
	const [prerequisites, setPrerequisites] = useState([{ title: '' }]);

	const handlePrerequisites = () => {
		sethasPrerequisites(!hasPrerequisites);
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

	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const onSubmit = async (formPrerequisitesData) => {
		try {
			await courseService.defineCoursePrerequisites(formPrerequisitesData);
			Toast.fire({
				title: 'Success',
				text: 'Course prerequisites defined successfully!',
				icon: 'success',
			});
			navigate('/course');
		} catch (error) {
			Toast.fire({
				title: 'Error while defining course prerequisites!',
				text: error.response.data,
				icon: 'error',
			});
		}
	};

	// if (isLoading || courseIsLoading) {
	// 	return <Spinner />;
	// }
	if (courseIsLoading) {
		return <Spinner />;
	}

	return (
		// isAuthenticated && (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={CourseSchema}
				onSubmit={(formPrerequisitesData) => {
					onSubmit(formPrerequisitesData);
				}}
				validateOnMount
			>
				<div id="content-wrapper" className="d-flex flex-column">
					<div id="content">
						<div>
							<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
								Define Course Prerequisites !
							</h1>
							<div className="row justify-content-center">
								<div className="col-sm-12 col-md-11 col-lg-10 col-xl-8">
									<div className="card shadow mb-4">
										<div className="card-header py-3">
											<h6 className="m-0 font-weight-bold text-primary">
												Fill the form below to define course prerequisites
											</h6>
										</div>
										<div className="card-body">
											<Form name="CoursePrerequisites">
												<Button
													color="info"
													className="mb-3"
													onClick={() => handleAddPrerequisite()}
												>
													Add Prerequisite
												</Button>
												<Row className="mb-3">
													{prerequisites.map((field, index) => (
														<>
															<Col md="3">
																<FormGroup
																	className="form-floating mb-3"
																	floating
																>
																	<Field
																		as="select"
																		className="form-control"
																		name="prerequisite"
																	>
																		<option default>Select prerequisite</option>
																		{courses.map((course) => (
																			<option
																				key={course._id}
																				value={course.title}
																			>
																				{course.title}
																			</option>
																		))}
																	</Field>
																	<Label
																		for="prerequisite"
																		className="text-gray-600"
																	>
																		Prerequisite {index + 1}
																	</Label>
																	<ErrorMessage
																		name="prerequisite"
																		component={FormErrorMessage}
																	/>
																</FormGroup>
															</Col>
															<Col md="2">
																<FormGroup
																	className="form-floating mb-3"
																	floating
																>
																	<Field
																		as="select"
																		className="form-control"
																		name="prerequisiteType"
																	>
																		<option default>Select type</option>
																		<option value={'Hard'}>Hard</option>
																		<option value={'Soft'}>Soft</option>
																	</Field>
																	<Label
																		for="prerequisiteType"
																		className="text-gray-600"
																	>
																		Prerequisite Type
																	</Label>
																	<ErrorMessage
																		name="prerequisiteType"
																		component={FormErrorMessage}
																	/>
																</FormGroup>
															</Col>
															<Col md="1">
																<Button
																	variant="secondary"
																	onClick={() =>
																		handleRemovePrerequisite(index)
																	}
																>
																	X
																</Button>
															</Col>
														</>
													))}
												</Row>

												<div className="row">
													<CancelButton url={'/course'} />
													<SubmitButton message={'Define Prerequuisite'} />
												</div>
											</Form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Formik>
		</>
	);
	// );
}
