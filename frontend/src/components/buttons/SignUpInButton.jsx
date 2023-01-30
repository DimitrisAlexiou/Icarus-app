import { Button, Row } from 'reactstrap';

const SignUpInButton = ({ message, icon }) => {
	return (
		<Button className="mb-2" color="null" type="submit">
			<Row className="nav-link">
				{icon}
				{message}
			</Row>
		</Button>
	);
};

export default SignUpInButton;
