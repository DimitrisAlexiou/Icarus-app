import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { getConfig } from './config';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';
import App from './App';
import './index.css';

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.returnTo
			? appState.returnTo
			: window.location.pathname,
	);
};

const config = getConfig();

const providerConfig = {
	domain: config.domain,
	clientId: config.clientId,
	...(config.audience ? { audience: config.audience } : null),
	redirectUri: 'http://localhost:3000/course',
	onRedirectCallback,
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Auth0Provider {...providerConfig}>
				<App />
			</Auth0Provider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
