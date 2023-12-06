import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserNotes,
	getNotes,
	getUserNotes,
	setEditNote,
} from '../../features/notes/noteSlice';
import { deleteAlert } from '../../constants/sweetAlertNotification';

const useNotes = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { notes, isLoading, isEditingNote, editNoteId } = useSelector(
		(state) => state.notes
	);

	useEffect(() => {
		user.user.isAdmin ? dispatch(getNotes()) : dispatch(getUserNotes());
	}, [dispatch, user.user.isAdmin]);

	const allCategories = Array.from(
		new Set(notes.flatMap((note) => note.categories))
	);

	const hasImportantNotes = useMemo(() => {
		return notes.some((note) => note.importance);
	}, [notes]);

	const handleDeleteUserNotes = () => {
		deleteAlert(() => dispatch(deleteUserNotes()));
	};

	return {
		user,
		notes,
		isLoading,
		isEditingNote,
		editNoteId,
		setEditNote,
		allCategories,
		hasImportantNotes,
		handleDeleteUserNotes,
		dispatch,
	};
};

export default useNotes;
