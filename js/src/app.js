import cookie from 'js-cookie';

((window) => {
	const isJamPage = window.location.pathname === '/jam';
	const urlParams = new URLSearchParams(window.location.search);
	if (!isJamPage) return;
	const API_URL = 'https://artjam.ngrok.io';

	const YUI_PREFIX = 'yui_';
	let yui_gallery_id = '';
	let settings = { user: {}, votes: [] };

	const buttonTemplate = `<button class="voting-button">&uarr; SELECT &uarr;</button>`;

	let votes = [];

	/**
	 * Main
	 */
	const toggleVote = id => {

		const $voteSlide = $(`#${YUI_PREFIX}${id}`);
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

	const elementIdToVoteId = id => id.split('_').pop();

	const saveStoredSettings = () => localStorage.setItem('artJamInfo', JSON.stringify(settings))
	const fetchVotes = async twitchId => {
		const response = await fetch(`${API_URL}/api/user/${twitchId}/votes`, {
			method: 'GET',
		});
		return response;
	}

	const submitVotes = submittedVotes => {
		const voteJSON = JSON.stringify(submittedVotes);
		cookie.set('votes', voteJSON, { domain: `${API_URL}`, expires: 7 });

		window.location.href = `${API_URL}/authenticate?votes=${submittedVotes.join(',')}`;
	}

	/**
	 * Event Listeners
	 */
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
		const $slides = Array.from(document.querySelectorAll('.slide'));
		yui_gallery_id = $slides[0].id.split('_');
		yui_gallery_id = yui_gallery_id.slice(1, yui_gallery_id.length - 2).join('_');

		console.log(yui_gallery_id);

		$('.slide').append(buttonTemplate);


		if (urlParams.has('success') && urlParams.has('twitch_id')) {

			const twitchId = urlParams.get('twitch_id');

			settings.user.twitchId = urlParams.get('twitch_id');
			const twitchIdCookie = cookie.set('userTwitchId', settings.user.twitchId, {
				expires: 14,
				secure: true
			});
		}

		const retrieveStoredSettings = window.localStorage.getItem('artJamInfo');

		if (typeof retrieveStoredSettings === 'string') {
			const storedSettings = JSON.parse(retrieveVotesFromStorage);
			settings = Object.assign(settings, storedSettings);
			return settings;
		}

		const twitchIdFromCookie = cookie.get('userTwitchId');
		if (typeof twitchIdFromCookie === 'string') {
			fetchVotes(twitchIdFromCookie).then(res => res.json()).then(({ user: { votes, twitch_id, id, name } }) => {
				settings.user = {
					twitch_id,
					id,
					name,
				}
				console.log(votes);
				settings.votes = votes;

				settings.votes.forEach(vote => document.getElementById(`${YUI_PREFIX}${vote.piece_id}`).querySelector('.voting-button').toggleClass('is-selected'));
			});
		}

	});
})(window)