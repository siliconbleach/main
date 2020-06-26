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
      votes.push(vote);
    } else {
      votes.splice(vote, 1);
    }

    console.log(votes);
    $voteSlide.toggleClass('slide-seiected');
  };

  var elementIdToVoteId = function elementIdToVoteId(id) {
    return id.replace('yui_', '');
  }; // event listeners


  $(document).on('click', '.vote-button', function (e) {
    var $slide = $(this).parent();
    var voteId = elementIdToVoteId($slide.attr('id'));
    toggleVote(voteId);
  });
  $(document).on('ready', function () {
    $('.slide').append(buttonTemplate);
  });
})(window);
