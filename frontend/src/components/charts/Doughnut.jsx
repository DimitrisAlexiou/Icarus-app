import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ user, labels, label, colors }) {
	const data = {
		labels: labels,
		datasets: [
			{
				label: label,
				data: [13, 54],
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
