import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpInButton = ({ message, icon }) => {
	return (
		<Button color="null" type="submit">
			{/* <Row className="nav-link">
				<Col lg="10" md="10" sm="10" xs="10">
				{message}
				</Col>
				<Col lg="2" md="2" sm="2" xs="2">
				<FontAwesomeIcon icon={icon} />
				</Col>
			</Row> */}
			<Link
				className="nav-item align-self-center text-gray-500"
				to="/auth/login"
				style={{ textDecoration: 'none' }}
			>
				{message}
				<FontAwesomeIcon className="mx-2" icon={icon} />
			</Link>
		</Button>
	);
};

export default SignUpInButton;
