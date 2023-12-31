import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const PasswordField = ({ name, type, label, disabled }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field
				className="form-control"
				type={type}
				name={name}
				disabled={disabled}
			/>
			<Label for={name} className="text-gray-600">
				{label}
			</Label>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default PasswordField;
