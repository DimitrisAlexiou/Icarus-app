import { Card, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function MscItem({ master }) {
	return (
		<>
			<Link
				style={{
					textDecoration: 'none',
				}}
				to={`/course/msc/${master._id}`}
			>
				<Card className="card-animate" body color="warning" inverse>
					<CardTitle tag="h5">{master.title}</CardTitle>
					<CardText className="mt-3">
						<small
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 13,
							}}
						>
							Starting Date: {moment(master.startDate).format('MMMM YYYY')}
						</small>
					</CardText>
					<CardText>
						<small
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 13,
							}}
						>
							Duration: {master.duration} semesters (part time: up to{' '}
							{master.duration * 2} semesters)
						</small>
					</CardText>
					<CardText>
						<small
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 13,
							}}
						>
							ECTS: {master.ects}
						</small>
					</CardText>
				</Card>
			</Link>
		</>
	);
}
