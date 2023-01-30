import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function Portfolio() {
	return (
		<>
			<BreadcrumbNav link={'/portfolio'} header={'Portfolio'} active={'Portfolio'} />
			<div className="col-sm-12 col-md-9 col-lg-9 col-xl-5 g-4 mb-3 mx-5">
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Portfolio</h1>
			</div>
		</>
	);
}
