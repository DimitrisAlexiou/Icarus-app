import { FormGroup, Label, Row, Col, Button, Spinner, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUser } from '../../../features/admin/userSlice';
import {
	Degree,
	FacultyType,
	StudentType,
	UserType,
} from '../../../constants/enums';
import { UserUpdateSchema } from '../../../schemas/admin/UserUpdate';
import moment from 'moment';
import FormErrorMessage from '../../form/FormErrorMessage';

export default function UserForm({ user, setModal, editUserId, dispatch }) {
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
							<option value={StudentType.Undergraduate}>
								{StudentType.Undergraduate}
							</option>
							<option value={StudentType.Master}>{StudentType.Master}</option>
							<option value={StudentType.PhD}>{StudentType.PhD}</option>
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
						<Field
							type="number"
							min="0"
							className="form-control"
							name="entranceYear"
						/>
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
							<option value={FacultyType.DEP}>{FacultyType.DEP}</option>
							<option value={FacultyType.EDIP}>{FacultyType.EDIP}</option>
							<option value={FacultyType.ETEP}>{FacultyType.ETEP}</option>
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
							<option value={Degree.Assistant}>{Degree.Assistant}</option>
							<option value={Degree.Associate}>{Degree.Associate}</option>
							<option value={Degree.Professor}>{Degree.Professor}</option>
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
						<ErrorMessage
							name="instructorEntranceYear"
							component={FormErrorMessage}
						/>
					</FormGroup>
				</Col>
			</Row>
		</>
	);

	return (
		<>
			<Formik
				initialValues={{
					username: user ? user.username : '',
					name: user ? user.name : '',
					surname: user ? user.surname : '',
					email: user ? user.email : '',
					type: user ? user.type : '',
					studentId: user && user.student ? user.student.studentId : '',
					studentType: user && user.student ? user.student.studentType : '',
					entranceYear: user && user.student ? user.student.entranceYear : '',
					facultyType:
						user && user.instructor ? user.instructor.facultyType : '',
					degree: user && user.instructor ? user.instructor.degree : '',
					instructorEntranceYear:
						user && user.instructor
							? user.instructor.instructorEntranceYear
							: '',
					isAdmin: user ? user.isAdmin : false,
					loginFailedAttempts: user ? user.loginFailedAttempts : 0,
					lastLogin:
						user && user.lastLogin !== null
							? moment(user.lastLogin).format('DD/MM/YYYY HH:mm:ss')
							: 'inactive',
					createdAt: user
						? moment(user.createdAt).format('DD/MM/YYYY HH:mm:ss')
						: '',
					updatedAt: user
						? moment(user.updatedAt).format('DD/MM/YYYY HH:mm:ss')
						: '',
				}}
				validationSchema={UserUpdateSchema}
				onSubmit={(values, { setSubmitting }) => {
					const user = {
						username: values.username,
						name: values.name,
						surname: values.surname,
						email: values.email,
						type: values.type,
						isAdmin: values.isAdmin,
						loginFailedAttempts: values.loginFailedAttempts,
					};
					if (values.type === UserType.student) {
						user.studentId = values.studentId;
						user.studentType = values.studentType;
						user.entranceYear = values.entranceYear;
					} else if (values.type === UserType.instructor) {
						user.facultyType = values.facultyType;
						user.degree = values.degree;
						user.instructorEntranceYear = values.instructorEntranceYear;
					}
					dispatch(updateUser({ userId: editUserId, data: user }));
					setSubmitting(false);
					setModal(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, values, handleReset, setFieldValue }) => (
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
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										as="select"
										className="form-control"
										name="type"
										disabled
									>
										{user.isAdmin ? <option>Admin</option> : null}
										<option>{UserType.student}</option>
										<option>{UserType.instructor}</option>
									</Field>
									<Label for="type" className="text-gray-600">
										Type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col className="text-center mt-3" md="7">
								<FormGroup switch>
									<Field name="isAdmin">
										{({ field }) => (
											<Input
												type="switch"
												role="switch"
												name="isAdmin"
												checked={field.value}
												onChange={() =>
													setFieldValue('importance', !values.isAdmin)
												}
											/>
										)}
									</Field>
									<Label for="isAdmin" className="text-gray-600">
										Admin
									</Label>
									<ErrorMessage name="isAdmin" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="text"
										className="form-control"
										name="createdAt"
										disabled
									/>
									<Label for="createdAt" className="text-gray-600">
										Created
									</Label>
									<ErrorMessage name="createdAt" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="text"
										className="form-control"
										name="updatedAt"
										disabled
									/>
									<Label for="updatedAt" className="text-gray-600">
										Updated
									</Label>
									<ErrorMessage name="updatedAt" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="text"
										className="form-control"
										name="lastLogin"
										disabled
									/>
									<Label for="lastLogin" className="text-gray-600">
										Last Login
									</Label>
									<ErrorMessage name="lastLogin" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field
										type="number"
										min="0"
										max="3"
										className="form-control"
										name="loginFailedAttempts"
									/>
									<Label for="loginFailedAttempts" className="text-gray-600">
										Login Failed Attempts
									</Label>
									<ErrorMessage
										name="loginFailedAttempts"
										component={FormErrorMessage}
									/>
								</FormGroup>
							</Col>
						</Row>
						{user.student ? studentFields : null}
						{user.instructor ? instructorFields : null}
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
											Updating <Spinner type="grow" size="sm" />
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
