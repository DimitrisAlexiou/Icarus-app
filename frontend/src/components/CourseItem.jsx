import { Link } from 'react-router-dom';

export default function CourseItem({ course }) {
	return (
		<>
			<div className="card border-left-sky-blue-crayola">
				<div className="card-header py-3">
					<div className="row">
						<div className="col-9">
							<h5 className="text-cerulean-crayola">{course.title}</h5>
						</div>
						<div className="col-3 d-flex justify-content-end">
							<h6 className="text-light-cornflower-blue">{course.cid}</h6>
						</div>
					</div>
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
							webkitLineClamp: 3,
							webkitBoxOrient: 'vertical',
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
	);
}
