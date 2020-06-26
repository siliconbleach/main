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
		const $slide = $(this).parent();
		const voteId = elementIdToVoteId($slide.attr('id'));

		toggleVote(voteId);
	});
})(window)