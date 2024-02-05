import { Col, Row } from 'reactstrap';
import { INSTRUCTOR, STUDENT } from '../../constants/strings';
import Calendar from '../../components/calendar/Calendar';
import MyCoursesCard from '../../components/course/cards/MyCoursesCard';
import MyTeachingsCard from '../../components/course/cards/MyTeachingsCard';
import MyGradesCard from '../../components/portfolio/cards/MyGradesCard';
import MessagesCard from '../../components/portfolio/cards/MessagesCard';
import AnnouncementsCard from '../../components/portfolio/cards/AnnouncementsCard';

export default function UserDashboard({ user }) {
	return (
		<>
			<Row className="mb-3 animated--grow-in">
				<Col>
					{user.user.type === STUDENT ? (
						<MyCoursesCard />
					) : user.user.type === INSTRUCTOR ? (
						<MyTeachingsCard />
					) : null}
				</Col>
				<Col md="12" xl="7">
					<AnnouncementsCard user={user} />
				</Col>
			</Row>

			<Row className="mb-3 animated--grow-in">
				<Col>
					<MyGradesCard user={user} />
				</Col>
				<Col md="12" xl="7">
					<MessagesCard user={user} />
				</Col>
			</Row>
			<Row className="animated--grow-in d-flex justify-content-center">
				<Calendar />
			</Row>
		</>
	);
}
