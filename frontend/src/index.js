import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
// import sr from '../src/utils/scrollRevealConfig';
import './App.css';
import 'animate.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

// sr.reveal(document.querySelector('#content'));
// sr.reveal(
// 	'.container-fluid',
// 	sr.reveal('.container-fluid', {
// 		duration: 1000,
// 		scale: 0.8,
// 	})
// );

// useEffect(() => {
// 	sr.reveal('.container-fluid', {
// 		duration: 1000,
// 		scale: 0.8,
// 	});
// }, []);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
