'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = require('./lib/axios');

var axios = /*#__PURE__*/Object.freeze({
  __proto__: null
});

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  var hasCookie = document.cookie.split('; ').find(function (row) {
    return row.startsWith('artjam_admin');
  });
  if (!isJamPage) return;
  var API_URL = 'https://artjam.ngrok.io';
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
        background: 'transparent',
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

  var submitVotes = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(submittedVotes) {
      var voteJSON, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              voteJSON = JSON.stringify(submittedVotes);
              _context.next = 3;
              return axios("".concat(API_URL, "/api/votes"), {
                votes: votes
              }).then(function (res) {
                return res.json();
              })["catch"](function (e) {
                return console.log({
                  e: e
                });
              });

            case 3:
              response = _context.sent;
              console.log('Got here');

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function submitVotes(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // event listeners


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
    var retrieveStoredSettings = window.localStorage.getItem('artJamInfo');

    if (typeof retrieveStoredSettings === 'string') {
      var storedSettings = JSON.parse(retrieveVotesFromStorage);
      votes = storedSettings.votes;
    }
  });
})(window);
