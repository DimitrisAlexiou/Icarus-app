import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ProfileCard1 from '../../components/user/ProfileCard1';
import ProfileCard2 from '../../components/user/ProfileCard2';
import ProfileCard3 from '../../components/user/ProfileCard3';
import Spinner from '../../components/boilerplate/Spinner';

export default function Profile() {
	const { user, isLoading } = useSelector((state) => state.auth);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1 className="h3 mb-3 text-gray-800 font-weight-bold animated--grow-in">Profile</h1>

			<Row className="animated--grow-in">
				<Col>
					<ProfileCard1 user={user} />
				</Col>
				<Col lg="7">
					<ProfileCard2 user={user} />
				</Col>
			</Row>
			<ProfileCard3 className="animated--grow-in" user={user} />
		</>
	);
}
