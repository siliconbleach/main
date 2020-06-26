((window) => {
	const isJamPage = window.location.pathname === '/jam';
	if (!isJamPage) return;

	const votes = [];

	// helpers

	const toggleVote = id => {

	};

	const elementIdToVoteId = id => id.replace('yui_', '');

	// event listeners

	$(document).on('click', '.vote-button', function (e) {

	});
})(window)