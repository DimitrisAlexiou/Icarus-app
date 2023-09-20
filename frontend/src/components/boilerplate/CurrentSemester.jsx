import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col } from 'reactstrap';
import { getSemester } from '../../features/admin/semesterSlice';

export default function CurrentSemester() {
	const { semester } = useSelector((state) => state.semesters);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSemester());
	}, [dispatch]);

	return (
		<>
			{semester ? (
				<Col xl="3" md="6" className="text-right">
					<Card className="card-note">
						<CardBody>
							<CardTitle>
								<Col>
									<h6> Current Semester</h6>
								</Col>
								<Col>
									<h3>{semester.type}</h3>
								</Col>
							</CardTitle>
						</CardBody>
					</Card>
				</Col>
			) : null}
		</>
	);
}
