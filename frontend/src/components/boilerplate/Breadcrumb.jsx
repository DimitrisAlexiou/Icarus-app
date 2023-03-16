import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function BreadcrumbNav({ link, header, headerNext, active }) {
	return (
		<Breadcrumb tag="nav">
			<BreadcrumbItem>
				<Link style={{ textDecoration: 'none' }} to={link}>
					{header}
				</Link>
			</BreadcrumbItem>
			<BreadcrumbItem active>{active}</BreadcrumbItem>
		</Breadcrumb>
	);
}
