import { Row, Col } from 'reactstrap';
// import { useSelector } from 'react-redux';

export default function CourseGrading() {
	// const { user } = useSelector((state) => state.auth);

	return (
		<>
			<Row className="mb-5 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Course Grading</h3>
				</Col>
			</Row>
		</>
	);
}
