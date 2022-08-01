import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const BackButton = ({ url }) => {
	return (
		<Link to={url} style={{ textDecoration: 'none' }}>
			<Button className="btn-block">Back</Button>
		</Link>
	);
};

export default BackButton;
