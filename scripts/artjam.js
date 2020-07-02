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

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var js_cookie = createCommonjsModule(function (module, exports) {

  (function (factory) {
    var registeredInModuleLoader;

    {
      module.exports = factory();
      registeredInModuleLoader = true;
    }

    if (!registeredInModuleLoader) {
      var OldCookies = window.Cookies;
      var api = window.Cookies = factory();

      api.noConflict = function () {
        window.Cookies = OldCookies;
        return api;
      };
    }
  })(function () {
    function extend() {
      var i = 0;
      var result = {};

      for (; i < arguments.length; i++) {
        var attributes = arguments[i];

        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }

      return result;
    }

    function decode(s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    function init(converter) {
      function api() {}

      function set(key, value, attributes) {
        if (typeof document === 'undefined') {
          return;
        }

        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
        } // We're using "expires" because "max-age" is not supported by IE


        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
          var result = JSON.stringify(value);

          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var stringifiedAttributes = '';

        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue;
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue;
          } // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...


          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return document.cookie = key + '=' + value + stringifiedAttributes;
      }

      function get(key, json) {
        if (typeof document === 'undefined') {
          return;
        }

        var jar = {}; // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.

        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var i = 0;

        for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');

          if (!json && cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }

          try {
            var name = decode(parts[0]);
            cookie = (converter.read || converter)(cookie, name) || decode(cookie);

            if (json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }

            jar[name] = cookie;

            if (key === name) {
              break;
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar;
      }

      api.set = set;

      api.get = function (key) {
        return get(key, false
        /* read as raw */
        );
      };

      api.getJSON = function (key) {
        return get(key, true
        /* read as json */
        );
      };

      api.remove = function (key, attributes) {
        set(key, '', extend(attributes, {
          expires: -1
        }));
      };

      api.defaults = {};
      api.withConverter = init;
      return api;
    }

    return init(function () {});
  });
});

(function (window) {
  var isJamPage = window.location.pathname === '/jam';
  var urlParams = new URLSearchParams(window.location.search);
  if (!isJamPage) return;
  var API_URL = 'https://artjam.ngrok.io';
  var settings = {
    user: {},
    votes: []
  };
  var buttonTemplate = "<button class=\"voting-button\">&uarr; SELECT &uarr;</button>";
  var votes = [];
  /**
   * Main
   */

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

  var fetchVotes = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(twitchId) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch("".concat(API_URL, "/api/user/").concat(twitchId, "/votes"), {
                method: 'GET'
              });

            case 2:
              response = _context.sent;
              console.dir(response);
              return _context.abrupt("return", response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchVotes(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var submitVotes = function submitVotes(submittedVotes) {
    var voteJSON = JSON.stringify(submittedVotes);
    js_cookie.set('votes', voteJSON, {
      domain: "".concat(API_URL),
      expires: 7
    });
    window.location.href = "".concat(API_URL, "/authenticate?votes=").concat(submittedVotes.join(','));
  };
  /**
   * Event Listeners
   */


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

    if (urlParams.has('success') && urlParams.has('twitch_id')) {
      var twitchId = urlParams.get('twitch_id');
      settings.user.twitchId = urlParams.get('twitch_id');
      var twitchIdCookie = js_cookie.set('userTwitchId', settings.user.twitchId, {
        expires: 14,
        secure: true
      });
    }

    var retrieveStoredSettings = window.localStorage.getItem('artJamInfo');
    var twitchIdFromCookie = js_cookie.get('userTwitchId');

    if (typeof retrieveStoredSettings === 'string') {
      var storedSettings = JSON.parse(retrieveVotesFromStorage);
      settings = Object.assign(settings, storedSettings);
      return settings;
    }

    if (typeof twitchIdFromCookie === 'string') {
      var fetchedVotes = fetchVotes(twitchIdFromCookie).then(function (res) {
        return res.json();
      });
    }
  });
})(window);
