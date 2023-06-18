import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
	Row,
	Col,
	Carousel,
	CarouselItem,
	CarouselIndicators,
	Card,
	CardBody,
	CardTitle,
	CardText,
} from 'reactstrap';
import { enrollAlert } from '../constants/sweetAlertNotification';

export default function CarouselComponent({ objects, title, description, subtext }) {
	const dispatch = useDispatch();

	const itemsPerPage = 6;
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const objectPages = useMemo(
		() =>
			objects.reduce(
				(result, object, index) => {
					const pageIndex = Math.floor(index / itemsPerPage);
					result[pageIndex].push(object);
					return result;
				},
				Array.from({ length: Math.ceil(objects.length / itemsPerPage) }, () => [])
			),
		[objects, itemsPerPage]
	);

	const next = () => {
		if (animating) return;
		const nextIndex = activeIndex === objectPages.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const previous = () => {
		if (animating) return;
		const nextIndex = activeIndex === 0 ? objectPages.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};

	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};

	return (
		<>
			<Carousel
				className="animated--grow-in"
				md="12"
				activeIndex={activeIndex}
				next={next}
				previous={previous}
			>
				<CarouselIndicators
					items={objectPages}
					activeIndex={activeIndex}
					onClickHandler={goToIndex}
				/>
				{objectPages.map((page) => (
					<CarouselItem
						className="mb-4"
						key={page}
						onExiting={() => setAnimating(true)}
						onExited={() => setAnimating(false)}
					>
						<Row>
							{page.map((object) => (
								<Col
									xs="6"
									sm="6"
									md="4"
									lg="3"
									xl="2"
									key={object._id}
									// onClick={() => enrollAlert(dispatch(enrollCourse(object._id)))}
									// onClick={dispatch(enrollCourse(object._id))}
								>
									<Card className="card-note mb-4">
										<CardBody>
											<CardTitle
												style={{
													textAlign: 'justify',
													fontWeight: '700',
													fontSize: 15,
												}}
												className="text-light-cornflower-blue mb-2"
											>
												{object[title]}
											</CardTitle>
											<CardText>
												<small
													className="text-muted"
													style={{
														textAlign: 'justify',
														fontWeight: '700',
														fontSize: 13,
													}}
												>
													{object[description] === true
														? 'Obligatory'
														: 'Optional'}
												</small>
											</CardText>
											<CardText
												style={{
													textAlign: 'justify',
													fontWeight: '600',
													fontSize: 11,
												}}
											>
												{object[subtext]}
											</CardText>
										</CardBody>
									</Card>
								</Col>
							))}
						</Row>
					</CarouselItem>
				))}
			</Carousel>
		</>
	);
}
