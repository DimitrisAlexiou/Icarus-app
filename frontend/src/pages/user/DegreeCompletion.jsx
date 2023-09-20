import { useState } from 'react';
import { Col, NavItem, NavLink, Row } from 'reactstrap';
import { degreeCompletionCategories } from '../../utils/NavigationLinks';

export default function DegreeCompletion() {
	const [selectedCategory, setSelectedCategory] = useState('Prerequisites');

	return (
		<>
			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Degree Completion
			</h3>

			<Row className="mb-4 animated--grow-in justify-content-center">
				<Col
					xl="3"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
				>
					<Row className="d-flex justify-content-center">
						{degreeCompletionCategories.map((degreeCompletionCategory) => {
							const { id, text, icon } = degreeCompletionCategory;
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
				{selectedCategory === 'Prerequisites' ? (
					<h5>Degree Prerequisites Card</h5>
				) : // <DegreePrerequisitesCard />
				selectedCategory === 'Progress' ? (
					<h5>Degree Progress Card</h5>
				) : // <ProgressCard />
				null}
			</Row>
		</>
	);
}
