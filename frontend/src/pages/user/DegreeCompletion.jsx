import { Col, Row } from 'reactstrap';
import Header from '../../components/boilerplate/headers/Header';
import useDegreeCompletion from '../../hooks/user/useDegreeCompletion';
import ProgressCard from '../../components/user/cards/ProgressCard';
import PrerequisitesCard from '../../components/user/cards/PrerequisitesCard';

export default function DegreeCompletion() {
	const {
		passedTeachings,
		degreeRules,
		isDegreeRulesLoading,
		calculateRemainingCourses,
	} = useDegreeCompletion();

	return (
		<>
			<Header title="Degree Completion" />

			<Row className="animated--grow-in">
				<Col xl="6">
					<PrerequisitesCard
						degreeRules={degreeRules}
						isDegreeRulesLoading={isDegreeRulesLoading}
					/>
				</Col>
				<Col xl="6">
					<ProgressCard
						passedTeachings={passedTeachings}
						calculateRemainingCourses={calculateRemainingCourses}
					/>
				</Col>
			</Row>
		</>
	);
}
