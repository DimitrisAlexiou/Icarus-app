import { Badge, Row, Col, Card } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function CourseItem({ course }) {
	const navigate = useNavigate();

	return (
		<>
			<Card
				className="card-animate border-left-sky-blue-crayola mb-3 clickable-no-padding"
				onClick={() => navigate(`/course/${course._id}`)}
			>
				<div className="card-header">
					<Row>
						<Col xs="9" sm="9" md="6" lg="6" xl="6">
							<h5 className="text-cerulean-crayola">{course.title}</h5>
						</Col>
						<Col xs="3" sm="3" md="3" lg="3" xl="3">
							{course.isActive === true ? (
								<Badge color="success" pill>
									Active
								</Badge>
							) : (
								<Badge color="warning" pill>
									Inactive
								</Badge>
							)}
						</Col>
						<Col
							xs="12"
							sm="12"
							md="3"
							lg="3"
							xl="3"
							className="d-flex justify-content-end py-1"
						>
							<h6 className="text-light-cornflower-blue">{course.courseId}</h6>
						</Col>
					</Row>
				</div>
				<div className="card-body">
					<p
						className="card-text"
						style={{
							textAlign: 'justify',
							fontWeight: '600',
							fontSize: 12,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							display: '-webkit-box',
							lineHeight: '20px',
							maxHeight: '80px',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{course.description
							? course.description
							: 'No description available.'}
					</p>
				</div>
				{course.hasPrerequisites ? (
					<div
						className="card-footer text-warning"
						style={{
							textAlign: 'justify',
							fontWeight: '600',
							fontSize: 12,
						}}
					>
						Course has prerequisites!
					</div>
				) : (
					<div
						className="card-footer text-success"
						style={{
							textAlign: 'justify',
							fontWeight: '600',
							fontSize: 12,
						}}
					>
						Course doesn't have prerequisites!
					</div>
				)}
			</Card>
		</>
	);
}
