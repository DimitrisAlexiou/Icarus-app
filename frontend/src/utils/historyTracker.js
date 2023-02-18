const trackHistory = () => {
	let historyList = JSON.parse(sessionStorage.getItem('historyList')) || [];

	sessionStorage.setItem('historyList', JSON.stringify(historyList));

	let pathname = window.location.pathname;
	historyList = [...historyList, pathname];
	sessionStorage.setItem('historyList', JSON.stringify(historyList));
};

export default trackHistory;
