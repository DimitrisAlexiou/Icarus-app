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
					xl="4"
					lg="6"
					md="10"
					className="nav p-1 bg-white rounded-pill align-items-center text-center"
				>
					{degreeCompletionCategories.map((degreeCompletionCategory) => {
						const { id, text, icon } = degreeCompletionCategory;
						return (
							<Col xl="6" lg="6" md="6" key={id}>
								<NavItem>
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
										<Col>{text}</Col>
									</NavLink>
								</NavItem>
							</Col>
						);
					})}
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
