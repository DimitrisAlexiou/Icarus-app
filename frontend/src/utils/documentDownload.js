export const documentDownload = (response, downloadLink) => {
	// Create a blob URL for the PDF content
	const blob = new Blob([response.data], { type: 'application/pdf' });
	const url = window.URL.createObjectURL(blob);
	// Create a link element and trigger a click to download the file
	const link = document.createElement('a');
	link.href = url;
	link.download = downloadLink;
	document.body.appendChild(link);
	link.click();
	// Clean up resources
	window.URL.revokeObjectURL(url);
	document.body.removeChild(link);
};
