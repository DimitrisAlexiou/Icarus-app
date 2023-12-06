import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SpinnerComponent = ({ message }) => (
	<span className="text-gray-500 animated--grow-in d-flex align-items-center justify-content-center">
		<FontAwesomeIcon className="text-gray-300 px-2 fa-spin" icon={faSpinner} />
		{message}
	</span>
);

export default SpinnerComponent;
