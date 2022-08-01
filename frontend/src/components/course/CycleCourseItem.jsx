import { Link } from 'react-router-dom';
import { Badge, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import UndergraduateCourseNotification from '../boilerplate/UndergraduateCourseNotification';

export default function ObligatoryCourseItem({ course }) {
	return course.isObligatory === false ? (
		<>
			<div className="card border-left-sky-blue-crayola">
				<div className="card-header py-3">
					<Row className="col-sm-14 ">
						<Col>
							<h5 className="text-cerulean-crayola">{course.title}</h5>
						</Col>
						<Col className="col-md-3 col-lg-1 col-xl-1">
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
						<Col className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-end py-1">
							<h6 className="text-light-cornflower-blue">{course.cid}</h6>
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
					<div>
						<Link
							to={`/course/${course._id}`}
							type="button"
							className="btn btn-light btn-small"
						>
							Learn about
						</Link>
					</div>
				</div>
			</div>
		</>
	) : (
		<UndergraduateCourseNotification
			icon={<FontAwesomeIcon icon={faBook} />}
			message={'There are no cycle courses available right now !'}
		/>
	);
}
