import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { UserSchema } from '../../schemas/auth/User';
import { register } from '../../features/auth/authSlice';
import FormErrorMessage from '../FormErrorMessage';

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [selectedType, setSelectedType] = useState('');

	const dispatch = useDispatch();

	const handleTypeChange = (e) => {
		setSelectedType(e.target.value);
	};

	const studentFields = (
		<>
			<Row>
				<Col md="5">
					<FormGroup className="form-floating mb-3" floating>
						<Field type="text" className="form-control" name="studentId" />
						<Label for="studentId" className="text-gray-600">
							Student ID
						</Label>
						<ErrorMessage name="studentId" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="7">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="studentType">
							<option default>Select student type</option>
							<option value={'Undergraduate'}>Undergraduate</option>
							<option value={'Master'}>Master</option>
							<option value={'PhD'}>PhD</option>
						</Field>
						<Label for="studentType" className="text-gray-600">
							Student Type
						</Label>
						<ErrorMessage name="studentType" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md="5">
					<FormGroup className="form-floating mb-3" floating>
						<Field type="number" min="0" className="form-control" name="entranceYear" />
						<Label for="entranceYear" className="text-gray-600">
							Entrance Year
						</Label>
						<ErrorMessage name="entranceYear" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>
		</>
	);

	const instructorFields = (
		<>
			<Row>
				<Col md="5">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="facultyType">
							<option default>Select faculty type</option>
							<option value={'DEP'}>DEP</option>
							<option value={'EDIP'}>EDIP</option>
							<option value={'ETEP'}>ETEP</option>
						</Field>
						<Label for="facultyType" className="text-gray-600">
							Faculty Type
						</Label>
						<ErrorMessage name="facultyType" component={FormErrorMessage} />
					</FormGroup>
				</Col>
				<Col md="7">
					<FormGroup className="form-floating mb-3" floating>
						<Field as="select" className="form-control" name="degree">
							<option default>Select degree type</option>
							<option value={'Assistant'}>Assistant</option>
							<option value={'Associate'}>Associate</option>
							<option value={'Professor'}>Professor</option>
						</Field>
						<Label for="degree" className="text-gray-600">
							Degree
						</Label>
						<ErrorMessage name="degree" component={FormErrorMessage} />
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
						/>
						<Label for="instructorEntranceYear" className="text-gray-600">
							Entrance Year
						</Label>
						<ErrorMessage name="instructorEntranceYear" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>
		</>
	);

	return (
		<>
			<Formik
				initialValues={{
					name: '',
					surname: '',
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					type: '',
					studentId: '',
					studentType: '',
					entranceYear: '',
					facultyType: '',
					degree: '',
					instructorEntranceYear: '',
				}}
				validationSchema={UserSchema}
				onSubmit={(values, { setSubmitting }) => {
					if (values.type === 'Student') {
						const user = {
							name: values.name,
							surname: values.surname,
							username: values.username,
							email: values.email,
							password: values.password,
							type: values.type,
							studentId: values.studentId,
							studentType: values.studentType,
							entranceYear: values.entranceYear,
						};
						dispatch(register(user));
						setSubmitting(false);
					} else if (values.type === 'Instructor') {
						const user = {
							name: values.name,
							surname: values.surname,
							username: values.username,
							email: values.email,
							password: values.password,
							type: values.type,
							facultyType: values.facultyType,
							degree: values.degree,
							instructorEntranceYear: values.instructorEntranceYear,
						};
						dispatch(register(user));
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
									<Field type="text" className="form-control" name="name" />
									<Label for="name" className="text-gray-600">
										Name
									</Label>
									<ErrorMessage name="name" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field type="text" className="form-control" name="surname" />
									<Label for="surname" className="text-gray-600">
										Surname
									</Label>
									<ErrorMessage name="surname" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field type="text" className="form-control" name="username" />
									<Label for="username" className="text-gray-600">
										Username
									</Label>
									<ErrorMessage name="username" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="7">
								<FormGroup className="form-group mb-3" floating>
									<Field type="email" className="form-control" name="email" />
									<Label for="email" className="text-gray-600">
										Email
									</Label>
									<ErrorMessage name="email" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="5" sm="10" xs="10">
								<FormGroup className="form-group mb-3" floating>
									<Field
										type={showPassword ? 'text' : 'password'}
										className="form-control"
										name="password"
									/>
									<Label for="password" className="text-gray-600">
										Password
									</Label>
									<ErrorMessage name="password" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col
								md="1"
								sm="1"
								xs="1"
								className="mb-3 d-flex justify-content-center"
							>
								<Button
									type="button"
									className="nav-link align-items-center"
									color="null"
								>
									<FontAwesomeIcon
										icon={faEyeSlash}
										onClick={() => setShowPassword(!showPassword)}
									/>
								</Button>
							</Col>
							<Col md="6">
								<FormGroup className="form-group mb-3" floating>
									<Field
										type={showPassword ? 'text' : 'password'}
										className="form-control"
										name="confirmPassword"
									/>
									<Label for="confirmPassword" className="text-gray-600">
										Confirm Password
									</Label>
									<ErrorMessage
										name="confirmPassword"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										as="select"
										className="form-control"
										name="type"
										onClick={handleTypeChange}
									>
										<option className="text-gray-300" default>
											Select your role
										</option>
										<option value={'Student'}>Student</option>
										<option value={'Instructor'}>Instructor</option>
									</Field>
									<Label for="type" className="text-gray-600">
										Type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						{selectedType === 'Student' ? studentFields : null}
						{selectedType === 'Instructor' ? instructorFields : null}
						<Row className="">
							<Col md="6" sm="6" xs="12" className="text-sm-left text-center">
								<Button
									onClick={() => {
										handleReset();
										setSelectedType('');
										setShowPassword(false);
									}}
									disabled={!dirty || isSubmitting}
								>
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
										'Register'
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
