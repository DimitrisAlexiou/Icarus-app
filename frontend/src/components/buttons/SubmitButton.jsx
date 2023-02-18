import { Button, Col } from 'reactstrap';

const SubmitButton = ({ color, message }) => {
	return (
		<Col>
			<Button type="submit" color={color}>
				{message}
			</Button>
		</Col>
	);
};

export default SubmitButton;
