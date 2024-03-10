import { Col, Row } from 'reactstrap';
import PillHeader from '../../boilerplate/headers/PillHeader';

export default function MyCradesCard({ user }) {
	// const handleCourseRowClick = (teaching) => {
	// 	navigate('/teaching/' + teaching._id + '/portfolio');
	// };

	return (
		<>
			<Row className="justify-content-center animated--grow-in mb-3">
				<Col className="text-center">
					<PillHeader title="Recent Grades" />
				</Col>
			</Row>
			<div className="profile_card">
				<div className="card-body">
					<div className="align-items-center text-center"></div>
				</div>
			</div>
		</>
	);
}
