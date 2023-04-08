import { useState } from 'react';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Field, ErrorMessage, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../../components/buttons/SubmitButton';

export default function LoginForm({ isSubmitting, dirty, handleReset }) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Form>
				<FormGroup className="form-floating mb-3" floating>
					<Field type="text" className="form-control" name="username" />
					<Label for="username" className="text-gray-600">
						Username
					</Label>
					<ErrorMessage name="username" component={FormErrorMessage} />
				</FormGroup>
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
							<ErrorMessage name="password" component={FormErrorMessage} />
						</FormGroup>
					</Col>
					<Col md="2" sm="2" xs="2" className="mb-3 d-flex justify-content-center">
						<Button type="button" className="nav-link align-items-center" color="null">
							<FontAwesomeIcon
								icon={faEyeSlash}
								onClick={() => setShowPassword(!showPassword)}
							/>
						</Button>
					</Col>
				</Row>
				<Row className="">
					<Col md="6" sm="6" xs="12" className="text-sm-left text-center">
						<Button
							onClick={() => {
								handleReset();
								setShowPassword(false);
							}}
							disabled={!dirty || isSubmitting}
						>
							Clear
						</Button>
					</Col>
					<Col className="text-sm-right text-center mt-sm-0 mt-3 px-0">
						<SubmitButton color={'primary'} message={'Login'} disabled={isSubmitting} />
					</Col>
				</Row>
			</Form>
		</>
	);
}
