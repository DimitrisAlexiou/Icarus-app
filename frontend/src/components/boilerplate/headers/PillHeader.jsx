export default function PillHeader({ title }) {
	return (
		<>
			<h6
				className="text-muted pill-label"
				style={{
					fontWeight: '700',
					fontSize: 15,
				}}
			>
				{title}
			</h6>
		</>
	);
}
