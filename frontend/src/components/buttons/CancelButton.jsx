import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const CancelButton = ({ url }) => {
	return (
		<Link to={url} className="col-sm-6 mb-sm-0 mb-3">
			<Button>Cancel</Button>
		</Link>
	);
};

export default CancelButton;
