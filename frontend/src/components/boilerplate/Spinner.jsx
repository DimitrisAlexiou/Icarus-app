import { Spinner } from 'reactstrap';

export default function Loading() {
	return (
		<Spinner color="dark" type="grow" className="loadingSpinner">
			Loading...
		</Spinner>
	);
}
