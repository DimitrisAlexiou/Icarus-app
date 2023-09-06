export default function GeneralReviewCard({ generalReview }) {
	return (
		<>
			<h5 className="d-flex align-items-center mb-3 font-weight-bold mb-4">
				{generalReview.teaching.course.title}
			</h5>
			<p>Course Opinion</p>
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
				{generalReview.course_opinion}
			</p>
			<p>Instructor Opinion</p>
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
				{generalReview.instructor_opinion}
			</p>
			<p>Likes</p>
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
				{generalReview.likes}
			</p>
			<p>Dislikes</p>
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
				{generalReview.dislikes}
			</p>
		</>
	);
}
