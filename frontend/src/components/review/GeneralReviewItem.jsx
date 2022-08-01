export default function GeneralReviewItem({ generalReview }) {
	return (
		<>
			<div className="card border-left-sky-blue-crayola">
				<div className="card-header py-3"></div>
				<div className="card-body">
					<p
						className="card-text"
						// 		style="
						// 	text-align: justify;
						// 	font-weight: 300;
						// 	font-size: 90%;
						// 	overflow: hidden;
						// 	text-overflow: ellipsis;
						// 	display: -webkit-box;
						// 	line-height: 20px;
						// 	max-height: 80px;
						// 	-webkit-line-clamp: 3;
						// 	-webkit-box-orient: vertical;
						// "
					>
						Course Opinion : {generalReview.course_opinion}
					</p>
					<p className="card-text">
						Instructor Opinion : {generalReview.instructor_opinion}
					</p>
					<p className="card-text">Likes : {generalReview.likes}</p>
					<p className="card-text">Dislikes : {generalReview.dislikes}</p>
				</div>
			</div>
		</>
	);
}
