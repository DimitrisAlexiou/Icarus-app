import { useState } from 'react';

const useModal = () => {
	const [modal, setModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const openModal = (item) => {
		setSelectedItem(item);
		setModal(true);
	};

	const closeModal = () => {
		setSelectedItem(null);
		setModal(false);
	};

	return { modal, selectedItem, openModal, closeModal };
};

export default useModal;
