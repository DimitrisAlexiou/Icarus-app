import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { changePage } from '../../features/courses/courseSlice';

const PageButton = () => {
	const { numOfPages, page } = useSelector((state) => state.courses);
	const dispatch = useDispatch();

	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages) {
			newPage = 1;
		}
		dispatch(changePage(newPage));
	};

	const prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1) {
			newPage = numOfPages;
		}
		dispatch(changePage(newPage));
	};

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
									onClick={() => dispatch(changePage(pageNumber))}
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
