import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Form } from 'formik';
import SubmitButton from '../buttons/SubmitButton';
import StartDatePickerField from '../StartDatePickerField';
import EndDatePickerField from '../EndDatePickerField';

export default function GradingForm({ grading, isSubmitting, dirty, handleReset }) {
	const [startDate] = useState(new Date());
	const [endDate, setEndDate] = useState(startDate);

	return (
		<>
			<Form>
				<Row>
					<Col xl="6" lg="6" md="6" sm="6" xs="12">
						<StartDatePickerField startDate={startDate} setEndDate={setEndDate} />
					</Col>
					<Col xl="6" lg="6" md="6" sm="6" xs="12">
						<EndDatePickerField endDate={endDate} />
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Button onClick={handleReset} disabled={!dirty || isSubmitting}>
							Clear
						</Button>
					</Col>
					{/* {!grading ? (
					<Col className="text-right px-0">
						<SubmitButton
							color={'danger'}
							message={'Delete Grading'}
							disabled={isSubmitting}
						/>
						</Col>
					) : (
					<Col className="text-right px-0">
						<SubmitButton
							color={'primary'}
							message={'Define period'}
							disabled={isSubmitting}
						/>
						</Col>
					)} */}
				</Row>
			</Form>
		</>
	);
}
