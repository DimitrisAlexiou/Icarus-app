const GeneralReviewCard = ({ review }) => {
	return (
		<>
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
				{review?.course_opinion}
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
				{review?.instructor_opinion}
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
				{review?.likes}
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
				{review?.dislikes}
			</p>
		</>
	);
};

export default GeneralReviewCard;
