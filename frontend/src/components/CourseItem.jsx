import { Link } from 'react-router-dom';

export default function CourseItem({ course }) {
	return (
		<>
			<div class="card border-left-sky-blue-crayola">
				<div class="card-header py-3">
					<div class="row">
						<div class="col-6">
							<h5 class="text-cerulean-crayola">{course.title}</h5>
						</div>
						<div class="col-6 d-flex justify-content-end">
							<h6 class="text-light-cornflower-blue">{course.cid}</h6>
						</div>
					</div>
				</div>
				<div class="card-body">
					<p class="card-text">{course.description}</p>
					<div>
						<Link
							to={`/course/{course._id}`}
							type="button"
							class="btn btn-light btn-small"
						>
							Learn about
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
