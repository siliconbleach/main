'use strict';

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  if (!isJamPage) return;
  var buttonTemplate = "<button class=\"vote-button\">&uarr; SELECT &uarr;</button>";
  var votes = []; // helpers

  var toggleVote = function toggleVote(id) {
    var $voteSlide = $("#yui_".concat(id));

    if (votes.length > 4) {
      return alert('You can only vote five times.');
    }

    var vote = votes.find(function (v) {
      return v === id;
    });

    if (typeof vote !== 'undefined') {
      votes.splice(vote, 1);
    } else {
      votes.push(id);
    }

    console.log($voteSlide);
    $voteSlide.toggleClass('slide-seiected');
  };

  var elementIdToVoteId = function elementIdToVoteId(id) {
    return id.replace('yui_', '');
  };

  var submitVotes = function submitVotes(submittedVotes) {
    var voteJSON = JSON.stringify(submittedVotes);
    console.log(voteJSON);
  }; // event listeners


  $(document).on('click', '.vote-button', function (e) {
    var $slide = $(this).parent();
    var voteId = elementIdToVoteId($slide.attr('id'));
    toggleVote(voteId);
  });
  $(document).on('click', '#submitvotes-button', function (e) {
    e.preventDefault();
    submitVotes(votes);
  });
  $(document).on('ready', function () {
    $('.slide').append(buttonTemplate);
  });
})(window);
