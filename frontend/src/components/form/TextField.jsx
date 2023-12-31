import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const TextField = ({ id, name, label, disabled }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field
				id={id}
				type="text"
				className="form-control"
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

export default TextField;
