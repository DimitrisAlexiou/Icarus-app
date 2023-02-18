import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpInButton = ({ message, icon }) => {
	return (
		<Button className="mb-2" color="null" type="submit">
			<Row className="nav-link">
				<Col lg="10" md="10" sm="10" xs="10">
					{message}
				</Col>
				<Col lg="2" md="2" sm="2" xs="2">
					<FontAwesomeIcon icon={icon} />
				</Col>
			</Row>
		</Button>
	);
};

export default SignUpInButton;
