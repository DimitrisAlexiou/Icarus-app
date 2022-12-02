import { Button } from 'reactstrap';

const SignUpInButton = ({ message, icon }) => {
	return (
		<Button className="mb-2" color="null" type="submit">
			<div className="row nav-link">
				{icon}
				{message}
			</div>
		</Button>
	);
};

export default SignUpInButton;
