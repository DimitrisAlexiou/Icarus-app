import { FormGroup, Label, Row } from 'reactstrap';
import { Field, ErrorMessage } from 'formik';
import RangeSlider from 'react-bootstrap-range-slider';
import FormErrorMessage from './FormErrorMessage';

const RangeSliderField = ({ name, label }) => {
	return (
		<FormGroup className="form-floating mb-3 mt-2" floating>
			<Row>
				<Label for={name} className="text-gray-600 mt-2">
					{label}
				</Label>
				<Field className="form-control" name={name}>
					{({ field, form }) => (
						<RangeSlider
							step={1}
							min={1}
							max={5}
							value={field.value}
							onChange={(e) => form.setFieldValue(field.name, e.target.value)}
							tooltipPlacement="top"
						/>
					)}
				</Field>
			</Row>
			<ErrorMessage name={name} component={FormErrorMessage} />
		</FormGroup>
	);
};

export default RangeSliderField;
