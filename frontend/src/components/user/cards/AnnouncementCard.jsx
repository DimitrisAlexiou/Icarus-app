import moment from 'moment';
import { Row, Col } from 'reactstrap';

const AnnouncementCard = ({ user, announcement }) => {
	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col
					xl={user.user.isAdmin || user.user.instructor ? '10' : '12'}
					lg={user.user.isAdmin || user.user.instructor ? '10' : '12'}
					md="12"
					sm="12"
					xs="12"
				>
					<label>
						<b>Message</b>
					</label>
					<p style={{ textAlign: 'justify' }}>{announcement.text}</p>
					{user.user.isAdmin || user.user.instructor ? <hr /> : null}
				</Col>
				<Col>
					{user.user.isAdmin || user.user.instructor ? (
						<Col>
							<label
								className={`mx-2 pill-label ${
									announcement.isVisible ? 'text-success' : 'text-warning'
								}`}
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 14,
								}}
							>
								Visible
							</label>
						</Col>
					) : null}
				</Col>
			</Row>
			{user.user.isAdmin || user.user.instructor ? null : <hr />}
			<Row>
				<Col xl="3" lg="3" md="6" sm="12" xs="12">
					<label>
						<b>Publish Date</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{moment(announcement.publishDate).format('MMMM DD, YYYY')}
					</p>
					<hr />
				</Col>
				{user.user.isAdmin || user.user.instructor ? (
					<>
						<Col xl="3" lg="3" md="6" sm="12" xs="12">
							<label>
								<b>Update Date</b>
							</label>
							<p style={{ textAlign: 'justify' }}>
								{announcement.updateDate === null
									? 'Not updated'
									: moment(announcement.updateDate).format('MMMM DD, YYYY')}
							</p>
							<hr />
						</Col>
						<Col xl="2" lg="2" md="3" sm="12" xs="12">
							<label>
								<b>Visibility</b>
							</label>
							<p style={{ textAlign: 'justify' }}>
								{announcement.visibility} days
							</p>
							<hr />
						</Col>
					</>
				) : null}
				<Col>
					<label>
						<b>Instructor</b>
					</label>
					<p style={{ textAlign: 'justify' }}>
						{announcement.owner.surname} {announcement.owner.name}
					</p>
					<hr />
				</Col>
			</Row>
		</>
	);
};

export default AnnouncementCard;
