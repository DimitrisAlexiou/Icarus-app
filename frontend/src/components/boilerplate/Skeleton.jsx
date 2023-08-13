import { Card, Col, Row } from 'reactstrap';

const CourseItemLoading = ({ width, height, count }) => {
	if (count) {
		const skeletons = Array.from({ length: count }).map((_, index) => (
			<div key={index} className="skeleton" style={{ width, height }} />
		));
		return <>{skeletons}</>;
	}

	return <div className="skeleton" style={{ width, height }} />;
};

export default function Skeleton() {
	return (
		<Card className="card-animate border-left-sky-blue-crayola mb-3">
			<div className="card-header">
				<Row>
					<Col xs="9" sm="9" md="7" lg="8" xl="7">
						<CourseItemLoading width="80%" height="24px" />
					</Col>
					<Col xs="3" sm="3" md="3" lg="4" xl="3">
						<CourseItemLoading width="50px" height="20px" />
					</Col>
					<Col
						xs="12"
						sm="12"
						md="2"
						lg="12"
						xl="2"
						className="d-flex justify-content-end py-1"
					>
						<CourseItemLoading width="60px" height="18px" />
					</Col>
				</Row>
			</div>
			<div className="card-body">
				<CourseItemLoading count={3} height="20px" />
			</div>
			<div className="card-footer text-info">
				<CourseItemLoading width="150px" height="18px" />
			</div>
		</Card>
	);
}
