((window) => {
	const isJamPage = window.location.pathname === '/jam';
	if (!isJamPage) return;

	const buttonTemplate = `<button class="vote-button">&uarr; SELECT &uarr;</button>`;

	const votes = [];

	// helpers

	const toggleVote = id => {

		const $voteSlide = $(`#yui_${id}`);

		if (votes.length > 4) {
			return alert('You can only vote five times.');
		}

		const vote = votes.find(v => v === id);

		if (typeof vote !== 'undefined') {
			votes.push(vote);
		} else {
			votes.splice(vote, 1);
		}

		$voteSlide.toggleClass('slide-seiected');
	};

	const elementIdToVoteId = id => id.replace('yui_', '');

	// event listeners

	$(document).on('click', '.vote-button', function (e) {
		const $slide = $(this).parent();
		const voteId = elementIdToVoteId($slide.attr('id'));

		toggleVote(voteId);
	});

	$(document).on('ready', function () {
		$('.slide').append(buttonTemplate);
	});
})(window)