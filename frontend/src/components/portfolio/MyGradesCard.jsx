import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function MyCradesCard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const handleCourseRowClick = (teaching) => {
	// 	navigate('/teaching/' + teaching._id + '/portfolio');
	// };

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<h6
					className="animated--grow-in text-gray-500"
					style={{ fontWeight: 700, textAlign: 'center' }}
				>
					recent grades
				</h6>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center"></div>
				</div>
			</div>
		</>
	);
}
