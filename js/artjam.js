

$(document).ready(function () {

	$('#block-yui_3_17_2_1_1587646755522_24810 .slide').append('<button class="vote-button" id="vote button">    &uarr; SELECT     &uarr;</button');

	var votes = [];
	function vote(val) {
		//console.log('voted for:' + val);
		console.log(votes.len);

		for (i = 0; i < votes.length; i++) {
			console.log('votes[i]=' + votes[i]);
			console.log('val=' + val);
			if (votes[i] === val) {
				votes.splice(i, 1);
				$('#' + val).closest('.slide').removeClass('slide-selected');
				console.log('unvoted for: ' + val);
				return;
			}
		}
		if (votes.length >= 5) {
			alert('You cannot vote for more than 5 entries!');
			return;
		}
		votes.push(val);
		$('#' + val).closest('.slide').addClass('slide-selected');
		console.log('voted for: ' + val);
		console.log(votes);
	}

	$('.vote-button').click(function () {
		console.log('clicked - ' + $(this).closest('.slide').attr('id'));


		vote($(this).closest('.slide').attr('id'));
	});
	$('#submitvotes-button').click(function (e) {
		//vote($(this).attr('id'));
		e.preventDefault();
		serVotes = JSON.stringify(votes);
		window.location.href = "http://oxdeception.pythonanywhere.com/?votes=" + serVotes;
	});

});
