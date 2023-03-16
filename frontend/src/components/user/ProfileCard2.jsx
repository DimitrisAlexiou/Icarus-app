import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { UserSchema } from '../../schemas/auth/User';
import { updateProfile, reset } from '../../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../constants/sweetAlertNotification';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';
import Spinner from '../../components/boilerplate/Spinner';

export default function ProfileCard2({ user }) {
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			Toast.fire({
				title: 'Something went wrong!',
				text: message,
				icon: 'error',
			});
		}
		if (isSuccess) {
			Toast.fire({
				title: 'Success',
				text: 'Profile updated successfully!',
				icon: 'success',
			});
		}
		dispatch(reset());
	}, [dispatch, isError, isSuccess, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Formik
						initialValues={{
							name: user.user.name,
							surname: user.user.surname,
							username: user.user.username,
							email: user.user.email,
							password: '',
							studentId: user.userType.studentId,
							studentType: user.userType.studentType,
							entranceYear: user.userType.entranceYear,
							facultyType: user.userType.facultyType,
							degree: user.userType.degree,
							instructorEntranceYear: user.userType.instructorEntranceYear,
						}}
						validationSchema={UserSchema}
						onSubmit={(values, { setSubmitting }) => {
							if (user.user.type === 'Student') {
								const user = {
									name: values.name,
									surname: values.surname,
									username: values.username,
									email: values.email,
									password: values.password,
									studentId: values.studentId,
								};
								dispatch(updateProfile(user));
								setSubmitting(false);
							} else if (user.user.type === 'Instructor') {
								const user = {
									name: values.name,
									surname: values.surname,
									username: values.username,
									email: values.email,
									password: values.password,
									facultyType: values.facultyType,
									degree: values.degree,
								};
								dispatch(updateProfile(user));
								setSubmitting(false);
							}
						}}
						validateOnMount
					>
						{({ isSubmitting, dirty, handleReset }) => (
							<Form>
								<Row>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="name"
											/>
											<Label for="name" className="text-gray-600">
												Name
											</Label>
											<ErrorMessage
												name="name"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col md="7">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="surname"
											/>
											<Label for="surname" className="text-gray-600">
												Surname
											</Label>
											<ErrorMessage
												name="surname"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="5">
										<FormGroup className="form-floating mb-3" floating>
											<Field
												type="text"
												className="form-control"
												name="username"
											/>
											<Label for="username" className="text-gray-600">
												Username
											</Label>
											<ErrorMessage
												name="username"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col md="7">
										<FormGroup className="form-group mb-3" floating>
											<Field
												type="email"
												className="form-control"
												name="email"
											/>
											<Label for="email" className="text-gray-600">
												Email
											</Label>
											<ErrorMessage
												name="email"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md="10" sm="10" xs="10">
										<FormGroup className="form-group mb-3" floating>
											<Field
												type={showPassword ? 'text' : 'password'}
												className="form-control"
												name="password"
											/>
											<Label for="password" className="text-gray-600">
												Password
											</Label>
											<ErrorMessage
												name="password"
												component={FormErrorMessage}
											/>
										</FormGroup>
									</Col>
									<Col
										md="2"
										sm="2"
										xs="2"
										className="mt-2 mb-3 d-flex justify-content-center"
									>
										<Button type="button" className="nav-link" color="null">
											<FontAwesomeIcon
												icon={faEyeSlash}
												onClick={() => setShowPassword(!showPassword)}
											/>
										</Button>
									</Col>
								</Row>
								{user.user.type === 'Student' ? (
									<>
										<Row>
											<Col md="5">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="text"
														className="form-control"
														name="studentId"
													/>
													<Label
														for="studentId"
														className="text-gray-600"
													>
														Student ID
													</Label>
													<ErrorMessage
														name="studentId"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
											<Col md="7">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="text"
														className="form-control"
														name="studentType"
														disabled
													/>
													<Label
														for="studentType"
														className="text-gray-600"
													>
														Student Type
													</Label>
													<ErrorMessage
														name="studentType"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="5">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														min="0"
														className="form-control"
														name="entranceYear"
														disabled
													/>
													<Label
														for="entranceYear"
														className="text-gray-600"
													>
														Entrance Year
													</Label>
													<ErrorMessage
														name="entranceYear"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
									</>
								) : (
									<>
										<Row>
											<Col md="5">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														className="form-control"
														name="facultyType"
													>
														<option default>
															{user.userType.facultyType}
														</option>
														<option value={'DEP'}>DEP</option>
														<option value={'EDIP'}>EDIP</option>
														<option value={'ETEP'}>ETEP</option>
													</Field>
													<Label
														for="facultyType"
														className="text-gray-600"
													>
														Faculty Type
													</Label>
													<ErrorMessage
														name="facultyType"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
											<Col md="7">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														as="select"
														className="form-control"
														name="degree"
													>
														<option default>
															{user.userType.degree}
														</option>
														<option value={'Assistant'}>
															Assistant
														</option>
														<option value={'Associate'}>
															Associate
														</option>
														<option value={'Professor'}>
															Professor
														</option>
													</Field>
													<Label for="degree" className="text-gray-600">
														Degree
													</Label>
													<ErrorMessage
														name="degree"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md="5">
												<FormGroup className="form-floating mb-3" floating>
													<Field
														type="number"
														min="0"
														className="form-control"
														name="instructorEntranceYear"
														disabled
													/>
													<Label
														for="instructorEntranceYear"
														className="text-gray-600"
													>
														Entrance Year
													</Label>
													<ErrorMessage
														name="instructorEntranceYear"
														component={FormErrorMessage}
													/>
												</FormGroup>
											</Col>
										</Row>
									</>
								)}
								<Row>
									<Col md="6" sm="12" xs="12">
										<Button
											onClick={handleReset}
											disabled={!dirty || isSubmitting}
										>
											Clear
										</Button>
									</Col>
									<Col className="text-right px-0">
										<SubmitButton
											color={'primary'}
											message={'Update Profile'}
											disabled={isSubmitting}
										/>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}
