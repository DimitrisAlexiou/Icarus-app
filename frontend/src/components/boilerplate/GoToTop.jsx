import { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function GoToTop() {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowButton(window.pageYOffset > 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Button
			style={{
				display: showButton ? 'block' : 'none',
				position: 'fixed',
				bottom: '20px',
				right: '20px',
			}}
			className="nav-item rounded-circle border-0"
			color="null"
			onClick={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
		>
			<FontAwesomeIcon icon={faAngleUp} />
		</Button>
	);
}
