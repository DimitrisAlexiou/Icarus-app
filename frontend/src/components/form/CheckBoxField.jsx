import { FormGroup, Input, Label } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import FormErrorMessage from './FormErrorMessage';

const CheckBoxField = ({ name, label, disabled, onClick }) => {
	return (
		<FormGroup className="mx-1 mb-3" check>
			<Field
				name={name}
				render={({ field }) => (
					<>
						<Input
							type="checkbox"
							{...field}
							checked={field.value}
							onClick={onClick}
							disabled={disabled}
						/>
						<Label for={name} className="text-gray-500">
							{label}
						</Label>
						<ErrorMessage name={name} component={FormErrorMessage} />
					</>
				)}
			/>
		</FormGroup>
	);
};

export default CheckBoxField;
