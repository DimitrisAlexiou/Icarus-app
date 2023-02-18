import { useState, forwardRef } from 'react';
import { Button, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePick() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const Input = forwardRef(({ value, onClick }, ref) => (
		<Button color="null" onClick={onClick} ref={ref}>
			{value}
		</Button>
	));

	return (
		<>
			<Row>
				<Col xl="6" lg="6" md="6" sm="6" xs="12" className="mb-3">
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						showMonthDropdown
						startDate={startDate}
						endDate={endDate}
						highlightDates={startDate}
						customInput={<Input />}
						dateFormat="dd/MM/yyyy"
						placeholderText="Select semester start date"
					/>
				</Col>
				<Col xl="6" lg="6" md="6" sm="6" xs="12">
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						showMonthDropdown
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						highlightDates={endDate}
						dateFormat="dd/MM/yyyy"
						customInput={<Input />}
						placeholderText="Select semester end date"
					/>
				</Col>
			</Row>
		</>
	);
}
