import { Col, Row } from 'reactstrap';
import useDirectory from '../../hooks/directory/useDirectory';
import Directories from '../../components/directory/Directories';
import DirectoryForm from '../../components/directory/forms/DirectoryForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import FormHeader from '../../components/boilerplate/headers/FormHeader';
import Header from '../../components/boilerplate/headers/Header';

export default function Directory() {
	const {
		teaching,
		directories,
		isDirectoriesLoading,
		setEditDirectory,
		isEditingDirectory,
		editDirectoryId,
		document,
		showDocument,
		addDocument,
		handleDeleteDirectory,
		handleDeleteTeachingDirectories,
		myRef,
		modal,
		setModal,
		toggle,
		selectedDirectory,
		setSelectedDirectory,
		dispatch,
	} = useDirectory();

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={`/teaching/${teaching?._id}/portfolio`}
				header={teaching?.course?.title}
				active="Directories"
			/>

			<Header title="Directory" />

			<Row className="mb-3 animated--grow-in justify-content-center">
				<Col xl="6" lg="8" md="9">
					<div className="card shadow mb-5">
						<FormHeader title="Fill the form below to create a new teaching directory" />
						<div className="card-body">
							<DirectoryForm
								teaching={teaching}
								setEditDirectory={setEditDirectory}
								document={document}
								showDocument={showDocument}
								addDocument={addDocument}
								dispatch={dispatch}
							/>
						</div>
					</div>
				</Col>
			</Row>

			<Directories
				directories={directories}
				teaching={teaching}
				document={document}
				showDocument={showDocument}
				addDocument={addDocument}
				isDirectoriesLoading={isDirectoriesLoading}
				setEditDirectory={setEditDirectory}
				isEditingDirectory={isEditingDirectory}
				editDirectoryId={editDirectoryId}
				handleDeleteDirectory={handleDeleteDirectory}
				handleDeleteTeachingDirectories={handleDeleteTeachingDirectories}
				myRef={myRef}
				modal={modal}
				setModal={setModal}
				toggle={toggle}
				selectedDirectory={selectedDirectory}
				setSelectedDirectory={setSelectedDirectory}
				dispatch={dispatch}
			/>
		</>
	);
}
