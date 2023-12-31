import { FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage, Field } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const SwitchField = ({ name, onChange, label }) => {
	return (
		<FormGroup switch>
			<Field name={name}>
				{({ field }) => (
					<Input
						type="switch"
						role="switch"
						name={name}
						checked={field.value}
						onChange={onChange}
					/>
				)}
			</Field>
			<Label for={name} className="mx-1 text-gray-600">
				{label}
			</Label>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default SwitchField;
