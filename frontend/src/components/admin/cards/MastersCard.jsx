import { useState } from 'react';
import { Row, Col, Badge, Button, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { deleteAlert } from '../../../constants/sweetAlertNotification';
import {
	deleteMaster,
	deleteMasters,
	setEditMaster,
} from '../../../features/admin/masterProgramSlice';
import moment from 'moment';
import MasterProgramForm from '../forms/MasterProgramForm';
import Loading from '../../boilerplate/spinners/Spinner';

const MastersCard = ({
	masters,
	isMastersLoading,
	isEditingMaster,
	editMasterId,
	dispatch,
}) => {
	const handleDeleteMaster = (master) => {
		deleteAlert(() => dispatch(deleteMaster(master._id)));
	};

	const handleDeleteMasters = () => {
		deleteAlert(() => dispatch(deleteMasters()));
	};

	const [addingMaster, setAddingMaster] = useState(false);
	const [editedMasterIndex, setEditedMasterIndex] = useState(-1);

	return (
		<>
			<Col xl="6" lg="12" md="12" sm="12">
				<Badge color="info">Master Programs</Badge>
				<Row className="mt-3 mb-4">
					<Col xl="11" lg="11" md="12" sm="12">
						<div className="card shadow mb-3 py-1">
							<div className="card-body">
								{isMastersLoading ? (
									<Loading card />
								) : !masters.length > 0 || addingMaster ? (
									<Row>
										<MasterProgramForm
											setAddingMaster={setAddingMaster}
											dispatch={dispatch}
										/>
										<Col
											className="text-warning mt-2"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 12,
											}}
										>
											{addingMaster
												? 'Adding a new master program . . .'
												: 'Master programs have not been defined !'}
										</Col>
										{addingMaster ? (
											<Col xs="2" sm="6" md="6" className="text-right mt-1">
												<FontAwesomeIcon
													className="clickable"
													onClick={() => setAddingMaster(false)}
													icon={faXmark}
												/>
											</Col>
										) : null}
										{addingMaster ? (
											<>
												<Col xl="12">
													<small
														className="text-muted pill-label mt-3 mb-3"
														style={{
															textAlign: 'justify',
															fontWeight: '700',
															fontSize: 15,
														}}
													>
														Defined Master Programs
													</small>
												</Col>
												{masters.map((master, index) => (
													<div key={master._id}>
														<div
															className={`card shadow py-1 ${
																index !== masters.length - 1 ? ' mb-3' : ''
															}`}
														>
															<div className="card-body">
																<Row>
																	<Col xl="12">
																		<label>
																			<b>Title</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.title}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="6" md="6">
																		<label>
																			<b>Start Date</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{moment(master.startDate).format(
																				'DD/MM/YYYY'
																			)}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="6" md="6">
																		<label>
																			<b>ECTS</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.ects}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="12">
																		<label>
																			<b>Duration</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.duration}
																			<span
																				style={{
																					fontWeight: '400',
																					fontSize: 12,
																				}}
																			>
																				{' '}
																				semesters (part time: up to{' '}
																				{master.duration * 2} semesters)
																			</span>
																		</p>
																		<hr />
																	</Col>
																</Row>
															</div>
														</div>
													</div>
												))}
											</>
										) : null}
									</Row>
								) : isEditingMaster ? (
									<Row>
										{masters.map((master, index) => (
											<div key={master._id}>
												{editedMasterIndex === index && isEditingMaster ? (
													<MasterProgramForm
														master={master}
														isEditingMaster={isEditingMaster}
														editMasterId={editMasterId}
														dispatch={dispatch}
													/>
												) : null}
											</div>
										))}
										<Col
											className="text-warning mt-2"
											style={{
												textAlign: 'justify',
												fontWeight: '600',
												fontSize: 12,
											}}
										>
											Editing the master configuration. . .
										</Col>
										<Col xs="2" sm="6" md="6" className="text-right mt-1">
											<FontAwesomeIcon
												className="clickable"
												onClick={() => {
													setEditedMasterIndex(-1);
													dispatch(
														setEditMaster({
															isEditingMaster: false,
															editMasterId: '',
														})
													);
												}}
												icon={faXmark}
											/>
										</Col>
									</Row>
								) : (
									<>
										<Row className="mb-3">
											<Col>
												{masters.map((master, index) => (
													<div key={master._id}>
														<div
															className={`card shadow ${
																index !== masters.length - 1 ? ' mb-3' : ''
															}`}
														>
															<div className="card-body">
																<Row>
																	<Col xl="12">
																		<label>
																			<b>Title</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.title}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="6" md="6">
																		<label>
																			<b>Start Date</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{moment(master.startDate).format(
																				'DD/MM/YYYY'
																			)}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="6" md="6">
																		<label>
																			<b>ECTS</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.ects}
																		</p>
																		<hr />
																	</Col>
																	<Col xl="12">
																		<label>
																			<b>Duration</b>
																		</label>
																		<p
																			style={{
																				textAlign: 'justify',
																			}}
																		>
																			{master.duration}
																			<span
																				style={{
																					fontWeight: '400',
																					fontSize: 12,
																				}}
																			>
																				{' '}
																				semesters (part time: up to{' '}
																				{master.duration * 2} semesters)
																			</span>
																		</p>
																		<hr />
																	</Col>
																</Row>
																<Col className="text-right">
																	<Button
																		className="btn btn-light mx-3"
																		style={{
																			fontWeight: 500,
																			fontSize: 15,
																		}}
																		onClick={() => {
																			setEditedMasterIndex(index);
																			dispatch(
																				setEditMaster({
																					isEditingMaster: true,
																					editMasterId: master._id,
																				})
																			);
																		}}
																	>
																		<FontAwesomeIcon icon={faEdit} />
																	</Button>
																	<Button
																		className="btn btn-light"
																		style={{
																			fontWeight: 500,
																			fontSize: 15,
																		}}
																		onClick={() => handleDeleteMaster(master)}
																	>
																		{isMastersLoading ? (
																			<Spinner
																				size="sm"
																				color="dark"
																				type="grow"
																			/>
																		) : (
																			<FontAwesomeIcon icon={faTrashAlt} />
																		)}
																	</Button>
																</Col>
															</div>
														</div>
													</div>
												))}
											</Col>
										</Row>
										<Row className="align-items-center">
											<Col
												xs="12"
												sm="12"
												md="6"
												className="text-info"
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 12,
												}}
											>
												{' '}
												Master programs have been defined!
											</Col>
											<Col className="text-right mt-sm-0 mt-4">
												<Button
													className="btn btn-light"
													style={{
														fontWeight: 500,
														fontSize: 15,
													}}
													onClick={() => handleDeleteMasters()}
												>
													{isMastersLoading ? (
														<Spinner size="sm" color="dark" type="grow" />
													) : (
														<FontAwesomeIcon icon={faTrashAlt} />
													)}
												</Button>
											</Col>
										</Row>
										<Row className="mt-3">
											<Col className="text-sm-left text-center">
												<Button
													className="btn btn-light"
													style={{
														fontWeight: 500,
														fontSize: 15,
													}}
													onClick={() => setAddingMaster(true)}
												>
													Add Master
												</Button>
											</Col>
										</Row>
									</>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default MastersCard;
