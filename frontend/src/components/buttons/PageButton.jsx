import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { handleChange } from '../../features/courses/courseSlice';
import usePageButton from '../../hooks/generic/usePageButton';

const PageButton = () => {
	const { page, pages, nextPage, prevPage } = usePageButton();

	return (
		<>
			<Row className="mb-4">
				<Col className="px-3 d-flex justify-content-end">
					<Button
						className="btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-600"
						onClick={prevPage}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</Button>
					<span>
						{pages.map((pageNumber) => {
							return (
								<Button
									key={pageNumber}
									className={
										pageNumber === page
											? 'btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-600 active'
											: 'btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-600'
									}
									onClick={() => handleChange(pageNumber)}
								>
									{pageNumber}
								</Button>
							);
						})}
					</span>
					<Button
						className="btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-600"
						onClick={nextPage}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PageButton;
