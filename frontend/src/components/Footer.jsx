import React, { Component } from 'react';
import '../index.css';
import '../index2.css';

export default class Footer extends Component {
	render() {
		return (
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy; University of Aegean 2021</span>
					</div>
				</div>
			</footer>
		);
	}
}
