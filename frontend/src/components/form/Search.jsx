import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import CheckBoxField from './CheckBoxField';
import SelectField from './SelectField';
import useCourses from '../../hooks/course/useCourses';

export default function Search() {
	const { isLoading, sortOptions, searchSemester, searchHasLab, handleSearch } =
		useCourses();

	return (
		<>
			<Row className="d-flex justify-content-center mb-3">
				<Col xl="5" lg="8" md="12" sm="12">
					<Card className="search-card">
						<CardBody>
							<Formik>
								<Form>
									<Row className="align-items-center">
										<Col xl="3">
											<SelectField
												name="sort"
												label="Sort"
												options={sortOptions.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											/>
										</Col>
										<Col>
											<CheckBoxField
												name="searchSemester"
												label="Semester"
												value={searchSemester}
												handleChange={handleSearch}
											/>
										</Col>
										<Col className="mx-3">
											<CheckBoxField
												name="searchHasLab"
												label="Lab"
												value={searchHasLab}
												handleChange={handleSearch}
											/>
										</Col>
										<Col>
											<Button
												className="btn btn-light"
												disabled={isLoading}
												// onClick={handleSubmit}
											>
												clear
											</Button>
										</Col>
									</Row>
								</Form>
							</Formik>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	);
}
