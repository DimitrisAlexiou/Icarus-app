import { forwardRef, useState, useRef } from 'react';
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
	const dateInputRef = useRef(null);

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(startDate);

	return (
		<>
			<Col xl="6" lg="6" md="6" sm="12" xs="12" className="text-sm-left text-center">
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
										const selectedDate = new Date(val);
										form.setFieldValue('startDate', selectedDate);
										setStartDate(selectedDate);
										setEndDate(selectedDate);
									}}
									selectsStart
									showMonthDropdown
									startDate={startDate}
									highlightDates={startDate}
									dateFormat="dd/MM/yyyy"
									customInput={<DateInput ref={dateInputRef} />}
								/>

								<ErrorMessage name="startDate" component={FormErrorMessage} />
							</FormGroup>
						</>
					)}
				</Field>
			</Col>
			<Col
				xl="6"
				lg="6"
				md="6"
				sm="12"
				xs="12"
				className="text-sm-right text-center mt-sm-0 mt-3"
			>
				<Field name="endDate">
					{({ field, form }) => (
						<>
							<Label for="endDate" className="text-gray-500 mx-2">
								Ending Date
							</Label>
							<FormGroup color="null" className="form-floating mb-3" floating>
								<DatePicker
									selected={field.value}
									onChange={(val) => {
										const selectedDate = new Date(val);
										form.setFieldValue('endDate', selectedDate);
										setEndDate(selectedDate);
									}}
									selectsEnd
									showMonthDropdown
									startDate={endDate}
									dateFormat="dd/MM/yyyy"
									customInput={<DateInput ref={dateInputRef} />}
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
