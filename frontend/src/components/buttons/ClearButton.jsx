import { Button, Col } from 'reactstrap';

const ClearButton = ({ onClick, disabled }) => {
	return (
		<Col sm="6" md="6" xs="12" className="text-sm-left text-center">
			<Button onClick={onClick} disabled={disabled}>
				Clear
			</Button>
		</Col>
	);
};

export default ClearButton;
