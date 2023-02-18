import { useSelector } from 'react-redux';

export default function Dashboard() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			{user ? (
				<>
					<h1 className="h3 mb-5 text-gray-800 font-weight-bold">
						Dashboard {user.user.name}
					</h1>
					<p>
						{!user.user.isActive && !user.user.lastLogin ? (
							<span>
								Account is not yet active, it will be available soon.(Not yet logged
								in after registration)
							</span>
						) : (
							<span>
								{user.user.lastLogin} :: Account is active and has logged in at
								least once.
							</span>
						)}
					</p>
				</>
			) : (
				<h1 className="h3 mb-5 text-gray-800 font-weight-bold">Dashboard</h1>
			)}
		</>
	);
}
