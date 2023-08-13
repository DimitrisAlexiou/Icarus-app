import { useState } from 'react';
import GradingInfoForm from './GradingInfoForm';

const TeachingDetails = () => {
	const [theoryGradingInfo, setTheoryGradingInfo] = useState([]);
	const [labGradingInfo, setLabGradingInfo] = useState([]);

	const handleGradingInfoSubmit = (part, values) => {
		if (part === 'theory') {
			setTheoryGradingInfo((prev) => [...prev, values]);
		} else if (part === 'lab') {
			setLabGradingInfo((prev) => [...prev, values]);
		}
	};

	return (
		<div>
			{/* Display other teaching details here */}
			{/* ... */}
			<div>
				<h3>Theory Grading Information</h3>
				<GradingInfoForm onSubmit={handleGradingInfoSubmit} />
				<ul>
					{theoryGradingInfo.map((gradingInfo, index) => (
						<li key={index}>
							Examination Name: {gradingInfo.name}, Weight: {gradingInfo.weight}%
							{gradingInfo.lowerGradeThreshold &&
								`, Lower Grade Threshold: ${gradingInfo.lowerGradeThreshold}`}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h3>Lab Grading Information</h3>
				<GradingInfoForm onSubmit={handleGradingInfoSubmit} />
				<ul>
					{labGradingInfo.map((gradingInfo, index) => (
						<li key={index}>
							Examination Name: {gradingInfo.name}, Weight: {gradingInfo.weight}%
							{gradingInfo.lowerGradeThreshold &&
								`, Lower Grade Threshold: ${gradingInfo.lowerGradeThreshold}`}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TeachingDetails;
