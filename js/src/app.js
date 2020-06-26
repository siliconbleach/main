((window) => {
	const isJamPage = window.location.pathname === '/jam';
	if (!isJamPage) return;

	console.log('It is the jam page');
})(window)