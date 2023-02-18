import { useEffect } from 'react';
import { Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function Portfolio() {
	return (
		<>
			<BreadcrumbNav link={'/portfolio'} header={'Portfolio'} active={'Portfolio'} />
			<Col sm="12" md="9" lg="9" xl="5" className="g-4 mb-3 mx-5">
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Portfolio</h1>
			</Col>
		</>
	);
}
