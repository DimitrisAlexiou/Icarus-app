import React, { useState } from 'react';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FormErrorMessage from '../FormErrorMessage';

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
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
				<Col md="2">
					<div className="mt-2 mb-3 d-flex justify-content-center">
						<Button className="nav-link" color="null">
							<FontAwesomeIcon
								icon={faEyeSlash}
								onClick={() => setShowPassword((prevState) => !prevState)}
							/>
						</Button>
					</div>
				</Col>
				<Col md="5">
					<FormGroup className="form-group mb-3" floating>
						<Field type="password" className="form-control" name="confirmPassword" />
						<Label for="confirmPassword" className="text-gray-600">
							Confirm Password
						</Label>
						<ErrorMessage name="confirmPassword" component={FormErrorMessage} />
					</FormGroup>
				</Col>
			</Row>
		</>
	);
};

export default RegisterForm;
