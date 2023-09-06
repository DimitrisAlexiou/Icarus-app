import { Col, Row } from 'reactstrap';
import Calendar from '../../components/calendar/Calendar';
import MyCoursesCard from '../../components/course/cards/MyCoursesCard';
import MyGradesCard from '../../components/portfolio/MyGradesCard';
import MessagesCard from '../../components/portfolio/MessagesCard';
import AnnouncementsCard from '../../components/portfolio/AnnouncementsCard';

export default function StudentDashboard() {
	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col>
					<MyCoursesCard />
				</Col>
				<Col md="12" xl="7">
					<MessagesCard />
				</Col>
			</Row>
			<Row className="mb-3 animated--grow-in">
				<Col>
					<MyGradesCard />
				</Col>
				<Col md="12" xl="7">
					<AnnouncementsCard />
				</Col>
			</Row>
			<Row className="animated--grow-in">
				<Calendar />
			</Row>
		</>
	);
}
