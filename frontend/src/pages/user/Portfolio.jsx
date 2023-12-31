import { useState } from 'react';
import { Row, Col, NavItem, NavLink } from 'reactstrap';
import { portfolioCategories } from '../../utils/NavigationLinks';
import usePortfolio from '../../hooks/user/usePortfolio';
import Documents from '../../components/portfolio/Documents';
import Calendar from '../../components/calendar/Calendar';
import Exercises from '../../components/portfolio/Exercises';
import Chat from '../../components/portfolio/Chat';
import MessagesCard from '../../components/portfolio/MessagesCard';
import AnnouncementsCard from '../../components/portfolio/AnnouncementsCard';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/spinners/Spinner';

export default function Portfolio() {
	const { teaching, isLoading } = usePortfolio();

	const [selectedCategory, setSelectedCategory] = useState('Documents');

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/my-courses'}
				header={'My Courses'}
				active={teaching?.course?.title}
			/>

			<h3 className="mb-4 text-gray-800 font-weight-bold animated--grow-in">
				Portfolio
			</h3>

			<Row className="mb-3 animated--grow-in justify-content-center">
				<Col
					md="12"
					lg="11"
					xl="10"
					className="nav nav-pills p-2 bg-white mb-3 rounded-pill align-items-center"
				>
					{portfolioCategories.map((portfolioCategory) => {
						const { id, text, icon } = portfolioCategory;
						return (
							<Col key={id} className="text-center">
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
										<span>{text}</span>
									</NavLink>
								</NavItem>
							</Col>
						);
					})}
				</Col>
			</Row>
			<Row className="animated--grow-in">
				{selectedCategory === 'Documents' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<Documents />
					)
				) : selectedCategory === 'Announcements' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<AnnouncementsCard />
					)
				) : selectedCategory === 'Exercises' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<Exercises />
					)
				) : selectedCategory === 'Calendar' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<Calendar />
					)
				) : selectedCategory === 'Messages' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<MessagesCard />
					)
				) : selectedCategory === 'Chat' ? (
					isLoading ? (
						<Spinner card />
					) : (
						<Chat />
					)
				) : null}
			</Row>
		</>
	);
}
