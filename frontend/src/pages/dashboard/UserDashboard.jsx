import { Col, Row } from 'reactstrap';
import { INSTRUCTOR, STUDENT } from '../../constants/strings';
import Calendar from '../../components/calendar/Calendar';
import MyCoursesCard from '../../components/course/cards/MyCoursesCard';
import MyTeachingsCard from '../../components/course/cards/MyTeachingsCard';
import MyGradesCard from '../../components/portfolio/MyGradesCard';
import MessagesCard from '../../components/portfolio/MessagesCard';
import AnnouncementsCard from '../../components/portfolio/AnnouncementsCard';

export default function UserDashboard({ user }) {
	return (
		<>
			{user.user.type === STUDENT ? (
				<Row className="mb-3 animated--grow-in">
					<Col>
						<MyCoursesCard />
					</Col>
					<Col md="12" xl="7">
						<MessagesCard user={user} />
					</Col>
				</Row>
			) : user.user.type === INSTRUCTOR ? (
				<Row className="mb-3 animated--grow-in">
					<Col>
						<MyTeachingsCard />
					</Col>
					<Col md="12" xl="7">
						<MessagesCard user={user} />
					</Col>
				</Row>
			) : null}

			<Row className="mb-3 animated--grow-in">
				<Col>
					<MyGradesCard user={user} />
				</Col>
				<Col md="12" xl="7">
					<AnnouncementsCard user={user} />
				</Col>
			</Row>
			<Row className="animated--grow-in d-flex justify-content-center">
				<Calendar />
			</Row>
		</>
	);
}
