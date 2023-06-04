import { Spinner } from 'reactstrap';

export default function Loading({ card }) {
	return (
		<div className={card ? 'loadingContainer-card' : 'loadingContainer'}>
			{card ? (
				<>
					<p className="text-gray-500 animated--grow-in mx-3">Icarus</p>
					<Spinner color="dark" type="grow" size="sm" className="text-gray-500" />
				</>
			) : (
				<>
					<Spinner color="dark" type="grow" className="loadingSpinner text-gray-500" />
					<p className="loadingMessage text-gray-500 animated--grow-in mx-3">Icarus</p>
				</>
			)}
		</div>
	);
}
