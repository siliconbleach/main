'use strict';

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  if (!isJamPage) return;
  var buttonTemplate = "<button class=\"voting-button\">&uarr; SELECT &uarr;</button>";
  var votes = []; // helpers

  var toggleVote = function toggleVote(id) {
    var $voteSlide = $("#yui_".concat(id));
    var styles = {
      background: 'white',
      color: '#e86d6d'
    };

    if (votes.length > 4) {
      return alert('You can only vote five times.');
    }

    var vote = votes.find(function (v) {
      return v === id;
    });

    if (typeof vote !== 'undefined') {
      votes.splice(vote, 1);
      styles = {
        background: 'white',
        color: '#fff'
      };
    } else {
      votes.push(id);
    }

    $voteSlide.find('.voting-button').toggleClass('is-seiected').css(styles);
  };

  var elementIdToVoteId = function elementIdToVoteId(id) {
    return id.replace('yui_', '');
  };

  var submitVotes = function submitVotes(submittedVotes) {
    var voteJSON = JSON.stringify(submittedVotes);
    console.log(voteJSON);
  }; // event listeners


  $(document).on('click', '.voting-button', function (e) {
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
