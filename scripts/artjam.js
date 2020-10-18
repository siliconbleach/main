(function () {
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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

  function noop() {}

  const identity = x => x;

  function assign(tar, src) {
    // @ts-ignore
    for (const k in src) tar[k] = src[k];

    return tar;
  }

  function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
      loc: {
        file,
        line,
        column,
        char
      }
    };
  }

  function run(fn) {
    return fn();
  }

  function blank_object() {
    return Object.create(null);
  }

  function run_all(fns) {
    fns.forEach(run);
  }

  function is_function(thing) {
    return typeof thing === 'function';
  }

  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
  }

  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }

  function exclude_internal_props(props) {
    const result = {};

    for (const k in props) if (k[0] !== '$') result[k] = props[k];

    return result;
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client ? () => window.performance.now() : () => Date.now();
  let raf = is_client ? cb => requestAnimationFrame(cb) : noop; // used internally for testing

  const tasks = new Set();

  function run_tasks(now) {
    tasks.forEach(task => {
      if (!task.c(now)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0) raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */


  function loop(callback) {
    let task;
    if (tasks.size === 0) raf(run_tasks);
    return {
      promise: new Promise(fulfill => {
        tasks.add(task = {
          c: callback,
          f: fulfill
        });
      }),

      abort() {
        tasks.delete(task);
      }

    };
  }

  function append(target, node) {
    target.appendChild(node);
  }

  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }

  function detach(node) {
    node.parentNode.removeChild(node);
  }

  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i]) iterations[i].d(detaching);
    }
  }

  function element(name) {
    return document.createElement(name);
  }

  function text(data) {
    return document.createTextNode(data);
  }

  function space() {
    return text(' ');
  }

  function empty() {
    return text('');
  }

  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }

  function prevent_default(fn) {
    return function (event) {
      event.preventDefault(); // @ts-ignore

      return fn.call(this, event);
    };
  }

  function stop_propagation(fn) {
    return function (event) {
      event.stopPropagation(); // @ts-ignore

      return fn.call(this, event);
    };
  }

  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
  }

  function children(element) {
    return Array.from(element.childNodes);
  }

  function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
  }

  function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
  }

  const active_docs = new Set();
  let active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

  function hash(str) {
    let hash = 5381;
    let i = str.length;

    while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);

    return hash >>> 0;
  }

  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';

    for (let p = 0; p <= 1; p += step) {
      const t = a + (b - a) * ease(p);
      keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }

    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

    if (!current_rules[name]) {
      current_rules[name] = true;
      stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }

    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }

  function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name ? anim => anim.indexOf(name) < 0 // remove specific animation
    : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;

    if (deleted) {
      node.style.animation = next.join(', ');
      active -= deleted;
      if (!active) clear_rules();
    }
  }

  function clear_rules() {
    raf(() => {
      if (active) return;
      active_docs.forEach(doc => {
        const stylesheet = doc.__svelte_stylesheet;
        let i = stylesheet.cssRules.length;

        while (i--) stylesheet.deleteRule(i);

        doc.__svelte_rules = {};
      });
      active_docs.clear();
    });
  }

  let current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error(`Function called outside component initialization`);
    return current_component;
  }

  function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }

  function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
  }

  function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
      const callbacks = component.$$.callbacks[type];

      if (callbacks) {
        // TODO are there situations where events could be dispatched
        // in a server (non-DOM) environment?
        const event = custom_event(type, detail);
        callbacks.slice().forEach(fn => {
          fn.call(component, event);
        });
      }
    };
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;

  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }

  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }

  let flushing = false;
  const seen_callbacks = new Set();

  function flush() {
    if (flushing) return;
    flushing = true;

    do {
      // first, call beforeUpdate functions
      // and update components
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }

      set_current_component(null);
      dirty_components.length = 0;

      while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...


      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];

        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }

      render_callbacks.length = 0;
    } while (dirty_components.length);

    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }

    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }

  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }

  let promise;

  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }

    return promise;
  }

  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }

  const outroing = new Set();
  let outros;

  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros // parent group

    };
  }

  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }

    outros = outros.p;
  }

  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }

  function transition_out(block, local, detach, callback) {
    if (block && block.o) {
      if (outroing.has(block)) return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);

        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }

  const null_transition = {
    duration: 0
  };

  function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;

    function clear_animation() {
      if (animation_name) delete_rule(node, animation_name);
    }

    function init(program, duration) {
      const d = program.b - t;
      duration *= Math.abs(d);
      return {
        a: t,
        b: program.b,
        d,
        duration,
        start: program.start,
        end: program.start + duration,
        group: program.group
      };
    }

    function go(b) {
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        tick = noop,
        css
      } = config || null_transition;
      const program = {
        start: now() + delay,
        b
      };

      if (!b) {
        // @ts-ignore todo: improve typings
        program.group = outros;
        outros.r += 1;
      }

      if (running_program || pending_program) {
        pending_program = program;
      } else {
        // if this is an intro, and there's a delay, we need to do
        // an initial tick and/or apply CSS animation immediately
        if (css) {
          clear_animation();
          animation_name = create_rule(node, t, b, duration, delay, easing, css);
        }

        if (b) tick(0, 1);
        running_program = init(program, duration);
        add_render_callback(() => dispatch(node, b, 'start'));
        loop(now => {
          if (pending_program && now > pending_program.start) {
            running_program = init(pending_program, duration);
            pending_program = null;
            dispatch(node, running_program.b, 'start');

            if (css) {
              clear_animation();
              animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
            }
          }

          if (running_program) {
            if (now >= running_program.end) {
              tick(t = running_program.b, 1 - t);
              dispatch(node, running_program.b, 'end');

              if (!pending_program) {
                // we're done
                if (running_program.b) {
                  // intro — we can tidy up immediately
                  clear_animation();
                } else {
                  // outro — needs to be coordinated
                  if (! --running_program.group.r) run_all(running_program.group.c);
                }
              }

              running_program = null;
            } else if (now >= running_program.start) {
              const p = now - running_program.start;
              t = running_program.a + running_program.d * easing(p / running_program.duration);
              tick(t, 1 - t);
            }
          }

          return !!(running_program || pending_program);
        });
      }
    }

    return {
      run(b) {
        if (is_function(config)) {
          wait().then(() => {
            // @ts-ignore
            config = config();
            go(b);
          });
        } else {
          go(b);
        }
      },

      end() {
        clear_animation();
        running_program = pending_program = null;
      }

    };
  }

  const globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

  function create_component(block) {
    block && block.c();
  }

  function mount_component(component, target, anchor) {
    const {
      fragment,
      on_mount,
      on_destroy,
      after_update
    } = component.$$;
    fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }

  function destroy_component(component, detaching) {
    const $$ = component.$$;

    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)

      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }

  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }

    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }

  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false
    };
    let ready = false;
    $$.ctx = instance ? instance(component, prop_values, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;

      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
        if (ready) make_dirty(component, i);
      }

      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update); // `false` as a special case of no DOM component

    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }

      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }

    set_current_component(parent_component);
  }

  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }

    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    }

    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }

  }

  function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({
      version: '3.29.0'
    }, detail)));
  }

  function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", {
      target,
      node
    });
    append(target, node);
  }

  function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", {
      target,
      node,
      anchor
    });
    insert(target, node, anchor);
  }

  function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", {
      node
    });
    detach(node);
  }

  function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default) modifiers.push('preventDefault');
    if (has_stop_propagation) modifiers.push('stopPropagation');
    dispatch_dev("SvelteDOMAddEventListener", {
      node,
      event,
      handler,
      modifiers
    });
    const dispose = listen(node, event, handler, options);
    return () => {
      dispatch_dev("SvelteDOMRemoveEventListener", {
        node,
        event,
        handler,
        modifiers
      });
      dispose();
    };
  }

  function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null) dispatch_dev("SvelteDOMRemoveAttribute", {
      node,
      attribute
    });else dispatch_dev("SvelteDOMSetAttribute", {
      node,
      attribute,
      value
    });
  }

  function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data) return;
    dispatch_dev("SvelteDOMSetData", {
      node: text,
      data
    });
    text.data = data;
  }

  function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
      let msg = '{#each} only iterates over array-like objects.';

      if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
        msg += ' You can use a spread to convert this iterable into an array.';
      }

      throw new Error(msg);
    }
  }

  function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
      if (!~keys.indexOf(slot_key)) {
        console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
      }
    }
  }

  class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
      if (!options || !options.target && !options.$$inline) {
        throw new Error(`'target' is a required option`);
      }

      super();
    }

    $destroy() {
      super.$destroy();

      this.$destroy = () => {
        console.warn(`Component was already destroyed`); // eslint-disable-line no-console
      };
    }

    $capture_state() {}

    $inject_state() {}

  }

  function fade(node, {
    delay = 0,
    duration = 400,
    easing = identity
  }) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      easing,
      css: t => `opacity: ${t * o}`
    };
  }

  /* components/FloatingSubmitButton.svelte generated by Svelte v3.29.0 */
  const file = "components/FloatingSubmitButton.svelte";

  function add_css() {
  	var style = element("style");
  	style.id = "svelte-x28trx-style";
  	style.textContent = "#vote-submission.svelte-x28trx{position:fixed;left:3.7rem;bottom:0.75rem;display:flex;justify-content:center;align-items:center}#submitvotes-button.svelte-x28trx{background:rgba(0, 0, 0, 0.6);appearance:none;border:none;padding:0.75rem;color:#fff;border-radius:0.25rem;font-size:20px;opacity:0;visibility:hidden;transition:all 0.75s ease-in-out}#submitvotes-button.is-shown.svelte-x28trx{opacity:1;visibility:visible}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvYXRpbmdTdWJtaXRCdXR0b24uc3ZlbHRlIiwic291cmNlcyI6WyJGbG9hdGluZ1N1Ym1pdEJ1dHRvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBpbXBvcnQgeyBmYWRlIH0gZnJvbSBcInN2ZWx0ZS90cmFuc2l0aW9uXCI7XG4gIGNvbnN0IE1BWF9WT1RFU19BTExPV0VEID0gNTtcbiAgZXhwb3J0IGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICBleHBvcnQgY29uc3Qgdm90ZXMgPSBBcnJheSg1KTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAodm90ZXNUb1N1Ym1pdCkgPT5cbiAgICBkaXNwYXRjaChcInN1Ym1pdFZvdGVzXCIsIHtcbiAgICAgIHZvdGVzOiB2b3Rlc1RvU3VibWl0LFxuICAgIH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwicG9zdGNzc1wiPlxuICAjdm90ZS1zdWJtaXNzaW9uIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgbGVmdDogMy43cmVtO1xuICAgIGJvdHRvbTogMC43NXJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIH1cblxuICAjc3VibWl0dm90ZXMtYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC43NXMgZWFzZS1pbi1vdXQ7XG4gIH1cblxuICAjc3VibWl0dm90ZXMtYnV0dG9uLmlzLXNob3duIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbjwvc3R5bGU+XG5cbjxmb3JtXG4gIGlkPVwidm90ZS1zdWJtaXNzaW9uXCJcbiAgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtoYW5kbGVTdWJtaXR9XG4gIHRyYW5zaXRpb246ZmFkZT17eyBkZWxheTogMjUwLCBkdXJhdGlvbjogMzAwIH19PlxuICA8YnV0dG9uIGlkPVwic3VibWl0dm90ZXMtYnV0dG9uXCIgY2xhc3M6aXMtc2hvd249e2hhc0NoYW5nZWR9IHR5cGU9XCJzdWJtaXRcIj5cbiAgICBTdWJtaXQgVm90ZXNcbiAgPC9idXR0b24+XG48L2Zvcm0+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJFLGdCQUFnQixjQUFDLENBQUMsQUFDaEIsUUFBUSxDQUFFLEtBQUssQ0FDZixJQUFJLENBQUUsTUFBTSxDQUNaLE1BQU0sQ0FBRSxPQUFPLENBQ2YsT0FBTyxDQUFFLElBQUksQ0FDYixlQUFlLENBQUUsTUFBTSxDQUN2QixXQUFXLENBQUUsTUFBTSxBQUNyQixDQUFDLEFBRUQsbUJBQW1CLGNBQUMsQ0FBQyxBQUNuQixVQUFVLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FDOUIsVUFBVSxDQUFFLElBQUksQ0FDaEIsTUFBTSxDQUFFLElBQUksQ0FDWixPQUFPLENBQUUsT0FBTyxDQUNoQixLQUFLLENBQUUsSUFBSSxDQUNYLGFBQWEsQ0FBRSxPQUFPLENBQ3RCLFNBQVMsQ0FBRSxJQUFJLENBQ2YsT0FBTyxDQUFFLENBQUMsQ0FDVixVQUFVLENBQUUsTUFBTSxDQUNsQixVQUFVLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEFBQ25DLENBQUMsQUFFRCxtQkFBbUIsU0FBUyxjQUFDLENBQUMsQUFDNUIsT0FBTyxDQUFFLENBQUMsQ0FDVixVQUFVLENBQUUsT0FBTyxBQUNyQixDQUFDIn0= */";
  	append_dev(document.head, style);
  }

  function create_fragment(ctx) {
  	let form;
  	let button;
  	let form_transition;
  	let current;
  	let mounted;
  	let dispose;

  	const block = {
  		c: function create() {
  			form = element("form");
  			button = element("button");
  			button.textContent = "Submit Votes";
  			attr_dev(button, "id", "submitvotes-button");
  			attr_dev(button, "type", "submit");
  			attr_dev(button, "class", "svelte-x28trx");
  			toggle_class(button, "is-shown", /*hasChanged*/ ctx[0]);
  			add_location(button, file, 49, 2, 1032);
  			attr_dev(form, "id", "vote-submission");
  			attr_dev(form, "class", "svelte-x28trx");
  			add_location(form, file, 45, 0, 908);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, form, anchor);
  			append_dev(form, button);
  			current = true;

  			if (!mounted) {
  				dispose = listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[1]), false, true, false);
  				mounted = true;
  			}
  		},
  		p: function update(ctx, [dirty]) {
  			if (dirty & /*hasChanged*/ 1) {
  				toggle_class(button, "is-shown", /*hasChanged*/ ctx[0]);
  			}
  		},
  		i: function intro(local) {
  			if (current) return;

  			add_render_callback(() => {
  				if (!form_transition) form_transition = create_bidirectional_transition(form, fade, { delay: 250, duration: 300 }, true);
  				form_transition.run(1);
  			});

  			current = true;
  		},
  		o: function outro(local) {
  			if (!form_transition) form_transition = create_bidirectional_transition(form, fade, { delay: 250, duration: 300 }, false);
  			form_transition.run(0);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(form);
  			if (detaching && form_transition) form_transition.end();
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const MAX_VOTES_ALLOWED = 5;

  function instance($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots("FloatingSubmitButton", slots, []);
  	let { hasChanged = false } = $$props;
  	const dispatch = createEventDispatcher();
  	const votes = Array(5);
  	const handleSubmit = votesToSubmit => dispatch("submitVotes", { votes: votesToSubmit });
  	const writable_props = ["hasChanged"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FloatingSubmitButton> was created with unknown prop '${key}'`);
  	});

  	$$self.$$set = $$props => {
  		if ("hasChanged" in $$props) $$invalidate(0, hasChanged = $$props.hasChanged);
  	};

  	$$self.$capture_state = () => ({
  		createEventDispatcher,
  		fade,
  		MAX_VOTES_ALLOWED,
  		hasChanged,
  		dispatch,
  		votes,
  		handleSubmit
  	});

  	$$self.$inject_state = $$props => {
  		if ("hasChanged" in $$props) $$invalidate(0, hasChanged = $$props.hasChanged);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [hasChanged, handleSubmit, votes];
  }

  class FloatingSubmitButton extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-x28trx-style")) add_css();
  		init(this, options, instance, create_fragment, safe_not_equal, { hasChanged: 0, votes: 2 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "FloatingSubmitButton",
  			options,
  			id: create_fragment.name
  		});
  	}

  	get hasChanged() {
  		throw new Error("<FloatingSubmitButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set hasChanged(value) {
  		throw new Error("<FloatingSubmitButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get votes() {
  		return this.$$.ctx[2];
  	}

  	set votes(value) {
  		throw new Error("<FloatingSubmitButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* components/VoteManager.svelte generated by Svelte v3.29.0 */

  const { console: console_1 } = globals;
  const file$1 = "components/VoteManager.svelte";

  function add_css$1() {
  	var style = element("style");
  	style.id = "svelte-1ikdfju-style";
  	style.textContent = ".vote-container.svelte-1ikdfju.svelte-1ikdfju{position:fixed;bottom:8px;left:8px;display:flex;flex-direction:row;z-index:9999}.vote-holder.svelte-1ikdfju.svelte-1ikdfju{width:64px;height:64px;border:2px solid #fff;border-radius:6px;margin:0 8px}@media screen and (min-width: 768px){.vote-container.svelte-1ikdfju.svelte-1ikdfju{flex-direction:column-reverse}.vote-holder.svelte-1ikdfju.svelte-1ikdfju{margin:0.5rem auto;position:relative;overflow:hidden}.vote-holder.svelte-1ikdfju img.svelte-1ikdfju{position:absolute;top:0;left:0;width:100%;height:auto;max-height:100%}img.svelte-1ikdfju.svelte-1ikdfju:hover{cursor:pointer}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm90ZU1hbmFnZXIuc3ZlbHRlIiwic291cmNlcyI6WyJWb3RlTWFuYWdlci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgYWZ0ZXJVcGRhdGUsIGJlZm9yZVVwZGF0ZSwgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcblxuICBpbXBvcnQgRmxvYXRpbmdTdWJtaXRCdXR0b24gZnJvbSBcIi4vRmxvYXRpbmdTdWJtaXRCdXR0b24uc3ZlbHRlXCI7XG4gIGNvbnN0IENETl9CQVNFX1VSTCA9IFwiaHR0cHM6Ly9hc3NldHMuYXJ0b2Zrb2tvLmNvbS9hcnRqYW0vNVwiO1xuXG4gIGNvbnN0IElOSVRJQUxfVk9URSA9IHtcbiAgICB1c2VyX2lkOiBudWxsLFxuICAgIHBpZWNlX2lkOiAwLFxuICB9O1xuXG4gIGV4cG9ydCBsZXQgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiTm90IG92ZXJyaWRlblwiKTtcbiAgfTtcblxuICBleHBvcnQgbGV0IHVzZXIgPSB7IHZvdGVzOiBbXSB9O1xuXG4gIGxldCBjaGFuZ2VDb3VudCA9IDA7XG5cbiAgJDogdm90ZXMgPSB1c2VyLnZvdGVzO1xuICAkOiBvZmZzZXQgPSBBcnJheSg1IC0gdm90ZXMubGVuZ3RoKTtcbiAgJDogY3VycmVudFZvdGVzID0gdm90ZXMuY29uY2F0KG9mZnNldCk7XG4gICQ6IGhhc0NoYW5nZWQgPSBjaGFuZ2VDb3VudCA+IDA7XG5cbiAgY29uc3QgY2xlYXJWb3RlID0gKGluZGV4KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFZvdGVzID0gdm90ZXMuZmlsdGVyKCh2LCBpKSA9PiBpICE9PSBpbmRleCk7XG4gICAgdm90ZXMgPSBjdXJyZW50Vm90ZXM7XG4gIH07XG5cbiAgYWZ0ZXJVcGRhdGUoKCkgPT4ge1xuICAgIGNoYW5nZUNvdW50ICs9IDE7XG4gIH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwicG9zdGNzc1wiPlxuICAudm90ZS1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDhweDtcbiAgICBsZWZ0OiA4cHg7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgei1pbmRleDogOTk5OTtcbiAgfVxuXG4gIC52b3RlLWhvbGRlciB7XG4gICAgd2lkdGg6IDY0cHg7XG4gICAgaGVpZ2h0OiA2NHB4O1xuXG4gICAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgbWFyZ2luOiAwIDhweDtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLnZvdGUtY29udGFpbmVyIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgICB9XG5cbiAgICAudm90ZS1ob2xkZXIge1xuICAgICAgbWFyZ2luOiAwLjVyZW0gYXV0bztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLnZvdGUtaG9sZGVyIGltZyB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIGltZzpob3ZlciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwidm90ZS1jb250YWluZXJcIj5cbiAgeyNpZiBjdXJyZW50Vm90ZXN9XG4gICAgeyNlYWNoIGN1cnJlbnRWb3RlcyBhcyB2b3RlLCBpbmRleH1cbiAgICAgIDxkaXYgY2xhc3M9XCJ2b3RlLWhvbGRlclwiIG9uOmNsaWNrPXsoKSA9PiBjbGVhclZvdGUoaW5kZXgpfT5cbiAgICAgICAgeyNpZiB2b3RlfVxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz17YCR7Q0ROX0JBU0VfVVJMfS8ke3ZvdGUucGllY2VfaWQgfHwgdm90ZS5pZH0uanBnYH1cbiAgICAgICAgICAgIGFsdD1cIkFydGphbSBlbnRyeSB2b3RlIHRodW1ibmFpbFwiIC8+XG4gICAgICAgIHsvaWZ9XG4gICAgICA8L2Rpdj5cbiAgICB7OmVsc2V9PHNwYW4+Tm8gdm90ZXMgeWV0LCB3aGF0IGFyZSB5b3Ugd2FpdGluZyBmb3I/PC9zcGFuPnsvZWFjaH1cbiAgey9pZn1cbiAgeyNpZiBoYXNDaGFuZ2VkfVxuICAgIDxGbG9hdGluZ1N1Ym1pdEJ1dHRvbiB7aGFzQ2hhbmdlZH0gb246c3VibWl0Vm90ZXM9e2hhbmRsZVN1Ym1pdH0gLz5cbiAgey9pZn1cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1DRSxlQUFlLDhCQUFDLENBQUMsQUFDZixRQUFRLENBQUUsS0FBSyxDQUNmLE1BQU0sQ0FBRSxHQUFHLENBQ1gsSUFBSSxDQUFFLEdBQUcsQ0FFVCxPQUFPLENBQUUsSUFBSSxDQUNiLGNBQWMsQ0FBRSxHQUFHLENBQ25CLE9BQU8sQ0FBRSxJQUFJLEFBQ2YsQ0FBQyxBQUVELFlBQVksOEJBQUMsQ0FBQyxBQUNaLEtBQUssQ0FBRSxJQUFJLENBQ1gsTUFBTSxDQUFFLElBQUksQ0FFWixNQUFNLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3RCLGFBQWEsQ0FBRSxHQUFHLENBQ2xCLE1BQU0sQ0FBRSxDQUFDLENBQUMsR0FBRyxBQUNmLENBQUMsQUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLENBQUMsQUFBQyxDQUFDLEFBQ3BDLGVBQWUsOEJBQUMsQ0FBQyxBQUNmLGNBQWMsQ0FBRSxjQUFjLEFBQ2hDLENBQUMsQUFFRCxZQUFZLDhCQUFDLENBQUMsQUFDWixNQUFNLENBQUUsTUFBTSxDQUFDLElBQUksQ0FDbkIsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsUUFBUSxDQUFFLE1BQU0sQUFDbEIsQ0FBQyxBQUVELDJCQUFZLENBQUMsR0FBRyxlQUFDLENBQUMsQUFDaEIsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsR0FBRyxDQUFFLENBQUMsQ0FDTixJQUFJLENBQUUsQ0FBQyxDQUNQLEtBQUssQ0FBRSxJQUFJLENBQ1gsTUFBTSxDQUFFLElBQUksQ0FDWixVQUFVLENBQUUsSUFBSSxBQUNsQixDQUFDLEFBRUQsaUNBQUcsTUFBTSxBQUFDLENBQUMsQUFDVCxNQUFNLENBQUUsT0FBTyxBQUNqQixDQUFDLEFBQ0gsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function get_each_context(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[10] = list[i];
  	child_ctx[12] = i;
  	return child_ctx;
  }

  // (82:2) {#if currentVotes}
  function create_if_block_1(ctx) {
  	let each_1_anchor;
  	let each_value = /*currentVotes*/ ctx[1];
  	validate_each_argument(each_value);
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  	}

  	let each_1_else = null;

  	if (!each_value.length) {
  		each_1_else = create_else_block(ctx);
  	}

  	const block = {
  		c: function create() {
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			each_1_anchor = empty();

  			if (each_1_else) {
  				each_1_else.c();
  			}
  		},
  		m: function mount(target, anchor) {
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(target, anchor);
  			}

  			insert_dev(target, each_1_anchor, anchor);

  			if (each_1_else) {
  				each_1_else.m(target, anchor);
  			}
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*clearVote, CDN_BASE_URL, currentVotes*/ 10) {
  				each_value = /*currentVotes*/ ctx[1];
  				validate_each_argument(each_value);
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;

  				if (each_value.length) {
  					if (each_1_else) {
  						each_1_else.d(1);
  						each_1_else = null;
  					}
  				} else if (!each_1_else) {
  					each_1_else = create_else_block(ctx);
  					each_1_else.c();
  					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
  				}
  			}
  		},
  		d: function destroy(detaching) {
  			destroy_each(each_blocks, detaching);
  			if (detaching) detach_dev(each_1_anchor);
  			if (each_1_else) each_1_else.d(detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1.name,
  		type: "if",
  		source: "(82:2) {#if currentVotes}",
  		ctx
  	});

  	return block;
  }

  // (91:4) {:else}
  function create_else_block(ctx) {
  	let span;

  	const block = {
  		c: function create() {
  			span = element("span");
  			span.textContent = "No votes yet, what are you waiting for?";
  			add_location(span, file$1, 90, 11, 1796);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_else_block.name,
  		type: "else",
  		source: "(91:4) {:else}",
  		ctx
  	});

  	return block;
  }

  // (85:8) {#if vote}
  function create_if_block_2(ctx) {
  	let img;
  	let img_src_value;

  	const block = {
  		c: function create() {
  			img = element("img");
  			if (img.src !== (img_src_value = `${CDN_BASE_URL}/${/*vote*/ ctx[10].piece_id || /*vote*/ ctx[10].id}.jpg`)) attr_dev(img, "src", img_src_value);
  			attr_dev(img, "alt", "Artjam entry vote thumbnail");
  			attr_dev(img, "class", "svelte-1ikdfju");
  			add_location(img, file$1, 85, 10, 1636);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, img, anchor);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*currentVotes*/ 2 && img.src !== (img_src_value = `${CDN_BASE_URL}/${/*vote*/ ctx[10].piece_id || /*vote*/ ctx[10].id}.jpg`)) {
  				attr_dev(img, "src", img_src_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(img);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_2.name,
  		type: "if",
  		source: "(85:8) {#if vote}",
  		ctx
  	});

  	return block;
  }

  // (83:4) {#each currentVotes as vote, index}
  function create_each_block(ctx) {
  	let div;
  	let t;
  	let mounted;
  	let dispose;
  	let if_block = /*vote*/ ctx[10] && create_if_block_2(ctx);

  	function click_handler(...args) {
  		return /*click_handler*/ ctx[5](/*index*/ ctx[12], ...args);
  	}

  	const block = {
  		c: function create() {
  			div = element("div");
  			if (if_block) if_block.c();
  			t = space();
  			attr_dev(div, "class", "vote-holder svelte-1ikdfju");
  			add_location(div, file$1, 83, 6, 1547);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			if (if_block) if_block.m(div, null);
  			append_dev(div, t);

  			if (!mounted) {
  				dispose = listen_dev(div, "click", click_handler, false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;

  			if (/*vote*/ ctx[10]) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block_2(ctx);
  					if_block.c();
  					if_block.m(div, t);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			if (if_block) if_block.d();
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block.name,
  		type: "each",
  		source: "(83:4) {#each currentVotes as vote, index}",
  		ctx
  	});

  	return block;
  }

  // (93:2) {#if hasChanged}
  function create_if_block(ctx) {
  	let floatingsubmitbutton;
  	let current;

  	floatingsubmitbutton = new FloatingSubmitButton({
  			props: { hasChanged: /*hasChanged*/ ctx[2] },
  			$$inline: true
  		});

  	floatingsubmitbutton.$on("submitVotes", function () {
  		if (is_function(/*handleSubmit*/ ctx[0])) /*handleSubmit*/ ctx[0].apply(this, arguments);
  	});

  	const block = {
  		c: function create() {
  			create_component(floatingsubmitbutton.$$.fragment);
  		},
  		m: function mount(target, anchor) {
  			mount_component(floatingsubmitbutton, target, anchor);
  			current = true;
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;
  			const floatingsubmitbutton_changes = {};
  			if (dirty & /*hasChanged*/ 4) floatingsubmitbutton_changes.hasChanged = /*hasChanged*/ ctx[2];
  			floatingsubmitbutton.$set(floatingsubmitbutton_changes);
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(floatingsubmitbutton.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(floatingsubmitbutton.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(floatingsubmitbutton, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block.name,
  		type: "if",
  		source: "(93:2) {#if hasChanged}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$1(ctx) {
  	let div;
  	let t;
  	let current;
  	let if_block0 = /*currentVotes*/ ctx[1] && create_if_block_1(ctx);
  	let if_block1 = /*hasChanged*/ ctx[2] && create_if_block(ctx);

  	const block = {
  		c: function create() {
  			div = element("div");
  			if (if_block0) if_block0.c();
  			t = space();
  			if (if_block1) if_block1.c();
  			attr_dev(div, "class", "vote-container svelte-1ikdfju");
  			add_location(div, file$1, 80, 0, 1451);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			if (if_block0) if_block0.m(div, null);
  			append_dev(div, t);
  			if (if_block1) if_block1.m(div, null);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (/*currentVotes*/ ctx[1]) {
  				if (if_block0) {
  					if_block0.p(ctx, dirty);
  				} else {
  					if_block0 = create_if_block_1(ctx);
  					if_block0.c();
  					if_block0.m(div, t);
  				}
  			} else if (if_block0) {
  				if_block0.d(1);
  				if_block0 = null;
  			}

  			if (/*hasChanged*/ ctx[2]) {
  				if (if_block1) {
  					if_block1.p(ctx, dirty);

  					if (dirty & /*hasChanged*/ 4) {
  						transition_in(if_block1, 1);
  					}
  				} else {
  					if_block1 = create_if_block(ctx);
  					if_block1.c();
  					transition_in(if_block1, 1);
  					if_block1.m(div, null);
  				}
  			} else if (if_block1) {
  				group_outros();

  				transition_out(if_block1, 1, 1, () => {
  					if_block1 = null;
  				});

  				check_outros();
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(if_block1);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(if_block1);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			if (if_block0) if_block0.d();
  			if (if_block1) if_block1.d();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$1.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const CDN_BASE_URL = "https://assets.artofkoko.com/artjam/5";

  function instance$1($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots("VoteManager", slots, []);
  	const INITIAL_VOTE = { user_id: null, piece_id: 0 };

  	let { handleSubmit = () => {
  		console.log("Not overriden");
  	} } = $$props;

  	let { user = { votes: [] } } = $$props;
  	let changeCount = 0;

  	const clearVote = index => {
  		const currentVotes = votes.filter((v, i) => i !== index);
  		$$invalidate(7, votes = currentVotes);
  	};

  	afterUpdate(() => {
  		$$invalidate(6, changeCount += 1);
  	});

  	const writable_props = ["handleSubmit", "user"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<VoteManager> was created with unknown prop '${key}'`);
  	});

  	const click_handler = index => clearVote(index);

  	$$self.$$set = $$props => {
  		if ("handleSubmit" in $$props) $$invalidate(0, handleSubmit = $$props.handleSubmit);
  		if ("user" in $$props) $$invalidate(4, user = $$props.user);
  	};

  	$$self.$capture_state = () => ({
  		afterUpdate,
  		beforeUpdate,
  		onMount,
  		FloatingSubmitButton,
  		CDN_BASE_URL,
  		INITIAL_VOTE,
  		handleSubmit,
  		user,
  		changeCount,
  		clearVote,
  		votes,
  		offset,
  		currentVotes,
  		hasChanged
  	});

  	$$self.$inject_state = $$props => {
  		if ("handleSubmit" in $$props) $$invalidate(0, handleSubmit = $$props.handleSubmit);
  		if ("user" in $$props) $$invalidate(4, user = $$props.user);
  		if ("changeCount" in $$props) $$invalidate(6, changeCount = $$props.changeCount);
  		if ("votes" in $$props) $$invalidate(7, votes = $$props.votes);
  		if ("offset" in $$props) $$invalidate(8, offset = $$props.offset);
  		if ("currentVotes" in $$props) $$invalidate(1, currentVotes = $$props.currentVotes);
  		if ("hasChanged" in $$props) $$invalidate(2, hasChanged = $$props.hasChanged);
  	};

  	let votes;
  	let offset;
  	let currentVotes;
  	let hasChanged;

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty & /*user*/ 16) {
  			 $$invalidate(7, votes = user.votes);
  		}

  		if ($$self.$$.dirty & /*votes*/ 128) {
  			 $$invalidate(8, offset = Array(5 - votes.length));
  		}

  		if ($$self.$$.dirty & /*votes, offset*/ 384) {
  			 $$invalidate(1, currentVotes = votes.concat(offset));
  		}

  		if ($$self.$$.dirty & /*changeCount*/ 64) {
  			 $$invalidate(2, hasChanged = changeCount > 0);
  		}
  	};

  	return [handleSubmit, currentVotes, hasChanged, clearVote, user, click_handler];
  }

  class VoteManager extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-1ikdfju-style")) add_css$1();
  		init(this, options, instance$1, create_fragment$1, safe_not_equal, { handleSubmit: 0, user: 4 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "VoteManager",
  			options,
  			id: create_fragment$1.name
  		});
  	}

  	get handleSubmit() {
  		throw new Error("<VoteManager>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set handleSubmit(value) {
  		throw new Error("<VoteManager>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	get user() {
  		throw new Error("<VoteManager>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set user(value) {
  		throw new Error("<VoteManager>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* components/GalleryLightbox.svelte generated by Svelte v3.29.0 */
  const file$2 = "components/GalleryLightbox.svelte";

  function add_css$2() {
  	var style = element("style");
  	style.id = "svelte-15asjsn-style";
  	style.textContent = ".gallery-lightbox-overlay.svelte-15asjsn{position:fixed;top:0;left:0;width:100vw;height:100vw;z-index:10001;background:rgba(0, 0, 0, 0.75);opacity:0;visibility:hidden;transition:all 0.75s ease-in-out;display:flex;justify-content:center;align-items:center}.gallery-lightbox-overlay.is-open.svelte-15asjsn{opacity:1;visibility:visible}.gallery-lightbox.svelte-15asjsn{width:50vw;margin:0 auto;display:flex;position:absolute;z-index:10001;top:25%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FsbGVyeUxpZ2h0Ym94LnN2ZWx0ZSIsInNvdXJjZXMiOlsiR2FsbGVyeUxpZ2h0Ym94LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuXG4gIGV4cG9ydCBsZXQgYWN0aXZlSXRlbSA9IG51bGw7XG5cbiAgJDogbGlnaHRCb3hPcGVuID0gISFhY3RpdmVJdGVtO1xuXG4gIGNvbnN0IHRvZ2dsZU92ZXJsYXkgPSAoKSA9PiAoYWN0aXZlSXRlbSA9IG51bGwpO1xuICBjb25zdCBjbG9zZU92ZXJsYXlCeUtleSA9IChldmVudCkgPT4ge1xuICAgIGlmIChsaWdodEJveE9wZW4gJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInBvc3Rjc3NcIj5cbiAgLmdhbGxlcnktbGlnaHRib3gtb3ZlcmxheSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZ3O1xuICAgIHotaW5kZXg6IDEwMDAxO1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC43NSk7XG4gICAgb3BhY2l0eTogMDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNzVzIGVhc2UtaW4tb3V0O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gIC5nYWxsZXJ5LWxpZ2h0Ym94LW92ZXJsYXkuaXMtb3BlbiB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB9XG5cbiAgLmdhbGxlcnktbGlnaHRib3gge1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDEwMDAxO1xuICAgIHRvcDogMjUlO1xuICB9XG48L3N0eWxlPlxuXG48c3ZlbHRlOndpbmRvdyBvbjprZXl1cD17Y2xvc2VPdmVybGF5QnlLZXl9IC8+XG48ZGl2IGNsYXNzPVwiZ2FsbGVyeS1saWdodGJveC1vdmVybGF5XCIgY2xhc3M6aXMtb3Blbj17bGlnaHRCb3hPcGVufSAvPlxuPGRpdiBjbGFzcz1cImdhbGxlcnktbGlnaHRib3hcIj5cbiAgPHBpY3R1cmU+XG4gICAgPGltZyBzcmM9e2FjdGl2ZUl0ZW0gJiYgYWN0aXZlSXRlbS5zcmN9IGFsdD1cIlRleHQgZm9yIHRoZSBhbHQgdGFnXCIgLz5cbiAgPC9waWN0dXJlPlxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JFLHlCQUF5QixlQUFDLENBQUMsQUFDekIsUUFBUSxDQUFFLEtBQUssQ0FDZixHQUFHLENBQUUsQ0FBQyxDQUNOLElBQUksQ0FBRSxDQUFDLENBQ1AsS0FBSyxDQUFFLEtBQUssQ0FDWixNQUFNLENBQUUsS0FBSyxDQUNiLE9BQU8sQ0FBRSxLQUFLLENBQ2QsVUFBVSxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQy9CLE9BQU8sQ0FBRSxDQUFDLENBQ1YsVUFBVSxDQUFFLE1BQU0sQ0FDbEIsVUFBVSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUNqQyxPQUFPLENBQUUsSUFBSSxDQUNiLGVBQWUsQ0FBRSxNQUFNLENBQ3ZCLFdBQVcsQ0FBRSxNQUFNLEFBQ3JCLENBQUMsQUFFRCx5QkFBeUIsUUFBUSxlQUFDLENBQUMsQUFDakMsT0FBTyxDQUFFLENBQUMsQ0FDVixVQUFVLENBQUUsT0FBTyxBQUNyQixDQUFDLEFBRUQsaUJBQWlCLGVBQUMsQ0FBQyxBQUNqQixLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUNkLE9BQU8sQ0FBRSxJQUFJLENBQ2IsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsT0FBTyxDQUFFLEtBQUssQ0FDZCxHQUFHLENBQUUsR0FBRyxBQUNWLENBQUMifQ== */";
  	append_dev(document.head, style);
  }

  function create_fragment$2(ctx) {
  	let div0;
  	let t;
  	let div1;
  	let picture;
  	let img;
  	let img_src_value;
  	let mounted;
  	let dispose;

  	const block = {
  		c: function create() {
  			div0 = element("div");
  			t = space();
  			div1 = element("div");
  			picture = element("picture");
  			img = element("img");
  			attr_dev(div0, "class", "gallery-lightbox-overlay svelte-15asjsn");
  			toggle_class(div0, "is-open", /*lightBoxOpen*/ ctx[1]);
  			add_location(div0, file$2, 50, 0, 951);
  			if (img.src !== (img_src_value = /*activeItem*/ ctx[0] && /*activeItem*/ ctx[0].src)) attr_dev(img, "src", img_src_value);
  			attr_dev(img, "alt", "Text for the alt tag");
  			add_location(img, file$2, 53, 4, 1068);
  			add_location(picture, file$2, 52, 2, 1054);
  			attr_dev(div1, "class", "gallery-lightbox svelte-15asjsn");
  			add_location(div1, file$2, 51, 0, 1021);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div0, anchor);
  			insert_dev(target, t, anchor);
  			insert_dev(target, div1, anchor);
  			append_dev(div1, picture);
  			append_dev(picture, img);

  			if (!mounted) {
  				dispose = listen_dev(window, "keyup", /*closeOverlayByKey*/ ctx[2], false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(ctx, [dirty]) {
  			if (dirty & /*lightBoxOpen*/ 2) {
  				toggle_class(div0, "is-open", /*lightBoxOpen*/ ctx[1]);
  			}

  			if (dirty & /*activeItem*/ 1 && img.src !== (img_src_value = /*activeItem*/ ctx[0] && /*activeItem*/ ctx[0].src)) {
  				attr_dev(img, "src", img_src_value);
  			}
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div0);
  			if (detaching) detach_dev(t);
  			if (detaching) detach_dev(div1);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$2.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  function instance$2($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots("GalleryLightbox", slots, []);
  	let { activeItem = null } = $$props;
  	const toggleOverlay = () => $$invalidate(0, activeItem = null);

  	const closeOverlayByKey = event => {
  		if (lightBoxOpen && event.keyCode === 13) {
  			$$invalidate(0, activeItem = null);
  		}

  		return false;
  	};

  	const writable_props = ["activeItem"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GalleryLightbox> was created with unknown prop '${key}'`);
  	});

  	$$self.$$set = $$props => {
  		if ("activeItem" in $$props) $$invalidate(0, activeItem = $$props.activeItem);
  	};

  	$$self.$capture_state = () => ({
  		onMount,
  		activeItem,
  		toggleOverlay,
  		closeOverlayByKey,
  		lightBoxOpen
  	});

  	$$self.$inject_state = $$props => {
  		if ("activeItem" in $$props) $$invalidate(0, activeItem = $$props.activeItem);
  		if ("lightBoxOpen" in $$props) $$invalidate(1, lightBoxOpen = $$props.lightBoxOpen);
  	};

  	let lightBoxOpen;

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty & /*activeItem*/ 1) {
  			 $$invalidate(1, lightBoxOpen = !!activeItem);
  		}
  	};

  	return [activeItem, lightBoxOpen, closeOverlayByKey];
  }

  class GalleryLightbox extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-15asjsn-style")) add_css$2();
  		init(this, options, instance$2, create_fragment$2, safe_not_equal, { activeItem: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "GalleryLightbox",
  			options,
  			id: create_fragment$2.name
  		});
  	}

  	get activeItem() {
  		throw new Error("<GalleryLightbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set activeItem(value) {
  		throw new Error("<GalleryLightbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* components/ContestGallery.svelte generated by Svelte v3.29.0 */
  const file$3 = "components/ContestGallery.svelte";

  function add_css$3() {
  	var style = element("style");
  	style.id = "svelte-oyxgda-style";
  	style.textContent = ".artjam-gallery-container.svelte-oyxgda{display:grid;grid-template-columns:49vw 49vw;margin:0 auto;width:100%;position:relative;z-index:9998}.artjam-entry.svelte-oyxgda{display:flex;width:100%;height:20vh;max-width:49vw;background-color:lightslategray;color:white;border:1px solid transparent;border-radius:0.5rem;padding:0.5rem;margin:1rem auto;position:relative}.artjam-vote.svelte-oyxgda{position:absolute;bottom:1rem;right:1rem;width:2rem;height:2rem;background:rgba(255, 255, 255, 0.75);border:none}@media all and (min-width: 960px){.artjam-gallery-container.svelte-oyxgda{grid-template-columns:repeat(4, 23vw);grid-column-gap:1vw;max-width:960px}.artjam-entry.svelte-oyxgda{max-width:23vw}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVzdEdhbGxlcnkuc3ZlbHRlIiwic291cmNlcyI6WyJDb250ZXN0R2FsbGVyeS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IEdhbGxlcnlMaWdodGJveCBmcm9tIFwiLi9HYWxsZXJ5TGlnaHRib3guc3ZlbHRlXCI7XG5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBjb25zdCBDRE5fQkFTRV9VUkwgPSBcImh0dHBzOi8vYXNzZXRzLmFydG9ma29rby5jb20vYXJ0amFtLzVcIjtcbiAgZXhwb3J0IGxldCBjb250ZXN0ID0ge1xuICAgIGVudHJpZXM6IFtdLFxuICB9O1xuXG4gIGxldCBhY3RpdmVJdGVtID0gbnVsbDtcblxuICAkOiBjb250ZXN0ID0gJCRwcm9wcy5jb250ZXN0O1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG5cbiAgY29uc3QgdG9nZ2xlVm90ZSA9IChlbnRyeSkgPT4gZGlzcGF0Y2goXCJ0b2dnbGV2b3RlXCIsIHsgZW50cnkgfSk7XG4gIGNvbnN0IGFjdGl2YXRlSXRlbSA9IChlbnRyeSkgPT4ge1xuICAgIGVudHJ5LnNyYyA9IGAke0NETl9CQVNFX1VSTH0vJHtlbnRyeS5pZH0uanBnYDtcbiAgICBhY3RpdmVJdGVtID0gZW50cnk7XG4gIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJwb3N0Y3NzXCI+XG4gIC5hcnRqYW0tZ2FsbGVyeS1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA0OXZ3IDQ5dnc7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDk5OTg7XG4gIH1cblxuICAuYXJ0amFtLWVudHJ5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMjB2aDtcbiAgICBtYXgtd2lkdGg6IDQ5dnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyYXk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgbWFyZ2luOiAxcmVtIGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLmFydGphbS12b3RlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAxcmVtO1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIHdpZHRoOiAycmVtO1xuICAgIGhlaWdodDogMnJlbTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgfVxuXG4gIEBtZWRpYSBhbGwgYW5kIChtaW4td2lkdGg6IDk2MHB4KSB7XG4gICAgLmFydGphbS1nYWxsZXJ5LWNvbnRhaW5lciB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAyM3Z3KTtcbiAgICAgIGdyaWQtY29sdW1uLWdhcDogMXZ3O1xuICAgICAgbWF4LXdpZHRoOiA5NjBweDtcbiAgICB9XG5cbiAgICAuYXJ0amFtLWVudHJ5IHtcbiAgICAgIG1heC13aWR0aDogMjN2dztcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJhcnRqYW0tZ2FsbGVyeS1jb250YWluZXJcIj5cbiAgPEdhbGxlcnlMaWdodGJveCB7YWN0aXZlSXRlbX0gLz5cbiAgeyNpZiBjb250ZXN0LmVudHJpZXN9XG4gICAgeyNlYWNoIGNvbnRlc3QuZW50cmllcyBhcyBlbnRyeX1cbiAgICAgIDxidXR0b24gY2xhc3M9XCJhcnRqYW0tZW50cnlcIiBvbjpjbGljaz17KCkgPT4gYWN0aXZhdGVJdGVtKGVudHJ5KX0+XG4gICAgICAgIHtlbnRyeS5uYW1lfVxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzcz1cImFydGphbS12b3RlXCJcbiAgICAgICAgICBvbjpjbGlja3xzdG9wUHJvcGFnYXRpb249eygpID0+IHRvZ2dsZVZvdGUoZW50cnkpfT5Wb3RlPC9idXR0b24+XG4gICAgICA8L2J1dHRvbj5cbiAgICB7L2VhY2h9XG4gIHsvaWZ9XG48L2Rpdj5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QkUseUJBQXlCLGNBQUMsQ0FBQyxBQUN6QixPQUFPLENBQUUsSUFBSSxDQUNiLHFCQUFxQixDQUFFLElBQUksQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUNkLEtBQUssQ0FBRSxJQUFJLENBQ1gsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsT0FBTyxDQUFFLElBQUksQUFDZixDQUFDLEFBRUQsYUFBYSxjQUFDLENBQUMsQUFDYixPQUFPLENBQUUsSUFBSSxDQUNiLEtBQUssQ0FBRSxJQUFJLENBQ1gsTUFBTSxDQUFFLElBQUksQ0FDWixTQUFTLENBQUUsSUFBSSxDQUNmLGdCQUFnQixDQUFFLGNBQWMsQ0FDaEMsS0FBSyxDQUFFLEtBQUssQ0FDWixNQUFNLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQzdCLGFBQWEsQ0FBRSxNQUFNLENBQ3JCLE9BQU8sQ0FBRSxNQUFNLENBQ2YsTUFBTSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQ2pCLFFBQVEsQ0FBRSxRQUFRLEFBQ3BCLENBQUMsQUFFRCxZQUFZLGNBQUMsQ0FBQyxBQUNaLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLE1BQU0sQ0FBRSxJQUFJLENBQ1osS0FBSyxDQUFFLElBQUksQ0FDWCxLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBQ1osVUFBVSxDQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQ3JDLE1BQU0sQ0FBRSxJQUFJLEFBQ2QsQ0FBQyxBQUVELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDakMseUJBQXlCLGNBQUMsQ0FBQyxBQUN6QixxQkFBcUIsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUN0QyxlQUFlLENBQUUsR0FBRyxDQUNwQixTQUFTLENBQUUsS0FBSyxBQUNsQixDQUFDLEFBRUQsYUFBYSxjQUFDLENBQUMsQUFDYixTQUFTLENBQUUsSUFBSSxBQUNqQixDQUFDLEFBQ0gsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function get_each_context$1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[8] = list[i];
  	return child_ctx;
  }

  // (72:2) {#if contest.entries}
  function create_if_block$1(ctx) {
  	let each_1_anchor;
  	let each_value = /*contest*/ ctx[0].entries;
  	validate_each_argument(each_value);
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  	}

  	const block = {
  		c: function create() {
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			each_1_anchor = empty();
  		},
  		m: function mount(target, anchor) {
  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(target, anchor);
  			}

  			insert_dev(target, each_1_anchor, anchor);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*activateItem, contest, toggleVote*/ 13) {
  				each_value = /*contest*/ ctx[0].entries;
  				validate_each_argument(each_value);
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context$1(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block$1(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
  					}
  				}

  				for (; i < each_blocks.length; i += 1) {
  					each_blocks[i].d(1);
  				}

  				each_blocks.length = each_value.length;
  			}
  		},
  		d: function destroy(detaching) {
  			destroy_each(each_blocks, detaching);
  			if (detaching) detach_dev(each_1_anchor);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block$1.name,
  		type: "if",
  		source: "(72:2) {#if contest.entries}",
  		ctx
  	});

  	return block;
  }

  // (73:4) {#each contest.entries as entry}
  function create_each_block$1(ctx) {
  	let button1;
  	let t0_value = /*entry*/ ctx[8].name + "";
  	let t0;
  	let t1;
  	let button0;
  	let t3;
  	let mounted;
  	let dispose;

  	function click_handler(...args) {
  		return /*click_handler*/ ctx[4](/*entry*/ ctx[8], ...args);
  	}

  	function click_handler_1(...args) {
  		return /*click_handler_1*/ ctx[5](/*entry*/ ctx[8], ...args);
  	}

  	const block = {
  		c: function create() {
  			button1 = element("button");
  			t0 = text(t0_value);
  			t1 = space();
  			button0 = element("button");
  			button0.textContent = "Vote";
  			t3 = space();
  			attr_dev(button0, "class", "artjam-vote svelte-oyxgda");
  			add_location(button0, file$3, 76, 8, 1660);
  			attr_dev(button1, "class", "artjam-entry svelte-oyxgda");
  			add_location(button1, file$3, 73, 6, 1563);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, button1, anchor);
  			append_dev(button1, t0);
  			append_dev(button1, t1);
  			append_dev(button1, button0);
  			append_dev(button1, t3);

  			if (!mounted) {
  				dispose = [
  					listen_dev(button0, "click", stop_propagation(click_handler), false, false, true),
  					listen_dev(button1, "click", click_handler_1, false, false, false)
  				];

  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;
  			if (dirty & /*contest*/ 1 && t0_value !== (t0_value = /*entry*/ ctx[8].name + "")) set_data_dev(t0, t0_value);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(button1);
  			mounted = false;
  			run_all(dispose);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block$1.name,
  		type: "each",
  		source: "(73:4) {#each contest.entries as entry}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$3(ctx) {
  	let div;
  	let gallerylightbox;
  	let t;
  	let current;

  	gallerylightbox = new GalleryLightbox({
  			props: { activeItem: /*activeItem*/ ctx[1] },
  			$$inline: true
  		});

  	let if_block = /*contest*/ ctx[0].entries && create_if_block$1(ctx);

  	const block = {
  		c: function create() {
  			div = element("div");
  			create_component(gallerylightbox.$$.fragment);
  			t = space();
  			if (if_block) if_block.c();
  			attr_dev(div, "class", "artjam-gallery-container svelte-oyxgda");
  			add_location(div, file$3, 69, 0, 1422);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			mount_component(gallerylightbox, div, null);
  			append_dev(div, t);
  			if (if_block) if_block.m(div, null);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			const gallerylightbox_changes = {};
  			if (dirty & /*activeItem*/ 2) gallerylightbox_changes.activeItem = /*activeItem*/ ctx[1];
  			gallerylightbox.$set(gallerylightbox_changes);

  			if (/*contest*/ ctx[0].entries) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block$1(ctx);
  					if_block.c();
  					if_block.m(div, null);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(gallerylightbox.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(gallerylightbox.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div);
  			destroy_component(gallerylightbox);
  			if (if_block) if_block.d();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$3.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const CDN_BASE_URL$1 = "https://assets.artofkoko.com/artjam/5";

  function instance$3($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots("ContestGallery", slots, []);
  	let { contest = { entries: [] } } = $$props;
  	let activeItem = null;
  	const dispatch = createEventDispatcher();
  	const toggleVote = entry => dispatch("togglevote", { entry });

  	const activateItem = entry => {
  		entry.src = `${CDN_BASE_URL$1}/${entry.id}.jpg`;
  		$$invalidate(1, activeItem = entry);
  	};

  	const click_handler = entry => toggleVote(entry);
  	const click_handler_1 = entry => activateItem(entry);

  	$$self.$$set = $$new_props => {
  		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  		if ("contest" in $$new_props) $$invalidate(0, contest = $$new_props.contest);
  	};

  	$$self.$capture_state = () => ({
  		GalleryLightbox,
  		createEventDispatcher,
  		CDN_BASE_URL: CDN_BASE_URL$1,
  		contest,
  		activeItem,
  		dispatch,
  		toggleVote,
  		activateItem
  	});

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
  		if ("contest" in $$props) $$invalidate(0, contest = $$new_props.contest);
  		if ("activeItem" in $$props) $$invalidate(1, activeItem = $$new_props.activeItem);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		 $$invalidate(0, contest = $$props.contest);
  	};

  	$$props = exclude_internal_props($$props);
  	return [contest, activeItem, toggleVote, activateItem, click_handler, click_handler_1];
  }

  class ContestGallery extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-oyxgda-style")) add_css$3();
  		init(this, options, instance$3, create_fragment$3, safe_not_equal, { contest: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "ContestGallery",
  			options,
  			id: create_fragment$3.name
  		});
  	}

  	get contest() {
  		throw new Error("<ContestGallery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set contest(value) {
  		throw new Error("<ContestGallery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* App.svelte generated by Svelte v3.29.0 */

  const { console: console_1$1 } = globals;

  function create_fragment$4(ctx) {
  	let votemanager;
  	let t;
  	let contestgallery;
  	let current;

  	votemanager = new VoteManager({
  			props: {
  				user: /*user*/ ctx[0],
  				handleSubmit: /*handleSubmit*/ ctx[3]
  			},
  			$$inline: true
  		});

  	votemanager.$on("togglevote", /*handleToggle*/ ctx[2]);

  	contestgallery = new ContestGallery({
  			props: { contest: /*contest*/ ctx[1] },
  			$$inline: true
  		});

  	contestgallery.$on("togglevote", /*handleToggle*/ ctx[2]);

  	const block = {
  		c: function create() {
  			create_component(votemanager.$$.fragment);
  			t = space();
  			create_component(contestgallery.$$.fragment);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			mount_component(votemanager, target, anchor);
  			insert_dev(target, t, anchor);
  			mount_component(contestgallery, target, anchor);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			const votemanager_changes = {};
  			if (dirty & /*user*/ 1) votemanager_changes.user = /*user*/ ctx[0];
  			votemanager.$set(votemanager_changes);
  			const contestgallery_changes = {};
  			if (dirty & /*contest*/ 2) contestgallery_changes.contest = /*contest*/ ctx[1];
  			contestgallery.$set(contestgallery_changes);
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(votemanager.$$.fragment, local);
  			transition_in(contestgallery.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(votemanager.$$.fragment, local);
  			transition_out(contestgallery.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(votemanager, detaching);
  			if (detaching) detach_dev(t);
  			destroy_component(contestgallery, detaching);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_fragment$4.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const API_URL = "https://artofkoko.com";
  const ARTJAM_ID = 5;
  const MAX_VOTES = 5;

  function instance$4($$self, $$props, $$invalidate) {
  	let { $$slots: slots = {}, $$scope } = $$props;
  	validate_slots("App", slots, []);
  	let count = 0;
  	let { user = { votes: Array(5) } } = $$props;
  	const getContest = async id => await fetch(`${API_URL}/api/artjam/${id}`);

  	const submitVotes = async votes => fetch(`${API_URL}/api/votes`, {
  		method: "POST",
  		body: JSON.stringify(votes),
  		headers: { "Content-Type": "application/json" }
  	});

  	let pictureVoter = {};
  	let contest = {};

  	const handleToggle = event => {
  		const { detail: { entry } } = event;

  		if (user.votes.length === 5) {
  			console.log("Vote cap reached");
  			return false;
  		}

  		const newValue = !pictureVoter[entry.id];
  		pictureVoter[entry.id] = newValue;

  		if (newValue) {
  			$$invalidate(0, user.votes[user.votes.length] = entry, user);
  		}

  		console.log({ pictureVoter });
  		return newValue;
  	};

  	const handleSubmit = event => {
  		console.log("Handle submit called");
  	};

  	onMount(() => {
  		getContest(ARTJAM_ID).then(res => res.json()).then(data => $$invalidate(1, contest = data));
  	});

  	const writable_props = ["user"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<App> was created with unknown prop '${key}'`);
  	});

  	$$self.$$set = $$props => {
  		if ("user" in $$props) $$invalidate(0, user = $$props.user);
  	};

  	$$self.$capture_state = () => ({
  		onMount,
  		VoteManager,
  		ContestGallery,
  		API_URL,
  		ARTJAM_ID,
  		MAX_VOTES,
  		count,
  		user,
  		getContest,
  		submitVotes,
  		pictureVoter,
  		contest,
  		handleToggle,
  		handleSubmit,
  		remaining
  	});

  	$$self.$inject_state = $$props => {
  		if ("count" in $$props) count = $$props.count;
  		if ("user" in $$props) $$invalidate(0, user = $$props.user);
  		if ("pictureVoter" in $$props) pictureVoter = $$props.pictureVoter;
  		if ("contest" in $$props) $$invalidate(1, contest = $$props.contest);
  		if ("remaining" in $$props) remaining = $$props.remaining;
  	};

  	let remaining;

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		if ($$self.$$.dirty & /*user*/ 1) {
  			 remaining = MAX_VOTES - user.votes.length;
  		}
  	};

  	return [user, contest, handleToggle, handleSubmit];
  }

  class App extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init(this, options, instance$4, create_fragment$4, safe_not_equal, { user: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "App",
  			options,
  			id: create_fragment$4.name
  		});
  	}

  	get user() {
  		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set user(value) {
  		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  (function (window) {
    var isJamPage = window.location.pathname === '/jam';
    var urlParams = new URLSearchParams(window.location.search);
    if (!isJamPage) return;
    var API_URL = 'https://artofkoko.com';
    var YUI_PREFIX = 'yui_';
    var yui_gallery_id = '';
    var settings = {
      user: {
        votes: []
      }
    };
    var buttonTemplate = "<button class=\"artjam-vote-button\" type=\"button\">Vote</button>";
    var svelteRoot = "<div id=\"jam-app\"></div>";
    var toastTemplate = "\n\t\t<div class=\"toast\" id=\"kokoToast\">\n\t\t\t<section class=\"toast-content\">\n\t\t\t\t<span id=\"toastMessage\">{{message}}</span>\n\t\t\t</section>\n\t\t</div>\n\t";
    var $toast = null;
    var $toastMessage = null;
    var toast = {
      el: $toast,
      message: $toastMessage,
      init: function init() {
        $('body').append(toastTemplate);
        $toast = $('#kokoToast');
        $toastMessage = $('#toastMessage');
        this.el = $toast;
        this.message = $toastMessage;
      },
      hide: function hide() {
        this.el.removeClass('js-toast-show');
        this.message.text('');
      },
      show: function show() {
        this.el.addClass('js-toast-show');
      },
      success: function success(message) {
        var _this = this;

        this.message.text(message);
        this.show();
        setTimeout(function () {
          return _this.hide();
        }, 1750);
      }
    };
    /**
     * Main
     */
    // const toggleVote = id => {
    // 	const $voteSlide = $(`#${YUI_PREFIX}${yui_gallery_id}${id}`);
    // 	let styles = {
    // 		background: 'white',
    // 		color: '#e86d6d'
    // 	}
    // 	const voteIndex = settings.votes.indexOf(id);
    // 	if (voteIndex > -1) {
    // 		//remove vote
    // 		settings.votes.splice(voteIndex, 1);
    // 		styles = {
    // 			background: 'transparent',
    // 			color: '#fff'
    // 		}
    // 	} else {
    // 		if (settings.votes.length < 5) {
    // 		} else {
    // 			return alert('You can only vote for five pieces.');
    // 		}
    // 	}
    // $voteSlide.find('.artjam-vote-button').toggleClass('is-selected').css(styles)
    // };

    var elementIdToVoteId = function elementIdToVoteId(id) {
      return id.split('_').pop();
    };

    var fetchVotes = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(twitchId) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('Fetching votes');
                _context.next = 3;
                return fetch("".concat(API_URL, "/api/user/").concat(twitchId, "/votes"), {
                  method: 'GET'
                });

              case 3:
                response = _context.sent;
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
    /**
     * Event Listeners
     */


    $(document).on('click', '.artjam-vote-button', function (e) {
      var $slide = $(this).parent();
      var voteId = elementIdToVoteId($slide.attr('id'));
      toggleVote(voteId);
    }); // $(document).on('click', '#submitvotes-button', e => {
    // 	e.preventDefault();
    // 	submitVotes();
    // });

    $(document).on('mouseenter', '.image-slide-anchor', function (e) {
      $(e.currentTarget).css({
        'z-index': 10
      });
    }).on('mouseleave', '.image-slide-anchor', function (e) {
      return $(e.currentTarget).css({
        'z-index': 'inherit'
      });
    });
    $(document).on('ready', function () {
      toast.init();
      $('body').append(svelteRoot);
      var app = new App({
        target: document.getElementById('jam-app'),
        props: {
          user: settings.user
        }
      });
      var $slides = Array.from(document.querySelectorAll('.slide'));
      yui_gallery_id = $slides[0].id.split('_');
      yui_gallery_id = yui_gallery_id.slice(1, yui_gallery_id.length - 1).join('_') + '_';
      $('.image-slide-anchor').append(buttonTemplate);

      if (urlParams.has('success') && urlParams.has('twitch_id')) {
        console.log('saving cookie because of success & twitch_id params');
        var twitchId = urlParams.get('twitch_id');
        settings.user.twitchId = urlParams.get('twitch_id');
        var twitchIdCookie = js_cookie.set('userTwitchId', settings.user.twitchId, {
          expires: 14,
          secure: 'none'
        });
      }

      var retrieveStoredSettings = window.localStorage.getItem('artJamInfo');

      if (typeof retrieveStoredSettings === 'string') {
        var storedSettings = JSON.parse(retrieveVotesFromStorage);
        settings = Object.assign(settings, storedSettings);
        return settings;
      }

      var twitchIdFromCookie = js_cookie.get('userTwitchId');

      if (typeof twitchIdFromCookie === 'string') {
        fetchVotes(twitchIdFromCookie).then(function (res) {
          return res.json();
        }).then(function (_ref3) {
          var user = _ref3.user;

          if (user) {
            var _settings;

            var votes = user.votes,
                twitch_id = user.twitch_id,
                id = user.id,
                name = user.name;
            settings.user = user;
            settings.votes = settings.user.votes.map(function (v) {
              return v.piece_id;
            });
            (_settings = settings) === null || _settings === void 0 ? void 0 : _settings.votes.forEach(function (vote) {
              $("#".concat(YUI_PREFIX).concat(yui_gallery_id).concat(vote)).find('.artjam-vote-button').toggleClass('is-selected');
            });
            app.$set({
              user: settings.user
            });
          }
        });
      }
    });
  })(window);

}());
//# sourceMappingURL=artjam.js.map
