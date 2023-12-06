import { FormGroup, Label, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useSearch from '../../hooks/course/useSearch';
import FormCheckbox from './FormCheckbox';

export default function Search() {
	const {
		searchSemester,
		searchCycle,
		searchHasLab,
		sort,
		sortOptions,
		localSearch,
		handleSearch,
		optimizedDebounce,
		handleSubmit,
	} = useSearch();

	return (
		<>
			<Card className="search-card mb-4">
				<CardBody>
					<Formik>
						<Form>
							<Row className="align-items-center">
								<Col sm="12" md="6" lg="4" xl="4">
									{/* search course by title */}
									<FormGroup className="mb-3">
										<Field
											placeholder={`Search . . .`}
											type="text"
											className="form-control"
											name="search"
											value={localSearch}
											handleChange={optimizedDebounce}
										/>
									</FormGroup>
								</Col>
								<Col sm="12" md="2" lg="2" xl="1">
									{/* search by semester */}
									<FormGroup className="mx-1 mx-md-2  mx-xl-1 mb-3" check>
										<Field
											type="checkbox"
											name="searchSemester"
											value={searchSemester}
											handleChange={handleSearch}
											component={FormCheckbox}
										/>
										<Label for="searchSemester" className="text-gray-600">
											Semester
										</Label>
									</FormGroup>
								</Col>
								<Col sm="12" md="2" lg="2" xl="1">
									{/* search by cycle*/}
									<FormGroup className="mx-1 mx-md-4 mx-xl-5 mb-3" check>
										<Field
											type="checkbox"
											name="searchCycle"
											value={searchCycle}
											handleChange={handleSearch}
											component={FormCheckbox}
										/>
										<Label for="searchCycle" className="text-gray-600">
											Cycle
										</Label>
									</FormGroup>
								</Col>
								<Col sm="12" md="2" lg="2" xl="1">
									{/* search by lab*/}
									<FormGroup className="mx-1 mx-md-2 mx-xl-5 mb-3" check>
										<Field
											type="checkbox"
											name="searchHasLab"
											value={searchHasLab}
											handleChange={handleSearch}
											component={FormCheckbox}
										/>
										<Label for="searchHasLab" className="text-gray-600">
											Lab
										</Label>
									</FormGroup>
								</Col>
								<Col md="2" lg="2" xl="1" className="mx-xl-5">
									{/* sort options */}
									<Field
										className="form-control"
										as="select"
										name="sort"
										value={sort}
										handleChange={handleSearch}
									>
										{sortOptions.map((option) => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</Field>
								</Col>
								<Col sm="6" md="3" lg="3" xl="2" className="mt-sm-0 mt-3">
									<FontAwesomeIcon
										className="text-muted clickable"
										style={{
											textAlign: 'justify',
											fontWeight: '700',
											fontSize: 15,
										}}
										icon={faXmark}
										onClick={handleSubmit}
									/>
									<span className="ml-2">Clear filters</span>
									{/* <Button disabled={isLoading} onClick={handleSubmit}>
										clear filters
									</Button> */}
								</Col>
							</Row>
						</Form>
					</Formik>
				</CardBody>
			</Card>
		</>
	);
}
