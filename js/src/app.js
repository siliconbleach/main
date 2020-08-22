import cookie from 'js-cookie';

((window) => {
	const isJamPage = window.location.pathname === '/jam';
	const urlParams = new URLSearchParams(window.location.search);
	if (!isJamPage) return;
	const API_URL = 'https://artofkoko.com';

	const YUI_PREFIX = 'yui_';
	let yui_gallery_id = '';
	let settings = { user: {}, votes: [] };

	const buttonTemplate = `<button class="voting-button">&uarr; SELECT &uarr;</button>`;
	const svelteRoot = `<div id="jam-app"></div>`;
	const toastTemplate = `
		<div class="toast" id="kokoToast">
			<section class="toast-content">
				<span id="toastMessage">{{message}}</span>
			</section>
		</div>
	`;

	let $toast = null;
	let $toastMessage = null;

	const toast = {
		el: $toast,
		message: $toastMessage,
		init: function () {
			$('body').append(toastTemplate);
			$toast = $('#kokoToast');
			$toastMessage = $('#toastMessage');
			this.el = $toast;
			this.message = $toastMessage;
		},
		hide: function () {
			this.el.removeClass('js-toast-show');
			this.message.text('');
		},
		show: function () {
			this.el.addClass('js-toast-show');
		},
		success: function (message) {
			this.message.text(message);
			this.show();

			setTimeout(() => this.hide(), 1750);
		}
	};

	/**
	 * Main
	 */
	const toggleVote = id => {

		const $voteSlide = $(`#${YUI_PREFIX}${yui_gallery_id}${id}`);
		let styles = {
			background: 'white',
			color: '#e86d6d'
		}

		const voteIndex = settings.votes.indexOf(id);
		if (voteIndex > -1) {
			settings.votes.splice(voteIndex, 1);
			styles = {
				background: 'transparent',
				color: '#fff'
			}
		} else {
			if (settings.votes.length < 5) {
				settings.votes.push(id);
			} else {
				return alert('You can only vote for five pieces.');
			}
		}

		$voteSlide.find('.voting-button').toggleClass('is-selected').css(styles)
	};

	const elementIdToVoteId = id => id.split('_').pop();

	const saveStoredSettings = () => localStorage.setItem('artJamInfo', JSON.stringify(settings))
	const fetchVotes = async twitchId => {
		const response = await fetch(`${API_URL}/api/user/${twitchId}/votes`, {
			method: 'GET',
		});
		return response;
	}

	const submitVotes = async () => {
		if (!settings.user.twitch_id) {
			return window.location.href = `${API_URL}/authenticate?votes=${settings.votes.join(',')}`;
		}

		const response = await fetch(`${API_URL}/api/votes`, {
			method: 'POST',
			body: JSON.stringify(settings),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(res => res.json())
			.then(data => {
				const { success } = data;
				if (success) {
					toast.success('Vote received successfully!');
				}
			});
		return response;
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
		submitVotes();
	});

	$(document).on('mouseenter', '.image-slide-anchor', e => {
		$(e.currentTarget).css({ 'z-index': 10 });
	}).on('mouseleave', '.image-slide-anchor', e => $(e.currentTarget).css({ 'z-index': 'inherit' }));

	$(document).on('ready', function () {

		toast.init();

		$('body').append(svelteRoot);


		const $slides = Array.from(document.querySelectorAll('.slide'));
		yui_gallery_id = $slides[0].id.split('_');
		yui_gallery_id = yui_gallery_id.slice(1, yui_gallery_id.length - 1).join('_') + '_';

		// $('.slide').append(buttonTemplate);


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
			fetchVotes(twitchIdFromCookie).then(res => res.json()).then(({ user }) => {
				console.log(user);
				if (user) {
					const { votes, twitch_id, id, name } = user;
					settings.user = {
						twitch_id,
						id,
						name,
					}
					settings.votes = votes.map(v => v.piece_id);

					settings?.votes.forEach(vote => {
						$(`#${YUI_PREFIX}${yui_gallery_id}${vote}`).find('.voting-button').toggleClass('is-selected');
					});
				}
			});
		}

	});
})(window)