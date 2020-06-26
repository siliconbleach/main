((window) => {
	const isJamPage = window.location.pathname === '/jam';
	if (!isJamPage) return;
	const API_URL = 'https://artjam.ngrok.io';

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
			votes.splice(vote, 1);
		} else {
			votes.push(id);
		}

		console.log(votes);

		$voteSlide.toggleClass('slide-seiected');
	};

	const elementIdToVoteId = id => id.replace('yui_', '');

	const submitVotes = submittedVotes => {
		const voteJSON = JSON.stringify(submittedVotes);
		console.log(voteJSON);
	}

	// event listeners

	$(document).on('click', '.vote-button', function (e) {
		const $slide = $(this).parent();
		const voteId = elementIdToVoteId($slide.attr('id'));

		console.log(voteId);
		toggleVote(voteId);
	});

	$(document).on('click', '#submitvotes-button', e => {
		e.preventDefault();
		submitVotes(votes);
	});

	$(document).on('ready', function () {
		$('.slide').append(buttonTemplate);
	});
})(window)