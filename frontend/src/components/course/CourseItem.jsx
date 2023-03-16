import { Link } from 'react-router-dom';
import { Badge, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import UndergraduateCourseNotification from '../boilerplate/UndergraduateCourseNotification';

export default function CourseItem({ course }) {
	// return course.isObligatory === true ? (
	return (
		<>
			<div className="card border-left-sky-blue-crayola mb-4">
				<div className="card-header py-3">
					<Row>
						<Col xs="12" sm="6" md="6" lg="6" xl="6">
							<h5 className="text-cerulean-crayola">{course.title}</h5>
						</Col>
						<Col xs="12" sm="4" md="3" lg="4" xl="4">
							{course.isActive === true ? (
								<Badge color="info" pill>
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
							sm="2"
							md="3"
							lg="2"
							xl="2"
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
						{course.description}
					</p>
					<Link to={`/course/${course._id}`} type="button" className="btn btn-light">
						Learn about
					</Link>
				</div>
				{course.hasPrerequisites ? (
					<div
						className="card-footer text-info"
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
			</div>
		</>
	);
	// : (
	// 	<UndergraduateCourseNotification
	// 		icon={<FontAwesomeIcon icon={faBook} />}
	// 		message={'There are no obligatory courses available right now !'}
	// 	/>
	// );
}
