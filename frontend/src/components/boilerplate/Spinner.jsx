import { Spinner } from 'reactstrap';

export default function Loading() {
	return (
		<div className="loadingContainer">
			<Spinner color="dark" type="grow" className="loadingSpinner text-gray-500" />
			<p className="loadingMessage text-gray-500 animated--grow-in mx-3">Icarus</p>
		</div>
	);
}
