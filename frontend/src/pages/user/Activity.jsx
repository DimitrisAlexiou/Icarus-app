import { useState } from 'react';
import { Row, Col, NavItem, NavLink } from 'reactstrap';
import { activityCategories } from '../../utils/NavigationLinks';
import TeachingReviews from '../../components/review/TeachingReviews';
import InstructorReviews from '../../components/review/InstructorReviews';
import GeneralReviews from '../../components/review/GeneralReviews';

export default function Activity() {
	const [selectedCategory, setSelectedCategory] = useState('Reviews');

	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col>
					<h3 className="text-gray-800 font-weight-bold">Activity</h3>
				</Col>
			</Row>

			<Row className="mb-3 animated--grow-in justify-content-center">
				<Col
					md="12"
					lg="11"
					xl="10"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
				>
					<Row className="d-flex justify-content-center">
						{activityCategories.map((portfolioCategory) => {
							const { id, text, icon } = portfolioCategory;
							return (
								<Col key={id} className="text-center" xs="auto">
									<NavItem className="nav-item mx-1">
										<NavLink
											style={{ fontSize: '0.9rem' }}
											className={`nav-link ${
												selectedCategory === text
													? 'font-weight-bold text-gray-600 clickable'
													: 'text-gray-500 clickable'
											}`}
											onClick={() => {
												setSelectedCategory(text);
											}}
										>
											<Col>{icon}</Col>
											<span>{text}</span>
										</NavLink>
									</NavItem>
								</Col>
							);
						})}
					</Row>
				</Col>
			</Row>

			<Row className="animated--grow-in">
				{selectedCategory === 'Reviews' ? (
					<>
						<TeachingReviews />
						<InstructorReviews />
						<GeneralReviews />
					</>
				) : selectedCategory === 'ACTIVITY' ? null : selectedCategory ===
				  'ACTIVITY' ? null : null}
			</Row>
		</>
	);
}
