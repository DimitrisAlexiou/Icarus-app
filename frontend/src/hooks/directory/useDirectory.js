import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert } from '../../constants/sweetAlertNotification';
import {
	deleteDirectory,
	deleteTeachingDirectories,
	getTeachingDirectories,
	setEditDirectory,
} from '../../features/courses/directorySlice';
import { getTeaching } from '../../features/courses/teachingSlice';

const useDirectory = () => {
	const dispatch = useDispatch();

	const {
		directories,
		directory,
		isLoading: isDirectoriesLoading,
		isEditingDirectory,
		editDirectoryId,
	} = useSelector((state) => state.directories);
	const { teaching } = useSelector((state) => state.teachings);
	const { teachingId } = useParams();

	const [document, showDocument] = useState(false);

	const addDocument = () => {
		showDocument(!document);
	};

	const myRef = useRef(null);
	const [modal, setModal] = useState(false);
	const [selectedDirectory, setSelectedDirectory] = useState(null);

	const toggle = () => {
		setModal(!modal);
		dispatch(
			setEditDirectory({
				isEditingDirectory: false,
				editDirectoryId: '',
			})
		);
	};

	const handleDeleteDirectory = (directory) => {
		deleteAlert(() =>
			dispatch(
				deleteDirectory({
					teachingId: teachingId,
					directoryId: directory._id,
				})
			)
		);
	};

	const handleDeleteTeachingDirectories = () => {
		deleteAlert(() => dispatch(deleteTeachingDirectories(teachingId)));
	};

	useEffect(() => {
		dispatch(getTeaching(teachingId));
		dispatch(getTeachingDirectories(teachingId));
	}, [dispatch, teachingId]);

	return {
		teaching,
		directories,
		directory,
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
	};
};

export default useDirectory;
