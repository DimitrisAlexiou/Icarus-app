import { Button } from 'reactstrap';

const SubmitButton = ({ message }) => {
	return (
		<div className="col-sm-6 mb-3 mb-sm-0">
			<Button type="submit" color="primary">
				{message}
			</Button>
		</div>
	);
};

export default SubmitButton;
