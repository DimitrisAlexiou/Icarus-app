import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { UserSchema } from '../../schemas/auth/User';
import { updateProfile } from '../../features/auth/authSlice';
import { Degree, UserType } from '../../constants/enums';
import FormErrorMessage from '../form/FormErrorMessage';

export default function UpdateProfileForm({ user }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					name: user.user.name,
					surname: user.user.surname,
					username: user.user.username,
					email: user.user.email,
					...(user.user.type === UserType.instructor && {
						degree: user.user.instructor.degree,
					}),
				}}
				validationSchema={UserSchema}
				onSubmit={(values, { setSubmitting }) => {
					const updatedUser = {
						name: values.name,
						surname: values.surname,
						username: values.username,
						email: values.email,
						...(values.degree && { degree: values.degree }),
					};
					console.log(updatedUser);
					dispatch(updateProfile(updatedUser));
					setSubmitting(false);
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
						{user.user.type === UserType.instructor ? (
							<Row>
								<Col md="5">
									<FormGroup className="form-floating mb-3" floating>
										<Field as="select" className="form-control" name="degree">
											<option default>{user.user.instructor.degree}</option>
											<option value={Degree.Assistant}>Assistant</option>
											<option value={Degree.Associate}>Associate</option>
											<option value={Degree.Professor}>Professor</option>
										</Field>
										<Label for="degree" className="text-gray-600">
											Degree
										</Label>
										<ErrorMessage name="degree" component={FormErrorMessage} />
									</FormGroup>
								</Col>
							</Row>
						) : null}
						<Row className="mt-3">
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
										'Update Profile'
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
