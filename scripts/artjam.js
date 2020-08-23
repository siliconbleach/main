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
  	style.textContent = "#vote-submission.svelte-x28trx{position:fixed;left:3.7rem;bottom:0.75rem;display:flex;justify-content:center;align-items:center}#submitvotes-button.svelte-x28trx{background:rgba(0, 0, 0, 0.6);appearance:none;border:none;padding:0.75rem;color:#fff;border-radius:0.25rem;font-size:20px;opacity:0;visibility:hidden;transition:all 0.75s ease-in-out}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvYXRpbmdTdWJtaXRCdXR0b24uc3ZlbHRlIiwic291cmNlcyI6WyJGbG9hdGluZ1N1Ym1pdEJ1dHRvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICBjb25zdCBNQVhfVk9URVNfQUxMT1dFRCA9IDU7XG4gIGxldCBpc1N1Ym1pdEJ1dHRvbkFjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJwb3N0Y3NzXCI+XG4gICN2b3RlLXN1Ym1pc3Npb24ge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBsZWZ0OiAzLjdyZW07XG4gICAgYm90dG9tOiAwLjc1cmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gICNzdWJtaXR2b3Rlcy1idXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjc1cyBlYXNlLWluLW91dDtcbiAgfVxuXG4gICNzdWJtaXR2b3Rlcy1idXR0b24uaXMtc2hvd24ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgfVxuPC9zdHlsZT5cblxuPGZvcm0gaWQ9XCJ2b3RlLXN1Ym1pc3Npb25cIj5cbiAgPGJ1dHRvbiBpZD1cInN1Ym1pdHZvdGVzLWJ1dHRvblwiIGNsYXNzOmlzU2hvd249e2lzU3VibWl0QnV0dG9uQWN0aXZlfT5cbiAgICBTdWJtaXQgVm90ZXNcbiAgPC9idXR0b24+XG48L2Zvcm0+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0UsZ0JBQWdCLGNBQUMsQ0FBQyxBQUNoQixRQUFRLENBQUUsS0FBSyxDQUNmLElBQUksQ0FBRSxNQUFNLENBQ1osTUFBTSxDQUFFLE9BQU8sQ0FDZixPQUFPLENBQUUsSUFBSSxDQUNiLGVBQWUsQ0FBRSxNQUFNLENBQ3ZCLFdBQVcsQ0FBRSxNQUFNLEFBQ3JCLENBQUMsQUFFRCxtQkFBbUIsY0FBQyxDQUFDLEFBQ25CLFVBQVUsQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUM5QixVQUFVLENBQUUsSUFBSSxDQUNoQixNQUFNLENBQUUsSUFBSSxDQUNaLE9BQU8sQ0FBRSxPQUFPLENBQ2hCLEtBQUssQ0FBRSxJQUFJLENBQ1gsYUFBYSxDQUFFLE9BQU8sQ0FDdEIsU0FBUyxDQUFFLElBQUksQ0FDZixPQUFPLENBQUUsQ0FBQyxDQUNWLFVBQVUsQ0FBRSxNQUFNLENBQ2xCLFVBQVUsQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQUFDbkMsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function create_fragment(ctx) {
  	let form;
  	let button;

  	const block = {
  		c: function create() {
  			form = element("form");
  			button = element("button");
  			button.textContent = "Submit Votes";
  			attr_dev(button, "id", "submitvotes-button");
  			attr_dev(button, "class", "svelte-x28trx");
  			toggle_class(button, "isShown", /*isSubmitButtonActive*/ ctx[0]);
  			add_location(button, file, 38, 2, 754);
  			attr_dev(form, "id", "vote-submission");
  			attr_dev(form, "class", "svelte-x28trx");
  			add_location(form, file, 37, 0, 724);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, form, anchor);
  			append_dev(form, button);
  		},
  		p: function update(ctx, [dirty]) {
  			if (dirty & /*isSubmitButtonActive*/ 1) {
  				toggle_class(button, "isShown", /*isSubmitButtonActive*/ ctx[0]);
  			}
  		},
  		i: noop,
  		o: noop,
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(form);
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
  	let isSubmitButtonActive = false;
  	const dispatch = createEventDispatcher();
  	const writable_props = [];

  	Object.keys($$props).forEach(key => {
  		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FloatingSubmitButton> was created with unknown prop '${key}'`);
  	});

  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("FloatingSubmitButton", $$slots, []);

  	$$self.$capture_state = () => ({
  		createEventDispatcher,
  		MAX_VOTES_ALLOWED,
  		isSubmitButtonActive,
  		dispatch
  	});

  	$$self.$inject_state = $$props => {
  		if ("isSubmitButtonActive" in $$props) $$invalidate(0, isSubmitButtonActive = $$props.isSubmitButtonActive);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [isSubmitButtonActive];
  }

  class FloatingSubmitButton extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-x28trx-style")) add_css();
  		init(this, options, instance, create_fragment, safe_not_equal, {});

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "FloatingSubmitButton",
  			options,
  			id: create_fragment.name
  		});
  	}
  }

  /* components/VoteManager.svelte generated by Svelte v3.24.1 */
  const file$1 = "components/VoteManager.svelte";

  function add_css$1() {
  	var style = element("style");
  	style.id = "svelte-ubk6mf-style";
  	style.textContent = ".vote-container.svelte-ubk6mf{position:fixed;bottom:8px;left:8px;display:flex;flex-direction:row}.vote-holder.svelte-ubk6mf{width:64px;height:64px;border:2px inset #fff;border-radius:6px;margin:0 8px}@media screen and (min-width: 768px){.vote-container.svelte-ubk6mf{flex-direction:column}.vote-holder.svelte-ubk6mf{margin:0.5rem auto}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm90ZU1hbmFnZXIuc3ZlbHRlIiwic291cmNlcyI6WyJWb3RlTWFuYWdlci5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IEZsb2F0aW5nU3VibWl0QnV0dG9uIGZyb20gXCIuL0Zsb2F0aW5nU3VibWl0QnV0dG9uLnN2ZWx0ZVwiO1xuXG4gIGNvbnN0IElOSVRJQUxfVk9URSA9IHtcbiAgICB1c2VyX2lkOiBudWxsLFxuICAgIHBpZWNlX2lkOiAwXG4gIH07XG4gIGV4cG9ydCBsZXQgdXNlciA9IHt2b3RlczpbXX07XG4gICQ6IHZvdGVzID0gJCRwcm9wcy51c2VyLnZvdGVzO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwicG9zdGNzc1wiPlxuICAudm90ZS1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBib3R0b206IDhweDtcbiAgICBsZWZ0OiA4cHg7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIH1cblxuICAudm90ZS1ob2xkZXIge1xuICAgIHdpZHRoOiA2NHB4O1xuICAgIGhlaWdodDogNjRweDtcblxuICAgIGJvcmRlcjogMnB4IGluc2V0ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgIG1hcmdpbjogMCA4cHg7XG4gIH1cblxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIC52b3RlLWNvbnRhaW5lciB7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cblxuICAgIC52b3RlLWhvbGRlciB7XG4gICAgICBtYXJnaW46IDAuNXJlbSBhdXRvO1xuICAgIH1cbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cInZvdGUtY29udGFpbmVyXCI+XG5cbiAgeyNlYWNoIHZvdGVzIGFzIHZvdGV9XG5cbiBcdCA8c3BhbiBjbGFzcz1cInZvdGUtaG9sZGVyXCI+XG5cdCAge3ZvdGU/LnBpZWNlX2lkfVxuXHQgIDwvc3Bhbj5cbiAgICB7OmVsc2V9XG4gICAgICA8c3Bhbj5ObyB2b3RlcyB5ZXQsIHdoYXQgYXJlIHlvdSB3YWl0aW5nIGZvcj88L3NwYW4+XG4gIHsvZWFjaH1cblxuICA8RmxvYXRpbmdTdWJtaXRCdXR0b24gLz5cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlFLGVBQWUsY0FBQyxDQUFDLEFBQ2YsUUFBUSxDQUFFLEtBQUssQ0FDZixNQUFNLENBQUUsR0FBRyxDQUNYLElBQUksQ0FBRSxHQUFHLENBRVQsT0FBTyxDQUFFLElBQUksQ0FDYixjQUFjLENBQUUsR0FBRyxBQUNyQixDQUFDLEFBRUQsWUFBWSxjQUFDLENBQUMsQUFDWixLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBRVosTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUN0QixhQUFhLENBQUUsR0FBRyxDQUNsQixNQUFNLENBQUUsQ0FBQyxDQUFDLEdBQUcsQUFDZixDQUFDLEFBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxDQUFDLEFBQUMsQ0FBQyxBQUNwQyxlQUFlLGNBQUMsQ0FBQyxBQUNmLGNBQWMsQ0FBRSxNQUFNLEFBQ3hCLENBQUMsQUFFRCxZQUFZLGNBQUMsQ0FBQyxBQUNaLE1BQU0sQ0FBRSxNQUFNLENBQUMsSUFBSSxBQUNyQixDQUFDLEFBQ0gsQ0FBQyJ9 */";
  	append_dev(document.head, style);
  }

  function get_each_context(ctx, list, i) {
  	const child_ctx = ctx.slice();
  	child_ctx[4] = list[i];
  	return child_ctx;
  }

  // (49:4) {:else}
  function create_else_block(ctx) {
  	let span;

  	const block = {
  		c: function create() {
  			span = element("span");
  			span.textContent = "No votes yet, what are you waiting for?";
  			add_location(span, file$1, 49, 6, 794);
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
  		source: "(49:4) {:else}",
  		ctx
  	});

  	return block;
  }

  // (44:2) {#each votes as vote}
  function create_each_block(ctx) {
  	let span;
  	let t_value = /*vote*/ ctx[4]?.piece_id + "";
  	let t;

  	const block = {
  		c: function create() {
  			span = element("span");
  			t = text(t_value);
  			attr_dev(span, "class", "vote-holder svelte-ubk6mf");
  			add_location(span, file$1, 45, 3, 718);
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, span, anchor);
  			append_dev(span, t);
  		},
  		p: function update(ctx, dirty) {
  			if (dirty & /*votes*/ 1 && t_value !== (t_value = /*vote*/ ctx[4]?.piece_id + "")) set_data_dev(t, t_value);
  		},
  		d: function destroy(detaching) {
  			if (detaching) detach_dev(span);
  		}
  	};

  	dispatch_dev("SvelteRegisterBlock", {
  		block,
  		id: create_each_block.name,
  		type: "each",
  		source: "(44:2) {#each votes as vote}",
  		ctx
  	});

  	return block;
  }

  function create_fragment$1(ctx) {
  	let div;
  	let t;
  	let floatingsubmitbutton;
  	let current;
  	let each_value = /*votes*/ ctx[0];
  	validate_each_argument(each_value);
  	let each_blocks = [];

  	for (let i = 0; i < each_value.length; i += 1) {
  		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  	}

  	let each_1_else = null;

  	if (!each_value.length) {
  		each_1_else = create_else_block(ctx);
  	}

  	floatingsubmitbutton = new FloatingSubmitButton({ $$inline: true });

  	const block = {
  		c: function create() {
  			div = element("div");

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].c();
  			}

  			if (each_1_else) {
  				each_1_else.c();
  			}

  			t = space();
  			create_component(floatingsubmitbutton.$$.fragment);
  			attr_dev(div, "class", "vote-container svelte-ubk6mf");
  			add_location(div, file$1, 41, 0, 660);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			insert_dev(target, div, anchor);

  			for (let i = 0; i < each_blocks.length; i += 1) {
  				each_blocks[i].m(div, null);
  			}

  			if (each_1_else) {
  				each_1_else.m(div, null);
  			}

  			append_dev(div, t);
  			mount_component(floatingsubmitbutton, div, null);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			if (dirty & /*votes*/ 1) {
  				each_value = /*votes*/ ctx[0];
  				validate_each_argument(each_value);
  				let i;

  				for (i = 0; i < each_value.length; i += 1) {
  					const child_ctx = get_each_context(ctx, each_value, i);

  					if (each_blocks[i]) {
  						each_blocks[i].p(child_ctx, dirty);
  					} else {
  						each_blocks[i] = create_each_block(child_ctx);
  						each_blocks[i].c();
  						each_blocks[i].m(div, t);
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
  					each_1_else.m(div, t);
  				}
  			}
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
  			destroy_each(each_blocks, detaching);
  			if (each_1_else) each_1_else.d();
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

  function instance$1($$self, $$props, $$invalidate) {
  	const INITIAL_VOTE = { user_id: null, piece_id: 0 };
  	let { user = { votes: [] } } = $$props;
  	let { $$slots = {}, $$scope } = $$props;
  	validate_slots("VoteManager", $$slots, []);

  	$$self.$$set = $$new_props => {
  		$$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  		if ("user" in $$new_props) $$invalidate(1, user = $$new_props.user);
  	};

  	$$self.$capture_state = () => ({
  		FloatingSubmitButton,
  		INITIAL_VOTE,
  		user,
  		votes
  	});

  	$$self.$inject_state = $$new_props => {
  		$$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
  		if ("user" in $$props) $$invalidate(1, user = $$new_props.user);
  		if ("votes" in $$props) $$invalidate(0, votes = $$new_props.votes);
  	};

  	let votes;

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	$$self.$$.update = () => {
  		 $$invalidate(0, votes = $$props.user.votes);
  	};

  	$$props = exclude_internal_props($$props);
  	return [votes, user];
  }

  class VoteManager extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		if (!document.getElementById("svelte-ubk6mf-style")) add_css$1();
  		init(this, options, instance$1, create_fragment$1, safe_not_equal, { user: 1 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "VoteManager",
  			options,
  			id: create_fragment$1.name
  		});
  	}

  	get user() {
  		throw new Error("<VoteManager>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}

  	set user(value) {
  		throw new Error("<VoteManager>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  	}
  }

  /* App.svelte generated by Svelte v3.24.1 */

  function create_fragment$2(ctx) {
  	let votemanager;
  	let current;

  	votemanager = new VoteManager({
  			props: { user: /*user*/ ctx[0] },
  			$$inline: true
  		});

  	const block = {
  		c: function create() {
  			create_component(votemanager.$$.fragment);
  		},
  		l: function claim(nodes) {
  			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
  		},
  		m: function mount(target, anchor) {
  			mount_component(votemanager, target, anchor);
  			current = true;
  		},
  		p: function update(ctx, [dirty]) {
  			const votemanager_changes = {};
  			if (dirty & /*user*/ 1) votemanager_changes.user = /*user*/ ctx[0];
  			votemanager.$set(votemanager_changes);
  		},
  		i: function intro(local) {
  			if (current) return;
  			transition_in(votemanager.$$.fragment, local);
  			current = true;
  		},
  		o: function outro(local) {
  			transition_out(votemanager.$$.fragment, local);
  			current = false;
  		},
  		d: function destroy(detaching) {
  			destroy_component(votemanager, detaching);
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
  	let { user = { votes: [] } } = $$props;

  	onMount(() => {
  		
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

  	$$self.$capture_state = () => ({ onMount, VoteManager, user });

  	$$self.$inject_state = $$props => {
  		if ("user" in $$props) $$invalidate(0, user = $$props.user);
  	};

  	if ($$props && "$$inject" in $$props) {
  		$$self.$inject_state($$props.$$inject);
  	}

  	return [user];
  }

  class App extends SvelteComponentDev {
  	constructor(options) {
  		super(options);
  		init(this, options, instance$2, create_fragment$2, safe_not_equal, { user: 0 });

  		dispatch_dev("SvelteRegisterComponent", {
  			component: this,
  			tagName: "App",
  			options,
  			id: create_fragment$2.name
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

    var toggleVote = function toggleVote(id) {
      var $voteSlide = $("#".concat(YUI_PREFIX).concat(yui_gallery_id).concat(id));
      var styles = {
        background: 'white',
        color: '#e86d6d'
      };
      var voteIndex = settings.votes.indexOf(id);

      if (voteIndex > -1) {
        settings.votes.splice(voteIndex, 1);
        styles = {
          background: 'transparent',
          color: '#fff'
        };
      } else {
        if (settings.votes.length < 5) {
          settings.votes.push(id);
        } else {
          return alert('You can only vote for five pieces.');
        }
      }

      $voteSlide.find('.voting-button').toggleClass('is-selected').css(styles);
    };

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
                _context.next = 2;
                return fetch("".concat(API_URL, "/api/user/").concat(twitchId, "/votes"), {
                  method: 'GET'
                });

              case 2:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 4:
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

    var submitVotes = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (settings.user.twitch_id) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", window.location.href = "".concat(API_URL, "/authenticate?votes=").concat(settings.votes.join(',')));

              case 2:
                _context2.next = 4;
                return fetch("".concat(API_URL, "/api/votes"), {
                  method: 'POST',
                  body: JSON.stringify(settings),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(function (res) {
                  return res.json();
                }).then(function (data) {
                  var success = data.success;

                  if (success) {
                    toast.success('Vote received successfully!');
                  }
                });

              case 4:
                response = _context2.sent;
                return _context2.abrupt("return", response);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function submitVotes() {
        return _ref2.apply(this, arguments);
      };
    }();
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
      submitVotes();
    });
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
          user: settings.user,
          votes: settings.user.votes
        }
      });
      var $slides = Array.from(document.querySelectorAll('.slide'));
      yui_gallery_id = $slides[0].id.split('_');
      yui_gallery_id = yui_gallery_id.slice(1, yui_gallery_id.length - 1).join('_') + '_'; // $('.slide').append(buttonTemplate);

      if (urlParams.has('success') && urlParams.has('twitch_id')) {
        var twitchId = urlParams.get('twitch_id');
        settings.user.twitchId = urlParams.get('twitch_id');
        var twitchIdCookie = js_cookie.set('userTwitchId', settings.user.twitchId, {
          expires: 14,
          secure: true
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
            settings.user = {
              twitch_id: twitch_id,
              id: id,
              name: name
            };
            settings.votes = votes.map(function (v) {
              return v.piece_id;
            });
            (_settings = settings) === null || _settings === void 0 ? void 0 : _settings.votes.forEach(function (vote) {
              $("#".concat(YUI_PREFIX).concat(yui_gallery_id).concat(vote)).find('.voting-button').toggleClass('is-selected');
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
