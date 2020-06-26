'use strict';

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  if (!isJamPage) return;
  var votes = []; // helpers

  var toggleVote = function toggleVote(id) {
    var $voteSlide = $("#yui_".concat(id));

    if (votes.length > 4) {
      return alert('You can only vote five times.');
    }
  };

  var elementIdToVoteId = function elementIdToVoteId(id) {
    return id.replace('yui_', '');
  }; // event listeners


  $(document).on('click', '.vote-button', function (e) {
    var $slide = $(this).parent();
    var voteId = elementIdToVoteId($slide.attr('id'));
    toggleVote(voteId);
  });
})(window);
