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

  let current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error(`Function called outside component initialization`);
    return current_component;
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
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

  const outroing = new Set();
  let outros;

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
      version: '3.24.1'
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

  /* components/FloatingSubmitButton.svelte generated by Svelte v3.24.1 */
  const file = "components/FloatingSubmitButton.svelte";

  function add_css() {
  	var style = element("style");
  	style.id = "svelte-x28trx-style";
  	style.textContent = "#vote-submission.svelte-x28trx{position:fixed;left:3.7rem;bottom:0.75rem;display:flex;justify-content:center;align-items:center}#submitvotes-button.svelte-x28trx{background:rgba(0, 0, 0, 0.6);appearance:none;border:none;padding:0.75rem;color:#fff;border-radius:0.25rem;font-size:20px;opacity:0;visibility:hidden;transition:all 0.75s ease-in-out}#submitvotes-button.is-shown.svelte-x28trx{opacity:1;visibility:visible}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvYXRpbmdTdWJtaXRCdXR0b24uc3ZlbHRlIiwic291cmNlcyI6WyJGbG9hdGluZ1N1Ym1pdEJ1dHRvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBjb25zdCBNQVhfVk9URVNfQUxMT1dFRCA9IDU7XG4gIGV4cG9ydCBsZXQgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG5cbiAgZXhwb3J0IGNvbnN0IHZvdGVzID0gQXJyYXkoNSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKHZvdGVzVG9TdWJtaXQpID0+XG4gICAgZGlzcGF0Y2goXCJzdWJtaXRWb3Rlc1wiLCB7XG4gICAgICB2b3Rlczogdm90ZXNUb1N1Ym1pdCxcbiAgICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInBvc3Rjc3NcIj5cbiAgI3ZvdGUtc3VibWlzc2lvbiB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGxlZnQ6IDMuN3JlbTtcbiAgICBib3R0b206IDAuNzVyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI3N1Ym1pdHZvdGVzLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHBhZGRpbmc6IDAuNzVyZW07XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgb3BhY2l0eTogMDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNzVzIGVhc2UtaW4tb3V0O1xuICB9XG5cbiAgI3N1Ym1pdHZvdGVzLWJ1dHRvbi5pcy1zaG93biB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICB9XG48L3N0eWxlPlxuXG48Zm9ybSBpZD1cInZvdGUtc3VibWlzc2lvblwiIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD17aGFuZGxlU3VibWl0fT5cbiAgPGJ1dHRvbiBpZD1cInN1Ym1pdHZvdGVzLWJ1dHRvblwiIGNsYXNzOmlzLXNob3duPXtoYXNDaGFuZ2VkfSB0eXBlPVwic3VibWl0XCI+XG4gICAgU3VibWl0IFZvdGVzXG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdCRSxnQkFBZ0IsY0FBQyxDQUFDLEFBQ2hCLFFBQVEsQ0FBRSxLQUFLLENBQ2YsSUFBSSxDQUFFLE1BQU0sQ0FDWixNQUFNLENBQUUsT0FBTyxDQUNmLE9BQU8sQ0FBRSxJQUFJLENBQ2IsZUFBZSxDQUFFLE1BQU0sQ0FDdkIsV0FBVyxDQUFFLE1BQU0sQUFDckIsQ0FBQyxBQUVELG1CQUFtQixjQUFDLENBQUMsQUFDbkIsVUFBVSxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQzlCLFVBQVUsQ0FBRSxJQUFJLENBQ2hCLE1BQU0sQ0FBRSxJQUFJLENBQ1osT0FBTyxDQUFFLE9BQU8sQ0FDaEIsS0FBSyxDQUFFLElBQUksQ0FDWCxhQUFhLENBQUUsT0FBTyxDQUN0QixTQUFTLENBQUUsSUFBSSxDQUNmLE9BQU8sQ0FBRSxDQUFDLENBQ1YsVUFBVSxDQUFFLE1BQU0sQ0FDbEIsVUFBVSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxBQUNuQyxDQUFDLEFBRUQsbUJBQW1CLFNBQVMsY0FBQyxDQUFDLEFBQzVCLE9BQU8sQ0FBRSxDQUFDLENBQ1YsVUFBVSxDQUFFLE9BQU8sQUFDckIsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function create_fragment(ctx) {
  	let form;
  	let button;
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
  			add_location(button, file, 45, 2, 934);
  			attr_dev(form, "id", "vote-submission");
  			attr_dev(form, "class", "svelte-x28trx");
  			add_location(form, file, 44, 0, 864);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, form, anchor);
  			append_dev(form, button);

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
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(form);
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
  	let { hasChanged = false } = $$props;
  	const dispatch = createEventDispatcher();
  	const votes = Array(5);
  	const handleSubmit = votesToSubmit => dispatch("submitVotes", { votes: votesToSubmit });
  	const writable_props = ["hasChanged"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FloatingSubmitButton> was created with unknown prop '${key}'`);
  	});

  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("FloatingSubmitButton", $$slots, []);

  	$$self.$$set = $$props => {
  		if ("hasChanged" in $$props) $$invalidate(0, hasChanged = $$props.hasChanged);
  	};

  	$$self.$capture_state = () => ({
  		createEventDispatcher,
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

  /* components/VoteManager.svelte generated by Svelte v3.24.1 */

  const { console: console_1 } = globals;
  const file$1 = "components/VoteManager.svelte";

  function add_css$1() {
  	var style = element("style");
  	style.id = "svelte-44m7i4-style";
  	style.textContent = ".vote-container.svelte-44m7i4.svelte-44m7i4{position:fixed;bottom:8px;left:8px;display:flex;flex-direction:row}.vote-holder.svelte-44m7i4.svelte-44m7i4{width:64px;height:64px;border:2px solid #fff;border-radius:6px;margin:0 8px}@media screen and (min-width: 768px){.vote-container.svelte-44m7i4.svelte-44m7i4{flex-direction:column-reverse}.vote-holder.svelte-44m7i4.svelte-44m7i4{margin:0.5rem auto;position:relative;overflow:hidden}.vote-holder.svelte-44m7i4 img.svelte-44m7i4{position:absolute;top:0;left:0;width:100%;height:auto;max-height:100%}img.svelte-44m7i4.svelte-44m7i4:hover{cursor:pointer}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm90ZU1hbmFnZXIuc3ZlbHRlIiwic291cmNlcyI6WyJWb3RlTWFuYWdlci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IEZsb2F0aW5nU3VibWl0QnV0dG9uIGZyb20gXCIuL0Zsb2F0aW5nU3VibWl0QnV0dG9uLnN2ZWx0ZVwiO1xuICBjb25zdCBDRE5fQkFTRV9VUkwgPSBcImh0dHBzOi8vYXNzZXRzLmFydG9ma29rby5jb20vYXJ0amFtLzVcIjtcblxuICBjb25zdCBJTklUSUFMX1ZPVEUgPSB7XG4gICAgdXNlcl9pZDogbnVsbCxcbiAgICBwaWVjZV9pZDogMCxcbiAgfTtcblxuICBleHBvcnQgbGV0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIk5vdCBvdmVycmlkZW5cIik7XG4gIH07XG5cbiAgZXhwb3J0IGxldCB1c2VyID0geyB2b3RlczogW10gfTtcblxuICBsZXQgY2hhbmdlQ291bnQgPSAwO1xuXG4gICQ6IHZvdGVzID0gdXNlci52b3RlcztcbiAgJDogb2Zmc2V0ID0gQXJyYXkoNSAtIHZvdGVzLmxlbmd0aCk7XG4gICQ6IGN1cnJlbnRWb3RlcyA9IHZvdGVzLmNvbmNhdChvZmZzZXQpO1xuICAkOiBoYXNDaGFuZ2VkID0gY2hhbmdlQ291bnQgPiAwO1xuXG4gIGNvbnN0IGNsZWFyVm90ZSA9IChpbmRleCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRWb3RlcyA9IHZvdGVzLmZpbHRlcigodiwgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgIHZvdGVzID0gY3VycmVudFZvdGVzO1xuICAgIGNoYW5nZUNvdW50ICs9IDE7XG4gIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJwb3N0Y3NzXCI+XG4gIC52b3RlLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogOHB4O1xuICAgIGxlZnQ6IDhweDtcblxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgfVxuXG4gIC52b3RlLWhvbGRlciB7XG4gICAgd2lkdGg6IDY0cHg7XG4gICAgaGVpZ2h0OiA2NHB4O1xuXG4gICAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgbWFyZ2luOiAwIDhweDtcbiAgfVxuXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLnZvdGUtY29udGFpbmVyIHtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgICB9XG5cbiAgICAudm90ZS1ob2xkZXIge1xuICAgICAgbWFyZ2luOiAwLjVyZW0gYXV0bztcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuXG4gICAgLnZvdGUtaG9sZGVyIGltZyB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIGltZzpob3ZlciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwidm90ZS1jb250YWluZXJcIj5cbiAgeyNpZiBjdXJyZW50Vm90ZXN9XG4gICAgeyNlYWNoIGN1cnJlbnRWb3RlcyBhcyB2b3RlLCBpbmRleH1cbiAgICAgIDxkaXYgY2xhc3M9XCJ2b3RlLWhvbGRlclwiIG9uOmNsaWNrPXsoKSA9PiBjbGVhclZvdGUoaW5kZXgpfT5cbiAgICAgICAgeyNpZiB2b3RlfVxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz17YCR7Q0ROX0JBU0VfVVJMfS8ke3ZvdGU/LnBpZWNlX2lkfS5qcGdgfVxuICAgICAgICAgICAgYWx0PVwiQXJ0amFtIGVudHJ5IHZvdGUgdGh1bWJuYWlsXCIgLz5cbiAgICAgICAgey9pZn1cbiAgICAgIDwvZGl2PlxuICAgIHs6ZWxzZX1cbiAgICAgIDxzcGFuPk5vIHZvdGVzIHlldCwgd2hhdCBhcmUgeW91IHdhaXRpbmcgZm9yPzwvc3Bhbj5cbiAgICB7L2VhY2h9XG4gIHsvaWZ9XG4gIDxGbG9hdGluZ1N1Ym1pdEJ1dHRvbiB7aGFzQ2hhbmdlZH0gb246c3VibWl0Vm90ZXM9e2hhbmRsZVN1Ym1pdH0gLz5cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCRSxlQUFlLDRCQUFDLENBQUMsQUFDZixRQUFRLENBQUUsS0FBSyxDQUNmLE1BQU0sQ0FBRSxHQUFHLENBQ1gsSUFBSSxDQUFFLEdBQUcsQ0FFVCxPQUFPLENBQUUsSUFBSSxDQUNiLGNBQWMsQ0FBRSxHQUFHLEFBQ3JCLENBQUMsQUFFRCxZQUFZLDRCQUFDLENBQUMsQUFDWixLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBRVosTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN0QixhQUFhLENBQUUsR0FBRyxDQUNsQixNQUFNLENBQUUsQ0FBQyxDQUFDLEdBQUcsQUFDZixDQUFDLEFBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxDQUFDLEFBQUMsQ0FBQyxBQUNwQyxlQUFlLDRCQUFDLENBQUMsQUFDZixjQUFjLENBQUUsY0FBYyxBQUNoQyxDQUFDLEFBRUQsWUFBWSw0QkFBQyxDQUFDLEFBQ1osTUFBTSxDQUFFLE1BQU0sQ0FBQyxJQUFJLENBQ25CLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLFFBQVEsQ0FBRSxNQUFNLEFBQ2xCLENBQUMsQUFFRCwwQkFBWSxDQUFDLEdBQUcsY0FBQyxDQUFDLEFBQ2hCLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLEdBQUcsQ0FBRSxDQUFDLENBQ04sSUFBSSxDQUFFLENBQUMsQ0FDUCxLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBQ1osVUFBVSxDQUFFLElBQUksQUFDbEIsQ0FBQyxBQUVELCtCQUFHLE1BQU0sQUFBQyxDQUFDLEFBQ1QsTUFBTSxDQUFFLE9BQU8sQUFDakIsQ0FBQyxBQUNILENBQUMifQ== */";
  	append_dev(document.head, style);
  }

  function get_each_context(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[10] = list[i];
  	child_ctx[12] = i;
  	return child_ctx;
  }

  // (76:2) {#if currentVotes}
  function create_if_block(ctx) {
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
  		id: create_if_block.name,
  		type: "if",
  		source: "(76:2) {#if currentVotes}",
  		ctx
  	});

  	return block;
  }

  // (85:4) {:else}
  function create_else_block(ctx) {
  	let span;

  	const block = {
  		c: function create() {
  			span = element("span");
  			span.textContent = "No votes yet, what are you waiting for?";
  			add_location(span, file$1, 85, 6, 1681);
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
  		source: "(85:4) {:else}",
  		ctx
  	});

  	return block;
  }

  // (79:8) {#if vote}
  function create_if_block_1(ctx) {
  	let img;
  	let img_src_value;

  	const block = {
  		c: function create() {
  			img = element("img");
  			if (img.src !== (img_src_value = `${CDN_BASE_URL}/${/*vote*/ ctx[10]?.piece_id}.jpg`)) attr_dev(img, "src", img_src_value);
  			attr_dev(img, "alt", "Artjam entry vote thumbnail");
  			attr_dev(img, "class", "svelte-44m7i4");
  			add_location(img, file$1, 79, 10, 1524);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, img, anchor);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*currentVotes*/ 2 && img.src !== (img_src_value = `${CDN_BASE_URL}/${/*vote*/ ctx[10]?.piece_id}.jpg`)) {
  				attr_dev(img, "src", img_src_value);
  			}
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(img);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_if_block_1.name,
  		type: "if",
  		source: "(79:8) {#if vote}",
  		ctx
  	});

  	return block;
  }

  // (77:4) {#each currentVotes as vote, index}
  function create_each_block(ctx) {
  	let div;
  	let t;
  	let mounted;
  	let dispose;
  	let if_block = /*vote*/ ctx[10] && create_if_block_1(ctx);

  	function click_handler(...args) {
  		return /*click_handler*/ ctx[5](/*index*/ ctx[12], ...args);
  	}

  	const block = {
  		c: function create() {
  			div = element("div");
  			if (if_block) if_block.c();
  			t = space();
  			attr_dev(div, "class", "vote-holder svelte-44m7i4");
  			add_location(div, file$1, 77, 6, 1435);
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
  					if_block = create_if_block_1(ctx);
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
  		source: "(77:4) {#each currentVotes as vote, index}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$1(ctx) {
  	let div;
  	let t;
  	let floatingsubmitbutton;
  	let current;
  	let if_block = /*currentVotes*/ ctx[1] && create_if_block(ctx);

  	floatingsubmitbutton = new FloatingSubmitButton({
  			props: { hasChanged: /*hasChanged*/ ctx[2] },
  			$$inline: true
  		});

  	floatingsubmitbutton.$on("submitVotes", function () {
  		if (is_function(/*handleSubmit*/ ctx[0])) /*handleSubmit*/ ctx[0].apply(this, arguments);
  	});

  	const block = {
  		c: function create() {
  			div = element("div");
  			if (if_block) if_block.c();
  			t = space();
  			create_component(floatingsubmitbutton.$$.fragment);
  			attr_dev(div, "class", "vote-container svelte-44m7i4");
  			add_location(div, file$1, 74, 0, 1339);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);
  			if (if_block) if_block.m(div, null);
  			append_dev(div, t);
  			mount_component(floatingsubmitbutton, div, null);
  			current = true;
  		},
  		p: function update(new_ctx, [dirty]) {
  			ctx = new_ctx;

  			if (/*currentVotes*/ ctx[1]) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block(ctx);
  					if_block.c();
  					if_block.m(div, t);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}

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
  			if (detaching) detach_dev(div);
  			if (if_block) if_block.d();
  			destroy_component(floatingsubmitbutton);
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
  	const INITIAL_VOTE = { user_id: null, piece_id: 0 };

  	let { handleSubmit = () => {
  		console.log("Not overriden");
  	} } = $$props;

  	let { user = { votes: [] } } = $$props;
  	let changeCount = 0;

  	const clearVote = index => {
  		const currentVotes = votes.filter((v, i) => i !== index);
  		$$invalidate(7, votes = currentVotes);
  		$$invalidate(6, changeCount += 1);
  	};

  	const writable_props = ["handleSubmit", "user"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<VoteManager> was created with unknown prop '${key}'`);
  	});

  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("VoteManager", $$slots, []);
  	const click_handler = index => clearVote(index);

  	$$self.$$set = $$props => {
  		if ("handleSubmit" in $$props) $$invalidate(0, handleSubmit = $$props.handleSubmit);
  		if ("user" in $$props) $$invalidate(4, user = $$props.user);
  	};

  	$$self.$capture_state = () => ({
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
  		if (!document.getElementById("svelte-44m7i4-style")) add_css$1();
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

  /* components/ContestGallery.svelte generated by Svelte v3.24.1 */
  const file$2 = "components/ContestGallery.svelte";

  function add_css$2() {
  	var style = element("style");
  	style.id = "svelte-1dktyt9-style";
  	style.textContent = ".artjam-gallery-container.svelte-1dktyt9{display:grid;grid-template-columns:49vw 49vw;margin:0 auto;width:100%}.artjam-entry.svelte-1dktyt9{display:flex;width:100%;max-width:49vw;background-color:lightslategray;color:white;border:1px solid transparent;border-radius:0.5rem;padding:0.5rem;margin:1rem auto}@media all and (min-width: 960px){.artjam-gallery-container.svelte-1dktyt9{grid-template-columns:repeat(4, 23vw);grid-column-gap:1vw;max-width:960px}.artjam-entry.svelte-1dktyt9{max-width:23vw}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVzdEdhbGxlcnkuc3ZlbHRlIiwic291cmNlcyI6WyJDb250ZXN0R2FsbGVyeS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBleHBvcnQgbGV0IGNvbnRlc3QgPSB7XG4gICAgZW50cmllczogW10sXG4gIH07XG5cbiAgJDogY29udGVzdCA9ICQkcHJvcHMuY29udGVzdDtcblxuICBjb25zdCBkaXNwYXRjaCA9IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpO1xuXG4gIGNvbnN0IHRvZ2dsZVZvdGUgPSAoZW50cnkpID0+IGRpc3BhdGNoKFwidG9nZ2xldm90ZVwiLCB7IGVudHJ5IH0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwicG9zdGNzc1wiPlxuICAuYXJ0amFtLWdhbGxlcnktY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNDl2dyA0OXZ3O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmFydGphbS1lbnRyeSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDQ5dnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyYXk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgbWFyZ2luOiAxcmVtIGF1dG87XG4gIH1cblxuICBAbWVkaWEgYWxsIGFuZCAobWluLXdpZHRoOiA5NjBweCkge1xuICAgIC5hcnRqYW0tZ2FsbGVyeS1jb250YWluZXIge1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMjN2dyk7XG4gICAgICBncmlkLWNvbHVtbi1nYXA6IDF2dztcbiAgICAgIG1heC13aWR0aDogOTYwcHg7XG4gICAgfVxuXG4gICAgLmFydGphbS1lbnRyeSB7XG4gICAgICBtYXgtd2lkdGg6IDIzdnc7XG4gICAgfVxuICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiYXJ0amFtLWdhbGxlcnktY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LWxpZ2h0Ym94LW92ZXJsYXlcIiAvPlxuICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1saWdodGJveFwiPlxuICAgIDxwaWN0dXJlPiA8aW1nIHNyYz17YWN0aXZlSW1nU3JjfSAvPiA8L3BpY3R1cmU+XG4gIDwvZGl2PlxuICB7I2lmIGNvbnRlc3QuZW50cmllc31cbiAgICB7I2VhY2ggY29udGVzdC5lbnRyaWVzIGFzIGVudHJ5fVxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImFydGphbS1lbnRyeVwiIG9uOmNsaWNrPXsoKSA9PiB0b2dnbGVWb3RlKGVudHJ5KX0+XG4gICAgICAgIHtlbnRyeS5uYW1lfVxuICAgICAgPC9idXR0b24+XG4gICAgey9lYWNofVxuICB7L2lmfVxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0UseUJBQXlCLGVBQUMsQ0FBQyxBQUN6QixPQUFPLENBQUUsSUFBSSxDQUNiLHFCQUFxQixDQUFFLElBQUksQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUNkLEtBQUssQ0FBRSxJQUFJLEFBQ2IsQ0FBQyxBQUVELGFBQWEsZUFBQyxDQUFDLEFBQ2IsT0FBTyxDQUFFLElBQUksQ0FDYixLQUFLLENBQUUsSUFBSSxDQUNYLFNBQVMsQ0FBRSxJQUFJLENBQ2YsZ0JBQWdCLENBQUUsY0FBYyxDQUNoQyxLQUFLLENBQUUsS0FBSyxDQUNaLE1BQU0sQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDN0IsYUFBYSxDQUFFLE1BQU0sQ0FDckIsT0FBTyxDQUFFLE1BQU0sQ0FDZixNQUFNLENBQUUsSUFBSSxDQUFDLElBQUksQUFDbkIsQ0FBQyxBQUVELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDakMseUJBQXlCLGVBQUMsQ0FBQyxBQUN6QixxQkFBcUIsQ0FBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUN0QyxlQUFlLENBQUUsR0FBRyxDQUNwQixTQUFTLENBQUUsS0FBSyxBQUNsQixDQUFDLEFBRUQsYUFBYSxlQUFDLENBQUMsQUFDYixTQUFTLENBQUUsSUFBSSxBQUNqQixDQUFDLEFBQ0gsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function get_each_context$1(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[5] = list[i];
  	return child_ctx;
  }

  // (52:2) {#if contest.entries}
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
  			if (dirty & /*toggleVote, contest*/ 3) {
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
  		source: "(52:2) {#if contest.entries}",
  		ctx
  	});

  	return block;
  }

  // (53:4) {#each contest.entries as entry}
  function create_each_block$1(ctx) {
  	let button;
  	let t0_value = /*entry*/ ctx[5].name + "";
  	let t0;
  	let t1;
  	let mounted;
  	let dispose;

  	function click_handler(...args) {
  		return /*click_handler*/ ctx[2](/*entry*/ ctx[5], ...args);
  	}

  	const block = {
  		c: function create() {
  			button = element("button");
  			t0 = text(t0_value);
  			t1 = space();
  			attr_dev(button, "class", "artjam-entry svelte-1dktyt9");
  			add_location(button, file$2, 53, 6, 1138);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, button, anchor);
  			append_dev(button, t0);
  			append_dev(button, t1);

  			if (!mounted) {
  				dispose = listen_dev(button, "click", click_handler, false, false, false);
  				mounted = true;
  			}
  		},
  		p: function update(new_ctx, dirty) {
  			ctx = new_ctx;
  			if (dirty & /*contest*/ 1 && t0_value !== (t0_value = /*entry*/ ctx[5].name + "")) set_data_dev(t0, t0_value);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(button);
  			mounted = false;
  			dispose();
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block$1.name,
  		type: "each",
  		source: "(53:4) {#each contest.entries as entry}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$2(ctx) {
  	let div2;
  	let div0;
  	let t0;
  	let div1;
  	let picture;
  	let img;
  	let img_src_value;
  	let t1;
  	let if_block = /*contest*/ ctx[0].entries && create_if_block$1(ctx);

  	const block = {
  		c: function create() {
  			div2 = element("div");
  			div0 = element("div");
  			t0 = space();
  			div1 = element("div");
  			picture = element("picture");
  			img = element("img");
  			t1 = space();
  			if (if_block) if_block.c();
  			attr_dev(div0, "class", "gallery-lightbox-overlay");
  			add_location(div0, file$2, 47, 2, 936);
  			if (img.src !== (img_src_value = activeImgSrc)) attr_dev(img, "src", img_src_value);
  			add_location(img, file$2, 49, 14, 1024);
  			add_location(picture, file$2, 49, 4, 1014);
  			attr_dev(div1, "class", "gallery-lightbox");
  			add_location(div1, file$2, 48, 2, 979);
  			attr_dev(div2, "class", "artjam-gallery-container svelte-1dktyt9");
  			add_location(div2, file$2, 46, 0, 895);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div2, anchor);
  			append_dev(div2, div0);
  			append_dev(div2, t0);
  			append_dev(div2, div1);
  			append_dev(div1, picture);
  			append_dev(picture, img);
  			append_dev(div2, t1);
  			if (if_block) if_block.m(div2, null);
  		},
  		p: function update(ctx, [dirty]) {
  			if (/*contest*/ ctx[0].entries) {
  				if (if_block) {
  					if_block.p(ctx, dirty);
  				} else {
  					if_block = create_if_block$1(ctx);
  					if_block.c();
  					if_block.m(div2, null);
  				}
  			} else if (if_block) {
  				if_block.d(1);
  				if_block = null;
  			}
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(div2);
  			if (if_block) if_block.d();
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
  	let { contest = { entries: [] } } = $$props;
  	const dispatch = createEventDispatcher();
  	const toggleVote = entry => dispatch("togglevote", { entry });
  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("ContestGallery", $$slots, []);
  	const click_handler = entry => toggleVote(entry);

  	$$self.$$set = $$new_props => {
  		$$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  		if ("contest" in $$new_props) $$invalidate(0, contest = $$new_props.contest);
  	};

  	$$self.$capture_state = () => ({
  		createEventDispatcher,
  		contest,
  		dispatch,
  		toggleVote
  	});

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
  		if ("contest" in $$props) $$invalidate(0, contest = $$new_props.contest);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		 $$invalidate(0, contest = $$props.contest);
  	};

  	$$props = exclude_internal_props($$props);
  	return [contest, toggleVote, click_handler];
  }

  class ContestGallery extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-1dktyt9-style")) add_css$2();
  		init(this, options, instance$2, create_fragment$2, safe_not_equal, { contest: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "ContestGallery",
  			options,
  			id: create_fragment$2.name
  		});
  	}

  	get contest() {
  		throw new Error("<ContestGallery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set contest(value) {
  		throw new Error("<ContestGallery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* App.svelte generated by Svelte v3.24.1 */

  function create_fragment$3(ctx) {
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
  		id: create_fragment$3.name,
  		type: "component",
  		source: "",
  		ctx
  	});

  	return block;
  }

  const API_URL = "https://artofkoko.com";
  const ARTJAM_ID = 5;
  const MAX_VOTES = 5;

  function instance$3($$self, $$props, $$invalidate) {
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
  		const newValue = !pictureVoter[entry.id];
  		pictureVoter[entry.id] = newValue;
  		return newValue;
  	};

  	const handleSubmit = event => {
  	};

  	onMount(() => {
  		getContest(ARTJAM_ID).then(res => res.json()).then(data => $$invalidate(1, contest = data));
  	});

  	const writable_props = ["user"];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
  	});

  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("App", $$slots, []);

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
  		init(this, options, instance$3, create_fragment$3, safe_not_equal, { user: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "App",
  			options,
  			id: create_fragment$3.name
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
            console.log('Calling app set because of Cookie');
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
