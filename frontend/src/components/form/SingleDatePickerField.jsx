import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Label, FormGroup, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import DateInputField from './DateInputField';
import FormErrorMessage from './FormErrorMessage';
import 'react-datepicker/dist/react-datepicker.css';

export default function SingleDatePickerField({ name, label }) {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Col>
			<Field name={name}>
				{({ field, form }) => (
					<>
						<Label for={name} className="text-gray-500 mx-2">
							{label}
						</Label>
						<FormGroup className="form-floating mb-3" floating>
							<DatePicker
								selected={field.value}
								onChange={(val) => {
									const selectedDate = new Date(val);
									form.setFieldValue(name, selectedDate);
									setStartDate(selectedDate);
								}}
								selectsStart
								showMonthDropdown
								startDate={startDate}
								highlightDates={startDate}
								dateFormat="dd/MM/yyyy"
								customInput={<DateInputField />}
							/>
							<ErrorMessage name={name} component={FormErrorMessage} />
						</FormGroup>
					</>
				)}
			</Field>
		</Col>
	);
}
