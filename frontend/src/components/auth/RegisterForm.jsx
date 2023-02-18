import { useState } from 'react';
import { FormGroup, Label, Row, Col, Button } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FormErrorMessage from '../FormErrorMessage';

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [selectedType, setSelectedType] = useState('');

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
				<Col md="2" sm="2" xs="2" className="mt-2 mb-3 d-flex justify-content-center">
					<Button type="button" className="nav-link" color="null">
						<FontAwesomeIcon
							icon={faEyeSlash}
							onClick={() => setShowPassword(!showPassword)}
						/>
					</Button>
				</Col>
				<Col md="5">
					<FormGroup className="form-group mb-3" floating>
						<Field
							type={showPassword ? 'text' : 'password'}
							className="form-control"
							name="confirmPassword"
						/>
						<Label for="confirmPassword" className="text-gray-600">
							Confirm Password
						</Label>
						<ErrorMessage name="confirmPassword" component={FormErrorMessage} />
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
							<option default>Select your role</option>
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
			{selectedType === 'Student' && studentFields}
			{selectedType === 'Instructor' && instructorFields}
		</>
	);
}
