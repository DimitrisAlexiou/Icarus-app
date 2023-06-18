import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUser } from '../../features/admin/userSlice';
import { UserType } from '../../constants/enums';
import FormErrorMessage from '../form/FormErrorMessage';

export default function UserForm({ user, setModal }) {
	const dispatch = useDispatch();

	return (
		<>
			<Formik
				initialValues={{
					username: user ? user.username : '',
					name: user ? user.name : '',
					surname: user ? user.surname : '',
					email: user ? user.email : '',
					type: user ? user.type : '',
					isAdmin: user ? user.isAdmin : false,
				}}
				onSubmit={(values, { setSubmitting }) => {
					const user = {
						username: values.username,
						name: values.name,
						surname: values.surname,
						email: values.email,
						type: values.type,
						isAdmin: values.isAdmin,
					};
					console.log(user);
					dispatch(updateUser({ userId: user._id, data: user }));
					setSubmitting(false);
					setModal(false);
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
							<Col md="5">
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="isAdmin">
										<option default value={'false'}>
											False
										</option>
										<option value={'true'}>True</option>
									</Field>
									<Label for="isAdmin" className="text-gray-600">
										Admin
									</Label>
									<ErrorMessage name="isAdmin" component={FormErrorMessage} />
								</FormGroup>
							</Col>
							<Col md="7">
								<FormGroup className="form-floating mb-3" floating>
									<Field as="select" className="form-control" name="type">
										<option default>Select type</option>
										<option value={UserType.student}>Student</option>
										<option value={UserType.instructor}>Instructor</option>
									</Field>
									<Label for="type" className="text-gray-600">
										Type
									</Label>
									<ErrorMessage name="type" component={FormErrorMessage} />
								</FormGroup>
							</Col>
						</Row>
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
