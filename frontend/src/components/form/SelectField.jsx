import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const SelectField = ({ name, options, label, disabled, onClick }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field
				as="select"
				className="form-control"
				name={name}
				disabled={disabled}
				onClick={onClick}
			>
				{options}
			</Field>
			<Label for={name} className="text-gray-600">
				{label}
			</Label>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default SelectField;
