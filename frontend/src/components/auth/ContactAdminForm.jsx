import { FormGroup, Label, Row, Col, Button, Spinner } from 'reactstrap';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { ActivateAccountSchema } from '../../schemas/auth/ActivateAccount';
import { activateAccount } from '../../features/auth/authSlice';
import FormErrorMessage from '../form/FormErrorMessage';

export default function ContactAdminForm() {
	return (
		<>
			<Formik
				initialValues={{
					email: '',
					username: '',
				}}
				validationSchema={ActivateAccountSchema}
				onSubmit={(values, { setSubmitting }) => {
					const activate = {
						email: values.email,
						username: values.username,
					};
					// dispatch(activateAccount(activate));
					setSubmitting(false);
				}}
				validateOnMount
			>
				{({ isSubmitting, dirty, handleReset }) => (
					<Form>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="username" />
							<Label for="username" className="text-gray-600">
								Username
							</Label>
							<ErrorMessage name="username" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-group mb-3" floating>
							<Field type="email" className="form-control" name="email" />
							<Label for="email" className="text-gray-600">
								Email
							</Label>
							<ErrorMessage name="email" component={FormErrorMessage} />
						</FormGroup>
						<Row className="mt-4">
							<Col md="6" sm="6" xs="12" className="text-sm-left text-center">
								<Button
									onClick={() => handleReset()}
									disabled={!dirty || isSubmitting}
								>
									Clear
								</Button>
							</Col>
							<Col className="text-center">
								<Button
									type="submit"
									className="btn-block"
									color="primary"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											Please wait <Spinner type="grow" size="sm" />
										</>
									) : (
										'Request Activation'
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
