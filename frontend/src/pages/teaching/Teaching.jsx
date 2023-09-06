import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, NavItem, Nav } from 'reactstrap';
import { getTeaching } from '../../features/courses/teachingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp91 } from '@fortawesome/free-solid-svg-icons';
import TeachingCard from '../../components/course/cards/TeachingCard';
import GradingCard from '../../components/course/cards/GradingCard';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/Spinner';
import BackButton from '../../components/buttons/BackButton';

export default function Teaching() {
	const { teaching, isLoading } = useSelector((state) => state.teachings);
	const [gradingForm, setGradingForm] = useState(false);

	const { teachingId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTeaching(teachingId));
	}, [dispatch, teachingId]);

	return (
		<>
			<Row className="animated--grow-in">
				<Col sm="12" xs="12" md="12" lg="9">
					<BreadcrumbNav
						className="animated--grow-in"
						link={'/teachings'}
						header={'Teachings'}
						active={teaching?.course?.title}
					/>
				</Col>
			</Row>
			<Row className="mb-3 animated--grow-in">
				<Col className="text-sm-left text-center" sm="6" xs="6" md="6">
					<Row className="mt-sm-0 mt-3">
						<Col>
							<h3 className="text-gray-800 font-weight-bold">Teaching</h3>
						</Col>
						<small
							style={{
								textAlign: 'justify',
								fontWeight: '700',
								fontSize: 14,
							}}
						>
							{teaching?.course?.title}
						</small>
					</Row>
				</Col>
				<Col className="mt-sm-0 mt-3 d-flex justify-content-end align-items-center">
					<Nav className="justify-content-between navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
						<div className="navbar-nav">
							<NavItem className="nav-item  mx-1">
								<NavLink
									className={`nav-link ${
										gradingForm ? 'font-weight-bold text-gray-500 active' : ''
									}`}
									onClick={() => setGradingForm(!gradingForm)}
								>
									<FontAwesomeIcon icon={faArrowUp91} />
									<span className="ml-2">Grading</span>
								</NavLink>
							</NavItem>
						</div>
					</Nav>
				</Col>
				<Col md="1" className="d-flex justify-content-end pb-4">
					<BackButton url={`/course/${teaching?.course?._id}`} />
				</Col>
			</Row>
			<Row className="justify-content-center animated--grow-in">
				<Col sm="12" md="11" lg="10" xl="8">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h6 className="m-0 font-weight-bold text-primary">
								<Row>
									<Col>
										<small
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 16,
											}}
										>
											{gradingForm
												? 'Grading Information'
												: 'Teaching Information'}
										</small>
									</Col>
									<Col className="d-flex justify-content-end">
										<small
											className="text-muted pill-label"
											style={{
												textAlign: 'justify',
												fontWeight: '700',
												fontSize: 12,
											}}
										>
											{teaching?.semester?.type} Semester
										</small>
									</Col>
								</Row>
							</h6>
						</div>
						<div className="card-body">
							{isLoading ? (
								<Spinner card />
							) : gradingForm ? (
								<GradingCard teaching={teaching} />
							) : teaching ? (
								<TeachingCard teaching={teaching} />
							) : null}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
