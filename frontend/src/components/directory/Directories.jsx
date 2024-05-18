import { forwardRef } from 'react';
import {
	Row,
	Col,
	CardText,
	CardTitle,
	Modal,
	ModalHeader,
	Button,
	ModalBody,
	Spinner,
} from 'reactstrap';
import { faCircleXmark, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DirectoryForm from './forms/DirectoryForm';
import PillHeader from '../boilerplate/headers/PillHeader';
import CarouselComponent from '../Carousel';
import Loading from '../boilerplate/spinners/Spinner';
import SpinnerComponent from '../boilerplate/spinners/SpinnerMessage';

export default function Directories({
	directories,
	teaching,
	document,
	showDocument,
	addDocument,
	isDirectoriesLoading,
	handleDeleteDirectory,
	handleDeleteTeachingDirectories,
	setEditDirectory,
	isEditingDirectory,
	editDirectoryId,
	myRef,
	modal,
	setModal,
	toggle,
	selectedDirectory,
	setSelectedDirectory,
	dispatch,
}) {
	const ModalComponent = forwardRef(({ directory, ...props }, ref) => {
		return (
			<Modal ref={ref} isOpen={modal} toggle={toggle} className="modal-lg">
				<ModalHeader toggle={toggle}>
					Edit Directory (
					<span style={{ fontWeight: 'bold', fontSize: '21px' }}>
						{directory?.name}
					</span>
					)
					<Button
						className="btn btn-light mx-3"
						style={{
							fontWeight: 500,
							fontSize: 15,
						}}
						onClick={() => {
							handleDeleteDirectory(directory);
							toggle();
						}}
					>
						{isDirectoriesLoading ? (
							<Spinner size="sm" color="dark" type="grow" />
						) : (
							<FontAwesomeIcon icon={faTrashAlt} />
						)}
					</Button>
				</ModalHeader>
				<ModalBody>
					<DirectoryForm
						directory={directory}
						teaching={teaching}
						document={document}
						showDocument={showDocument}
						addDocument={addDocument}
						setEditDirectory={setEditDirectory}
						isEditingDirectory={isEditingDirectory}
						editDirectoryId={editDirectoryId}
						setModal={setModal}
						dispatch={dispatch}
					/>
				</ModalBody>
			</Modal>
		);
	});

	return (
		<>
			<Row className="mb-4 justify-content-between animated--grow-in">
				<Col className="text-center">
					<PillHeader title="directories" />
					{!isDirectoriesLoading ? (
						<h6
							className="text-muted pill-label"
							style={{
								fontWeight: '700',
								fontSize: 15,
							}}
						>
							{directories?.length}
						</h6>
					) : null}
					{directories?.length ? (
						<span
							className="text-danger"
							style={{
								fontWeight: '500',
								fontSize: 15,
							}}
						>
							<FontAwesomeIcon
								className="clickable"
								icon={faCircleXmark}
								onClick={() => {
									handleDeleteTeachingDirectories();
								}}
							/>
						</span>
					) : null}
				</Col>
			</Row>

			{isDirectoriesLoading ? (
				<Loading card />
			) : directories?.length > 0 ? (
				<CarouselComponent
					objects={directories}
					renderItem={(directory) => (
						<>
							<Row>
								<Col>
									<CardTitle
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
										className="text-light-cornflower-blue mb-2"
									>
										{directory?.name}
									</CardTitle>
								</Col>
							</Row>
							<CardText
								className="text-muted"
								style={{
									textAlign: 'justify',
									fontWeight: '700',
									fontSize: 13,
								}}
							>
								documents:
								{/* <ul>
									{directory?.files.map((file, index) => (
										<li key={index}>{file}</li>
									))}
								</ul> */}
							</CardText>
						</>
					)}
					onObjectClick={(directory) => {
						dispatch(setEditDirectory({ editDirectoryId: directory._id }));
						setSelectedDirectory(directory);
						setModal(true);
					}}
				/>
			) : (
				<div className="mb-5">
					<SpinnerComponent message="This teaching has no directories created yet." />
				</div>
			)}

			<ModalComponent
				ref={myRef}
				toggle={toggle}
				isEditingDirectory={isEditingDirectory}
				directory={selectedDirectory}
			/>
		</>
	);
}
