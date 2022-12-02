import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function LogoutModal() {
	return (
		<Modal>
			<ModalHeader className="modal-header" closeButton>
				Ready to Leave?
			</ModalHeader>
			<ModalBody className="modal-body">
				Select "Logout" below if you are ready to end your current session.
			</ModalBody>
			<ModalFooter className="modal-footer">
				<Button
					className="btn btn-secondary"
					// onClick={handleClose}
				>
					Close
				</Button>
				<Button
					className="btn btn-light-cornflower-blue btn-small align-self-center"
					// onClick={() =>
					//     logout({ returnTo: window.location.origin })
					// }
				>
					Logout
				</Button>
			</ModalFooter>
		</Modal>
	);
}
