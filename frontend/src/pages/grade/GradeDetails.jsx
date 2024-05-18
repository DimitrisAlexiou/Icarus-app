import Header from '../../components/boilerplate/headers/Header';
import BreadcrumbNav from '../../components/boilerplate/Breadcrumb';
import GradeDetailsCard from '../../components/grade/cards/GradeDetailsCard';
import useMyGradeDetails from '../../hooks/user/useMyGradeDetails';

export default function GradeDetails() {
	const { grades, overallGrade, isGradesLoading, extractCourseTitle } =
		useMyGradeDetails();

	return (
		<>
			<BreadcrumbNav
				className="animated--grow-in"
				link={'/my-grades'}
				header={'My Grades'}
				active={'Grade Details'}
			/>

			<Header title="Grade Details" />

			<GradeDetailsCard
				overallGrade={overallGrade}
				grades={grades}
				isGradesLoading={isGradesLoading}
				extractCourseTitle={extractCourseTitle}
			/>
		</>
	);
}
