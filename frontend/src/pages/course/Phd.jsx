import { Card, Col, Row } from 'reactstrap';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';

export default function Phd() {
	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/course'}
				header={'Courses'}
				active={'Phd'}
			/>
			<h3 className="mb-3 text-gray-800 font-weight-bold animated--grow-in">Phd Research</h3>
			<Row className="justify-content-center">
				<Col md="8" lg="7" xl="6">
					<Card className="card-note card-body-note mb-4">
						<h5 className="">Phd Studies</h5>
						<p className="mt-2 mx-2 text-justify">
							The Department of Information and Communication Systems Engineering
							offers research opportunities in all sectors of information and
							communications technology.
						</p>
						<p className="mx-2 text-justify">
							The goal of PhD study in the Department is to advance knowledge and
							original research, as well as to offer a high standard of
							specialization.
						</p>
						<p className="mx-2 text-justify">
							PhD study leads to a doctoral diploma (PhD), an academic title which
							certifies that its holder has carried out original scientific research
							and has effectively contributed to the advancement of science and
							knowledge in their field.
						</p>
						<p className="mx-2 text-justify">
							PhD study in the Department charges no tuition fees and follows the
							clauses of Law 4485/2017 and any relevant regulatory framework.
						</p>
					</Card>
				</Col>
			</Row>
		</>
	);
}
