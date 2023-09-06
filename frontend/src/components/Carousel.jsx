import { useState, useMemo, useRef } from 'react';
import { Row, Col, Carousel, CarouselItem, CarouselIndicators, Card, CardBody } from 'reactstrap';

export default function CarouselComponent({ objects, renderItem, onObjectClick }) {
	const ref = useRef(null);
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

	const renderCarouselItem = (object) => {
		return (
			<Card className="card-note mb-4">
				<CardBody>{renderItem(object)}</CardBody>
			</Card>
		);
	};

	const indicatorItems = objectPages.map((page, pageIndex) => ({
		key: `indicator-${pageIndex}`,
	}));

	return (
		<>
			<Carousel
				className="animated--grow-in"
				md="12"
				activeIndex={activeIndex}
				next={next}
				previous={previous}
				ref={ref}
			>
				<CarouselIndicators
					items={indicatorItems}
					activeIndex={activeIndex}
					onClickHandler={goToIndex}
				/>
				{objectPages.map((page, pageIndex) => (
					<CarouselItem
						className="mb-4"
						key={pageIndex}
						onExiting={() => setAnimating(true)}
						onExited={() => setAnimating(false)}
					>
						<Row>
							{page.map((object, index) => (
								<Col
									xs="12"
									sm="12"
									md="6"
									lg="6"
									xl="4"
									key={index}
									onClick={() => {
										if (onObjectClick) onObjectClick(object);
									}}
								>
									{renderCarouselItem(object)}
								</Col>
							))}
						</Row>
					</CarouselItem>
				))}
			</Carousel>
		</>
	);
}
