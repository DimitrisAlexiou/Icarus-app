import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';
import React from 'react';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return <Button onClick={() => loginWithRedirect()}>Log in</Button>;
};

export default LoginButton;
