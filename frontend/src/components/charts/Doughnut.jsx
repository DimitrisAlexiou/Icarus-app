import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DoughnutType } from '../../constants/enums';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
	user,
	type,
	registered,
	passed,
	labels,
	label,
	colors,
}) {
	const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				data: [
					type.includes(DoughnutType.General)
						? registered - user.user.student.passedTeachings.length
						: registered - passed,
					type.includes(DoughnutType.General)
						? user.user.student.passedTeachings.length
						: passed,
				],
				backgroundColor: colors,
				hoverOffset: 4,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		animation: {
			animateScale: true,
			animateRotate: true,
		},
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: options,
	};

	return (
		<>
			<Doughnut data={data} config={config} />
		</>
	);
}
