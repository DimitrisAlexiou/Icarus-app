import { Button, Col } from 'reactstrap';

const SubmitButton = ({ body, disabled }) => {
	return (
		<Col className="text-sm-right text-center mt-sm-0 mt-3">
			<Button type="submit" color="primary" disabled={disabled}>
				{body}
			</Button>
		</Col>
	);
};

export default SubmitButton;
