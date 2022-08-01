import React from 'react';
import '../../App.css';

export default function Footer() {
	return (
		<footer className="page_footer bg-white copyright text-center">
			<span>
				Copyright &copy; University of Aegean {new Date().getFullYear()}
			</span>
		</footer>
	);
}
