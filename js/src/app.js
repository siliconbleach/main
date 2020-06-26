import axios from 'axios';

((window) => {
	const isJamPage = window.location.pathname === '/jam';
	if (!isJamPage) return;
	const API_URL = 'https://artjam.ngrok.io';

	const buttonTemplate = `<button class="voting-button">&uarr; SELECT &uarr;</button>`;

	const votes = [];

	// helpers

	const toggleVote = id => {

		const $voteSlide = $(`#yui_${id}`);
		let styles = {
			background: 'white',
			color: '#e86d6d'
		}

		if (votes.length > 4) {
			return alert('You can only vote five times.');
		}

		const vote = votes.find(v => v === id);

		if (typeof vote !== 'undefined') {
			votes.splice(vote, 1);
			styles = {
				background: 'transparent',
				color: '#fff'
			}
		} else {
			votes.push(id);
		}

		$voteSlide.find('.voting-button').toggleClass('is-seiected').css(styles)
	};

	const elementIdToVoteId = id => id.replace('yui_', '');

	const submitVotes = async submittedVotes => {
		const voteJSON = JSON.stringify(submittedVotes);
		const { history } = window;

		const response = await axios.post(`${API_URL}/api/votes`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify(votes),
		}).then();
	}

	// event listeners

	$(document).on('click', '.voting-button', function (e) {
		const $slide = $(this).parent();
		const voteId = elementIdToVoteId($slide.attr('id'));

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