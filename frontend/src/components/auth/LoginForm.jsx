import { useState } from 'react';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FormErrorMessage from '../FormErrorMessage';

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
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
				<Col md="2" sm="2" xs="2" className="mt-2 mb-3 d-flex justify-content-center">
					<Button type="button" className="nav-link" color="null">
						<FontAwesomeIcon
							icon={faEyeSlash}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</Button>
				</Col>
			</Row>
		</>
	);
}
