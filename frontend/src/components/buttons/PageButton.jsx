import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import usePageButton from '../../hooks/generic/usePageButton';

const PageButton = () => {
	const { page, pages, nextPage, prevPage, handleChangePage } = usePageButton();

	return (
		<>
			<Row className="mb-4">
				<Col className="px-3 d-flex justify-content-end">
					<Button
						className="mx-2 btn btn-light rounded-circle align-self-center text-gray-500"
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
											? 'mx-2 btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-500 active'
											: 'mx-2 btn btn-light nav-item rounded-circle border-0 align-self-center text-gray-500'
									}
									onClick={() => handleChangePage(pageNumber)}
								>
									{pageNumber}
								</Button>
							);
						})}
					</span>
					<Button
						className="mx-2 btn btn-light rounded-circle align-self-center text-gray-500"
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
