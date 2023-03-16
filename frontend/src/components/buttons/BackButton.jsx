import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ url }) => {
	return (
		<Link
			to={url}
			className="btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-600"
		>
			<FontAwesomeIcon icon={faChevronLeft} />
		</Link>
	);
};

export default BackButton;
