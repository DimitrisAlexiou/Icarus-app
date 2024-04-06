import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, NavItem, NavLink } from 'reactstrap';
import { portfolioCategories } from '../../utils/NavigationLinks';
import { PortfolioMenu } from '../../constants/enums';
import usePortfolio from '../../hooks/user/usePortfolio';
import Documents from '../../components/portfolio/Documents';
import TeachingAnnouncements from '../../components/portfolio/TeachingAnnouncements';
import Calendar from '../../components/calendar/Calendar';
import Exercises from '../../components/portfolio/Exercises';
import Chat from '../../components/portfolio/Chat';
import Messages from '../../components/portfolio/Messages';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import Header from '../../components/boilerplate/headers/Header';

export default function Portfolio() {
	const { user } = useSelector((state) => state.auth);
	const {
		teaching,
		filteredAnnouncements,
		isTeachingsLoading,
		isAnnouncementsLoading,
		handleDeleteTeachingAnnouncements,
	} = usePortfolio();

	const [selectedCategory, setSelectedCategory] = useState('Documents');

	const navigate = useNavigate();

	const navigateToTeachingDirectories = (teaching) => {
		navigate(`/teaching/${teaching._id}/portfolio/directory`);
	};

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={
					user.user.instructor || user.user.isAdmin
						? '/teachings'
						: '/my-courses'
				}
				header={
					user.user.instructor
						? 'My Teachings'
						: user.user.isAdmin
						? 'Teachings'
						: 'My Courses'
				}
				active={teaching?.course?.title}
			/>

			<Row>
				<Col>
					<Header title="Portfolio" />
				</Col>
				{user.user.student ? null : (
					<Col className="animated--grow-in text-right">
						<small
							className="text-muted px-2 pill-label clickable"
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 12,
							}}
							onClick={() => navigateToTeachingDirectories(teaching)}
						>
							Directories
						</small>
					</Col>
				)}
			</Row>

			<Row className="mb-3 animated--grow-in justify-content-center">
				<Col
					md="12"
					lg="11"
					xl="10"
					className="nav nav-pills p-2 bg-white rounded-pill align-items-center"
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
				{selectedCategory.includes(PortfolioMenu.Documents) ? (
					isTeachingsLoading ? (
						<Spinner card />
					) : (
						<Documents />
					)
				) : selectedCategory.includes(PortfolioMenu.Announcements) ? (
					isAnnouncementsLoading ? (
						<Spinner card />
					) : (
						<TeachingAnnouncements
							user={user}
							announcements={filteredAnnouncements}
							isAnnouncementsLoading={isAnnouncementsLoading}
							handleDeleteTeachingAnnouncements={
								handleDeleteTeachingAnnouncements
							}
						/>
					)
				) : selectedCategory.includes(PortfolioMenu.Exercises) ? (
					isTeachingsLoading ? (
						<Spinner card />
					) : (
						<Exercises />
					)
				) : selectedCategory.includes(PortfolioMenu.Calendar) ? (
					isTeachingsLoading ? (
						<Spinner card />
					) : (
						<Calendar />
					)
				) : selectedCategory.includes(PortfolioMenu.Messages) ? (
					isTeachingsLoading ? (
						<Spinner card />
					) : (
						<Messages />
					)
				) : selectedCategory.includes(PortfolioMenu.Chat) ? (
					isTeachingsLoading ? (
						<Spinner card />
					) : (
						<Chat />
					)
				) : null}
			</Row>
		</>
	);
}
