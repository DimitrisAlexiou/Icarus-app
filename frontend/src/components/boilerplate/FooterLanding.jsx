import { Nav, NavItem } from 'reactstrap';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FooterLanding() {
	return (
		<>
			<footer className="sticky-footer">
				<div className="container my-auto">
					<div className="mt-3">
						<div className="landing-bottom-left">
							<Nav className="logo">
								<NavItem className="sidebar-brand d-flex align-items-center nav-links-animate">
									<a
										href="https://www.aegean.gr/"
										target="_blank"
										rel="noreferrer"
										style={{
											textDecoration: 'none',
											color: '#E0E0E0',
											marginTop: '15px',
										}}
									>
										<span
											style={{ fontSize: '0.6rem' }}
											className="sidebar-brand-text mx-3"
										>
											University of the Aegean
										</span>
									</a>
								</NavItem>
							</Nav>
						</div>
						<div className="landing-bottom-right">
							<Nav className="logo">
								<NavItem className="sidebar-brand d-flex align-items-center nav-links-animate">
									<a
										href="https://www.linkedin.com/in/dimitris-alexiou"
										target="_blank"
										rel="noreferrer"
										style={{
											textDecoration: 'none',
											color: '#E0E0E0',
											marginTop: '15px',
										}}
									>
										<span
											style={{ fontSize: '0.6rem' }}
											className="sidebar-brand-text mx-3"
										>
											<FontAwesomeIcon
												className="mx-2"
												style={{ fontSize: '0.9rem' }}
												icon={faCode}
											/>
											Developed by Dimitris Alexiou
										</span>
									</a>
								</NavItem>
							</Nav>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
