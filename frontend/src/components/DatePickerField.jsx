import { forwardRef, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Label, FormGroup, Button, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import FormErrorMessage from './FormErrorMessage';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = forwardRef(({ value, onClick }, ref) => (
	<Button type="button" color="null" onClick={onClick} ref={ref}>
		{value}
	</Button>
));

export default function DatePickerField() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(startDate);

	return (
		<>
			<Col xl="6" lg="6" md="6" sm="6" xs="12">
				<Field name="startDate">
					{({ field, form }) => (
						<>
							<Label for="startDate" className="text-gray-500 mx-2">
								Starting Date
							</Label>
							<FormGroup className="form-floating mb-3" floating>
								<DatePicker
									selected={field.value}
									onChange={(val) => {
										form.setFieldValue('startDate', val);
										setStartDate(val);
										setEndDate(val);
									}}
									selectsStart
									showMonthDropdown
									startDate={startDate}
									highlightDates={startDate}
									dateFormat="dd/MM/yyyy"
									customInput={<DateInput />}
								/>

								<ErrorMessage name="startDate" component={FormErrorMessage} />
							</FormGroup>
						</>
					)}
				</Field>
			</Col>
			<Col xl="6" lg="6" md="6" sm="6" xs="12" className="text-right">
				<Field name="endDate">
					{({ field, form }) => (
						<>
							<Label for="startDate" className="text-gray-500 mx-2">
								Ending Date
							</Label>
							<FormGroup color="null" className="form-floating mb-3" floating>
								<DatePicker
									selected={field.value}
									onChange={(val) => form.setFieldValue('endDate', val)}
									selectsEnd
									showMonthDropdown
									startDate={endDate}
									dateFormat="dd/MM/yyyy"
									customInput={<DateInput />}
								/>
								<ErrorMessage name="endDate" component={FormErrorMessage} />
							</FormGroup>
						</>
					)}
				</Field>
			</Col>
		</>
	);
}
