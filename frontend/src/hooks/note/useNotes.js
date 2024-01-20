import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserNote,
	deleteUserNotes,
	getNotes,
	getUserNotes,
	setEditNote,
	updateImportance,
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

	const handleDeleteUserNote = (e, noteId, setSelectedCategory) => {
		e.stopPropagation();
		deleteAlert(() => dispatch(deleteUserNote(noteId)));
		setSelectedCategory(null);
	};

	const handleUpdateImportance = (e, noteId) => {
		e.stopPropagation();
		dispatch(updateImportance(noteId));
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
		handleUpdateImportance,
		handleDeleteUserNote,
		handleDeleteUserNotes,
		dispatch,
	};
};

export default useNotes;
