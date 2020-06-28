import cookie from 'js-cookie';

((window) => {
	const isJamPage = window.location.pathname === '/jam';
	const hasCookie = document.cookie.split('; ').find(row => row.startsWith('artjam_admin'));
	if (!isJamPage) return;
	const API_URL = 'https://artjam.ngrok.io';

	const buttonTemplate = `<button class="voting-button">&uarr; SELECT &uarr;</button>`;

	let votes = [];

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


	const saveVotes = votes => localStorage.setItem('savedSettings', JSON.stringify({ votes: votes }));

	const submitVotes = submittedVotes => {
		const voteJSON = JSON.stringify(submittedVotes);
		cookie.set('votes', voteJSON);

		window.location.href = `${API_URL}/authenticate?votes=${submittedVotes.join(',')}`;
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

		const retrieveStoredSettings = window.localStorage.getItem('artJamInfo');
		if (typeof retrieveStoredSettings === 'string') {
			const storedSettings = JSON.parse(retrieveVotesFromStorage);
			votes = storedSettings.votes;
		}
	});
})(window)