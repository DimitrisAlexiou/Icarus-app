import { FormGroup, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const TextAreaField = ({ name, label, disabled }) => {
	return (
		<FormGroup className="form-floating mb-3" floating>
			<Field
				as="textarea"
				className="form-control"
				style={{ height: '180px', text_align: 'justify' }}
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

export default TextAreaField;
