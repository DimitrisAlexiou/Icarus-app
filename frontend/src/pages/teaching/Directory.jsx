import { Col, Row } from 'reactstrap';
import usePortfolio from '../../hooks/user/usePortfolio';
import DirectoryForm from '../../components/course/forms/DirectoryForm';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import Spinner from '../../components/boilerplate/spinners/Spinner';
import Header from '../../components/boilerplate/headers/Header';
import FormHeader from '../../components/boilerplate/headers/FormHeader';

export default function Directory() {
	const { teaching, dispatch } = usePortfolio();

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={`/teaching/${teaching?._id}/portfolio`}
				header={teaching?.course?.title}
				active="Directories"
			/>

			<Header title="Directory" />

			<Row className="mb-3 animated--grow-in justify-content-center">
				<Col xl="6" lg="8" md="9">
					<div className="card shadow mb-5">
						<FormHeader title="Fill the form below to create a new teaching directory" />
						<div className="card-body">
							<DirectoryForm teaching={teaching} dispatch={dispatch} />
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
