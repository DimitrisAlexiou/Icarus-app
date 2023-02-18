import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../buttons/SubmitButton';

export default function ProfileCard2({ user }) {
	return (
		<>
			<div className="profile_card">
				<div className="card-body">
					<Formik
						// initialValues={initialValues}
						// validationSchema={UserSchema}
						// onSubmit={(userData) => {
						// onSubmit(userData);
						// }}
						validateOnMount
					></Formik>
					<Form>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="email" className="form-control" name="email" />
							<Label for="email" className="text-gray-600">
								Email Address
							</Label>
							<ErrorMessage name="email" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="name" />
							<Label for="name" className="text-gray-600">
								Name
							</Label>
							<ErrorMessage name="name" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="surname" />
							<Label for="surname" className="text-gray-600">
								Surname
							</Label>
							<ErrorMessage name="surname" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Field type="text" className="form-control" name="admissionYear" />
							<Label for="admissionYear" className="text-gray-600">
								Admission Year
							</Label>
							<ErrorMessage name="admissionYear" component={FormErrorMessage} />
						</FormGroup>
						<FormGroup className="form-floating mb-3" floating>
							<Field
								as="textarea"
								className="form-control"
								style={{
									height: '200px',
									text_align: 'justify',
								}}
								name="description"
							></Field>
							<Label for="description" className="text-gray-600">
								Description
							</Label>
							<ErrorMessage name="description" component={FormErrorMessage} />
						</FormGroup>
						<Row className="form-group">
							<SubmitButton message={'Update Profile'} />
						</Row>
					</Form>
				</div>
			</div>
		</>
	);
}
