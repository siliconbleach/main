'use strict';

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  if (!isJamPage) return;

  var elementIdToVoteId = function elementIdToVoteId(id) {
    return id.replace('yui_', '');
  }; // event listeners


  $(document).on('click', '.vote-button', function (e) {
    var $slide = $(this).parent();
    var voteId = elementIdToVoteId($slide.attr('id'));
  });
})(window);
