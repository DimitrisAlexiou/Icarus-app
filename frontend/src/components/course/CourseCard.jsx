export default function CourseCard({ course }) {
	return (
		<>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course ID</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.cid}</p>
					<hr />
				</div>
				<div className="col-sm-6">
					<label>
						<b>Course Title</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.title}</p>
					<hr />
				</div>
			</div>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course Type</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.type}</p>
					<hr />
				</div>
				<div className="col-sm-6">
					<label>
						<b>Course Semester</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.semester}</p>
					<hr />
				</div>
			</div>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course Year</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.year}</p>
					<hr />
				</div>
				<div className="col-sm-6">
					<label>
						<b>Course Cycle</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.cycle}</p>
					<hr />
				</div>
			</div>
			<div className="form-group">
				<label>
					<b>Course Description</b>
				</label>
				<p style={{ textAlign: 'justify' }}>{course.description}</p>
				<hr />
			</div>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course ECTS</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.ects}</p>
					<hr />
				</div>
				<div className="col-sm-6">
					<label>
						<b>Course Activity</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.isActive ? 'Active' : 'Inactive'}
					</p>
					<hr />
				</div>
			</div>
			<div className="form-group row">
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course Lab</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{course.hasLab ? 'Yes' : 'No'}</p>
				</div>
				<div className="col-sm-6 mb-3 mb-sm-0">
					<label>
						<b>Course Obligation</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{course.isObligatory ? 'Obligatory' : 'Optional'}
					</p>
				</div>
			</div>
		</>
	);
}
