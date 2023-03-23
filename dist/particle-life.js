(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/riot/esm/riot.js
  var riot_exports = {};
  __export(riot_exports, {
    __: () => __,
    component: () => component,
    install: () => install,
    mount: () => mount,
    pure: () => pure,
    register: () => register,
    uninstall: () => uninstall,
    unmount: () => unmount,
    unregister: () => unregister,
    version: () => version,
    withTypes: () => withTypes
  });

  // node_modules/riot/esm/node_modules/@riotjs/util/constants.js
  var COMPONENTS_IMPLEMENTATION_MAP = /* @__PURE__ */ new Map();
  var DOM_COMPONENT_INSTANCE_PROPERTY = Symbol("riot-component");
  var PLUGINS_SET = /* @__PURE__ */ new Set();
  var IS_DIRECTIVE = "is";
  var MOUNT_METHOD_KEY = "mount";
  var UPDATE_METHOD_KEY = "update";
  var UNMOUNT_METHOD_KEY = "unmount";
  var SHOULD_UPDATE_KEY = "shouldUpdate";
  var ON_BEFORE_MOUNT_KEY = "onBeforeMount";
  var ON_MOUNTED_KEY = "onMounted";
  var ON_BEFORE_UPDATE_KEY = "onBeforeUpdate";
  var ON_UPDATED_KEY = "onUpdated";
  var ON_BEFORE_UNMOUNT_KEY = "onBeforeUnmount";
  var ON_UNMOUNTED_KEY = "onUnmounted";
  var PROPS_KEY = "props";
  var STATE_KEY = "state";
  var SLOTS_KEY = "slots";
  var ROOT_KEY = "root";
  var IS_PURE_SYMBOL = Symbol("pure");
  var IS_COMPONENT_UPDATING = Symbol("is_updating");
  var PARENT_KEY_SYMBOL = Symbol("parent");
  var ATTRIBUTES_KEY_SYMBOL = Symbol("attributes");
  var TEMPLATE_KEY_SYMBOL = Symbol("template");

  // node_modules/riot/esm/node_modules/@riotjs/util/expression-types.js
  var ATTRIBUTE = 0;
  var EVENT = 1;
  var TEXT = 2;
  var VALUE = 3;
  var expressionTypes = {
    ATTRIBUTE,
    EVENT,
    TEXT,
    VALUE
  };

  // node_modules/riot/esm/node_modules/@riotjs/util/strings.js
  function camelToDashCase(string) {
    return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function dashToCamelCase(string) {
    return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
  }

  // node_modules/riot/esm/node_modules/@riotjs/util/misc.js
  function panic(message, cause) {
    throw new Error(message, {
      cause
    });
  }
  function memoize(fn) {
    const cache = /* @__PURE__ */ new Map();
    const cached = (val) => {
      return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
  }
  function evaluateAttributeExpressions(attributes) {
    return attributes.reduce((acc, attribute) => {
      const {
        value,
        type
      } = attribute;
      switch (true) {
        case (!attribute.name && type === ATTRIBUTE):
          return Object.assign({}, acc, value);
        case type === VALUE:
          acc.value = attribute.value;
          break;
        default:
          acc[dashToCamelCase(attribute.name)] = attribute.value;
      }
      return acc;
    }, {});
  }

  // node_modules/riot/esm/node_modules/@riotjs/util/checks.js
  function checkType(element, type) {
    return typeof element === type;
  }
  function isSvg(el) {
    const owner = el.ownerSVGElement;
    return !!owner || owner === null;
  }
  function isTemplate(el) {
    return el.tagName.toLowerCase() === "template";
  }
  function isFunction(value) {
    return checkType(value, "function");
  }
  function isBoolean(value) {
    return checkType(value, "boolean");
  }
  function isObject(value) {
    return !isNil(value) && value.constructor === Object;
  }
  function isNil(value) {
    return value === null || value === void 0;
  }

  // node_modules/riot/esm/node_modules/@riotjs/util/functions.js
  function noop() {
    return this;
  }
  function autobindMethods(source, methods) {
    methods.forEach((method) => {
      source[method] = source[method].bind(source);
    });
    return source;
  }
  function callOrAssign(source) {
    return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
  }

  // node_modules/riot/esm/core/pure-component-api.js
  var PURE_COMPONENT_API = Object.freeze({
    [MOUNT_METHOD_KEY]: noop,
    [UPDATE_METHOD_KEY]: noop,
    [UNMOUNT_METHOD_KEY]: noop
  });

  // node_modules/riot/esm/core/mocked-template-interface.js
  var MOCKED_TEMPLATE_INTERFACE = Object.assign({}, PURE_COMPONENT_API, {
    clone: noop,
    createDOM: noop
  });

  // node_modules/riot/esm/node_modules/@riotjs/util/dom.js
  function DOMattributesToObject(element) {
    return Array.from(element.attributes).reduce((acc, attribute) => {
      acc[dashToCamelCase(attribute.name)] = attribute.value;
      return acc;
    }, {});
  }
  function moveChildren(source, target) {
    while (source.firstChild)
      target.appendChild(source.firstChild);
  }
  function cleanNode(node) {
    while (node.firstChild)
      node.removeChild(node.firstChild);
  }
  function clearChildren(children) {
    for (let i = 0; i < children.length; i++)
      removeChild(children[i]);
  }
  var removeChild = (node) => node.remove();
  var insertBefore = (newNode, refNode) => refNode && refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
  var replaceChild = (newNode, replaced) => replaced && replaced.parentNode && replaced.parentNode.replaceChild(newNode, replaced);

  // node_modules/riot/esm/node_modules/@riotjs/util/binding-types.js
  var EACH = 0;
  var IF = 1;
  var SIMPLE = 2;
  var TAG = 3;
  var SLOT = 4;
  var bindingTypes = {
    EACH,
    IF,
    SIMPLE,
    TAG,
    SLOT
  };

  // node_modules/riot/esm/node_modules/@riotjs/util/objects.js
  function defineProperty(source, key, value, options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    Object.defineProperty(source, key, Object.assign({
      value,
      enumerable: false,
      writable: false,
      configurable: true
    }, options2));
    return source;
  }
  function defineProperties(source, properties, options2) {
    Object.entries(properties).forEach((_ref) => {
      let [key, value] = _ref;
      defineProperty(source, key, value, options2);
    });
    return source;
  }
  function defineDefaults(source, defaults) {
    Object.entries(defaults).forEach((_ref2) => {
      let [key, value] = _ref2;
      if (!source[key])
        source[key] = value;
    });
    return source;
  }

  // node_modules/riot/esm/node_modules/@riotjs/dom-bindings/dist/esm.dom-bindings.js
  var HEAD_SYMBOL = Symbol();
  var TAIL_SYMBOL = Symbol();
  function createHeadTailPlaceholders() {
    const head = document.createTextNode("");
    const tail = document.createTextNode("");
    head[HEAD_SYMBOL] = true;
    tail[TAIL_SYMBOL] = true;
    return {
      head,
      tail
    };
  }
  function createTemplateMeta(componentTemplate) {
    const fragment = componentTemplate.dom.cloneNode(true);
    const {
      head,
      tail
    } = createHeadTailPlaceholders();
    return {
      avoidDOMInjection: true,
      fragment,
      head,
      tail,
      children: [head, ...Array.from(fragment.childNodes), tail]
    };
  }
  var udomdiff = (a2, b2, get2, before) => {
    const bLength = b2.length;
    let aEnd = a2.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? get2(b2[bStart - 1], -0).nextSibling : get2(b2[bEnd - bStart], 0) : before;
        while (bStart < bEnd)
          insertBefore(get2(b2[bStart++], 1), node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a2[aStart]))
            removeChild(get2(a2[aStart], -1));
          aStart++;
        }
      } else if (a2[aStart] === b2[bStart]) {
        aStart++;
        bStart++;
      } else if (a2[aEnd - 1] === b2[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } else if (a2[aStart] === b2[bEnd - 1] && b2[bStart] === a2[aEnd - 1]) {
        const node = get2(a2[--aEnd], -1).nextSibling;
        insertBefore(get2(b2[bStart++], 1), get2(a2[aStart++], -1).nextSibling);
        insertBefore(get2(b2[--bEnd], 1), node);
        a2[aEnd] = b2[bEnd];
      } else {
        if (!map) {
          map = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd)
            map.set(b2[i], i++);
        }
        if (map.has(a2[aStart])) {
          const index = map.get(a2[aStart]);
          if (bStart < index && index < bEnd) {
            let i = aStart;
            let sequence = 1;
            while (++i < aEnd && i < bEnd && map.get(a2[i]) === index + sequence)
              sequence++;
            if (sequence > index - bStart) {
              const node = get2(a2[aStart], 0);
              while (bStart < index)
                insertBefore(get2(b2[bStart++], 1), node);
            } else {
              replaceChild(get2(b2[bStart++], 1), get2(a2[aStart++], -1));
            }
          } else
            aStart++;
        } else
          removeChild(get2(a2[aStart++], -1));
      }
    }
    return b2;
  };
  var UNMOUNT_SCOPE = Symbol("unmount");
  var EachBinding = {
    // dynamic binding properties
    // childrenMap: null,
    // node: null,
    // root: null,
    // condition: null,
    // evaluate: null,
    // template: null,
    // isTemplateTag: false,
    nodes: [],
    // getKey: null,
    // indexName: null,
    // itemName: null,
    // afterPlaceholder: null,
    // placeholder: null,
    // API methods
    mount(scope, parentScope) {
      return this.update(scope, parentScope);
    },
    update(scope, parentScope) {
      const {
        placeholder,
        nodes,
        childrenMap
      } = this;
      const collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
      const items = collection ? Array.from(collection) : [];
      const {
        newChildrenMap,
        batches,
        futureNodes
      } = createPatch(items, scope, parentScope, this);
      udomdiff(nodes, futureNodes, patch(Array.from(childrenMap.values()), parentScope), placeholder);
      batches.forEach((fn) => fn());
      this.childrenMap = newChildrenMap;
      this.nodes = futureNodes;
      return this;
    },
    unmount(scope, parentScope) {
      this.update(UNMOUNT_SCOPE, parentScope);
      return this;
    }
  };
  function patch(redundant, parentScope) {
    return (item, info) => {
      if (info < 0) {
        const element = redundant[redundant.length - 1];
        if (element) {
          const {
            template,
            nodes,
            context
          } = element;
          nodes.pop();
          if (!nodes.length) {
            redundant.pop();
            template.unmount(context, parentScope, null);
          }
        }
      }
      return item;
    };
  }
  function mustFilterItem(condition, context) {
    return condition ? !condition(context) : false;
  }
  function extendScope(scope, _ref) {
    let {
      itemName,
      indexName,
      index,
      item
    } = _ref;
    defineProperty(scope, itemName, item);
    if (indexName)
      defineProperty(scope, indexName, index);
    return scope;
  }
  function createPatch(items, scope, parentScope, binding) {
    const {
      condition,
      template,
      childrenMap,
      itemName,
      getKey,
      indexName,
      root,
      isTemplateTag
    } = binding;
    const newChildrenMap = /* @__PURE__ */ new Map();
    const batches = [];
    const futureNodes = [];
    items.forEach((item, index) => {
      const context = extendScope(Object.create(scope), {
        itemName,
        indexName,
        index,
        item
      });
      const key = getKey ? getKey(context) : index;
      const oldItem = childrenMap.get(key);
      const nodes = [];
      if (mustFilterItem(condition, context)) {
        return;
      }
      const mustMount = !oldItem;
      const componentTemplate = oldItem ? oldItem.template : template.clone();
      const el = componentTemplate.el || root.cloneNode();
      const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : componentTemplate.meta;
      if (mustMount) {
        batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
      } else {
        batches.push(() => componentTemplate.update(context, parentScope));
      }
      if (isTemplateTag) {
        nodes.push(...meta.children);
      } else {
        nodes.push(el);
      }
      childrenMap.delete(key);
      futureNodes.push(...nodes);
      newChildrenMap.set(key, {
        nodes,
        template: componentTemplate,
        context,
        index
      });
    });
    return {
      newChildrenMap,
      batches,
      futureNodes
    };
  }
  function create$6(node, _ref2) {
    let {
      evaluate,
      condition,
      itemName,
      indexName,
      getKey,
      template
    } = _ref2;
    const placeholder = document.createTextNode("");
    const root = node.cloneNode();
    insertBefore(placeholder, node);
    removeChild(node);
    return Object.assign({}, EachBinding, {
      childrenMap: /* @__PURE__ */ new Map(),
      node,
      root,
      condition,
      evaluate,
      isTemplateTag: isTemplate(root),
      template: template.createDOM(node),
      getKey,
      indexName,
      itemName,
      placeholder
    });
  }
  var IfBinding = {
    // dynamic binding properties
    // node: null,
    // evaluate: null,
    // isTemplateTag: false,
    // placeholder: null,
    // template: null,
    // API methods
    mount(scope, parentScope) {
      return this.update(scope, parentScope);
    },
    update(scope, parentScope) {
      const value = !!this.evaluate(scope);
      const mustMount = !this.value && value;
      const mustUnmount = this.value && !value;
      const mount2 = () => {
        const pristine = this.node.cloneNode();
        insertBefore(pristine, this.placeholder);
        this.template = this.template.clone();
        this.template.mount(pristine, scope, parentScope);
      };
      switch (true) {
        case mustMount:
          mount2();
          break;
        case mustUnmount:
          this.unmount(scope);
          break;
        default:
          if (value)
            this.template.update(scope, parentScope);
      }
      this.value = value;
      return this;
    },
    unmount(scope, parentScope) {
      this.template.unmount(scope, parentScope, true);
      return this;
    }
  };
  function create$5(node, _ref3) {
    let {
      evaluate,
      template
    } = _ref3;
    const placeholder = document.createTextNode("");
    insertBefore(placeholder, node);
    removeChild(node);
    return Object.assign({}, IfBinding, {
      node,
      evaluate,
      placeholder,
      template: template.createDOM(node)
    });
  }
  var ElementProto = typeof Element === "undefined" ? {} : Element.prototype;
  var isNativeHtmlProperty = memoize((name) => ElementProto.hasOwnProperty(name));
  function setAllAttributes(node, attributes) {
    Object.entries(attributes).forEach((_ref4) => {
      let [name, value] = _ref4;
      return attributeExpression(node, {
        name
      }, value);
    });
  }
  function removeAllAttributes(node, newAttributes, oldAttributes) {
    const newKeys = newAttributes ? Object.keys(newAttributes) : [];
    Object.keys(oldAttributes).filter((name) => !newKeys.includes(name)).forEach((attribute) => node.removeAttribute(attribute));
  }
  function canRenderAttribute(value) {
    return value === true || ["string", "number"].includes(typeof value);
  }
  function shouldRemoveAttribute(value) {
    return !value && value !== 0;
  }
  function attributeExpression(node, _ref5, value, oldValue) {
    let {
      name
    } = _ref5;
    if (!name) {
      if (oldValue) {
        removeAllAttributes(node, value, oldValue);
      }
      if (value) {
        setAllAttributes(node, value);
      }
      return;
    }
    if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction(value))) {
      node[name] = value;
    }
    if (shouldRemoveAttribute(value)) {
      node.removeAttribute(name);
    } else if (canRenderAttribute(value)) {
      node.setAttribute(name, normalizeValue(name, value));
    }
  }
  function normalizeValue(name, value) {
    return value === true ? name : value;
  }
  var RE_EVENTS_PREFIX = /^on/;
  var getCallbackAndOptions = (value) => Array.isArray(value) ? value : [value, false];
  var EventListener = {
    handleEvent(event) {
      this[event.type](event);
    }
  };
  var ListenersWeakMap = /* @__PURE__ */ new WeakMap();
  var createListener = (node) => {
    const listener = Object.create(EventListener);
    ListenersWeakMap.set(node, listener);
    return listener;
  };
  function eventExpression(node, _ref6, value) {
    let {
      name
    } = _ref6;
    const normalizedEventName = name.replace(RE_EVENTS_PREFIX, "");
    const eventListener = ListenersWeakMap.get(node) || createListener(node);
    const [callback, options2] = getCallbackAndOptions(value);
    const handler = eventListener[normalizedEventName];
    const mustRemoveEvent = handler && !callback;
    const mustAddEvent = callback && !handler;
    if (mustRemoveEvent) {
      node.removeEventListener(normalizedEventName, eventListener);
    }
    if (mustAddEvent) {
      node.addEventListener(normalizedEventName, eventListener, options2);
    }
    eventListener[normalizedEventName] = callback;
  }
  function normalizeStringValue(value) {
    return isNil(value) ? "" : value;
  }
  var getTextNode = (node, childNodeIndex) => {
    const target = node.childNodes[childNodeIndex];
    if (target.nodeType === Node.COMMENT_NODE) {
      const textNode = document.createTextNode("");
      node.replaceChild(textNode, target);
      return textNode;
    }
    return target;
  };
  function textExpression(node, data, value) {
    node.data = normalizeStringValue(value);
  }
  function valueExpression(node, expression, value) {
    node.value = normalizeStringValue(value);
  }
  var expressions = {
    [ATTRIBUTE]: attributeExpression,
    [EVENT]: eventExpression,
    [TEXT]: textExpression,
    [VALUE]: valueExpression
  };
  var Expression = {
    // Static props
    // node: null,
    // value: null,
    // API methods
    /**
     * Mount the expression evaluating its initial value
     * @param   {*} scope - argument passed to the expression to evaluate its current values
     * @returns {Expression} self
     */
    mount(scope) {
      this.value = this.evaluate(scope);
      apply(this, this.value);
      return this;
    },
    /**
     * Update the expression if its value changed
     * @param   {*} scope - argument passed to the expression to evaluate its current values
     * @returns {Expression} self
     */
    update(scope) {
      const value = this.evaluate(scope);
      if (this.value !== value) {
        apply(this, value);
        this.value = value;
      }
      return this;
    },
    /**
     * Expression teardown method
     * @returns {Expression} self
     */
    unmount() {
      if (this.type === EVENT)
        apply(this, null);
      return this;
    }
  };
  function apply(expression, value) {
    return expressions[expression.type](expression.node, expression, value, expression.value);
  }
  function create$4(node, data) {
    return Object.assign({}, Expression, data, {
      node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
    });
  }
  function flattenCollectionMethods(collection, methods, context) {
    return methods.reduce((acc, method) => {
      return Object.assign({}, acc, {
        [method]: (scope) => {
          return collection.map((item) => item[method](scope)) && context;
        }
      });
    }, {});
  }
  function create$3(node, _ref7) {
    let {
      expressions: expressions2
    } = _ref7;
    return Object.assign({}, flattenCollectionMethods(expressions2.map((expression) => create$4(node, expression)), ["mount", "update", "unmount"]));
  }
  function extendParentScope(attributes, scope, parentScope) {
    if (!attributes || !attributes.length)
      return parentScope;
    const expressions2 = attributes.map((attr) => Object.assign({}, attr, {
      value: attr.evaluate(scope)
    }));
    return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions2));
  }
  var getRealParent = (scope, parentScope) => scope[PARENT_KEY_SYMBOL] || parentScope;
  var SlotBinding = {
    // dynamic binding properties
    // node: null,
    // name: null,
    attributes: [],
    // template: null,
    getTemplateScope(scope, parentScope) {
      return extendParentScope(this.attributes, scope, parentScope);
    },
    // API methods
    mount(scope, parentScope) {
      const templateData = scope.slots ? scope.slots.find((_ref8) => {
        let {
          id
        } = _ref8;
        return id === this.name;
      }) : false;
      const {
        parentNode
      } = this.node;
      const realParent = getRealParent(scope, parentScope);
      this.template = templateData && create(templateData.html, templateData.bindings).createDOM(parentNode);
      if (this.template) {
        cleanNode(this.node);
        this.template.mount(this.node, this.getTemplateScope(scope, realParent), realParent);
        this.template.children = Array.from(this.node.childNodes);
      }
      moveSlotInnerContent(this.node);
      removeChild(this.node);
      return this;
    },
    update(scope, parentScope) {
      if (this.template) {
        const realParent = getRealParent(scope, parentScope);
        this.template.update(this.getTemplateScope(scope, realParent), realParent);
      }
      return this;
    },
    unmount(scope, parentScope, mustRemoveRoot) {
      if (this.template) {
        this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
      }
      return this;
    }
  };
  function moveSlotInnerContent(slot) {
    const child = slot && slot.firstChild;
    if (!child)
      return;
    insertBefore(child, slot);
    moveSlotInnerContent(slot);
  }
  function createSlot(node, _ref9) {
    let {
      name,
      attributes
    } = _ref9;
    return Object.assign({}, SlotBinding, {
      attributes,
      node,
      name
    });
  }
  function getTag(component2, slots, attributes) {
    if (slots === void 0) {
      slots = [];
    }
    if (attributes === void 0) {
      attributes = [];
    }
    if (component2) {
      return component2({
        slots,
        attributes
      });
    }
    return create(slotsToMarkup(slots), [...slotBindings(slots), {
      // the attributes should be registered as binding
      // if we fallback to a normal template chunk
      expressions: attributes.map((attr) => {
        return Object.assign({
          type: ATTRIBUTE
        }, attr);
      })
    }]);
  }
  function slotBindings(slots) {
    return slots.reduce((acc, _ref10) => {
      let {
        bindings: bindings2
      } = _ref10;
      return acc.concat(bindings2);
    }, []);
  }
  function slotsToMarkup(slots) {
    return slots.reduce((acc, slot) => {
      return acc + slot.html;
    }, "");
  }
  var TagBinding = {
    // dynamic binding properties
    // node: null,
    // evaluate: null,
    // name: null,
    // slots: null,
    // tag: null,
    // attributes: null,
    // getComponent: null,
    mount(scope) {
      return this.update(scope);
    },
    update(scope, parentScope) {
      const name = this.evaluate(scope);
      if (name && name === this.name) {
        this.tag.update(scope);
      } else {
        this.unmount(scope, parentScope, true);
        this.name = name;
        this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
        this.tag.mount(this.node, scope);
      }
      return this;
    },
    unmount(scope, parentScope, keepRootTag) {
      if (this.tag) {
        this.tag.unmount(keepRootTag);
      }
      return this;
    }
  };
  function create$2(node, _ref11) {
    let {
      evaluate,
      getComponent,
      slots,
      attributes
    } = _ref11;
    return Object.assign({}, TagBinding, {
      node,
      evaluate,
      slots,
      attributes,
      getComponent
    });
  }
  var bindings = {
    [IF]: create$5,
    [SIMPLE]: create$3,
    [EACH]: create$6,
    [TAG]: create$2,
    [SLOT]: createSlot
  };
  function fixTextExpressionsOffset(expressions2, textExpressionsOffset) {
    return expressions2.map((e) => e.type === TEXT ? Object.assign({}, e, {
      childNodeIndex: e.childNodeIndex + textExpressionsOffset
    }) : e);
  }
  function create$1(root, binding, templateTagOffset) {
    const {
      selector,
      type,
      redundantAttribute,
      expressions: expressions2
    } = binding;
    const node = selector ? root.querySelector(selector) : root;
    if (redundantAttribute)
      node.removeAttribute(redundantAttribute);
    const bindingExpressions = expressions2 || [];
    return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
      expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
    }));
  }
  function createHTMLTree(html, root) {
    const template = isTemplate(root) ? root : document.createElement("template");
    template.innerHTML = html;
    return template.content;
  }
  function createSVGTree(html, container) {
    const svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, "application/xml").documentElement, true);
    return svgNode;
  }
  function createDOMTree(root, html) {
    if (isSvg(root))
      return createSVGTree(html, root);
    return createHTMLTree(html, root);
  }
  function injectDOM(el, dom) {
    switch (true) {
      case isSvg(el):
        moveChildren(dom, el);
        break;
      case isTemplate(el):
        el.parentNode.replaceChild(dom, el);
        break;
      default:
        el.appendChild(dom);
    }
  }
  function createTemplateDOM(el, html) {
    return html && (typeof html === "string" ? createDOMTree(el, html) : html);
  }
  function getTemplateTagOffset(parentNode, el, meta) {
    const siblings = Array.from(parentNode.childNodes);
    return Math.max(siblings.indexOf(el), siblings.indexOf(meta.head) + 1, 0);
  }
  var TemplateChunk = {
    // Static props
    // bindings: null,
    // bindingsData: null,
    // html: null,
    // isTemplateTag: false,
    // fragment: null,
    // children: null,
    // dom: null,
    // el: null,
    /**
     * Create the template DOM structure that will be cloned on each mount
     * @param   {HTMLElement} el - the root node
     * @returns {TemplateChunk} self
     */
    createDOM(el) {
      this.dom = this.dom || createTemplateDOM(el, this.html) || document.createDocumentFragment();
      return this;
    },
    // API methods
    /**
     * Attach the template to a DOM node
     * @param   {HTMLElement} el - target DOM node
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
     * @returns {TemplateChunk} self
     */
    mount(el, scope, parentScope, meta) {
      if (meta === void 0) {
        meta = {};
      }
      if (!el)
        panic("Please provide DOM node to mount properly your template");
      if (this.el)
        this.unmount(scope);
      const {
        fragment,
        children,
        avoidDOMInjection
      } = meta;
      const {
        parentNode
      } = children ? children[0] : el;
      const isTemplateTag = isTemplate(el);
      const templateTagOffset = isTemplateTag ? getTemplateTagOffset(parentNode, el, meta) : null;
      this.createDOM(el);
      const cloneNode = fragment || this.dom.cloneNode(true);
      this.el = isTemplateTag ? parentNode : el;
      this.children = isTemplateTag ? children || Array.from(cloneNode.childNodes) : null;
      if (!avoidDOMInjection && cloneNode)
        injectDOM(el, cloneNode);
      this.bindings = this.bindingsData.map((binding) => create$1(this.el, binding, templateTagOffset));
      this.bindings.forEach((b2) => b2.mount(scope, parentScope));
      this.meta = meta;
      return this;
    },
    /**
     * Update the template with fresh data
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @returns {TemplateChunk} self
     */
    update(scope, parentScope) {
      this.bindings.forEach((b2) => b2.update(scope, parentScope));
      return this;
    },
    /**
     * Remove the template from the node where it was initially mounted
     * @param   {*} scope - template data
     * @param   {*} parentScope - scope of the parent template tag
     * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
     * if false or undefined clean the root tag content, if null don't touch the DOM
     * @returns {TemplateChunk} self
     */
    unmount(scope, parentScope, mustRemoveRoot) {
      if (mustRemoveRoot === void 0) {
        mustRemoveRoot = false;
      }
      const el = this.el;
      if (!el) {
        return this;
      }
      this.bindings.forEach((b2) => b2.unmount(scope, parentScope, mustRemoveRoot));
      switch (true) {
        case (el[IS_PURE_SYMBOL] || mustRemoveRoot === null):
          break;
        case Array.isArray(this.children):
          clearChildren(this.children);
          break;
        case !mustRemoveRoot:
          cleanNode(el);
          break;
        case !!mustRemoveRoot:
          removeChild(el);
          break;
      }
      this.el = null;
      return this;
    },
    /**
     * Clone the template chunk
     * @returns {TemplateChunk} a clone of this object resetting the this.el property
     */
    clone() {
      return Object.assign({}, this, {
        meta: {},
        el: null
      });
    }
  };
  function create(html, bindings2) {
    if (bindings2 === void 0) {
      bindings2 = [];
    }
    return Object.assign({}, TemplateChunk, {
      html,
      bindingsData: bindings2
    });
  }

  // node_modules/riot/esm/core/component-template-factory.js
  function componentTemplateFactory(template, componentWrapper, getChildComponent) {
    return template(create, expressionTypes, bindingTypes, getChildComponent);
  }

  // node_modules/riot/esm/core/bind-dom-node-to-component-instance.js
  var bindDOMNodeToComponentInstance = (node, component2) => node[DOM_COMPONENT_INSTANCE_PROPERTY] = component2;

  // node_modules/riot/esm/core/create-core-api-methods.js
  function createCoreAPIMethods(mapFunction) {
    return [MOUNT_METHOD_KEY, UPDATE_METHOD_KEY, UNMOUNT_METHOD_KEY].reduce((acc, method) => {
      acc[method] = mapFunction(method);
      return acc;
    }, {});
  }

  // node_modules/riot/esm/core/create-pure-component.js
  function createPureComponent(pureFactoryFunction, _ref) {
    let {
      slots,
      attributes,
      props,
      css,
      template
    } = _ref;
    if (template)
      panic("Pure components can not have html");
    if (css)
      panic("Pure components do not have css");
    const component2 = defineDefaults(pureFactoryFunction({
      slots,
      attributes,
      props
    }), PURE_COMPONENT_API);
    return createCoreAPIMethods((method) => function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (method === MOUNT_METHOD_KEY) {
        const [element] = args;
        defineProperty(element, IS_PURE_SYMBOL, true);
        bindDOMNodeToComponentInstance(element, component2);
      }
      component2[method](...args);
      return component2;
    });
  }

  // node_modules/riot/esm/node_modules/bianco.dom-to-array/index.next.js
  function domToArray(els) {
    if (!Array.isArray(els)) {
      if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === "number")
        return Array.from(els);
      else
        return [els];
    }
    return els;
  }

  // node_modules/riot/esm/node_modules/bianco.query/index.next.js
  function $(selector, scope) {
    return domToArray(typeof selector === "string" ? (scope || document).querySelectorAll(selector) : selector);
  }

  // node_modules/riot/esm/core/component-dom-selectors.js
  var COMPONENT_DOM_SELECTORS = Object.freeze({
    // component helpers
    $(selector) {
      return $(selector, this.root)[0];
    },
    $$(selector) {
      return $(selector, this.root);
    }
  });

  // node_modules/riot/esm/core/component-lifecycle-methods.js
  var COMPONENT_LIFECYCLE_METHODS = Object.freeze({
    [SHOULD_UPDATE_KEY]: noop,
    [ON_BEFORE_MOUNT_KEY]: noop,
    [ON_MOUNTED_KEY]: noop,
    [ON_BEFORE_UPDATE_KEY]: noop,
    [ON_UPDATED_KEY]: noop,
    [ON_BEFORE_UNMOUNT_KEY]: noop,
    [ON_UNMOUNTED_KEY]: noop
  });

  // node_modules/riot/esm/node_modules/bianco.attr/index.next.js
  var normalize = (values) => values.length === 1 ? values[0] : values;
  function parseNodes(els, name, method) {
    const names = typeof name === "string" ? [name] : name;
    return normalize(domToArray(els).map((el) => {
      return normalize(names.map((n) => el[method](n)));
    }));
  }
  function set(els, name, value) {
    const attrs = typeof name === "object" ? name : {
      [name]: value
    };
    const props = Object.keys(attrs);
    domToArray(els).forEach((el) => {
      props.forEach((prop) => el.setAttribute(prop, attrs[prop]));
    });
    return els;
  }
  function get(els, name) {
    return parseNodes(els, name, "getAttribute");
  }

  // node_modules/riot/esm/core/css-manager.js
  var CSS_BY_NAME = /* @__PURE__ */ new Map();
  var STYLE_NODE_SELECTOR = "style[riot]";
  var getStyleNode = ((style) => {
    return () => {
      if (style)
        return style;
      style = $(STYLE_NODE_SELECTOR)[0] || document.createElement("style");
      set(style, "type", "text/css");
      if (!style.parentNode)
        document.head.appendChild(style);
      return style;
    };
  })();
  var cssManager = {
    CSS_BY_NAME,
    /**
     * Save a tag style to be later injected into DOM
     * @param { string } name - if it's passed we will map the css to a tagname
     * @param { string } css - css string
     * @returns {Object} self
     */
    add(name, css) {
      if (!CSS_BY_NAME.has(name)) {
        CSS_BY_NAME.set(name, css);
        this.inject();
      }
      return this;
    },
    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     * @returns {Object} self
     */
    inject() {
      getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join("\n");
      return this;
    },
    /**
     * Remove a tag style from the DOM
     * @param {string} name a registered tagname
     * @returns {Object} self
     */
    remove(name) {
      if (CSS_BY_NAME.has(name)) {
        CSS_BY_NAME.delete(name);
        this.inject();
      }
      return this;
    }
  };

  // node_modules/riot/esm/node_modules/curri/index.next.js
  function curry(fn) {
    for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      acc[_key - 1] = arguments[_key];
    }
    return function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args = [...acc, ...args];
      return args.length < fn.length ? curry(fn, ...args) : fn(...args);
    };
  }

  // node_modules/riot/esm/utils/dom.js
  function getName(element) {
    return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
  }

  // node_modules/riot/esm/core/add-css-hook.js
  function addCssHook(element, name) {
    if (getName(element) !== name) {
      set(element, IS_DIRECTIVE, name);
    }
  }

  // node_modules/riot/esm/core/compute-component-state.js
  function computeComponentState(oldState, newState) {
    return Object.assign({}, oldState, callOrAssign(newState));
  }

  // node_modules/riot/esm/core/compute-initial-props.js
  function computeInitialProps(element, initialProps) {
    if (initialProps === void 0) {
      initialProps = {};
    }
    return Object.assign({}, DOMattributesToObject(element), callOrAssign(initialProps));
  }

  // node_modules/riot/esm/core/create-attribute-bindings.js
  function createAttributeBindings(node, attributes) {
    if (attributes === void 0) {
      attributes = [];
    }
    const expressions2 = attributes.map((a2) => create$4(node, a2));
    const binding = {};
    return Object.assign(binding, Object.assign({
      expressions: expressions2
    }, createCoreAPIMethods((method) => (scope) => {
      expressions2.forEach((e) => e[method](scope));
      return binding;
    })));
  }

  // node_modules/riot/esm/core/run-plugins.js
  function runPlugins(component2) {
    return [...PLUGINS_SET].reduce((c, fn) => fn(c) || c, component2);
  }

  // node_modules/riot/esm/core/manage-component-lifecycle.js
  function manageComponentLifecycle(component2, _ref) {
    let {
      slots,
      attributes,
      props
    } = _ref;
    return autobindMethods(runPlugins(defineProperties(isObject(component2) ? Object.create(component2) : component2, {
      mount(element, state, parentScope) {
        if (state === void 0) {
          state = {};
        }
        defineProperty(element, IS_PURE_SYMBOL, false);
        this[PARENT_KEY_SYMBOL] = parentScope;
        this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
        defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, computeInitialProps(element, props), evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions))));
        this[STATE_KEY] = computeComponentState(this[STATE_KEY], state);
        this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone();
        bindDOMNodeToComponentInstance(element, this);
        component2.name && addCssHook(element, component2.name);
        defineProperty(this, ROOT_KEY, element);
        defineProperty(this, SLOTS_KEY, slots);
        this[ON_BEFORE_MOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
        this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
        this[ON_MOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
        return this;
      },
      update(state, parentScope) {
        if (state === void 0) {
          state = {};
        }
        if (parentScope) {
          this[PARENT_KEY_SYMBOL] = parentScope;
          this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
        }
        const newProps = evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions);
        if (this[SHOULD_UPDATE_KEY](newProps, this[PROPS_KEY]) === false)
          return;
        defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, this[PROPS_KEY], newProps)));
        this[STATE_KEY] = computeComponentState(this[STATE_KEY], state);
        this[ON_BEFORE_UPDATE_KEY](this[PROPS_KEY], this[STATE_KEY]);
        if (!this[IS_COMPONENT_UPDATING]) {
          this[IS_COMPONENT_UPDATING] = true;
          this[TEMPLATE_KEY_SYMBOL].update(this, this[PARENT_KEY_SYMBOL]);
        }
        this[ON_UPDATED_KEY](this[PROPS_KEY], this[STATE_KEY]);
        this[IS_COMPONENT_UPDATING] = false;
        return this;
      },
      unmount(preserveRoot) {
        this[ON_BEFORE_UNMOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
        this[ATTRIBUTES_KEY_SYMBOL].unmount();
        this[TEMPLATE_KEY_SYMBOL].unmount(this, this[PARENT_KEY_SYMBOL], preserveRoot === null ? null : !preserveRoot);
        this[ON_UNMOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
        return this;
      }
    })), Object.keys(component2).filter((prop) => isFunction(component2[prop])));
  }

  // node_modules/riot/esm/core/instantiate-component.js
  function instantiateComponent(_ref) {
    let {
      css,
      template,
      componentAPI,
      name
    } = _ref;
    if (css && name)
      cssManager.add(name, css);
    return curry(manageComponentLifecycle)(defineProperties(
      // set the component defaults without overriding the original component API
      defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, {
        [PROPS_KEY]: {},
        [STATE_KEY]: {}
      })),
      Object.assign({
        // defined during the component creation
        [SLOTS_KEY]: null,
        [ROOT_KEY]: null
      }, COMPONENT_DOM_SELECTORS, {
        name,
        css,
        template
      })
    ));
  }

  // node_modules/riot/esm/core/create-component-from-wrapper.js
  function createChildrenComponentsObject(components) {
    if (components === void 0) {
      components = {};
    }
    return Object.entries(callOrAssign(components)).reduce((acc, _ref) => {
      let [key, value] = _ref;
      acc[camelToDashCase(key)] = createComponentFromWrapper(value);
      return acc;
    }, {});
  }
  var createChildComponentGetter = (componentWrapper) => {
    const childrenComponents = createChildrenComponentsObject(componentWrapper.exports ? componentWrapper.exports.components : {});
    return (name) => {
      if (name === componentWrapper.name)
        return memoizedCreateComponentFromWrapper(componentWrapper);
      return childrenComponents[name] || COMPONENTS_IMPLEMENTATION_MAP.get(name);
    };
  };
  var memoizedCreateComponentFromWrapper = memoize(createComponentFromWrapper);
  function createComponentFromWrapper(componentWrapper) {
    const {
      css,
      template,
      exports,
      name
    } = componentWrapper;
    const templateFn = template ? componentTemplateFactory(template, componentWrapper, createChildComponentGetter(componentWrapper)) : MOCKED_TEMPLATE_INTERFACE;
    return (_ref2) => {
      let {
        slots,
        attributes,
        props
      } = _ref2;
      if (exports && exports[IS_PURE_SYMBOL])
        return createPureComponent(exports, {
          slots,
          attributes,
          props,
          css,
          template
        });
      const componentAPI = callOrAssign(exports) || {};
      const component2 = instantiateComponent({
        css,
        template: templateFn,
        componentAPI,
        name
      })({
        slots,
        attributes,
        props
      });
      return {
        mount(element, parentScope, state) {
          return component2.mount(element, state, parentScope);
        },
        update(parentScope, state) {
          return component2.update(state, parentScope);
        },
        unmount(preserveRoot) {
          return component2.unmount(preserveRoot);
        }
      };
    };
  }

  // node_modules/riot/esm/api/register.js
  function register(name, _ref) {
    let {
      css,
      template,
      exports
    } = _ref;
    if (COMPONENTS_IMPLEMENTATION_MAP.has(name))
      panic(`The component "${name}" was already registered`);
    COMPONENTS_IMPLEMENTATION_MAP.set(name, createComponentFromWrapper({
      name,
      css,
      template,
      exports
    }));
    return COMPONENTS_IMPLEMENTATION_MAP;
  }

  // node_modules/riot/esm/api/unregister.js
  function unregister(name) {
    if (!COMPONENTS_IMPLEMENTATION_MAP.has(name))
      panic(`The component "${name}" was never registered`);
    COMPONENTS_IMPLEMENTATION_MAP.delete(name);
    cssManager.remove(name);
    return COMPONENTS_IMPLEMENTATION_MAP;
  }

  // node_modules/riot/esm/core/mount-component.js
  function mountComponent(element, initialProps, componentName, slots) {
    const name = componentName || getName(element);
    if (!COMPONENTS_IMPLEMENTATION_MAP.has(name))
      panic(`The component named "${name}" was never registered`);
    const component2 = COMPONENTS_IMPLEMENTATION_MAP.get(name)({
      props: initialProps,
      slots
    });
    return component2.mount(element);
  }

  // node_modules/riot/esm/api/mount.js
  function mount(selector, initialProps, name) {
    return $(selector).map((element) => mountComponent(element, initialProps, name));
  }

  // node_modules/riot/esm/api/unmount.js
  function unmount(selector, keepRootElement) {
    return $(selector).map((element) => {
      if (element[DOM_COMPONENT_INSTANCE_PROPERTY]) {
        element[DOM_COMPONENT_INSTANCE_PROPERTY].unmount(keepRootElement);
      }
      return element;
    });
  }

  // node_modules/riot/esm/api/install.js
  function install(plugin) {
    if (!isFunction(plugin))
      panic("Plugins must be of type function");
    if (PLUGINS_SET.has(plugin))
      panic("This plugin was already installed");
    PLUGINS_SET.add(plugin);
    return PLUGINS_SET;
  }

  // node_modules/riot/esm/api/uninstall.js
  function uninstall(plugin) {
    if (!PLUGINS_SET.has(plugin))
      panic("This plugin was never installed");
    PLUGINS_SET.delete(plugin);
    return PLUGINS_SET;
  }

  // node_modules/riot/esm/node_modules/cumpa/index.next.js
  function compose() {
    for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      fns[_key2] = arguments[_key2];
    }
    return fns.reduce((f, g) => function() {
      return f(g(...arguments));
    });
  }

  // node_modules/riot/esm/api/component.js
  function component(implementation) {
    return function(el, props, _temp) {
      let {
        slots,
        attributes,
        parentScope
      } = _temp === void 0 ? {} : _temp;
      return compose((c) => c.mount(el, parentScope), (c) => c({
        props,
        slots,
        attributes
      }), createComponentFromWrapper)(implementation);
    };
  }

  // node_modules/riot/esm/api/pure.js
  function pure(func) {
    if (!isFunction(func))
      panic('riot.pure accepts only arguments of type "function"');
    func[IS_PURE_SYMBOL] = true;
    return func;
  }

  // node_modules/riot/esm/api/with-types.js
  var withTypes = (component2) => component2;

  // node_modules/riot/esm/api/version.js
  var version = "v7.1.0";

  // node_modules/riot/esm/api/__.js
  var __ = {
    cssManager,
    DOMBindings: {
      template: create,
      createBinding: create$1,
      createExpression: create$4,
      bindingTypes,
      expressionTypes
    },
    globals: {
      DOM_COMPONENT_INSTANCE_PROPERTY,
      PARENT_KEY_SYMBOL
    }
  };

  // src/util.js
  var util_exports = {};
  __export(util_exports, {
    createProxy: () => createProxy,
    destruct: () => destruct,
    implementEventTarget: () => implementEventTarget,
    importOptions: () => importOptions,
    int2hex: () => int2hex,
    loadWasm: () => loadWasm,
    sleep: () => sleep
  });
  function importOptions(obj, options2, default_values) {
    Object.keys(default_values).forEach((k) => {
      if (options2.hasOwnProperty(k)) {
        obj[k] = isNaN(options2[k]) ? options2[k] : Number(options2[k]);
      } else {
        obj[k] = default_values[k];
      }
    });
    return obj;
  }
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function loadWasm(wasmFile) {
    let obj = await WebAssembly.instantiateStreaming(fetch(wasmFile), {});
    let wasm2 = Object.assign({}, obj.instance.exports);
    const finalizer = new FinalizationRegistry((pointer) => {
      if (Array.isArray(pointer)) {
        for (let p of pointer)
          wasm2.free(p);
      } else {
        wasm2.free(pointer);
      }
    });
    let heap = {};
    heap.u32 = new Uint32Array(wasm2.memory.buffer);
    heap.i32 = new Int32Array(wasm2.memory.buffer);
    heap.u16 = new Uint16Array(wasm2.memory.buffer);
    heap.i16 = new Int16Array(wasm2.memory.buffer);
    heap.u8c = new Uint8ClampedArray(wasm2.memory.buffer);
    heap.u8 = new Uint8Array(wasm2.memory.buffer);
    heap.i8 = new Int8Array(wasm2.memory.buffer);
    heap.i64 = new BigInt64Array(wasm2.memory.buffer);
    heap.u64 = new BigUint64Array(wasm2.memory.buffer);
    heap.f32 = new Float32Array(wasm2.memory.buffer);
    heap.f64 = new Float64Array(wasm2.memory.buffer);
    for (let key of Object.keys(heap)) {
      heap[key].alloc = (n) => {
        const _Class = heap[key].constructor;
        let ptr;
        try {
          ptr = wasm2.malloc(_Class.BYTES_PER_ELEMENT * n);
        } catch {
          ptr = null;
        }
        if (!ptr) {
          alert("out of memory");
          throw new Error("out of memory");
        }
        const mem = new _Class(wasm2.memory.buffer, ptr, n);
        mem.ptr = mem.byteOffset;
        finalizer.register(mem, mem.ptr);
        mem.free = () => {
          finalizer.unregister(mem);
          wasm2.free(mem.ptr);
        };
        return mem;
      };
    }
    return Object.assign(wasm2, heap);
  }
  function destruct(obj) {
    if (obj && obj.destructor)
      obj.destructor();
  }
  function implementEventTarget(obj) {
    const eventTarget = new EventTarget();
    obj.addEventListener = (...args) => eventTarget.addEventListener(...args);
    obj.removeEventListener = (...args) => eventTarget.removeEventListener(...args);
    obj.dispatchEvent = (event, detail_content) => eventTarget.dispatchEvent(new CustomEvent(event, { detail: detail_content }));
  }
  function createProxy(obj, updateFunc) {
    let proxy = {};
    for (let k of Object.keys(obj)) {
      Object.defineProperty(proxy, k, {
        get() {
          return obj[k];
        },
        set(v) {
          updateFunc(obj, Object.fromEntries([[k, v]]));
        }
      });
    }
    return proxy;
  }
  function int2hex(i) {
    return ("000" + ((i | 0) >>> 16 & 65535).toString(16)).slice(-4) + ("000" + ((i | 0) & 65535).toString(16)).slice(-4);
  }

  // src/canvas-renderer.js
  var CanvasRenderer = class {
    constructor(canvas, render, onrecorded) {
      this.canvas = canvas;
      this.render = render;
      this.minPeriod = 50;
      this.requestID = null;
      this.recoder = null;
      this.onrecorded = onrecorded;
      this.requestStop = false;
      this.averagePeriod = 1;
    }
    get fps() {
      return 1e3 / this.averagePeriod;
    }
    get maxFps() {
      return 1e3 / this.minPeriod;
    }
    set maxFps(v) {
      if (v > 0) {
        this.minPeriod = 1e3 / v;
      } else {
        this.minPeriod = 0;
      }
    }
    start() {
      this.requestStop = false;
      if (!this.requestID)
        this.requestID = window.requestAnimationFrame((ts) => this.frame(ts));
    }
    stop() {
      if (this.requestID != null)
        window.cancelAnimationFrame(this.requestID);
      this.requestStop = true;
      this.requestID = null;
    }
    startRecording() {
      const chunks = [];
      const stream = this.canvas.captureStream();
      this.rec = new MediaRecorder(stream);
      this.rec.ondataavailable = (e) => chunks.push(e.data);
      this.rec.onstop = () => this.onrecorded(new Blob(chunks, { type: "video/webm" }));
      this.rec.start();
    }
    stopRecording() {
      this.rec.stop();
      this.rec = null;
    }
    cancelRecording() {
      this.rec.onstop = null;
      this.stopRecording();
    }
    async frame(ts) {
      if (this.requestStop)
        return this.requestID = null;
      const period = ts - (this.last_ts || ts - 10);
      this.last_ts = ts;
      if (this.minPeriod > 0 && period < this.minPeriod) {
        await util.sleep(this.minPeriod - period);
        this.averagePeriod = this.averagePeriod * 0.95 + this.minPeriod * 0.05;
      } else {
        this.averagePeriod = this.averagePeriod * 0.95 + period * 0.05;
      }
      if (this.requestStop)
        return this.requestID = null;
      this.render(ts, this.canvas);
      this.requestID = window.requestAnimationFrame((ts2) => this.frame(ts2));
    }
  };

  // src/interaction-sets.js
  var interactionSets = {
    // デフォルト
    "": (interaction, rand) => interaction.set((i, j) => i == j ? [
      // 同種粒子
      -(1e-3 + 5e-4 * rand.next()),
      // param_a = 近距離
      1e-3 * (rand.next() - 0.5)
      // param_b = 長距離
    ] : [
      // 異種粒子
      -(5e-4 + 5e-4 * rand.next()),
      // param_a = 近距離
      1e-3 * (rand.next() - 0.5)
      // param_b = 長距離
    ]),
    // 多粒子種補正
    // 異種間相互作用を疎結合にしている
    "A": (interaction, rand) => interaction.set((i, j) => i == j ? [
      // 同種粒子
      -(1e-3 + 5e-4 * rand.next()),
      // param_a = 近距離
      1e-3 * (rand.next() - 0.5)
      // param_b = 長距離
    ] : [
      // 異種粒子
      -(1e-3 + 5e-4 * rand.next()),
      // param_a = 近距離
      1e-3 * rand.next() ** 6 * (rand.next() > 0.7 ? 1 : -1)
      // param_b = 長距離
    ]),
    // 多粒子種補正２
    // 異種間相互作用を疎結合にしている（A では倍率を間違えていた）
    "B": (interaction, rand) => interaction.set((i, j) => i == j ? [
      // 同種粒子
      -(1e-3 + 5e-4 * rand.next()),
      // param_a = 近距離
      1e-3 * (rand.next() - 0.5)
      // param_b = 長距離
    ] : [
      // 異種粒子
      -(1e-3 + 5e-4 * rand.next()),
      // param_a = 近距離
      5e-4 * rand.next() ** 6 * (rand.next() > 0.7 ? 1 : -1)
      // param_b = 長距離
    ])
  };

  // src/color-scale.js
  var ColorScale = class {
    constructor(mapping) {
      mapping ||= [
        // grayscale
        [0, 0, 0, 0],
        [1, 255, 255, 255]
      ];
      this.mapping = mapping;
    }
    static rgb2str(r, g, b2) {
      [r, g, b2] = [r, g, b2].map((x) => Math.round(x));
      const hex = (x) => ("0" + x.toString(16)).slice(-2);
      return "#" + hex(r) + hex(g) + hex(b2);
    }
    static hsl2rgb(h, s, l) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(h * 6 % 2 - 1));
      const m = l - c / 2;
      let r, g, b2;
      if (h * 6 < 1) {
        r = c;
        g = x;
        b2 = 0;
      } else if (h * 6 < 2) {
        r = x;
        g = c;
        b2 = 0;
      } else if (h * 6 < 3) {
        r = 0;
        g = c;
        b2 = x;
      } else if (h * 6 < 4) {
        r = 0;
        g = x;
        b2 = c;
      } else if (h * 6 < 5) {
        r = x;
        g = 0;
        b2 = c;
      } else {
        r = c;
        g = 0;
        b2 = x;
      }
      return [(r + m) * 255, (g + m) * 255, (b2 + m) * 255];
    }
    color(x) {
      const { mapping } = this;
      x = Math.max(0, Math.min(1, x));
      let i = mapping.findIndex((entry) => x <= entry[0]);
      if (i == 0) {
        return ColorScale.rgb2str(mapping[0][1], mapping[0][2], mapping[0][3]);
      }
      let r = (x - mapping[i - 1][0]) / (mapping[i][0] - mapping[i - 1][0]);
      return ColorScale.rgb2str(
        mapping[i - 1][1] * (1 - r) + mapping[i][1] * r,
        mapping[i - 1][2] * (1 - r) + mapping[i][2] * r,
        mapping[i - 1][3] * (1 - r) + mapping[i][3] * r
      );
    }
  };
  var colorScaleList = [
    new ColorScale([
      // rainbow
      [0 / 6, ...ColorScale.hsl2rgb(0 / 6, 1, 0.5)],
      [1 / 6, ...ColorScale.hsl2rgb(1 / 6, 1, 0.5)],
      [2 / 6, ...ColorScale.hsl2rgb(2 / 6, 1, 0.5)],
      [3 / 6, ...ColorScale.hsl2rgb(3 / 6, 1, 0.5)],
      [4 / 6, ...ColorScale.hsl2rgb(4 / 6, 1, 0.5)],
      [5 / 6, ...ColorScale.hsl2rgb(5 / 6, 1, 0.5)],
      [6 / 6, ...ColorScale.hsl2rgb(6 / 6, 1, 0.5)]
    ]),
    new ColorScale([
      // heat
      [0 / 4, 0, 255, 255],
      [1 / 4, 0, 0, 192],
      [2 / 4, 0, 0, 0],
      [3 / 4, 192, 0, 0],
      [4 / 4, 255, 255, 0]
    ]),
    new ColorScale([
      // heat2
      [0 / 4, 0, 255, 255],
      [1 / 4, 0, 0, 192],
      [2 / 4, 255, 255, 255],
      [3 / 4, 192, 0, 0],
      [4 / 4, 255, 255, 0]
    ]),
    new ColorScale([
      // rainbow light
      [0 / 6, ...ColorScale.hsl2rgb(0 / 6, 1, 0.3)],
      [1 / 6, ...ColorScale.hsl2rgb(1 / 6, 1, 0.3)],
      [2 / 6, ...ColorScale.hsl2rgb(2 / 6, 1, 0.3)],
      [3 / 6, ...ColorScale.hsl2rgb(3 / 6, 1, 0.3)],
      [4 / 6, ...ColorScale.hsl2rgb(4 / 6, 1, 0.3)],
      [5 / 6, ...ColorScale.hsl2rgb(5 / 6, 1, 0.3)],
      [6 / 6, ...ColorScale.hsl2rgb(6 / 6, 1, 0.3)]
    ]),
    new ColorScale([
      // rainbow dark
      [0 / 6, ...ColorScale.hsl2rgb(0 / 6, 1, 0.7)],
      [1 / 6, ...ColorScale.hsl2rgb(1 / 6, 1, 0.7)],
      [2 / 6, ...ColorScale.hsl2rgb(2 / 6, 1, 0.7)],
      [3 / 6, ...ColorScale.hsl2rgb(3 / 6, 1, 0.7)],
      [4 / 6, ...ColorScale.hsl2rgb(4 / 6, 1, 0.7)],
      [5 / 6, ...ColorScale.hsl2rgb(5 / 6, 1, 0.7)],
      [6 / 6, ...ColorScale.hsl2rgb(6 / 6, 1, 0.7)]
    ])
  ];

  // src/pl-species-distribution.js
  var PLSpeciesDistribution2 = class {
    // 確率分布を既存の粒子数あるいは乱数から作成
    constructor(nspecies, particles_or_rand) {
      this.distribution = Array(nspecies);
      if (particles_or_rand.constructor.name == "PLParticles") {
        let particles = particles_or_rand;
        for (let i = 0; i < particles.n; i++) {
          let sp = particles.get(i)[0];
          this.distribution[sp] = 1 + (this.distribution[sp] || 0);
        }
      } else {
        let rand = particles_or_rand;
        for (let i = 0; i < nspecies; i++) {
          for (let j = 0; j < 5; j++) {
            this.distribution[i] = rand.next() + (this.distribution[i] || 0);
          }
        }
      }
      this.update();
    }
    ratio(sp) {
      return this.distribution[sp] / this.sum;
    }
    // distribution から accumulation を作る
    update() {
      this.sum = 0;
      this.accumulation = this.distribution.map((d) => this.sum += d).map((d) => d / this.sum);
    }
    // [0, 1) の一様乱数 r を粒子種に変換する
    species(r) {
      return this.accumulation.findIndex((elem) => r <= elem);
    }
  };

  // src/pl-interaction-matrix.js
  var PLInteractionMatrix = class {
    constructor(world2) {
      this.update(world2);
    }
    update(world2) {
      this.world = world2;
      this.matrix = [...Array(world2.nspecies)].map(() => [...Array(world2.nspecies)].map(() => [0, 0]));
      let len = 3 * world2.nspecies * world2.nspecies * 2;
      if (!this.mem) {
        this.mem = wasm.i32.alloc(len * 4);
      } else if (this.mem.length < len) {
        let size = Math.max(this.mem.length * 4, len);
        this.mem.free;
        this.mem = wasm.i32.alloc(size);
      }
    }
    // 手動で後始末をする場合に呼ぶ関数
    destructor() {
      this.mem.free;
    }
    set(func_or_i, j, a2, b2) {
      if (func_or_i && typeof func_or_i === "function") {
        const func = func_or_i;
        for (let i = 0; i < this.world.nspecies; i++)
          for (let j2 = 0; j2 < this.world.nspecies; j2++)
            this.set(i, j2, ...func(i, j2));
      } else {
        const i = func_or_i;
        this.matrix[i][j] = [a2, b2];
        this.convert(i, j);
      }
    }
    // return [a, b]
    get(i, j) {
      return this.matrix[i][j];
    }
    convert(i, j) {
      const [a2, b2] = this.matrix[i][j];
      const world2 = this.world;
      const n = world2.nspecies;
      let aa = a2 / world2.rth1;
      let bb = b2 / (world2.rth2 - world2.rth1);
      let cc = b2 / (world2.rmax - world2.rth2);
      aa *= world2.step * world2.scale * 2 ** 32;
      bb *= world2.step * world2.scale * 2 ** 32;
      cc *= world2.step * world2.scale * 2 ** 32;
      this.mem[3 * (i * n * 2 + j) + 0] = aa;
      this.mem[3 * (i * n * 2 + j) + 1] = bb;
      this.mem[3 * (i * n * 2 + j) + 2] = cc;
      this.mem[3 * (j * n * 2 + i + n) + 0] = aa;
      this.mem[3 * (j * n * 2 + i + n) + 1] = bb;
      this.mem[3 * (j * n * 2 + i + n) + 2] = cc;
    }
    convertAll() {
      for (let i = 0; i < this.world.nspecies; i++)
        for (let j = 0; j < this.world.nspecies; j++)
          this.convert(i, j);
    }
    copyFrom(another) {
      if (this.world.nspecies != another.world.nspecies)
        return;
      for (let i = 0; i < this.world.nspecies; i++)
        for (let j = 0; j < this.world.nspecies; j++)
          this.set(i, j, ...another.get(i, j));
    }
  };

  // src/pl-particles.js
  var PLParticles = class {
    constructor(nparticles) {
      this.update(nparticles);
    }
    update(nparticles) {
      this.n = Math.floor(nparticles);
      let len = (6 + 2) * nparticles + 2;
      if (!this.mem) {
        this.mem = wasm.i32.alloc(len * 4);
        this.memVertices = new Int16Array(5 * nparticles * 4 * 4);
      } else if (this.mem.length < len) {
        let size = Math.max(this.mem.length * 4, len);
        this.mem.free;
        this.mem = wasm.i32.alloc(size);
        this.memVertices = new Int16Array(5 * size / 8 * 4 * 4);
      }
    }
    destructor() {
      this.mem.free;
    }
    // x, y は [-0.5, 0.5) の範囲
    set(i, species, x, y, vx, vy) {
      if (i < 0 || this.n <= i)
        return;
      this.mem[6 * i + 0] = species;
      this.mem[6 * i + 2] = x * 2 ** 32;
      this.mem[6 * i + 3] = y * 2 ** 32;
      this.mem[6 * i + 4] = vx * 2 ** 32;
      this.mem[6 * i + 5] = vy * 2 ** 32;
    }
    // x, y は [-0.5, 0.5) の範囲
    // returns [species, x, y, vx, vy]
    get(i) {
      if (i < 0 || this.n <= i)
        return;
      return [
        this.mem[6 * i + 0],
        this.mem[6 * i + 2] / 2 ** 32,
        // 整数演算用スケールを戻す
        this.mem[6 * i + 3] / 2 ** 32,
        this.mem[6 * i + 4] / 2 ** 32,
        this.mem[6 * i + 5] / 2 ** 32
      ];
    }
    // x, y は [-0.5, 0.5) の範囲
    // calls func(species, x, y)
    forEach(func) {
      for (let i = 0; i < this.n; i++)
        func(
          this.mem[6 * i + 0],
          // species
          this.mem[6 * i + 2] / 2 ** 32,
          // x
          this.mem[6 * i + 3] / 2 ** 32
          // y
        );
    }
    // 一周回って反対側に現れる点は複数登録する
    vertices(palette, psize) {
      const v = this.memVertices;
      const n = this.n;
      const mem = this.mem;
      psize *= 65536;
      let j = 0;
      for (let i = 0; i < n; i++) {
        const px = mem[6 * i + 2] >>> 16;
        const py = mem[6 * i + 3] >>> 16;
        const c = palette[mem[6 * i + 0]];
        const register2 = (_px, _py) => {
          v[5 * j] = +_px / 2 - 32768 / 2;
          v[5 * j + 1] = (65536 - _py) / 2 - 32768 / 2;
          v[5 * j + 2] = c[0] * 127;
          v[5 * j + 3] = c[1] * 127;
          v[5 * j + 4] = c[2] * 127;
          j++;
        };
        const register3 = (_px, _py) => {
          register2(_px, _py);
          if (_py < psize)
            register2(_px, _py + 65536);
          if (_py > 65536 - psize)
            register2(_px, _py - 65536);
        };
        register3(px, py);
        if (px < psize)
          register3(px + 65536, py);
        if (px > 65536 - psize)
          register3(px - 65536, py);
      }
      return [v, j];
    }
  };

  // src/particle-life.js
  var ParticleLife = class {
    constructor(options2 = {}, rand) {
      this.update(options2, rand);
    }
    update(options2, rand = this.rand) {
      util.importOptions(this, options2, {
        nspecies: 6,
        nlattice: 30,
        rth1: 0.05,
        rth2: 0.1,
        rmax: 0.2,
        perterb: 1e-3,
        decel: 0.499,
        scale: 1,
        step: 1,
        row_div: 1
      });
      this.rand = rand;
      this.nparticles = this.nlattice * this.nlattice;
      if (!this.interaction) {
        this.interaction = new PLInteractionMatrix(this);
      } else {
        this.interaction.update(this);
      }
      if (!this.particles) {
        this.particles = new PLParticles(this.nparticles);
      } else {
        this.particles.update(this.nparticles);
      }
      let ncol = Math.floor(2 ** 32 / Math.round(this.rmax / this.scale * 2 ** 32));
      if (ncol <= 2)
        ncol = 1;
      let nrow = ncol * this.row_div;
      let len = 8 + (ncol * nrow + 1 + this.row_div + 1) * 4;
      if (!this.mem) {
        this.mem = wasm.i32.alloc(len * 4);
      } else if (this.mem.length < len) {
        let size = Math.max(this.mem.length * 4, len);
        this.mem.free;
        this.mem = wasm.i32.alloc(size);
      }
      this.mem[0] = this.nspecies;
      this.mem[1] = this.nparticles;
      this.mem[2] = this.rth1 / this.scale * 2 ** 32;
      this.mem[3] = this.rth2 / this.scale * 2 ** 32;
      this.mem[4] = this.rmax / this.scale * 2 ** 32;
      this.mem[5] = this.perterb / this.scale * 2 ** 32;
      this.mem[6] = this.decel * 2 ** 32;
      this.mem[7] = this.row_div;
    }
    destructor() {
      this.mem.free;
      util.destruct(this.rand);
      util.destruct(this.interaction);
      util.destruct(this.particles);
    }
    // 粒子配置の初期設定
    setupParticles(func) {
      for (let i = 0; i < this.nlattice; i++) {
        for (let j = 0; j < this.nlattice; j++) {
          this.particles.set(i * this.nlattice + j, ...func(i, j));
        }
      }
    }
    // 粒子同士の相互作用を計算して vx, vy を更新する
    interactParticles() {
      wasm.interactParticles(
        this.mem.ptr,
        this.interaction.mem.ptr,
        this.particles.mem.ptr
      );
    }
    // 斥力効果を及ぼす
    repelParticles(repelX, repelY) {
      if (isNaN(repelX) || isNaN(repelY))
        return;
      for (let i = 0; i < this.nparticles; i++) {
        let [species, x, y, vx, vy] = this.particles.get(i);
        let dx = x - repelX;
        dx -= Math.round(dx);
        let dy = y - repelY;
        dy -= Math.round(dy);
        let d = Math.hypot(dx, dy);
        if (d < 0.2) {
          if (d < 0.1) {
            vx += 0.05 * dx / d;
            vy += 0.05 * dy / d;
          } else {
            vx += 0.05 * (d - 0.1) * dx / d;
            vy += 0.05 * (d - 0.1) * dy / d;
          }
          this.particles.set(i, species, x, y, vx, vy);
        }
      }
    }
    // 粒子を動かす
    moveParticles() {
      wasm.moveParticles(
        this.mem.ptr,
        this.rand.mem.ptr,
        this.particles.mem.ptr
      );
    }
  };

  // src/xorshift128.js
  var XorShift128 = class {
    constructor(seed = Math.random() * 2 ** 53, n = 1e3) {
      this.mem = wasm.i32.alloc(4);
      this.mem[3] = seed / 2 ** 96 & 4294967295;
      this.mem[2] = seed / 2 ** 64 & 4294967295;
      this.mem[1] = seed / 2 ** 32 & 4294967295;
      this.mem[0] = seed & 4294967295;
      for (let i = 0; i < n; i++)
        this.next();
    }
    // 手動で後始末をする場合に呼ぶ関数
    destructor() {
      this.mem.free;
    }
    // 次の乱数値を得る
    next() {
      return wasm.XorShift128Next(this.mem.ptr);
    }
  };

  // obj/riot_tags.js
  var t1 = {
    css: null,
    exports: {
      setInnerHTML() {
        this.root.innerHTML = this.props.html;
      },
      onMounted() {
        this.setInnerHTML();
      },
      onUpdated() {
        this.setInnerHTML();
      }
    },
    template: null,
    name: "raw"
  };
  var t2 = {
    css: `particles-display,[is="particles-display"]{ line-height: 1; } particles-display > div,[is="particles-display"] > div{ margin: 0px; } particles-display canvas,[is="particles-display"] canvas{ touch-action: none; margin: 0px; max-width: var(--100vw); } @media screen and (max-width: 640px) { particles-display canvas,[is="particles-display"] canvas{ margin-left: -0.75rem; margin-right: -0.75rem; } } @media screen and (min-width: 1000px) { particles-display canvas,[is="particles-display"] canvas{ min-width: 600px; } }`,
    exports: {
      onMounted() {
        this.state = {
          repelX: NaN,
          repelY: NaN,
          offsetX: 0,
          offsetY: 0,
          tail: 0,
          particleSize: 2.5
        };
        this.initializeRequired = true;
        let canvas = this.$("canvas");
        this.buffer = canvas.cloneNode();
        this.buffer.width = this.buffer.width * 2;
        this.buffer.height = this.buffer.height * 2;
        this.buffer2 = canvas.cloneNode();
        const mouse2xy = (mouseX, mouseY) => {
          let x = mouseX / canvas.clientWidth + this.state.offsetX;
          let y = mouseY / canvas.clientHeight + this.state.offsetY;
          return [x - Math.round(x), y - Math.round(y)];
        };
        let canvasTapCount = 0;
        let mouseDoubleDown = false;
        this.defineDragBehavior(canvas, {
          down: (e, x, y) => {
            if (canvasTapCount == 0) {
              canvasTapCount++;
              setTimeout(() => {
                canvasTapCount = 0;
              }, 350);
            } else {
              canvasTapCount = 0;
              mouseDoubleDown = true;
              [this.state.repelX, this.state.repelY] = mouse2xy(x, y);
            }
          },
          move: (e, mouseDown, newX2, newY2, oldX, oldY) => {
            if (mouseDown) {
              if (!mouseDoubleDown) {
                const [dx, dy] = [newX2 - oldX, newY2 - oldY];
                this.state.offsetX -= dx / canvas.width;
                this.state.offsetX -= Math.round(this.state.offsetX);
                this.state.offsetY -= dy / canvas.height;
                this.state.offsetY -= Math.round(this.state.offsetY);
                this.render();
              } else {
                [this.state.repelX, this.state.repelY] = mouse2xy(newX2, newY2);
              }
            }
          },
          up: (e, x, y) => {
            mouseDoubleDown = false;
            [this.state.repelX, this.state.repelY] = [NaN, NaN];
          }
        });
      },
      onUpdated(props, state) {
        const screens = {
          XS: 400,
          S: 600,
          M: 900,
          L: 1200,
          XL: 1500
        };
        let size = screens[this.state.screen];
        let canvas = this.$("canvas");
        if (canvas && canvas.width != size) {
          [canvas.width, canvas.height] = [this.buffer2.width, this.buffer2.height] = [size, size];
          [this.buffer.width, this.buffer.height] = [size * 2, size * 2];
          this.initializeRequired = true;
        }
        this.render();
      },
      // WebGL が使えない場合の通常の描画
      render_2d(g, world2, colorFunc2) {
        let canvas = this.$("canvas");
        g.scale(canvas.width, canvas.height);
        g.translate(0.5, 0.5);
        const n = world2.nspecies;
        const palette = [...Array(n)].map((_, i) => colorFunc2(i / n));
        let size = this.calcParticleSize();
        const r = size / canvas.width / 2;
        g.globalCompositeOperation = "screen";
        world2.particles.forEach((sp, x, y) => {
          const draw2 = (_x, _y) => {
            g.beginPath();
            g.fillStyle = palette[sp];
            g.arc(_x, _y, r, 0, 2 * Math.PI);
            g.fill();
          };
          const draw = (_x, _y) => {
            draw2(_x, _y);
            if (_y < -0.5 + r)
              draw2(_x, _y + 1);
            if (_y > 0.5 - r)
              draw2(_x, _y - 1);
          };
          x += 0.5;
          x -= Math.round(x);
          y += 0.5;
          y -= Math.round(y);
          draw(x, y);
          if (x < -0.5 + r)
            draw(x + 1, y);
          if (x > 0.5 - r)
            draw(x - 1, y);
        });
      },
      // 粒子サイズは画面サイズ相対にしておく
      calcParticleSize() {
        return this.state.particleSize / 600 * this.$("canvas").width;
      },
      // WebGL の初期化
      initialize_gl(gl) {
        var vshaderSrc = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform float u_point_size;
        varying vec4 v_color;
        void main(void) {
          gl_Position = a_position;
          gl_PointSize = u_point_size;
          v_color = a_color;
        }
      `;
        var vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vshaderSrc);
        gl.compileShader(vshader);
        var fshaderSrc = `
        precision mediump float;
        uniform sampler2D u_texture;
        uniform int       u_use_texture;
        varying vec4      v_color;
        void main(void) {
          vec4 c = vec4(1.0);
          if(bool(u_use_texture)) {
            c = texture2D(u_texture, gl_PointCoord);
          }
          if(c.a == 0.0) {
            discard;
          } else {
            gl_FragColor = v_color * c;
          }
        }
      `;
        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fshaderSrc);
        gl.compileShader(fshader);
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vshader);
        gl.attachShader(shaderProgram, fshader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        gl.program = shaderProgram;
        let vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        let size = 2;
        let a_position = gl.getAttribLocation(gl.program, "a_position");
        gl.vertexAttribPointer(a_position, 2, gl.SHORT, true, size * 5, 0);
        gl.enableVertexAttribArray(a_position);
        let a_color = gl.getAttribLocation(gl.program, "a_color");
        gl.vertexAttribPointer(a_color, 3, gl.SHORT, true, size * 5, size * 2);
        gl.enableVertexAttribArray(a_color);
        gl.viewport(0, 0, this.buffer.width, this.buffer.height);
        let u_texture = gl.getUniformLocation(gl.program, "u_texture");
        gl.uniform1i(u_texture, 0);
        let u_use_texture = gl.getUniformLocation(gl.program, "u_use_texture");
        gl.uniform1i(u_use_texture, false);
        var img = new Image();
        img.onload = function(e) {
          let texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.bindTexture(gl.TEXTURE_2D, null);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.uniform1i(u_use_texture, true);
        };
        img.src = `data:image/png;base64,
          iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABJklEQVRYw82X
          oW4CQRRFz5sGV9O0+PYLUFiyGsVH9GtQWJJqPqFqFbYGvgB8SxBULSUXwSOp
          IM22XebtsZPZeyc77819Rk0k3QNDYAD0gCfgzpe3wApYAnPg1cw2NIGkvqSp
          pJ3qs/M9/f8IdyWNJVX6O5V/o/tb8UJSqeYoJRV1xUeSFmqehaRRnZNfQ/y7
          ieKnf17q+pQX74RfllyML5ValdFAdS7R5B6egQ756Lgm5h1uDdySl0/gMXl7
          zS2Oaw6T9/YoBskflih6JukdeAgy8GGSvoCbIAOHRDDJw0QU2+RJJopV8hgV
          xTJ5hotiHt+KPb3OAk4/M7PNuQxfgH1G8b1rnp5jM3sDJhkNTFyzRZEsPJS2
          Ipa3YjBpxWiWczi16PH8CAvfPn83UHV5AAAAAElFTkSuQmCC`;
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.bufferDataRequired = true;
      },
      // WebGL による描画
      render_gl(gl, world2, colorFunc2) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        let psize = this.calcParticleSize();
        let u_point_size = gl.getUniformLocation(gl.program, "u_point_size");
        gl.uniform1f(u_point_size, Number.parseFloat(psize) + 0.25);
        let palette = [...Array(world2.nspecies)].map((_, i) => {
          const c = colorFunc2(i / world2.nspecies);
          return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
        });
        const [vertices, nvertices] = world2.particles.vertices(palette, psize / this.buffer.width);
        if (gl.bufferDataRequired) {
          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
        } else {
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
        }
        gl.drawArrays(gl.POINTS, 0, nvertices);
      },
      // source を g のスクロール位置に描画する
      drawImageWithOffset(g, source) {
        const [w, h] = [source.width, source.height];
        const [dx, dy] = [-this.state.offsetX * w, -this.state.offsetY * h];
        const region = (sx, sy) => {
          const x1 = (w - dx) % w;
          const y1 = (h - dy) % h;
          const x2 = (dx + w) % w;
          const y2 = (dy + h) % h;
          return [Math.min(x1, sx ? 0 : w), Math.min(y1, sy ? 0 : h), Math.abs(x1 - (sx ? 0 : w)), Math.abs(y1 - (sy ? 0 : h)), Math.min(x2, sx ? w : 0), Math.min(y2, sy ? h : 0), Math.abs(x1 - (sx ? 0 : w)), Math.abs(y1 - (sy ? 0 : h))];
        };
        g.drawImage(source, ...region(0, 0));
        g.drawImage(source, ...region(1, 0));
        g.drawImage(source, ...region(0, 1));
        g.drawImage(source, ...region(1, 1));
      },
      // 描画する
      render() {
        world = this.world && this.world();
        colorFunc = this.colorFunc && this.colorFunc();
        if (!world || !colorFunc)
          return;
        const g2 = this.buffer2.getContext("2d");
        g2.setTransform(1, 0, 0, 1, 0, 0);
        let t = this.state.tail;
        if (t > 50) {
          this.tailCount = (this.tailCount || 0) + 50 / t;
          t = 50;
        } else {
          this.tailCount = 1;
        }
        if (this.tailCount >= 1) {
          let style = "#000000";
          if (t > 0) {
            style += ("0" + (255 / (1 + 1 * t) | 0).toString(16)).substr(-2);
          }
          g2.fillStyle = style;
          g2.globalCompositeOperation = "source-over";
          g2.fillRect(0, 0, this.buffer2.width, this.buffer2.height);
          g2.fillStyle = "#010101";
          g2.globalCompositeOperation = "difference";
          g2.fillRect(0, 0, this.buffer2.width, this.buffer2.height);
          this.tailCount -= 1;
        }
        let gl = this.buffer.getContext("webgl");
        const checkWebgl = document.getElementById("webgl");
        if (!gl || !checkWebgl.checked) {
          if (!gl) {
            checkWebgl.checked = "";
            checkWebgl.disabled = "disabled";
          }
          g2.globalCompositeOperation = "source-over";
          this.render_2d(g2, world, colorFunc);
          g2.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          if (this.initializeRequired) {
            this.initialize_gl(gl);
            this.initializeRequired = false;
          }
          this.render_gl(gl, world, colorFunc);
          g2.globalCompositeOperation = "source-over";
          let size = this.buffer2.width;
          g2.drawImage(
            this.buffer,
            size / 2,
            size / 2,
            size,
            size,
            // source
            0,
            0,
            size,
            size
          );
        }
        const canvas = this.$("canvas");
        const g = canvas.getContext("2d");
        this.drawImageWithOffset(g, this.buffer2);
      }
    },
    template: (template, expressionTypes2, bindingTypes2, getComponent) => template('<canvas expr2="expr2" id="particles-display"></canvas>', [{
      redundantAttribute: "expr2",
      selector: "[expr2]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "width",
        evaluate: (_scope) => _scope.props.width
      }, {
        type: expressionTypes2.ATTRIBUTE,
        name: "height",
        evaluate: (_scope) => _scope.props.height
      }]
    }]),
    name: "particles-display"
  };
  var t3 = {
    css: `plcontrols span.icon,[is="plcontrols"] span.icon{ margin: 0px -2px !important; } plcontrols .columns,[is="plcontrols"] .columns{ display: flex; max-width: var(--100vw); flex-wrap: wrap; } @media screen and (min-width: 420px) and (max-width: 640px) { plcontrols .columns,[is="plcontrols"] .columns{ padding-left: 0.5em; } } plcontrols .is-narrow,[is="plcontrols"] .is-narrow{ flex: none; width: unset; }`,
    exports: {
      onMounted() {
        util.implementEventTarget(this);
        this.default_state = {
          pause: false,
          recording: false,
          interact_seed: 2 ** 53 * Math.random(),
          world_seed: 2 ** 53 * Math.random(),
          nspecies: 6,
          nlattice: 30,
          scale: 3,
          tail: 0,
          maxfps: 60,
          step: 1,
          intset: "",
          perterb: 1e-3,
          screen: "S",
          particleSize: 4
        };
        this.state = Object.assign({}, this.default_state);
        this.recommendations.push(...this.props.recommendations);
        if (location.search) {
          this.setParameters(location.search);
        } else {
          let recom = this.recommendations.find((rec) => rec.length > 2)[1];
          this.setParameters(recom);
          this.$("#recommendation").value = recom;
        }
        this.flashControl(this.$("#recommendation"), "#ff3");
      },
      flashing: false,
      async flashControl(control, color) {
        if (this.flashing)
          return;
        this.flashing = true;
        const original = control.style.backgroundColor;
        for (let i = 0; i < 5; i++) {
          control.style.backgroundColor = color;
          await util.sleep(400);
          control.style.backgroundColor = original;
          await util.sleep(400);
        }
        this.flashing = false;
      },
      validatedState(randomize) {
        if (randomize) {
          this.update({
            interact_seed: 2 ** 53 * Math.random(),
            world_seed: 2 ** 53 * Math.random()
          });
        }
        let result = Object.assign({}, this.state);
        for (let k of Object.keys(this.state.validation.errors.errors)) {
          delete result[k];
        }
        delete result.validation;
        return result;
      },
      recommendations: [["\u81EA\u5206\u3067", "?"]],
      recommendationChange(e) {
        if (e.target.value != "?" && e.target.value) {
          let params = this.parseParameters(e.target.value);
          params.world_seed = 2 ** 53 * Math.random();
          params.interact_seed = 2 ** 53 * Math.random();
          this.update(params);
          this.dispatchEvent("restart", this.state);
        } else {
          this.update();
        }
        this.flashControl(document.getElementById("new-world"), "#880");
      },
      editorChanged(e) {
        let {
          id,
          value
        } = e.target;
        if (e.target.id == "perterb") {
          this.update({
            perterb: e.target.checked ? 1e-3 : 0
          });
        } else if (e.target.id == "scale") {
          this.update({
            scale: value,
            step: Math.round(this.state.step * this.state.scale / value * 1e3) / 1e3
          });
        } else {
          this.update(Object.fromEntries([[id, value]]));
        }
        if (["nspecies", "nlattice", "scale", "intset", "step"].includes(e.target.id))
          this.dispatchEvent("restart", this.state);
      },
      regenerateInteractionSeed() {
        this.update({
          interact_seed: 2 ** 53 * Math.random()
        });
        this.dispatchEvent("restart", this.state);
      },
      regenerateWorldSeed() {
        this.update({
          world_seed: 2 ** 53 * Math.random()
        });
        this.dispatchEvent("restart", this.state);
      },
      onBeforeUpdate(props, state) {
        const rule = {
          pause: "boolean",
          recording: "boolean",
          interact_seed: ["required", "integer", "min:1"],
          world_seed: ["required", "integer", "min:1"],
          nspecies: ["required", "integer", "between:1,200"],
          nlattice: ["required", "integer", "between:5,300"],
          scale: ["required", "numeric", "between:0.5,20"],
          tail: ["required", "numeric", "min:0"],
          maxfps: ["required", "numeric", "between:0,1000"],
          intset: ["regex:/^[A-Z]?$/"],
          screen: ["required"],
          particleSize: ["required", "numeric", "between:0,127.5"]
        };
        state.validation = new Validator(state, rule);
        state.validation.passes();
        for (let id of Object.keys(rule)) {
          if (state.validation.errors.errors[id]) {
            this.$("#" + id).classList.add("is-danger");
            if (this.lastState && this.lastState[id])
              state[id] = this.lastState[id];
          } else {
            this.$("#" + id).classList.remove("is-danger");
          }
        }
      },
      onUpdated(props, state) {
        this.dispatchEvent("update", this.state);
        this.lastState = Object.assign({}, this.state);
        this.updateURL();
      },
      updateURL() {
        history.replaceState({}, "", this.encodeParameters());
      },
      num2char(n) {
        const offset = n < 10 ? 48 : (
          // '0'
          n < 10 + 26 ? 65 - 10 : (
            // 'A'
            n < 10 + 26 * 2 ? 97 - 10 - 26 : -1
          )
        );
        if (offset < 0)
          return "?";
        return String.fromCharCode(offset + n);
      },
      char2num(c) {
        if (c == "?")
          return NaN;
        c = c.charAt(0);
        let n = c.charCodeAt(0);
        return "a" <= c && c <= "z" ? n - 97 + 10 + 26 : "A" <= c && c <= "Z" ? n - 65 + 10 : "0" <= c && c <= "9" ? n - 48 : NaN;
      },
      encodeParameters(state = this.state) {
        let search = "?" + (state.screen != "S" ? state.screen : "");
        search += state.nspecies + "_" + state.nlattice;
        search += "_" + state.interact_seed + state.intset + "_" + state.world_seed;
        search += state.perterb ? "" : "n";
        search += "_" + state.tail;
        search += "_" + state.scale;
        search += "_" + state.step;
        if (state.paletteSetting) {
          search += "_" + this.num2char(state.paletteSetting.iscale);
          search += ("0" + Math.round(state.paletteSetting.offset * 255).toString(16)).slice(-2);
          search += ("0" + Math.round(state.paletteSetting.scale * 16 - 16).toString(16)).slice(-2);
          search += Math.round(this.state.particleSize * 2);
        }
        return search;
      },
      setParameters(search) {
        let result = this.parseParameters(search);
        this.update(result);
      },
      parseParameters(search) {
        let result = Object.assign({}, this.default_state);
        if (!search)
          return result;
        let displaySetting;
        let options2 = search.substring(1).split("_");
        if (options2.length == 4) {
          [result.nspecies, result.nlattice, result.interact_seed, result.world_seed] = options2;
        } else if (options2.length == 5) {
          [result.nspecies, result.nlattice, result.interact_seed, result.world_seed, result.tail] = options2;
        } else if (options2.length == 6) {
          [result.nspecies, result.nlattice, result.interact_seed, result.world_seed, result.tail, result.scale] = options2;
        } else if (options2.length == 7) {
          [result.nspecies, result.nlattice, result.interact_seed, result.world_seed, result.tail, result.scale, result.step] = options2;
        } else if (options2.length == 8) {
          [result.nspecies, result.nlattice, result.interact_seed, result.world_seed, result.tail, result.scale, result.step, displaySetting] = options2;
        } else {
          return {};
        }
        let match = /^(.*)n$/.exec(result.world_seed);
        if (match) {
          result.world_seed = match[1];
          result.perterb = 0;
        }
        match = /^(XS|S|M|L)(.+)/.exec(result.nspecies);
        if (match) {
          result.screen = match[1];
          result.nspecies = match[2];
        }
        if (result.screen == "XS")
          result.screen = "S";
        if (/[A-Z]/.test(result.interact_seed.slice(-1))) {
          result.intset = result.interact_seed.slice(-1);
          result.interact_seed = result.interact_seed.slice(0, -1);
        }
        if (displaySetting) {
          this.state.paletteSetting ||= {};
          this.state.paletteSetting.iscale = this.char2num(displaySetting.slice(0, 1), 16);
          this.state.paletteSetting.offset = parseInt(displaySetting.slice(1, 3), 16) / 255;
          this.state.paletteSetting.scale = 1 + parseInt(displaySetting.slice(3, 5), 16) / 16;
          result.particleSize = displaySetting.slice(5) / 2;
        }
        return result;
      }
    },
    template: (template, expressionTypes2, bindingTypes2, getComponent) => template('<div class="columns"><div class="column is-narrow field"><label for="recommendation" class="label">\u30EF\u30FC\u30EB\u30C9\u8A2D\u5B9A</label><div class="select"><select expr3="expr3" id="recommendation" value><option value>URL\u6307\u5B9A</option><option expr4="expr4"></option></select></div></div><div class="column is-narrow field"><label for="interact_seed" class="label">\u63CF\u753B\u5236\u5FA1</label><div class="field has-addons"><p class="control"><button expr5="expr5" class="button" id="replay"><span class="icon is-small"><ion-icon expr6="expr6" name="play-skip-back"></ion-icon></span></button></p><p class="control"><button expr7="expr7" id="pause"><span class="icon is-small"><ion-icon expr8="expr8"></ion-icon></span></button></p><p class="control"><button expr9="expr9" id="recording"><span class="icon is-small"><ion-icon expr10="expr10"></ion-icon></span></button></p><p class="control"><button expr11="expr11" id="palette"><span class="icon is-small"><ion-icon expr12="expr12" name="color-palette"></ion-icon></span></button></p></div></div><div class="column is-narrow field"><label for="particleSize" class="label">\u7C92\u5B50\u30B5\u30A4\u30BA</label><div class="control"><input expr13="expr13" class="input" id="particleSize" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="screen" class="label">\u753B\u9762</label><div class="select"><select expr14="expr14" id="screen"><option value="XS">XS</option><option value="S">S</option><option value="M">M</option><option value="L">L</option></select></div></div><div class="column is-narrow field"><label for="maxfps" class="label">\u6700\u5927fps</label><div class="control"><input expr15="expr15" class="input" id="maxfps" type="text" size="2"/></div></div><div class="column is-narrow field"><label class="label">\u4F7F\u3044\u65B9</label><div class="control"><button expr16="expr16" class="button is-info"><span class="icon is-small"><ion-icon expr17="expr17" name="help"></ion-icon></span></button></div></div></div><div expr18="expr18"><div class="columns"><div class="column is-narrow field"><label for="intset" class="label">\u76F8\u4E92\u4F5C\u7528\u30BB\u30C3\u30C8</label><div class="select"><select expr19="expr19" id="intset"><option value>\u30C7\u30D5\u30A9\u30EB\u30C8</option><option value="A">\u591A\u7C92\u5B50\u7A2E\u88DC\u6B63A</option><option value="B">\u591A\u7C92\u5B50\u7A2E\u88DC\u6B63B</option></select></div></div><div class="column is-narrow field"><label for="interact_seed" class="label">\u76F8\u4E92\u4F5C\u7528\u30B7\u30FC\u30C9</label><div class="field has-addons"><div class="control"><input expr20="expr20" class="input" id="interact_seed" type="text" size="8"/></div><div class="control"><a expr21="expr21" class="button is-info"><span class="icon is-small"><ion-icon expr22="expr22" name="refresh"></ion-icon></span></a></div></div></div><div class="column is-narrow field"><label for="world_seed" class="label">\u7C92\u5B50\u914D\u7F6E\u30B7\u30FC\u30C9</label><div class="field has-addons"><div class="control"><input expr23="expr23" class="input" id="world_seed" type="text" size="8"/></div><div class="control"><a expr24="expr24" class="button is-info"><span class="icon is-small"><ion-icon expr25="expr25" name="refresh"></ion-icon></span></a></div></div></div></div><div class="columns"><div class="column is-narrow field"><label for="nspecies" class="label">\u7C92\u5B50\u7A2E\u6570</label><div class="control"><input expr26="expr26" class="input" id="nspecies" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="nparticles" class="label">\u221A\u7C92\u5B50\u6570</label><div class="control"><input expr27="expr27" class="input" id="nlattice" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="scale" class="label">\u30B9\u30B1\u30FC\u30EB</label><div class="control"><input expr28="expr28" class="input" id="scale" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="step" class="label">\u8A08\u7B97\u30B9\u30C6\u30C3\u30D7</label><div class="control"><input expr29="expr29" class="input" id="step" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="tail" class="label">\u5C3E\u306E\u9577\u3055</label><div class="control"><input expr30="expr30" class="input" id="tail" type="text" size="2"/></div></div><div class="column is-narrow field"><label for="perterb" class="label">\u63FA\u52D5</label><div class="control"><input expr31="expr31" id="perterb" type="checkbox"/></div></div></div><a class="button is-info is-small" id="show-editor">\u30D1\u30E9\u30E1\u30FC\u30BF\u30A8\u30C7\u30A3\u30BF\u3092\u8868\u793A/\u975E\u8868\u793A</a></div><div class="columns" style="display:none"><div class="column is-narrow field"><label for="webgl" class="label">WebGL</label><div class="control"><input type="checkbox" id="webgl" checked/></div></div></div>', [{
      redundantAttribute: "expr3",
      selector: "[expr3]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.recommendationChange
      }]
    }, {
      type: bindingTypes2.EACH,
      getKey: (_scope) => _scope.recommendation[1],
      condition: null,
      template: template(" ", [{
        expressions: [{
          type: expressionTypes2.TEXT,
          childNodeIndex: 0,
          evaluate: (_scope) => _scope.recommendation[0]
        }, {
          type: expressionTypes2.ATTRIBUTE,
          name: "value",
          evaluate: (_scope) => _scope.recommendation[1]
        }]
      }]),
      redundantAttribute: "expr4",
      selector: "[expr4]",
      itemName: "recommendation",
      indexName: null,
      evaluate: (_scope) => _scope.recommendations
    }, {
      redundantAttribute: "expr5",
      selector: "[expr5]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => _scope.dispatchEvent("restart", _scope.state)
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr6",
      selector: "[expr6]"
    }, {
      redundantAttribute: "expr7",
      selector: "[expr7]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "class",
        evaluate: (_scope) => _scope.state.pause ? "button is-danger" : "button"
      }, {
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => {
          _scope.update({
            "pause": !_scope.state.pause
          });
          _scope.dispatchEvent("pause", _scope.state);
        }
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "name",
        evaluate: (_scope) => _scope.state.pause ? "play" : "pause"
      }],
      redundantAttribute: "expr8",
      selector: "[expr8]"
    }, {
      redundantAttribute: "expr9",
      selector: "[expr9]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "class",
        evaluate: (_scope) => _scope.state.recording ? "button is-danger" : "button"
      }, {
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => {
          _scope.update({
            "recording": !_scope.state.recording
          });
          _scope.dispatchEvent("record", _scope.state);
        }
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "name",
        evaluate: (_scope) => _scope.state.recording ? "stop" : "ellipse"
      }],
      redundantAttribute: "expr10",
      selector: "[expr10]"
    }, {
      redundantAttribute: "expr11",
      selector: "[expr11]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "class",
        evaluate: (_scope) => _scope.state.showPalette ? "button is-dark" : "button"
      }, {
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => {
          _scope.update({
            "showPalette": !_scope.state.showPalette
          });
        }
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr12",
      selector: "[expr12]"
    }, {
      redundantAttribute: "expr13",
      selector: "[expr13]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.particleSize
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr14",
      selector: "[expr14]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.screen
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr15",
      selector: "[expr15]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.maxfps
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr16",
      selector: "[expr16]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => document.querySelector("help-popup").show()
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr17",
      selector: "[expr17]"
    }, {
      redundantAttribute: "expr18",
      selector: "[expr18]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "style",
        evaluate: (_scope) => `display: ${_scope.$("#recommendation").value == "?" ? "block" : "none"}`
      }]
    }, {
      redundantAttribute: "expr19",
      selector: "[expr19]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.intset
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr20",
      selector: "[expr20]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.interact_seed
      }]
    }, {
      redundantAttribute: "expr21",
      selector: "[expr21]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => _scope.regenerateInteractionSeed
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr22",
      selector: "[expr22]"
    }, {
      redundantAttribute: "expr23",
      selector: "[expr23]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.world_seed
      }]
    }, {
      redundantAttribute: "expr24",
      selector: "[expr24]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => _scope.regenerateWorldSeed
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr25",
      selector: "[expr25]"
    }, {
      redundantAttribute: "expr26",
      selector: "[expr26]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.nspecies
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr27",
      selector: "[expr27]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.nlattice
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr28",
      selector: "[expr28]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.scale
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr29",
      selector: "[expr29]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.step
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr30",
      selector: "[expr30]",
      expressions: [{
        type: expressionTypes2.VALUE,
        evaluate: (_scope) => _scope.state.tail
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }, {
      redundantAttribute: "expr31",
      selector: "[expr31]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "checked",
        evaluate: (_scope) => _scope.state.perterb != 0
      }, {
        type: expressionTypes2.EVENT,
        name: "onchange",
        evaluate: (_scope) => _scope.editorChanged
      }]
    }]),
    name: "plcontrols"
  };
  var t4 = {
    css: `color-scale-editor,[is="color-scale-editor"]{ --ctrl-height: 40px; --ctrl-width: 600px; display: inline-block; width: var(--ctrl-width); max-width: var(--100vw) !important; line-height: 1; } @media screen and (max-width: 640px) { color-scale-editor,[is="color-scale-editor"]{ margin-left: -0.75rem; margin-right: -0.75rem; } } color-scale-editor > div,[is="color-scale-editor"] > div{ max-width: 100%; } color-scale-editor a.button,[is="color-scale-editor"] a.button{ width: var(--ctrl-height); height: var(--ctrl-height); } color-scale-editor .has-canvas,[is="color-scale-editor"] .has-canvas{ width: calc(100% - var(--ctrl-height)); } color-scale-editor canvas,[is="color-scale-editor"] canvas{ width: 100%; height: var(--ctrl-height); margin: 0px; touch-action: none; cursor: all-scroll; }`,
    exports: {
      onMounted() {
        util.implementEventTarget(this);
        if (this.props.width)
          this.root.style.setProperty("--ctrl-width", `${this.props.width}px`);
        if (this.props.height)
          this.root.style.setProperty("--ctrl-height", `${this.props.height}px`);
        const canvas = this.$("canvas");
        const g = canvas.getContext("2d");
        g.scale(canvas.width, canvas.height);
        this.state = {
          iscale: 0,
          offset: 0,
          scale: 1,
          mouseDown: false
        };
        this.update();
        this.defineDragBehavior(canvas, {
          down: (e, x, y) => {
            e.preventDefault();
            this.state.mouseDown = true;
          },
          move: (e, mouseDown, newX2, newY2, oldX, oldY) => {
            if (!mouseDown)
              return;
            e.preventDefault();
            const [dx, dy] = [newX2 - oldX, newY2 - oldY];
            this.state.scale /= 1 + dy / canvas.clientHeight / 8;
            this.state.offset -= dx / canvas.clientWidth / this.state.scale / 2;
            this.update();
          },
          up: (e, x, y) => {
            this.update({
              mouseDown: false
            });
          }
        });
      },
      // state の更新処理
      onBeforeUpdate(props, state) {
        if (isNaN(state.iscale))
          state.iscale = 0;
        state.iscale = (state.iscale + this.props.colorScaleList.length) % this.props.colorScaleList.length;
        if (isNaN(state.offset))
          state.offset = 0;
        state.offset -= Math.floor(state.offset);
        if (isNaN(state.scale))
          state.scale = 1;
        state.scale = Math.min(17 * 255 / 256, Math.max(1, state.scale));
      },
      onUpdated(props, state) {
        const scale = this.props.colorScaleList[state.iscale];
        const factor = 1 / (1 + Math.round((state.scale - 1) * 16) / 16);
        const offset = Math.round(state.offset * 256) / 256;
        const x2color = (x) => {
          x = factor * x + offset;
          return scale.color(x - Math.floor(x));
        };
        const canvas = this.$("canvas");
        const g = canvas.getContext("2d");
        const n = 200;
        for (let i = 0; i < n; i++) {
          let x = i / n;
          g.fillStyle = x2color(x);
          g.fillRect(x, 0, x + 1.1 / n, 1);
        }
        this.dispatchEvent("update", x2color);
      }
    },
    template: (template, expressionTypes2, bindingTypes2, getComponent) => template('<div class="field has-addons"><div class="control has-canvas"><canvas></canvas></div><div class="control"><a expr0="expr0" class="button"><span class="icon is-small"><ion-icon expr1="expr1" name="swap-vertical"></ion-icon></span></a></div></div>', [{
      redundantAttribute: "expr0",
      selector: "[expr0]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => _scope.update({
          iscale: _scope.state.iscale + 1
        })
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "ion-icon",
      slots: [],
      attributes: [],
      redundantAttribute: "expr1",
      selector: "[expr1]"
    }]),
    name: "color-scale-editor"
  };
  var t5 = {
    css: `interaction-editor .container,[is="interaction-editor"] .container{ position: relative; line-height: 100%; margin: 0px; padding: 0px; max-width: 90vw; margin-bottom: 40px; } interaction-editor canvas,[is="interaction-editor"] canvas{ z-index: -1; margin: 0px; padding: 0px; touch-action: none; max-width: 90vw; } interaction-editor #scale-text,[is="interaction-editor"] #scale-text{ text-align: center; color: white; padding-top: 10px; } interaction-editor #scale,[is="interaction-editor"] #scale{ position: absolute; max-width: 90vw; } interaction-editor .arrow,[is="interaction-editor"] .arrow{ --value: 0px; position: absolute; left: calc(var(--value) - 5px); width: 0; height: 0; border-bottom: 8px solid white; border-right: 5px transparent solid; border-left: 5px transparent solid; } interaction-editor #cursor,[is="interaction-editor"] #cursor{ position: absolute; border: #c6c solid 4px; pointer-events: none; }`,
    exports: {
      onMounted() {
        util.implementEventTarget(this);
        const scale_canvas = this.$("#scale");
        const scale_g = scale_canvas.getContext("2d");
        scale_g.scale(scale_canvas.width, scale_canvas.height);
        this.state = {
          current_ij: false
        };
        this.update();
        const viewer = this.$("#matrix");
        const e2ij = (e) => {
          if (!this.world)
            return null;
          const n = this.world.nspecies;
          const crect = viewer.getBoundingClientRect();
          const ij = [Math.floor((e.clientY - crect.top) / viewer.clientHeight * (n + 1)) - 1, Math.floor((e.clientX - crect.left) / viewer.clientWidth * (n + 1)) - 1];
          if (ij[0] < 0 || ij[0] >= n || ij[1] < 0 || ij[1] >= n) {
            return null;
          }
          return ij;
        };
        let dragging = null;
        this.defineDragBehavior(viewer, {
          down: (e, x, y) => {
            e.preventDefault();
            dragging = e2ij(e);
            this.update({
              current_ij: dragging
            });
          },
          move: (e, mouseDown, newX2, newY2, oldX, oldY) => {
            if (dragging == null) {
              this.update({
                current_ij: e2ij(e)
              });
              return;
            }
            e.preventDefault();
            const dx = newX2 - oldX;
            const dy = newY2 - oldY;
            [a, b] = this.world.interaction.get(...dragging);
            a += dy * 25e-7;
            if (a >= -5e-4)
              a = -5e-4;
            b -= dx * 25e-7;
            this.world.interaction.set(...dragging, a, b);
            this.update({
              current_ij: dragging
            });
          },
          up: (e, x, y) => {
            dragging = null;
            this.update({
              current_ij: e2ij(e)
            });
          }
        });
        viewer.addEventListener("pointerleave", (e) => {
          if (!dragging)
            this.update({
              current_ij: null
            });
        });
      },
      scaleText() {
        if (!this.state.current_ij)
          return "";
        const [i, j] = this.state.current_ij;
        const [a2, b2] = this.world.interaction.get(i, j);
        return `#${i + 1} \u304C #${j + 1} \u304B\u3089\u53D7\u3051\u308B\u529B (\u6838 ${Math.round(-a2 / 15e-4 * 100) / 100}, \u5468 ${Math.round(-b2 / 5e-4 * 100) / 100})`;
      },
      onUpdated(props, state) {
        this.render_matrix();
        this.render_scale();
        if (this.state.current_ij) {
          const [i, j] = this.state.current_ij;
          const [a2, b2] = this.world.interaction.get(i, j);
          const w = this.props.width;
          const ax = Math.round(-a2 / 15e-4 * w / 2 + w / 2);
          this.$("#a").style.setProperty("--value", Math.min(w, Math.max(0, ax)) + "px");
          this.$("#a").style.borderBottomColor = ax < 0 || w < ax ? "red" : "white";
          this.$("#a").style.top = props.width + "px";
          const bx = Math.round(-b2 / 5e-4 * w / 2 + w / 2);
          this.$("#b").style.setProperty("--value", Math.min(w, Math.max(0, bx)) + "px");
          this.$("#b").style.borderBottomColor = bx < 0 || w < bx ? "red" : "white";
          this.$("#b").style.top = props.width + "px";
          const n = this.world.nspecies;
          this.$("#cursor").style.left = props.width * (1 + j) / (n + 1) + props.width / (n + 1) * 0.1 + "px";
          this.$("#cursor").style.top = props.width * (1 + i) / (n + 1) + props.width / (n + 1) * 0.1 + "px";
          this.$("#cursor").style.width = props.width / (n + 1) * 0.9 + "px";
          this.$("#cursor").style.height = props.width / (n + 1) * 0.9 + "px";
        }
        this.dispatchEvent("update", null);
      },
      render_matrix() {
        if (!this.world)
          return;
        const n = this.world.nspecies;
        const canvas = this.$("#matrix");
        const g = canvas.getContext("2d");
        const palette = [...Array(n)].map((_, i) => this.colorFunc(i / n));
        const dist = new PLSpeciesDistribution(n, this.world.particles);
        const dist_max = Math.max(...dist.distribution) * 1.2;
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.scale(canvas.width / (n + 1), canvas.height / (n + 1));
        g.fillStyle = "#fff";
        g.fillRect(0, 0, n + 1, n + 1);
        for (let i = 0; i < n; i++) {
          g.beginPath();
          g.fillStyle = palette[i];
          g.arc(0.3, 1.5 + i, 0.3, 0, 2 * Math.PI);
          g.fill();
          g.beginPath();
          g.fillStyle = palette[i];
          g.arc(1.5 + i, 0.5, 0.3, 0, 2 * Math.PI);
          g.fill();
          g.fillStyle = "#3c3";
          g.fillRect(0.7, 1.1 + i + (1 - dist.distribution[i] / dist_max) * 0.9, 0.2, dist.distribution[i] / dist_max * 0.9);
          if (!this.colorScale)
            return;
          for (let j = 0; j < n; j++) {
            let [a2, b2] = this.world.interaction.get(i, j);
            if (i == j) {
              g.fillStyle = "#fff";
              g.fillRect(1.05 + j, 1.05 + i, 0.9, 0.9);
            }
            if (!isNaN(b2)) {
              g.fillStyle = this.colorScale.color((-b2 / 5e-4 + 1) / 2);
              g.fillRect(1.1 + j, 1.1 + i, 0.9, 0.9);
            }
            if (!isNaN(a2)) {
              g.fillStyle = this.colorScale.color((-a2 / 15e-4 + 1) / 2);
              g.fillRect(1.1 + j, 1.1 + i, 0.5, 0.5);
            }
          }
        }
      },
      render_scale() {
        if (!this.colorScale)
          return;
        const g = this.$("#scale").getContext("2d");
        for (let i = 0; i < 200; i++) {
          g.fillStyle = this.colorScale.color(i / 200);
          g.fillRect(i / 200, 0, 1 / 200 + 0.01, 1);
        }
      }
    },
    template: (template, expressionTypes2, bindingTypes2, getComponent) => template('<div class="container"><canvas expr38="expr38" id="matrix"></canvas><br/><canvas expr39="expr39" id="scale" height="40"></canvas><div expr40="expr40" id="a" class="arrow"></div><div expr41="expr41" id="b" class="arrow"></div><div expr42="expr42" id="scale-text"></div><div expr43="expr43" id="cursor"></div></div>', [{
      redundantAttribute: "expr38",
      selector: "[expr38]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "width",
        evaluate: (_scope) => _scope.props.width
      }, {
        type: expressionTypes2.ATTRIBUTE,
        name: "height",
        evaluate: (_scope) => _scope.props.width
      }]
    }, {
      redundantAttribute: "expr39",
      selector: "[expr39]",
      expressions: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "width",
        evaluate: (_scope) => _scope.props.width
      }]
    }, {
      type: bindingTypes2.IF,
      evaluate: (_scope) => _scope.state.current_ij,
      redundantAttribute: "expr40",
      selector: "[expr40]",
      template: template(null, [])
    }, {
      type: bindingTypes2.IF,
      evaluate: (_scope) => _scope.state.current_ij,
      redundantAttribute: "expr41",
      selector: "[expr41]",
      template: template(null, [])
    }, {
      type: bindingTypes2.IF,
      evaluate: (_scope) => _scope.state.current_ij,
      redundantAttribute: "expr42",
      selector: "[expr42]",
      template: template(" ", [{
        expressions: [{
          type: expressionTypes2.TEXT,
          childNodeIndex: 0,
          evaluate: (_scope) => _scope.scaleText()
        }]
      }])
    }, {
      type: bindingTypes2.IF,
      evaluate: (_scope) => _scope.state.current_ij,
      redundantAttribute: "expr43",
      selector: "[expr43]",
      template: template(null, [])
    }]),
    name: "interaction-editor"
  };
  var t6 = {
    css: `help-popup,[is="help-popup"]{ display: none; } help-popup .buttons,[is="help-popup"] .buttons{ display: flex; justify-content: flex-end; } help-popup .progress,[is="help-popup"] .progress{ margin-top: 5px; } help-popup .background,[is="help-popup"] .background{ position: fixed; background-color: rgba(0, 0, 0, 0.1882352941); z-index: 10; top: 0px; left: 0px; width: 100vw; height: 100vh; } help-popup #help-popup,[is="help-popup"] #help-popup{ z-index: 15; position: absolute; left: 5vw; width: 550px; max-width: calc(var(--100vw) - 10vw); top: 40px; } help-popup #help-text,[is="help-popup"] #help-text{ line-height: 1.5; min-height: 8em; } help-popup #next-button,[is="help-popup"] #next-button{ margin: 5px 0px; } help-popup .arrow,[is="help-popup"] .arrow{ position: absolute; display: block; text-decoration: none; font-size: 24px; box-sizing: border-box; color: white; padding: 5px; border-radius: 3px; background-color: #9c0; font-weight: bold; z-index: 10; } help-popup .arrow::after,[is="help-popup"] .arrow::after{ display: block; position: absolute; width: 20px; height: 20px; margin: 0 10px; border-bottom: 15px solid #9c0; border-right: 15px solid #9c0; transform: rotate(45deg); top: 25px; left: 10px; content: ""; }`,
    exports: {
      onBeforeMount() {
        this.messages = [[`\u7C92\u5B50\u306B\u547D\u304C\u5BBF\u308B\u4E16\u754C\u3092\u306E\u3093\u3073\u308A\u773A\u3081\u306A\u304C\u3089\u6E21\u308A\u6B69\u304F\u30B5\u30A4\u30C8\u3067\u3059<br>
          <br>
          \u98FD\u304D\u305F\u3089 [\u6B21\u306E\u30EF\u30FC\u30EB\u30C9\u3092\u751F\u6210] \u3092\u62BC\u3059\u3068\u7570\u306A\u308B\u4E16\u754C\u306B\u79FB\u308C\u307E\u3059`, "new-world"], [`[\u30EF\u30FC\u30EB\u30C9\u8A2D\u5B9A] \u3067\u304A\u52E7\u3081\u306E\u8A2D\u5B9A\u3092\u9078\u3093\u3060\u3089\u4F55\u5EA6\u304B\u62BC\u3057\u3066\u307F\u3066\u304F\u3060\u3055\u3044`, "recommendation"], [`[\u3053\u306E\u30EF\u30FC\u30EB\u30C9\u3092\u30B7\u30A7\u30A2&nbsp;
           <span class="icon"><ion-icon name="share-social"></ion-icon></span></a>] 
           \u3067\u4ECA\u3044\u308B\u30EF\u30FC\u30EB\u30C9\u3078\u306E\u30EA\u30F3\u30AF\u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u3078\u30B3\u30D4\u30FC\u3067\u304D\u307E\u3059`, "copy-url"], [`[\u63CF\u753B\u5236\u5FA1] \u306E 
          <span class="icon is-small"><ion-icon name="play-skip-back"></ion-icon></span> 
          \u3067\u73FE\u5728\u306E\u30EF\u30FC\u30EB\u30C9\u3092\u306F\u3058\u3081\u304B\u3089\u30EA\u30D7\u30EC\u30A4\u3067\u304D\u307E\u3059`, "replay"], [`[\u753B\u9762\u5236\u5FA1] \u306E 
          <span class="icon is-small"><ion-icon name="color-palette"></ion-icon></span> 
          \u3067\u73FE\u308C\u308B\u30AB\u30E9\u30FC\u30B9\u30B1\u30FC\u30EB\u3092\u4E0A\u4E0B\u5DE6\u53F3\u306B\u3044\u3058\u308B\u3068\u8272\u304C\u5909\u308F\u308A\u307E\u3059`, "palette"], [`\u30C0\u30D6\u30EB\u30AF\u30EA\u30C3\u30AF/\u30BF\u30C3\u30D7\u3067\u30EF\u30FC\u30EB\u30C9\u306B\u6307\u3092\u7A81\u3063\u8FBC\u3081\u307E\u3059<br>
          <br>
          \u305D\u308C\u3067\u306F\u304A\u697D\u3057\u307F\u304F\u3060\u3055\u3044`, "particles-display"]], this.state = {
          n: this.messages.length,
          i: 0
        };
        this.root.show = () => this.show();
      },
      onMounted() {
        this.update();
      },
      onBeforeUpdate(props, state) {
        if (this.state.i >= this.state.n)
          this.close();
        if (this.state.i < 0)
          this.state.i = 0;
      },
      show() {
        const scrollTo = document.querySelector("h1 + p").getBoundingClientRect().top;
        window.scrollTo(0, scrollTo + window.scrollY);
        if (!this.keydown) {
          this.keydown = (e) => {
            if (e.key === "Escape") {
              this.close();
            }
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
              e.preventDefault();
              this.state.i += 1;
              this.update();
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              this.state.i -= 1;
              this.update();
            }
          };
          document.addEventListener("keydown", this.keydown);
        }
        this.root.style.display = "block";
        this.state.i = 0;
        this.update();
      },
      close() {
        document.removeEventListener("keydown", this.keydown);
        this.keydown = null;
        this.root.style.display = "none";
        this.state.i = 0;
      },
      onUpdated(props, state) {
        const arrow = this.$(".arrow");
        const targetId = this.messages[this.state.i][1];
        if (!targetId) {
          arrow.style.display = "none";
          return;
        }
        arrow.style.display = "block";
        let target = document.getElementById(targetId);
        let targetRect = target.getBoundingClientRect();
        let targetTop = targetRect.top - 50;
        let targetLeft = targetRect.left + targetRect.width / 2 - 30;
        let arrowRect = arrow.getBoundingClientRect();
        arrow.style.top = targetTop + arrow.offsetTop - arrowRect.top + "px";
        arrow.style.left = targetLeft + arrow.offsetLeft - arrowRect.left + "px";
        this.blinkElement(arrow);
      },
      async blinkElement(elem, display = "block") {
        if (this.blinking)
          return;
        this.blinking = true;
        for (let i = 0; i < 8; i++) {
          elem.style.display = "none";
          await util.sleep(200);
          elem.style.display = display;
          await util.sleep(600);
        }
        this.blinking = false;
      }
    },
    template: (template, expressionTypes2, bindingTypes2, getComponent) => template('<div expr32="expr32" class="background"></div><article class="message is-info" id="help-popup"><div class="message-header">\n      \u4F7F\u3044\u65B9\n      <button expr33="expr33" class="delete"></button></div><div class="message-body"><p id="help-text"><raw expr34="expr34"></raw><div class="arrow arrow-lb">\u3053\u3053\uFF01</div></p><div class="buttons"><button expr35="expr35" class="button" id="help-prev"></button><button expr36="expr36" class="button is-info" id="help-next"> </button></div><progress expr37="expr37" class="progress is-link" id="help-progress"> </progress></div></article>', [{
      redundantAttribute: "expr32",
      selector: "[expr32]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => _scope.close
      }]
    }, {
      redundantAttribute: "expr33",
      selector: "[expr33]",
      expressions: [{
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => _scope.close
      }]
    }, {
      type: bindingTypes2.TAG,
      getComponent,
      evaluate: (_scope) => "raw",
      slots: [],
      attributes: [{
        type: expressionTypes2.ATTRIBUTE,
        name: "html",
        evaluate: (_scope) => _scope.messages[_scope.state.i][0]
      }],
      redundantAttribute: "expr34",
      selector: "[expr34]"
    }, {
      type: bindingTypes2.IF,
      evaluate: (_scope) => _scope.state.i != 0,
      redundantAttribute: "expr35",
      selector: "[expr35]",
      template: template("\n        \u524D\u3078", [{
        expressions: [{
          type: expressionTypes2.EVENT,
          name: "onclick",
          evaluate: (_scope) => () => _scope.update({
            "i": _scope.state.i - 1
          })
        }]
      }])
    }, {
      redundantAttribute: "expr36",
      selector: "[expr36]",
      expressions: [{
        type: expressionTypes2.TEXT,
        childNodeIndex: 0,
        evaluate: (_scope) => [_scope.state.i == _scope.state.n - 1 ? "\u9589\u3058\u308B" : "\u6B21\u3078"].join("")
      }, {
        type: expressionTypes2.EVENT,
        name: "onclick",
        evaluate: (_scope) => () => _scope.update({
          "i": _scope.state.i + 1
        })
      }]
    }, {
      redundantAttribute: "expr37",
      selector: "[expr37]",
      expressions: [{
        type: expressionTypes2.TEXT,
        childNodeIndex: 0,
        evaluate: (_scope) => [Math.round(_scope.state.i / _scope.state.n * 100), " %"].join("")
      }, {
        type: expressionTypes2.ATTRIBUTE,
        name: "value",
        evaluate: (_scope) => _scope.state.i + 1
      }, {
        type: expressionTypes2.ATTRIBUTE,
        name: "max",
        evaluate: (_scope) => _scope.state.n
      }]
    }]),
    name: "help-popup"
  };
  function registerAllTags(riot) {
    installPlugins(riot);
    let tags = [t1, t2, t3, t4, t5, t6];
    for (let tag of tags)
      riot.register(tag.name, tag);
    return tags;
  }
  function installPlugins(riot) {
    riot.install((component2) => {
      component2.styleAttribute = (attributes) => {
        return Object.entries(attributes).reduce((acc, item) => {
          const [key, value] = item;
          return [...acc, `${key}: ${value}`];
        }, []).join(";");
      };
      return component2;
    });
    riot.install((component2) => {
      component2.defineDragBehavior = (ctrl, handlers) => {
        let mouseDown = false;
        let mouseX, mouseY;
        ctrl.addEventListener("pointerdown", (e) => {
          if (!isNaN(e.pointerId))
            ctrl.setPointerCapture(e.pointerId);
          let crect = ctrl.getBoundingClientRect();
          [mouseX, mouseY] = [e.clientX - crect.left | 0, e.clientY - crect.top | 0];
          mouseDown = true;
          if (handlers.down)
            handlers.down(e, mouseX, mouseY);
        });
        ctrl.addEventListener("pointermove", (e) => {
          let crect = ctrl.getBoundingClientRect();
          [newX, newY] = [e.clientX - crect.left | 0, e.clientY - crect.top | 0];
          if (handlers.move)
            handlers.move(e, mouseDown, newX, newY, mouseX, mouseY);
          [mouseX, mouseY] = [newX, newY];
        });
        ctrl.addEventListener("pointerup", (e) => {
          e.preventDefault();
          if (!isNaN(e.pointerId))
            ctrl.releasePointerCapture(e.pointerId);
          mouseDown = false;
          if (handlers.up)
            handlers.up(e, mouseX, mouseY);
        });
      };
      return component2;
    });
  }

  // src/index.js
  async function main() {
    let wasm2 = await loadWasm("particle-life.wasm");
    window.wasm = wasm2;
    window.util = util_exports;
    window.PLSpeciesDistribution = PLSpeciesDistribution2;
    registerAllTags(riot_exports);
    const measureWindowSize = () => document.body.style.setProperty("--100vw", `${document.body.clientWidth}px`);
    window.addEventListener("resize", measureWindowSize);
    measureWindowSize();
    let world2;
    let colorFunc2 = null;
    let display = mount("particles-display")[0];
    display.world = () => world2;
    display.colorFunc = () => colorFunc2;
    let colorScaleEditor = mount(
      "color-scale-editor",
      { colorScaleList }
    )[0];
    let int_editor = mount("interaction-editor")[0];
    int_editor.colorScale = new ColorScale([
      // heat
      [0 / 4, 0, 255, 255],
      [1 / 4, 0, 0, 192],
      [2 / 4, 0, 0, 0],
      [3 / 4, 192, 0, 0],
      [4 / 4, 255, 255, 0]
    ]);
    const controls = mount(
      "plcontrols",
      { recommendations: await (await fetch("recommendations.json")).json() }
    )[0];
    controls.addEventListener("update", (e) => {
      if (world2)
        world2.update(e.detail);
      colorScaleEditor.update(e.detail.paletteSetting);
      display.update({ tail: e.detail.tail, screen: e.detail.screen, particleSize: e.detail.particleSize });
      renderer.maxFps = e.detail.maxfps;
      document.querySelector("color-scale-editor").style.display = e.detail.showPalette ? "block" : "none";
    });
    colorScaleEditor.addEventListener("update", (e) => {
      colorFunc2 = e.detail;
      int_editor.update();
      display.render();
      if (!colorScaleEditor.state.mouseDown) {
        controls.state.paletteSetting = colorScaleEditor.state;
        controls.updateURL();
      }
    });
    const fps = document.getElementById("fps");
    const render = () => {
      world2.interactParticles();
      world2.repelParticles(display.state.repelX, display.state.repelY);
      world2.moveParticles();
      display.render();
      fps.innerText = `${String(renderer.fps).slice(0, 4)} fps`;
    };
    const renderer = new CanvasRenderer(display.$("canvas"), render, exportVid);
    controls.update();
    colorScaleEditor.update();
    const createWorld = () => {
      options = controls.state;
      if (!world2) {
        world2 = new ParticleLife(options, new XorShift128(options.world_seed));
      } else {
        world2.update(options, new XorShift128(options.world_seed));
      }
      interactionSets[options.intset](world2.interaction, new XorShift128(options.interact_seed));
      let distribution = new PLSpeciesDistribution2(world2.nspecies, world2.rand);
      world2.setupParticles((i, j) => [
        // 本当は world.nlattice で割るべきなのだけれど互換性のためこのまま
        distribution.species(world2.rand.next()),
        i / (world2.nlattice - 1) - 0.5 + 0.2 * (world2.rand.next() - 0.5),
        // x
        j / (world2.nlattice - 1) - 0.5 + 0.2 * (world2.rand.next() - 0.5),
        // y
        0,
        0
        // vx, vy
      ]);
      return world2;
    };
    const restart = (randomize = false) => {
      if (randomize) {
        controls.state.interact_seed = 2 ** 56 * Math.random();
        controls.state.world_seed = 2 ** 56 * Math.random();
        controls.update();
      }
      destruct(world2);
      createWorld();
      int_editor.world = world2;
      int_editor.colorFunc = (x) => colorFunc2(x);
      int_editor.update();
      renderer.start();
      display.initializeRequired = true;
    };
    restart();
    controls.addEventListener("pause", (e) => {
      if (e.detail.pause) {
        renderer.stop();
      } else {
        renderer.start();
      }
    });
    controls.addEventListener("record", (e) => {
      if (e.detail.recording) {
        renderer.startRecording();
      } else {
        renderer.stopRecording();
      }
    });
    controls.addEventListener("restart", () => {
      renderer.stop();
      restart();
    });
    document.getElementById("new-world").addEventListener("click", () => {
      renderer.stop();
      restart(true);
    });
    document.getElementById("show-editor").addEventListener("click", () => {
      const style = document.getElementById("world-editor").style;
      if (style.display == "none") {
        style.display = "block";
      } else {
        style.display = "none";
      }
    });
    document.getElementById("world-editor").style.display = "none";
    document.getElementById("copy-url").addEventListener("click", () => {
      navigator.clipboard.writeText(location.href);
      setTimeout(
        () => document.getElementById("copy-url-message").style.display = "block",
        100
      );
      setTimeout(
        () => document.getElementById("copy-url-message").style.display = "none",
        1600
      );
    });
    document.getElementById("copy-url-message").style.display = "none";
    const helpPopup = mount("help-popup")[0];
    let help = "";
    helpPopup.messages.forEach((message) => {
      help += "<li>" + message[0].split(/<br>[\s\n]*<br>/).join("</li><li>") + "</li>";
    });
    const helpList = document.getElementById("help-list").innerHTML = help;
  }
  window.addEventListener("load", () => {
    main();
  });
  function exportVid(blob) {
    const div = document.getElementById("video");
    while (div.firstChild)
      div.removeChild(div.firstChild);
    const vid = document.createElement("video");
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    div.appendChild(vid);
    div.appendChild(document.createElement("br"));
    const a2 = document.createElement("a");
    a2.download = location.search.substr(1) + ".webm";
    a2.href = vid.src;
    a2.textContent = "download the video";
    div.appendChild(a2);
    setTimeout(() => {
      var doc = document.documentElement;
      var bottom = doc.scrollHeight - doc.clientHeight;
      window.scroll(0, bottom);
    }, 100);
  }
})();
/*! Bundled license information:

@riotjs/util/constants.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/expression-types.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/strings.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/misc.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/checks.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/functions.js:
  (* Riot WIP, @license MIT *)

riot/esm/core/pure-component-api.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/mocked-template-interface.js:
  (* Riot v7.1.0, @license MIT *)

@riotjs/util/dom.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/binding-types.js:
  (* Riot WIP, @license MIT *)

@riotjs/util/objects.js:
  (* Riot WIP, @license MIT *)

@riotjs/dom-bindings/dist/esm.dom-bindings.js:
  (* Riot WIP, @license MIT *)

riot/esm/core/component-template-factory.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/bind-dom-node-to-component-instance.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/create-core-api-methods.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/create-pure-component.js:
  (* Riot v7.1.0, @license MIT *)

bianco.dom-to-array/index.next.js:
  (* Riot WIP, @license MIT *)

bianco.query/index.next.js:
  (* Riot WIP, @license MIT *)

riot/esm/core/component-dom-selectors.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/component-lifecycle-methods.js:
  (* Riot v7.1.0, @license MIT *)

bianco.attr/index.next.js:
  (* Riot WIP, @license MIT *)

riot/esm/core/css-manager.js:
  (* Riot v7.1.0, @license MIT *)

curri/index.next.js:
  (* Riot WIP, @license MIT *)

riot/esm/utils/dom.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/add-css-hook.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/compute-component-state.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/compute-initial-props.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/create-attribute-bindings.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/run-plugins.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/manage-component-lifecycle.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/instantiate-component.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/create-component-from-wrapper.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/register.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/unregister.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/core/mount-component.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/mount.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/unmount.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/install.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/uninstall.js:
  (* Riot v7.1.0, @license MIT *)

cumpa/index.next.js:
  (* Riot WIP, @license MIT *)

riot/esm/api/component.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/pure.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/with-types.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/version.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/api/__.js:
  (* Riot v7.1.0, @license MIT *)

riot/esm/riot.js:
  (* Riot v7.1.0, @license MIT *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL3Jpb3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2V4cHJlc3Npb24tdHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvc3RyaW5ncy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9taXNjLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NoZWNrcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9mdW5jdGlvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2NvcmUvcHVyZS1jb21wb25lbnQtYXBpLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9jb3JlL21vY2tlZC10ZW1wbGF0ZS1pbnRlcmZhY2UuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvZG9tLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2JpbmRpbmctdHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvb2JqZWN0cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vbm9kZV9tb2R1bGVzL0ByaW90anMvZG9tLWJpbmRpbmdzL2Rpc3QvZXNtLmRvbS1iaW5kaW5ncy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jb21wb25lbnQtdGVtcGxhdGUtZmFjdG9yeS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9iaW5kLWRvbS1ub2RlLXRvLWNvbXBvbmVudC1pbnN0YW5jZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jcmVhdGUtY29yZS1hcGktbWV0aG9kcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jcmVhdGUtcHVyZS1jb21wb25lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9iaWFuY28uZG9tLXRvLWFycmF5L2luZGV4Lm5leHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9iaWFuY28ucXVlcnkvaW5kZXgubmV4dC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jb21wb25lbnQtZG9tLXNlbGVjdG9ycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jb21wb25lbnQtbGlmZWN5Y2xlLW1ldGhvZHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL25vZGVfbW9kdWxlcy9iaWFuY28uYXR0ci9pbmRleC5uZXh0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9jb3JlL2Nzcy1tYW5hZ2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9ub2RlX21vZHVsZXMvY3VycmkvaW5kZXgubmV4dC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vdXRpbHMvZG9tLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9jb3JlL2FkZC1jc3MtaG9vay5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jb21wdXRlLWNvbXBvbmVudC1zdGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9jb21wdXRlLWluaXRpYWwtcHJvcHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2NvcmUvY3JlYXRlLWF0dHJpYnV0ZS1iaW5kaW5ncy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9ydW4tcGx1Z2lucy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9tYW5hZ2UtY29tcG9uZW50LWxpZmVjeWNsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vY29yZS9pbnN0YW50aWF0ZS1jb21wb25lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2NvcmUvY3JlYXRlLWNvbXBvbmVudC1mcm9tLXdyYXBwZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2FwaS9yZWdpc3Rlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vYXBpL3VucmVnaXN0ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2NvcmUvbW91bnQtY29tcG9uZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9hcGkvbW91bnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2FwaS91bm1vdW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9hcGkvaW5zdGFsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vYXBpL3VuaW5zdGFsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vbm9kZV9tb2R1bGVzL2N1bXBhL2luZGV4Lm5leHQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2FwaS9jb21wb25lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2FwaS9wdXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yaW90L2VzbS9hcGkvd2l0aC10eXBlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcmlvdC9lc20vYXBpL3ZlcnNpb24uanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Jpb3QvZXNtL2FwaS9fXy5qcyIsICIuLi9zcmMvdXRpbC5qcyIsICIuLi9zcmMvY2FudmFzLXJlbmRlcmVyLmpzIiwgIi4uL3NyYy9pbnRlcmFjdGlvbi1zZXRzLmpzIiwgIi4uL3NyYy9jb2xvci1zY2FsZS5qcyIsICIuLi9zcmMvcGwtc3BlY2llcy1kaXN0cmlidXRpb24uanMiLCAiLi4vc3JjL3BsLWludGVyYWN0aW9uLW1hdHJpeC5qcyIsICIuLi9zcmMvcGwtcGFydGljbGVzLmpzIiwgIi4uL3NyYy9wYXJ0aWNsZS1saWZlLmpzIiwgIi4uL3NyYy94b3JzaGlmdDEyOC5qcyIsICIuLi9vYmovcmlvdF90YWdzLmpzIiwgIi4uL3NyYy9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuZXhwb3J0IHsgcmVnaXN0ZXIgfSBmcm9tICcuL2FwaS9yZWdpc3Rlci5qcyc7XG5leHBvcnQgeyB1bnJlZ2lzdGVyIH0gZnJvbSAnLi9hcGkvdW5yZWdpc3Rlci5qcyc7XG5leHBvcnQgeyBtb3VudCB9IGZyb20gJy4vYXBpL21vdW50LmpzJztcbmV4cG9ydCB7IHVubW91bnQgfSBmcm9tICcuL2FwaS91bm1vdW50LmpzJztcbmV4cG9ydCB7IGluc3RhbGwgfSBmcm9tICcuL2FwaS9pbnN0YWxsLmpzJztcbmV4cG9ydCB7IHVuaW5zdGFsbCB9IGZyb20gJy4vYXBpL3VuaW5zdGFsbC5qcyc7XG5leHBvcnQgeyBjb21wb25lbnQgfSBmcm9tICcuL2FwaS9jb21wb25lbnQuanMnO1xuZXhwb3J0IHsgcHVyZSB9IGZyb20gJy4vYXBpL3B1cmUuanMnO1xuZXhwb3J0IHsgd2l0aFR5cGVzIH0gZnJvbSAnLi9hcGkvd2l0aC10eXBlcy5qcyc7XG5leHBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi9hcGkvdmVyc2lvbi5qcyc7XG5leHBvcnQgeyBfXyB9IGZyb20gJy4vYXBpL19fLmpzJztcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG4vLyBSaW90LmpzIGNvbnN0YW50cyB0aGF0IGNhbiBiZSB1c2VkIGFjcm9zcyBtb3JlIG1vZHVsZXNcblxuY29uc3QgQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVAgPSBuZXcgTWFwKCksXG4gIERPTV9DT01QT05FTlRfSU5TVEFOQ0VfUFJPUEVSVFkgPSBTeW1ib2woJ3Jpb3QtY29tcG9uZW50JyksXG4gIFBMVUdJTlNfU0VUID0gbmV3IFNldCgpLFxuICBJU19ESVJFQ1RJVkUgPSAnaXMnLFxuICBNT1VOVF9NRVRIT0RfS0VZID0gJ21vdW50JyxcbiAgVVBEQVRFX01FVEhPRF9LRVkgPSAndXBkYXRlJyxcbiAgVU5NT1VOVF9NRVRIT0RfS0VZID0gJ3VubW91bnQnLFxuICBTSE9VTERfVVBEQVRFX0tFWSA9ICdzaG91bGRVcGRhdGUnLFxuICBPTl9CRUZPUkVfTU9VTlRfS0VZID0gJ29uQmVmb3JlTW91bnQnLFxuICBPTl9NT1VOVEVEX0tFWSA9ICdvbk1vdW50ZWQnLFxuICBPTl9CRUZPUkVfVVBEQVRFX0tFWSA9ICdvbkJlZm9yZVVwZGF0ZScsXG4gIE9OX1VQREFURURfS0VZID0gJ29uVXBkYXRlZCcsXG4gIE9OX0JFRk9SRV9VTk1PVU5UX0tFWSA9ICdvbkJlZm9yZVVubW91bnQnLFxuICBPTl9VTk1PVU5URURfS0VZID0gJ29uVW5tb3VudGVkJyxcbiAgUFJPUFNfS0VZID0gJ3Byb3BzJyxcbiAgU1RBVEVfS0VZID0gJ3N0YXRlJyxcbiAgU0xPVFNfS0VZID0gJ3Nsb3RzJyxcbiAgUk9PVF9LRVkgPSAncm9vdCcsXG4gIElTX1BVUkVfU1lNQk9MID0gU3ltYm9sKCdwdXJlJyksXG4gIElTX0NPTVBPTkVOVF9VUERBVElORyA9IFN5bWJvbCgnaXNfdXBkYXRpbmcnKSxcbiAgUEFSRU5UX0tFWV9TWU1CT0wgPSBTeW1ib2woJ3BhcmVudCcpLFxuICBBVFRSSUJVVEVTX0tFWV9TWU1CT0wgPSBTeW1ib2woJ2F0dHJpYnV0ZXMnKSxcbiAgVEVNUExBVEVfS0VZX1NZTUJPTCA9IFN5bWJvbCgndGVtcGxhdGUnKTtcblxuZXhwb3J0IHsgQVRUUklCVVRFU19LRVlfU1lNQk9MLCBDT01QT05FTlRTX0lNUExFTUVOVEFUSU9OX01BUCwgRE9NX0NPTVBPTkVOVF9JTlNUQU5DRV9QUk9QRVJUWSwgSVNfQ09NUE9ORU5UX1VQREFUSU5HLCBJU19ESVJFQ1RJVkUsIElTX1BVUkVfU1lNQk9MLCBNT1VOVF9NRVRIT0RfS0VZLCBPTl9CRUZPUkVfTU9VTlRfS0VZLCBPTl9CRUZPUkVfVU5NT1VOVF9LRVksIE9OX0JFRk9SRV9VUERBVEVfS0VZLCBPTl9NT1VOVEVEX0tFWSwgT05fVU5NT1VOVEVEX0tFWSwgT05fVVBEQVRFRF9LRVksIFBBUkVOVF9LRVlfU1lNQk9MLCBQTFVHSU5TX1NFVCwgUFJPUFNfS0VZLCBST09UX0tFWSwgU0hPVUxEX1VQREFURV9LRVksIFNMT1RTX0tFWSwgU1RBVEVfS0VZLCBURU1QTEFURV9LRVlfU1lNQk9MLCBVTk1PVU5UX01FVEhPRF9LRVksIFVQREFURV9NRVRIT0RfS0VZIH07XG4iLCAiLyogUmlvdCBXSVAsIEBsaWNlbnNlIE1JVCAqL1xuY29uc3QgQVRUUklCVVRFID0gMDtcbmNvbnN0IEVWRU5UID0gMTtcbmNvbnN0IFRFWFQgPSAyO1xuY29uc3QgVkFMVUUgPSAzO1xuY29uc3QgZXhwcmVzc2lvblR5cGVzID0ge1xuICBBVFRSSUJVVEUsXG4gIEVWRU5ULFxuICBURVhULFxuICBWQUxVRVxufTtcblxuZXhwb3J0IHsgQVRUUklCVVRFLCBFVkVOVCwgVEVYVCwgVkFMVUUsIGV4cHJlc3Npb25UeXBlcyBhcyBkZWZhdWx0IH07XG4iLCAiLyogUmlvdCBXSVAsIEBsaWNlbnNlIE1JVCAqL1xuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGZyb20gY2FtZWwgY2FzZSB0byBkYXNoLWNhc2VcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IHN0cmluZyAtIHByb2JhYmx5IGEgY29tcG9uZW50IHRhZyBuYW1lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb21wb25lbnQgbmFtZSBub3JtYWxpemVkXG4gKi9cbmZ1bmN0aW9uIGNhbWVsVG9EYXNoQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgY29udGFpbmluZyBkYXNoZXMgdG8gY2FtZWwgY2FzZVxuICogQHBhcmFtICAge3N0cmluZ30gc3RyaW5nIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBteS1zdHJpbmcgLT4gbXlTdHJpbmdcbiAqL1xuZnVuY3Rpb24gZGFzaFRvQ2FtZWxDYXNlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLy0oXFx3KS9nLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IHsgY2FtZWxUb0Rhc2hDYXNlLCBkYXNoVG9DYW1lbENhc2UgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBWQUxVRSwgQVRUUklCVVRFIH0gZnJvbSAnLi9leHByZXNzaW9uLXR5cGVzLmpzJztcbmltcG9ydCB7IGRhc2hUb0NhbWVsQ2FzZSB9IGZyb20gJy4vc3RyaW5ncy5qcyc7XG5cbi8qKlxuICogVGhyb3cgYW4gZXJyb3Igd2l0aCBhIGRlc2NyaXB0aXZlIG1lc3NhZ2VcbiAqIEBwYXJhbSAgIHsgc3RyaW5nIH0gbWVzc2FnZSAtIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSAgIHsgc3RyaW5nIH0gY2F1c2UgLSBvcHRpb25hbCBlcnJvciBjYXVzZSBvYmplY3RcbiAqIEByZXR1cm5zIHsgdW5kZWZpbmVkIH0gaG9wcGxhLi4uIGF0IHRoaXMgcG9pbnQgdGhlIHByb2dyYW0gc2hvdWxkIHN0b3Agd29ya2luZ1xuICovXG5mdW5jdGlvbiBwYW5pYyhtZXNzYWdlLCBjYXVzZSkge1xuICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSwge1xuICAgIGNhdXNlXG4gIH0pO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtZW1vaXplZCAoY2FjaGVkKSBmdW5jdGlvbi5cbiAqIC8vIGJvcnJvd2VkIGZyb20gaHR0cHM6Ly93d3cuMzBzZWNvbmRzb2Zjb2RlLm9yZy9qcy9zL21lbW9pemVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gZnVuY3Rpb24gdG8gbWVtb2l6ZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBtZW1vaXplIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemUoZm4pIHtcbiAgY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGNhY2hlZCA9IHZhbCA9PiB7XG4gICAgcmV0dXJuIGNhY2hlLmhhcyh2YWwpID8gY2FjaGUuZ2V0KHZhbCkgOiBjYWNoZS5zZXQodmFsLCBmbi5jYWxsKHRoaXMsIHZhbCkpICYmIGNhY2hlLmdldCh2YWwpO1xuICB9O1xuICBjYWNoZWQuY2FjaGUgPSBjYWNoZTtcbiAgcmV0dXJuIGNhY2hlZDtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZSBhIGxpc3Qgb2YgYXR0cmlidXRlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7QXJyYXl9IGF0dHJpYnV0ZXMgLSBhdHRyaWJ1dGUgZXhwcmVzc2lvbnMgZ2VuZXJhdGVkIGJ5IHRoZSByaW90IGNvbXBpbGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBrZXkgdmFsdWUgcGFpcnMgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBjb21wdXRhdGlvblxuICovXG5mdW5jdGlvbiBldmFsdWF0ZUF0dHJpYnV0ZUV4cHJlc3Npb25zKGF0dHJpYnV0ZXMpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZXMucmVkdWNlKChhY2MsIGF0dHJpYnV0ZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlLFxuICAgICAgdHlwZVxuICAgIH0gPSBhdHRyaWJ1dGU7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAvLyBzcHJlYWQgYXR0cmlidXRlXG4gICAgICBjYXNlICFhdHRyaWJ1dGUubmFtZSAmJiB0eXBlID09PSBBVFRSSUJVVEU6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBhY2MsIHZhbHVlKTtcbiAgICAgIC8vIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgY2FzZSB0eXBlID09PSBWQUxVRTpcbiAgICAgICAgYWNjLnZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIG5vcm1hbCBhdHRyaWJ1dGVzXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhY2NbZGFzaFRvQ2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0IHsgZXZhbHVhdGVBdHRyaWJ1dGVFeHByZXNzaW9ucywgbWVtb2l6ZSwgcGFuaWMgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG4vKipcbiAqIFF1aWNrIHR5cGUgY2hlY2tpbmdcbiAqIEBwYXJhbSAgIHsqfSBlbGVtZW50IC0gYW55dGhpbmdcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IHR5cGUgLSB0eXBlIGRlZmluaXRpb25cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSB0eXBlIGNvcnJlc3BvbmRzXG4gKi9cbmZ1bmN0aW9uIGNoZWNrVHlwZShlbGVtZW50LCB0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgZWxlbWVudCA9PT0gdHlwZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhbiBlbGVtZW50IGlzIHBhcnQgb2YgYW4gc3ZnXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9ICBlbCAtIGVsZW1lbnQgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHdlIGFyZSBpbiBhbiBzdmcgY29udGV4dFxuICovXG5mdW5jdGlvbiBpc1N2ZyhlbCkge1xuICBjb25zdCBvd25lciA9IGVsLm93bmVyU1ZHRWxlbWVudDtcbiAgcmV0dXJuICEhb3duZXIgfHwgb3duZXIgPT09IG51bGw7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIHRlbXBsYXRlIHRhZ1xuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgZWwgLSBlbGVtZW50IHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBpdCdzIGEgPHRlbXBsYXRlPlxuICovXG5mdW5jdGlvbiBpc1RlbXBsYXRlKGVsKSB7XG4gIHJldHVybiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZW1wbGF0ZSc7XG59XG5cbi8qKlxuICogQ2hlY2sgdGhhdCB3aWxsIGJlIHBhc3NlZCBpZiBpdHMgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyp9IHZhbHVlIC0gdmFsdWUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSAtIHRydWUgaWYgdGhlIHZhbHVlIGlzIGEgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tUeXBlKHZhbHVlLCAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICogQHBhcmFtICAgeyp9ICB2YWx1ZSAtIGFueXRoaW5nXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBvbmx5IGZvciB0aGUgdmFsdWUgaXMgYSBib29sZWFuXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSkge1xuICByZXR1cm4gY2hlY2tUeXBlKHZhbHVlLCAnYm9vbGVhbicpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKiBAcGFyYW0gICB7Kn0gIHZhbHVlIC0gYW55dGhpbmdcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIG9ubHkgZm9yIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuICFpc05pbCh2YWx1ZSkgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdDtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkXG4gKiBAcGFyYW0gICB7Kn0gIHZhbHVlIC0gYW55dGhpbmdcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIG9ubHkgZm9yIHRoZSAndW5kZWZpbmVkJyBhbmQgJ251bGwnIHR5cGVzXG4gKi9cbmZ1bmN0aW9uIGlzTmlsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgeyBjaGVja1R5cGUsIGlzQm9vbGVhbiwgaXNGdW5jdGlvbiwgaXNOaWwsIGlzT2JqZWN0LCBpc1N2ZywgaXNUZW1wbGF0ZSB9O1xuIiwgIi8qIFJpb3QgV0lQLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2NoZWNrcy5qcyc7XG5cbi8vIGRvZXMgc2ltcGx5IG5vdGhpbmdcbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIEF1dG9iaW5kIHRoZSBtZXRob2RzIG9mIGEgc291cmNlIG9iamVjdCB0byBpdHNlbGZcbiAqIEBwYXJhbSAgIHtPYmplY3R9IHNvdXJjZSAtIHByb2JhYmx5IGEgcmlvdCB0YWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHtBcnJheTxzdHJpbmc+fSBtZXRob2RzIC0gbGlzdCBvZiB0aGUgbWV0aG9kcyB0byBhdXRvYmluZFxuICogQHJldHVybnMge09iamVjdH0gdGhlIG9yaWdpbmFsIG9iamVjdCByZWNlaXZlZFxuICovXG5mdW5jdGlvbiBhdXRvYmluZE1ldGhvZHMoc291cmNlLCBtZXRob2RzKSB7XG4gIG1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgIHNvdXJjZVttZXRob2RdID0gc291cmNlW21ldGhvZF0uYmluZChzb3VyY2UpO1xuICB9KTtcbiAgcmV0dXJuIHNvdXJjZTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoZSBmaXJzdCBhcmd1bWVudCByZWNlaXZlZCBvbmx5IGlmIGl0J3MgYSBmdW5jdGlvbiBvdGhlcndpc2UgcmV0dXJuIGl0IGFzIGl0IGlzXG4gKiBAcGFyYW0gICB7Kn0gc291cmNlIC0gYW55dGhpbmdcbiAqIEByZXR1cm5zIHsqfSBhbnl0aGluZ1xuICovXG5mdW5jdGlvbiBjYWxsT3JBc3NpZ24oc291cmNlKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKHNvdXJjZSkgPyBzb3VyY2UucHJvdG90eXBlICYmIHNvdXJjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPyBuZXcgc291cmNlKCkgOiBzb3VyY2UoKSA6IHNvdXJjZTtcbn1cblxuZXhwb3J0IHsgYXV0b2JpbmRNZXRob2RzLCBjYWxsT3JBc3NpZ24sIG5vb3AgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBNT1VOVF9NRVRIT0RfS0VZLCBVUERBVEVfTUVUSE9EX0tFWSwgVU5NT1VOVF9NRVRIT0RfS0VZIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvZnVuY3Rpb25zLmpzJztcblxuY29uc3QgUFVSRV9DT01QT05FTlRfQVBJID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFtNT1VOVF9NRVRIT0RfS0VZXTogbm9vcCxcbiAgW1VQREFURV9NRVRIT0RfS0VZXTogbm9vcCxcbiAgW1VOTU9VTlRfTUVUSE9EX0tFWV06IG5vb3Bcbn0pO1xuXG5leHBvcnQgeyBQVVJFX0NPTVBPTkVOVF9BUEkgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBQVVJFX0NPTVBPTkVOVF9BUEkgfSBmcm9tICcuL3B1cmUtY29tcG9uZW50LWFwaS5qcyc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9mdW5jdGlvbnMuanMnO1xuXG5jb25zdCBNT0NLRURfVEVNUExBVEVfSU5URVJGQUNFID0gT2JqZWN0LmFzc2lnbih7fSwgUFVSRV9DT01QT05FTlRfQVBJLCB7XG4gIGNsb25lOiBub29wLFxuICBjcmVhdGVET006IG5vb3Bcbn0pO1xuXG5leHBvcnQgeyBNT0NLRURfVEVNUExBVEVfSU5URVJGQUNFIH07XG4iLCAiLyogUmlvdCBXSVAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgZGFzaFRvQ2FtZWxDYXNlIH0gZnJvbSAnLi9zdHJpbmdzLmpzJztcblxuLyoqXG4gKiBHZXQgYWxsIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMgYXMgb2JqZWN0XG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhbGwgdGhlIGF0dHJpYnV0ZXMgZm91bmQgYXMgYSBrZXkgdmFsdWUgcGFpcnNcbiAqL1xuZnVuY3Rpb24gRE9NYXR0cmlidXRlc1RvT2JqZWN0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5hdHRyaWJ1dGVzKS5yZWR1Y2UoKGFjYywgYXR0cmlidXRlKSA9PiB7XG4gICAgYWNjW2Rhc2hUb0NhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSldID0gYXR0cmlidXRlLnZhbHVlO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIGFsbCB0aGUgY2hpbGQgbm9kZXMgZnJvbSBhIHNvdXJjZSB0YWcgdG8gYW5vdGhlclxuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBzb3VyY2UgLSBzb3VyY2Ugbm9kZVxuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0YXJnZXQgbm9kZVxuICogQHJldHVybnMge3VuZGVmaW5lZH0gaXQncyBhIHZvaWQgbWV0aG9kIFx1MDBBRlxcXyhcdTMwQzQpXy9cdTAwQUZcbiAqL1xuXG4vLyBJZ25vcmUgdGhpcyBoZWxwZXIgYmVjYXVzZSBpdCdzIG5lZWRlZCBvbmx5IGZvciBzdmcgdGFnc1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKHNvdXJjZSwgdGFyZ2V0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmcC9uby1sb29wc1xuICB3aGlsZSAoc291cmNlLmZpcnN0Q2hpbGQpIHRhcmdldC5hcHBlbmRDaGlsZChzb3VyY2UuZmlyc3RDaGlsZCk7XG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBjaGlsZCBub2RlcyBmcm9tIGFueSBET00gbm9kZVxuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBub2RlIC0gdGFyZ2V0IG5vZGVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGNsZWFuTm9kZShub2RlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmcC9uby1sb29wc1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG59XG5cbi8qKlxuICogQ2xlYXIgbXVsdGlwbGUgY2hpbGRyZW4gaW4gYSBub2RlXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnRbXX0gY2hpbGRyZW4gLSBkaXJlY3QgY2hpbGRyZW4gbm9kZXNcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGNsZWFyQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZwL25vLWxvb3BzLGZwL25vLWxldFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSByZW1vdmVDaGlsZChjaGlsZHJlbltpXSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH1ub2RlIC0gbm9kZSB0byByZW1vdmVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmNvbnN0IHJlbW92ZUNoaWxkID0gbm9kZSA9PiBub2RlLnJlbW92ZSgpO1xuXG4vKipcbiAqIEluc2VydCBiZWZvcmUgYSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuZXdOb2RlIC0gbm9kZSB0byBpbnNlcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlZk5vZGUgLSByZWYgY2hpbGRcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmNvbnN0IGluc2VydEJlZm9yZSA9IChuZXdOb2RlLCByZWZOb2RlKSA9PiByZWZOb2RlICYmIHJlZk5vZGUucGFyZW50Tm9kZSAmJiByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZk5vZGUpO1xuXG4vKipcbiAqIFJlcGxhY2UgYSBub2RlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuZXdOb2RlIC0gbmV3IG5vZGUgdG8gYWRkIHRvIHRoZSBET01cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlcGxhY2VkIC0gbm9kZSB0byByZXBsYWNlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5jb25zdCByZXBsYWNlQ2hpbGQgPSAobmV3Tm9kZSwgcmVwbGFjZWQpID0+IHJlcGxhY2VkICYmIHJlcGxhY2VkLnBhcmVudE5vZGUgJiYgcmVwbGFjZWQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgcmVwbGFjZWQpO1xuXG5leHBvcnQgeyBET01hdHRyaWJ1dGVzVG9PYmplY3QsIGNsZWFuTm9kZSwgY2xlYXJDaGlsZHJlbiwgaW5zZXJ0QmVmb3JlLCBtb3ZlQ2hpbGRyZW4sIHJlbW92ZUNoaWxkLCByZXBsYWNlQ2hpbGQgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG5jb25zdCBFQUNIID0gMDtcbmNvbnN0IElGID0gMTtcbmNvbnN0IFNJTVBMRSA9IDI7XG5jb25zdCBUQUcgPSAzO1xuY29uc3QgU0xPVCA9IDQ7XG5jb25zdCBiaW5kaW5nVHlwZXMgPSB7XG4gIEVBQ0gsXG4gIElGLFxuICBTSU1QTEUsXG4gIFRBRyxcbiAgU0xPVFxufTtcblxuZXhwb3J0IHsgRUFDSCwgSUYsIFNJTVBMRSwgU0xPVCwgVEFHLCBiaW5kaW5nVHlwZXMgYXMgZGVmYXVsdCB9O1xuIiwgIi8qIFJpb3QgV0lQLCBAbGljZW5zZSBNSVQgKi9cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCBhbiBpbW11dGFibGUgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHtPYmplY3R9IHNvdXJjZSAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc2V0XG4gKiBAcGFyYW0gICB7c3RyaW5nfSBrZXkgLSBvYmplY3Qga2V5IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsqfSB2YWx1ZSAtIHZhbHVlIG9mIHRoZSBuZXcgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3BlcnR5IG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gLSB0aGUgb3JpZ2luYWwgb2JqZWN0IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHNvdXJjZSwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIC8qIGVzbGludC1kaXNhYmxlIGZwL25vLW11dGF0aW5nLW1ldGhvZHMgKi9cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNvdXJjZSwga2V5LCBPYmplY3QuYXNzaWduKHtcbiAgICB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKTtcbiAgLyogZXNsaW50LWVuYWJsZSBmcC9uby1tdXRhdGluZy1tZXRob2RzICovXG5cbiAgcmV0dXJuIHNvdXJjZTtcbn1cblxuLyoqXG4gKiBEZWZpbmUgbXVsdGlwbGUgcHJvcGVydGllcyBvbiBhIHRhcmdldCBvYmplY3RcbiAqIEBwYXJhbSAgIHtPYmplY3R9IHNvdXJjZSAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnRpZXMgd2lsbCBiZSBzZXRcbiAqIEBwYXJhbSAgIHtPYmplY3R9IHByb3BlcnRpZXMgLSBvYmplY3QgY29udGFpbmluZyBhcyBrZXkgcGFpciB0aGUga2V5ICsgdmFsdWUgcHJvcGVydGllc1xuICogQHBhcmFtICAge09iamVjdH0gb3B0aW9ucyAtIHNldCB0aGUgcHJvcGVydHkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgb3JpZ2luYWwgb2JqZWN0IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoc291cmNlLCBwcm9wZXJ0aWVzLCBvcHRpb25zKSB7XG4gIE9iamVjdC5lbnRyaWVzKHByb3BlcnRpZXMpLmZvckVhY2goX3JlZiA9PiB7XG4gICAgbGV0IFtrZXksIHZhbHVlXSA9IF9yZWY7XG4gICAgZGVmaW5lUHJvcGVydHkoc291cmNlLCBrZXksIHZhbHVlLCBvcHRpb25zKTtcbiAgfSk7XG4gIHJldHVybiBzb3VyY2U7XG59XG5cbi8qKlxuICogRGVmaW5lIGRlZmF1bHQgcHJvcGVydGllcyBpZiB0aGV5IGRvbid0IGV4aXN0IG9uIHRoZSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0gICB7T2JqZWN0fSBzb3VyY2UgLSBvYmplY3QgdGhhdCB3aWxsIHJlY2VpdmUgdGhlIGRlZmF1bHQgcHJvcGVydGllc1xuICogQHBhcmFtICAge09iamVjdH0gZGVmYXVsdHMgLSBvYmplY3QgY29udGFpbmluZyBhZGRpdGlvbmFsIG9wdGlvbmFsIGtleXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBvcmlnaW5hbCBvYmplY3QgcmVjZWl2ZWQgZW5oYW5jZWRcbiAqL1xuZnVuY3Rpb24gZGVmaW5lRGVmYXVsdHMoc291cmNlLCBkZWZhdWx0cykge1xuICBPYmplY3QuZW50cmllcyhkZWZhdWx0cykuZm9yRWFjaChfcmVmMiA9PiB7XG4gICAgbGV0IFtrZXksIHZhbHVlXSA9IF9yZWYyO1xuICAgIGlmICghc291cmNlW2tleV0pIHNvdXJjZVtrZXldID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gc291cmNlO1xufVxuXG5leHBvcnQgeyBkZWZpbmVEZWZhdWx0cywgZGVmaW5lUHJvcGVydGllcywgZGVmaW5lUHJvcGVydHkgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyByZW1vdmVDaGlsZCwgY2xlYW5Ob2RlLCBjbGVhckNoaWxkcmVuLCBpbnNlcnRCZWZvcmUsIG1vdmVDaGlsZHJlbiwgcmVwbGFjZUNoaWxkIH0gZnJvbSAnLi4vLi4vdXRpbC9kb20uanMnO1xuaW1wb3J0IHsgSVNfUFVSRV9TWU1CT0wsIFBBUkVOVF9LRVlfU1lNQk9MIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgU0lNUExFLCBJRiwgRUFDSCwgVEFHLCBTTE9UIH0gZnJvbSAnLi4vLi4vdXRpbC9iaW5kaW5nLXR5cGVzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYmluZGluZ1R5cGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9iaW5kaW5nLXR5cGVzLmpzJztcbmltcG9ydCB7IFRFWFQsIEVWRU5ULCBBVFRSSUJVVEUsIFZBTFVFIH0gZnJvbSAnLi4vLi4vdXRpbC9leHByZXNzaW9uLXR5cGVzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZXhwcmVzc2lvblR5cGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9leHByZXNzaW9uLXR5cGVzLmpzJztcbmltcG9ydCB7IGRlZmluZVByb3BlcnR5IH0gZnJvbSAnLi4vLi4vdXRpbC9vYmplY3RzLmpzJztcbmltcG9ydCB7IGlzVGVtcGxhdGUsIGlzU3ZnLCBpc0Jvb2xlYW4sIGlzT2JqZWN0LCBpc0Z1bmN0aW9uLCBpc05pbCB9IGZyb20gJy4uLy4uL3V0aWwvY2hlY2tzLmpzJztcbmltcG9ydCB7IHBhbmljLCBtZW1vaXplLCBldmFsdWF0ZUF0dHJpYnV0ZUV4cHJlc3Npb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNjLmpzJztcblxuY29uc3QgSEVBRF9TWU1CT0wgPSBTeW1ib2woKTtcbmNvbnN0IFRBSUxfU1lNQk9MID0gU3ltYm9sKCk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSA8dGVtcGxhdGU+IGZyYWdtZW50cyB0ZXh0IG5vZGVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IHt7aGVhZDogVGV4dCwgdGFpbDogVGV4dH19XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRUYWlsUGxhY2Vob2xkZXJzKCkge1xuICBjb25zdCBoZWFkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBjb25zdCB0YWlsID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBoZWFkW0hFQURfU1lNQk9MXSA9IHRydWU7XG4gIHRhaWxbVEFJTF9TWU1CT0xdID0gdHJ1ZTtcbiAgcmV0dXJuIHtcbiAgICBoZWFkLFxuICAgIHRhaWxcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgdGhlIHRlbXBsYXRlIG1ldGEgb2JqZWN0IGluIGNhc2Ugb2YgPHRlbXBsYXRlPiBmcmFnbWVudHNcbiAqIEBwYXJhbSAgIHtUZW1wbGF0ZUNodW5rfSBjb21wb25lbnRUZW1wbGF0ZSAtIHRlbXBsYXRlIGNodW5rIG9iamVjdFxuICogQHJldHVybnMge09iamVjdH0gdGhlIG1ldGEgcHJvcGVydHkgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbW91bnQgZnVuY3Rpb24gb2YgdGhlIFRlbXBsYXRlQ2h1bmtcbiAqL1xuZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVNZXRhKGNvbXBvbmVudFRlbXBsYXRlKSB7XG4gIGNvbnN0IGZyYWdtZW50ID0gY29tcG9uZW50VGVtcGxhdGUuZG9tLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3Qge1xuICAgIGhlYWQsXG4gICAgdGFpbFxuICB9ID0gY3JlYXRlSGVhZFRhaWxQbGFjZWhvbGRlcnMoKTtcbiAgcmV0dXJuIHtcbiAgICBhdm9pZERPTUluamVjdGlvbjogdHJ1ZSxcbiAgICBmcmFnbWVudCxcbiAgICBoZWFkLFxuICAgIHRhaWwsXG4gICAgY2hpbGRyZW46IFtoZWFkLCAuLi5BcnJheS5mcm9tKGZyYWdtZW50LmNoaWxkTm9kZXMpLCB0YWlsXVxuICB9O1xufVxuXG4vKipcbiAqIElTQyBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIwLCBBbmRyZWEgR2lhbW1hcmNoaSwgQFdlYlJlZmxlY3Rpb25cbiAqXG4gKiBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbiAqIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbiAqIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuICogUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG4gKiBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG4gKiBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbiAqIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFXG4gKiBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG4gKiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuICovXG5cbi8vIGZvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vdWRvbWRpZmYgdmVyc2lvbiAxLjEuMFxuLy8gZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL3Vkb21kaWZmL3B1bGwvMlxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuLyoqXG4gKiBAcGFyYW0ge05vZGVbXX0gYSBUaGUgbGlzdCBvZiBjdXJyZW50L2xpdmUgY2hpbGRyZW5cbiAqIEBwYXJhbSB7Tm9kZVtdfSBiIFRoZSBsaXN0IG9mIGZ1dHVyZSBjaGlsZHJlblxuICogQHBhcmFtIHsoZW50cnk6IE5vZGUsIGFjdGlvbjogbnVtYmVyKSA9PiBOb2RlfSBnZXRcbiAqIFRoZSBjYWxsYmFjayBpbnZva2VkIHBlciBlYWNoIGVudHJ5IHJlbGF0ZWQgRE9NIG9wZXJhdGlvbi5cbiAqIEBwYXJhbSB7Tm9kZX0gW2JlZm9yZV0gVGhlIG9wdGlvbmFsIG5vZGUgdXNlZCBhcyBhbmNob3IgdG8gaW5zZXJ0IGJlZm9yZS5cbiAqIEByZXR1cm5zIHtOb2RlW119IFRoZSBzYW1lIGxpc3Qgb2YgZnV0dXJlIGNoaWxkcmVuLlxuICovXG5jb25zdCB1ZG9tZGlmZiA9IChhLCBiLCBnZXQsIGJlZm9yZSkgPT4ge1xuICBjb25zdCBiTGVuZ3RoID0gYi5sZW5ndGg7XG4gIGxldCBhRW5kID0gYS5sZW5ndGg7XG4gIGxldCBiRW5kID0gYkxlbmd0aDtcbiAgbGV0IGFTdGFydCA9IDA7XG4gIGxldCBiU3RhcnQgPSAwO1xuICBsZXQgbWFwID0gbnVsbDtcbiAgd2hpbGUgKGFTdGFydCA8IGFFbmQgfHwgYlN0YXJ0IDwgYkVuZCkge1xuICAgIC8vIGFwcGVuZCBoZWFkLCB0YWlsLCBvciBub2RlcyBpbiBiZXR3ZWVuOiBmYXN0IHBhdGhcbiAgICBpZiAoYUVuZCA9PT0gYVN0YXJ0KSB7XG4gICAgICAvLyB3ZSBjb3VsZCBiZSBpbiBhIHNpdHVhdGlvbiB3aGVyZSB0aGUgcmVzdCBvZiBub2RlcyB0aGF0XG4gICAgICAvLyBuZWVkIHRvIGJlIGFkZGVkIGFyZSBub3QgYXQgdGhlIGVuZCwgYW5kIGluIHN1Y2ggY2FzZVxuICAgICAgLy8gdGhlIG5vZGUgdG8gYGluc2VydEJlZm9yZWAsIGlmIHRoZSBpbmRleCBpcyBtb3JlIHRoYW4gMFxuICAgICAgLy8gbXVzdCBiZSByZXRyaWV2ZWQsIG90aGVyd2lzZSBpdCdzIGdvbm5hIGJlIHRoZSBmaXJzdCBpdGVtLlxuICAgICAgY29uc3Qgbm9kZSA9IGJFbmQgPCBiTGVuZ3RoID8gYlN0YXJ0ID8gZ2V0KGJbYlN0YXJ0IC0gMV0sIC0wKS5uZXh0U2libGluZyA6IGdldChiW2JFbmQgLSBiU3RhcnRdLCAwKSA6IGJlZm9yZTtcbiAgICAgIHdoaWxlIChiU3RhcnQgPCBiRW5kKSBpbnNlcnRCZWZvcmUoZ2V0KGJbYlN0YXJ0KytdLCAxKSwgbm9kZSk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBoZWFkIG9yIHRhaWw6IGZhc3QgcGF0aFxuICAgIGVsc2UgaWYgKGJFbmQgPT09IGJTdGFydCkge1xuICAgICAgd2hpbGUgKGFTdGFydCA8IGFFbmQpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBub2RlIG9ubHkgaWYgaXQncyB1bmtub3duIG9yIG5vdCBsaXZlXG4gICAgICAgIGlmICghbWFwIHx8ICFtYXAuaGFzKGFbYVN0YXJ0XSkpIHJlbW92ZUNoaWxkKGdldChhW2FTdGFydF0sIC0xKSk7XG4gICAgICAgIGFTdGFydCsrO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBzYW1lIG5vZGU6IGZhc3QgcGF0aFxuICAgIGVsc2UgaWYgKGFbYVN0YXJ0XSA9PT0gYltiU3RhcnRdKSB7XG4gICAgICBhU3RhcnQrKztcbiAgICAgIGJTdGFydCsrO1xuICAgIH1cbiAgICAvLyBzYW1lIHRhaWw6IGZhc3QgcGF0aFxuICAgIGVsc2UgaWYgKGFbYUVuZCAtIDFdID09PSBiW2JFbmQgLSAxXSkge1xuICAgICAgYUVuZC0tO1xuICAgICAgYkVuZC0tO1xuICAgIH1cbiAgICAvLyBUaGUgb25jZSBoZXJlIHNpbmdsZSBsYXN0IHN3YXAgXCJmYXN0IHBhdGhcIiBoYXMgYmVlbiByZW1vdmVkIGluIHYxLjEuMFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL3Vkb21kaWZmL2Jsb2Ivc2luZ2xlLWZpbmFsLXN3YXAvZXNtL2luZGV4LmpzI0w2OS1MODVcbiAgICAvLyByZXZlcnNlIHN3YXA6IGFsc28gZmFzdCBwYXRoXG4gICAgZWxzZSBpZiAoYVthU3RhcnRdID09PSBiW2JFbmQgLSAxXSAmJiBiW2JTdGFydF0gPT09IGFbYUVuZCAtIDFdKSB7XG4gICAgICAvLyB0aGlzIGlzIGEgXCJzaHJpbmtcIiBvcGVyYXRpb24gdGhhdCBjb3VsZCBoYXBwZW4gaW4gdGhlc2UgY2FzZXM6XG4gICAgICAvLyBbMSwgMiwgMywgNCwgNV1cbiAgICAgIC8vIFsxLCA0LCAzLCAyLCA1XVxuICAgICAgLy8gb3IgYXN5bW1ldHJpYyB0b29cbiAgICAgIC8vIFsxLCAyLCAzLCA0LCA1XVxuICAgICAgLy8gWzEsIDIsIDMsIDUsIDYsIDRdXG4gICAgICBjb25zdCBub2RlID0gZ2V0KGFbLS1hRW5kXSwgLTEpLm5leHRTaWJsaW5nO1xuICAgICAgaW5zZXJ0QmVmb3JlKGdldChiW2JTdGFydCsrXSwgMSksIGdldChhW2FTdGFydCsrXSwgLTEpLm5leHRTaWJsaW5nKTtcbiAgICAgIGluc2VydEJlZm9yZShnZXQoYlstLWJFbmRdLCAxKSwgbm9kZSk7XG4gICAgICAvLyBtYXJrIHRoZSBmdXR1cmUgaW5kZXggYXMgaWRlbnRpY2FsICh5ZWFoLCBpdCdzIGRpcnR5LCBidXQgY2hlYXAgXHVEODNEXHVEQzREKVxuICAgICAgLy8gVGhlIG1haW4gcmVhc29uIHRvIGRvIHRoaXMsIGlzIHRoYXQgd2hlbiBhW2FFbmRdIHdpbGwgYmUgcmVhY2hlZCxcbiAgICAgIC8vIHRoZSBsb29wIHdpbGwgbGlrZWx5IGJlIG9uIHRoZSBmYXN0IHBhdGgsIGFzIGlkZW50aWNhbCB0byBiW2JFbmRdLlxuICAgICAgLy8gSW4gdGhlIGJlc3QgY2FzZSBzY2VuYXJpbywgdGhlIG5leHQgbG9vcCB3aWxsIHNraXAgdGhlIHRhaWwsXG4gICAgICAvLyBidXQgaW4gdGhlIHdvcnN0IG9uZSwgdGhpcyBub2RlIHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhbHJlYWR5XG4gICAgICAvLyBwcm9jZXNzZWQsIGJhaWxpbmcgb3V0IHByZXR0eSBxdWlja2x5IGZyb20gdGhlIG1hcCBpbmRleCBjaGVja1xuICAgICAgYVthRW5kXSA9IGJbYkVuZF07XG4gICAgfVxuICAgIC8vIG1hcCBiYXNlZCBmYWxsYmFjaywgXCJzbG93XCIgcGF0aFxuICAgIGVsc2Uge1xuICAgICAgLy8gdGhlIG1hcCByZXF1aXJlcyBhbiBPKGJFbmQgLSBiU3RhcnQpIG9wZXJhdGlvbiBvbmNlXG4gICAgICAvLyB0byBzdG9yZSBhbGwgZnV0dXJlIG5vZGVzIGluZGV4ZXMgZm9yIGxhdGVyIHB1cnBvc2VzLlxuICAgICAgLy8gSW4gdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8sIHRoaXMgaXMgYSBmdWxsIE8oTikgY29zdCxcbiAgICAgIC8vIGFuZCBzdWNoIHNjZW5hcmlvIGhhcHBlbnMgYXQgbGVhc3Qgd2hlbiBhbGwgbm9kZXMgYXJlIGRpZmZlcmVudCxcbiAgICAgIC8vIGJ1dCBhbHNvIGlmIGJvdGggZmlyc3QgYW5kIGxhc3QgaXRlbXMgb2YgdGhlIGxpc3RzIGFyZSBkaWZmZXJlbnRcbiAgICAgIGlmICghbWFwKSB7XG4gICAgICAgIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGkgPSBiU3RhcnQ7XG4gICAgICAgIHdoaWxlIChpIDwgYkVuZCkgbWFwLnNldChiW2ldLCBpKyspO1xuICAgICAgfVxuICAgICAgLy8gaWYgaXQncyBhIGZ1dHVyZSBub2RlLCBoZW5jZSBpdCBuZWVkcyBzb21lIGhhbmRsaW5nXG4gICAgICBpZiAobWFwLmhhcyhhW2FTdGFydF0pKSB7XG4gICAgICAgIC8vIGdyYWIgdGhlIGluZGV4IG9mIHN1Y2ggbm9kZSwgJ2NhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBwcm9jZXNzZWRcbiAgICAgICAgY29uc3QgaW5kZXggPSBtYXAuZ2V0KGFbYVN0YXJ0XSk7XG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IGFscmVhZHkgcHJvY2Vzc2VkLCBsb29rIG9uIGRlbWFuZCBmb3IgdGhlIG5leHQgTENTXG4gICAgICAgIGlmIChiU3RhcnQgPCBpbmRleCAmJiBpbmRleCA8IGJFbmQpIHtcbiAgICAgICAgICBsZXQgaSA9IGFTdGFydDtcbiAgICAgICAgICAvLyBjb3VudHMgdGhlIGFtb3VudCBvZiBub2RlcyB0aGF0IGFyZSB0aGUgc2FtZSBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgbGV0IHNlcXVlbmNlID0gMTtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgYUVuZCAmJiBpIDwgYkVuZCAmJiBtYXAuZ2V0KGFbaV0pID09PSBpbmRleCArIHNlcXVlbmNlKSBzZXF1ZW5jZSsrO1xuICAgICAgICAgIC8vIGVmZm9ydCBkZWNpc2lvbiBoZXJlOiBpZiB0aGUgc2VxdWVuY2UgaXMgbG9uZ2VyIHRoYW4gcmVwbGFjZXNcbiAgICAgICAgICAvLyBuZWVkZWQgdG8gcmVhY2ggc3VjaCBzZXF1ZW5jZSwgd2hpY2ggd291bGQgYnJpbmdzIGFnYWluIHRoaXMgbG9vcFxuICAgICAgICAgIC8vIHRvIHRoZSBmYXN0IHBhdGgsIHByZXBlbmQgdGhlIGRpZmZlcmVuY2UgYmVmb3JlIGEgc2VxdWVuY2UsXG4gICAgICAgICAgLy8gYW5kIG1vdmUgb25seSB0aGUgZnV0dXJlIGxpc3QgaW5kZXggZm9yd2FyZCwgc28gdGhhdCBhU3RhcnRcbiAgICAgICAgICAvLyBhbmQgYlN0YXJ0IHdpbGwgYmUgYWxpZ25lZCBhZ2FpbiwgaGVuY2Ugb24gdGhlIGZhc3QgcGF0aC5cbiAgICAgICAgICAvLyBBbiBleGFtcGxlIGNvbnNpZGVyaW5nIGFTdGFydCBhbmQgYlN0YXJ0IGFyZSBib3RoIDA6XG4gICAgICAgICAgLy8gYTogWzEsIDIsIDMsIDRdXG4gICAgICAgICAgLy8gYjogWzcsIDEsIDIsIDMsIDZdXG4gICAgICAgICAgLy8gdGhpcyB3b3VsZCBwbGFjZSA3IGJlZm9yZSAxIGFuZCwgZnJvbSB0aGF0IHRpbWUgb24sIDEsIDIsIGFuZCAzXG4gICAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYXQgemVybyBjb3N0XG4gICAgICAgICAgaWYgKHNlcXVlbmNlID4gaW5kZXggLSBiU3RhcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBnZXQoYVthU3RhcnRdLCAwKTtcbiAgICAgICAgICAgIHdoaWxlIChiU3RhcnQgPCBpbmRleCkgaW5zZXJ0QmVmb3JlKGdldChiW2JTdGFydCsrXSwgMSksIG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiB0aGUgZWZmb3J0IHdhc24ndCBnb29kIGVub3VnaCwgZmFsbGJhY2sgdG8gYSByZXBsYWNlLFxuICAgICAgICAgIC8vIG1vdmluZyBib3RoIHNvdXJjZSBhbmQgdGFyZ2V0IGluZGV4ZXMgZm9yd2FyZCwgaG9waW5nIHRoYXQgc29tZVxuICAgICAgICAgIC8vIHNpbWlsYXIgbm9kZSB3aWxsIGJlIGZvdW5kIGxhdGVyIG9uLCB0byBnbyBiYWNrIHRvIHRoZSBmYXN0IHBhdGhcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcGxhY2VDaGlsZChnZXQoYltiU3RhcnQrK10sIDEpLCBnZXQoYVthU3RhcnQrK10sIC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBtb3ZlIHRoZSBzb3VyY2UgZm9yd2FyZCwgJ2NhdXNlIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuICAgICAgICBlbHNlIGFTdGFydCsrO1xuICAgICAgfVxuICAgICAgLy8gdGhpcyBub2RlIGhhcyBubyBtZWFuaW5nIGluIHRoZSBmdXR1cmUgbGlzdCwgc28gaXQncyBtb3JlIHRoYW4gc2FmZVxuICAgICAgLy8gdG8gcmVtb3ZlIGl0LCBhbmQgY2hlY2sgdGhlIG5leHQgbGl2ZSBub2RlIG91dCBpbnN0ZWFkLCBtZWFuaW5nXG4gICAgICAvLyB0aGF0IG9ubHkgdGhlIGxpdmUgbGlzdCBpbmRleCBzaG91bGQgYmUgZm9yd2FyZGVkXG4gICAgICBlbHNlIHJlbW92ZUNoaWxkKGdldChhW2FTdGFydCsrXSwgLTEpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGI7XG59O1xuY29uc3QgVU5NT1VOVF9TQ09QRSA9IFN5bWJvbCgndW5tb3VudCcpO1xuY29uc3QgRWFjaEJpbmRpbmcgPSB7XG4gIC8vIGR5bmFtaWMgYmluZGluZyBwcm9wZXJ0aWVzXG4gIC8vIGNoaWxkcmVuTWFwOiBudWxsLFxuICAvLyBub2RlOiBudWxsLFxuICAvLyByb290OiBudWxsLFxuICAvLyBjb25kaXRpb246IG51bGwsXG4gIC8vIGV2YWx1YXRlOiBudWxsLFxuICAvLyB0ZW1wbGF0ZTogbnVsbCxcbiAgLy8gaXNUZW1wbGF0ZVRhZzogZmFsc2UsXG4gIG5vZGVzOiBbXSxcbiAgLy8gZ2V0S2V5OiBudWxsLFxuICAvLyBpbmRleE5hbWU6IG51bGwsXG4gIC8vIGl0ZW1OYW1lOiBudWxsLFxuICAvLyBhZnRlclBsYWNlaG9sZGVyOiBudWxsLFxuICAvLyBwbGFjZWhvbGRlcjogbnVsbCxcblxuICAvLyBBUEkgbWV0aG9kc1xuICBtb3VudChzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoc2NvcGUsIHBhcmVudFNjb3BlKTtcbiAgfSxcbiAgdXBkYXRlKHNjb3BlLCBwYXJlbnRTY29wZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgbm9kZXMsXG4gICAgICBjaGlsZHJlbk1hcFxuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBzY29wZSA9PT0gVU5NT1VOVF9TQ09QRSA/IG51bGwgOiB0aGlzLmV2YWx1YXRlKHNjb3BlKTtcbiAgICBjb25zdCBpdGVtcyA9IGNvbGxlY3Rpb24gPyBBcnJheS5mcm9tKGNvbGxlY3Rpb24pIDogW107XG5cbiAgICAvLyBwcmVwYXJlIHRoZSBkaWZmaW5nXG4gICAgY29uc3Qge1xuICAgICAgbmV3Q2hpbGRyZW5NYXAsXG4gICAgICBiYXRjaGVzLFxuICAgICAgZnV0dXJlTm9kZXNcbiAgICB9ID0gY3JlYXRlUGF0Y2goaXRlbXMsIHNjb3BlLCBwYXJlbnRTY29wZSwgdGhpcyk7XG5cbiAgICAvLyBwYXRjaCB0aGUgRE9NIG9ubHkgaWYgdGhlcmUgYXJlIG5ldyBub2Rlc1xuICAgIHVkb21kaWZmKG5vZGVzLCBmdXR1cmVOb2RlcywgcGF0Y2goQXJyYXkuZnJvbShjaGlsZHJlbk1hcC52YWx1ZXMoKSksIHBhcmVudFNjb3BlKSwgcGxhY2Vob2xkZXIpO1xuXG4gICAgLy8gdHJpZ2dlciB0aGUgbW91bnRzIGFuZCB0aGUgdXBkYXRlc1xuICAgIGJhdGNoZXMuZm9yRWFjaChmbiA9PiBmbigpKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gbWFwXG4gICAgdGhpcy5jaGlsZHJlbk1hcCA9IG5ld0NoaWxkcmVuTWFwO1xuICAgIHRoaXMubm9kZXMgPSBmdXR1cmVOb2RlcztcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdW5tb3VudChzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICB0aGlzLnVwZGF0ZShVTk1PVU5UX1NDT1BFLCBwYXJlbnRTY29wZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbi8qKlxuICogUGF0Y2ggdGhlIERPTSB3aGlsZSBkaWZmaW5nXG4gKiBAcGFyYW0gICB7YW55W119IHJlZHVuZGFudCAtIGxpc3Qgb2YgYWxsIHRoZSBjaGlsZHJlbiAodGVtcGxhdGUsIG5vZGVzLCBjb250ZXh0KSBhZGRlZCB2aWEgZWFjaFxuICogQHBhcmFtICAgeyp9IHBhcmVudFNjb3BlIC0gc2NvcGUgb2YgdGhlIHBhcmVudCB0ZW1wbGF0ZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBwYXRjaCBmdW5jdGlvbiB1c2VkIGJ5IGRvbWRpZmZcbiAqL1xuZnVuY3Rpb24gcGF0Y2gocmVkdW5kYW50LCBwYXJlbnRTY29wZSkge1xuICByZXR1cm4gKGl0ZW0sIGluZm8pID0+IHtcbiAgICBpZiAoaW5mbyA8IDApIHtcbiAgICAgIC8vIGdldCB0aGUgbGFzdCBlbGVtZW50IGFkZGVkIHRvIHRoZSBjaGlsZHJlbk1hcCBzYXZlZCBwcmV2aW91c2x5XG4gICAgICBjb25zdCBlbGVtZW50ID0gcmVkdW5kYW50W3JlZHVuZGFudC5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIC8vIGdldCB0aGUgbm9kZXMgYW5kIHRoZSB0ZW1wbGF0ZSBpbiBzdG9yZWQgaW4gdGhlIGxhc3QgY2hpbGQgb2YgdGhlIGNoaWxkcmVuTWFwXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICBub2RlcyxcbiAgICAgICAgICBjb250ZXh0XG4gICAgICAgIH0gPSBlbGVtZW50O1xuICAgICAgICAvLyByZW1vdmUgdGhlIGxhc3Qgbm9kZSAobm90aWNlIDx0ZW1wbGF0ZT4gdGFncyBtaWdodCBoYXZlIG1vcmUgY2hpbGRyZW4gbm9kZXMpXG4gICAgICAgIG5vZGVzLnBvcCgpO1xuXG4gICAgICAgIC8vIG5vdGljZSB0aGF0IHdlIHBhc3MgbnVsbCBhcyBsYXN0IGFyZ3VtZW50IGJlY2F1c2VcbiAgICAgICAgLy8gdGhlIHJvb3Qgbm9kZSBhbmQgaXRzIGNoaWxkcmVuIHdpbGwgYmUgcmVtb3ZlZCBieSBkb21kaWZmXG4gICAgICAgIGlmICghbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gd2UgaGF2ZSBjbGVhcmVkIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgYW5kIHdlIGNhbiB1bm1vdW50IHRoaXMgdGVtcGxhdGVcbiAgICAgICAgICByZWR1bmRhbnQucG9wKCk7XG4gICAgICAgICAgdGVtcGxhdGUudW5tb3VudChjb250ZXh0LCBwYXJlbnRTY29wZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIHRlbXBsYXRlIG11c3QgYmUgZmlsdGVyZWQgZnJvbSBhIGxvb3BcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gY29uZGl0aW9uIC0gZmlsdGVyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBjb250ZXh0IC0gYXJndW1lbnQgcGFzc2VkIHRvIHRoZSBmaWx0ZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoaXMgaXRlbSBzaG91bGQgYmUgc2tpcHBlZFxuICovXG5mdW5jdGlvbiBtdXN0RmlsdGVySXRlbShjb25kaXRpb24sIGNvbnRleHQpIHtcbiAgcmV0dXJuIGNvbmRpdGlvbiA/ICFjb25kaXRpb24oY29udGV4dCkgOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBFeHRlbmQgdGhlIHNjb3BlIG9mIHRoZSBsb29wZWQgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHtPYmplY3R9IHNjb3BlIC0gY3VycmVudCB0ZW1wbGF0ZSBzY29wZVxuICogQHBhcmFtICAge09iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnNcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IG9wdGlvbnMuaXRlbU5hbWUgLSBrZXkgdG8gaWRlbnRpZnkgdGhlIGxvb3BlZCBpdGVtIGluIHRoZSBuZXcgY29udGV4dFxuICogQHBhcmFtICAge3N0cmluZ30gb3B0aW9ucy5pbmRleE5hbWUgLSBrZXkgdG8gaWRlbnRpZnkgdGhlIGluZGV4IG9mIHRoZSBsb29wZWQgaXRlbVxuICogQHBhcmFtICAge251bWJlcn0gb3B0aW9ucy5pbmRleCAtIGN1cnJlbnQgaW5kZXhcbiAqIEBwYXJhbSAgIHsqfSBvcHRpb25zLml0ZW0gLSBjb2xsZWN0aW9uIGl0ZW0gbG9vcGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBlbmhhbmNlZCBzY29wZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kU2NvcGUoc2NvcGUsIF9yZWYpIHtcbiAgbGV0IHtcbiAgICBpdGVtTmFtZSxcbiAgICBpbmRleE5hbWUsXG4gICAgaW5kZXgsXG4gICAgaXRlbVxuICB9ID0gX3JlZjtcbiAgZGVmaW5lUHJvcGVydHkoc2NvcGUsIGl0ZW1OYW1lLCBpdGVtKTtcbiAgaWYgKGluZGV4TmFtZSkgZGVmaW5lUHJvcGVydHkoc2NvcGUsIGluZGV4TmFtZSwgaW5kZXgpO1xuICByZXR1cm4gc2NvcGU7XG59XG5cbi8qKlxuICogTG9vcCB0aGUgY3VycmVudCB0ZW1wbGF0ZSBpdGVtc1xuICogQHBhcmFtICAge0FycmF5fSBpdGVtcyAtIGV4cHJlc3Npb24gY29sbGVjdGlvbiB2YWx1ZVxuICogQHBhcmFtICAgeyp9IHNjb3BlIC0gdGVtcGxhdGUgc2NvcGVcbiAqIEBwYXJhbSAgIHsqfSBwYXJlbnRTY29wZSAtIHNjb3BlIG9mIHRoZSBwYXJlbnQgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHtFYWNoQmluZGluZ30gYmluZGluZyAtIGVhY2ggYmluZGluZyBvYmplY3QgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IGRhdGFcbiAqIEByZXR1cm5zIHtNYXB9IGRhdGEubmV3Q2hpbGRyZW5NYXAgLSBhIE1hcCBjb250YWluaW5nIHRoZSBuZXcgY2hpbGRyZW4gdGVtcGxhdGUgc3RydWN0dXJlXG4gKiBAcmV0dXJucyB7QXJyYXl9IGRhdGEuYmF0Y2hlcyAtIGFycmF5IGNvbnRhaW5pbmcgdGhlIHRlbXBsYXRlIGxpZmVjeWNsZSBmdW5jdGlvbnMgdG8gdHJpZ2dlclxuICogQHJldHVybnMge0FycmF5fSBkYXRhLmZ1dHVyZU5vZGVzIC0gYXJyYXkgY29udGFpbmluZyB0aGUgbm9kZXMgd2UgbmVlZCB0byBkaWZmXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBhdGNoKGl0ZW1zLCBzY29wZSwgcGFyZW50U2NvcGUsIGJpbmRpbmcpIHtcbiAgY29uc3Qge1xuICAgIGNvbmRpdGlvbixcbiAgICB0ZW1wbGF0ZSxcbiAgICBjaGlsZHJlbk1hcCxcbiAgICBpdGVtTmFtZSxcbiAgICBnZXRLZXksXG4gICAgaW5kZXhOYW1lLFxuICAgIHJvb3QsXG4gICAgaXNUZW1wbGF0ZVRhZ1xuICB9ID0gYmluZGluZztcbiAgY29uc3QgbmV3Q2hpbGRyZW5NYXAgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IGJhdGNoZXMgPSBbXTtcbiAgY29uc3QgZnV0dXJlTm9kZXMgPSBbXTtcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gZXh0ZW5kU2NvcGUoT2JqZWN0LmNyZWF0ZShzY29wZSksIHtcbiAgICAgIGl0ZW1OYW1lLFxuICAgICAgaW5kZXhOYW1lLFxuICAgICAgaW5kZXgsXG4gICAgICBpdGVtXG4gICAgfSk7XG4gICAgY29uc3Qga2V5ID0gZ2V0S2V5ID8gZ2V0S2V5KGNvbnRleHQpIDogaW5kZXg7XG4gICAgY29uc3Qgb2xkSXRlbSA9IGNoaWxkcmVuTWFwLmdldChrZXkpO1xuICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgaWYgKG11c3RGaWx0ZXJJdGVtKGNvbmRpdGlvbiwgY29udGV4dCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbXVzdE1vdW50ID0gIW9sZEl0ZW07XG4gICAgY29uc3QgY29tcG9uZW50VGVtcGxhdGUgPSBvbGRJdGVtID8gb2xkSXRlbS50ZW1wbGF0ZSA6IHRlbXBsYXRlLmNsb25lKCk7XG4gICAgY29uc3QgZWwgPSBjb21wb25lbnRUZW1wbGF0ZS5lbCB8fCByb290LmNsb25lTm9kZSgpO1xuICAgIGNvbnN0IG1ldGEgPSBpc1RlbXBsYXRlVGFnICYmIG11c3RNb3VudCA/IGNyZWF0ZVRlbXBsYXRlTWV0YShjb21wb25lbnRUZW1wbGF0ZSkgOiBjb21wb25lbnRUZW1wbGF0ZS5tZXRhO1xuICAgIGlmIChtdXN0TW91bnQpIHtcbiAgICAgIGJhdGNoZXMucHVzaCgoKSA9PiBjb21wb25lbnRUZW1wbGF0ZS5tb3VudChlbCwgY29udGV4dCwgcGFyZW50U2NvcGUsIG1ldGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmF0Y2hlcy5wdXNoKCgpID0+IGNvbXBvbmVudFRlbXBsYXRlLnVwZGF0ZShjb250ZXh0LCBwYXJlbnRTY29wZSkpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0aGUgY29sbGVjdGlvbiBvZiBub2RlcyB0byB1cGRhdGUgb3IgdG8gYWRkXG4gICAgLy8gaW4gY2FzZSBvZiB0ZW1wbGF0ZSB0YWdzIHdlIG5lZWQgdG8gYWRkIGFsbCBpdHMgY2hpbGRyZW4gbm9kZXNcbiAgICBpZiAoaXNUZW1wbGF0ZVRhZykge1xuICAgICAgbm9kZXMucHVzaCguLi5tZXRhLmNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZXMucHVzaChlbCk7XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIHRoZSBvbGQgaXRlbSBmcm9tIHRoZSBjaGlsZHJlbiBtYXBcbiAgICBjaGlsZHJlbk1hcC5kZWxldGUoa2V5KTtcbiAgICBmdXR1cmVOb2Rlcy5wdXNoKC4uLm5vZGVzKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgY2hpbGRyZW4gbWFwXG4gICAgbmV3Q2hpbGRyZW5NYXAuc2V0KGtleSwge1xuICAgICAgbm9kZXMsXG4gICAgICB0ZW1wbGF0ZTogY29tcG9uZW50VGVtcGxhdGUsXG4gICAgICBjb250ZXh0LFxuICAgICAgaW5kZXhcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgbmV3Q2hpbGRyZW5NYXAsXG4gICAgYmF0Y2hlcyxcbiAgICBmdXR1cmVOb2Rlc1xuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlJDYobm9kZSwgX3JlZjIpIHtcbiAgbGV0IHtcbiAgICBldmFsdWF0ZSxcbiAgICBjb25kaXRpb24sXG4gICAgaXRlbU5hbWUsXG4gICAgaW5kZXhOYW1lLFxuICAgIGdldEtleSxcbiAgICB0ZW1wbGF0ZVxuICB9ID0gX3JlZjI7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICBjb25zdCByb290ID0gbm9kZS5jbG9uZU5vZGUoKTtcbiAgaW5zZXJ0QmVmb3JlKHBsYWNlaG9sZGVyLCBub2RlKTtcbiAgcmVtb3ZlQ2hpbGQobm9kZSk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBFYWNoQmluZGluZywge1xuICAgIGNoaWxkcmVuTWFwOiBuZXcgTWFwKCksXG4gICAgbm9kZSxcbiAgICByb290LFxuICAgIGNvbmRpdGlvbixcbiAgICBldmFsdWF0ZSxcbiAgICBpc1RlbXBsYXRlVGFnOiBpc1RlbXBsYXRlKHJvb3QpLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZS5jcmVhdGVET00obm9kZSksXG4gICAgZ2V0S2V5LFxuICAgIGluZGV4TmFtZSxcbiAgICBpdGVtTmFtZSxcbiAgICBwbGFjZWhvbGRlclxuICB9KTtcbn1cblxuLyoqXG4gKiBCaW5kaW5nIHJlc3BvbnNpYmxlIGZvciB0aGUgYGlmYCBkaXJlY3RpdmVcbiAqL1xuY29uc3QgSWZCaW5kaW5nID0ge1xuICAvLyBkeW5hbWljIGJpbmRpbmcgcHJvcGVydGllc1xuICAvLyBub2RlOiBudWxsLFxuICAvLyBldmFsdWF0ZTogbnVsbCxcbiAgLy8gaXNUZW1wbGF0ZVRhZzogZmFsc2UsXG4gIC8vIHBsYWNlaG9sZGVyOiBudWxsLFxuICAvLyB0ZW1wbGF0ZTogbnVsbCxcblxuICAvLyBBUEkgbWV0aG9kc1xuICBtb3VudChzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoc2NvcGUsIHBhcmVudFNjb3BlKTtcbiAgfSxcbiAgdXBkYXRlKHNjb3BlLCBwYXJlbnRTY29wZSkge1xuICAgIGNvbnN0IHZhbHVlID0gISF0aGlzLmV2YWx1YXRlKHNjb3BlKTtcbiAgICBjb25zdCBtdXN0TW91bnQgPSAhdGhpcy52YWx1ZSAmJiB2YWx1ZTtcbiAgICBjb25zdCBtdXN0VW5tb3VudCA9IHRoaXMudmFsdWUgJiYgIXZhbHVlO1xuICAgIGNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgcHJpc3RpbmUgPSB0aGlzLm5vZGUuY2xvbmVOb2RlKCk7XG4gICAgICBpbnNlcnRCZWZvcmUocHJpc3RpbmUsIHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUuY2xvbmUoKTtcbiAgICAgIHRoaXMudGVtcGxhdGUubW91bnQocHJpc3RpbmUsIHNjb3BlLCBwYXJlbnRTY29wZSk7XG4gICAgfTtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgbXVzdE1vdW50OlxuICAgICAgICBtb3VudCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbXVzdFVubW91bnQ6XG4gICAgICAgIHRoaXMudW5tb3VudChzY29wZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHZhbHVlKSB0aGlzLnRlbXBsYXRlLnVwZGF0ZShzY29wZSwgcGFyZW50U2NvcGUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHVubW91bnQoc2NvcGUsIHBhcmVudFNjb3BlKSB7XG4gICAgdGhpcy50ZW1wbGF0ZS51bm1vdW50KHNjb3BlLCBwYXJlbnRTY29wZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5mdW5jdGlvbiBjcmVhdGUkNShub2RlLCBfcmVmMykge1xuICBsZXQge1xuICAgIGV2YWx1YXRlLFxuICAgIHRlbXBsYXRlXG4gIH0gPSBfcmVmMztcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIGluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgbm9kZSk7XG4gIHJlbW92ZUNoaWxkKG5vZGUpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgSWZCaW5kaW5nLCB7XG4gICAgbm9kZSxcbiAgICBldmFsdWF0ZSxcbiAgICBwbGFjZWhvbGRlcixcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUuY3JlYXRlRE9NKG5vZGUpXG4gIH0pO1xufVxuY29uc3QgRWxlbWVudFByb3RvID0gdHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnID8ge30gOiBFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IGlzTmF0aXZlSHRtbFByb3BlcnR5ID0gbWVtb2l6ZShuYW1lID0+IEVsZW1lbnRQcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuLyoqXG4gKiBBZGQgYWxsIHRoZSBhdHRyaWJ1dGVzIHByb3ZpZGVkXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IG5vZGUgLSB0YXJnZXQgbm9kZVxuICogQHBhcmFtICAge09iamVjdH0gYXR0cmlidXRlcyAtIG9iamVjdCBjb250YWluaW5nIHRoZSBhdHRyaWJ1dGVzIG5hbWVzIGFuZCB2YWx1ZXNcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9IHNvcnJ5IGl0J3MgYSB2b2lkIGZ1bmN0aW9uIDooXG4gKi9cbmZ1bmN0aW9uIHNldEFsbEF0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKF9yZWY0ID0+IHtcbiAgICBsZXQgW25hbWUsIHZhbHVlXSA9IF9yZWY0O1xuICAgIHJldHVybiBhdHRyaWJ1dGVFeHByZXNzaW9uKG5vZGUsIHtcbiAgICAgIG5hbWVcbiAgICB9LCB2YWx1ZSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhbGwgdGhlIGF0dHJpYnV0ZXMgcHJvdmlkZWRcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gbm9kZSAtIHRhcmdldCBub2RlXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBuZXdBdHRyaWJ1dGVzIC0gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBuZXcgYXR0cmlidXRlIG5hbWVzXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBvbGRBdHRyaWJ1dGVzIC0gb2JqZWN0IGNvbnRhaW5pbmcgYWxsIHRoZSBvbGQgYXR0cmlidXRlIG5hbWVzXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfSBzb3JyeSBpdCdzIGEgdm9pZCBmdW5jdGlvbiA6KFxuICovXG5mdW5jdGlvbiByZW1vdmVBbGxBdHRyaWJ1dGVzKG5vZGUsIG5ld0F0dHJpYnV0ZXMsIG9sZEF0dHJpYnV0ZXMpIHtcbiAgY29uc3QgbmV3S2V5cyA9IG5ld0F0dHJpYnV0ZXMgPyBPYmplY3Qua2V5cyhuZXdBdHRyaWJ1dGVzKSA6IFtdO1xuICBPYmplY3Qua2V5cyhvbGRBdHRyaWJ1dGVzKS5maWx0ZXIobmFtZSA9PiAhbmV3S2V5cy5pbmNsdWRlcyhuYW1lKSkuZm9yRWFjaChhdHRyaWJ1dGUgPT4gbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKSk7XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgYXR0cmlidXRlIHZhbHVlIGNhbiBiZSByZW5kZXJlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIGV4cHJlc3Npb24gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHdlIGNhbiByZW5kZXIgdGhpcyBhdHRyaWJ1dGUgdmFsdWVcbiAqL1xuZnVuY3Rpb24gY2FuUmVuZGVyQXR0cmlidXRlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCBbJ3N0cmluZycsICdudW1iZXInXS5pbmNsdWRlcyh0eXBlb2YgdmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGF0dHJpYnV0ZSBzaG91bGQgYmUgcmVtb3ZlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSAtIGV4cHJlc3Npb24gdmFsdWVcbiAqIEByZXR1cm5zIHtib29sZWFufSBib29sZWFuIC0gdHJ1ZSBpZiB0aGUgYXR0cmlidXRlIGNhbiBiZSByZW1vdmVkfVxuICovXG5mdW5jdGlvbiBzaG91bGRSZW1vdmVBdHRyaWJ1dGUodmFsdWUpIHtcbiAgcmV0dXJuICF2YWx1ZSAmJiB2YWx1ZSAhPT0gMDtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZHMgaGFuZGxlcyB0aGUgRE9NIGF0dHJpYnV0ZXMgdXBkYXRlc1xuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBub2RlIC0gdGFyZ2V0IG5vZGVcbiAqIEBwYXJhbSAgIHtPYmplY3R9IGV4cHJlc3Npb24gLSBleHByZXNzaW9uIG9iamVjdFxuICogQHBhcmFtICAge3N0cmluZ30gZXhwcmVzc2lvbi5uYW1lIC0gYXR0cmlidXRlIG5hbWVcbiAqIEBwYXJhbSAgIHsqfSB2YWx1ZSAtIG5ldyBleHByZXNzaW9uIHZhbHVlXG4gKiBAcGFyYW0gICB7Kn0gb2xkVmFsdWUgLSB0aGUgb2xkIGV4cHJlc3Npb24gY2FjaGVkIHZhbHVlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBhdHRyaWJ1dGVFeHByZXNzaW9uKG5vZGUsIF9yZWY1LCB2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgbGV0IHtcbiAgICBuYW1lXG4gIH0gPSBfcmVmNTtcbiAgLy8gaXMgaXQgYSBzcHJlYWQgb3BlcmF0b3I/IHsuLi5hdHRyaWJ1dGVzfVxuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgIC8vIHJlbW92ZSBhbGwgdGhlIG9sZCBhdHRyaWJ1dGVzXG4gICAgICByZW1vdmVBbGxBdHRyaWJ1dGVzKG5vZGUsIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gaXMgdGhlIHZhbHVlIHN0aWxsIHRydXRoeT9cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHNldEFsbEF0dHJpYnV0ZXMobm9kZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBoYW5kbGUgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gIGlmICghaXNOYXRpdmVIdG1sUHJvcGVydHkobmFtZSkgJiYgKGlzQm9vbGVhbih2YWx1ZSkgfHwgaXNPYmplY3QodmFsdWUpIHx8IGlzRnVuY3Rpb24odmFsdWUpKSkge1xuICAgIG5vZGVbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuICBpZiAoc2hvdWxkUmVtb3ZlQXR0cmlidXRlKHZhbHVlKSkge1xuICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9IGVsc2UgaWYgKGNhblJlbmRlckF0dHJpYnV0ZSh2YWx1ZSkpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCBub3JtYWxpemVWYWx1ZShuYW1lLCB2YWx1ZSkpO1xuICB9XG59XG5cbi8qKlxuICogR2V0IHRoZSB2YWx1ZSBhcyBzdHJpbmdcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IG5hbWUgLSBhdHRyaWJ1dGUgbmFtZVxuICogQHBhcmFtICAgeyp9IHZhbHVlIC0gdXNlciBpbnB1dCB2YWx1ZVxuICogQHJldHVybnMge3N0cmluZ30gaW5wdXQgdmFsdWUgYXMgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKG5hbWUsIHZhbHVlKSB7XG4gIC8vIGJlIHN1cmUgdGhhdCBleHByZXNzaW9ucyBsaWtlIHNlbGVjdGVkPXsgdHJ1ZSB9IHdpbGwgYmUgYWx3YXlzIHJlbmRlcmVkIGFzIHNlbGVjdGVkPSdzZWxlY3RlZCdcbiAgcmV0dXJuIHZhbHVlID09PSB0cnVlID8gbmFtZSA6IHZhbHVlO1xufVxuY29uc3QgUkVfRVZFTlRTX1BSRUZJWCA9IC9eb24vO1xuY29uc3QgZ2V0Q2FsbGJhY2tBbmRPcHRpb25zID0gdmFsdWUgPT4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZSwgZmFsc2VdO1xuXG4vLyBzZWUgYWxzbyBodHRwczovL21lZGl1bS5jb20vQFdlYlJlZmxlY3Rpb24vZG9tLWhhbmRsZWV2ZW50LWEtY3Jvc3MtcGxhdGZvcm0tc3RhbmRhcmQtc2luY2UteWVhci0yMDAwLTViZjE3Mjg3ZmQzOFxuY29uc3QgRXZlbnRMaXN0ZW5lciA9IHtcbiAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICB0aGlzW2V2ZW50LnR5cGVdKGV2ZW50KTtcbiAgfVxufTtcbmNvbnN0IExpc3RlbmVyc1dlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY3JlYXRlTGlzdGVuZXIgPSBub2RlID0+IHtcbiAgY29uc3QgbGlzdGVuZXIgPSBPYmplY3QuY3JlYXRlKEV2ZW50TGlzdGVuZXIpO1xuICBMaXN0ZW5lcnNXZWFrTWFwLnNldChub2RlLCBsaXN0ZW5lcik7XG4gIHJldHVybiBsaXN0ZW5lcjtcbn07XG5cbi8qKlxuICogU2V0IGEgbmV3IGV2ZW50IGxpc3RlbmVyXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IG5vZGUgLSB0YXJnZXQgbm9kZVxuICogQHBhcmFtICAge09iamVjdH0gZXhwcmVzc2lvbiAtIGV4cHJlc3Npb24gb2JqZWN0XG4gKiBAcGFyYW0gICB7c3RyaW5nfSBleHByZXNzaW9uLm5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0gICB7Kn0gdmFsdWUgLSBuZXcgZXhwcmVzc2lvbiB2YWx1ZVxuICogQHJldHVybnMge3ZhbHVlfSB0aGUgY2FsbGJhY2sganVzdCByZWNlaXZlZFxuICovXG5mdW5jdGlvbiBldmVudEV4cHJlc3Npb24obm9kZSwgX3JlZjYsIHZhbHVlKSB7XG4gIGxldCB7XG4gICAgbmFtZVxuICB9ID0gX3JlZjY7XG4gIGNvbnN0IG5vcm1hbGl6ZWRFdmVudE5hbWUgPSBuYW1lLnJlcGxhY2UoUkVfRVZFTlRTX1BSRUZJWCwgJycpO1xuICBjb25zdCBldmVudExpc3RlbmVyID0gTGlzdGVuZXJzV2Vha01hcC5nZXQobm9kZSkgfHwgY3JlYXRlTGlzdGVuZXIobm9kZSk7XG4gIGNvbnN0IFtjYWxsYmFjaywgb3B0aW9uc10gPSBnZXRDYWxsYmFja0FuZE9wdGlvbnModmFsdWUpO1xuICBjb25zdCBoYW5kbGVyID0gZXZlbnRMaXN0ZW5lcltub3JtYWxpemVkRXZlbnROYW1lXTtcbiAgY29uc3QgbXVzdFJlbW92ZUV2ZW50ID0gaGFuZGxlciAmJiAhY2FsbGJhY2s7XG4gIGNvbnN0IG11c3RBZGRFdmVudCA9IGNhbGxiYWNrICYmICFoYW5kbGVyO1xuICBpZiAobXVzdFJlbW92ZUV2ZW50KSB7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5vcm1hbGl6ZWRFdmVudE5hbWUsIGV2ZW50TGlzdGVuZXIpO1xuICB9XG4gIGlmIChtdXN0QWRkRXZlbnQpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIobm9ybWFsaXplZEV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lciwgb3B0aW9ucyk7XG4gIH1cbiAgZXZlbnRMaXN0ZW5lcltub3JtYWxpemVkRXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgdXNlciB2YWx1ZSBpbiBvcmRlciB0byByZW5kZXIgYSBlbXB0eSBzdHJpbmcgaW4gY2FzZSBvZiBmYWxzeSB2YWx1ZXNcbiAqIEBwYXJhbSAgIHsqfSB2YWx1ZSAtIHVzZXIgaW5wdXQgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGhvcGVmdWxseSBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBub3JtYWxpemVTdHJpbmdWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gaXNOaWwodmFsdWUpID8gJycgOiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRoZSB0YXJnZXQgdGV4dCBub2RlIHRvIHVwZGF0ZSBvciBjcmVhdGUgb25lIGZyb20gb2YgYSBjb21tZW50IG5vZGVcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gbm9kZSAtIGFueSBodG1sIGVsZW1lbnQgY29udGFpbmluZyBjaGlsZE5vZGVzXG4gKiBAcGFyYW0gICB7bnVtYmVyfSBjaGlsZE5vZGVJbmRleCAtIGluZGV4IG9mIHRoZSB0ZXh0IG5vZGUgaW4gdGhlIGNoaWxkTm9kZXMgbGlzdFxuICogQHJldHVybnMge1RleHR9IHRoZSB0ZXh0IG5vZGUgdG8gdXBkYXRlXG4gKi9cbmNvbnN0IGdldFRleHROb2RlID0gKG5vZGUsIGNoaWxkTm9kZUluZGV4KSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IG5vZGUuY2hpbGROb2Rlc1tjaGlsZE5vZGVJbmRleF07XG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSB7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgbm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIHRhcmdldCk7XG4gICAgcmV0dXJuIHRleHROb2RlO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kcyBoYW5kbGVzIGEgc2ltcGxlIHRleHQgZXhwcmVzc2lvbiB1cGRhdGVcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gbm9kZSAtIHRhcmdldCBub2RlXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBkYXRhIC0gZXhwcmVzc2lvbiBvYmplY3RcbiAqIEBwYXJhbSAgIHsqfSB2YWx1ZSAtIG5ldyBleHByZXNzaW9uIHZhbHVlXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiB0ZXh0RXhwcmVzc2lvbihub2RlLCBkYXRhLCB2YWx1ZSkge1xuICBub2RlLmRhdGEgPSBub3JtYWxpemVTdHJpbmdWYWx1ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2RzIGhhbmRsZXMgdGhlIGlucHV0IGZpbGVkcyB2YWx1ZSB1cGRhdGVzXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IG5vZGUgLSB0YXJnZXQgbm9kZVxuICogQHBhcmFtICAge09iamVjdH0gZXhwcmVzc2lvbiAtIGV4cHJlc3Npb24gb2JqZWN0XG4gKiBAcGFyYW0gICB7Kn0gdmFsdWUgLSBuZXcgZXhwcmVzc2lvbiB2YWx1ZVxuICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gdmFsdWVFeHByZXNzaW9uKG5vZGUsIGV4cHJlc3Npb24sIHZhbHVlKSB7XG4gIG5vZGUudmFsdWUgPSBub3JtYWxpemVTdHJpbmdWYWx1ZSh2YWx1ZSk7XG59XG5jb25zdCBleHByZXNzaW9ucyA9IHtcbiAgW0FUVFJJQlVURV06IGF0dHJpYnV0ZUV4cHJlc3Npb24sXG4gIFtFVkVOVF06IGV2ZW50RXhwcmVzc2lvbixcbiAgW1RFWFRdOiB0ZXh0RXhwcmVzc2lvbixcbiAgW1ZBTFVFXTogdmFsdWVFeHByZXNzaW9uXG59O1xuY29uc3QgRXhwcmVzc2lvbiA9IHtcbiAgLy8gU3RhdGljIHByb3BzXG4gIC8vIG5vZGU6IG51bGwsXG4gIC8vIHZhbHVlOiBudWxsLFxuXG4gIC8vIEFQSSBtZXRob2RzXG4gIC8qKlxuICAgKiBNb3VudCB0aGUgZXhwcmVzc2lvbiBldmFsdWF0aW5nIGl0cyBpbml0aWFsIHZhbHVlXG4gICAqIEBwYXJhbSAgIHsqfSBzY29wZSAtIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgZXhwcmVzc2lvbiB0byBldmFsdWF0ZSBpdHMgY3VycmVudCB2YWx1ZXNcbiAgICogQHJldHVybnMge0V4cHJlc3Npb259IHNlbGZcbiAgICovXG4gIG1vdW50KHNjb3BlKSB7XG4gICAgLy8gaG9wZWZ1bGx5IGEgcHVyZSBmdW5jdGlvblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmV2YWx1YXRlKHNjb3BlKTtcblxuICAgIC8vIElPKCkgRE9NIHVwZGF0ZXNcbiAgICBhcHBseSh0aGlzLCB0aGlzLnZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZXhwcmVzc2lvbiBpZiBpdHMgdmFsdWUgY2hhbmdlZFxuICAgKiBAcGFyYW0gICB7Kn0gc2NvcGUgLSBhcmd1bWVudCBwYXNzZWQgdG8gdGhlIGV4cHJlc3Npb24gdG8gZXZhbHVhdGUgaXRzIGN1cnJlbnQgdmFsdWVzXG4gICAqIEByZXR1cm5zIHtFeHByZXNzaW9ufSBzZWxmXG4gICAqL1xuICB1cGRhdGUoc2NvcGUpIHtcbiAgICAvLyBwdXJlIGZ1bmN0aW9uXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmV2YWx1YXRlKHNjb3BlKTtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIElPKCkgRE9NIHVwZGF0ZXNcbiAgICAgIGFwcGx5KHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBFeHByZXNzaW9uIHRlYXJkb3duIG1ldGhvZFxuICAgKiBAcmV0dXJucyB7RXhwcmVzc2lvbn0gc2VsZlxuICAgKi9cbiAgdW5tb3VudCgpIHtcbiAgICAvLyB1bm1vdW50IG9ubHkgdGhlIGV2ZW50IGhhbmRsaW5nIGV4cHJlc3Npb25zXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gRVZFTlQpIGFwcGx5KHRoaXMsIG51bGwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG4vKipcbiAqIElPKCkgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBET00gdXBkYXRlc1xuICogQHBhcmFtIHtFeHByZXNzaW9ufSBleHByZXNzaW9uIC0gZXhwcmVzc2lvbiBvYmplY3RcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBjdXJyZW50IGV4cHJlc3Npb24gdmFsdWVcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGV4cHJlc3Npb24sIHZhbHVlKSB7XG4gIHJldHVybiBleHByZXNzaW9uc1tleHByZXNzaW9uLnR5cGVdKGV4cHJlc3Npb24ubm9kZSwgZXhwcmVzc2lvbiwgdmFsdWUsIGV4cHJlc3Npb24udmFsdWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlJDQobm9kZSwgZGF0YSkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgRXhwcmVzc2lvbiwgZGF0YSwge1xuICAgIG5vZGU6IGRhdGEudHlwZSA9PT0gVEVYVCA/IGdldFRleHROb2RlKG5vZGUsIGRhdGEuY2hpbGROb2RlSW5kZXgpIDogbm9kZVxuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBmbGF0IG9iamVjdCBoYXZpbmcgYXMga2V5cyBhIGxpc3Qgb2YgbWV0aG9kcyB0aGF0IGlmIGRpc3BhdGNoZWQgd2lsbCBwcm9wYWdhdGVcbiAqIG9uIHRoZSB3aG9sZSBjb2xsZWN0aW9uXG4gKiBAcGFyYW0gICB7QXJyYXl9IGNvbGxlY3Rpb24gLSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSAgIHtBcnJheTxzdHJpbmc+fSBtZXRob2RzIC0gbWV0aG9kcyB0byBleGVjdXRlIG9uIGVhY2ggaXRlbSBvZiB0aGUgY29sbGVjdGlvblxuICogQHBhcmFtICAgeyp9IGNvbnRleHQgLSBjb250ZXh0IHJldHVybmVkIGJ5IHRoZSBuZXcgbWV0aG9kcyBjcmVhdGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhIG5ldyBvYmplY3QgdG8gc2ltcGxpZnkgdGhlIHRoZSBuZXN0ZWQgbWV0aG9kcyBkaXNwYXRjaGluZ1xuICovXG5mdW5jdGlvbiBmbGF0dGVuQ29sbGVjdGlvbk1ldGhvZHMoY29sbGVjdGlvbiwgbWV0aG9kcywgY29udGV4dCkge1xuICByZXR1cm4gbWV0aG9kcy5yZWR1Y2UoKGFjYywgbWV0aG9kKSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjYywge1xuICAgICAgW21ldGhvZF06IHNjb3BlID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24ubWFwKGl0ZW0gPT4gaXRlbVttZXRob2RdKHNjb3BlKSkgJiYgY29udGV4dDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwge30pO1xufVxuZnVuY3Rpb24gY3JlYXRlJDMobm9kZSwgX3JlZjcpIHtcbiAgbGV0IHtcbiAgICBleHByZXNzaW9uc1xuICB9ID0gX3JlZjc7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBmbGF0dGVuQ29sbGVjdGlvbk1ldGhvZHMoZXhwcmVzc2lvbnMubWFwKGV4cHJlc3Npb24gPT4gY3JlYXRlJDQobm9kZSwgZXhwcmVzc2lvbikpLCBbJ21vdW50JywgJ3VwZGF0ZScsICd1bm1vdW50J10pKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZFBhcmVudFNjb3BlKGF0dHJpYnV0ZXMsIHNjb3BlLCBwYXJlbnRTY29wZSkge1xuICBpZiAoIWF0dHJpYnV0ZXMgfHwgIWF0dHJpYnV0ZXMubGVuZ3RoKSByZXR1cm4gcGFyZW50U2NvcGU7XG4gIGNvbnN0IGV4cHJlc3Npb25zID0gYXR0cmlidXRlcy5tYXAoYXR0ciA9PiBPYmplY3QuYXNzaWduKHt9LCBhdHRyLCB7XG4gICAgdmFsdWU6IGF0dHIuZXZhbHVhdGUoc2NvcGUpXG4gIH0pKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShwYXJlbnRTY29wZSB8fCBudWxsKSwgZXZhbHVhdGVBdHRyaWJ1dGVFeHByZXNzaW9ucyhleHByZXNzaW9ucykpO1xufVxuXG4vLyB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgbWVhbnQgdG8gZml4IGFuIGVkZ2UgY2FzZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3Jpb3QvcmlvdC9pc3N1ZXMvMjg0MlxuY29uc3QgZ2V0UmVhbFBhcmVudCA9IChzY29wZSwgcGFyZW50U2NvcGUpID0+IHNjb3BlW1BBUkVOVF9LRVlfU1lNQk9MXSB8fCBwYXJlbnRTY29wZTtcbmNvbnN0IFNsb3RCaW5kaW5nID0ge1xuICAvLyBkeW5hbWljIGJpbmRpbmcgcHJvcGVydGllc1xuICAvLyBub2RlOiBudWxsLFxuICAvLyBuYW1lOiBudWxsLFxuICBhdHRyaWJ1dGVzOiBbXSxcbiAgLy8gdGVtcGxhdGU6IG51bGwsXG5cbiAgZ2V0VGVtcGxhdGVTY29wZShzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICByZXR1cm4gZXh0ZW5kUGFyZW50U2NvcGUodGhpcy5hdHRyaWJ1dGVzLCBzY29wZSwgcGFyZW50U2NvcGUpO1xuICB9LFxuICAvLyBBUEkgbWV0aG9kc1xuICBtb3VudChzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZURhdGEgPSBzY29wZS5zbG90cyA/IHNjb3BlLnNsb3RzLmZpbmQoX3JlZjggPT4ge1xuICAgICAgbGV0IHtcbiAgICAgICAgaWRcbiAgICAgIH0gPSBfcmVmODtcbiAgICAgIHJldHVybiBpZCA9PT0gdGhpcy5uYW1lO1xuICAgIH0pIDogZmFsc2U7XG4gICAgY29uc3Qge1xuICAgICAgcGFyZW50Tm9kZVxuICAgIH0gPSB0aGlzLm5vZGU7XG4gICAgY29uc3QgcmVhbFBhcmVudCA9IGdldFJlYWxQYXJlbnQoc2NvcGUsIHBhcmVudFNjb3BlKTtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGVEYXRhICYmIGNyZWF0ZSh0ZW1wbGF0ZURhdGEuaHRtbCwgdGVtcGxhdGVEYXRhLmJpbmRpbmdzKS5jcmVhdGVET00ocGFyZW50Tm9kZSk7XG4gICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgIGNsZWFuTm9kZSh0aGlzLm5vZGUpO1xuICAgICAgdGhpcy50ZW1wbGF0ZS5tb3VudCh0aGlzLm5vZGUsIHRoaXMuZ2V0VGVtcGxhdGVTY29wZShzY29wZSwgcmVhbFBhcmVudCksIHJlYWxQYXJlbnQpO1xuICAgICAgdGhpcy50ZW1wbGF0ZS5jaGlsZHJlbiA9IEFycmF5LmZyb20odGhpcy5ub2RlLmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICBtb3ZlU2xvdElubmVyQ29udGVudCh0aGlzLm5vZGUpO1xuICAgIHJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHVwZGF0ZShzY29wZSwgcGFyZW50U2NvcGUpIHtcbiAgICBpZiAodGhpcy50ZW1wbGF0ZSkge1xuICAgICAgY29uc3QgcmVhbFBhcmVudCA9IGdldFJlYWxQYXJlbnQoc2NvcGUsIHBhcmVudFNjb3BlKTtcbiAgICAgIHRoaXMudGVtcGxhdGUudXBkYXRlKHRoaXMuZ2V0VGVtcGxhdGVTY29wZShzY29wZSwgcmVhbFBhcmVudCksIHJlYWxQYXJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdW5tb3VudChzY29wZSwgcGFyZW50U2NvcGUsIG11c3RSZW1vdmVSb290KSB7XG4gICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgIHRoaXMudGVtcGxhdGUudW5tb3VudCh0aGlzLmdldFRlbXBsYXRlU2NvcGUoc2NvcGUsIHBhcmVudFNjb3BlKSwgbnVsbCwgbXVzdFJlbW92ZVJvb3QpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxuLyoqXG4gKiBNb3ZlIHRoZSBpbm5lciBjb250ZW50IG9mIHRoZSBzbG90cyBvdXRzaWRlIG9mIHRoZW1cbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gc2xvdCAtIHNsb3Qgbm9kZVxuICogQHJldHVybnMge3VuZGVmaW5lZH0gaXQncyBhIHZvaWQgbWV0aG9kIFx1MDBBRlxcXyhcdTMwQzQpXy9cdTAwQUZcbiAqL1xuZnVuY3Rpb24gbW92ZVNsb3RJbm5lckNvbnRlbnQoc2xvdCkge1xuICBjb25zdCBjaGlsZCA9IHNsb3QgJiYgc2xvdC5maXJzdENoaWxkO1xuICBpZiAoIWNoaWxkKSByZXR1cm47XG4gIGluc2VydEJlZm9yZShjaGlsZCwgc2xvdCk7XG4gIG1vdmVTbG90SW5uZXJDb250ZW50KHNsb3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHNpbmdsZSBzbG90IGJpbmRpbmdcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gbm9kZSAtIHNsb3Qgbm9kZVxuICogQHBhcmFtICAge3N0cmluZ30gbmFtZSAtIHNsb3QgaWRcbiAqIEBwYXJhbSAgIHtBdHRyaWJ1dGVFeHByZXNzaW9uRGF0YVtdfSBhdHRyaWJ1dGVzIC0gc2xvdCBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBTbG90IGJpbmRpbmcgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qobm9kZSwgX3JlZjkpIHtcbiAgbGV0IHtcbiAgICBuYW1lLFxuICAgIGF0dHJpYnV0ZXNcbiAgfSA9IF9yZWY5O1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgU2xvdEJpbmRpbmcsIHtcbiAgICBhdHRyaWJ1dGVzLFxuICAgIG5vZGUsXG4gICAgbmFtZVxuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdGFnIG9iamVjdCBpZiBpdCB3YXMgcmVnaXN0ZXJlZCBiZWZvcmUsIG90aGVyd2lzZSBmYWxsYmFjayB0byB0aGUgc2ltcGxlXG4gKiB0ZW1wbGF0ZSBjaHVua1xuICogQHBhcmFtICAge0Z1bmN0aW9ufSBjb21wb25lbnQgLSBjb21wb25lbnQgZmFjdG9yeSBmdW5jdGlvblxuICogQHBhcmFtICAge0FycmF5PE9iamVjdD59IHNsb3RzIC0gYXJyYXkgY29udGFpbmluZyB0aGUgc2xvdHMgbWFya3VwXG4gKiBAcGFyYW0gICB7QXJyYXl9IGF0dHJpYnV0ZXMgLSBkeW5hbWljIGF0dHJpYnV0ZXMgdGhhdCB3aWxsIGJlIHJlY2VpdmVkIGJ5IHRoZSB0YWcgZWxlbWVudFxuICogQHJldHVybnMge1RhZ0ltcGxlbWVudGF0aW9ufFRlbXBsYXRlQ2h1bmt9IGEgdGFnIGltcGxlbWVudGF0aW9uIG9yIGEgdGVtcGxhdGUgY2h1bmsgYXMgZmFsbGJhY2tcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKGNvbXBvbmVudCwgc2xvdHMsIGF0dHJpYnV0ZXMpIHtcbiAgaWYgKHNsb3RzID09PSB2b2lkIDApIHtcbiAgICBzbG90cyA9IFtdO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzID09PSB2b2lkIDApIHtcbiAgICBhdHRyaWJ1dGVzID0gW107XG4gIH1cbiAgLy8gaWYgdGhpcyB0YWcgd2FzIHJlZ2lzdGVyZWQgYmVmb3JlIHdlIHdpbGwgcmV0dXJuIGl0cyBpbXBsZW1lbnRhdGlvblxuICBpZiAoY29tcG9uZW50KSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudCh7XG4gICAgICBzbG90cyxcbiAgICAgIGF0dHJpYnV0ZXNcbiAgICB9KTtcbiAgfVxuXG4gIC8vIG90aGVyd2lzZSB3ZSByZXR1cm4gYSB0ZW1wbGF0ZSBjaHVua1xuICByZXR1cm4gY3JlYXRlKHNsb3RzVG9NYXJrdXAoc2xvdHMpLCBbLi4uc2xvdEJpbmRpbmdzKHNsb3RzKSwge1xuICAgIC8vIHRoZSBhdHRyaWJ1dGVzIHNob3VsZCBiZSByZWdpc3RlcmVkIGFzIGJpbmRpbmdcbiAgICAvLyBpZiB3ZSBmYWxsYmFjayB0byBhIG5vcm1hbCB0ZW1wbGF0ZSBjaHVua1xuICAgIGV4cHJlc3Npb25zOiBhdHRyaWJ1dGVzLm1hcChhdHRyID0+IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgdHlwZTogQVRUUklCVVRFXG4gICAgICB9LCBhdHRyKTtcbiAgICB9KVxuICB9XSk7XG59XG5cbi8qKlxuICogTWVyZ2UgYWxsIHRoZSBzbG90cyBiaW5kaW5ncyBpbnRvIGEgc2luZ2xlIGFycmF5XG4gKiBAcGFyYW0gICB7QXJyYXk8T2JqZWN0Pn0gc2xvdHMgLSBzbG90cyBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7QXJyYXk8QmluZGluZ3M+fSBmbGF0dGVuIGJpbmRpbmdzIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHNsb3RCaW5kaW5ncyhzbG90cykge1xuICByZXR1cm4gc2xvdHMucmVkdWNlKChhY2MsIF9yZWYxMCkgPT4ge1xuICAgIGxldCB7XG4gICAgICBiaW5kaW5nc1xuICAgIH0gPSBfcmVmMTA7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQoYmluZGluZ3MpO1xuICB9LCBbXSk7XG59XG5cbi8qKlxuICogTWVyZ2UgYWxsIHRoZSBzbG90cyB0b2dldGhlciBpbiBhIHNpbmdsZSBtYXJrdXAgc3RyaW5nXG4gKiBAcGFyYW0gICB7QXJyYXk8T2JqZWN0Pn0gc2xvdHMgLSBzbG90cyBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBtYXJrdXAgb2YgYWxsIHRoZSBzbG90cyBpbiBhIHNpbmdsZSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gc2xvdHNUb01hcmt1cChzbG90cykge1xuICByZXR1cm4gc2xvdHMucmVkdWNlKChhY2MsIHNsb3QpID0+IHtcbiAgICByZXR1cm4gYWNjICsgc2xvdC5odG1sO1xuICB9LCAnJyk7XG59XG5jb25zdCBUYWdCaW5kaW5nID0ge1xuICAvLyBkeW5hbWljIGJpbmRpbmcgcHJvcGVydGllc1xuICAvLyBub2RlOiBudWxsLFxuICAvLyBldmFsdWF0ZTogbnVsbCxcbiAgLy8gbmFtZTogbnVsbCxcbiAgLy8gc2xvdHM6IG51bGwsXG4gIC8vIHRhZzogbnVsbCxcbiAgLy8gYXR0cmlidXRlczogbnVsbCxcbiAgLy8gZ2V0Q29tcG9uZW50OiBudWxsLFxuXG4gIG1vdW50KHNjb3BlKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHNjb3BlKTtcbiAgfSxcbiAgdXBkYXRlKHNjb3BlLCBwYXJlbnRTY29wZSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmV2YWx1YXRlKHNjb3BlKTtcblxuICAgIC8vIHNpbXBsZSB1cGRhdGVcbiAgICBpZiAobmFtZSAmJiBuYW1lID09PSB0aGlzLm5hbWUpIHtcbiAgICAgIHRoaXMudGFnLnVwZGF0ZShzY29wZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHVubW91bnQgdGhlIG9sZCB0YWcgaWYgaXQgZXhpc3RzXG4gICAgICB0aGlzLnVubW91bnQoc2NvcGUsIHBhcmVudFNjb3BlLCB0cnVlKTtcblxuICAgICAgLy8gbW91bnQgdGhlIG5ldyB0YWdcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLnRhZyA9IGdldFRhZyh0aGlzLmdldENvbXBvbmVudChuYW1lKSwgdGhpcy5zbG90cywgdGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgIHRoaXMudGFnLm1vdW50KHRoaXMubm9kZSwgc2NvcGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdW5tb3VudChzY29wZSwgcGFyZW50U2NvcGUsIGtlZXBSb290VGFnKSB7XG4gICAgaWYgKHRoaXMudGFnKSB7XG4gICAgICAvLyBrZWVwIHRoZSByb290IHRhZ1xuICAgICAgdGhpcy50YWcudW5tb3VudChrZWVwUm9vdFRhZyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlJDIobm9kZSwgX3JlZjExKSB7XG4gIGxldCB7XG4gICAgZXZhbHVhdGUsXG4gICAgZ2V0Q29tcG9uZW50LFxuICAgIHNsb3RzLFxuICAgIGF0dHJpYnV0ZXNcbiAgfSA9IF9yZWYxMTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIFRhZ0JpbmRpbmcsIHtcbiAgICBub2RlLFxuICAgIGV2YWx1YXRlLFxuICAgIHNsb3RzLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgZ2V0Q29tcG9uZW50XG4gIH0pO1xufVxuY29uc3QgYmluZGluZ3MgPSB7XG4gIFtJRl06IGNyZWF0ZSQ1LFxuICBbU0lNUExFXTogY3JlYXRlJDMsXG4gIFtFQUNIXTogY3JlYXRlJDYsXG4gIFtUQUddOiBjcmVhdGUkMixcbiAgW1NMT1RdOiBjcmVhdGVTbG90XG59O1xuXG4vKipcbiAqIFRleHQgZXhwcmVzc2lvbnMgaW4gYSB0ZW1wbGF0ZSB0YWcgd2lsbCBnZXQgY2hpbGROb2RlSW5kZXggdmFsdWUgbm9ybWFsaXplZFxuICogZGVwZW5kaW5nIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgPHRlbXBsYXRlPiB0YWcgb2Zmc2V0XG4gKiBAcGFyYW0gICB7RXhwcmVzc2lvbltdfSBleHByZXNzaW9ucyAtIHJpb3QgZXhwcmVzc2lvbnMgYXJyYXlcbiAqIEBwYXJhbSAgIHtudW1iZXJ9IHRleHRFeHByZXNzaW9uc09mZnNldCAtIG9mZnNldCBvZiB0aGUgPHRlbXBsYXRlPiB0YWdcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uW119IGV4cHJlc3Npb25zIGNvbnRhaW5pbmcgdGhlIHRleHQgZXhwcmVzc2lvbnMgbm9ybWFsaXplZFxuICovXG5mdW5jdGlvbiBmaXhUZXh0RXhwcmVzc2lvbnNPZmZzZXQoZXhwcmVzc2lvbnMsIHRleHRFeHByZXNzaW9uc09mZnNldCkge1xuICByZXR1cm4gZXhwcmVzc2lvbnMubWFwKGUgPT4gZS50eXBlID09PSBURVhUID8gT2JqZWN0LmFzc2lnbih7fSwgZSwge1xuICAgIGNoaWxkTm9kZUluZGV4OiBlLmNoaWxkTm9kZUluZGV4ICsgdGV4dEV4cHJlc3Npb25zT2Zmc2V0XG4gIH0pIDogZSk7XG59XG5cbi8qKlxuICogQmluZCBhIG5ldyBleHByZXNzaW9uIG9iamVjdCB0byBhIERPTSBub2RlXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IHJvb3QgLSBET00gbm9kZSB3aGVyZSB0byBiaW5kIHRoZSBleHByZXNzaW9uXG4gKiBAcGFyYW0gICB7VGFnQmluZGluZ0RhdGF9IGJpbmRpbmcgLSBiaW5kaW5nIGRhdGFcbiAqIEBwYXJhbSAgIHtudW1iZXJ8bnVsbH0gdGVtcGxhdGVUYWdPZmZzZXQgLSBpZiBpdCdzIGRlZmluZWQgd2UgbmVlZCB0byBmaXggdGhlIHRleHQgZXhwcmVzc2lvbnMgY2hpbGROb2RlSW5kZXggb2Zmc2V0XG4gKiBAcmV0dXJucyB7QmluZGluZ30gQmluZGluZyBvYmplY3RcbiAqL1xuZnVuY3Rpb24gY3JlYXRlJDEocm9vdCwgYmluZGluZywgdGVtcGxhdGVUYWdPZmZzZXQpIHtcbiAgY29uc3Qge1xuICAgIHNlbGVjdG9yLFxuICAgIHR5cGUsXG4gICAgcmVkdW5kYW50QXR0cmlidXRlLFxuICAgIGV4cHJlc3Npb25zXG4gIH0gPSBiaW5kaW5nO1xuICAvLyBmaW5kIHRoZSBub2RlIHRvIGFwcGx5IHRoZSBiaW5kaW5nc1xuICBjb25zdCBub2RlID0gc2VsZWN0b3IgPyByb290LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpIDogcm9vdDtcblxuICAvLyByZW1vdmUgZXZlbnR1YWxseSBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgY3JlYXRlZCBvbmx5IHRvIHNlbGVjdCB0aGlzIG5vZGVcbiAgaWYgKHJlZHVuZGFudEF0dHJpYnV0ZSkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmVkdW5kYW50QXR0cmlidXRlKTtcbiAgY29uc3QgYmluZGluZ0V4cHJlc3Npb25zID0gZXhwcmVzc2lvbnMgfHwgW107XG5cbiAgLy8gaW5pdCB0aGUgYmluZGluZ1xuICByZXR1cm4gKGJpbmRpbmdzW3R5cGVdIHx8IGJpbmRpbmdzW1NJTVBMRV0pKG5vZGUsIE9iamVjdC5hc3NpZ24oe30sIGJpbmRpbmcsIHtcbiAgICBleHByZXNzaW9uczogdGVtcGxhdGVUYWdPZmZzZXQgJiYgIXNlbGVjdG9yID8gZml4VGV4dEV4cHJlc3Npb25zT2Zmc2V0KGJpbmRpbmdFeHByZXNzaW9ucywgdGVtcGxhdGVUYWdPZmZzZXQpIDogYmluZGluZ0V4cHJlc3Npb25zXG4gIH0pKTtcbn1cblxuLy8gaW4gdGhpcyBjYXNlIGEgc2ltcGxlIGlubmVySFRNTCBpcyBlbm91Z2hcbmZ1bmN0aW9uIGNyZWF0ZUhUTUxUcmVlKGh0bWwsIHJvb3QpIHtcbiAgY29uc3QgdGVtcGxhdGUgPSBpc1RlbXBsYXRlKHJvb3QpID8gcm9vdCA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWw7XG4gIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50O1xufVxuXG4vLyBmb3Igc3ZnIG5vZGVzIHdlIG5lZWQgYSBiaXQgbW9yZSB3b3JrXG5mdW5jdGlvbiBjcmVhdGVTVkdUcmVlKGh0bWwsIGNvbnRhaW5lcikge1xuICAvLyBjcmVhdGUgdGhlIFNWR05vZGVcbiAgY29uc3Qgc3ZnTm9kZSA9IGNvbnRhaW5lci5vd25lckRvY3VtZW50LmltcG9ydE5vZGUobmV3IHdpbmRvdy5ET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPiR7aHRtbH08L3N2Zz5gLCAnYXBwbGljYXRpb24veG1sJykuZG9jdW1lbnRFbGVtZW50LCB0cnVlKTtcbiAgcmV0dXJuIHN2Z05vZGU7XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBET00gdGhhdCB3aWxsIGJlIGluamVjdGVkXG4gKiBAcGFyYW0ge09iamVjdH0gcm9vdCAtIERPTSBub2RlIHRvIGZpbmQgb3V0IHRoZSBjb250ZXh0IHdoZXJlIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWRcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IGh0bWwgLSBET00gdG8gY3JlYXRlIGFzIHN0cmluZ1xuICogQHJldHVybnMge0hUTUxEb2N1bWVudEZyYWdtZW50fEhUTUxFbGVtZW50fSBhIG5ldyBodG1sIGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTVRyZWUocm9vdCwgaHRtbCkge1xuICBpZiAoaXNTdmcocm9vdCkpIHJldHVybiBjcmVhdGVTVkdUcmVlKGh0bWwsIHJvb3QpO1xuICByZXR1cm4gY3JlYXRlSFRNTFRyZWUoaHRtbCwgcm9vdCk7XG59XG5cbi8qKlxuICogSW5qZWN0IHRoZSBET00gdHJlZSBpbnRvIGEgdGFyZ2V0IG5vZGVcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWwgLSB0YXJnZXQgZWxlbWVudFxuICogQHBhcmFtICAge0RvY3VtZW50RnJhZ21lbnR8U1ZHRWxlbWVudH0gZG9tIC0gZG9tIHRyZWUgdG8gaW5qZWN0XG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBpbmplY3RET00oZWwsIGRvbSkge1xuICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIGlzU3ZnKGVsKTpcbiAgICAgIG1vdmVDaGlsZHJlbihkb20sIGVsKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgaXNUZW1wbGF0ZShlbCk6XG4gICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChkb20sIGVsKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBlbC5hcHBlbmRDaGlsZChkb20pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBUZW1wbGF0ZSBET00gc2tlbGV0b25cbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWwgLSByb290IG5vZGUgd2hlcmUgdGhlIERPTSB3aWxsIGJlIGluamVjdGVkXG4gKiBAcGFyYW0gICB7c3RyaW5nfEhUTUxFbGVtZW50fSBodG1sIC0gSFRNTCBtYXJrdXAgb3IgSFRNTEVsZW1lbnQgdGhhdCB3aWxsIGJlIGluamVjdGVkIGludG8gdGhlIHJvb3Qgbm9kZVxuICogQHJldHVybnMgez9Eb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCB0aGF0IHdpbGwgYmUgaW5qZWN0ZWQgaW50byB0aGUgcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlRE9NKGVsLCBodG1sKSB7XG4gIHJldHVybiBodG1sICYmICh0eXBlb2YgaHRtbCA9PT0gJ3N0cmluZycgPyBjcmVhdGVET01UcmVlKGVsLCBodG1sKSA6IGh0bWwpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb2Zmc2V0IG9mIHRoZSA8dGVtcGxhdGU+IHRhZ1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50Tm9kZSAtIHRlbXBsYXRlIHRhZyBwYXJlbnQgbm9kZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSB0aGUgdGVtcGxhdGUgdGFnIHdlIHdhbnQgdG8gcmVuZGVyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXRhIC0gbWV0YSBwcm9wZXJ0aWVzIG5lZWRlZCB0byBoYW5kbGUgdGhlIDx0ZW1wbGF0ZT4gdGFncyBpbiBsb29wc1xuICogQHJldHVybnMge251bWJlcn0gb2Zmc2V0IG9mIHRoZSA8dGVtcGxhdGU+IHRhZyBjYWxjdWxhdGVkIGZyb20gaXRzIHNpYmxpbmdzIERPTSBub2Rlc1xuICovXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZVRhZ09mZnNldChwYXJlbnROb2RlLCBlbCwgbWV0YSkge1xuICBjb25zdCBzaWJsaW5ncyA9IEFycmF5LmZyb20ocGFyZW50Tm9kZS5jaGlsZE5vZGVzKTtcbiAgcmV0dXJuIE1hdGgubWF4KHNpYmxpbmdzLmluZGV4T2YoZWwpLCBzaWJsaW5ncy5pbmRleE9mKG1ldGEuaGVhZCkgKyAxLCAwKTtcbn1cblxuLyoqXG4gKiBUZW1wbGF0ZSBDaHVuayBtb2RlbFxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgVGVtcGxhdGVDaHVuayA9IHtcbiAgLy8gU3RhdGljIHByb3BzXG4gIC8vIGJpbmRpbmdzOiBudWxsLFxuICAvLyBiaW5kaW5nc0RhdGE6IG51bGwsXG4gIC8vIGh0bWw6IG51bGwsXG4gIC8vIGlzVGVtcGxhdGVUYWc6IGZhbHNlLFxuICAvLyBmcmFnbWVudDogbnVsbCxcbiAgLy8gY2hpbGRyZW46IG51bGwsXG4gIC8vIGRvbTogbnVsbCxcbiAgLy8gZWw6IG51bGwsXG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgdGVtcGxhdGUgRE9NIHN0cnVjdHVyZSB0aGF0IHdpbGwgYmUgY2xvbmVkIG9uIGVhY2ggbW91bnRcbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBlbCAtIHRoZSByb290IG5vZGVcbiAgICogQHJldHVybnMge1RlbXBsYXRlQ2h1bmt9IHNlbGZcbiAgICovXG4gIGNyZWF0ZURPTShlbCkge1xuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBET00gZ2V0cyBjcmVhdGVkIGJlZm9yZSBjbG9uaW5nIHRoZSB0ZW1wbGF0ZVxuICAgIHRoaXMuZG9tID0gdGhpcy5kb20gfHwgY3JlYXRlVGVtcGxhdGVET00oZWwsIHRoaXMuaHRtbCkgfHwgZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyBBUEkgbWV0aG9kc1xuICAvKipcbiAgICogQXR0YWNoIHRoZSB0ZW1wbGF0ZSB0byBhIERPTSBub2RlXG4gICAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWwgLSB0YXJnZXQgRE9NIG5vZGVcbiAgICogQHBhcmFtICAgeyp9IHNjb3BlIC0gdGVtcGxhdGUgZGF0YVxuICAgKiBAcGFyYW0gICB7Kn0gcGFyZW50U2NvcGUgLSBzY29wZSBvZiB0aGUgcGFyZW50IHRlbXBsYXRlIHRhZ1xuICAgKiBAcGFyYW0gICB7T2JqZWN0fSBtZXRhIC0gbWV0YSBwcm9wZXJ0aWVzIG5lZWRlZCB0byBoYW5kbGUgdGhlIDx0ZW1wbGF0ZT4gdGFncyBpbiBsb29wc1xuICAgKiBAcmV0dXJucyB7VGVtcGxhdGVDaHVua30gc2VsZlxuICAgKi9cbiAgbW91bnQoZWwsIHNjb3BlLCBwYXJlbnRTY29wZSwgbWV0YSkge1xuICAgIGlmIChtZXRhID09PSB2b2lkIDApIHtcbiAgICAgIG1ldGEgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFlbCkgcGFuaWMoJ1BsZWFzZSBwcm92aWRlIERPTSBub2RlIHRvIG1vdW50IHByb3Blcmx5IHlvdXIgdGVtcGxhdGUnKTtcbiAgICBpZiAodGhpcy5lbCkgdGhpcy51bm1vdW50KHNjb3BlKTtcblxuICAgIC8vIDx0ZW1wbGF0ZT4gdGFncyByZXF1aXJlIGEgYml0IG1vcmUgd29ya1xuICAgIC8vIHRoZSB0ZW1wbGF0ZSBmcmFnbWVudCBtaWdodCBiZSBhbHJlYWR5IGNyZWF0ZWQgdmlhIG1ldGEgb3V0c2lkZSBvZiB0aGlzIGNhbGxcbiAgICBjb25zdCB7XG4gICAgICBmcmFnbWVudCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgYXZvaWRET01JbmplY3Rpb25cbiAgICB9ID0gbWV0YTtcbiAgICAvLyA8dGVtcGxhdGU+IGJpbmRpbmdzIG9mIGNvdXJzZSBjYW4gbm90IGhhdmUgYSByb290IGVsZW1lbnRcbiAgICAvLyBzbyB3ZSBjaGVjayB0aGUgcGFyZW50IG5vZGUgdG8gc2V0IHRoZSBxdWVyeSBzZWxlY3RvciBiaW5kaW5nc1xuICAgIGNvbnN0IHtcbiAgICAgIHBhcmVudE5vZGVcbiAgICB9ID0gY2hpbGRyZW4gPyBjaGlsZHJlblswXSA6IGVsO1xuICAgIGNvbnN0IGlzVGVtcGxhdGVUYWcgPSBpc1RlbXBsYXRlKGVsKTtcbiAgICBjb25zdCB0ZW1wbGF0ZVRhZ09mZnNldCA9IGlzVGVtcGxhdGVUYWcgPyBnZXRUZW1wbGF0ZVRhZ09mZnNldChwYXJlbnROb2RlLCBlbCwgbWV0YSkgOiBudWxsO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gaWYgaXQgd2Fzbid0IGNyZWF0ZWQgYmVmb3JlXG4gICAgdGhpcy5jcmVhdGVET00oZWwpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gb2YgdGhpcyB0ZW1wbGF0ZSBjbG9uaW5nIHRoZSBvcmlnaW5hbCBET00gc3RydWN0dXJlIHN0b3JlZCBpbiB0aGlzIGluc3RhbmNlXG4gICAgLy8gbm90aWNlIHRoYXQgaWYgYSBkb2N1bWVudEZyYWdtZW50IHdhcyBwYXNzZWQgKHZpYSBtZXRhKSB3ZSB3aWxsIHVzZSBpdCBpbnN0ZWFkXG4gICAgY29uc3QgY2xvbmVOb2RlID0gZnJhZ21lbnQgfHwgdGhpcy5kb20uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgLy8gc3RvcmUgcm9vdCBub2RlXG4gICAgLy8gbm90aWNlIHRoYXQgZm9yIHRlbXBsYXRlIHRhZ3MgdGhlIHJvb3Qgbm90ZSB3aWxsIGJlIHRoZSBwYXJlbnQgdGFnXG4gICAgdGhpcy5lbCA9IGlzVGVtcGxhdGVUYWcgPyBwYXJlbnROb2RlIDogZWw7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoaWxkcmVuIGFycmF5IG9ubHkgZm9yIHRoZSA8dGVtcGxhdGU+IGZyYWdtZW50c1xuICAgIHRoaXMuY2hpbGRyZW4gPSBpc1RlbXBsYXRlVGFnID8gY2hpbGRyZW4gfHwgQXJyYXkuZnJvbShjbG9uZU5vZGUuY2hpbGROb2RlcykgOiBudWxsO1xuXG4gICAgLy8gaW5qZWN0IHRoZSBET00gaW50byB0aGUgZWwgb25seSBpZiBhIGZyYWdtZW50IGlzIGF2YWlsYWJsZVxuICAgIGlmICghYXZvaWRET01JbmplY3Rpb24gJiYgY2xvbmVOb2RlKSBpbmplY3RET00oZWwsIGNsb25lTm9kZSk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIGJpbmRpbmdzXG4gICAgdGhpcy5iaW5kaW5ncyA9IHRoaXMuYmluZGluZ3NEYXRhLm1hcChiaW5kaW5nID0+IGNyZWF0ZSQxKHRoaXMuZWwsIGJpbmRpbmcsIHRlbXBsYXRlVGFnT2Zmc2V0KSk7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGIgPT4gYi5tb3VudChzY29wZSwgcGFyZW50U2NvcGUpKTtcblxuICAgIC8vIHN0b3JlIHRoZSB0ZW1wbGF0ZSBtZXRhIHByb3BlcnRpZXNcbiAgICB0aGlzLm1ldGEgPSBtZXRhO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0ZW1wbGF0ZSB3aXRoIGZyZXNoIGRhdGFcbiAgICogQHBhcmFtICAgeyp9IHNjb3BlIC0gdGVtcGxhdGUgZGF0YVxuICAgKiBAcGFyYW0gICB7Kn0gcGFyZW50U2NvcGUgLSBzY29wZSBvZiB0aGUgcGFyZW50IHRlbXBsYXRlIHRhZ1xuICAgKiBAcmV0dXJucyB7VGVtcGxhdGVDaHVua30gc2VsZlxuICAgKi9cbiAgdXBkYXRlKHNjb3BlLCBwYXJlbnRTY29wZSkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiID0+IGIudXBkYXRlKHNjb3BlLCBwYXJlbnRTY29wZSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogUmVtb3ZlIHRoZSB0ZW1wbGF0ZSBmcm9tIHRoZSBub2RlIHdoZXJlIGl0IHdhcyBpbml0aWFsbHkgbW91bnRlZFxuICAgKiBAcGFyYW0gICB7Kn0gc2NvcGUgLSB0ZW1wbGF0ZSBkYXRhXG4gICAqIEBwYXJhbSAgIHsqfSBwYXJlbnRTY29wZSAtIHNjb3BlIG9mIHRoZSBwYXJlbnQgdGVtcGxhdGUgdGFnXG4gICAqIEBwYXJhbSAgIHtib29sZWFufG51bGx9IG11c3RSZW1vdmVSb290IC0gaWYgdHJ1ZSByZW1vdmUgdGhlIHJvb3QgZWxlbWVudCxcbiAgICogaWYgZmFsc2Ugb3IgdW5kZWZpbmVkIGNsZWFuIHRoZSByb290IHRhZyBjb250ZW50LCBpZiBudWxsIGRvbid0IHRvdWNoIHRoZSBET01cbiAgICogQHJldHVybnMge1RlbXBsYXRlQ2h1bmt9IHNlbGZcbiAgICovXG4gIHVubW91bnQoc2NvcGUsIHBhcmVudFNjb3BlLCBtdXN0UmVtb3ZlUm9vdCkge1xuICAgIGlmIChtdXN0UmVtb3ZlUm9vdCA9PT0gdm9pZCAwKSB7XG4gICAgICBtdXN0UmVtb3ZlUm9vdCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBlbCA9IHRoaXMuZWw7XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiID0+IGIudW5tb3VudChzY29wZSwgcGFyZW50U2NvcGUsIG11c3RSZW1vdmVSb290KSk7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAvLyBwdXJlIGNvbXBvbmVudHMgc2hvdWxkIGhhbmRsZSB0aGUgRE9NIHVubW91bnQgdXBkYXRlcyBieSB0aGVtc2VsdmVzXG4gICAgICAvLyBmb3IgbXVzdFJlbW92ZVJvb3QgPT09IG51bGwgZG9uJ3QgdG91Y2ggdGhlIERPTVxuICAgICAgY2FzZSBlbFtJU19QVVJFX1NZTUJPTF0gfHwgbXVzdFJlbW92ZVJvb3QgPT09IG51bGw6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBpZiBjaGlsZHJlbiBhcmUgZGVjbGFyZWQsIGNsZWFyIHRoZW1cbiAgICAgIC8vIGFwcGxpY2FibGUgZm9yIDx0ZW1wbGF0ZT4gYW5kIDxzbG90Lz4gYmluZGluZ3NcbiAgICAgIGNhc2UgQXJyYXkuaXNBcnJheSh0aGlzLmNoaWxkcmVuKTpcbiAgICAgICAgY2xlYXJDaGlsZHJlbih0aGlzLmNoaWxkcmVuKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIGNsZWFuIHRoZSBub2RlIGNoaWxkcmVuIG9ubHlcbiAgICAgIGNhc2UgIW11c3RSZW1vdmVSb290OlxuICAgICAgICBjbGVhbk5vZGUoZWwpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gcmVtb3ZlIHRoZSByb290IG5vZGUgb25seSBpZiB0aGUgbXVzdFJlbW92ZVJvb3QgaXMgdHJ1bHlcbiAgICAgIGNhc2UgISFtdXN0UmVtb3ZlUm9vdDpcbiAgICAgICAgcmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5lbCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBDbG9uZSB0aGUgdGVtcGxhdGUgY2h1bmtcbiAgICogQHJldHVybnMge1RlbXBsYXRlQ2h1bmt9IGEgY2xvbmUgb2YgdGhpcyBvYmplY3QgcmVzZXR0aW5nIHRoZSB0aGlzLmVsIHByb3BlcnR5XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcywge1xuICAgICAgbWV0YToge30sXG4gICAgICBlbDogbnVsbFxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHRlbXBsYXRlIGNodW5rIHdpcmluZyBhbHNvIHRoZSBiaW5kaW5nc1xuICogQHBhcmFtICAge3N0cmluZ3xIVE1MRWxlbWVudH0gaHRtbCAtIHRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtICAge0JpbmRpbmdEYXRhW119IGJpbmRpbmdzIC0gYmluZGluZ3MgY29sbGVjdGlvblxuICogQHJldHVybnMge1RlbXBsYXRlQ2h1bmt9IGEgbmV3IFRlbXBsYXRlQ2h1bmsgY29weVxuICovXG5mdW5jdGlvbiBjcmVhdGUoaHRtbCwgYmluZGluZ3MpIHtcbiAgaWYgKGJpbmRpbmdzID09PSB2b2lkIDApIHtcbiAgICBiaW5kaW5ncyA9IFtdO1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBUZW1wbGF0ZUNodW5rLCB7XG4gICAgaHRtbCxcbiAgICBiaW5kaW5nc0RhdGE6IGJpbmRpbmdzXG4gIH0pO1xufVxuXG5leHBvcnQgeyBjcmVhdGUkMSBhcyBjcmVhdGVCaW5kaW5nLCBjcmVhdGUkNCBhcyBjcmVhdGVFeHByZXNzaW9uLCBjcmVhdGUgYXMgdGVtcGxhdGUgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyB0ZW1wbGF0ZSBhcyBjcmVhdGUgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy9kb20tYmluZGluZ3MvZGlzdC9lc20uZG9tLWJpbmRpbmdzLmpzJztcbmltcG9ydCBleHByZXNzaW9uVHlwZXMgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9leHByZXNzaW9uLXR5cGVzLmpzJztcbmltcG9ydCBiaW5kaW5nVHlwZXMgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9iaW5kaW5nLXR5cGVzLmpzJztcblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgY29tcG9uZW50IHRlbXBsYXRlcyBvbmx5IG9uY2VcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gdGVtcGxhdGUgLSBjb21wb25lbnQgdGVtcGxhdGUgY3JlYXRpb24gZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHtSaW90Q29tcG9uZW50V3JhcHBlcn0gY29tcG9uZW50V3JhcHBlciAtIHJpb3QgY29tcGlsZXIgZ2VuZXJhdGVkIG9iamVjdFxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBnZXRDaGlsZENvbXBvbmVudCAtIGdldHRlciBmdW5jdGlvbiB0byByZXR1cm4gdGhlIGNoaWxkcmVuIGNvbXBvbmVudHNcbiAqIEByZXR1cm5zIHtUZW1wbGF0ZUNodW5rfSB0ZW1wbGF0ZSBjaHVuayBvYmplY3RcbiAqL1xuZnVuY3Rpb24gY29tcG9uZW50VGVtcGxhdGVGYWN0b3J5KHRlbXBsYXRlLCBjb21wb25lbnRXcmFwcGVyLCBnZXRDaGlsZENvbXBvbmVudCkge1xuICByZXR1cm4gdGVtcGxhdGUoY3JlYXRlLCBleHByZXNzaW9uVHlwZXMsIGJpbmRpbmdUeXBlcywgZ2V0Q2hpbGRDb21wb25lbnQpO1xufVxuXG5leHBvcnQgeyBjb21wb25lbnRUZW1wbGF0ZUZhY3RvcnkgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBET01fQ09NUE9ORU5UX0lOU1RBTkNFX1BST1BFUlRZIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuXG4vKipcbiAqIEJpbmQgYSBET00gbm9kZSB0byBpdHMgY29tcG9uZW50IG9iamVjdFxuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBub2RlIC0gaHRtbCBub2RlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHtPYmplY3R9IGNvbXBvbmVudCAtIFJpb3QuanMgY29tcG9uZW50IG9iamVjdFxuICogQHJldHVybnMge09iamVjdH0gdGhlIGNvbXBvbmVudCBvYmplY3QgcmVjZWl2ZWQgYXMgc2Vjb25kIGFyZ3VtZW50XG4gKi9cbmNvbnN0IGJpbmRET01Ob2RlVG9Db21wb25lbnRJbnN0YW5jZSA9IChub2RlLCBjb21wb25lbnQpID0+IG5vZGVbRE9NX0NPTVBPTkVOVF9JTlNUQU5DRV9QUk9QRVJUWV0gPSBjb21wb25lbnQ7XG5cbmV4cG9ydCB7IGJpbmRET01Ob2RlVG9Db21wb25lbnRJbnN0YW5jZSB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IE1PVU5UX01FVEhPRF9LRVksIFVQREFURV9NRVRIT0RfS0VZLCBVTk1PVU5UX01FVEhPRF9LRVkgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5cbi8qKlxuICogV3JhcCB0aGUgUmlvdC5qcyBjb3JlIEFQSSBtZXRob2RzIHVzaW5nIGEgbWFwcGluZyBmdW5jdGlvblxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBtYXBGdW5jdGlvbiAtIGxpZnRpbmcgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IGFuIG9iamVjdCBoYXZpbmcgdGhlIHsgbW91bnQsIHVwZGF0ZSwgdW5tb3VudCB9IGZ1bmN0aW9uc1xuICovXG5mdW5jdGlvbiBjcmVhdGVDb3JlQVBJTWV0aG9kcyhtYXBGdW5jdGlvbikge1xuICByZXR1cm4gW01PVU5UX01FVEhPRF9LRVksIFVQREFURV9NRVRIT0RfS0VZLCBVTk1PVU5UX01FVEhPRF9LRVldLnJlZHVjZSgoYWNjLCBtZXRob2QpID0+IHtcbiAgICBhY2NbbWV0aG9kXSA9IG1hcEZ1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuXG5leHBvcnQgeyBjcmVhdGVDb3JlQVBJTWV0aG9kcyB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IE1PVU5UX01FVEhPRF9LRVksIElTX1BVUkVfU1lNQk9MIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgcGFuaWMgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL21pc2MuanMnO1xuaW1wb3J0IHsgZGVmaW5lRGVmYXVsdHMsIGRlZmluZVByb3BlcnR5IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9vYmplY3RzLmpzJztcbmltcG9ydCB7IFBVUkVfQ09NUE9ORU5UX0FQSSB9IGZyb20gJy4vcHVyZS1jb21wb25lbnQtYXBpLmpzJztcbmltcG9ydCB7IGJpbmRET01Ob2RlVG9Db21wb25lbnRJbnN0YW5jZSB9IGZyb20gJy4vYmluZC1kb20tbm9kZS10by1jb21wb25lbnQtaW5zdGFuY2UuanMnO1xuaW1wb3J0IHsgY3JlYXRlQ29yZUFQSU1ldGhvZHMgfSBmcm9tICcuL2NyZWF0ZS1jb3JlLWFwaS1tZXRob2RzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYSBwdXJlIGNvbXBvbmVudFxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBwdXJlRmFjdG9yeUZ1bmN0aW9uIC0gcHVyZSBjb21wb25lbnQgZmFjdG9yeSBmdW5jdGlvblxuICogQHBhcmFtICAge0FycmF5fSBvcHRpb25zLnNsb3RzIC0gY29tcG9uZW50IHNsb3RzXG4gKiBAcGFyYW0gICB7QXJyYXl9IG9wdGlvbnMuYXR0cmlidXRlcyAtIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7QXJyYXl9IG9wdGlvbnMudGVtcGxhdGUgLSB0ZW1wbGF0ZSBmYWN0b3J5IGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7QXJyYXl9IG9wdGlvbnMudGVtcGxhdGUgLSB0ZW1wbGF0ZSBmYWN0b3J5IGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7YW55fSBvcHRpb25zLnByb3BzIC0gaW5pdGlhbCBjb21wb25lbnQgcHJvcGVydGllc1xuICogQHJldHVybnMge09iamVjdH0gcHVyZSBjb21wb25lbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVB1cmVDb21wb25lbnQocHVyZUZhY3RvcnlGdW5jdGlvbiwgX3JlZikge1xuICBsZXQge1xuICAgIHNsb3RzLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgcHJvcHMsXG4gICAgY3NzLFxuICAgIHRlbXBsYXRlXG4gIH0gPSBfcmVmO1xuICBpZiAodGVtcGxhdGUpIHBhbmljKCdQdXJlIGNvbXBvbmVudHMgY2FuIG5vdCBoYXZlIGh0bWwnKTtcbiAgaWYgKGNzcykgcGFuaWMoJ1B1cmUgY29tcG9uZW50cyBkbyBub3QgaGF2ZSBjc3MnKTtcbiAgY29uc3QgY29tcG9uZW50ID0gZGVmaW5lRGVmYXVsdHMocHVyZUZhY3RvcnlGdW5jdGlvbih7XG4gICAgc2xvdHMsXG4gICAgYXR0cmlidXRlcyxcbiAgICBwcm9wc1xuICB9KSwgUFVSRV9DT01QT05FTlRfQVBJKTtcbiAgcmV0dXJuIGNyZWF0ZUNvcmVBUElNZXRob2RzKG1ldGhvZCA9PiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICAvLyBpbnRlcmNlcHQgdGhlIG1vdW50IGNhbGxzIHRvIGJpbmQgdGhlIERPTSBub2RlIHRvIHRoZSBwdXJlIG9iamVjdCBjcmVhdGVkXG4gICAgLy8gc2VlIGFsc28gaHR0cHM6Ly9naXRodWIuY29tL3Jpb3QvcmlvdC9pc3N1ZXMvMjgwNlxuICAgIGlmIChtZXRob2QgPT09IE1PVU5UX01FVEhPRF9LRVkpIHtcbiAgICAgIGNvbnN0IFtlbGVtZW50XSA9IGFyZ3M7XG4gICAgICAvLyBtYXJrIHRoaXMgbm9kZSBhcyBwdXJlIGVsZW1lbnRcbiAgICAgIGRlZmluZVByb3BlcnR5KGVsZW1lbnQsIElTX1BVUkVfU1lNQk9MLCB0cnVlKTtcbiAgICAgIGJpbmRET01Ob2RlVG9Db21wb25lbnRJbnN0YW5jZShlbGVtZW50LCBjb21wb25lbnQpO1xuICAgIH1cbiAgICBjb21wb25lbnRbbWV0aG9kXSguLi5hcmdzKTtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9KTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlUHVyZUNvbXBvbmVudCB9O1xuIiwgIi8qIFJpb3QgV0lQLCBAbGljZW5zZSBNSVQgKi9cbi8qKlxuICogQ29udmVydHMgYW55IERPTSBub2RlL3MgdG8gYSBsb29wYWJsZSBhcnJheVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudHxOb2RlTGlzdCB9IGVscyAtIHNpbmdsZSBodG1sIGVsZW1lbnQgb3IgYSBub2RlIGxpc3RcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBhbHdheXMgYSBsb29wYWJsZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZG9tVG9BcnJheShlbHMpIHtcbiAgLy8gY2FuIHRoaXMgb2JqZWN0IGJlIGFscmVhZHkgbG9vcGVkP1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZWxzKSkge1xuICAgIC8vIGlzIGl0IGEgbm9kZSBsaXN0P1xuICAgIGlmICgvXlxcW29iamVjdCAoSFRNTENvbGxlY3Rpb258Tm9kZUxpc3R8T2JqZWN0KVxcXSQvLnRlc3QoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVscykpICYmIHR5cGVvZiBlbHMubGVuZ3RoID09PSAnbnVtYmVyJykgcmV0dXJuIEFycmF5LmZyb20oZWxzKTtlbHNlXG4gICAgICAvLyBpZiBpdCdzIGEgc2luZ2xlIG5vZGVcbiAgICAgIC8vIGl0IHdpbGwgYmUgcmV0dXJuZWQgYXMgXCJhcnJheVwiIHdpdGggb25lIHNpbmdsZSBlbnRyeVxuICAgICAgcmV0dXJuIFtlbHNdO1xuICB9XG4gIC8vIHRoaXMgb2JqZWN0IGNvdWxkIGJlIGxvb3BlZCBvdXQgb2YgdGhlIGJveFxuICByZXR1cm4gZWxzO1xufVxuXG5leHBvcnQgeyBkb21Ub0FycmF5IGFzIGRlZmF1bHQgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgZG9tVG9BcnJheSBmcm9tICcuLi9iaWFuY28uZG9tLXRvLWFycmF5L2luZGV4Lm5leHQuanMnO1xuXG4vKipcbiAqIFNpbXBsZSBoZWxwZXIgdG8gZmluZCBET00gbm9kZXMgcmV0dXJuaW5nIHRoZW0gYXMgYXJyYXkgbGlrZSBsb29wYWJsZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgc3RyaW5nfERPTU5vZGVMaXN0IH0gc2VsZWN0b3IgLSBlaXRoZXIgdGhlIHF1ZXJ5IG9yIHRoZSBET00gbm9kZXMgdG8gYXJyYWlmeVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9ICAgICAgICBzY29wZSAgICAgIC0gY29udGV4dCBkZWZpbmluZyB3aGVyZSB0aGUgcXVlcnkgd2lsbCBzZWFyY2ggZm9yIHRoZSBET00gbm9kZXNcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBET00gbm9kZXMgZm91bmQgYXMgYXJyYXlcbiAqL1xuZnVuY3Rpb24gJChzZWxlY3Rvciwgc2NvcGUpIHtcbiAgcmV0dXJuIGRvbVRvQXJyYXkodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyA/IChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgOiBzZWxlY3Rvcik7XG59XG5cbmV4cG9ydCB7ICQgYXMgZGVmYXVsdCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCAkIGZyb20gJy4uL25vZGVfbW9kdWxlcy9iaWFuY28ucXVlcnkvaW5kZXgubmV4dC5qcyc7XG5cbmNvbnN0IENPTVBPTkVOVF9ET01fU0VMRUNUT1JTID0gT2JqZWN0LmZyZWV6ZSh7XG4gIC8vIGNvbXBvbmVudCBoZWxwZXJzXG4gICQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gJChzZWxlY3RvciwgdGhpcy5yb290KVswXTtcbiAgfSxcbiAgJCQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gJChzZWxlY3RvciwgdGhpcy5yb290KTtcbiAgfVxufSk7XG5cbmV4cG9ydCB7IENPTVBPTkVOVF9ET01fU0VMRUNUT1JTIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgU0hPVUxEX1VQREFURV9LRVksIE9OX0JFRk9SRV9NT1VOVF9LRVksIE9OX01PVU5URURfS0VZLCBPTl9CRUZPUkVfVVBEQVRFX0tFWSwgT05fVVBEQVRFRF9LRVksIE9OX0JFRk9SRV9VTk1PVU5UX0tFWSwgT05fVU5NT1VOVEVEX0tFWSB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2Z1bmN0aW9ucy5qcyc7XG5cbmNvbnN0IENPTVBPTkVOVF9MSUZFQ1lDTEVfTUVUSE9EUyA9IE9iamVjdC5mcmVlemUoe1xuICBbU0hPVUxEX1VQREFURV9LRVldOiBub29wLFxuICBbT05fQkVGT1JFX01PVU5UX0tFWV06IG5vb3AsXG4gIFtPTl9NT1VOVEVEX0tFWV06IG5vb3AsXG4gIFtPTl9CRUZPUkVfVVBEQVRFX0tFWV06IG5vb3AsXG4gIFtPTl9VUERBVEVEX0tFWV06IG5vb3AsXG4gIFtPTl9CRUZPUkVfVU5NT1VOVF9LRVldOiBub29wLFxuICBbT05fVU5NT1VOVEVEX0tFWV06IG5vb3Bcbn0pO1xuXG5leHBvcnQgeyBDT01QT05FTlRfTElGRUNZQ0xFX01FVEhPRFMgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgZG9tVG9BcnJheSBmcm9tICcuLi9iaWFuY28uZG9tLXRvLWFycmF5L2luZGV4Lm5leHQuanMnO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgcmV0dXJuIHZhbHVlcywgaW4gY2FzZSBvZiBhIHNpbmdsZSB2YWx1ZSB3ZSBhdm9pZCB0byByZXR1cm4gYW4gYXJyYXlcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB2YWx1ZXMgLSBsaXN0IG9mIHZhbHVlcyB3ZSB3YW50IHRvIHJldHVyblxuICogQHJldHVybnMgeyBBcnJheXxzdHJpbmd8Ym9vbGVhbiB9IGVpdGhlciB0aGUgd2hvbGUgbGlzdCBvZiB2YWx1ZXMgb3IgdGhlIHNpbmdsZSBvbmUgZm91bmRcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IG5vcm1hbGl6ZSA9IHZhbHVlcyA9PiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzO1xuXG4vKipcbiAqIFBhcnNlIGFsbCB0aGUgbm9kZXMgcmVjZWl2ZWQgdG8gZ2V0L3JlbW92ZS9jaGVjayB0aGVpciBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5IH0gZWxzICAgIC0gRE9NIG5vZGUvcyB0byBwYXJzZVxuICogQHBhcmFtICAgeyBzdHJpbmd8QXJyYXkgfSAgICAgICAgICAgICAgIG5hbWUgICAtIG5hbWUgb3IgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IHN0cmluZyB9ICAgICAgICAgICAgICAgICAgICAgbWV0aG9kIC0gbWV0aG9kIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHBhcnNlIHRoZSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyB7IEFycmF5fHN0cmluZyB9IHJlc3VsdCBvZiB0aGUgcGFyc2luZyBpbiBhIGxpc3Qgb3IgYSBzaW5nbGUgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTm9kZXMoZWxzLCBuYW1lLCBtZXRob2QpIHtcbiAgY29uc3QgbmFtZXMgPSB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgPyBbbmFtZV0gOiBuYW1lO1xuICByZXR1cm4gbm9ybWFsaXplKGRvbVRvQXJyYXkoZWxzKS5tYXAoZWwgPT4ge1xuICAgIHJldHVybiBub3JtYWxpemUobmFtZXMubWFwKG4gPT4gZWxbbWV0aG9kXShuKSkpO1xuICB9KSk7XG59XG5cbi8qKlxuICogU2V0IGFueSBhdHRyaWJ1dGUgb24gYSBzaW5nbGUgb3IgYSBsaXN0IG9mIERPTSBub2Rlc1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudHxOb2RlTGlzdHxBcnJheSB9IGVscyAgIC0gRE9NIG5vZGUvcyB0byBwYXJzZVxuICogQHBhcmFtICAgeyBzdHJpbmd8T2JqZWN0IH0gICAgICAgICAgICAgIG5hbWUgIC0gZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciBhIGxpc3Qgb2YgcHJvcGVydGllcyBhcyBvYmplY3Qga2V5IC0gdmFsdWVcbiAqIEBwYXJhbSAgIHsgc3RyaW5nIH0gICAgICAgICAgICAgICAgICAgICB2YWx1ZSAtIHRoZSBuZXcgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSAob3B0aW9uYWwpXG4gKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5IH0gdGhlIG9yaWdpbmFsIGFycmF5IG9mIGVsZW1lbnRzIHBhc3NlZCB0byB0aGlzIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBpbXBvcnQgeyBzZXQgfSBmcm9tICdiaWFuY28uYXR0cidcbiAqXG4gKiBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICpcbiAqIHNldChpbWcsICd3aWR0aCcsIDEwMClcbiAqXG4gKiAvLyBvciBhbHNvXG4gKiBzZXQoaW1nLCB7XG4gKiAgIHdpZHRoOiAzMDAsXG4gKiAgIGhlaWdodDogMzAwXG4gKiB9KVxuICpcbiAqL1xuZnVuY3Rpb24gc2V0KGVscywgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgYXR0cnMgPSB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcgPyBuYW1lIDoge1xuICAgIFtuYW1lXTogdmFsdWVcbiAgfTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhdHRycyk7XG4gIGRvbVRvQXJyYXkoZWxzKS5mb3JFYWNoKGVsID0+IHtcbiAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4gZWwuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJzW3Byb3BdKSk7XG4gIH0pO1xuICByZXR1cm4gZWxzO1xufVxuXG4vKipcbiAqIEdldCBhbnkgYXR0cmlidXRlIGZyb20gYSBzaW5nbGUgb3IgYSBsaXN0IG9mIERPTSBub2Rlc1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudHxOb2RlTGlzdHxBcnJheSB9IGVscyAgIC0gRE9NIG5vZGUvcyB0byBwYXJzZVxuICogQHBhcmFtICAgeyBzdHJpbmd8QXJyYXkgfSAgICAgICAgICAgICAgIG5hbWUgIC0gbmFtZSBvciBsaXN0IG9mIGF0dHJpYnV0ZXMgdG8gZ2V0XG4gKiBAcmV0dXJucyB7IEFycmF5fHN0cmluZyB9IGxpc3Qgb2YgdGhlIGF0dHJpYnV0ZXMgZm91bmRcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCB7IGdldCB9IGZyb20gJ2JpYW5jby5hdHRyJ1xuICpcbiAqIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gKlxuICogZ2V0KGltZywgJ3dpZHRoJykgLy8gPT4gJzIwMCdcbiAqXG4gKiAvLyBvciBhbHNvXG4gKiBnZXQoaW1nLCBbJ3dpZHRoJywgJ2hlaWdodCddKSAvLyA9PiBbJzIwMCcsICczMDAnXVxuICpcbiAqIC8vIG9yIGFsc29cbiAqIGdldChbaW1nMSwgaW1nMl0sIFsnd2lkdGgnLCAnaGVpZ2h0J10pIC8vID0+IFtbJzIwMCcsICczMDAnXSwgWyc1MDAnLCAnMjAwJ11dXG4gKi9cbmZ1bmN0aW9uIGdldChlbHMsIG5hbWUpIHtcbiAgcmV0dXJuIHBhcnNlTm9kZXMoZWxzLCBuYW1lLCAnZ2V0QXR0cmlidXRlJyk7XG59XG5cbmV4cG9ydCB7IGdldCwgc2V0IH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0ICQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL2JpYW5jby5xdWVyeS9pbmRleC5uZXh0LmpzJztcbmltcG9ydCB7IHNldCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9iaWFuY28uYXR0ci9pbmRleC5uZXh0LmpzJztcblxuY29uc3QgQ1NTX0JZX05BTUUgPSBuZXcgTWFwKCk7XG5jb25zdCBTVFlMRV9OT0RFX1NFTEVDVE9SID0gJ3N0eWxlW3Jpb3RdJztcblxuLy8gbWVtb2l6ZWQgY3VycmllZCBmdW5jdGlvblxuY29uc3QgZ2V0U3R5bGVOb2RlID0gKHN0eWxlID0+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvLyBsYXp5IGV2YWx1YXRpb246XG4gICAgLy8gaWYgdGhpcyBmdW5jdGlvbiB3YXMgYWxyZWFkeSBjYWxsZWQgYmVmb3JlXG4gICAgLy8gd2UgcmV0dXJuIGl0cyBjYWNoZWQgcmVzdWx0XG4gICAgaWYgKHN0eWxlKSByZXR1cm4gc3R5bGU7XG5cbiAgICAvLyBjcmVhdGUgYSBuZXcgc3R5bGUgZWxlbWVudCBvciB1c2UgYW4gZXhpc3Rpbmcgb25lXG4gICAgLy8gYW5kIGNhY2hlIGl0IGludGVybmFsbHlcbiAgICBzdHlsZSA9ICQoU1RZTEVfTk9ERV9TRUxFQ1RPUilbMF0gfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzZXQoc3R5bGUsICd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICghc3R5bGUucGFyZW50Tm9kZSkgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9O1xufSkoKTtcblxuLyoqXG4gKiBPYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5qZWN0IGFuZCBtYW5hZ2UgdGhlIGNzcyBvZiBldmVyeSB0YWcgaW5zdGFuY2VcbiAqL1xuY29uc3QgY3NzTWFuYWdlciA9IHtcbiAgQ1NTX0JZX05BTUUsXG4gIC8qKlxuICAgKiBTYXZlIGEgdGFnIHN0eWxlIHRvIGJlIGxhdGVyIGluamVjdGVkIGludG8gRE9NXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IG5hbWUgLSBpZiBpdCdzIHBhc3NlZCB3ZSB3aWxsIG1hcCB0aGUgY3NzIHRvIGEgdGFnbmFtZVxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjc3MgLSBjc3Mgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlbGZcbiAgICovXG4gIGFkZChuYW1lLCBjc3MpIHtcbiAgICBpZiAoIUNTU19CWV9OQU1FLmhhcyhuYW1lKSkge1xuICAgICAgQ1NTX0JZX05BTUUuc2V0KG5hbWUsIGNzcyk7XG4gICAgICB0aGlzLmluamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLyoqXG4gICAqIEluamVjdCBhbGwgcHJldmlvdXNseSBzYXZlZCB0YWcgc3R5bGVzIGludG8gRE9NXG4gICAqIGlubmVySFRNTCBzZWVtcyBzbG93OiBodHRwOi8vanNwZXJmLmNvbS9yaW90LWluc2VydC1zdHlsZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZWxmXG4gICAqL1xuICBpbmplY3QoKSB7XG4gICAgZ2V0U3R5bGVOb2RlKCkuaW5uZXJIVE1MID0gWy4uLkNTU19CWV9OQU1FLnZhbHVlcygpXS5qb2luKCdcXG4nKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLyoqXG4gICAqIFJlbW92ZSBhIHRhZyBzdHlsZSBmcm9tIHRoZSBET01cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgYSByZWdpc3RlcmVkIHRhZ25hbWVcbiAgICogQHJldHVybnMge09iamVjdH0gc2VsZlxuICAgKi9cbiAgcmVtb3ZlKG5hbWUpIHtcbiAgICBpZiAoQ1NTX0JZX05BTUUuaGFzKG5hbWUpKSB7XG4gICAgICBDU1NfQllfTkFNRS5kZWxldGUobmFtZSk7XG4gICAgICB0aGlzLmluamVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxuZXhwb3J0IHsgQ1NTX0JZX05BTUUsIFNUWUxFX05PREVfU0VMRUNUT1IsIGNzc01hbmFnZXIgYXMgZGVmYXVsdCB9O1xuIiwgIi8qIFJpb3QgV0lQLCBAbGljZW5zZSBNSVQgKi9cbi8qKlxuICogRnVuY3Rpb24gdG8gY3VycnkgYW55IGphdmFzY3JpcHQgbWV0aG9kXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259ICBmbiAtIHRoZSB0YXJnZXQgZnVuY3Rpb24gd2Ugd2FudCB0byBjdXJyeVxuICogQHBhcmFtICAgey4uLlthcmdzXX0gYWNjIC0gaW5pdGlhbCBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnwqfSBpdCB3aWxsIHJldHVybiBhIGZ1bmN0aW9uIHVudGlsIHRoZSB0YXJnZXQgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICB3aWxsIHJlY2VpdmUgYWxsIG9mIGl0cyBhcmd1bWVudHNcbiAqL1xuZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFjYyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYWNjW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cbiAgICBhcmdzID0gWy4uLmFjYywgLi4uYXJnc107XG4gICAgcmV0dXJuIGFyZ3MubGVuZ3RoIDwgZm4ubGVuZ3RoID8gY3VycnkoZm4sIC4uLmFyZ3MpIDogZm4oLi4uYXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCB7IGN1cnJ5IGFzIGRlZmF1bHQgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBJU19ESVJFQ1RJVkUgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvYmlhbmNvLmF0dHIvaW5kZXgubmV4dC5qcyc7XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgbmFtZSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIERPTSBub2RlIHdlIHdhbnQgdG8gaW5zcGVjdFxuICogQHJldHVybnMge3N0cmluZ30gbmFtZSB0byBpZGVudGlmeSB0aGlzIGRvbSBub2RlIGluIHJpb3RcbiAqL1xuZnVuY3Rpb24gZ2V0TmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBnZXQoZWxlbWVudCwgSVNfRElSRUNUSVZFKSB8fCBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IHsgZ2V0TmFtZSB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IElTX0RJUkVDVElWRSB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGdldE5hbWUgfSBmcm9tICcuLi91dGlscy9kb20uanMnO1xuaW1wb3J0IHsgc2V0IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL2JpYW5jby5hdHRyL2luZGV4Lm5leHQuanMnO1xuXG4vKipcbiAqIEFkZCBldmVudHVhbGx5IHRoZSBcImlzXCIgYXR0cmlidXRlIHRvIGxpbmsgdGhpcyBET00gbm9kZSB0byBpdHMgY3NzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gdGFyZ2V0IHJvb3Qgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBjb21wb25lbnQgbW91bnRlZFxuICogQHJldHVybnMge3VuZGVmaW5lZH0gaXQncyBhIHZvaWQgZnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBhZGRDc3NIb29rKGVsZW1lbnQsIG5hbWUpIHtcbiAgaWYgKGdldE5hbWUoZWxlbWVudCkgIT09IG5hbWUpIHtcbiAgICBzZXQoZWxlbWVudCwgSVNfRElSRUNUSVZFLCBuYW1lKTtcbiAgfVxufVxuXG5leHBvcnQgeyBhZGRDc3NIb29rIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgY2FsbE9yQXNzaWduIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9mdW5jdGlvbnMuanMnO1xuXG4vKipcbiAqIENvbXB1dGUgdGhlIGNvbXBvbmVudCBjdXJyZW50IHN0YXRlIG1lcmdpbmcgaXQgd2l0aCBpdHMgcHJldmlvdXMgc3RhdGVcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG9sZFN0YXRlIC0gcHJldmlvdXMgc3RhdGUgb2JqZWN0XG4gKiBAcGFyYW0gICB7T2JqZWN0fSBuZXdTdGF0ZSAtIG5ldyBzdGF0ZSBnaXZlbiB0byB0aGUgYHVwZGF0ZWAgY2FsbFxuICogQHJldHVybnMge09iamVjdH0gbmV3IG9iamVjdCBzdGF0ZVxuICovXG5mdW5jdGlvbiBjb21wdXRlQ29tcG9uZW50U3RhdGUob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvbGRTdGF0ZSwgY2FsbE9yQXNzaWduKG5ld1N0YXRlKSk7XG59XG5cbmV4cG9ydCB7IGNvbXB1dGVDb21wb25lbnRTdGF0ZSB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IERPTWF0dHJpYnV0ZXNUb09iamVjdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvZG9tLmpzJztcbmltcG9ydCB7IGNhbGxPckFzc2lnbiB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvZnVuY3Rpb25zLmpzJztcblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgY29tcG9uZW50IHByb3BlcnRpZXMgZWl0aGVyIGZyb20gaXRzIHJlYWwgYXR0cmlidXRlcyBvciBmcm9tIGl0cyBpbml0aWFsIHVzZXIgcHJvcGVydGllc1xuICogQHBhcmFtICAge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gY29tcG9uZW50IHJvb3RcbiAqIEBwYXJhbSAgIHtPYmplY3R9ICBpbml0aWFsUHJvcHMgLSBpbml0aWFsIHByb3BzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjb21wb25lbnQgcHJvcHMga2V5IHZhbHVlIHBhaXJzXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVJbml0aWFsUHJvcHMoZWxlbWVudCwgaW5pdGlhbFByb3BzKSB7XG4gIGlmIChpbml0aWFsUHJvcHMgPT09IHZvaWQgMCkge1xuICAgIGluaXRpYWxQcm9wcyA9IHt9O1xuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBET01hdHRyaWJ1dGVzVG9PYmplY3QoZWxlbWVudCksIGNhbGxPckFzc2lnbihpbml0aWFsUHJvcHMpKTtcbn1cblxuZXhwb3J0IHsgY29tcHV0ZUluaXRpYWxQcm9wcyB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IGNyZWF0ZUNvcmVBUElNZXRob2RzIH0gZnJvbSAnLi9jcmVhdGUtY29yZS1hcGktbWV0aG9kcy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVFeHByZXNzaW9uIGFzIGNyZWF0ZSQ0IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvZG9tLWJpbmRpbmdzL2Rpc3QvZXNtLmRvbS1iaW5kaW5ncy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBiaW5kaW5ncyB0byB1cGRhdGUgdGhlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9IG5vZGUgLSBub2RlIHdoZXJlIHdlIHdpbGwgYmluZCB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHtBcnJheX0gYXR0cmlidXRlcyAtIGxpc3Qgb2YgYXR0cmlidXRlIGJpbmRpbmdzXG4gKiBAcmV0dXJucyB7VGVtcGxhdGVDaHVua30gLSB0ZW1wbGF0ZSBiaW5kaW5ncyBvYmplY3RcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXR0cmlidXRlQmluZGluZ3Mobm9kZSwgYXR0cmlidXRlcykge1xuICBpZiAoYXR0cmlidXRlcyA9PT0gdm9pZCAwKSB7XG4gICAgYXR0cmlidXRlcyA9IFtdO1xuICB9XG4gIGNvbnN0IGV4cHJlc3Npb25zID0gYXR0cmlidXRlcy5tYXAoYSA9PiBjcmVhdGUkNChub2RlLCBhKSk7XG4gIGNvbnN0IGJpbmRpbmcgPSB7fTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYmluZGluZywgT2JqZWN0LmFzc2lnbih7XG4gICAgZXhwcmVzc2lvbnNcbiAgfSwgY3JlYXRlQ29yZUFQSU1ldGhvZHMobWV0aG9kID0+IHNjb3BlID0+IHtcbiAgICBleHByZXNzaW9ucy5mb3JFYWNoKGUgPT4gZVttZXRob2RdKHNjb3BlKSk7XG4gICAgcmV0dXJuIGJpbmRpbmc7XG4gIH0pKSk7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUF0dHJpYnV0ZUJpbmRpbmdzIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgUExVR0lOU19TRVQgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5cbi8qKlxuICogUnVuIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhyb3VnaCBhbGwgdGhlIHBsdWdpbnMgc2V0IGJ5IHRoZSB1c2VyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBjb21wb25lbnQgLSBjb21wb25lbnQgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBjb21wb25lbnQgZW5oYW5jZWQgYnkgdGhlIHBsdWdpbnNcbiAqL1xuZnVuY3Rpb24gcnVuUGx1Z2lucyhjb21wb25lbnQpIHtcbiAgcmV0dXJuIFsuLi5QTFVHSU5TX1NFVF0ucmVkdWNlKChjLCBmbikgPT4gZm4oYykgfHwgYywgY29tcG9uZW50KTtcbn1cblxuZXhwb3J0IHsgcnVuUGx1Z2lucyB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24sIGlzT2JqZWN0IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jaGVja3MuanMnO1xuaW1wb3J0IHsgUEFSRU5UX0tFWV9TWU1CT0wsIEFUVFJJQlVURVNfS0VZX1NZTUJPTCwgUFJPUFNfS0VZLCBTVEFURV9LRVksIFRFTVBMQVRFX0tFWV9TWU1CT0wsIE9OX0JFRk9SRV9NT1VOVF9LRVksIE9OX01PVU5URURfS0VZLCBTSE9VTERfVVBEQVRFX0tFWSwgT05fQkVGT1JFX1VQREFURV9LRVksIElTX0NPTVBPTkVOVF9VUERBVElORywgT05fVVBEQVRFRF9LRVksIE9OX0JFRk9SRV9VTk1PVU5UX0tFWSwgT05fVU5NT1VOVEVEX0tFWSwgSVNfUFVSRV9TWU1CT0wsIFJPT1RfS0VZLCBTTE9UU19LRVkgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBhdXRvYmluZE1ldGhvZHMgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgeyBldmFsdWF0ZUF0dHJpYnV0ZUV4cHJlc3Npb25zIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9taXNjLmpzJztcbmltcG9ydCB7IGRlZmluZVByb3BlcnRpZXMsIGRlZmluZVByb3BlcnR5IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9vYmplY3RzLmpzJztcbmltcG9ydCB7IGFkZENzc0hvb2sgfSBmcm9tICcuL2FkZC1jc3MtaG9vay5qcyc7XG5pbXBvcnQgeyBiaW5kRE9NTm9kZVRvQ29tcG9uZW50SW5zdGFuY2UgfSBmcm9tICcuL2JpbmQtZG9tLW5vZGUtdG8tY29tcG9uZW50LWluc3RhbmNlLmpzJztcbmltcG9ydCB7IGNvbXB1dGVDb21wb25lbnRTdGF0ZSB9IGZyb20gJy4vY29tcHV0ZS1jb21wb25lbnQtc3RhdGUuanMnO1xuaW1wb3J0IHsgY29tcHV0ZUluaXRpYWxQcm9wcyB9IGZyb20gJy4vY29tcHV0ZS1pbml0aWFsLXByb3BzLmpzJztcbmltcG9ydCB7IGNyZWF0ZUF0dHJpYnV0ZUJpbmRpbmdzIH0gZnJvbSAnLi9jcmVhdGUtYXR0cmlidXRlLWJpbmRpbmdzLmpzJztcbmltcG9ydCB7IHJ1blBsdWdpbnMgfSBmcm9tICcuL3J1bi1wbHVnaW5zLmpzJztcblxuLyoqXG4gKiBDb21wb25lbnQgY3JlYXRpb24gZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHdpbGwgZW5oYW5jZSB0aGUgdXNlciBwcm92aWRlZCBBUElcbiAqIEBwYXJhbSAgIHtPYmplY3R9IGNvbXBvbmVudCAtIGEgY29tcG9uZW50IGltcGxlbWVudGF0aW9uIHByZXZpb3VzbHkgZGVmaW5lZFxuICogQHBhcmFtICAge0FycmF5fSBvcHRpb25zLnNsb3RzIC0gY29tcG9uZW50IHNsb3RzIGdlbmVyYXRlZCB2aWEgcmlvdCBjb21waWxlclxuICogQHBhcmFtICAge0FycmF5fSBvcHRpb25zLmF0dHJpYnV0ZXMgLSBhdHRyaWJ1dGUgZXhwcmVzc2lvbnMgZ2VuZXJhdGVkIHZpYSByaW90IGNvbXBpbGVyXG4gKiBAcmV0dXJucyB7UmlvdC5Db21wb25lbnR9IGEgcmlvdCBjb21wb25lbnQgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gbWFuYWdlQ29tcG9uZW50TGlmZWN5Y2xlKGNvbXBvbmVudCwgX3JlZikge1xuICBsZXQge1xuICAgIHNsb3RzLFxuICAgIGF0dHJpYnV0ZXMsXG4gICAgcHJvcHNcbiAgfSA9IF9yZWY7XG4gIHJldHVybiBhdXRvYmluZE1ldGhvZHMocnVuUGx1Z2lucyhkZWZpbmVQcm9wZXJ0aWVzKGlzT2JqZWN0KGNvbXBvbmVudCkgPyBPYmplY3QuY3JlYXRlKGNvbXBvbmVudCkgOiBjb21wb25lbnQsIHtcbiAgICBtb3VudChlbGVtZW50LCBzdGF0ZSwgcGFyZW50U2NvcGUpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHN0YXRlID0ge307XG4gICAgICB9XG4gICAgICAvLyBhbnkgZWxlbWVudCBtb3VudGVkIHBhc3NpbmcgdGhyb3VnaCB0aGlzIGZ1bmN0aW9uIGNhbid0IGJlIGEgcHVyZSBjb21wb25lbnRcbiAgICAgIGRlZmluZVByb3BlcnR5KGVsZW1lbnQsIElTX1BVUkVfU1lNQk9MLCBmYWxzZSk7XG4gICAgICB0aGlzW1BBUkVOVF9LRVlfU1lNQk9MXSA9IHBhcmVudFNjb3BlO1xuICAgICAgdGhpc1tBVFRSSUJVVEVTX0tFWV9TWU1CT0xdID0gY3JlYXRlQXR0cmlidXRlQmluZGluZ3MoZWxlbWVudCwgYXR0cmlidXRlcykubW91bnQocGFyZW50U2NvcGUpO1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgUFJPUFNfS0VZLCBPYmplY3QuZnJlZXplKE9iamVjdC5hc3NpZ24oe30sIGNvbXB1dGVJbml0aWFsUHJvcHMoZWxlbWVudCwgcHJvcHMpLCBldmFsdWF0ZUF0dHJpYnV0ZUV4cHJlc3Npb25zKHRoaXNbQVRUUklCVVRFU19LRVlfU1lNQk9MXS5leHByZXNzaW9ucykpKSk7XG4gICAgICB0aGlzW1NUQVRFX0tFWV0gPSBjb21wdXRlQ29tcG9uZW50U3RhdGUodGhpc1tTVEFURV9LRVldLCBzdGF0ZSk7XG4gICAgICB0aGlzW1RFTVBMQVRFX0tFWV9TWU1CT0xdID0gdGhpcy50ZW1wbGF0ZS5jcmVhdGVET00oZWxlbWVudCkuY2xvbmUoKTtcblxuICAgICAgLy8gbGluayB0aGlzIG9iamVjdCB0byB0aGUgRE9NIG5vZGVcbiAgICAgIGJpbmRET01Ob2RlVG9Db21wb25lbnRJbnN0YW5jZShlbGVtZW50LCB0aGlzKTtcbiAgICAgIC8vIGFkZCBldmVudHVhbGx5IHRoZSAnaXMnIGF0dHJpYnV0ZVxuICAgICAgY29tcG9uZW50Lm5hbWUgJiYgYWRkQ3NzSG9vayhlbGVtZW50LCBjb21wb25lbnQubmFtZSk7XG5cbiAgICAgIC8vIGRlZmluZSB0aGUgcm9vdCBlbGVtZW50XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBST09UX0tFWSwgZWxlbWVudCk7XG4gICAgICAvLyBkZWZpbmUgdGhlIHNsb3RzIGFycmF5XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBTTE9UU19LRVksIHNsb3RzKTtcblxuICAgICAgLy8gYmVmb3JlIG1vdW50IGxpZmVjeWNsZSBldmVudFxuICAgICAgdGhpc1tPTl9CRUZPUkVfTU9VTlRfS0VZXSh0aGlzW1BST1BTX0tFWV0sIHRoaXNbU1RBVEVfS0VZXSk7XG4gICAgICAvLyBtb3VudCB0aGUgdGVtcGxhdGVcbiAgICAgIHRoaXNbVEVNUExBVEVfS0VZX1NZTUJPTF0ubW91bnQoZWxlbWVudCwgdGhpcywgcGFyZW50U2NvcGUpO1xuICAgICAgdGhpc1tPTl9NT1VOVEVEX0tFWV0odGhpc1tQUk9QU19LRVldLCB0aGlzW1NUQVRFX0tFWV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICB1cGRhdGUoc3RhdGUsIHBhcmVudFNjb3BlKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICBzdGF0ZSA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKHBhcmVudFNjb3BlKSB7XG4gICAgICAgIHRoaXNbUEFSRU5UX0tFWV9TWU1CT0xdID0gcGFyZW50U2NvcGU7XG4gICAgICAgIHRoaXNbQVRUUklCVVRFU19LRVlfU1lNQk9MXS51cGRhdGUocGFyZW50U2NvcGUpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3UHJvcHMgPSBldmFsdWF0ZUF0dHJpYnV0ZUV4cHJlc3Npb25zKHRoaXNbQVRUUklCVVRFU19LRVlfU1lNQk9MXS5leHByZXNzaW9ucyk7XG4gICAgICBpZiAodGhpc1tTSE9VTERfVVBEQVRFX0tFWV0obmV3UHJvcHMsIHRoaXNbUFJPUFNfS0VZXSkgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBQUk9QU19LRVksIE9iamVjdC5mcmVlemUoT2JqZWN0LmFzc2lnbih7fSwgdGhpc1tQUk9QU19LRVldLCBuZXdQcm9wcykpKTtcbiAgICAgIHRoaXNbU1RBVEVfS0VZXSA9IGNvbXB1dGVDb21wb25lbnRTdGF0ZSh0aGlzW1NUQVRFX0tFWV0sIHN0YXRlKTtcbiAgICAgIHRoaXNbT05fQkVGT1JFX1VQREFURV9LRVldKHRoaXNbUFJPUFNfS0VZXSwgdGhpc1tTVEFURV9LRVldKTtcblxuICAgICAgLy8gYXZvaWRpbmcgcmVjdXJzaXZlIHVwZGF0ZXNcbiAgICAgIC8vIHNlZSBhbHNvIGh0dHBzOi8vZ2l0aHViLmNvbS9yaW90L3Jpb3QvaXNzdWVzLzI4OTVcbiAgICAgIGlmICghdGhpc1tJU19DT01QT05FTlRfVVBEQVRJTkddKSB7XG4gICAgICAgIHRoaXNbSVNfQ09NUE9ORU5UX1VQREFUSU5HXSA9IHRydWU7XG4gICAgICAgIHRoaXNbVEVNUExBVEVfS0VZX1NZTUJPTF0udXBkYXRlKHRoaXMsIHRoaXNbUEFSRU5UX0tFWV9TWU1CT0xdKTtcbiAgICAgIH1cbiAgICAgIHRoaXNbT05fVVBEQVRFRF9LRVldKHRoaXNbUFJPUFNfS0VZXSwgdGhpc1tTVEFURV9LRVldKTtcbiAgICAgIHRoaXNbSVNfQ09NUE9ORU5UX1VQREFUSU5HXSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICB1bm1vdW50KHByZXNlcnZlUm9vdCkge1xuICAgICAgdGhpc1tPTl9CRUZPUkVfVU5NT1VOVF9LRVldKHRoaXNbUFJPUFNfS0VZXSwgdGhpc1tTVEFURV9LRVldKTtcbiAgICAgIHRoaXNbQVRUUklCVVRFU19LRVlfU1lNQk9MXS51bm1vdW50KCk7XG4gICAgICAvLyBpZiB0aGUgcHJlc2VydmVSb290IGlzIG51bGwgdGhlIHRlbXBsYXRlIGh0bWwgd2lsbCBiZSBsZWZ0IHVudG91Y2hlZFxuICAgICAgLy8gaW4gdGhhdCBjYXNlIHRoZSBET00gY2xlYW51cCB3aWxsIGhhcHBlbiBkaWZmZXJlbnRseSBmcm9tIGEgcGFyZW50IG5vZGVcbiAgICAgIHRoaXNbVEVNUExBVEVfS0VZX1NZTUJPTF0udW5tb3VudCh0aGlzLCB0aGlzW1BBUkVOVF9LRVlfU1lNQk9MXSwgcHJlc2VydmVSb290ID09PSBudWxsID8gbnVsbCA6ICFwcmVzZXJ2ZVJvb3QpO1xuICAgICAgdGhpc1tPTl9VTk1PVU5URURfS0VZXSh0aGlzW1BST1BTX0tFWV0sIHRoaXNbU1RBVEVfS0VZXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0pKSwgT2JqZWN0LmtleXMoY29tcG9uZW50KS5maWx0ZXIocHJvcCA9PiBpc0Z1bmN0aW9uKGNvbXBvbmVudFtwcm9wXSkpKTtcbn1cblxuZXhwb3J0IHsgbWFuYWdlQ29tcG9uZW50TGlmZWN5Y2xlIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgU0xPVFNfS0VZLCBST09UX0tFWSwgUFJPUFNfS0VZLCBTVEFURV9LRVkgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBkZWZpbmVQcm9wZXJ0aWVzLCBkZWZpbmVEZWZhdWx0cyB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvb2JqZWN0cy5qcyc7XG5pbXBvcnQgeyBDT01QT05FTlRfRE9NX1NFTEVDVE9SUyB9IGZyb20gJy4vY29tcG9uZW50LWRvbS1zZWxlY3RvcnMuanMnO1xuaW1wb3J0IHsgQ09NUE9ORU5UX0xJRkVDWUNMRV9NRVRIT0RTIH0gZnJvbSAnLi9jb21wb25lbnQtbGlmZWN5Y2xlLW1ldGhvZHMuanMnO1xuaW1wb3J0IGNzc01hbmFnZXIgZnJvbSAnLi9jc3MtbWFuYWdlci5qcyc7XG5pbXBvcnQgY3VycnkgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL2N1cnJpL2luZGV4Lm5leHQuanMnO1xuaW1wb3J0IHsgbWFuYWdlQ29tcG9uZW50TGlmZWN5Y2xlIH0gZnJvbSAnLi9tYW5hZ2UtY29tcG9uZW50LWxpZmVjeWNsZS5qcyc7XG5cbi8qKlxuICogQ29tcG9uZW50IGRlZmluaXRpb24gZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHtPYmplY3R9IGltcGxlbWVudGF0aW9uIC0gdGhlIGNvbXBvbmVudCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIGdlbmVyYXRlZCB2aWEgY29tcGlsZXJcbiAqIEBwYXJhbSAgIHtPYmplY3R9IGNvbXBvbmVudCAtIHRoZSBjb21wb25lbnQgaW5pdGlhbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhIG5ldyBjb21wb25lbnQgaW1wbGVtZW50YXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluc3RhbnRpYXRlQ29tcG9uZW50KF9yZWYpIHtcbiAgbGV0IHtcbiAgICBjc3MsXG4gICAgdGVtcGxhdGUsXG4gICAgY29tcG9uZW50QVBJLFxuICAgIG5hbWVcbiAgfSA9IF9yZWY7XG4gIC8vIGFkZCB0aGUgY29tcG9uZW50IGNzcyBpbnRvIHRoZSBET01cbiAgaWYgKGNzcyAmJiBuYW1lKSBjc3NNYW5hZ2VyLmFkZChuYW1lLCBjc3MpO1xuICByZXR1cm4gY3VycnkobWFuYWdlQ29tcG9uZW50TGlmZWN5Y2xlKShkZWZpbmVQcm9wZXJ0aWVzKFxuICAvLyBzZXQgdGhlIGNvbXBvbmVudCBkZWZhdWx0cyB3aXRob3V0IG92ZXJyaWRpbmcgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCBBUElcbiAgZGVmaW5lRGVmYXVsdHMoY29tcG9uZW50QVBJLCBPYmplY3QuYXNzaWduKHt9LCBDT01QT05FTlRfTElGRUNZQ0xFX01FVEhPRFMsIHtcbiAgICBbUFJPUFNfS0VZXToge30sXG4gICAgW1NUQVRFX0tFWV06IHt9XG4gIH0pKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgLy8gZGVmaW5lZCBkdXJpbmcgdGhlIGNvbXBvbmVudCBjcmVhdGlvblxuICAgIFtTTE9UU19LRVldOiBudWxsLFxuICAgIFtST09UX0tFWV06IG51bGxcbiAgfSwgQ09NUE9ORU5UX0RPTV9TRUxFQ1RPUlMsIHtcbiAgICBuYW1lLFxuICAgIGNzcyxcbiAgICB0ZW1wbGF0ZVxuICB9KSkpO1xufVxuXG5leHBvcnQgeyBpbnN0YW50aWF0ZUNvbXBvbmVudCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IElTX1BVUkVfU1lNQk9MLCBDT01QT05FTlRTX0lNUExFTUVOVEFUSU9OX01BUCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGNhbWVsVG9EYXNoQ2FzZSB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvc3RyaW5ncy5qcyc7XG5pbXBvcnQgeyBjYWxsT3JBc3NpZ24gfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgeyBtZW1vaXplIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9taXNjLmpzJztcbmltcG9ydCB7IE1PQ0tFRF9URU1QTEFURV9JTlRFUkZBQ0UgfSBmcm9tICcuL21vY2tlZC10ZW1wbGF0ZS1pbnRlcmZhY2UuanMnO1xuaW1wb3J0IHsgY29tcG9uZW50VGVtcGxhdGVGYWN0b3J5IH0gZnJvbSAnLi9jb21wb25lbnQtdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBjcmVhdGVQdXJlQ29tcG9uZW50IH0gZnJvbSAnLi9jcmVhdGUtcHVyZS1jb21wb25lbnQuanMnO1xuaW1wb3J0IHsgaW5zdGFudGlhdGVDb21wb25lbnQgfSBmcm9tICcuL2luc3RhbnRpYXRlLWNvbXBvbmVudC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzdWJjb21wb25lbnRzIHRoYXQgY2FuIGJlIGluY2x1ZGVkIGluc2lkZSBhIHRhZyBpbiBydW50aW1lXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBjb21wb25lbnRzIC0gY29tcG9uZW50cyBpbXBvcnRlZCBpbiBydW50aW1lXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhbGwgdGhlIGNvbXBvbmVudHMgdHJhbnNmb3JtZWQgaW50byBSaW90LkNvbXBvbmVudCBmYWN0b3J5IGZ1bmN0aW9uc1xuICovXG5mdW5jdGlvbiBjcmVhdGVDaGlsZHJlbkNvbXBvbmVudHNPYmplY3QoY29tcG9uZW50cykge1xuICBpZiAoY29tcG9uZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgY29tcG9uZW50cyA9IHt9O1xuICB9XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhjYWxsT3JBc3NpZ24oY29tcG9uZW50cykpLnJlZHVjZSgoYWNjLCBfcmVmKSA9PiB7XG4gICAgbGV0IFtrZXksIHZhbHVlXSA9IF9yZWY7XG4gICAgYWNjW2NhbWVsVG9EYXNoQ2FzZShrZXkpXSA9IGNyZWF0ZUNvbXBvbmVudEZyb21XcmFwcGVyKHZhbHVlKTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBnZXR0ZXIgZnVuY3Rpb24gdG8gcmVuZGVyIHRoZSBjaGlsZCBjb21wb25lbnRzXG4gKiBAcGFyYW0gICB7UmlvdENvbXBvbmVudFdyYXBwZXJ9IGNvbXBvbmVudFdyYXBwZXIgLSByaW90IGNvbXBpbGVyIGdlbmVyYXRlZCBvYmplY3RcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjb21wb25lbnQgZmFjdG9yeSBmdW5jdGlvblxuICovXG5jb25zdCBjcmVhdGVDaGlsZENvbXBvbmVudEdldHRlciA9IGNvbXBvbmVudFdyYXBwZXIgPT4ge1xuICBjb25zdCBjaGlsZHJlbkNvbXBvbmVudHMgPSBjcmVhdGVDaGlsZHJlbkNvbXBvbmVudHNPYmplY3QoY29tcG9uZW50V3JhcHBlci5leHBvcnRzID8gY29tcG9uZW50V3JhcHBlci5leHBvcnRzLmNvbXBvbmVudHMgOiB7fSk7XG4gIHJldHVybiBuYW1lID0+IHtcbiAgICAvLyBpbXByb3ZlIHN1cHBvcnQgZm9yIHJlY3Vyc2l2ZSBjb21wb25lbnRzXG4gICAgaWYgKG5hbWUgPT09IGNvbXBvbmVudFdyYXBwZXIubmFtZSkgcmV0dXJuIG1lbW9pemVkQ3JlYXRlQ29tcG9uZW50RnJvbVdyYXBwZXIoY29tcG9uZW50V3JhcHBlcik7XG4gICAgLy8gcmV0dXJuIHRoZSByZWdpc3RlcmVkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gY2hpbGRyZW5Db21wb25lbnRzW25hbWVdIHx8IENPTVBPTkVOVFNfSU1QTEVNRU5UQVRJT05fTUFQLmdldChuYW1lKTtcbiAgfTtcbn07XG5cbi8qKlxuICogUGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGZvciB0aGUgcmVjdXJzaXZlIGNvbXBvbmVudHNcbiAqIEBwYXJhbSAge1Jpb3RDb21wb25lbnRXcmFwcGVyfSBjb21wb25lbnRXcmFwcGVyIC0gcmlvdCBjb21waWxlciBnZW5lcmF0ZWQgb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjb21wb25lbnQgbGlrZSBpbnRlcmZhY2VcbiAqL1xuY29uc3QgbWVtb2l6ZWRDcmVhdGVDb21wb25lbnRGcm9tV3JhcHBlciA9IG1lbW9pemUoY3JlYXRlQ29tcG9uZW50RnJvbVdyYXBwZXIpO1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgY29tcG9uZW50IGludGVyZmFjZSBuZWVkZWQgZm9yIHRoZSBAcmlvdGpzL2RvbS1iaW5kaW5ncyB0YWcgYmluZGluZ3NcbiAqIEBwYXJhbSAgIHtSaW90Q29tcG9uZW50V3JhcHBlcn0gY29tcG9uZW50V3JhcHBlciAtIHJpb3QgY29tcGlsZXIgZ2VuZXJhdGVkIG9iamVjdFxuICogQHBhcmFtICAge3N0cmluZ30gY29tcG9uZW50V3JhcHBlci5jc3MgLSBjb21wb25lbnQgY3NzXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNvbXBvbmVudFdyYXBwZXIudGVtcGxhdGUgLSBmdW5jdGlvbiB0aGF0IHdpbGwgcmV0dXJuIHRoZSBkb20tYmluZGluZ3MgdGVtcGxhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHtPYmplY3R9IGNvbXBvbmVudFdyYXBwZXIuZXhwb3J0cyAtIGNvbXBvbmVudCBpbnRlcmZhY2VcbiAqIEBwYXJhbSAgIHtzdHJpbmd9IGNvbXBvbmVudFdyYXBwZXIubmFtZSAtIGNvbXBvbmVudCBuYW1lXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBjb21wb25lbnQgbGlrZSBpbnRlcmZhY2VcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50RnJvbVdyYXBwZXIoY29tcG9uZW50V3JhcHBlcikge1xuICBjb25zdCB7XG4gICAgY3NzLFxuICAgIHRlbXBsYXRlLFxuICAgIGV4cG9ydHMsXG4gICAgbmFtZVxuICB9ID0gY29tcG9uZW50V3JhcHBlcjtcbiAgY29uc3QgdGVtcGxhdGVGbiA9IHRlbXBsYXRlID8gY29tcG9uZW50VGVtcGxhdGVGYWN0b3J5KHRlbXBsYXRlLCBjb21wb25lbnRXcmFwcGVyLCBjcmVhdGVDaGlsZENvbXBvbmVudEdldHRlcihjb21wb25lbnRXcmFwcGVyKSkgOiBNT0NLRURfVEVNUExBVEVfSU5URVJGQUNFO1xuICByZXR1cm4gX3JlZjIgPT4ge1xuICAgIGxldCB7XG4gICAgICBzbG90cyxcbiAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICBwcm9wc1xuICAgIH0gPSBfcmVmMjtcbiAgICAvLyBwdXJlIGNvbXBvbmVudHMgcmVuZGVyaW5nIHdpbGwgYmUgbWFuYWdlZCBieSB0aGUgZW5kIHVzZXJcbiAgICBpZiAoZXhwb3J0cyAmJiBleHBvcnRzW0lTX1BVUkVfU1lNQk9MXSkgcmV0dXJuIGNyZWF0ZVB1cmVDb21wb25lbnQoZXhwb3J0cywge1xuICAgICAgc2xvdHMsXG4gICAgICBhdHRyaWJ1dGVzLFxuICAgICAgcHJvcHMsXG4gICAgICBjc3MsXG4gICAgICB0ZW1wbGF0ZVxuICAgIH0pO1xuICAgIGNvbnN0IGNvbXBvbmVudEFQSSA9IGNhbGxPckFzc2lnbihleHBvcnRzKSB8fCB7fTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBpbnN0YW50aWF0ZUNvbXBvbmVudCh7XG4gICAgICBjc3MsXG4gICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVGbixcbiAgICAgIGNvbXBvbmVudEFQSSxcbiAgICAgIG5hbWVcbiAgICB9KSh7XG4gICAgICBzbG90cyxcbiAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICBwcm9wc1xuICAgIH0pO1xuXG4gICAgLy8gbm90aWNlIHRoYXQgZm9yIHRoZSBjb21wb25lbnRzIGNyZWF0ZWQgdmlhIHRhZyBiaW5kaW5nXG4gICAgLy8gd2UgbmVlZCB0byBpbnZlcnQgdGhlIG1vdW50IChzdGF0ZS9wYXJlbnRTY29wZSkgYXJndW1lbnRzXG4gICAgLy8gdGhlIHRlbXBsYXRlIGJpbmRpbmdzIHdpbGwgb25seSBmb3J3YXJkIHRoZSBwYXJlbnRTY29wZSB1cGRhdGVzXG4gICAgLy8gYW5kIG5ldmVyIGRlYWwgd2l0aCB0aGUgY29tcG9uZW50IHN0YXRlXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdW50KGVsZW1lbnQsIHBhcmVudFNjb3BlLCBzdGF0ZSkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50Lm1vdW50KGVsZW1lbnQsIHN0YXRlLCBwYXJlbnRTY29wZSk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlKHBhcmVudFNjb3BlLCBzdGF0ZSkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50LnVwZGF0ZShzdGF0ZSwgcGFyZW50U2NvcGUpO1xuICAgICAgfSxcbiAgICAgIHVubW91bnQocHJlc2VydmVSb290KSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQudW5tb3VudChwcmVzZXJ2ZVJvb3QpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUNvbXBvbmVudEZyb21XcmFwcGVyIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVAgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBwYW5pYyB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvbWlzYy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnRGcm9tV3JhcHBlciB9IGZyb20gJy4uL2NvcmUvY3JlYXRlLWNvbXBvbmVudC1mcm9tLXdyYXBwZXIuanMnO1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgY3VzdG9tIHRhZyBieSBuYW1lXG4gKiBAcGFyYW0gICB7c3RyaW5nfSBuYW1lIC0gY29tcG9uZW50IG5hbWVcbiAqIEBwYXJhbSAgIHtPYmplY3R9IGltcGxlbWVudGF0aW9uIC0gdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJucyB7TWFwfSBtYXAgY29udGFpbmluZyBhbGwgdGhlIGNvbXBvbmVudHMgaW1wbGVtZW50YXRpb25zXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUsIF9yZWYpIHtcbiAgbGV0IHtcbiAgICBjc3MsXG4gICAgdGVtcGxhdGUsXG4gICAgZXhwb3J0c1xuICB9ID0gX3JlZjtcbiAgaWYgKENPTVBPTkVOVFNfSU1QTEVNRU5UQVRJT05fTUFQLmhhcyhuYW1lKSkgcGFuaWMoYFRoZSBjb21wb25lbnQgXCIke25hbWV9XCIgd2FzIGFscmVhZHkgcmVnaXN0ZXJlZGApO1xuICBDT01QT05FTlRTX0lNUExFTUVOVEFUSU9OX01BUC5zZXQobmFtZSwgY3JlYXRlQ29tcG9uZW50RnJvbVdyYXBwZXIoe1xuICAgIG5hbWUsXG4gICAgY3NzLFxuICAgIHRlbXBsYXRlLFxuICAgIGV4cG9ydHNcbiAgfSkpO1xuICByZXR1cm4gQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVA7XG59XG5cbmV4cG9ydCB7IHJlZ2lzdGVyIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVAgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBwYW5pYyB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvbWlzYy5qcyc7XG5pbXBvcnQgY3NzTWFuYWdlciBmcm9tICcuLi9jb3JlL2Nzcy1tYW5hZ2VyLmpzJztcblxuLyoqXG4gKiBVbnJlZ2lzdGVyIGEgcmlvdCB3ZWIgY29tcG9uZW50XG4gKiBAcGFyYW0gICB7c3RyaW5nfSBuYW1lIC0gY29tcG9uZW50IG5hbWVcbiAqIEByZXR1cm5zIHtNYXB9IG1hcCBjb250YWluaW5nIGFsbCB0aGUgY29tcG9uZW50cyBpbXBsZW1lbnRhdGlvbnNcbiAqL1xuZnVuY3Rpb24gdW5yZWdpc3RlcihuYW1lKSB7XG4gIGlmICghQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVAuaGFzKG5hbWUpKSBwYW5pYyhgVGhlIGNvbXBvbmVudCBcIiR7bmFtZX1cIiB3YXMgbmV2ZXIgcmVnaXN0ZXJlZGApO1xuICBDT01QT05FTlRTX0lNUExFTUVOVEFUSU9OX01BUC5kZWxldGUobmFtZSk7XG4gIGNzc01hbmFnZXIucmVtb3ZlKG5hbWUpO1xuICByZXR1cm4gQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVA7XG59XG5cbmV4cG9ydCB7IHVucmVnaXN0ZXIgfTtcbiIsICIvKiBSaW90IHY3LjEuMCwgQGxpY2Vuc2UgTUlUICovXG5pbXBvcnQgeyBDT01QT05FTlRTX0lNUExFTUVOVEFUSU9OX01BUCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHBhbmljIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9taXNjLmpzJztcbmltcG9ydCB7IGdldE5hbWUgfSBmcm9tICcuLi91dGlscy9kb20uanMnO1xuXG4vKipcbiAqIENvbXBvbmVudCBpbml0aWFsaXphdGlvbiBmdW5jdGlvbiBzdGFydGluZyBmcm9tIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIGVsZW1lbnQgdG8gdXBncmFkZVxuICogQHBhcmFtICAge09iamVjdH0gaW5pdGlhbFByb3BzIC0gaW5pdGlhbCBjb21wb25lbnQgcHJvcGVydGllc1xuICogQHBhcmFtICAge3N0cmluZ30gY29tcG9uZW50TmFtZSAtIGNvbXBvbmVudCBpZFxuICogQHBhcmFtICAge0FycmF5fSBzbG90cyAtIGNvbXBvbmVudCBzbG90c1xuICogQHJldHVybnMge09iamVjdH0gYSBuZXcgY29tcG9uZW50IGluc3RhbmNlIGJvdW5kIHRvIGEgRE9NIG5vZGVcbiAqL1xuZnVuY3Rpb24gbW91bnRDb21wb25lbnQoZWxlbWVudCwgaW5pdGlhbFByb3BzLCBjb21wb25lbnROYW1lLCBzbG90cykge1xuICBjb25zdCBuYW1lID0gY29tcG9uZW50TmFtZSB8fCBnZXROYW1lKGVsZW1lbnQpO1xuICBpZiAoIUNPTVBPTkVOVFNfSU1QTEVNRU5UQVRJT05fTUFQLmhhcyhuYW1lKSkgcGFuaWMoYFRoZSBjb21wb25lbnQgbmFtZWQgXCIke25hbWV9XCIgd2FzIG5ldmVyIHJlZ2lzdGVyZWRgKTtcbiAgY29uc3QgY29tcG9uZW50ID0gQ09NUE9ORU5UU19JTVBMRU1FTlRBVElPTl9NQVAuZ2V0KG5hbWUpKHtcbiAgICBwcm9wczogaW5pdGlhbFByb3BzLFxuICAgIHNsb3RzXG4gIH0pO1xuICByZXR1cm4gY29tcG9uZW50Lm1vdW50KGVsZW1lbnQpO1xufVxuXG5leHBvcnQgeyBtb3VudENvbXBvbmVudCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCAkIGZyb20gJy4uL25vZGVfbW9kdWxlcy9iaWFuY28ucXVlcnkvaW5kZXgubmV4dC5qcyc7XG5pbXBvcnQgeyBtb3VudENvbXBvbmVudCB9IGZyb20gJy4uL2NvcmUvbW91bnQtY29tcG9uZW50LmpzJztcblxuLyoqXG4gKiBNb3VudGluZyBmdW5jdGlvbiB0aGF0IHdpbGwgd29yayBvbmx5IGZvciB0aGUgY29tcG9uZW50cyB0aGF0IHdlcmUgZ2xvYmFsbHkgcmVnaXN0ZXJlZFxuICogQHBhcmFtICAge3N0cmluZ3xIVE1MRWxlbWVudH0gc2VsZWN0b3IgLSBxdWVyeSBmb3IgdGhlIHNlbGVjdGlvbiBvciBhIERPTSBlbGVtZW50XG4gKiBAcGFyYW0gICB7T2JqZWN0fSBpbml0aWFsUHJvcHMgLSB0aGUgaW5pdGlhbCBjb21wb25lbnQgcHJvcGVydGllc1xuICogQHBhcmFtICAge3N0cmluZ30gbmFtZSAtIG9wdGlvbmFsIGNvbXBvbmVudCBuYW1lXG4gKiBAcmV0dXJucyB7QXJyYXl9IGxpc3Qgb2YgcmlvdCBjb21wb25lbnRzXG4gKi9cbmZ1bmN0aW9uIG1vdW50KHNlbGVjdG9yLCBpbml0aWFsUHJvcHMsIG5hbWUpIHtcbiAgcmV0dXJuICQoc2VsZWN0b3IpLm1hcChlbGVtZW50ID0+IG1vdW50Q29tcG9uZW50KGVsZW1lbnQsIGluaXRpYWxQcm9wcywgbmFtZSkpO1xufVxuXG5leHBvcnQgeyBtb3VudCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCAkIGZyb20gJy4uL25vZGVfbW9kdWxlcy9iaWFuY28ucXVlcnkvaW5kZXgubmV4dC5qcyc7XG5pbXBvcnQgeyBET01fQ09NUE9ORU5UX0lOU1RBTkNFX1BST1BFUlRZIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuXG4vKipcbiAqIFN3ZWV0IHVubW91bnRpbmcgaGVscGVyIGZ1bmN0aW9uIGZvciB0aGUgRE9NIG5vZGUgbW91bnRlZCBtYW51YWxseSBieSB0aGUgdXNlclxuICogQHBhcmFtICAge3N0cmluZ3xIVE1MRWxlbWVudH0gc2VsZWN0b3IgLSBxdWVyeSBmb3IgdGhlIHNlbGVjdGlvbiBvciBhIERPTSBlbGVtZW50XG4gKiBAcGFyYW0gICB7Ym9vbGVhbnxudWxsfSBrZWVwUm9vdEVsZW1lbnQgLSBpZiB0cnVlIGtlZXAgdGhlIHJvb3QgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fSBsaXN0IG9mIG5vZGVzIHVubW91bnRlZFxuICovXG5mdW5jdGlvbiB1bm1vdW50KHNlbGVjdG9yLCBrZWVwUm9vdEVsZW1lbnQpIHtcbiAgcmV0dXJuICQoc2VsZWN0b3IpLm1hcChlbGVtZW50ID0+IHtcbiAgICBpZiAoZWxlbWVudFtET01fQ09NUE9ORU5UX0lOU1RBTkNFX1BST1BFUlRZXSkge1xuICAgICAgZWxlbWVudFtET01fQ09NUE9ORU5UX0lOU1RBTkNFX1BST1BFUlRZXS51bm1vdW50KGtlZXBSb290RWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9KTtcbn1cblxuZXhwb3J0IHsgdW5tb3VudCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NoZWNrcy5qcyc7XG5pbXBvcnQgeyBQTFVHSU5TX1NFVCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IHBhbmljIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9taXNjLmpzJztcblxuLyoqXG4gKiBEZWZpbmUgYSByaW90IHBsdWdpblxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBwbHVnaW4gLSBmdW5jdGlvbiB0aGF0IHdpbGwgcmVjZWl2ZSBhbGwgdGhlIGNvbXBvbmVudHMgY3JlYXRlZFxuICogQHJldHVybnMge1NldH0gdGhlIHNldCBjb250YWluaW5nIGFsbCB0aGUgcGx1Z2lucyBpbnN0YWxsZWRcbiAqL1xuZnVuY3Rpb24gaW5zdGFsbChwbHVnaW4pIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKHBsdWdpbikpIHBhbmljKCdQbHVnaW5zIG11c3QgYmUgb2YgdHlwZSBmdW5jdGlvbicpO1xuICBpZiAoUExVR0lOU19TRVQuaGFzKHBsdWdpbikpIHBhbmljKCdUaGlzIHBsdWdpbiB3YXMgYWxyZWFkeSBpbnN0YWxsZWQnKTtcbiAgUExVR0lOU19TRVQuYWRkKHBsdWdpbik7XG4gIHJldHVybiBQTFVHSU5TX1NFVDtcbn1cblxuZXhwb3J0IHsgaW5zdGFsbCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCB7IFBMVUdJTlNfU0VUIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgcGFuaWMgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL21pc2MuanMnO1xuXG4vKipcbiAqIFVuaW5zdGFsbCBhIHJpb3QgcGx1Z2luXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IHBsdWdpbiAtIHBsdWdpbiBwcmV2aW91c2x5IGluc3RhbGxlZFxuICogQHJldHVybnMge1NldH0gdGhlIHNldCBjb250YWluaW5nIGFsbCB0aGUgcGx1Z2lucyBpbnN0YWxsZWRcbiAqL1xuZnVuY3Rpb24gdW5pbnN0YWxsKHBsdWdpbikge1xuICBpZiAoIVBMVUdJTlNfU0VULmhhcyhwbHVnaW4pKSBwYW5pYygnVGhpcyBwbHVnaW4gd2FzIG5ldmVyIGluc3RhbGxlZCcpO1xuICBQTFVHSU5TX1NFVC5kZWxldGUocGx1Z2luKTtcbiAgcmV0dXJuIFBMVUdJTlNfU0VUO1xufVxuXG5leHBvcnQgeyB1bmluc3RhbGwgfTtcbiIsICIvKiBSaW90IFdJUCwgQGxpY2Vuc2UgTUlUICovXG4vKipcbiAqIFNpbWlsYXIgdG8gY29tcG9zZSBidXQgcGVyZm9ybXMgZnJvbSBsZWZ0LXRvLXJpZ2h0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLjxici8+XG4gKiB7QGxpbmsgaHR0cHM6Ly8zMHNlY29uZHNvZmNvZGUub3JnL2Z1bmN0aW9uI2NvbXBvc2VyaWdodCBzZWUgYWxzb31cbiAqIEBwYXJhbSAgIHsuLi5bZnVuY3Rpb25dfSBmbnMpIC0gbGlzdCBvZiB1bmFyeSBmdW5jdGlvblxuICogQHJldHVybnMgeyp9IHJlc3VsdCBvZiB0aGUgY29tcHV0YXRpb25cbiAqL1xuXG4vKipcbiAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgZnVuY3Rpb24gY29tcG9zaXRpb24uPGJyLz5cbiAqIFVzZSBBcnJheS5wcm90b3R5cGUucmVkdWNlKCkgdG8gcGVyZm9ybSByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLjxici8+XG4gKiBUaGUgbGFzdCAocmlnaHRtb3N0KSBmdW5jdGlvbiBjYW4gYWNjZXB0IG9uZSBvciBtb3JlIGFyZ3VtZW50czsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS48YnIvPlxuICoge0BsaW5rIGh0dHBzOi8vMzBzZWNvbmRzb2Zjb2RlLm9yZy9mdW5jdGlvbiNjb21wb3NlIG9yaWdpbmFsIHNvdXJjZSBjb2RlfVxuICogQHBhcmFtICAgey4uLltmdW5jdGlvbl19IGZucykgLSBsaXN0IG9mIHVuYXJ5IGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7Kn0gcmVzdWx0IG9mIHRoZSBjb21wdXRhdGlvblxuICovXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZucyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGZuc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG4gIHJldHVybiBmbnMucmVkdWNlKChmLCBnKSA9PiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGYoZyguLi5hcmd1bWVudHMpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGNvbXBvc2UgYXMgZGVmYXVsdCB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbmltcG9ydCBjb21wb3NlIGZyb20gJy4uL25vZGVfbW9kdWxlcy9jdW1wYS9pbmRleC5uZXh0LmpzJztcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudEZyb21XcmFwcGVyIH0gZnJvbSAnLi4vY29yZS9jcmVhdGUtY29tcG9uZW50LWZyb20td3JhcHBlci5qcyc7XG5cbi8qKlxuICogSGVscGVyIG1ldGhvZCB0byBjcmVhdGUgY29tcG9uZW50IHdpdGhvdXQgcmVseWluZyBvbiB0aGUgcmVnaXN0ZXJlZCBvbmVzXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBpbXBsZW1lbnRhdGlvbiAtIGNvbXBvbmVudCBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSBmdW5jdGlvbiB0aGF0IHdpbGwgYWxsb3cgeW91IHRvIG1vdW50IGEgcmlvdCBjb21wb25lbnQgb24gYSBET00gbm9kZVxuICovXG5mdW5jdGlvbiBjb21wb25lbnQoaW1wbGVtZW50YXRpb24pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgcHJvcHMsIF90ZW1wKSB7XG4gICAgbGV0IHtcbiAgICAgIHNsb3RzLFxuICAgICAgYXR0cmlidXRlcyxcbiAgICAgIHBhcmVudFNjb3BlXG4gICAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICAgIHJldHVybiBjb21wb3NlKGMgPT4gYy5tb3VudChlbCwgcGFyZW50U2NvcGUpLCBjID0+IGMoe1xuICAgICAgcHJvcHMsXG4gICAgICBzbG90cyxcbiAgICAgIGF0dHJpYnV0ZXNcbiAgICB9KSwgY3JlYXRlQ29tcG9uZW50RnJvbVdyYXBwZXIpKGltcGxlbWVudGF0aW9uKTtcbiAgfTtcbn1cblxuZXhwb3J0IHsgY29tcG9uZW50IH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvY2hlY2tzLmpzJztcbmltcG9ydCB7IElTX1BVUkVfU1lNQk9MIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0ByaW90anMvdXRpbC9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgcGFuaWMgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL21pc2MuanMnO1xuXG4vKipcbiAqIExpZnQgYSByaW90IGNvbXBvbmVudCBJbnRlcmZhY2UgaW50byBhIHB1cmUgcmlvdCBvYmplY3RcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gZnVuYyAtIFJpb3RQdXJlQ29tcG9uZW50IGZhY3RvcnkgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gdGhlIGxpZnRlZCBvcmlnaW5hbCBmdW5jdGlvbiByZWNlaXZlZCBhcyBhcmd1bWVudFxuICovXG5mdW5jdGlvbiBwdXJlKGZ1bmMpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGZ1bmMpKSBwYW5pYygncmlvdC5wdXJlIGFjY2VwdHMgb25seSBhcmd1bWVudHMgb2YgdHlwZSBcImZ1bmN0aW9uXCInKTtcbiAgZnVuY1tJU19QVVJFX1NZTUJPTF0gPSB0cnVlO1xuICByZXR1cm4gZnVuYztcbn1cblxuZXhwb3J0IHsgcHVyZSB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbi8qKlxuICogbm8tb3AgZnVuY3Rpb24gbmVlZGVkIHRvIGFkZCB0aGUgcHJvcGVyIHR5cGVzIHRvIHlvdXIgY29tcG9uZW50IHZpYSB0eXBlc2NyaXB0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gY29tcG9uZW50IC0gY29tcG9uZW50IGRlZmF1bHQgZXhwb3J0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSByZXR1cm5zIGV4YWN0bHkgd2hhdCBpdCBoYXMgcmVjZWl2ZWRcbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IHdpdGhUeXBlcyA9IGNvbXBvbmVudCA9PiBjb21wb25lbnQ7XG5cbmV4cG9ydCB7IHdpdGhUeXBlcyB9O1xuIiwgIi8qIFJpb3QgdjcuMS4wLCBAbGljZW5zZSBNSVQgKi9cbi8qKiBAdHlwZSB7c3RyaW5nfSBjdXJyZW50IHJpb3QgdmVyc2lvbiAqL1xuY29uc3QgdmVyc2lvbiA9ICd2Ny4xLjAnO1xuXG5leHBvcnQgeyB2ZXJzaW9uIH07XG4iLCAiLyogUmlvdCB2Ny4xLjAsIEBsaWNlbnNlIE1JVCAqL1xuaW1wb3J0IGJpbmRpbmdUeXBlcyBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2JpbmRpbmctdHlwZXMuanMnO1xuaW1wb3J0IHsgRE9NX0NPTVBPTkVOVF9JTlNUQU5DRV9QUk9QRVJUWSwgUEFSRU5UX0tFWV9TWU1CT0wgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy91dGlsL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgZXhwcmVzc2lvblR5cGVzIGZyb20gJy4uL25vZGVfbW9kdWxlcy9AcmlvdGpzL3V0aWwvZXhwcmVzc2lvbi10eXBlcy5qcyc7XG5pbXBvcnQgeyB0ZW1wbGF0ZSBhcyBjcmVhdGUsIGNyZWF0ZUJpbmRpbmcgYXMgY3JlYXRlJDEsIGNyZWF0ZUV4cHJlc3Npb24gYXMgY3JlYXRlJDQgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQHJpb3Rqcy9kb20tYmluZGluZ3MvZGlzdC9lc20uZG9tLWJpbmRpbmdzLmpzJztcbmltcG9ydCBjc3NNYW5hZ2VyIGZyb20gJy4uL2NvcmUvY3NzLW1hbmFnZXIuanMnO1xuXG4vLyBleHBvc2Ugc29tZSBpbnRlcm5hbCBzdHVmZiB0aGF0IG1pZ2h0IGJlIHVzZWQgZnJvbSBleHRlcm5hbCB0b29sc1xuY29uc3QgX18gPSB7XG4gIGNzc01hbmFnZXIsXG4gIERPTUJpbmRpbmdzOiB7XG4gICAgdGVtcGxhdGU6IGNyZWF0ZSxcbiAgICBjcmVhdGVCaW5kaW5nOiBjcmVhdGUkMSxcbiAgICBjcmVhdGVFeHByZXNzaW9uOiBjcmVhdGUkNCxcbiAgICBiaW5kaW5nVHlwZXMsXG4gICAgZXhwcmVzc2lvblR5cGVzXG4gIH0sXG4gIGdsb2JhbHM6IHtcbiAgICBET01fQ09NUE9ORU5UX0lOU1RBTkNFX1BST1BFUlRZLFxuICAgIFBBUkVOVF9LRVlfU1lNQk9MXG4gIH1cbn07XG5cbmV4cG9ydCB7IF9fIH07XG4iLCAiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLy8gXHUzMEU2XHUzMEZDXHUzMEM2XHUzMEEzXHUzMEVBXHUzMEM2XHUzMEEzXHU5NUEyXHU2NTcwXHU3RkE0XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbi8vIG9iaiBcdTMwNkIgb3B0aW9ucyBcdTMwOTJcdTUzRDZcdTMwOEFcdThGQkNcdTMwODBcclxuZXhwb3J0IGZ1bmN0aW9uIGltcG9ydE9wdGlvbnMob2JqLCBvcHRpb25zLCBkZWZhdWx0X3ZhbHVlcykge1xyXG4gIE9iamVjdC5rZXlzKGRlZmF1bHRfdmFsdWVzKS5mb3JFYWNoKCBrID0+IHtcclxuICAgIGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgb2JqW2tdID0gaXNOYU4ob3B0aW9uc1trXSkgPyBvcHRpb25zW2tdIDogTnVtYmVyKG9wdGlvbnNba10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2JqW2tdID0gZGVmYXVsdF92YWx1ZXNba107XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLy8gU2xlZXAgXHU5NUEyXHU2NTcwXHJcbi8vIGh0dHBzOi8vY2FtcC50cmFpbm9jYXRlLmNvLmpwL21hZ2F6aW5lL2hvd3RvLWphdmFzY3JpcHQtc2xlZXAvXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbGVlcChtcykge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcclxufVxyXG5cclxuLy8gd2FzbSBcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNEJcdTMwODlcdTMwRTJcdTMwQjhcdTMwRTVcdTMwRkNcdTMwRUJcdTMwOTJcdThBQURcdTMwN0ZcdThGQkNcdTMwODBcclxuLy8gXHUzMEUxXHUzMEUyXHUzMEVBXHUzMEEyXHUzMEFGXHUzMEJCXHUzMEI5XHU3NTI4XHUzMDZFXHUzMEQ4XHUzMEVCXHUzMEQxXHUzMEZDXHUzMDkyXHU1NDJCXHUzMDgxXHUzMDY2XHU4RkQ0XHUzMDU5XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkV2FzbSh3YXNtRmlsZSkge1xyXG4gIGxldCBvYmogPSBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhmZXRjaCh3YXNtRmlsZSksIHt9KVxyXG4gIGxldCB3YXNtID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqLmluc3RhbmNlLmV4cG9ydHMpO1xyXG5cclxuICAvLyBcdTMwRDJcdTMwRkNcdTMwRDdcdTMwRTFcdTMwRTJcdTMwRUFcdTMwNkVcdTMwRTZcdTMwRkNcdTMwQzZcdTMwQTNcdTMwRUFcdTMwQzZcdTMwQTNcclxuICBcclxuICAvLyBqYXZhc2NyaXB0IFx1MzBBQVx1MzBENlx1MzBCOFx1MzBBN1x1MzBBRlx1MzBDOFx1MzA0Q1x1MzBBQ1x1MzBGQ1x1MzBEOVx1MzBGQ1x1MzBCOFx1MzBCM1x1MzBFQ1x1MzBBRlx1MzBCN1x1MzBFN1x1MzBGM1x1MzA1NVx1MzA4Q1x1MzA4QlxyXG4gIC8vIFx1NjY0Mlx1MzA2QiBmcmVlIFx1MzA1OVx1MzA3OVx1MzA0RFx1MzBFMVx1MzBFMlx1MzBFQVx1MzA5Mlx1N0JBMVx1NzQwNlx1MzA1OVx1MzA4QlxyXG4gIFxyXG4gIGNvbnN0IGZpbmFsaXplciA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgocG9pbnRlcikgPT4ge1xyXG4gICAgaWYoQXJyYXkuaXNBcnJheShwb2ludGVyKSkge1xyXG4gICAgICBmb3IobGV0IHAgb2YgcG9pbnRlcikgd2FzbS5mcmVlKHApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FzbS5mcmVlKHBvaW50ZXIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBsZXQgaGVhcCA9IHt9O1xyXG4gIGhlYXAudTMyID0gbmV3IFVpbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgaGVhcC5pMzIgPSBuZXcgSW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xyXG4gIGhlYXAudTE2ID0gbmV3IFVpbnQxNkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgaGVhcC5pMTYgPSBuZXcgSW50MTZBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xyXG4gIGhlYXAudThjID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgaGVhcC51OCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgaGVhcC5pOCA9IG5ldyBJbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcclxuICBoZWFwLmk2NCA9IG5ldyBCaWdJbnQ2NEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgaGVhcC51NjQgPSBuZXcgQmlnVWludDY0QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcclxuICBoZWFwLmYzMiA9IG5ldyBGbG9hdDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcclxuICBoZWFwLmY2NCA9IG5ldyBGbG9hdDY0QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcclxuICBcclxuICAvLyBcdTU0MDQgYXJyYXkgXHUzMDZCIGFsbG9jIFx1MzA2OFx1MzA0NFx1MzA0Nlx1MzBFMVx1MzBCRFx1MzBDM1x1MzBDOVx1MzA5Mlx1OEZGRFx1NTJBMFxyXG4gIC8vIG4gXHU1MDBCXHUzMDZFXHU4OTgxXHU3RDIwXHUzMDkyIG1hbGxvYyBcdTMwNTdcdTMwNjYgVHlwZWRBcnJheSBcdTMwNkJcdTMwRTlcdTMwQzNcdTMwRDdcdTMwNTdcdTMwNjZcdThGRDRcdTMwNTlcclxuICAvLyBcdTMwNURcdTMwNkUgVHlwZWRBcnJheSBcdTMwNENcdTMwQUNcdTMwRkNcdTMwRDlcdTMwRkNcdTMwQjhcdTMwQjNcdTMwRUNcdTMwQUZcdTMwQjdcdTMwRTdcdTMwRjNcdTMwNTVcdTMwOENcdTMwOEJcdTk2OUJcdTMwNkJcdTMwNkZcclxuICAvLyBcdTc4QkFcdTRGRERcdTMwNTVcdTMwOENcdTMwNUZcdTMwRTFcdTMwRTJcdTMwRUFcdTMwODJcdTgxRUFcdTUyRDVcdTc2ODRcdTMwNkIgZnJlZSBcdTMwNTVcdTMwOENcdTMwOEJcclxuICBcclxuICAvLyBtZW0uZnJlZSBcdTMwNjdcdTYyNEJcdTUyRDVcdTMwNjdcdTg5RTNcdTY1M0VcclxuICAvLyBtZW0ucHRyIFx1MzA2NyBDKysgXHUzMEREXHUzMEE0XHUzMEYzXHUzMEJGXHUzMDRDXHU1Rjk3XHUzMDg5XHUzMDhDXHUzMDhCXHJcbiAgXHJcbiAgZm9yKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoaGVhcCkpIHtcclxuICAgIGhlYXBba2V5XS5hbGxvYyA9IChuKSA9PiB7XHJcbiAgICAgIC8vIFx1NTQwQ1x1MzA1OFx1NTc4Qlx1MzA2RVx1MzBBRlx1MzBFOVx1MzBCOVx1MzA5Mlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBCRlx1MzBGM1x1MzBCOVx1NTMxNlxyXG4gICAgICBjb25zdCBfQ2xhc3MgPSBoZWFwW2tleV0uY29uc3RydWN0b3I7XHJcbiAgICAgIGxldCBwdHI7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcHRyID0gd2FzbS5tYWxsb2MoX0NsYXNzLkJZVEVTX1BFUl9FTEVNRU5UICogbik7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIHB0ciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYoIXB0cikge1xyXG4gICAgICAgIGFsZXJ0KCdvdXQgb2YgbWVtb3J5Jyk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvdXQgb2YgbWVtb3J5Jyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWVtID0gbmV3IF9DbGFzcyh3YXNtLm1lbW9yeS5idWZmZXIsIHB0ciwgbilcclxuXHJcbiAgICAgIG1lbS5wdHIgPSBtZW0uYnl0ZU9mZnNldDsgLy8gXHUzMEI3XHUzMEU1XHUzMEFDXHUzMEZDXHJcblxyXG4gICAgICAvLyBcdTMwQUNcdTMwRkNcdTMwRDlcdTMwRkNcdTMwQjhcdTMwQjNcdTMwRUNcdTMwQUZcdTMwQjdcdTMwRTdcdTMwRjNcdTMwNTVcdTMwOENcdTMwOEJcdTMwNjhcdTMwNERcdTMwNkIgZnJlZSBcdTMwNTlcdTMwOEJcdTMwODhcdTMwNDZcdTc2N0JcdTkzMzJcclxuICAgICAgZmluYWxpemVyLnJlZ2lzdGVyKG1lbSwgbWVtLnB0cik7XHJcbiAgICAgIFxyXG4gICAgICAvLyBcdTYyNEJcdTUyRDVcdTMwNjcgZnJlZSBcdTMwNTlcdTMwOEJcdTMwNUZcdTMwODFcdTMwNkVcdTk1QTJcdTY1NzBcdTMwOTJcdTc1MjhcdTYxMEZcclxuICAgICAgbWVtLmZyZWUgPSAoKSA9PiB7XHJcbiAgICAgICAgZmluYWxpemVyLnVucmVnaXN0ZXIobWVtKTtcclxuICAgICAgICB3YXNtLmZyZWUobWVtLnB0cik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1lbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHdhc20sIGhlYXApO1xyXG59XHJcblxyXG4vLyBvYmogXHUzMDZFXHUzMEM3XHUzMEI5XHUzMEM4XHUzMEU5XHUzMEFGXHUzMEJGXHUzMDkyXHU1NDdDXHUzMDc2XHJcbmV4cG9ydCBmdW5jdGlvbiBkZXN0cnVjdChvYmopXHJcbntcclxuICBpZihvYmogJiYgb2JqLmRlc3RydWN0b3IpIG9iai5kZXN0cnVjdG9yKCk7XHJcbn1cclxuXHJcbi8vIEV2ZW50VGFyZ2V0IFx1MzA2OFx1MzA1N1x1MzA2Nlx1NTBDRFx1MzA0Rlx1MzA4OFx1MzA0Nlx1MzA2Qlx1MzA1OVx1MzA4QlxyXG4vLyBkaXNwYXRjaEV2ZW50IFx1MzA2RVx1NUI5QVx1N0ZBOVx1MzA0Q1x1OTA1NVx1MzA0Nlx1MzA2RVx1MzA2N1x1NkNFOFx1NjEwRlxyXG5leHBvcnQgZnVuY3Rpb24gaW1wbGVtZW50RXZlbnRUYXJnZXQob2JqKSB7XHJcbiAgY29uc3QgZXZlbnRUYXJnZXQgPSBuZXcgRXZlbnRUYXJnZXQoKTtcclxuXHJcbiAgb2JqLmFkZEV2ZW50TGlzdGVuZXIgPSAoLi4uYXJncykgPT5cclxuICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XHJcblxyXG4gIG9iai5yZW1vdmVFdmVudExpc3RlbmVyID0gKC4uLmFyZ3MpID0+XHJcbiAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xyXG5cclxuICBvYmouZGlzcGF0Y2hFdmVudCA9IChldmVudCwgZGV0YWlsX2NvbnRlbnQpID0+XHJcbiAgICBldmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoZXZlbnQsIHsgZGV0YWlsOiBkZXRhaWxfY29udGVudCB9KSlcclxufVxyXG5cclxuLy8gb2JqIFx1MzA2RVx1MzBEN1x1MzBFRFx1MzBBRFx1MzBCN1x1MzA5Mlx1NEY1Q1x1MzA4QlxyXG4vLyBcdTMwRDdcdTMwRURcdTMwRDFcdTMwQzZcdTMwQTNcdTMwNkVcdTU5MDlcdTY2RjRcdTMwOTJcdTY5MUNcdTUxRkFcdTUzRUZcdTgwRkRcdTMwNkJcdTMwNkFcdTMwOEJcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KG9iaiwgdXBkYXRlRnVuYykge1xyXG4gIGxldCBwcm94eSA9IHt9XHJcbiAgZm9yKGxldCBrIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm94eSwgaywge1xyXG4gICAgICBnZXQoKSB7IHJldHVybiBvYmpba107IH0sXHJcbiAgICAgIHNldCh2KSB7IHVwZGF0ZUZ1bmMob2JqLCBPYmplY3QuZnJvbUVudHJpZXMoW1trLCB2XV0pKTsgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBwcm94eTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGludDJoZXgoaSkge1xyXG4gIHJldHVybiAoXCIwMDBcIisoKChpfDApID4+PiAxNikmMHhmZmZmKS50b1N0cmluZygxNikpLnNsaWNlKC00KSArXHJcbiAgICAgICAgIChcIjAwMFwiKygoKGl8MCkgICAgICAgKSYweGZmZmYpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpIDtcclxufVxyXG4iLCAiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLy8gXHU2M0NGXHU3NTNCXHUzMDY4XHU5MzMyXHU3NTNCXHUzMDkyXHU3QkExXHU3NDA2XHUzMDU5XHUzMDhCXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNSZW5kZXJlciB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzLCByZW5kZXIsIG9ucmVjb3JkZWQpIHtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcbiAgICB0aGlzLm1pblBlcmlvZCA9IDUwO1xyXG4gICAgdGhpcy5yZXF1ZXN0SUQgPSBudWxsO1xyXG4gICAgdGhpcy5yZWNvZGVyID0gbnVsbDtcclxuICAgIHRoaXMub25yZWNvcmRlZCA9IG9ucmVjb3JkZWQ7XHJcbiAgICB0aGlzLnJlcXVlc3RTdG9wID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hdmVyYWdlUGVyaW9kID0gMTtcclxuICB9XHJcbiAgXHJcbiAgZ2V0IGZwcygpIHtcclxuICAgIHJldHVybiAxMDAwIC8gdGhpcy5hdmVyYWdlUGVyaW9kO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heEZwcygpIHtcclxuICAgIHJldHVybiAxMDAwIC8gdGhpcy5taW5QZXJpb2Q7XHJcbiAgfVxyXG4gIFxyXG4gIHNldCBtYXhGcHModikge1xyXG4gICAgaWYgKHYgPiAwKSB7XHJcbiAgICAgIHRoaXMubWluUGVyaW9kID0gMTAwMCAvIHY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1pblBlcmlvZCA9IDA7ICAvLyBubyBsaW1pdFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RTdG9wID0gZmFsc2U7XHJcbiAgICBpZighdGhpcy5yZXF1ZXN0SUQpXHJcbiAgICAgIHRoaXMucmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodHMpID0+IHRoaXMuZnJhbWUodHMpKTtcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcbiAgICBpZih0aGlzLnJlcXVlc3RJRCAhPSBudWxsKVxyXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yZXF1ZXN0SUQpXHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0U3RvcCA9IHRydWU7XHJcbiAgICB0aGlzLnJlcXVlc3RJRCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBzdGFydFJlY29yZGluZygpIHtcclxuICAgIGNvbnN0IGNodW5rcyA9IFtdOyAvLyBoZXJlIHdlIHdpbGwgc3RvcmUgb3VyIHJlY29yZGVkIG1lZGlhIGNodW5rcyAoQmxvYnMpXHJcbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLmNhbnZhcy5jYXB0dXJlU3RyZWFtKCk7IC8vIGdyYWIgb3VyIGNhbnZhcyBNZWRpYVN0cmVhbVxyXG4gICAgdGhpcy5yZWMgPSBuZXcgTWVkaWFSZWNvcmRlcihzdHJlYW0pO1xyXG4gICAgdGhpcy5yZWMub25kYXRhYXZhaWxhYmxlID0gZSA9PiBjaHVua3MucHVzaChlLmRhdGEpO1xyXG4gICAgdGhpcy5yZWMub25zdG9wID0gKCkgPT4gdGhpcy5vbnJlY29yZGVkKG5ldyBCbG9iKGNodW5rcywge3R5cGU6ICd2aWRlby93ZWJtJ30pKTtcclxuICAgIHRoaXMucmVjLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBzdG9wUmVjb3JkaW5nKCkge1xyXG4gICAgdGhpcy5yZWMuc3RvcCgpO1xyXG4gICAgdGhpcy5yZWMgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsUmVjb3JkaW5nKCkge1xyXG4gICAgdGhpcy5yZWMub25zdG9wID0gbnVsbDtcclxuICAgIHRoaXMuc3RvcFJlY29yZGluZygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnJhbWUodHMpIHtcclxuICAgIGlmKHRoaXMucmVxdWVzdFN0b3ApIFxyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0SUQgPSBudWxsO1xyXG5cclxuICAgIC8vIFx1NTI0RFx1NTZERVx1MzA0Qlx1MzA4OVx1MzA2RVx1N0Q0Q1x1OTA0RVx1NjY0Mlx1OTU5M1x1MzA0Q1x1NzdFRFx1MzA1OVx1MzA0RVx1MzA1Rlx1MzA4OVx1NUY4NVx1MzA2NFxyXG4gICAgY29uc3QgcGVyaW9kID0gdHMgLSAodGhpcy5sYXN0X3RzIHx8ICh0cyAtIDEwKSk7XHJcbiAgICB0aGlzLmxhc3RfdHMgPSB0cztcclxuICAgIGlmKHRoaXMubWluUGVyaW9kID4gMCAmJiBwZXJpb2QgPCB0aGlzLm1pblBlcmlvZCkge1xyXG4gICAgICBhd2FpdCB1dGlsLnNsZWVwKHRoaXMubWluUGVyaW9kIC0gcGVyaW9kKTtcclxuICAgICAgdGhpcy5hdmVyYWdlUGVyaW9kID0gdGhpcy5hdmVyYWdlUGVyaW9kICogMC45NSArIHRoaXMubWluUGVyaW9kICogMC4wNTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXZlcmFnZVBlcmlvZCA9IHRoaXMuYXZlcmFnZVBlcmlvZCAqIDAuOTUgKyBwZXJpb2QgKiAwLjA1O1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMucmVxdWVzdFN0b3ApIFxyXG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0SUQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKHRzLCB0aGlzLmNhbnZhcyk7XHJcblxyXG4gICAgLy8gXHU2QjIxXHUzMDZFXHUzMEQ1XHUzMEVDXHUzMEZDXHUzMEUwXHUzMDkyXHU4OTgxXHU2QzQyXHUzMDU5XHUzMDhCXHJcbiAgICB0aGlzLnJlcXVlc3RJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRzKSA9PiB0aGlzLmZyYW1lKHRzKSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCAiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLy8gXHU3NkY4XHU0RTkyXHU0RjVDXHU3NTI4XHUzMEJCXHUzMEMzXHUzMEM4XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmV4cG9ydCBjb25zdCBpbnRlcmFjdGlvblNldHMgPSB7XHJcbiAgLy8gXHUzMEM3XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEM4XHJcbiAgJyc6IChpbnRlcmFjdGlvbiwgcmFuZCkgPT4gaW50ZXJhY3Rpb24uc2V0KCAoaSwgaikgPT4gKGkgPT0gaikgPyBcclxuICAgICAgWyAgICAgLy8gXHU1NDBDXHU3QTJFXHU3QzkyXHU1QjUwXHJcbiAgICAgICAgICAtKDAuMDAxMCArIDAuMDAwNSAqICByYW5kLm5leHQoKSAgICAgICksICAvLyBwYXJhbV9hID0gXHU4RkQxXHU4REREXHU5NkUyXHJcbiAgICAgICAgICAgICAgICAgICAgIDAuMDAxICAqIChyYW5kLm5leHQoKSAtIDAuNSkgICAvLyBwYXJhbV9iID0gXHU5NTc3XHU4REREXHU5NkUyXHJcbiAgICAgIF0gOiBbICAgICAgICAgICAgICAgLy8gXHU3NTcwXHU3QTJFXHU3QzkyXHU1QjUwXHJcbiAgICAgICAgICAtKDAuMDAwNSArIDAuMDAwNSAqICByYW5kLm5leHQoKSAgICAgICksICAvLyBwYXJhbV9hID0gXHU4RkQxXHU4REREXHU5NkUyXHJcbiAgICAgICAgICAgICAgICAgICAgIDAuMDAxICAqIChyYW5kLm5leHQoKSAtIDAuNSkgICAvLyBwYXJhbV9iID0gXHU5NTc3XHU4REREXHU5NkUyXHJcbiAgICAgIF0pLFxyXG5cclxuICAvLyBcdTU5MUFcdTdDOTJcdTVCNTBcdTdBMkVcdTg4RENcdTZCNjNcclxuICAvLyBcdTc1NzBcdTdBMkVcdTk1OTNcdTc2RjhcdTRFOTJcdTRGNUNcdTc1MjhcdTMwOTJcdTc1OEVcdTdENTBcdTU0MDhcdTMwNkJcdTMwNTdcdTMwNjZcdTMwNDRcdTMwOEJcclxuICAnQSc6IChpbnRlcmFjdGlvbiwgcmFuZCkgPT4gaW50ZXJhY3Rpb24uc2V0KCAoaSwgaikgPT4gKGkgPT0gaikgPyBcclxuICAgICAgWyAgICAgLy8gXHU1NDBDXHU3QTJFXHU3QzkyXHU1QjUwXHJcbiAgICAgICAgICAtKDAuMDAxMCArIDAuMDAwNSAqICByYW5kLm5leHQoKSAgICAgICksICAvLyBwYXJhbV9hID0gXHU4RkQxXHU4REREXHU5NkUyXHJcbiAgICAgICAgICAgICAgICAgICAgIDAuMDAxICAqIChyYW5kLm5leHQoKSAtIDAuNSkgICAvLyBwYXJhbV9iID0gXHU5NTc3XHU4REREXHU5NkUyXHJcbiAgICAgIF0gOiBbIC8vIFx1NzU3MFx1N0EyRVx1N0M5Mlx1NUI1MFxyXG4gICAgICAgICAgLSgwLjAwMTAgKyAwLjAwMDUgKiAgcmFuZC5uZXh0KCkgICAgICApLCAgLy8gcGFyYW1fYSA9IFx1OEZEMVx1OERERFx1OTZFMlxyXG4gICAgICAgICAgICAgICAgICAgICAwLjAwMSAqICByYW5kLm5leHQoKSoqNiAqIChyYW5kLm5leHQoKSA+IDAuNyA/IDEgOiAtMSkgIC8vIHBhcmFtX2IgPSBcdTk1NzdcdThERERcdTk2RTJcclxuICAgICAgXSksXHJcblxyXG4gIC8vIFx1NTkxQVx1N0M5Mlx1NUI1MFx1N0EyRVx1ODhEQ1x1NkI2M1x1RkYxMlxyXG4gIC8vIFx1NzU3MFx1N0EyRVx1OTU5M1x1NzZGOFx1NEU5Mlx1NEY1Q1x1NzUyOFx1MzA5Mlx1NzU4RVx1N0Q1MFx1NTQwOFx1MzA2Qlx1MzA1N1x1MzA2Nlx1MzA0NFx1MzA4Qlx1RkYwOEEgXHUzMDY3XHUzMDZGXHU1MDBEXHU3Mzg3XHUzMDkyXHU5NTkzXHU5MDU1XHUzMDQ4XHUzMDY2XHUzMDQ0XHUzMDVGXHVGRjA5XHJcbiAgJ0InOiAoaW50ZXJhY3Rpb24sIHJhbmQpID0+IGludGVyYWN0aW9uLnNldCggKGksIGopID0+IChpID09IGopID8gXHJcbiAgICAgIFsgICAgIC8vIFx1NTQwQ1x1N0EyRVx1N0M5Mlx1NUI1MFxyXG4gICAgICAgICAgLSgwLjAwMTAgKyAwLjAwMDUgKiAgcmFuZC5uZXh0KCkgICAgICApLCAgLy8gcGFyYW1fYSA9IFx1OEZEMVx1OERERFx1OTZFMlxyXG4gICAgICAgICAgICAgICAgICAgICAwLjAwMSAgKiAocmFuZC5uZXh0KCkgLSAwLjUpICAgLy8gcGFyYW1fYiA9IFx1OTU3N1x1OERERFx1OTZFMlxyXG4gICAgICBdIDogWyAvLyBcdTc1NzBcdTdBMkVcdTdDOTJcdTVCNTBcclxuICAgICAgICAgIC0oMC4wMDEwICsgMC4wMDA1ICogIHJhbmQubmV4dCgpICAgICAgKSwgIC8vIHBhcmFtX2EgPSBcdThGRDFcdThERERcdTk2RTJcclxuICAgICAgICAgICAgICAgICAgICAgMC4wMDA1ICogIHJhbmQubmV4dCgpKio2ICogKHJhbmQubmV4dCgpID4gMC43ID8gMSA6IC0xKSAgLy8gcGFyYW1fYiA9IFx1OTU3N1x1OERERFx1OTZFMlxyXG4gICAgICBdKSxcclxuXHJcbn07XHJcbiIsICIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8vIFx1MzBBQlx1MzBFOVx1MzBGQ1x1MzBCOVx1MzBCMVx1MzBGQ1x1MzBFQlxyXG5cclxuICBbMCwgMSkgXHUzMDZFXHU3QkM0XHU1NkYyXHUzMDZFXHU2NTcwXHU1MDI0XHUzMDkyXHU4MjcyXHUzMDZCXHU1OTA5XHU2M0RCXHUzMDU5XHUzMDhCXHUzMEI5XHUzMEIxXHUzMEZDXHUzMEVCXHUzMDkyXHU1QjlBXHU3RkE5XHUzMDU5XHUzMDhCXHJcblxyXG4gIGxldCBzY2FsZSA9IG5ldyBDb2xvclNjYWxlKFtcclxuICAgICAgWzAsIDAsIDAsIDBdLCAvLyAwIFx1MzA5MiByZ2IoMCwgMCwgMCkgXHUzMDZCXHJcbiAgICAgIFswLCAwLCAwLCAwXSwgLy8gMSBcdTMwOTIgcmdiKDI1NSwgMjU1LCAyNTUpIFx1MzA2QlxyXG4gIF0pOyAgICAgICAgICAgICAgIC8vIFx1MzA1RFx1MzA2RVx1OTU5M1x1MzA5Mlx1N0REQVx1NUY2Mlx1ODhEQ1x1OTU5M1x1MzA1OVx1MzA4Qlx1MzBCOVx1MzBCMVx1MzBGQ1x1MzBFQlx1MzA5Mlx1NEY1Q1x1NjIxMFxyXG4gIFxyXG4gIGxldCBjb2xvciA9IHNjYWxlLmNvbG9yKHgpOyAvLyBcdTY1NzBcdTUwMjRcdTMwOTJcdTgyNzJcdTMwNkJcdTU5MDlcdTYzREJcclxuICBcclxuICBnLmZpbGxTdHlsZSA9IGNvbG9yOyAgICAgICAgLy8gXHUzMDVEXHUzMDZFXHUzMDdFXHUzMDdFIHN0eWxlIFx1MzA2Qlx1NEVFM1x1NTE2NVx1NTNFRlx1ODBGRFxyXG4gIFxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBDb2xvclNjYWxlIHtcclxuXHJcbiAgY29uc3RydWN0b3IobWFwcGluZykge1xyXG4gICAgbWFwcGluZyB8fD0gWyAvLyBncmF5c2NhbGVcclxuICAgICAgWzAsICAgMCwgICAwLCAgIDBdLFxyXG4gICAgICBbMSwgMjU1LCAyNTUsIDI1NV1cclxuICAgIF07XHJcbiAgICB0aGlzLm1hcHBpbmcgPSBtYXBwaW5nO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJnYjJzdHIociwgZywgYikge1xyXG4gICAgW3IsIGcsIGJdID0gW3IsIGcsIGJdLm1hcCh4ID0+IE1hdGgucm91bmQoeCkpO1xyXG4gICAgY29uc3QgaGV4ID0gKHgpID0+IChcIjBcIit4LnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xyXG4gICAgcmV0dXJuIFwiI1wiK2hleChyKStoZXgoZykraGV4KGIpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGhzbDJyZ2IoaCwgcywgbCkge1xyXG4gICAgY29uc3QgYyA9ICgxLSBNYXRoLmFicygyICogbCAtIDEpKSAqIHM7XHJcbiAgICBjb25zdCB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKGggKiA2KSAlIDIgLSAxKSk7XHJcbiAgICBjb25zdCBtID0gbCAtIGMvMjtcclxuICAgIGxldCByLCBnLCBiO1xyXG4gICAgaWYoaCAqIDYgPCAxKSB7XHJcbiAgICAgIHIgPSBjOyBcclxuICAgICAgZyA9IHg7IFxyXG4gICAgICBiID0gMDtcclxuICAgIH0gZWxzZSBcclxuICAgIGlmKGggKiA2IDwgMikge1xyXG4gICAgICByID0geDsgXHJcbiAgICAgIGcgPSBjOyBcclxuICAgICAgYiA9IDA7XHJcbiAgICB9IGVsc2VcclxuICAgIGlmKGggKiA2IDwgMykge1xyXG4gICAgICByID0gMDtcclxuICAgICAgZyA9IGM7IFxyXG4gICAgICBiID0geDsgXHJcbiAgICB9IGVsc2VcclxuICAgIGlmKGggKiA2IDwgNCkge1xyXG4gICAgICByID0gMDtcclxuICAgICAgZyA9IHg7IFxyXG4gICAgICBiID0gYzsgXHJcbiAgICB9IGVsc2VcclxuICAgIGlmKGggKiA2IDwgNSkge1xyXG4gICAgICByID0geDsgXHJcbiAgICAgIGcgPSAwO1xyXG4gICAgICBiID0gYzsgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByID0gYzsgXHJcbiAgICAgIGcgPSAwO1xyXG4gICAgICBiID0geDsgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gWyhyK20pICogMjU1LCAoZyttKSAqIDI1NSwgKGIrbSkgKiAyNTVdO1xyXG4gIH1cclxuXHJcbiAgY29sb3IoeCkge1xyXG4gICAgY29uc3Qge21hcHBpbmd9ID0gdGhpcztcclxuICAgIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB4KSk7XHJcbiAgICBsZXQgaSA9IG1hcHBpbmcuZmluZEluZGV4KGVudHJ5ID0+IHggPD0gZW50cnlbMF0pO1xyXG4gICAgaWYoaT09MCkge1xyXG4gICAgICByZXR1cm4gQ29sb3JTY2FsZS5yZ2Iyc3RyKG1hcHBpbmdbMF1bMV0sIG1hcHBpbmdbMF1bMl0sIG1hcHBpbmdbMF1bM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1N0REQVx1NUY2Mlx1ODhEQ1x1OTU5M1xyXG4gICAgbGV0IHIgPSAoeCAtIG1hcHBpbmdbaS0xXVswXSkgLyAobWFwcGluZ1tpXVswXSAtIG1hcHBpbmdbaS0xXVswXSk7XHJcbiAgICByZXR1cm4gQ29sb3JTY2FsZS5yZ2Iyc3RyKFxyXG4gICAgICBtYXBwaW5nW2ktMV1bMV0gKiAoMS1yKSArIG1hcHBpbmdbaV1bMV0gKiByLCBcclxuICAgICAgbWFwcGluZ1tpLTFdWzJdICogKDEtcikgKyBtYXBwaW5nW2ldWzJdICogciwgXHJcbiAgICAgIG1hcHBpbmdbaS0xXVszXSAqICgxLXIpICsgbWFwcGluZ1tpXVszXSAqIHJcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vLyBcdTMwQUJcdTMwRTlcdTMwRkNcdTMwQjlcdTMwQjFcdTMwRkNcdTMwRUJcdTVCOUFcdTdGQTlcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbG9yU2NhbGVMaXN0ID0gW1xyXG4gIG5ldyBDb2xvclNjYWxlKFsgIC8vIHJhaW5ib3dcclxuICAgIFswLzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYigwLzYsIDEsIDAuNSldLFxyXG4gICAgWzEvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDEvNiwgMSwgMC41KV0sXHJcbiAgICBbMi82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoMi82LCAxLCAwLjUpXSxcclxuICAgIFszLzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYigzLzYsIDEsIDAuNSldLFxyXG4gICAgWzQvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDQvNiwgMSwgMC41KV0sXHJcbiAgICBbNS82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoNS82LCAxLCAwLjUpXSxcclxuICAgIFs2LzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYig2LzYsIDEsIDAuNSldLFxyXG4gIF0pLFxyXG4gIG5ldyBDb2xvclNjYWxlKFsgIC8vIGhlYXRcclxuICAgIFswLzQsICAgMCwgMjU1LCAyNTUgXSxcclxuICAgIFsxLzQsICAgMCwgICAwLCAxOTIgXSxcclxuICAgIFsyLzQsICAgMCwgICAwLCAgIDAgXSxcclxuICAgIFszLzQsIDE5MiwgICAwLCAgIDAgXSxcclxuICAgIFs0LzQsIDI1NSwgMjU1LCAgIDAgXSxcclxuICBdKSxcclxuICBuZXcgQ29sb3JTY2FsZShbICAvLyBoZWF0MlxyXG4gICAgWzAvNCwgICAwLCAyNTUsIDI1NSBdLFxyXG4gICAgWzEvNCwgICAwLCAgIDAsIDE5MiBdLFxyXG4gICAgWzIvNCwgMjU1LCAyNTUsIDI1NSBdLFxyXG4gICAgWzMvNCwgMTkyLCAgIDAsICAgMCBdLFxyXG4gICAgWzQvNCwgMjU1LCAyNTUsICAgMCBdLFxyXG4gIF0pLFxyXG4gIG5ldyBDb2xvclNjYWxlKFsgIC8vIHJhaW5ib3cgbGlnaHRcclxuICAgIFswLzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYigwLzYsIDEsIDAuMyldLFxyXG4gICAgWzEvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDEvNiwgMSwgMC4zKV0sXHJcbiAgICBbMi82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoMi82LCAxLCAwLjMpXSxcclxuICAgIFszLzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYigzLzYsIDEsIDAuMyldLFxyXG4gICAgWzQvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDQvNiwgMSwgMC4zKV0sXHJcbiAgICBbNS82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoNS82LCAxLCAwLjMpXSxcclxuICAgIFs2LzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYig2LzYsIDEsIDAuMyldLFxyXG4gIF0pLFxyXG4gIG5ldyBDb2xvclNjYWxlKFsgIC8vIHJhaW5ib3cgZGFya1xyXG4gICAgWzAvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDAvNiwgMSwgMC43KV0sXHJcbiAgICBbMS82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoMS82LCAxLCAwLjcpXSxcclxuICAgIFsyLzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYigyLzYsIDEsIDAuNyldLFxyXG4gICAgWzMvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDMvNiwgMSwgMC43KV0sXHJcbiAgICBbNC82LCAuLi5Db2xvclNjYWxlLmhzbDJyZ2IoNC82LCAxLCAwLjcpXSxcclxuICAgIFs1LzYsIC4uLkNvbG9yU2NhbGUuaHNsMnJnYig1LzYsIDEsIDAuNyldLFxyXG4gICAgWzYvNiwgLi4uQ29sb3JTY2FsZS5oc2wycmdiKDYvNiwgMSwgMC43KV0sXHJcbiAgXSksXHJcbl07XHJcbiIsICIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vLyBcdTdDOTJcdTVCNTBcdTdBMkVcdTc1MUZcdTYyMTBcdTc4QkFcdTczODdcdTMwOTJcdTdCQTFcdTc0MDZcdTMwNTlcdTMwOEJcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuZXhwb3J0IGNsYXNzIFBMU3BlY2llc0Rpc3RyaWJ1dGlvbiB7XHJcblxyXG4gIC8vIFx1NzhCQVx1NzM4N1x1NTIwNlx1NUUwM1x1MzA5Mlx1NjVFMlx1NUI1OFx1MzA2RVx1N0M5Mlx1NUI1MFx1NjU3MFx1MzA0Mlx1MzA4Qlx1MzA0NFx1MzA2Rlx1NEU3MVx1NjU3MFx1MzA0Qlx1MzA4OVx1NEY1Q1x1NjIxMFxyXG4gIGNvbnN0cnVjdG9yKG5zcGVjaWVzLCBwYXJ0aWNsZXNfb3JfcmFuZCkge1xyXG4gICAgdGhpcy5kaXN0cmlidXRpb24gPSBBcnJheShuc3BlY2llcyk7XHJcbiAgICBpZihwYXJ0aWNsZXNfb3JfcmFuZC5jb25zdHJ1Y3Rvci5uYW1lID09ICdQTFBhcnRpY2xlcycpIHtcclxuICAgICAgLy8gXHU3QzkyXHU1QjUwXHU3QTJFXHU2NTcwXHUzMDkyXHU2NTcwXHUzMDQ4XHUzMDhCXHJcbiAgICAgIGxldCBwYXJ0aWNsZXMgPSBwYXJ0aWNsZXNfb3JfcmFuZDtcclxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlcy5uOyBpKyspIHtcclxuICAgICAgICBsZXQgc3AgPSBwYXJ0aWNsZXMuZ2V0KGkpWzBdO1xyXG4gICAgICAgIHRoaXMuZGlzdHJpYnV0aW9uW3NwXSA9IDEgKyAodGhpcy5kaXN0cmlidXRpb25bc3BdIHx8IDApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBcdTdDOTJcdTVCNTBcdTdBMkVcdTMwNkJcdTUwNEZcdTMwOEFcdTMwOTJcdTYzMDFcdTMwNUZcdTMwNUJcdTMwOEJcdTMwNUZcdTMwODFcdTMwNkVcdTc4QkFcdTczODdcdTUyMDZcdTVFMDNcdTMwOTJcdTRGNUNcdTMwOEJcclxuICAgICAgbGV0IHJhbmQgPSBwYXJ0aWNsZXNfb3JfcmFuZDtcclxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG5zcGVjaWVzOyBpKyspIHtcclxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgNTsgaisrKSB7ICAvLyBcdTRFMDBcdTY5RDhcdTRFNzFcdTY1NzBcdTMwNkVcdUZGMTVcdTU2REVcdTVFNzNcdTU3NDdcclxuICAgICAgICAgIHRoaXMuZGlzdHJpYnV0aW9uW2ldID0gcmFuZC5uZXh0KCkgKyAodGhpcy5kaXN0cmlidXRpb25baV0gfHwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuICB9XHJcbiAgXHJcbiAgcmF0aW8oc3ApIHtcclxuICAgIHJldHVybiB0aGlzLmRpc3RyaWJ1dGlvbltzcF0gLyB0aGlzLnN1bTtcclxuICB9XHJcblxyXG4gIC8vIGRpc3RyaWJ1dGlvbiBcdTMwNEJcdTMwODkgYWNjdW11bGF0aW9uIFx1MzA5Mlx1NEY1Q1x1MzA4QlxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuc3VtID0gMDtcclxuICAgIHRoaXMuYWNjdW11bGF0aW9uID0gdGhpcy5kaXN0cmlidXRpb24ubWFwKGQgPT4gdGhpcy5zdW0gKz0gZCkubWFwKGQgPT4gZC90aGlzLnN1bSk7XHJcbiAgfVxyXG5cclxuICAvLyBbMCwgMSkgXHUzMDZFXHU0RTAwXHU2OUQ4XHU0RTcxXHU2NTcwIHIgXHUzMDkyXHU3QzkyXHU1QjUwXHU3QTJFXHUzMDZCXHU1OTA5XHU2M0RCXHUzMDU5XHUzMDhCXHJcbiAgc3BlY2llcyhyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY2N1bXVsYXRpb24uZmluZEluZGV4KChlbGVtKSA9PiByIDw9IGVsZW0pO1xyXG4gIH1cclxufVxyXG4iLCAiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLy8gXHU3NkY4XHU0RTkyXHU0RjVDXHU3NTI4XHUzMERFXHUzMEM4XHUzMEVBXHUzMEFGXHUzMEI5XHJcbi8vXHJcbi8vIFx1NjU3NFx1NjU3MFx1NkYxNFx1N0I5N1x1MzA0Q1x1NTNFRlx1ODBGRFx1MzA2QVx1MzA4OFx1MzA0Nlx1MzA2Qlx1NEU4Qlx1NTI0RFx1MzA2Qlx1MzBCOVx1MzBCMVx1MzBGQ1x1MzBFQlx1MzA1N1x1MzA1Rlx1NTAyNFx1MzA5Mlx1NEY1Q1x1MzA2M1x1MzA2Nlx1MzA0QVx1MzA0RlxyXG4vL1xyXG4vLyAgICB0eXBlZGVmIHN0cnVjdCB7XHJcbi8vICAgICAgICBpbnQzMl90IGEsIGIsIGM7XHJcbi8vICAgIH0gaW50ZXJhY3RfdDtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuZXhwb3J0IGNsYXNzIFBMSW50ZXJhY3Rpb25NYXRyaXgge1xyXG5cclxuICBjb25zdHJ1Y3Rvcih3b3JsZCkge1xyXG4gICAgdGhpcy51cGRhdGUod29ybGQpO1xyXG4gIH1cclxuICBcclxuICB1cGRhdGUod29ybGQpIHtcclxuICAgIHRoaXMud29ybGQgPSB3b3JsZDtcclxuICAgIHRoaXMubWF0cml4ID0gXHJcbiAgICAgIFsuLi5BcnJheSh3b3JsZC5uc3BlY2llcyldLm1hcCgoKSA9PlxyXG4gICAgICAgIFsuLi5BcnJheSh3b3JsZC5uc3BlY2llcyldLm1hcCgoKT0+IFxyXG4gICAgICAgICAgWzAsIDBdICkpXHJcblxyXG4gICAgLy8gXHVGRjEzXHUzMDY0XHUzMDZFXHU1MDI0XHUzMDkyIFx1N0M5Mlx1NUI1MFx1N0EyRVx1NjU3MCB4IFx1N0M5Mlx1NUI1MFx1N0EyRVx1NjU3MCB4IDIgXHU1MDBCIFx1NjgzQ1x1N0QwRFx1MzA1OVx1MzA4QlxyXG4gICAgbGV0IGxlbiA9IDMgKiB3b3JsZC5uc3BlY2llcyAqIHdvcmxkLm5zcGVjaWVzICogMjtcclxuICAgIGlmKCF0aGlzLm1lbSkge1xyXG4gICAgICB0aGlzLm1lbSA9IHdhc20uaTMyLmFsbG9jKGxlbiAqIDQpO1xyXG4gICAgfSBlbHNlIFxyXG4gICAgaWYodGhpcy5tZW0ubGVuZ3RoIDwgbGVuKXtcclxuICAgICAgbGV0IHNpemUgPSBNYXRoLm1heCh0aGlzLm1lbS5sZW5ndGggKiA0LCBsZW4pO1xyXG4gICAgICB0aGlzLm1lbS5mcmVlO1xyXG4gICAgICB0aGlzLm1lbSA9IHdhc20uaTMyLmFsbG9jKHNpemUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gXHU2MjRCXHU1MkQ1XHUzMDY3XHU1RjhDXHU1OUNCXHU2NzJCXHUzMDkyXHUzMDU5XHUzMDhCXHU1ODM0XHU1NDA4XHUzMDZCXHU1NDdDXHUzMDc2XHU5NUEyXHU2NTcwXHJcbiAgZGVzdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWVtLmZyZWU7XHJcbiAgfVxyXG5cclxuICBzZXQoZnVuY19vcl9pLCBqLCBhLCBiKSB7XHJcbiAgICBpZihmdW5jX29yX2kgJiYgKHR5cGVvZiBmdW5jX29yX2kgPT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIGNvbnN0IGZ1bmMgPSBmdW5jX29yX2k7XHJcblxyXG4gICAgICAvLyBmdW5jIFx1MzA5Mlx1NEY3Rlx1MzA2M1x1MzA2Nlx1NEUwMFx1NkMxN1x1MzA2Qlx1OEEyRFx1NUI5QVx1MzA1OVx1MzA4QlxyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5uc3BlY2llczsgaSsrKVxyXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLndvcmxkLm5zcGVjaWVzOyBqKyspXHJcbiAgICAgICAgICB0aGlzLnNldChpLCBqLCAuLi5mdW5jKGksIGopKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpID0gZnVuY19vcl9pO1xyXG4gICAgICB0aGlzLm1hdHJpeFtpXVtqXSA9IFthLCBiXTtcclxuICAgICAgdGhpcy5jb252ZXJ0KGksIGopOyAvLyB0aGlzLm1lbSBcdTMwOTJcdTMwQTJcdTMwQzNcdTMwRDdcdTMwQzdcdTMwRkNcdTMwQzhcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHJldHVybiBbYSwgYl1cclxuICBnZXQoaSwgaikge1xyXG4gICAgcmV0dXJuIHRoaXMubWF0cml4W2ldW2pdO1xyXG4gIH1cclxuXHJcbiAgY29udmVydChpLCBqKSB7XHJcbiAgICBjb25zdCBbYSwgYl0gPSB0aGlzLm1hdHJpeFtpXVtqXTtcclxuICAgIFxyXG4gICAgLy8gXHU2NTc0XHU2NTcwXHU2RjE0XHU3Qjk3XHU3NTI4XHUzMDZCXHU0RThCXHU1MjREXHUzMEI5XHUzMEIxXHUzMEZDXHUzMEVCXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXHJcbiAgICBjb25zdCB3b3JsZCA9IHRoaXMud29ybGQ7XHJcbiAgICBjb25zdCBuID0gd29ybGQubnNwZWNpZXM7XHJcbiAgICBsZXQgYWEgPSBhIC8gIHdvcmxkLnJ0aDE7XHJcbiAgICBsZXQgYmIgPSBiIC8gKHdvcmxkLnJ0aDIgLSB3b3JsZC5ydGgxKTtcclxuICAgIGxldCBjYyA9IGIgLyAod29ybGQucm1heCAtIHdvcmxkLnJ0aDIpO1xyXG4gICAgYWEgKj0gd29ybGQuc3RlcCAqIHdvcmxkLnNjYWxlICogMioqMzI7XHJcbiAgICBiYiAqPSB3b3JsZC5zdGVwICogd29ybGQuc2NhbGUgKiAyKiozMjtcclxuICAgIGNjICo9IHdvcmxkLnN0ZXAgKiB3b3JsZC5zY2FsZSAqIDIqKjMyO1xyXG4gICAgdGhpcy5tZW1bMyAqIChpICogbiAqIDIgKyBqKSArIDBdID0gYWE7ICAgICAgIC8vIGZvcndhcmRcclxuICAgIHRoaXMubWVtWzMgKiAoaSAqIG4gKiAyICsgaikgKyAxXSA9IGJiOyAgICAgICAvLyBmb3J3YXJkXHJcbiAgICB0aGlzLm1lbVszICogKGkgKiBuICogMiArIGopICsgMl0gPSBjYzsgICAgICAgLy8gZm9yd2FyZFxyXG4gICAgdGhpcy5tZW1bMyAqIChqICogbiAqIDIgKyBpICsgbikgKyAwXSA9IGFhOyAgIC8vIGJhY2t3b3JkXHJcbiAgICB0aGlzLm1lbVszICogKGogKiBuICogMiArIGkgKyBuKSArIDFdID0gYmI7ICAgLy8gYmFja3dvcmRcclxuICAgIHRoaXMubWVtWzMgKiAoaiAqIG4gKiAyICsgaSArIG4pICsgMl0gPSBjYzsgICAvLyBiYWNrd29yZFxyXG4gIH1cclxuICBcclxuICBjb252ZXJ0QWxsKCkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQubnNwZWNpZXM7IGkrKylcclxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMud29ybGQubnNwZWNpZXM7IGorKylcclxuICAgICAgICB0aGlzLmNvbnZlcnQoaSwgaik7XHJcbiAgfVxyXG5cclxuICBjb3B5RnJvbShhbm90aGVyKSB7XHJcbiAgICBpZih0aGlzLndvcmxkLm5zcGVjaWVzICE9IGFub3RoZXIud29ybGQubnNwZWNpZXMpIHJldHVybjtcclxuICAgIFxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQubnNwZWNpZXM7IGkrKylcclxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMud29ybGQubnNwZWNpZXM7IGorKylcclxuICAgICAgICB0aGlzLnNldChpLCBqLCAuLi5hbm90aGVyLmdldChpLCBqKSk7XHJcbiAgfVxyXG59XHJcbiIsICIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHU3QzkyXHU1QjUwXHUzMDZFXHU5MTREXHU1MjE3ICsgXHUzMEVGXHUzMEZDXHUzMEFEXHUzMEYzXHUzMEIwXHUzMEUxXHUzMEUyXHUzMEVBIFx1MzA5Mlx1N0JBMVx1NzQwNlxyXG5cclxuc3RydWN0IHtcclxuICAgIGludDMyX3Qgc3BlY2llcywgZHVtbXk7XHJcbiAgICBpbnQzMl90IHgsIHk7XHJcbiAgICBpbnQzMl90IHZ4LCB2eTtcclxufSBwYXJ0aWNsZXNbbl07ICAgICAgIC8vIGludDMyX3QgKiA2ICAqIG5wYXJ0aWNsZXNcclxuXHJcbnR5cGVkZWYgc3RydWN0IHtcclxuICAgIHBhcnRpY2xlX3QgKnA7XHJcbiAgICBpbnQxNl90IHg7XHJcbiAgICBpbnQxNl90IHJvdztcclxufSBpbmRleFtuXTtcclxuXHJcbmluZGV4X3QgZ3JpZFtucm93ICogbmNvbF1cclxuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY2xhc3MgUExQYXJ0aWNsZXMge1xyXG5cclxuICBjb25zdHJ1Y3RvcihucGFydGljbGVzKSB7XHJcbiAgICB0aGlzLnVwZGF0ZShucGFydGljbGVzKTtcclxuICB9XHJcbiAgXHJcbiAgdXBkYXRlKG5wYXJ0aWNsZXMpIHsgXHJcbiAgICB0aGlzLm4gPSBNYXRoLmZsb29yKG5wYXJ0aWNsZXMpO1xyXG4gICAgXHJcbiAgICAvLyBwYXJ0aWNsZXMgOiA2IHggbiBcdTMwNENcdTdDOTJcdTVCNTBcdTgxRUFcdThFQUJcclxuICAgIC8vIGluZGV4IDogMiB4IG4gXHUzMDRDXHUzMEJEXHUzMEZDXHUzMEM4XHU3NTI4XHUzMDZFXHUzMEVGXHUzMEZDXHUzMEFEXHUzMEYzXHUzMEIwXHUzMEUxXHUzMEUyXHUzMEVBXHJcbiAgICBsZXQgbGVuID0gKDYgKyAyKSAqIG5wYXJ0aWNsZXMgKyAyO1xyXG4gICAgaWYoIXRoaXMubWVtKSB7XHJcbiAgICAgIHRoaXMubWVtICA9IHdhc20uaTMyLmFsbG9jKGxlbiAqIDQpO1xyXG4gICAgICB0aGlzLm1lbVZlcnRpY2VzID0gbmV3IEludDE2QXJyYXkoNSAqIG5wYXJ0aWNsZXMgKiA0ICogNCk7XHJcbiAgICB9IGVsc2UgXHJcbiAgICBpZih0aGlzLm1lbS5sZW5ndGggPCBsZW4pIHtcclxuICAgICAgbGV0IHNpemUgPSBNYXRoLm1heCh0aGlzLm1lbS5sZW5ndGggKiA0LCBsZW4pO1xyXG4gICAgICB0aGlzLm1lbS5mcmVlO1xyXG4gICAgICB0aGlzLm1lbSA9IHdhc20uaTMyLmFsbG9jKHNpemUpO1xyXG4gICAgICB0aGlzLm1lbVZlcnRpY2VzID0gbmV3IEludDE2QXJyYXkoNSAqIHNpemUgLyA4ICogNCAqIDQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWVtLmZyZWU7XHJcbiAgfVxyXG5cclxuICAvLyB4LCB5IFx1MzA2RiBbLTAuNSwgMC41KSBcdTMwNkVcdTdCQzRcdTU2RjJcclxuICBzZXQoaSwgc3BlY2llcywgeCwgeSwgdngsIHZ5KSB7XHJcbiAgICBpZihpIDwgMCB8fCB0aGlzLm4gPD0gaSkgcmV0dXJuOyAgLy8gXHU3QkM0XHU1NkYyXHU1OTE2XHJcbiAgICBcclxuICAgIHRoaXMubWVtWzYgKiBpICsgMF0gPSBzcGVjaWVzO1xyXG4gICAgdGhpcy5tZW1bNiAqIGkgKyAyXSA9IHggICogMioqMzI7ICAvLyBcdTY1NzRcdTY1NzBcdTZGMTRcdTdCOTdcdTc1MjhcdTMwNkJcdTMwQjlcdTMwQjFcdTMwRkNcdTMwRUJcdTMwNTlcdTMwOEJcclxuICAgIHRoaXMubWVtWzYgKiBpICsgM10gPSB5ICAqIDIqKjMyO1xyXG4gICAgdGhpcy5tZW1bNiAqIGkgKyA0XSA9IHZ4ICogMioqMzI7XHJcbiAgICB0aGlzLm1lbVs2ICogaSArIDVdID0gdnkgKiAyKiozMjtcclxuICB9XHJcblxyXG4gIC8vIHgsIHkgXHUzMDZGIFstMC41LCAwLjUpIFx1MzA2RVx1N0JDNFx1NTZGMlxyXG4gIC8vIHJldHVybnMgW3NwZWNpZXMsIHgsIHksIHZ4LCB2eV1cclxuICBnZXQoaSkge1xyXG4gICAgaWYoaSA8IDAgfHwgdGhpcy5uIDw9IGkpIHJldHVybjtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHRoaXMubWVtWzYgKiBpICsgMF0sXHJcbiAgICAgIHRoaXMubWVtWzYgKiBpICsgMl0gLyAyKiozMiwgICAgIC8vIFx1NjU3NFx1NjU3MFx1NkYxNFx1N0I5N1x1NzUyOFx1MzBCOVx1MzBCMVx1MzBGQ1x1MzBFQlx1MzA5Mlx1NjIzQlx1MzA1OVxyXG4gICAgICB0aGlzLm1lbVs2ICogaSArIDNdIC8gMioqMzIsXHJcbiAgICAgIHRoaXMubWVtWzYgKiBpICsgNF0gLyAyKiozMixcclxuICAgICAgdGhpcy5tZW1bNiAqIGkgKyA1XSAvIDIqKjMyXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLy8geCwgeSBcdTMwNkYgWy0wLjUsIDAuNSkgXHUzMDZFXHU3QkM0XHU1NkYyXHJcbiAgLy8gY2FsbHMgZnVuYyhzcGVjaWVzLCB4LCB5KVxyXG4gIGZvckVhY2goZnVuYykge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubjsgaSsrKVxyXG4gICAgICBmdW5jKFxyXG4gICAgICAgIHRoaXMubWVtWzYgKiBpICsgMF0sICAgICAgICAgIC8vIHNwZWNpZXNcclxuICAgICAgICB0aGlzLm1lbVs2ICogaSArIDJdIC8gMioqMzIsICAvLyB4XHJcbiAgICAgICAgdGhpcy5tZW1bNiAqIGkgKyAzXSAvIDIqKjMyICAgLy8geVxyXG4gICAgICApO1xyXG4gIH1cclxuICBcclxuICAvLyBcdTRFMDBcdTU0NjhcdTU2REVcdTMwNjNcdTMwNjZcdTUzQ0RcdTVCRkVcdTUwNzRcdTMwNkJcdTczRkVcdTMwOENcdTMwOEJcdTcwQjlcdTMwNkZcdTg5MDdcdTY1NzBcdTc2N0JcdTkzMzJcdTMwNTlcdTMwOEJcclxuICB2ZXJ0aWNlcyhwYWxldHRlLCBwc2l6ZSkge1xyXG4gICAgY29uc3QgdiA9IHRoaXMubWVtVmVydGljZXM7XHJcbiAgICBjb25zdCBuID0gdGhpcy5uO1xyXG4gICAgY29uc3QgbWVtID0gdGhpcy5tZW07XHJcbiAgICBwc2l6ZSAqPSA2NTUzNjtcclxuICAgIFxyXG4gICAgbGV0IGogPSAwO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICBjb25zdCBweCA9IG1lbVs2ICogaSArIDJdID4+PiAxNjtcclxuICAgICAgY29uc3QgcHkgPSBtZW1bNiAqIGkgKyAzXSA+Pj4gMTY7XHJcbiAgICAgIGNvbnN0IGMgID0gcGFsZXR0ZVttZW1bNiAqIGkgKyAwXV07XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCByZWdpc3RlcjIgPSAoX3B4LCBfcHkpID0+IHtcclxuICAgICAgICB2WzUgKiBqICAgIF0gPSAoICAgICAgKyBfcHgpIC8gMiAtIDMyNzY4LzI7XHJcbiAgICAgICAgdls1ICogaiArIDFdID0gKDY1NTM2IC0gX3B5KSAvIDIgLSAzMjc2OC8yO1xyXG4gICAgICAgIHZbNSAqIGogKyAyXSA9IGNbMF0gKiAxMjc7XHJcbiAgICAgICAgdls1ICogaiArIDNdID0gY1sxXSAqIDEyNztcclxuICAgICAgICB2WzUgKiBqICsgNF0gPSBjWzJdICogMTI3O1xyXG4gICAgICAgIGorKztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gXHU1ODgzXHU3NTRDXHU3RERBXHUzMDZCXHU4RkQxXHUzMDQ0XHU3MEI5XHUzMDkyXHU4OTA3XHU4OEZEXHUzMDU3XHUzMDZBXHUzMDRDXHUzMDg5XHU3NjdCXHU5MzMyXHUzMDU5XHUzMDhCXHJcbiAgICAgIFxyXG4gICAgICBjb25zdCByZWdpc3RlciA9IChfcHgsIF9weSkgPT4ge1xyXG4gICAgICAgIHJlZ2lzdGVyMihfcHgsIF9weSk7XHJcbiAgICAgICAgaWYoX3B5IDwgICAgICAgICBwc2l6ZSkgcmVnaXN0ZXIyKF9weCwgX3B5ICsgNjU1MzYpO1xyXG4gICAgICAgIGlmKF9weSA+IDY1NTM2IC0gcHNpemUpIHJlZ2lzdGVyMihfcHgsIF9weSAtIDY1NTM2KTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmVnaXN0ZXIocHgsIHB5KTtcclxuICAgICAgaWYocHggPCAgICAgICAgIHBzaXplKSByZWdpc3RlcihweCArIDY1NTM2LCBweSk7XHJcbiAgICAgIGlmKHB4ID4gNjU1MzYgLSBwc2l6ZSkgcmVnaXN0ZXIocHggLSA2NTUzNiwgcHkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt2LCBqXTtcclxuICB9XHJcblxyXG59XHJcbiIsICIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vLyBcdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcclxuLy8gICAgICB0eXBlZGVmIHN0cnVjdCB7XHJcbi8vICAgICAgICAgIGludDMyX3QgbnNwZWNpZXM7XHJcbi8vICAgICAgICAgIGludDMyX3QgbnBhcnRpY2xlcztcclxuLy8gICAgICAgICAgaW50MzJfdCBydGgxLCBydGgyLCBybWF4O1xyXG4vLyAgICAgICAgICBpbnQzMl90IHBlcnRlcmIsIGRlY2VsO1xyXG4vLyAgICAgICAgICBpbnQzMl90IHJvd19kaXY7XHJcbi8vICAgICAgfSB3b3JsZF90O1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgeyBQTEludGVyYWN0aW9uTWF0cml4IH0gZnJvbSAnLi9wbC1pbnRlcmFjdGlvbi1tYXRyaXguanMnXHJcbmltcG9ydCB7IFBMUGFydGljbGVzIH0gZnJvbSAnLi9wbC1wYXJ0aWNsZXMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgUGFydGljbGVMaWZlIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30sIHJhbmQpIHtcclxuICAgIHRoaXMudXBkYXRlKG9wdGlvbnMsIHJhbmQpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKG9wdGlvbnMsIHJhbmQgPSB0aGlzLnJhbmQpIHtcclxuXHJcbiAgICAvLyBcdTMwQzdcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzhcdTUwMjRcdTMwOTJcdTYzMDdcdTVCOUFcclxuICAgIHV0aWwuaW1wb3J0T3B0aW9ucyh0aGlzLCBvcHRpb25zLCB7XHJcbiAgICAgIG5zcGVjaWVzOiA2LFxyXG4gICAgICBubGF0dGljZTogMzAsXHJcbiAgICAgIHJ0aDE6IDAuMDUsXHJcbiAgICAgIHJ0aDI6IDAuMSxcclxuICAgICAgcm1heDogMC4yLFxyXG4gICAgICBwZXJ0ZXJiOiAwLjAwMSxcclxuICAgICAgZGVjZWw6IDAuNDk5LFxyXG4gICAgICBzY2FsZTogMS4wLFxyXG4gICAgICBzdGVwOiAxLjAsXHJcbiAgICAgIHJvd19kaXY6IDFcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmFuZCA9IHJhbmQ7XHJcbiAgICB0aGlzLm5wYXJ0aWNsZXMgPSB0aGlzLm5sYXR0aWNlICogdGhpcy5ubGF0dGljZTtcclxuXHJcbiAgICBpZighdGhpcy5pbnRlcmFjdGlvbikge1xyXG4gICAgICB0aGlzLmludGVyYWN0aW9uID0gbmV3IFBMSW50ZXJhY3Rpb25NYXRyaXgodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmludGVyYWN0aW9uLnVwZGF0ZSh0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYoIXRoaXMucGFydGljbGVzKSB7XHJcbiAgICAgIHRoaXMucGFydGljbGVzID0gbmV3IFBMUGFydGljbGVzKHRoaXMubnBhcnRpY2xlcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhcnRpY2xlcy51cGRhdGUodGhpcy5ucGFydGljbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBncmlkIDogbmNvbCB4IG5yb3cgKyAxXHJcbiAgICAvLyB4bWF4IDogcm93X2RpdiAvIDJcclxuICAgIGxldCBuY29sID0gTWF0aC5mbG9vcigyKiozMiAvIChNYXRoLnJvdW5kKHRoaXMucm1heC90aGlzLnNjYWxlICogMioqMzIpKSk7XHJcbiAgICBpZihuY29sIDw9IDIpIG5jb2wgPSAxO1xyXG4gICAgbGV0IG5yb3cgPSBuY29sICogdGhpcy5yb3dfZGl2O1xyXG5cclxuICAgIC8vIEMrKyBcdTc1MjhcdTMwNkVcdTY5Q0JcdTkwMjBcdTRGNTMgKyBncmlkIFx1MzBFRlx1MzBGQ1x1MzBBRFx1MzBGM1x1MzBCMFx1MzBFMVx1MzBFMlx1MzBFQVxyXG4gICAgbGV0IGxlbiA9IDggKyAobmNvbCAqIG5yb3cgKyAxICsgdGhpcy5yb3dfZGl2ICsgMSkgKiA0O1xyXG4gICAgaWYgKCF0aGlzLm1lbSkge1xyXG4gICAgICB0aGlzLm1lbSA9IHdhc20uaTMyLmFsbG9jKGxlbiAqIDQpO1xyXG4gICAgfSBlbHNlIFxyXG4gICAgaWYodGhpcy5tZW0ubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgIGxldCBzaXplID0gTWF0aC5tYXgodGhpcy5tZW0ubGVuZ3RoICogNCwgbGVuKTtcclxuICAgICAgdGhpcy5tZW0uZnJlZTtcclxuICAgICAgdGhpcy5tZW0gPSB3YXNtLmkzMi5hbGxvYyhzaXplKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5tZW1bMF0gPSB0aGlzLm5zcGVjaWVzO1xyXG4gICAgdGhpcy5tZW1bMV0gPSB0aGlzLm5wYXJ0aWNsZXM7XHJcbiAgICB0aGlzLm1lbVsyXSA9IHRoaXMucnRoMSAgICAvIHRoaXMuc2NhbGUgKiAyKiozMjsgLy8gXHU2NTc0XHU2NTcwXHU2RjE0XHU3Qjk3XHU3NTI4XHUzMDZCXHUzMEI5XHUzMEIxXHUzMEZDXHUzMEVCXHJcbiAgICB0aGlzLm1lbVszXSA9IHRoaXMucnRoMiAgICAvIHRoaXMuc2NhbGUgKiAyKiozMjtcclxuICAgIHRoaXMubWVtWzRdID0gdGhpcy5ybWF4ICAgIC8gdGhpcy5zY2FsZSAqIDIqKjMyO1xyXG4gICAgdGhpcy5tZW1bNV0gPSB0aGlzLnBlcnRlcmIgLyB0aGlzLnNjYWxlICogMioqMzI7XHJcbiAgICB0aGlzLm1lbVs2XSA9IHRoaXMuZGVjZWwgICAgICAgICAgICAgICAgKiAyKiozMjtcclxuICAgIHRoaXMubWVtWzddID0gdGhpcy5yb3dfZGl2O1xyXG4gIH1cclxuXHJcbiAgZGVzdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWVtLmZyZWU7XHJcbiAgICB1dGlsLmRlc3RydWN0KHRoaXMucmFuZCk7XHJcbiAgICB1dGlsLmRlc3RydWN0KHRoaXMuaW50ZXJhY3Rpb24pO1xyXG4gICAgdXRpbC5kZXN0cnVjdCh0aGlzLnBhcnRpY2xlcyk7XHJcbiAgfVxyXG5cclxuICAvLyBcdTdDOTJcdTVCNTBcdTkxNERcdTdGNkVcdTMwNkVcdTUyMURcdTY3MUZcdThBMkRcdTVCOUFcclxuICBzZXR1cFBhcnRpY2xlcyhmdW5jKSB7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ubGF0dGljZTsgaSsrKSB7XHJcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLm5sYXR0aWNlOyBqKyspIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zZXQoaSAqIHRoaXMubmxhdHRpY2UgKyBqLCAuLi5mdW5jKGksIGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAvLyBcdTdDOTJcdTVCNTBcdTU0MENcdTU4RUJcdTMwNkVcdTc2RjhcdTRFOTJcdTRGNUNcdTc1MjhcdTMwOTJcdThBMDhcdTdCOTdcdTMwNTdcdTMwNjYgdngsIHZ5IFx1MzA5Mlx1NjZGNFx1NjVCMFx1MzA1OVx1MzA4QlxyXG4gIGludGVyYWN0UGFydGljbGVzKCkge1xyXG4gICAgd2FzbS5pbnRlcmFjdFBhcnRpY2xlcyhcclxuICAgICAgdGhpcy5tZW0ucHRyLCB0aGlzLmludGVyYWN0aW9uLm1lbS5wdHIsIHRoaXMucGFydGljbGVzLm1lbS5wdHIpO1xyXG4gIH1cclxuICBcclxuICAvLyBcdTY1QTVcdTUyOUJcdTUyQjlcdTY3OUNcdTMwOTJcdTUzQ0FcdTMwN0NcdTMwNTlcclxuICByZXBlbFBhcnRpY2xlcyhyZXBlbFgsIHJlcGVsWSkge1xyXG4gICAgaWYoaXNOYU4ocmVwZWxYKSB8fCBpc05hTihyZXBlbFkpKSByZXR1cm47XHJcblxyXG4gICAgLy8gXHU1M0NEXHU3NjdBXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ucGFydGljbGVzOyBpKyspIHtcclxuICAgICAgbGV0IFtzcGVjaWVzLCB4LCB5LCB2eCwgdnldID0gdGhpcy5wYXJ0aWNsZXMuZ2V0KGkpO1xyXG4gICAgICBsZXQgZHggPSB4IC0gcmVwZWxYOyBkeCAtPSBNYXRoLnJvdW5kKGR4KTtcclxuICAgICAgbGV0IGR5ID0geSAtIHJlcGVsWTsgZHkgLT0gTWF0aC5yb3VuZChkeSk7XHJcbiAgICAgIGxldCBkID0gTWF0aC5oeXBvdChkeCwgZHkpO1xyXG4gICAgICBpZiggZCA8IDAuMiApIHtcclxuICAgICAgICBpZiggZCA8IDAuMSApIHtcclxuICAgICAgICAgIHZ4ICs9IDAuMDUgKiBkeCAvIGQ7XHJcbiAgICAgICAgICB2eSArPSAwLjA1ICogZHkgLyBkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2eCArPSAwLjA1ICogKGQtMC4xKSAqIGR4IC8gZDtcclxuICAgICAgICAgIHZ5ICs9IDAuMDUgKiAoZC0wLjEpICogZHkgLyBkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5zZXQoaSwgc3BlY2llcywgeCwgeSwgdngsIHZ5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gXHU3QzkyXHU1QjUwXHUzMDkyXHU1MkQ1XHUzMDRCXHUzMDU5XHJcbiAgbW92ZVBhcnRpY2xlcygpIHtcclxuICAgIHdhc20ubW92ZVBhcnRpY2xlcyhcclxuICAgICAgICB0aGlzLm1lbS5wdHIsIHRoaXMucmFuZC5tZW0ucHRyLCB0aGlzLnBhcnRpY2xlcy5tZW0ucHRyKTtcclxuICB9XHJcbn1cclxuIiwgIi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8vIFx1MzBCN1x1MzBGQ1x1MzBDOVx1NjMwN1x1NUI5QVx1NTNFRlx1ODBGRFx1MzA2QVx1NEU3MVx1NjU3MFx1NTY2OFxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4vKlxyXG4gIGltcG9ydCBYb3JTaGlmdDEyOCBmcm9tIFwieG9yc2hpZnQxMjguanNcIlxyXG5cclxuICBmdW5jdGlvbiB0ZXN0KHNlZWQpIHtcclxuICAgIHZhciByYW5kID0gbmV3IFhvclNoaWZ0MTI4KHNlZWQpXHJcbiAgICBjb25zb2xlLmxvZyhyYW5kLm5leHQoKSlcclxuICAgIGNvbnNvbGUubG9nKHJhbmQubmV4dCgpKVxyXG4gICAgY29uc29sZS5sb2cocmFuZC5uZXh0KCkpXHJcbiAgICBjb25zb2xlLmxvZyhyYW5kLm5leHQoKSlcclxuICB9XHJcblxyXG4gIHRlc3QoMTIzNDUpXHJcbiovXHJcblxyXG4vLyAxMjhiaXQgWG9yU2hpZnQgXHU0RTcxXHU2NTcwXHJcbi8vIGh0dHBzOi8vamEud2lraXBlZGlhLm9yZy93aWtpL1hvcnNoaWZ0IFx1MzA4OFx1MzA4QVxyXG5cclxuZXhwb3J0IGNsYXNzIFhvclNoaWZ0MTI4IHtcclxuICBjb25zdHJ1Y3RvcihzZWVkID0gTWF0aC5yYW5kb20oKSAqIDIqKjUzLCBuID0gMTAwMCkge1xyXG4gICAgLy8gXHUzMEI3XHUzMEZDXHUzMEM5XHU1MDI0XHUzMDkyXHU4QTJEXHU1QjlBXHJcbiAgICB0aGlzLm1lbSA9IHdhc20uaTMyLmFsbG9jKDQpO1xyXG4gICAgdGhpcy5tZW1bM10gPSAoc2VlZCAvIDIqKjk2KSAmIDB4ZmZmZmZmZmY7XHJcbiAgICB0aGlzLm1lbVsyXSA9IChzZWVkIC8gMioqNjQpICYgMHhmZmZmZmZmZjtcclxuICAgIHRoaXMubWVtWzFdID0gKHNlZWQgLyAyKiozMikgJiAweGZmZmZmZmZmO1xyXG4gICAgdGhpcy5tZW1bMF0gPSAgc2VlZCAgICAgICAgICAmIDB4ZmZmZmZmZmY7XHJcblxyXG4gICAgLy8gXHU1OUNCXHUzMDgxXHUzMDZCXHU1OTFBXHU2NTcwXHU1NkRFXHU1NkRFXHUzMDU5XHUzMDUzXHUzMDY4XHUzMDY3IHNlZWQgXHUzMDRDIDEyOGJpdCBcdTY3MkFcdTZFODBcdTMwNjdcdTMwNDJcdTMwOEJcdTVGNzFcdTk3RkZcdTMwOTJcdThFRkRcdTZFMUJcdTMwNTlcdTMwOEJcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gXHU2MjRCXHU1MkQ1XHUzMDY3XHU1RjhDXHU1OUNCXHU2NzJCXHUzMDkyXHUzMDU5XHUzMDhCXHU1ODM0XHU1NDA4XHUzMDZCXHU1NDdDXHUzMDc2XHU5NUEyXHU2NTcwXHJcbiAgZGVzdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWVtLmZyZWU7XHJcbiAgfVxyXG5cclxuICAvLyBcdTZCMjFcdTMwNkVcdTRFNzFcdTY1NzBcdTUwMjRcdTMwOTJcdTVGOTdcdTMwOEJcclxuICBuZXh0KCkge1xyXG4gICAgcmV0dXJuIHdhc20uWG9yU2hpZnQxMjhOZXh0KHRoaXMubWVtLnB0cik7XHJcbiAgfVxyXG59XHJcbiIsICJ2YXIgdDEgPSB7XG4gIGNzczogbnVsbCxcbiAgZXhwb3J0czoge1xuICAgIHNldElubmVySFRNTCgpIHtcbiAgICAgIHRoaXMucm9vdC5pbm5lckhUTUwgPSB0aGlzLnByb3BzLmh0bWw7XG4gICAgfSxcbiAgICBvbk1vdW50ZWQoKSB7XG4gICAgICB0aGlzLnNldElubmVySFRNTCgpO1xuICAgIH0sXG4gICAgb25VcGRhdGVkKCkge1xuICAgICAgdGhpcy5zZXRJbm5lckhUTUwoKTtcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBudWxsLFxuICBuYW1lOiAncmF3J1xufTtcblxudmFyIHQyID0ge1xuICBjc3M6IGBwYXJ0aWNsZXMtZGlzcGxheSxbaXM9XCJwYXJ0aWNsZXMtZGlzcGxheVwiXXsgbGluZS1oZWlnaHQ6IDE7IH0gcGFydGljbGVzLWRpc3BsYXkgPiBkaXYsW2lzPVwicGFydGljbGVzLWRpc3BsYXlcIl0gPiBkaXZ7IG1hcmdpbjogMHB4OyB9IHBhcnRpY2xlcy1kaXNwbGF5IGNhbnZhcyxbaXM9XCJwYXJ0aWNsZXMtZGlzcGxheVwiXSBjYW52YXN7IHRvdWNoLWFjdGlvbjogbm9uZTsgbWFyZ2luOiAwcHg7IG1heC13aWR0aDogdmFyKC0tMTAwdncpOyB9IEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7IHBhcnRpY2xlcy1kaXNwbGF5IGNhbnZhcyxbaXM9XCJwYXJ0aWNsZXMtZGlzcGxheVwiXSBjYW52YXN7IG1hcmdpbi1sZWZ0OiAtMC43NXJlbTsgbWFyZ2luLXJpZ2h0OiAtMC43NXJlbTsgfSB9IEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkgeyBwYXJ0aWNsZXMtZGlzcGxheSBjYW52YXMsW2lzPVwicGFydGljbGVzLWRpc3BsYXlcIl0gY2FudmFzeyBtaW4td2lkdGg6IDYwMHB4OyB9IH1gLFxuICBleHBvcnRzOiB7XG4gICAgb25Nb3VudGVkKCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgcmVwZWxYOiBOYU4sXG4gICAgICAgIHJlcGVsWTogTmFOLFxuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICBvZmZzZXRZOiAwLFxuICAgICAgICB0YWlsOiAwLFxuICAgICAgICBwYXJ0aWNsZVNpemU6IDIuNVxuICAgICAgfTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLiQoJ2NhbnZhcycpO1xuXG4gICAgICAvLyBcdTMwRUZcdTMwRkNcdTMwQURcdTMwRjNcdTMwQjBcdTMwQURcdTMwRTNcdTMwRjNcdTMwRDBcdTMwQjlcdTMwOTJcdTRGNUNcdTYyMTBcbiAgICAgIHRoaXMuYnVmZmVyID0gY2FudmFzLmNsb25lTm9kZSgpOyAvLyBXZWJHTCBcdTMwNjdcdTRGN0ZcdTMwNDZcbiAgICAgIHRoaXMuYnVmZmVyLndpZHRoID0gdGhpcy5idWZmZXIud2lkdGggKiAyO1xuICAgICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gdGhpcy5idWZmZXIuaGVpZ2h0ICogMjtcbiAgICAgIHRoaXMuYnVmZmVyMiA9IGNhbnZhcy5jbG9uZU5vZGUoKTsgLy8gXHUzMEI5XHUzMEFGXHUzMEVEXHUzMEZDXHUzMEVCXHU1MUU2XHU3NDA2XHUzMDZFXHU1MjREXG5cbiAgICAgIC8vIFx1MzBDN1x1MzBEMFx1MzBDM1x1MzBCMFx1NzUyOFx1MzA2Qlx1ODg2OFx1NzkzQVx1MzA1OVx1MzA4Qlx1NTgzNFx1NTQwOFxuICAgICAgLy8gdGhpcy5yb290Lmluc2VydEJlZm9yZSh0aGlzLmJ1ZmZlciwgY2FudmFzLm5leHRTaWJsaW5nKTtcbiAgICAgIC8vIHRoaXMucm9vdC5pbnNlcnRCZWZvcmUodGhpcy5idWZmZXIyLCB0aGlzLmJ1ZmZlci5uZXh0U2libGluZyk7XG5cbiAgICAgIC8vIFx1MzBERVx1MzBBNlx1MzBCOVx1NUVBN1x1NkExOVx1MzA0Qlx1MzA4OSB4LCB5IFx1NUVBN1x1NkExOVx1MzA2Qlx1NzZGNFx1MzA1OVxuICAgICAgY29uc3QgbW91c2UyeHkgPSAobW91c2VYLCBtb3VzZVkpID0+IHtcbiAgICAgICAgbGV0IHggPSBtb3VzZVggLyBjYW52YXMuY2xpZW50V2lkdGggKyB0aGlzLnN0YXRlLm9mZnNldFg7XG4gICAgICAgIGxldCB5ID0gbW91c2VZIC8gY2FudmFzLmNsaWVudEhlaWdodCArIHRoaXMuc3RhdGUub2Zmc2V0WTtcbiAgICAgICAgcmV0dXJuIFt4IC0gTWF0aC5yb3VuZCh4KSwgeSAtIE1hdGgucm91bmQoeSldO1xuICAgICAgfTtcbiAgICAgIGxldCBjYW52YXNUYXBDb3VudCA9IDA7XG4gICAgICBsZXQgbW91c2VEb3VibGVEb3duID0gZmFsc2U7XG4gICAgICB0aGlzLmRlZmluZURyYWdCZWhhdmlvcihjYW52YXMsIHtcbiAgICAgICAgZG93bjogKGUsIHgsIHkpID0+IHtcbiAgICAgICAgICBpZiAoY2FudmFzVGFwQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgLy8gXHUzMEI3XHUzMEYzXHUzMEIwXHUzMEVCXHUzMEJGXHUzMEMzXHUzMEQ3XG4gICAgICAgICAgICBjYW52YXNUYXBDb3VudCsrO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNhbnZhc1RhcENvdW50ID0gMDtcbiAgICAgICAgICAgIH0sIDM1MCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFx1MzBDMFx1MzBENlx1MzBFQlx1MzBCRlx1MzBDM1x1MzBEN1xuICAgICAgICAgICAgY2FudmFzVGFwQ291bnQgPSAwO1xuICAgICAgICAgICAgbW91c2VEb3VibGVEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIFt0aGlzLnN0YXRlLnJlcGVsWCwgdGhpcy5zdGF0ZS5yZXBlbFldID0gbW91c2UyeHkoeCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiAoZSwgbW91c2VEb3duLCBuZXdYLCBuZXdZLCBvbGRYLCBvbGRZKSA9PiB7XG4gICAgICAgICAgaWYgKG1vdXNlRG93bikge1xuICAgICAgICAgICAgaWYgKCFtb3VzZURvdWJsZURvd24pIHtcbiAgICAgICAgICAgICAgLy8gXHUzMEI5XHUzMEFGXHUzMEVEXHUzMEZDXHUzMEVCXHUzMDU5XHUzMDhCXG4gICAgICAgICAgICAgIGNvbnN0IFtkeCwgZHldID0gW25ld1ggLSBvbGRYLCBuZXdZIC0gb2xkWV07XG4gICAgICAgICAgICAgIHRoaXMuc3RhdGUub2Zmc2V0WCAtPSBkeCAvIGNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vZmZzZXRYIC09IE1hdGgucm91bmQodGhpcy5zdGF0ZS5vZmZzZXRYKTtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vZmZzZXRZIC09IGR5IC8gY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5vZmZzZXRZIC09IE1hdGgucm91bmQodGhpcy5zdGF0ZS5vZmZzZXRZKTtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFt0aGlzLnN0YXRlLnJlcGVsWCwgdGhpcy5zdGF0ZS5yZXBlbFldID0gbW91c2UyeHkobmV3WCwgbmV3WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cDogKGUsIHgsIHkpID0+IHtcbiAgICAgICAgICBtb3VzZURvdWJsZURvd24gPSBmYWxzZTtcbiAgICAgICAgICBbdGhpcy5zdGF0ZS5yZXBlbFgsIHRoaXMuc3RhdGUucmVwZWxZXSA9IFtOYU4sIE5hTl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25VcGRhdGVkKHByb3BzLCBzdGF0ZSkge1xuICAgICAgY29uc3Qgc2NyZWVucyA9IHtcbiAgICAgICAgWFM6IDQwMCxcbiAgICAgICAgUzogNjAwLFxuICAgICAgICBNOiA5MDAsXG4gICAgICAgIEw6IDEyMDAsXG4gICAgICAgIFhMOiAxNTAwXG4gICAgICB9O1xuICAgICAgbGV0IHNpemUgPSBzY3JlZW5zW3RoaXMuc3RhdGUuc2NyZWVuXTtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLiQoJ2NhbnZhcycpO1xuICAgICAgaWYgKGNhbnZhcyAmJiBjYW52YXMud2lkdGggIT0gc2l6ZSkge1xuICAgICAgICBbY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XSA9IFt0aGlzLmJ1ZmZlcjIud2lkdGgsIHRoaXMuYnVmZmVyMi5oZWlnaHRdID0gW3NpemUsIHNpemVdO1xuICAgICAgICBbdGhpcy5idWZmZXIud2lkdGgsIHRoaXMuYnVmZmVyLmhlaWdodF0gPSBbc2l6ZSAqIDIsIHNpemUgKiAyXTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIC8vIFdlYkdMIFx1MzA0Q1x1NEY3Rlx1MzA0OFx1MzA2QVx1MzA0NFx1NTgzNFx1NTQwOFx1MzA2RVx1OTAxQVx1NUUzOFx1MzA2RVx1NjNDRlx1NzUzQlxuXG4gICAgcmVuZGVyXzJkKGcsIHdvcmxkLCBjb2xvckZ1bmMpIHtcbiAgICAgIGxldCBjYW52YXMgPSB0aGlzLiQoXCJjYW52YXNcIik7XG4gICAgICBnLnNjYWxlKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICBnLnRyYW5zbGF0ZSgwLjUsIDAuNSk7XG5cbiAgICAgIC8vIFx1MzBEMVx1MzBFQ1x1MzBDM1x1MzBDOFx1MzA5Mlx1NEY1Q1x1NjIxMFxuICAgICAgY29uc3QgbiA9IHdvcmxkLm5zcGVjaWVzO1xuICAgICAgY29uc3QgcGFsZXR0ZSA9IFsuLi5BcnJheShuKV0ubWFwKChfLCBpKSA9PiBjb2xvckZ1bmMoaSAvIG4pKTtcblxuICAgICAgLy8gXHU3QzkyXHU1QjUwXHUzMDZFXHU2M0NGXHU3NTNCXG4gICAgICBsZXQgc2l6ZSA9IHRoaXMuY2FsY1BhcnRpY2xlU2l6ZSgpO1xuICAgICAgY29uc3QgciA9IHNpemUgLyBjYW52YXMud2lkdGggLyAyO1xuICAgICAgZy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNjcmVlblwiO1xuICAgICAgd29ybGQucGFydGljbGVzLmZvckVhY2goKHNwLCB4LCB5KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyYXcyID0gKF94LCBfeSkgPT4ge1xuICAgICAgICAgIGcuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgZy5maWxsU3R5bGUgPSBwYWxldHRlW3NwXTtcbiAgICAgICAgICBnLmFyYyhfeCwgX3ksIHIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICBnLmZpbGwoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZHJhdyA9IChfeCwgX3kpID0+IHtcbiAgICAgICAgICBkcmF3MihfeCwgX3kpO1xuICAgICAgICAgIGlmIChfeSA8IC0wLjUgKyByKSBkcmF3MihfeCwgX3kgKyAxKTtcbiAgICAgICAgICBpZiAoX3kgPiArMC41IC0gcikgZHJhdzIoX3gsIF95IC0gMSk7XG4gICAgICAgIH07XG4gICAgICAgIHggKz0gMC41O1xuICAgICAgICB4IC09IE1hdGgucm91bmQoeCk7XG4gICAgICAgIHkgKz0gMC41O1xuICAgICAgICB5IC09IE1hdGgucm91bmQoeSk7XG4gICAgICAgIGRyYXcoeCwgeSk7XG4gICAgICAgIGlmICh4IDwgLTAuNSArIHIpIGRyYXcoeCArIDEsIHkpO1xuICAgICAgICBpZiAoeCA+ICswLjUgLSByKSBkcmF3KHggLSAxLCB5KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8gXHU3QzkyXHU1QjUwXHUzMEI1XHUzMEE0XHUzMEJBXHUzMDZGXHU3NTNCXHU5NzYyXHUzMEI1XHUzMEE0XHUzMEJBXHU3NkY4XHU1QkZFXHUzMDZCXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGXG4gICAgY2FsY1BhcnRpY2xlU2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRlLnBhcnRpY2xlU2l6ZSAvIDYwMCAqIHRoaXMuJCgnY2FudmFzJykud2lkdGg7XG4gICAgfSxcbiAgICAvLyBXZWJHTCBcdTMwNkVcdTUyMURcdTY3MUZcdTUzMTZcblxuICAgIGluaXRpYWxpemVfZ2woZ2wpIHtcbiAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVNoYWRlcnM9PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4gICAgICAvLyB2ZXJ0ZXggc2hhZGVyIHNvdXJjZSBjb2RlXG4gICAgICB2YXIgdnNoYWRlclNyYyA9IGBcbiAgICAgICAgYXR0cmlidXRlIHZlYzQgYV9wb3NpdGlvbjtcbiAgICAgICAgYXR0cmlidXRlIHZlYzQgYV9jb2xvcjtcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB1X3BvaW50X3NpemU7XG4gICAgICAgIHZhcnlpbmcgdmVjNCB2X2NvbG9yO1xuICAgICAgICB2b2lkIG1haW4odm9pZCkge1xuICAgICAgICAgIGdsX1Bvc2l0aW9uID0gYV9wb3NpdGlvbjtcbiAgICAgICAgICBnbF9Qb2ludFNpemUgPSB1X3BvaW50X3NpemU7XG4gICAgICAgICAgdl9jb2xvciA9IGFfY29sb3I7XG4gICAgICAgIH1cbiAgICAgIGA7XG5cbiAgICAgIC8vIENyZWF0ZSBhIHZlcnRleCBzaGFkZXIgb2JqZWN0XG4gICAgICB2YXIgdnNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgIGdsLnNoYWRlclNvdXJjZSh2c2hhZGVyLCB2c2hhZGVyU3JjKTtcbiAgICAgIGdsLmNvbXBpbGVTaGFkZXIodnNoYWRlcik7XG4gICAgICB2YXIgZnNoYWRlclNyYyA9IGBcbiAgICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHVfdGV4dHVyZTtcbiAgICAgICAgdW5pZm9ybSBpbnQgICAgICAgdV91c2VfdGV4dHVyZTtcbiAgICAgICAgdmFyeWluZyB2ZWM0ICAgICAgdl9jb2xvcjtcbiAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICB2ZWM0IGMgPSB2ZWM0KDEuMCk7XG4gICAgICAgICAgaWYoYm9vbCh1X3VzZV90ZXh0dXJlKSkge1xuICAgICAgICAgICAgYyA9IHRleHR1cmUyRCh1X3RleHR1cmUsIGdsX1BvaW50Q29vcmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihjLmEgPT0gMC4wKSB7XG4gICAgICAgICAgICBkaXNjYXJkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2X2NvbG9yICogYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGA7XG4gICAgICB2YXIgZnNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgICAgZ2wuc2hhZGVyU291cmNlKGZzaGFkZXIsIGZzaGFkZXJTcmMpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcihmc2hhZGVyKTtcbiAgICAgIHZhciBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZzaGFkZXIpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIGZzaGFkZXIpO1xuICAgICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgICBnbC51c2VQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuICAgICAgZ2wucHJvZ3JhbSA9IHNoYWRlclByb2dyYW07XG4gICAgICBsZXQgdmVydGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleF9idWZmZXIpO1xuXG4gICAgICAvKj09PT09PT09IEFzc29jaWF0aW5nIHNoYWRlcnMgdG8gYnVmZmVyIG9iamVjdHMgPT09PT09PT0qL1xuXG4gICAgICBsZXQgc2l6ZSA9IDI7IC8vIHZlcnRpY2VzLkJZVEVTX1BFUl9FTEVNRU5UXG5cbiAgICAgIGxldCBhX3Bvc2l0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oZ2wucHJvZ3JhbSwgJ2FfcG9zaXRpb24nKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYV9wb3NpdGlvbiwgMiwgZ2wuU0hPUlQsIHRydWUsIHNpemUgKiA1LCAwKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFfcG9zaXRpb24pO1xuICAgICAgbGV0IGFfY29sb3IgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihnbC5wcm9ncmFtLCAnYV9jb2xvcicpO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhX2NvbG9yLCAzLCBnbC5TSE9SVCwgdHJ1ZSwgc2l6ZSAqIDUsIHNpemUgKiAyKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFfY29sb3IpO1xuXG4gICAgICAvLyBTZXQgdGhlIHZpZXcgcG9ydFxuICAgICAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5idWZmZXIud2lkdGgsIHRoaXMuYnVmZmVyLmhlaWdodCk7XG4gICAgICBsZXQgdV90ZXh0dXJlID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKGdsLnByb2dyYW0sICd1X3RleHR1cmUnKTtcbiAgICAgIGdsLnVuaWZvcm0xaSh1X3RleHR1cmUsIDApO1xuXG4gICAgICAvLyBcdTRFMDBcdTY1RTZcdTRGN0ZcdTMwOEZcdTMwNkFcdTMwNDRcdThBMkRcdTVCOUFcdTMwNkJcdTMwNTdcdTMwNjZcdTMwNEFcdTMwNEZcbiAgICAgIGxldCB1X3VzZV90ZXh0dXJlID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKGdsLnByb2dyYW0sICd1X3VzZV90ZXh0dXJlJyk7XG4gICAgICBnbC51bmlmb3JtMWkodV91c2VfdGV4dHVyZSwgZmFsc2UpO1xuICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWcpO1xuICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUl9NSVBNQVBfTElORUFSKTtcblxuICAgICAgICAvLyBcdTRGN0ZcdTMwNDhcdTMwOEJcdTMwODhcdTMwNDZcdTMwNkJcdTMwNkFcdTMwNjNcdTMwNUZcdTMwNkVcdTMwNjcgT04gXHUzMDZCXHUzMDU5XHUzMDhCXG4gICAgICAgIGdsLnVuaWZvcm0xaSh1X3VzZV90ZXh0dXJlLCB0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIDMycHggeCAzMnB4IGNpcmNsZVxuICAgICAgaW1nLnNyYyA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsXG4gICAgICAgICAgaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNBQUFBQWdDQVlBQUFCemVucjBBQUFCSmtsRVFWUll3ODJYXG4gICAgICAgICAgb1c0Q1FSUkZ6NXNHVjlPMCtQWUxVRml5R3NWSDlHdFFXSkpxUHFGcUZiWUd2Z0I4U3hCVUxTVVh3U09wXG4gICAgICAgICAgSU0yMlhlYnRzWlBaZXljNzc4MTlSazBrM1FORFlBRDBnQ2ZnenBlM3dBcFlBblBnMWN3Mk5JR2t2cVNwXG4gICAgICAgICAgcEozcXMvTTkvZjhJZHlXTkpWWDZPNVYvby90YjhVSlNxZVlvSlJWMXhVZVNGbXFlaGFSUm5aTmZRL3k3XG4gICAgICAgICAgaWVLbmYxN3ErcFFYNzRSZmxseU1MNVZhbGRGQWRTN1I1QjZlZ1E3NTZMZ201aDF1RGR5U2wwL2dNWGw3XG4gICAgICAgICAgelMyT2F3NlQ5L1lvQnNrZmxpaDZKdWtkZUFneThHR1N2b0NiSUFPSFJEREp3MFFVMitSSkpvcFY4aGdWXG4gICAgICAgICAgeFRKNWhvdGlIdCtLUGIzT0FrNC9NN1BOdVF4ZmdIMUc4YjFybnA1ak0zc0RKaGtOVEZ5elJaRXNQSlMyXG4gICAgICAgICAgSXBhM1lqQnB4V2lXY3ppMTZQSDhDQXZmUG44M1VIVjVBQUFBQUVsRlRrU3VRbUNDYDtcbiAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5MzQxNTY0L3dlYmdsLWhvdy10by1jb3JyZWN0bHktYmxlbmQtYWxwaGEtY2hhbm5lbC1wbmdcbiAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAvLyAgICAgICAgZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICBnbC5ibGVuZEZ1bmMoZ2wuT05FX01JTlVTX0RTVF9DT0xPUiwgZ2wuT05FKTsgLy8gc2NyZWVuXG5cbiAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgdHJ1ZSk7XG4gICAgICBnbC5idWZmZXJEYXRhUmVxdWlyZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgLy8gV2ViR0wgXHUzMDZCXHUzMDg4XHUzMDhCXHU2M0NGXHU3NTNCXG5cbiAgICByZW5kZXJfZ2woZ2wsIHdvcmxkLCBjb2xvckZ1bmMpIHtcbiAgICAgIC8vIFx1NEUwMFx1NjVFNlx1NkQ4OFx1NTNCQlxuICAgICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTsgLy8gXHU4MENDXHU2NjZGXHU4MjcyXHUzMDZGXHU5MDBGXHU2NjBFXG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgIGxldCBwc2l6ZSA9IHRoaXMuY2FsY1BhcnRpY2xlU2l6ZSgpO1xuICAgICAgbGV0IHVfcG9pbnRfc2l6ZSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihnbC5wcm9ncmFtLCAndV9wb2ludF9zaXplJyk7XG4gICAgICBnbC51bmlmb3JtMWYodV9wb2ludF9zaXplLCBOdW1iZXIucGFyc2VGbG9hdChwc2l6ZSkgKyAwLjI1KTtcbiAgICAgIGxldCBwYWxldHRlID0gWy4uLkFycmF5KHdvcmxkLm5zcGVjaWVzKV0ubWFwKChfLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGMgPSBjb2xvckZ1bmMoaSAvIHdvcmxkLm5zcGVjaWVzKTtcbiAgICAgICAgcmV0dXJuIFtwYXJzZUludChjLnNsaWNlKDEsIDMpLCAxNiksIHBhcnNlSW50KGMuc2xpY2UoMywgNSksIDE2KSwgcGFyc2VJbnQoYy5zbGljZSg1LCA3KSwgMTYpXTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgW3ZlcnRpY2VzLCBudmVydGljZXNdID0gd29ybGQucGFydGljbGVzLnZlcnRpY2VzKHBhbGV0dGUsIHBzaXplIC8gdGhpcy5idWZmZXIud2lkdGgpO1xuICAgICAgaWYgKGdsLmJ1ZmZlckRhdGFSZXF1aXJlZCkge1xuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVydGljZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgMCwgdmVydGljZXMpO1xuICAgICAgfVxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIG52ZXJ0aWNlcyk7XG4gICAgfSxcbiAgICAvLyBzb3VyY2UgXHUzMDkyIGcgXHUzMDZFXHUzMEI5XHUzMEFGXHUzMEVEXHUzMEZDXHUzMEVCXHU0RjREXHU3RjZFXHUzMDZCXHU2M0NGXHU3NTNCXHUzMDU5XHUzMDhCXG5cbiAgICBkcmF3SW1hZ2VXaXRoT2Zmc2V0KGcsIHNvdXJjZSkge1xuICAgICAgY29uc3QgW3csIGhdID0gW3NvdXJjZS53aWR0aCwgc291cmNlLmhlaWdodF07XG4gICAgICBjb25zdCBbZHgsIGR5XSA9IFstdGhpcy5zdGF0ZS5vZmZzZXRYICogdywgLXRoaXMuc3RhdGUub2Zmc2V0WSAqIGhdO1xuICAgICAgY29uc3QgcmVnaW9uID0gKHN4LCBzeSkgPT4ge1xuICAgICAgICAvLyBcdUZGMTRcdThDNjFcdTk2NTBcdTMwOTJcdThBMDhcdTdCOTdcdTMwNTlcdTMwOEJcbiAgICAgICAgY29uc3QgeDEgPSAodyAtIGR4KSAlIHc7XG4gICAgICAgIGNvbnN0IHkxID0gKGggLSBkeSkgJSBoO1xuICAgICAgICBjb25zdCB4MiA9IChkeCArIHcpICUgdztcbiAgICAgICAgY29uc3QgeTIgPSAoZHkgKyBoKSAlIGg7XG4gICAgICAgIHJldHVybiBbTWF0aC5taW4oeDEsIHN4ID8gMCA6IHcpLCBNYXRoLm1pbih5MSwgc3kgPyAwIDogaCksIE1hdGguYWJzKHgxIC0gKHN4ID8gMCA6IHcpKSwgTWF0aC5hYnMoeTEgLSAoc3kgPyAwIDogaCkpLCBNYXRoLm1pbih4Miwgc3ggPyB3IDogMCksIE1hdGgubWluKHkyLCBzeSA/IGggOiAwKSwgTWF0aC5hYnMoeDEgLSAoc3ggPyAwIDogdykpLCBNYXRoLmFicyh5MSAtIChzeSA/IDAgOiBoKSldO1xuICAgICAgfTtcbiAgICAgIGcuZHJhd0ltYWdlKHNvdXJjZSwgLi4ucmVnaW9uKDAsIDApKTtcbiAgICAgIGcuZHJhd0ltYWdlKHNvdXJjZSwgLi4ucmVnaW9uKDEsIDApKTtcbiAgICAgIGcuZHJhd0ltYWdlKHNvdXJjZSwgLi4ucmVnaW9uKDAsIDEpKTtcbiAgICAgIGcuZHJhd0ltYWdlKHNvdXJjZSwgLi4ucmVnaW9uKDEsIDEpKTtcbiAgICB9LFxuICAgIC8vIFx1NjNDRlx1NzUzQlx1MzA1OVx1MzA4QlxuICAgIHJlbmRlcigpIHtcbiAgICAgIHdvcmxkID0gdGhpcy53b3JsZCAmJiB0aGlzLndvcmxkKCk7XG4gICAgICBjb2xvckZ1bmMgPSB0aGlzLmNvbG9yRnVuYyAmJiB0aGlzLmNvbG9yRnVuYygpO1xuICAgICAgaWYgKCF3b3JsZCB8fCAhY29sb3JGdW5jKSByZXR1cm47XG5cbiAgICAgIC8vIHRoaXMuYnVmZmVyMiBcdTMwNkIgb2Zmc2V0IFx1MzA5Mlx1NzEyMVx1ODk5Nlx1MzA1N1x1MzA1Rlx1NzUzQlx1NTBDRlx1MzA5Mlx1NEY1Q1x1MzA4QlxuXG4gICAgICAvLyBcdTMwN0VcdTMwNUFcdTVDM0VcdTMwOTJcdTVGMTVcdTMwNEJcdTMwNUJcdTMwOEJcdTgwQ0NcdTY2NkZcdTUxRTZcdTc0MDZcblxuICAgICAgY29uc3QgZzIgPSB0aGlzLmJ1ZmZlcjIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGcyLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgIGxldCB0ID0gdGhpcy5zdGF0ZS50YWlsO1xuICAgICAgaWYgKHQgPiA1MCkge1xuICAgICAgICB0aGlzLnRhaWxDb3VudCA9ICh0aGlzLnRhaWxDb3VudCB8fCAwKSArIDUwIC8gdDtcbiAgICAgICAgdCA9IDUwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50YWlsQ291bnQgPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGFpbENvdW50ID49IDEpIHtcbiAgICAgICAgLy8gXHU4MENDXHU2NjZGXHU1ODU3XHUzMDhBXHUzMDY0XHUzMDc2XHUzMDU3XG4gICAgICAgIGxldCBzdHlsZSA9ICcjMDAwMDAwJzsgLy8gXHU3NzFGXHUzMDYzXHU5RUQyXG4gICAgICAgIGlmICh0ID4gMCkge1xuICAgICAgICAgIC8vIFx1NUMzRVx1MzA5Mlx1NUYxNVx1MzA0Qlx1MzA1Qlx1MzA4Qlx1MzA2OFx1MzA0RFx1MzA2RiBhbHBoYSBcdTMwOTJcdTYzMDdcdTVCOUFcdTMwNTlcdTMwOEJcbiAgICAgICAgICBzdHlsZSArPSAoJzAnICsgKDI1NSAvICgxLjAgKyAxLjAgKiB0KSB8IDApLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbiAgICAgICAgfVxuICAgICAgICBnMi5maWxsU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgZzIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICBnMi5maWxsUmVjdCgwLCAwLCB0aGlzLmJ1ZmZlcjIud2lkdGgsIHRoaXMuYnVmZmVyMi5oZWlnaHQpO1xuICAgICAgICBnMi5maWxsU3R5bGUgPSBcIiMwMTAxMDFcIjtcbiAgICAgICAgZzIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkaWZmZXJlbmNlXCI7XG4gICAgICAgIGcyLmZpbGxSZWN0KDAsIDAsIHRoaXMuYnVmZmVyMi53aWR0aCwgdGhpcy5idWZmZXIyLmhlaWdodCk7XG4gICAgICAgIHRoaXMudGFpbENvdW50IC09IDE7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlYkdMIFx1MzA2Rlx1NEY3Rlx1MzA0OFx1MzA4Qlx1MzA0Qlx1RkYxRlxuICAgICAgbGV0IGdsID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dCgnd2ViZ2wnKTtcblxuICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzkzNDE1NjQvd2ViZ2wtaG93LXRvLWNvcnJlY3RseS1ibGVuZC1hbHBoYS1jaGFubmVsLXBuZ1xuICAgICAgY29uc3QgY2hlY2tXZWJnbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWJnbCcpO1xuICAgICAgaWYgKCFnbCB8fCAhY2hlY2tXZWJnbC5jaGVja2VkKSB7XG4gICAgICAgIGlmICghZ2wpIHtcbiAgICAgICAgICAvLyBXZWJHTCBcdTMwNENcdTRGN0ZcdTMwNDhcdTMwNkFcdTMwNDRcbiAgICAgICAgICBjaGVja1dlYmdsLmNoZWNrZWQgPSBcIlwiO1xuICAgICAgICAgIGNoZWNrV2ViZ2wuZGlzYWJsZWQgPSBcImRpc2FibGVkXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZWJHTCBcdTMwOTJcdTRGN0ZcdTMwOEZcdTMwNkFcdTMwNDRcdTYzQ0ZcdTc1M0JcbiAgICAgICAgZzIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICB0aGlzLnJlbmRlcl8yZChnMiwgd29ybGQsIGNvbG9yRnVuYyk7XG4gICAgICAgIGcyLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVSZXF1aXJlZCkge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZV9nbChnbCk7XG4gICAgICAgICAgdGhpcy5pbml0aWFsaXplUmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlcl9nbChnbCwgd29ybGQsIGNvbG9yRnVuYyk7XG4gICAgICAgIGcyLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLmJ1ZmZlcjIud2lkdGg7XG4gICAgICAgIGcyLmRyYXdJbWFnZSh0aGlzLmJ1ZmZlciwgc2l6ZSAvIDIsIHNpemUgLyAyLCBzaXplLCBzaXplLFxuICAgICAgICAvLyBzb3VyY2VcbiAgICAgICAgMCwgMCwgc2l6ZSwgc2l6ZSk7IC8vIGRlc3RcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FudmFzID0gdGhpcy4kKFwiY2FudmFzXCIpO1xuICAgICAgY29uc3QgZyA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgdGhpcy5kcmF3SW1hZ2VXaXRoT2Zmc2V0KGcsIHRoaXMuYnVmZmVyMik7XG4gICAgfVxuICB9LFxuICB0ZW1wbGF0ZTogKHRlbXBsYXRlLCBleHByZXNzaW9uVHlwZXMsIGJpbmRpbmdUeXBlcywgZ2V0Q29tcG9uZW50KSA9PiB0ZW1wbGF0ZSgnPGNhbnZhcyBleHByMj1cImV4cHIyXCIgaWQ9XCJwYXJ0aWNsZXMtZGlzcGxheVwiPjwvY2FudmFzPicsIFt7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjInLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ3dpZHRoJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnByb3BzLndpZHRoXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkFUVFJJQlVURSxcbiAgICAgIG5hbWU6ICdoZWlnaHQnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUucHJvcHMuaGVpZ2h0XG4gICAgfV1cbiAgfV0pLFxuICBuYW1lOiAncGFydGljbGVzLWRpc3BsYXknXG59O1xuXG52YXIgdDMgPSB7XG4gIGNzczogYHBsY29udHJvbHMgc3Bhbi5pY29uLFtpcz1cInBsY29udHJvbHNcIl0gc3Bhbi5pY29ueyBtYXJnaW46IDBweCAtMnB4ICFpbXBvcnRhbnQ7IH0gcGxjb250cm9scyAuY29sdW1ucyxbaXM9XCJwbGNvbnRyb2xzXCJdIC5jb2x1bW5zeyBkaXNwbGF5OiBmbGV4OyBtYXgtd2lkdGg6IHZhcigtLTEwMHZ3KTsgZmxleC13cmFwOiB3cmFwOyB9IEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQyMHB4KSBhbmQgKG1heC13aWR0aDogNjQwcHgpIHsgcGxjb250cm9scyAuY29sdW1ucyxbaXM9XCJwbGNvbnRyb2xzXCJdIC5jb2x1bW5zeyBwYWRkaW5nLWxlZnQ6IDAuNWVtOyB9IH0gcGxjb250cm9scyAuaXMtbmFycm93LFtpcz1cInBsY29udHJvbHNcIl0gLmlzLW5hcnJvd3sgZmxleDogbm9uZTsgd2lkdGg6IHVuc2V0OyB9YCxcbiAgZXhwb3J0czoge1xuICAgIG9uTW91bnRlZCgpIHtcbiAgICAgIHV0aWwuaW1wbGVtZW50RXZlbnRUYXJnZXQodGhpcyk7XG4gICAgICB0aGlzLmRlZmF1bHRfc3RhdGUgPSB7XG4gICAgICAgIHBhdXNlOiBmYWxzZSxcbiAgICAgICAgcmVjb3JkaW5nOiBmYWxzZSxcbiAgICAgICAgaW50ZXJhY3Rfc2VlZDogMiAqKiA1MyAqIE1hdGgucmFuZG9tKCksXG4gICAgICAgIHdvcmxkX3NlZWQ6IDIgKiogNTMgKiBNYXRoLnJhbmRvbSgpLFxuICAgICAgICBuc3BlY2llczogNixcbiAgICAgICAgbmxhdHRpY2U6IDMwLFxuICAgICAgICBzY2FsZTogMyxcbiAgICAgICAgdGFpbDogMCxcbiAgICAgICAgbWF4ZnBzOiA2MCxcbiAgICAgICAgc3RlcDogMSxcbiAgICAgICAgaW50c2V0OiBcIlwiLFxuICAgICAgICBwZXJ0ZXJiOiAwLjAwMSxcbiAgICAgICAgc2NyZWVuOiBcIlNcIixcbiAgICAgICAgcGFydGljbGVTaXplOiA0XG4gICAgICB9O1xuICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdF9zdGF0ZSk7XG4gICAgICB0aGlzLnJlY29tbWVuZGF0aW9ucy5wdXNoKC4uLnRoaXMucHJvcHMucmVjb21tZW5kYXRpb25zKTtcbiAgICAgIGlmIChsb2NhdGlvbi5zZWFyY2gpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJzKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVjb20gPSB0aGlzLnJlY29tbWVuZGF0aW9ucy5maW5kKHJlYyA9PiByZWMubGVuZ3RoID4gMilbMV07XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycyhyZWNvbSk7XG4gICAgICAgIHRoaXMuJCgnI3JlY29tbWVuZGF0aW9uJykudmFsdWUgPSByZWNvbTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmxhc2hDb250cm9sKHRoaXMuJCgnI3JlY29tbWVuZGF0aW9uJyksICcjZmYzJyk7XG4gICAgfSxcbiAgICBmbGFzaGluZzogZmFsc2UsXG4gICAgYXN5bmMgZmxhc2hDb250cm9sKGNvbnRyb2wsIGNvbG9yKSB7XG4gICAgICBpZiAodGhpcy5mbGFzaGluZykgcmV0dXJuO1xuICAgICAgdGhpcy5mbGFzaGluZyA9IHRydWU7XG4gICAgICBjb25zdCBvcmlnaW5hbCA9IGNvbnRyb2wuc3R5bGUuYmFja2dyb3VuZENvbG9yO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgY29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgYXdhaXQgdXRpbC5zbGVlcCg0MDApO1xuICAgICAgICBjb250cm9sLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9yaWdpbmFsO1xuICAgICAgICBhd2FpdCB1dGlsLnNsZWVwKDQwMCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZsYXNoaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICB2YWxpZGF0ZWRTdGF0ZShyYW5kb21pemUpIHtcbiAgICAgIGlmIChyYW5kb21pemUpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgIGludGVyYWN0X3NlZWQ6IDIgKiogNTMgKiBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgIHdvcmxkX3NlZWQ6IDIgKiogNTMgKiBNYXRoLnJhbmRvbSgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpO1xuICAgICAgZm9yIChsZXQgayBvZiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLnZhbGlkYXRpb24uZXJyb3JzLmVycm9ycykpIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdFtrXTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSByZXN1bHQudmFsaWRhdGlvbjtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICByZWNvbW1lbmRhdGlvbnM6IFtbJ1x1ODFFQVx1NTIwNlx1MzA2NycsICc/J11dLFxuICAgIHJlY29tbWVuZGF0aW9uQ2hhbmdlKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldC52YWx1ZSAhPSAnPycgJiYgZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMucGFyc2VQYXJhbWV0ZXJzKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgcGFyYW1zLndvcmxkX3NlZWQgPSAyICoqIDUzICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgcGFyYW1zLmludGVyYWN0X3NlZWQgPSAyICoqIDUzICogTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy51cGRhdGUocGFyYW1zKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwicmVzdGFydFwiLCB0aGlzLnN0YXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZsYXNoQ29udHJvbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXdvcmxkJyksICcjODgwJyk7XG4gICAgfSxcbiAgICBlZGl0b3JDaGFuZ2VkKGUpIHtcbiAgICAgIGxldCB7XG4gICAgICAgIGlkLFxuICAgICAgICB2YWx1ZVxuICAgICAgfSA9IGUudGFyZ2V0O1xuICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwicGVydGVyYlwiKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICBwZXJ0ZXJiOiBlLnRhcmdldC5jaGVja2VkID8gMC4wMDEgOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5pZCA9PSBcInNjYWxlXCIpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgIHNjYWxlOiB2YWx1ZSxcbiAgICAgICAgICBzdGVwOiBNYXRoLnJvdW5kKHRoaXMuc3RhdGUuc3RlcCAqIHRoaXMuc3RhdGUuc2NhbGUgLyB2YWx1ZSAqIDEwMDApIC8gMTAwMFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlKE9iamVjdC5mcm9tRW50cmllcyhbW2lkLCB2YWx1ZV1dKSk7XG4gICAgICB9XG4gICAgICBpZiAoW1wibnNwZWNpZXNcIiwgXCJubGF0dGljZVwiLCBcInNjYWxlXCIsIFwiaW50c2V0XCIsIFwic3RlcFwiXS5pbmNsdWRlcyhlLnRhcmdldC5pZCkpIHRoaXMuZGlzcGF0Y2hFdmVudChcInJlc3RhcnRcIiwgdGhpcy5zdGF0ZSk7XG4gICAgfSxcbiAgICByZWdlbmVyYXRlSW50ZXJhY3Rpb25TZWVkKCkge1xuICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICBpbnRlcmFjdF9zZWVkOiAyICoqIDUzICogTWF0aC5yYW5kb20oKVxuICAgICAgfSk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJyZXN0YXJ0XCIsIHRoaXMuc3RhdGUpO1xuICAgIH0sXG4gICAgcmVnZW5lcmF0ZVdvcmxkU2VlZCgpIHtcbiAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgd29ybGRfc2VlZDogMiAqKiA1MyAqIE1hdGgucmFuZG9tKClcbiAgICAgIH0pO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFwicmVzdGFydFwiLCB0aGlzLnN0YXRlKTtcbiAgICB9LFxuICAgIG9uQmVmb3JlVXBkYXRlKHByb3BzLCBzdGF0ZSkge1xuICAgICAgLy8gYWxsb3dzIHJlY2FsY3VsYXRpb24gb2YgY29udGV4dCBkYXRhIGJlZm9yZSB0aGUgdXBkYXRlXG4gICAgICBjb25zdCBydWxlID0ge1xuICAgICAgICBwYXVzZTogJ2Jvb2xlYW4nLFxuICAgICAgICByZWNvcmRpbmc6ICdib29sZWFuJyxcbiAgICAgICAgaW50ZXJhY3Rfc2VlZDogWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ21pbjoxJ10sXG4gICAgICAgIHdvcmxkX3NlZWQ6IFsncmVxdWlyZWQnLCAnaW50ZWdlcicsICdtaW46MSddLFxuICAgICAgICBuc3BlY2llczogWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ2JldHdlZW46MSwyMDAnXSxcbiAgICAgICAgbmxhdHRpY2U6IFsncmVxdWlyZWQnLCAnaW50ZWdlcicsICdiZXR3ZWVuOjUsMzAwJ10sXG4gICAgICAgIHNjYWxlOiBbJ3JlcXVpcmVkJywgJ251bWVyaWMnLCAnYmV0d2VlbjowLjUsMjAnXSxcbiAgICAgICAgdGFpbDogWydyZXF1aXJlZCcsICdudW1lcmljJywgJ21pbjowJ10sXG4gICAgICAgIG1heGZwczogWydyZXF1aXJlZCcsICdudW1lcmljJywgJ2JldHdlZW46MCwxMDAwJ10sXG4gICAgICAgIGludHNldDogWydyZWdleDovXltBLVpdPyQvJ10sXG4gICAgICAgIHNjcmVlbjogWydyZXF1aXJlZCddLFxuICAgICAgICBwYXJ0aWNsZVNpemU6IFsncmVxdWlyZWQnLCAnbnVtZXJpYycsICdiZXR3ZWVuOjAsMTI3LjUnXVxuICAgICAgfTtcbiAgICAgIHN0YXRlLnZhbGlkYXRpb24gPSBuZXcgVmFsaWRhdG9yKHN0YXRlLCBydWxlKTtcbiAgICAgIHN0YXRlLnZhbGlkYXRpb24ucGFzc2VzKCk7IC8vIGNoZWNrIVxuXG4gICAgICBmb3IgKGxldCBpZCBvZiBPYmplY3Qua2V5cyhydWxlKSkge1xuICAgICAgICBpZiAoc3RhdGUudmFsaWRhdGlvbi5lcnJvcnMuZXJyb3JzW2lkXSkge1xuICAgICAgICAgIHRoaXMuJCgnIycgKyBpZCkuY2xhc3NMaXN0LmFkZCgnaXMtZGFuZ2VyJyk7XG4gICAgICAgICAgaWYgKHRoaXMubGFzdFN0YXRlICYmIHRoaXMubGFzdFN0YXRlW2lkXSkgc3RhdGVbaWRdID0gdGhpcy5sYXN0U3RhdGVbaWRdOyAvLyBcdTc2RjRcdTUyNERcdTMwNkVcdTUwMjRcdTMwNkJcdTYyM0JcdTMwNTlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiQoJyMnICsgaWQpLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRhbmdlcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBvblVwZGF0ZWQocHJvcHMsIHN0YXRlKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXCJ1cGRhdGVcIiwgdGhpcy5zdGF0ZSk7XG5cbiAgICAgIC8vIFx1NzZGNFx1NTI0RFx1MzA2RVx1OEEyRFx1NUI5QVx1MzA5Mlx1NTNENlx1MzA2M1x1MzA2Nlx1MzA0QVx1MzA0RlxuICAgICAgdGhpcy5sYXN0U3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMudXBkYXRlVVJMKCk7XG4gICAgfSxcbiAgICB1cGRhdGVVUkwoKSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIHRoaXMuZW5jb2RlUGFyYW1ldGVycygpKTtcbiAgICB9LFxuICAgIG51bTJjaGFyKG4pIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IG4gPCAxMCA/IDB4MzAgOlxuICAgICAgLy8gJzAnXG4gICAgICBuIDwgMTAgKyAyNiA/IDB4NDEgLSAxMCA6XG4gICAgICAvLyAnQSdcbiAgICAgIG4gPCAxMCArIDI2ICogMiA/IDB4NjEgLSAxMCAtIDI2IDogLTE7IC8vICdhJ1xuXG4gICAgICBpZiAob2Zmc2V0IDwgMCkgcmV0dXJuIFwiP1wiO1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUob2Zmc2V0ICsgbik7XG4gICAgfSxcbiAgICBjaGFyMm51bShjKSB7XG4gICAgICBpZiAoYyA9PSAnPycpIHJldHVybiBOYU47XG4gICAgICBjID0gYy5jaGFyQXQoMCk7XG4gICAgICBsZXQgbiA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICAgIHJldHVybiAnYScgPD0gYyAmJiBjIDw9ICd6JyA/IG4gLSAweDYxICsgMTAgKyAyNiA6ICdBJyA8PSBjICYmIGMgPD0gJ1onID8gbiAtIDB4NDEgKyAxMCA6ICcwJyA8PSBjICYmIGMgPD0gJzknID8gbiAtIDB4MzAgOiBOYU47XG4gICAgfSxcbiAgICBlbmNvZGVQYXJhbWV0ZXJzKHN0YXRlID0gdGhpcy5zdGF0ZSkge1xuICAgICAgbGV0IHNlYXJjaCA9ICc/JyArIChzdGF0ZS5zY3JlZW4gIT0gJ1MnID8gc3RhdGUuc2NyZWVuIDogJycpO1xuICAgICAgc2VhcmNoICs9IHN0YXRlLm5zcGVjaWVzICsgXCJfXCIgKyBzdGF0ZS5ubGF0dGljZTtcbiAgICAgIHNlYXJjaCArPSBcIl9cIiArIHN0YXRlLmludGVyYWN0X3NlZWQgKyBzdGF0ZS5pbnRzZXQgKyBcIl9cIiArIHN0YXRlLndvcmxkX3NlZWQ7XG4gICAgICBzZWFyY2ggKz0gc3RhdGUucGVydGVyYiA/IFwiXCIgOiBcIm5cIjtcbiAgICAgIHNlYXJjaCArPSBcIl9cIiArIHN0YXRlLnRhaWw7XG4gICAgICBzZWFyY2ggKz0gXCJfXCIgKyBzdGF0ZS5zY2FsZTtcbiAgICAgIHNlYXJjaCArPSBcIl9cIiArIHN0YXRlLnN0ZXA7XG4gICAgICBpZiAoc3RhdGUucGFsZXR0ZVNldHRpbmcpIHtcbiAgICAgICAgc2VhcmNoICs9IFwiX1wiICsgdGhpcy5udW0yY2hhcihzdGF0ZS5wYWxldHRlU2V0dGluZy5pc2NhbGUpO1xuICAgICAgICBzZWFyY2ggKz0gKFwiMFwiICsgTWF0aC5yb3VuZChzdGF0ZS5wYWxldHRlU2V0dGluZy5vZmZzZXQgKiAyNTUpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgICAgICBzZWFyY2ggKz0gKFwiMFwiICsgTWF0aC5yb3VuZChzdGF0ZS5wYWxldHRlU2V0dGluZy5zY2FsZSAqIDE2IC0gMTYpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgICAgICBzZWFyY2ggKz0gTWF0aC5yb3VuZCh0aGlzLnN0YXRlLnBhcnRpY2xlU2l6ZSAqIDIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICB9LFxuICAgIHNldFBhcmFtZXRlcnMoc2VhcmNoKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wYXJzZVBhcmFtZXRlcnMoc2VhcmNoKTtcbiAgICAgIHRoaXMudXBkYXRlKHJlc3VsdCk7XG4gICAgfSxcbiAgICBwYXJzZVBhcmFtZXRlcnMoc2VhcmNoKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0X3N0YXRlKTtcbiAgICAgIGlmICghc2VhcmNoKSByZXR1cm4gcmVzdWx0OyAvLyBcdTUxNDhcdTk4MkRcdTMwNkIgPyBcdTMwODJcdTMwNjRcdTMwNDRcdTMwNjZcdTMwNDRcdTMwNkFcdTMwNDRcdTcyQjZcdTYxNEJcblxuICAgICAgLy8gXHU1MTQ4XHU5ODJEXHUzMDZFID8gXHUzMDkyXHU1OTE2XHUzMDU3XHUzMDY2IF8gXHUzMDY3XHU1MjA2XHUzMDUxXHUzMDhCXG4gICAgICBsZXQgZGlzcGxheVNldHRpbmc7XG4gICAgICBsZXQgb3B0aW9ucyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJ18nKTtcbiAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIFtyZXN1bHQubnNwZWNpZXMsIHJlc3VsdC5ubGF0dGljZSwgcmVzdWx0LmludGVyYWN0X3NlZWQsIHJlc3VsdC53b3JsZF9zZWVkXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubGVuZ3RoID09IDUpIHtcbiAgICAgICAgW3Jlc3VsdC5uc3BlY2llcywgcmVzdWx0Lm5sYXR0aWNlLCByZXN1bHQuaW50ZXJhY3Rfc2VlZCwgcmVzdWx0LndvcmxkX3NlZWQsIHJlc3VsdC50YWlsXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubGVuZ3RoID09IDYpIHtcbiAgICAgICAgW3Jlc3VsdC5uc3BlY2llcywgcmVzdWx0Lm5sYXR0aWNlLCByZXN1bHQuaW50ZXJhY3Rfc2VlZCwgcmVzdWx0LndvcmxkX3NlZWQsIHJlc3VsdC50YWlsLCByZXN1bHQuc2NhbGVdID0gb3B0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5sZW5ndGggPT0gNykge1xuICAgICAgICBbcmVzdWx0Lm5zcGVjaWVzLCByZXN1bHQubmxhdHRpY2UsIHJlc3VsdC5pbnRlcmFjdF9zZWVkLCByZXN1bHQud29ybGRfc2VlZCwgcmVzdWx0LnRhaWwsIHJlc3VsdC5zY2FsZSwgcmVzdWx0LnN0ZXBdID0gb3B0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5sZW5ndGggPT0gOCkge1xuICAgICAgICBbcmVzdWx0Lm5zcGVjaWVzLCByZXN1bHQubmxhdHRpY2UsIHJlc3VsdC5pbnRlcmFjdF9zZWVkLCByZXN1bHQud29ybGRfc2VlZCwgcmVzdWx0LnRhaWwsIHJlc3VsdC5zY2FsZSwgcmVzdWx0LnN0ZXAsIGRpc3BsYXlTZXR0aW5nXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIC8vIFx1NjNGQVx1NTJENVxuICAgICAgbGV0IG1hdGNoID0gL14oLiopbiQvLmV4ZWMocmVzdWx0LndvcmxkX3NlZWQpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJlc3VsdC53b3JsZF9zZWVkID0gbWF0Y2hbMV07XG4gICAgICAgIHJlc3VsdC5wZXJ0ZXJiID0gMDtcbiAgICAgIH1cblxuICAgICAgLy8gXHUzMEI5XHUzMEFGXHUzMEVBXHUzMEZDXHUzMEYzXHUzMEI1XHUzMEE0XHUzMEJBXG4gICAgICBtYXRjaCA9IC9eKFhTfFN8TXxMKSguKykvLmV4ZWMocmVzdWx0Lm5zcGVjaWVzKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXN1bHQuc2NyZWVuID0gbWF0Y2hbMV07XG4gICAgICAgIHJlc3VsdC5uc3BlY2llcyA9IG1hdGNoWzJdO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5zY3JlZW4gPT0gXCJYU1wiKSByZXN1bHQuc2NyZWVuID0gXCJTXCI7XG5cbiAgICAgIC8vIFx1NTkyN1x1NjU4N1x1NUI1N1x1MzA2RVx1MzBBMlx1MzBFQlx1MzBENVx1MzBBMVx1MzBEOVx1MzBDM1x1MzBDOFx1MzA2Rlx1NzZGOFx1NEU5Mlx1NEY1Q1x1NzUyOFx1MzBCQlx1MzBDM1x1MzBDOFx1MzA2RVx1NjMwN1x1NUI5QVxuICAgICAgaWYgKC9bQS1aXS8udGVzdChyZXN1bHQuaW50ZXJhY3Rfc2VlZC5zbGljZSgtMSkpKSB7XG4gICAgICAgIHJlc3VsdC5pbnRzZXQgPSByZXN1bHQuaW50ZXJhY3Rfc2VlZC5zbGljZSgtMSk7XG4gICAgICAgIHJlc3VsdC5pbnRlcmFjdF9zZWVkID0gcmVzdWx0LmludGVyYWN0X3NlZWQuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgaWYgKGRpc3BsYXlTZXR0aW5nKSB7XG4gICAgICAgIHRoaXMuc3RhdGUucGFsZXR0ZVNldHRpbmcgfHw9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlLnBhbGV0dGVTZXR0aW5nLmlzY2FsZSA9IHRoaXMuY2hhcjJudW0oZGlzcGxheVNldHRpbmcuc2xpY2UoMCwgMSksIDE2KTtcbiAgICAgICAgdGhpcy5zdGF0ZS5wYWxldHRlU2V0dGluZy5vZmZzZXQgPSBwYXJzZUludChkaXNwbGF5U2V0dGluZy5zbGljZSgxLCAzKSwgMTYpIC8gMjU1O1xuICAgICAgICB0aGlzLnN0YXRlLnBhbGV0dGVTZXR0aW5nLnNjYWxlID0gMSArIHBhcnNlSW50KGRpc3BsYXlTZXR0aW5nLnNsaWNlKDMsIDUpLCAxNikgLyAxNjtcbiAgICAgICAgcmVzdWx0LnBhcnRpY2xlU2l6ZSA9IGRpc3BsYXlTZXR0aW5nLnNsaWNlKDUpIC8gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LFxuICB0ZW1wbGF0ZTogKHRlbXBsYXRlLCBleHByZXNzaW9uVHlwZXMsIGJpbmRpbmdUeXBlcywgZ2V0Q29tcG9uZW50KSA9PiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImNvbHVtbnNcIj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJyZWNvbW1lbmRhdGlvblwiIGNsYXNzPVwibGFiZWxcIj5cdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcdThBMkRcdTVCOUE8L2xhYmVsPjxkaXYgY2xhc3M9XCJzZWxlY3RcIj48c2VsZWN0IGV4cHIzPVwiZXhwcjNcIiBpZD1cInJlY29tbWVuZGF0aW9uXCIgdmFsdWU+PG9wdGlvbiB2YWx1ZT5VUkxcdTYzMDdcdTVCOUE8L29wdGlvbj48b3B0aW9uIGV4cHI0PVwiZXhwcjRcIj48L29wdGlvbj48L3NlbGVjdD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJpbnRlcmFjdF9zZWVkXCIgY2xhc3M9XCJsYWJlbFwiPlx1NjNDRlx1NzUzQlx1NTIzNlx1NUZBMTwvbGFiZWw+PGRpdiBjbGFzcz1cImZpZWxkIGhhcy1hZGRvbnNcIj48cCBjbGFzcz1cImNvbnRyb2xcIj48YnV0dG9uIGV4cHI1PVwiZXhwcjVcIiBjbGFzcz1cImJ1dHRvblwiIGlkPVwicmVwbGF5XCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlvbi1pY29uIGV4cHI2PVwiZXhwcjZcIiBuYW1lPVwicGxheS1za2lwLWJhY2tcIj48L2lvbi1pY29uPjwvc3Bhbj48L2J1dHRvbj48L3A+PHAgY2xhc3M9XCJjb250cm9sXCI+PGJ1dHRvbiBleHByNz1cImV4cHI3XCIgaWQ9XCJwYXVzZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpb24taWNvbiBleHByOD1cImV4cHI4XCI+PC9pb24taWNvbj48L3NwYW4+PC9idXR0b24+PC9wPjxwIGNsYXNzPVwiY29udHJvbFwiPjxidXR0b24gZXhwcjk9XCJleHByOVwiIGlkPVwicmVjb3JkaW5nXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlvbi1pY29uIGV4cHIxMD1cImV4cHIxMFwiPjwvaW9uLWljb24+PC9zcGFuPjwvYnV0dG9uPjwvcD48cCBjbGFzcz1cImNvbnRyb2xcIj48YnV0dG9uIGV4cHIxMT1cImV4cHIxMVwiIGlkPVwicGFsZXR0ZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpb24taWNvbiBleHByMTI9XCJleHByMTJcIiBuYW1lPVwiY29sb3ItcGFsZXR0ZVwiPjwvaW9uLWljb24+PC9zcGFuPjwvYnV0dG9uPjwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJwYXJ0aWNsZVNpemVcIiBjbGFzcz1cImxhYmVsXCI+XHU3QzkyXHU1QjUwXHUzMEI1XHUzMEE0XHUzMEJBPC9sYWJlbD48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxpbnB1dCBleHByMTM9XCJleHByMTNcIiBjbGFzcz1cImlucHV0XCIgaWQ9XCJwYXJ0aWNsZVNpemVcIiB0eXBlPVwidGV4dFwiIHNpemU9XCIyXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtbmFycm93IGZpZWxkXCI+PGxhYmVsIGZvcj1cInNjcmVlblwiIGNsYXNzPVwibGFiZWxcIj5cdTc1M0JcdTk3NjI8L2xhYmVsPjxkaXYgY2xhc3M9XCJzZWxlY3RcIj48c2VsZWN0IGV4cHIxND1cImV4cHIxNFwiIGlkPVwic2NyZWVuXCI+PG9wdGlvbiB2YWx1ZT1cIlhTXCI+WFM8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiU1wiPlM8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiTVwiPk08L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiTFwiPkw8L29wdGlvbj48L3NlbGVjdD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJtYXhmcHNcIiBjbGFzcz1cImxhYmVsXCI+XHU2NzAwXHU1OTI3ZnBzPC9sYWJlbD48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxpbnB1dCBleHByMTU9XCJleHByMTVcIiBjbGFzcz1cImlucHV0XCIgaWQ9XCJtYXhmcHNcIiB0eXBlPVwidGV4dFwiIHNpemU9XCIyXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtbmFycm93IGZpZWxkXCI+PGxhYmVsIGNsYXNzPVwibGFiZWxcIj5cdTRGN0ZcdTMwNDRcdTY1Qjk8L2xhYmVsPjxkaXYgY2xhc3M9XCJjb250cm9sXCI+PGJ1dHRvbiBleHByMTY9XCJleHByMTZcIiBjbGFzcz1cImJ1dHRvbiBpcy1pbmZvXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlvbi1pY29uIGV4cHIxNz1cImV4cHIxN1wiIG5hbWU9XCJoZWxwXCI+PC9pb24taWNvbj48L3NwYW4+PC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBleHByMTg9XCJleHByMThcIj48ZGl2IGNsYXNzPVwiY29sdW1uc1wiPjxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtbmFycm93IGZpZWxkXCI+PGxhYmVsIGZvcj1cImludHNldFwiIGNsYXNzPVwibGFiZWxcIj5cdTc2RjhcdTRFOTJcdTRGNUNcdTc1MjhcdTMwQkJcdTMwQzNcdTMwQzg8L2xhYmVsPjxkaXYgY2xhc3M9XCJzZWxlY3RcIj48c2VsZWN0IGV4cHIxOT1cImV4cHIxOVwiIGlkPVwiaW50c2V0XCI+PG9wdGlvbiB2YWx1ZT5cdTMwQzdcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzg8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiQVwiPlx1NTkxQVx1N0M5Mlx1NUI1MFx1N0EyRVx1ODhEQ1x1NkI2M0E8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwiQlwiPlx1NTkxQVx1N0M5Mlx1NUI1MFx1N0EyRVx1ODhEQ1x1NkI2M0I8L29wdGlvbj48L3NlbGVjdD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJpbnRlcmFjdF9zZWVkXCIgY2xhc3M9XCJsYWJlbFwiPlx1NzZGOFx1NEU5Mlx1NEY1Q1x1NzUyOFx1MzBCN1x1MzBGQ1x1MzBDOTwvbGFiZWw+PGRpdiBjbGFzcz1cImZpZWxkIGhhcy1hZGRvbnNcIj48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxpbnB1dCBleHByMjA9XCJleHByMjBcIiBjbGFzcz1cImlucHV0XCIgaWQ9XCJpbnRlcmFjdF9zZWVkXCIgdHlwZT1cInRleHRcIiBzaXplPVwiOFwiLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxhIGV4cHIyMT1cImV4cHIyMVwiIGNsYXNzPVwiYnV0dG9uIGlzLWluZm9cIj48c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aW9uLWljb24gZXhwcjIyPVwiZXhwcjIyXCIgbmFtZT1cInJlZnJlc2hcIj48L2lvbi1pY29uPjwvc3Bhbj48L2E+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvbHVtbiBpcy1uYXJyb3cgZmllbGRcIj48bGFiZWwgZm9yPVwid29ybGRfc2VlZFwiIGNsYXNzPVwibGFiZWxcIj5cdTdDOTJcdTVCNTBcdTkxNERcdTdGNkVcdTMwQjdcdTMwRkNcdTMwQzk8L2xhYmVsPjxkaXYgY2xhc3M9XCJmaWVsZCBoYXMtYWRkb25zXCI+PGRpdiBjbGFzcz1cImNvbnRyb2xcIj48aW5wdXQgZXhwcjIzPVwiZXhwcjIzXCIgY2xhc3M9XCJpbnB1dFwiIGlkPVwid29ybGRfc2VlZFwiIHR5cGU9XCJ0ZXh0XCIgc2l6ZT1cIjhcIi8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbnRyb2xcIj48YSBleHByMjQ9XCJleHByMjRcIiBjbGFzcz1cImJ1dHRvbiBpcy1pbmZvXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlvbi1pY29uIGV4cHIyNT1cImV4cHIyNVwiIG5hbWU9XCJyZWZyZXNoXCI+PC9pb24taWNvbj48L3NwYW4+PC9hPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+PGRpdiBjbGFzcz1cImNvbHVtbiBpcy1uYXJyb3cgZmllbGRcIj48bGFiZWwgZm9yPVwibnNwZWNpZXNcIiBjbGFzcz1cImxhYmVsXCI+XHU3QzkyXHU1QjUwXHU3QTJFXHU2NTcwPC9sYWJlbD48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxpbnB1dCBleHByMjY9XCJleHByMjZcIiBjbGFzcz1cImlucHV0XCIgaWQ9XCJuc3BlY2llc1wiIHR5cGU9XCJ0ZXh0XCIgc2l6ZT1cIjJcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvbHVtbiBpcy1uYXJyb3cgZmllbGRcIj48bGFiZWwgZm9yPVwibnBhcnRpY2xlc1wiIGNsYXNzPVwibGFiZWxcIj5cdTIyMUFcdTdDOTJcdTVCNTBcdTY1NzA8L2xhYmVsPjxkaXYgY2xhc3M9XCJjb250cm9sXCI+PGlucHV0IGV4cHIyNz1cImV4cHIyN1wiIGNsYXNzPVwiaW5wdXRcIiBpZD1cIm5sYXR0aWNlXCIgdHlwZT1cInRleHRcIiBzaXplPVwiMlwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJzY2FsZVwiIGNsYXNzPVwibGFiZWxcIj5cdTMwQjlcdTMwQjFcdTMwRkNcdTMwRUI8L2xhYmVsPjxkaXYgY2xhc3M9XCJjb250cm9sXCI+PGlucHV0IGV4cHIyOD1cImV4cHIyOFwiIGNsYXNzPVwiaW5wdXRcIiBpZD1cInNjYWxlXCIgdHlwZT1cInRleHRcIiBzaXplPVwiMlwiLz48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJzdGVwXCIgY2xhc3M9XCJsYWJlbFwiPlx1OEEwOFx1N0I5N1x1MzBCOVx1MzBDNlx1MzBDM1x1MzBENzwvbGFiZWw+PGRpdiBjbGFzcz1cImNvbnRyb2xcIj48aW5wdXQgZXhwcjI5PVwiZXhwcjI5XCIgY2xhc3M9XCJpbnB1dFwiIGlkPVwic3RlcFwiIHR5cGU9XCJ0ZXh0XCIgc2l6ZT1cIjJcIi8+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvbHVtbiBpcy1uYXJyb3cgZmllbGRcIj48bGFiZWwgZm9yPVwidGFpbFwiIGNsYXNzPVwibGFiZWxcIj5cdTVDM0VcdTMwNkVcdTk1NzdcdTMwNTU8L2xhYmVsPjxkaXYgY2xhc3M9XCJjb250cm9sXCI+PGlucHV0IGV4cHIzMD1cImV4cHIzMFwiIGNsYXNzPVwiaW5wdXRcIiBpZD1cInRhaWxcIiB0eXBlPVwidGV4dFwiIHNpemU9XCIyXCIvPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtbmFycm93IGZpZWxkXCI+PGxhYmVsIGZvcj1cInBlcnRlcmJcIiBjbGFzcz1cImxhYmVsXCI+XHU2M0ZBXHU1MkQ1PC9sYWJlbD48ZGl2IGNsYXNzPVwiY29udHJvbFwiPjxpbnB1dCBleHByMzE9XCJleHByMzFcIiBpZD1cInBlcnRlcmJcIiB0eXBlPVwiY2hlY2tib3hcIi8+PC9kaXY+PC9kaXY+PC9kaXY+PGEgY2xhc3M9XCJidXR0b24gaXMtaW5mbyBpcy1zbWFsbFwiIGlkPVwic2hvdy1lZGl0b3JcIj5cdTMwRDFcdTMwRTlcdTMwRTFcdTMwRkNcdTMwQkZcdTMwQThcdTMwQzdcdTMwQTNcdTMwQkZcdTMwOTJcdTg4NjhcdTc5M0EvXHU5NzVFXHU4ODY4XHU3OTNBPC9hPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2x1bW5zXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj48ZGl2IGNsYXNzPVwiY29sdW1uIGlzLW5hcnJvdyBmaWVsZFwiPjxsYWJlbCBmb3I9XCJ3ZWJnbFwiIGNsYXNzPVwibGFiZWxcIj5XZWJHTDwvbGFiZWw+PGRpdiBjbGFzcz1cImNvbnRyb2xcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJ3ZWJnbFwiIGNoZWNrZWQvPjwvZGl2PjwvZGl2PjwvZGl2PicsIFt7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjMnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIzXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUucmVjb21tZW5kYXRpb25DaGFuZ2VcbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLkVBQ0gsXG4gICAgZ2V0S2V5OiBfc2NvcGUgPT4gX3Njb3BlLnJlY29tbWVuZGF0aW9uWzFdLFxuICAgIGNvbmRpdGlvbjogbnVsbCxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUoJyAnLCBbe1xuICAgICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5URVhULFxuICAgICAgICBjaGlsZE5vZGVJbmRleDogMCxcbiAgICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUucmVjb21tZW5kYXRpb25bMF1cbiAgICAgIH0sIHtcbiAgICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkFUVFJJQlVURSxcbiAgICAgICAgbmFtZTogJ3ZhbHVlJyxcbiAgICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUucmVjb21tZW5kYXRpb25bMV1cbiAgICAgIH1dXG4gICAgfV0pLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI0JyxcbiAgICBzZWxlY3RvcjogJ1tleHByNF0nLFxuICAgIGl0ZW1OYW1lOiAncmVjb21tZW5kYXRpb24nLFxuICAgIGluZGV4TmFtZTogbnVsbCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5yZWNvbW1lbmRhdGlvbnNcbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI1JyxcbiAgICBzZWxlY3RvcjogJ1tleHByNV0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2xpY2snLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiAoKSA9PiBfc2NvcGUuZGlzcGF0Y2hFdmVudChcInJlc3RhcnRcIiwgX3Njb3BlLnN0YXRlKVxuICAgIH1dXG4gIH0sIHtcbiAgICB0eXBlOiBiaW5kaW5nVHlwZXMuVEFHLFxuICAgIGdldENvbXBvbmVudDogZ2V0Q29tcG9uZW50LFxuICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gJ2lvbi1pY29uJyxcbiAgICBzbG90czogW10sXG4gICAgYXR0cmlidXRlczogW10sXG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjYnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHI2XSdcbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI3JyxcbiAgICBzZWxlY3RvcjogJ1tleHByN10nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkFUVFJJQlVURSxcbiAgICAgIG5hbWU6ICdjbGFzcycsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5wYXVzZSA/IFwiYnV0dG9uIGlzLWRhbmdlclwiIDogXCJidXR0b25cIlxuICAgIH0sIHtcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNsaWNrJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gKCkgPT4ge1xuICAgICAgICBfc2NvcGUudXBkYXRlKHtcbiAgICAgICAgICBcInBhdXNlXCI6ICFfc2NvcGUuc3RhdGUucGF1c2VcbiAgICAgICAgfSk7XG4gICAgICAgIF9zY29wZS5kaXNwYXRjaEV2ZW50KFwicGF1c2VcIiwgX3Njb3BlLnN0YXRlKTtcbiAgICAgIH1cbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLlRBRyxcbiAgICBnZXRDb21wb25lbnQ6IGdldENvbXBvbmVudCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+ICdpb24taWNvbicsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUucGF1c2UgPyBcInBsYXlcIiA6IFwicGF1c2VcIlxuICAgIH1dLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI4JyxcbiAgICBzZWxlY3RvcjogJ1tleHByOF0nXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByOScsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjldJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5BVFRSSUJVVEUsXG4gICAgICBuYW1lOiAnY2xhc3MnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUucmVjb3JkaW5nID8gXCJidXR0b24gaXMtZGFuZ2VyXCIgOiBcImJ1dHRvblwiXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2xpY2snLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiAoKSA9PiB7XG4gICAgICAgIF9zY29wZS51cGRhdGUoe1xuICAgICAgICAgIFwicmVjb3JkaW5nXCI6ICFfc2NvcGUuc3RhdGUucmVjb3JkaW5nXG4gICAgICAgIH0pO1xuICAgICAgICBfc2NvcGUuZGlzcGF0Y2hFdmVudChcInJlY29yZFwiLCBfc2NvcGUuc3RhdGUpO1xuICAgICAgfVxuICAgIH1dXG4gIH0sIHtcbiAgICB0eXBlOiBiaW5kaW5nVHlwZXMuVEFHLFxuICAgIGdldENvbXBvbmVudDogZ2V0Q29tcG9uZW50LFxuICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gJ2lvbi1pY29uJyxcbiAgICBzbG90czogW10sXG4gICAgYXR0cmlidXRlczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5BVFRSSUJVVEUsXG4gICAgICBuYW1lOiAnbmFtZScsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5yZWNvcmRpbmcgPyBcInN0b3BcIiA6IFwiZWxsaXBzZVwiXG4gICAgfV0sXG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjEwJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMTBdJ1xuICB9LCB7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjExJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMTFdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5BVFRSSUJVVEUsXG4gICAgICBuYW1lOiAnY2xhc3MnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuc2hvd1BhbGV0dGUgPyBcImJ1dHRvbiBpcy1kYXJrXCIgOiBcImJ1dHRvblwiXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2xpY2snLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiAoKSA9PiB7XG4gICAgICAgIF9zY29wZS51cGRhdGUoe1xuICAgICAgICAgIFwic2hvd1BhbGV0dGVcIjogIV9zY29wZS5zdGF0ZS5zaG93UGFsZXR0ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLlRBRyxcbiAgICBnZXRDb21wb25lbnQ6IGdldENvbXBvbmVudCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+ICdpb24taWNvbicsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxMicsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjEyXSdcbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxMycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjEzXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuVkFMVUUsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5wYXJ0aWNsZVNpemVcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuZWRpdG9yQ2hhbmdlZFxuICAgIH1dXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMTQnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIxNF0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuc2NyZWVuXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2hhbmdlJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLmVkaXRvckNoYW5nZWRcbiAgICB9XVxuICB9LCB7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjE1JyxcbiAgICBzZWxlY3RvcjogJ1tleHByMTVdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5WQUxVRSxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnN0YXRlLm1heGZwc1xuICAgIH0sIHtcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNoYW5nZScsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5lZGl0b3JDaGFuZ2VkXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxNicsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjE2XScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jbGljaycsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlbHAtcG9wdXAnKS5zaG93KClcbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLlRBRyxcbiAgICBnZXRDb21wb25lbnQ6IGdldENvbXBvbmVudCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+ICdpb24taWNvbicsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxNycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjE3XSdcbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxOCcsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjE4XScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ3N0eWxlJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gYGRpc3BsYXk6ICR7X3Njb3BlLiQoJyNyZWNvbW1lbmRhdGlvbicpLnZhbHVlID09ICc/JyA/ICdibG9jaycgOiAnbm9uZSd9YFxuICAgIH1dXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMTknLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIxOV0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuaW50c2V0XG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2hhbmdlJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLmVkaXRvckNoYW5nZWRcbiAgICB9XVxuICB9LCB7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjIwJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMjBdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5WQUxVRSxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnN0YXRlLmludGVyYWN0X3NlZWRcbiAgICB9XVxuICB9LCB7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjIxJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMjFdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNsaWNrJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnJlZ2VuZXJhdGVJbnRlcmFjdGlvblNlZWRcbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLlRBRyxcbiAgICBnZXRDb21wb25lbnQ6IGdldENvbXBvbmVudCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+ICdpb24taWNvbicsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIyMicsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjIyXSdcbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIyMycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjIzXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuVkFMVUUsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS53b3JsZF9zZWVkXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIyNCcsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjI0XScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jbGljaycsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5yZWdlbmVyYXRlV29ybGRTZWVkXG4gICAgfV1cbiAgfSwge1xuICAgIHR5cGU6IGJpbmRpbmdUeXBlcy5UQUcsXG4gICAgZ2V0Q29tcG9uZW50OiBnZXRDb21wb25lbnQsXG4gICAgZXZhbHVhdGU6IF9zY29wZSA9PiAnaW9uLWljb24nLFxuICAgIHNsb3RzOiBbXSxcbiAgICBhdHRyaWJ1dGVzOiBbXSxcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMjUnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyNV0nXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMjYnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyNl0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUubnNwZWNpZXNcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuZWRpdG9yQ2hhbmdlZFxuICAgIH1dXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMjcnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyN10nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUubmxhdHRpY2VcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuZWRpdG9yQ2hhbmdlZFxuICAgIH1dXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMjgnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyOF0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuc2NhbGVcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuZWRpdG9yQ2hhbmdlZFxuICAgIH1dXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMjknLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIyOV0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlZBTFVFLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuc3RlcFxuICAgIH0sIHtcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNoYW5nZScsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5lZGl0b3JDaGFuZ2VkXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIzMCcsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjMwXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuVkFMVUUsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS50YWlsXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2hhbmdlJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLmVkaXRvckNoYW5nZWRcbiAgICB9XVxuICB9LCB7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjMxJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMzFdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5BVFRSSUJVVEUsXG4gICAgICBuYW1lOiAnY2hlY2tlZCcsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5wZXJ0ZXJiICE9IDBcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jaGFuZ2UnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuZWRpdG9yQ2hhbmdlZFxuICAgIH1dXG4gIH1dKSxcbiAgbmFtZTogJ3BsY29udHJvbHMnXG59O1xuXG52YXIgdDQgPSB7XG4gIGNzczogYGNvbG9yLXNjYWxlLWVkaXRvcixbaXM9XCJjb2xvci1zY2FsZS1lZGl0b3JcIl17IC0tY3RybC1oZWlnaHQ6IDQwcHg7IC0tY3RybC13aWR0aDogNjAwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IHZhcigtLWN0cmwtd2lkdGgpOyBtYXgtd2lkdGg6IHZhcigtLTEwMHZ3KSAhaW1wb3J0YW50OyBsaW5lLWhlaWdodDogMTsgfSBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkgeyBjb2xvci1zY2FsZS1lZGl0b3IsW2lzPVwiY29sb3Itc2NhbGUtZWRpdG9yXCJdeyBtYXJnaW4tbGVmdDogLTAuNzVyZW07IG1hcmdpbi1yaWdodDogLTAuNzVyZW07IH0gfSBjb2xvci1zY2FsZS1lZGl0b3IgPiBkaXYsW2lzPVwiY29sb3Itc2NhbGUtZWRpdG9yXCJdID4gZGl2eyBtYXgtd2lkdGg6IDEwMCU7IH0gY29sb3Itc2NhbGUtZWRpdG9yIGEuYnV0dG9uLFtpcz1cImNvbG9yLXNjYWxlLWVkaXRvclwiXSBhLmJ1dHRvbnsgd2lkdGg6IHZhcigtLWN0cmwtaGVpZ2h0KTsgaGVpZ2h0OiB2YXIoLS1jdHJsLWhlaWdodCk7IH0gY29sb3Itc2NhbGUtZWRpdG9yIC5oYXMtY2FudmFzLFtpcz1cImNvbG9yLXNjYWxlLWVkaXRvclwiXSAuaGFzLWNhbnZhc3sgd2lkdGg6IGNhbGMoMTAwJSAtIHZhcigtLWN0cmwtaGVpZ2h0KSk7IH0gY29sb3Itc2NhbGUtZWRpdG9yIGNhbnZhcyxbaXM9XCJjb2xvci1zY2FsZS1lZGl0b3JcIl0gY2FudmFzeyB3aWR0aDogMTAwJTsgaGVpZ2h0OiB2YXIoLS1jdHJsLWhlaWdodCk7IG1hcmdpbjogMHB4OyB0b3VjaC1hY3Rpb246IG5vbmU7IGN1cnNvcjogYWxsLXNjcm9sbDsgfWAsXG4gIGV4cG9ydHM6IHtcbiAgICBvbk1vdW50ZWQoKSB7XG4gICAgICAvLyBFdmVudFRhcmdldCBcdTMwNjhcdTMwNTdcdTMwNjZcdTMwNkVcdTUyRDVcdTRGNUNcdTMwOTJcdTg4NENcdTMwNDZcbiAgICAgIHV0aWwuaW1wbGVtZW50RXZlbnRUYXJnZXQodGhpcyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy53aWR0aCkgdGhpcy5yb290LnN0eWxlLnNldFByb3BlcnR5KCctLWN0cmwtd2lkdGgnLCBgJHt0aGlzLnByb3BzLndpZHRofXB4YCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5oZWlnaHQpIHRoaXMucm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jdHJsLWhlaWdodCcsIGAke3RoaXMucHJvcHMuaGVpZ2h0fXB4YCk7XG4gICAgICBjb25zdCBjYW52YXMgPSB0aGlzLiQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBnID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGcuc2NhbGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGlzY2FsZTogMCxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgbW91c2VEb3duOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgIC8vIFx1MzBDOVx1MzBFOVx1MzBDM1x1MzBCMFx1NTJENVx1NEY1Q1x1MzA5Mlx1ODk4Rlx1NUI5QVxuXG4gICAgICB0aGlzLmRlZmluZURyYWdCZWhhdmlvcihjYW52YXMsIHtcbiAgICAgICAgZG93bjogKGUsIHgsIHkpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5tb3VzZURvd24gPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBtb3ZlOiAoZSwgbW91c2VEb3duLCBuZXdYLCBuZXdZLCBvbGRYLCBvbGRZKSA9PiB7XG4gICAgICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgW2R4LCBkeV0gPSBbbmV3WCAtIG9sZFgsIG5ld1kgLSBvbGRZXTtcbiAgICAgICAgICB0aGlzLnN0YXRlLnNjYWxlIC89IDEgKyBkeSAvIGNhbnZhcy5jbGllbnRIZWlnaHQgLyA4O1xuICAgICAgICAgIHRoaXMuc3RhdGUub2Zmc2V0IC09IGR4IC8gY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5zdGF0ZS5zY2FsZSAvIDI7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXA6IChlLCB4LCB5KSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgbW91c2VEb3duOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8vIHN0YXRlIFx1MzA2RVx1NjZGNFx1NjVCMFx1NTFFNlx1NzQwNlxuXG4gICAgb25CZWZvcmVVcGRhdGUocHJvcHMsIHN0YXRlKSB7XG4gICAgICAvLyBcdTkwNjlcdTUyMDdcdTMwNkFcdTdCQzRcdTU2RjJcdTMwNkJcdTc2RjRcdTMwNTlcbiAgICAgIGlmIChpc05hTihzdGF0ZS5pc2NhbGUpKSBzdGF0ZS5pc2NhbGUgPSAwO1xuICAgICAgc3RhdGUuaXNjYWxlID0gKHN0YXRlLmlzY2FsZSArIHRoaXMucHJvcHMuY29sb3JTY2FsZUxpc3QubGVuZ3RoKSAlIHRoaXMucHJvcHMuY29sb3JTY2FsZUxpc3QubGVuZ3RoO1xuICAgICAgaWYgKGlzTmFOKHN0YXRlLm9mZnNldCkpIHN0YXRlLm9mZnNldCA9IDA7XG4gICAgICBzdGF0ZS5vZmZzZXQgLT0gTWF0aC5mbG9vcihzdGF0ZS5vZmZzZXQpOyAvLyBsaW1pdCBpbiBbMCwgMSlcblxuICAgICAgaWYgKGlzTmFOKHN0YXRlLnNjYWxlKSkgc3RhdGUuc2NhbGUgPSAxO1xuICAgICAgc3RhdGUuc2NhbGUgPSBNYXRoLm1pbigxNyAqIDI1NSAvIDI1NiwgTWF0aC5tYXgoMSwgc3RhdGUuc2NhbGUpKTtcbiAgICB9LFxuICAgIG9uVXBkYXRlZChwcm9wcywgc3RhdGUpIHtcbiAgICAgIC8vIFx1NjNDRlx1NzUzQlx1MzA1OVx1MzA4QiAoZmFjdG9yIFx1MzA2OCBvZmZzZXQgXHUzMDZGXHU5MUNGXHU1QjUwXHU1MzE2XHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRGKVxuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLnByb3BzLmNvbG9yU2NhbGVMaXN0W3N0YXRlLmlzY2FsZV07XG4gICAgICBjb25zdCBmYWN0b3IgPSAxIC8gKDEgKyBNYXRoLnJvdW5kKChzdGF0ZS5zY2FsZSAtIDEpICogMTYpIC8gMTYpO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gTWF0aC5yb3VuZChzdGF0ZS5vZmZzZXQgKiAyNTYpIC8gMjU2O1xuICAgICAgY29uc3QgeDJjb2xvciA9IHggPT4ge1xuICAgICAgICB4ID0gZmFjdG9yICogeCArIG9mZnNldDtcbiAgICAgICAgcmV0dXJuIHNjYWxlLmNvbG9yKHggLSBNYXRoLmZsb29yKHgpKTtcbiAgICAgIH07XG4gICAgICBjb25zdCBjYW52YXMgPSB0aGlzLiQoXCJjYW52YXNcIik7XG4gICAgICBjb25zdCBnID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGNvbnN0IG4gPSAyMDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBsZXQgeCA9IGkgLyBuO1xuICAgICAgICBnLmZpbGxTdHlsZSA9IHgyY29sb3IoeCk7XG4gICAgICAgIGcuZmlsbFJlY3QoeCwgMCwgeCArIDEuMSAvIG4sIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBcdTY1NzBcdTUwMjRcdTMwOTJcdTgyNzJcdTMwNkJcdTc2RjRcdTMwNTlcdTk1QTJcdTY1NzBcdUZGMDhcdTMwQUJcdTMwRTlcdTMwRkNcdTMwQjlcdTMwQjFcdTMwRkNcdTMwRUJcdUZGMDlcdTMwOTJcdTkwMUFcdTc3RTVcdTMwNTlcdTMwOEJcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcInVwZGF0ZVwiLCB4MmNvbG9yKTtcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiAodGVtcGxhdGUsIGV4cHJlc3Npb25UeXBlcywgYmluZGluZ1R5cGVzLCBnZXRDb21wb25lbnQpID0+IHRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwiZmllbGQgaGFzLWFkZG9uc1wiPjxkaXYgY2xhc3M9XCJjb250cm9sIGhhcy1jYW52YXNcIj48Y2FudmFzPjwvY2FudmFzPjwvZGl2PjxkaXYgY2xhc3M9XCJjb250cm9sXCI+PGEgZXhwcjA9XCJleHByMFwiIGNsYXNzPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlvbi1pY29uIGV4cHIxPVwiZXhwcjFcIiBuYW1lPVwic3dhcC12ZXJ0aWNhbFwiPjwvaW9uLWljb24+PC9zcGFuPjwvYT48L2Rpdj48L2Rpdj4nLCBbe1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIwJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMF0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkVWRU5ULFxuICAgICAgbmFtZTogJ29uY2xpY2snLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiAoKSA9PiBfc2NvcGUudXBkYXRlKHtcbiAgICAgICAgaXNjYWxlOiBfc2NvcGUuc3RhdGUuaXNjYWxlICsgMVxuICAgICAgfSlcbiAgICB9XVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLlRBRyxcbiAgICBnZXRDb21wb25lbnQ6IGdldENvbXBvbmVudCxcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+ICdpb24taWNvbicsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIxJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMV0nXG4gIH1dKSxcbiAgbmFtZTogJ2NvbG9yLXNjYWxlLWVkaXRvcidcbn07XG5cbnZhciB0NSA9IHtcbiAgY3NzOiBgaW50ZXJhY3Rpb24tZWRpdG9yIC5jb250YWluZXIsW2lzPVwiaW50ZXJhY3Rpb24tZWRpdG9yXCJdIC5jb250YWluZXJ7IHBvc2l0aW9uOiByZWxhdGl2ZTsgbGluZS1oZWlnaHQ6IDEwMCU7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7IG1heC13aWR0aDogOTB2dzsgbWFyZ2luLWJvdHRvbTogNDBweDsgfSBpbnRlcmFjdGlvbi1lZGl0b3IgY2FudmFzLFtpcz1cImludGVyYWN0aW9uLWVkaXRvclwiXSBjYW52YXN7IHotaW5kZXg6IC0xOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyB0b3VjaC1hY3Rpb246IG5vbmU7IG1heC13aWR0aDogOTB2dzsgfSBpbnRlcmFjdGlvbi1lZGl0b3IgI3NjYWxlLXRleHQsW2lzPVwiaW50ZXJhY3Rpb24tZWRpdG9yXCJdICNzY2FsZS10ZXh0eyB0ZXh0LWFsaWduOiBjZW50ZXI7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZy10b3A6IDEwcHg7IH0gaW50ZXJhY3Rpb24tZWRpdG9yICNzY2FsZSxbaXM9XCJpbnRlcmFjdGlvbi1lZGl0b3JcIl0gI3NjYWxleyBwb3NpdGlvbjogYWJzb2x1dGU7IG1heC13aWR0aDogOTB2dzsgfSBpbnRlcmFjdGlvbi1lZGl0b3IgLmFycm93LFtpcz1cImludGVyYWN0aW9uLWVkaXRvclwiXSAuYXJyb3d7IC0tdmFsdWU6IDBweDsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiBjYWxjKHZhcigtLXZhbHVlKSAtIDVweCk7IHdpZHRoOiAwOyBoZWlnaHQ6IDA7IGJvcmRlci1ib3R0b206IDhweCBzb2xpZCB3aGl0ZTsgYm9yZGVyLXJpZ2h0OiA1cHggdHJhbnNwYXJlbnQgc29saWQ7IGJvcmRlci1sZWZ0OiA1cHggdHJhbnNwYXJlbnQgc29saWQ7IH0gaW50ZXJhY3Rpb24tZWRpdG9yICNjdXJzb3IsW2lzPVwiaW50ZXJhY3Rpb24tZWRpdG9yXCJdICNjdXJzb3J7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyOiAjYzZjIHNvbGlkIDRweDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1gLFxuICBleHBvcnRzOiB7XG4gICAgb25Nb3VudGVkKCkge1xuICAgICAgdXRpbC5pbXBsZW1lbnRFdmVudFRhcmdldCh0aGlzKTtcbiAgICAgIGNvbnN0IHNjYWxlX2NhbnZhcyA9IHRoaXMuJChcIiNzY2FsZVwiKTtcbiAgICAgIGNvbnN0IHNjYWxlX2cgPSBzY2FsZV9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgc2NhbGVfZy5zY2FsZShzY2FsZV9jYW52YXMud2lkdGgsIHNjYWxlX2NhbnZhcy5oZWlnaHQpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgY3VycmVudF9pajogZmFsc2VcbiAgICAgIH07XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgY29uc3Qgdmlld2VyID0gdGhpcy4kKFwiI21hdHJpeFwiKTtcbiAgICAgIGNvbnN0IGUyaWogPSBlID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLndvcmxkKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMud29ybGQubnNwZWNpZXM7XG4gICAgICAgIGNvbnN0IGNyZWN0ID0gdmlld2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBpaiA9IFtNYXRoLmZsb29yKChlLmNsaWVudFkgLSBjcmVjdC50b3ApIC8gdmlld2VyLmNsaWVudEhlaWdodCAqIChuICsgMSkpIC0gMSwgTWF0aC5mbG9vcigoZS5jbGllbnRYIC0gY3JlY3QubGVmdCkgLyB2aWV3ZXIuY2xpZW50V2lkdGggKiAobiArIDEpKSAtIDFdO1xuICAgICAgICBpZiAoaWpbMF0gPCAwIHx8IGlqWzBdID49IG4gfHwgaWpbMV0gPCAwIHx8IGlqWzFdID49IG4pIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWo7XG4gICAgICB9O1xuICAgICAgbGV0IGRyYWdnaW5nID0gbnVsbDtcbiAgICAgIHRoaXMuZGVmaW5lRHJhZ0JlaGF2aW9yKHZpZXdlciwge1xuICAgICAgICBkb3duOiAoZSwgeCwgeSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBkcmFnZ2luZyA9IGUyaWooZSk7XG4gICAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgY3VycmVudF9pajogZHJhZ2dpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW92ZTogKGUsIG1vdXNlRG93biwgbmV3WCwgbmV3WSwgb2xkWCwgb2xkWSkgPT4ge1xuICAgICAgICAgIGlmIChkcmFnZ2luZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICAgIGN1cnJlbnRfaWo6IGUyaWooZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgZHggPSBuZXdYIC0gb2xkWDtcbiAgICAgICAgICBjb25zdCBkeSA9IG5ld1kgLSBvbGRZO1xuICAgICAgICAgIFthLCBiXSA9IHRoaXMud29ybGQuaW50ZXJhY3Rpb24uZ2V0KC4uLmRyYWdnaW5nKTtcbiAgICAgICAgICBhICs9IGR5ICogMC4wMDAwMDI1O1xuICAgICAgICAgIGlmIChhID49IC0wLjAwMDUpIGEgPSAtMC4wMDA1O1xuICAgICAgICAgIGIgLT0gZHggKiAwLjAwMDAwMjU7XG4gICAgICAgICAgdGhpcy53b3JsZC5pbnRlcmFjdGlvbi5zZXQoLi4uZHJhZ2dpbmcsIGEsIGIpO1xuICAgICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRfaWo6IGRyYWdnaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVwOiAoZSwgeCwgeSkgPT4ge1xuICAgICAgICAgIGRyYWdnaW5nID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50X2lqOiBlMmlqKGUpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmlld2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIGUgPT4ge1xuICAgICAgICBpZiAoIWRyYWdnaW5nKSB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgY3VycmVudF9pajogbnVsbFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2NhbGVUZXh0KCkge1xuICAgICAgaWYgKCF0aGlzLnN0YXRlLmN1cnJlbnRfaWopIHJldHVybiBcIlwiO1xuICAgICAgY29uc3QgW2ksIGpdID0gdGhpcy5zdGF0ZS5jdXJyZW50X2lqO1xuICAgICAgY29uc3QgW2EsIGJdID0gdGhpcy53b3JsZC5pbnRlcmFjdGlvbi5nZXQoaSwgaik7XG4gICAgICByZXR1cm4gYCMke2kgKyAxfSBcdTMwNEMgIyR7aiArIDF9IFx1MzA0Qlx1MzA4OVx1NTNEN1x1MzA1MVx1MzA4Qlx1NTI5QiBgICsgYChcdTY4MzggJHtNYXRoLnJvdW5kKC1hIC8gMC4wMDE1ICogMTAwKSAvIDEwMH0sIFx1NTQ2OCAke01hdGgucm91bmQoLWIgLyAwLjAwMDUgKiAxMDApIC8gMTAwfSlgO1xuICAgIH0sXG4gICAgb25VcGRhdGVkKHByb3BzLCBzdGF0ZSkge1xuICAgICAgLy8gcmlnaHQgYWZ0ZXIgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpcyB1cGRhdGVkIGFmdGVyIGFuIHVwZGF0ZSBjYWxsXG4gICAgICB0aGlzLnJlbmRlcl9tYXRyaXgoKTtcbiAgICAgIHRoaXMucmVuZGVyX3NjYWxlKCk7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50X2lqKSB7XG4gICAgICAgIGNvbnN0IFtpLCBqXSA9IHRoaXMuc3RhdGUuY3VycmVudF9pajtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gdGhpcy53b3JsZC5pbnRlcmFjdGlvbi5nZXQoaSwgaik7XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLnByb3BzLndpZHRoO1xuICAgICAgICBjb25zdCBheCA9IE1hdGgucm91bmQoLWEgLyAwLjAwMTUgKiB3IC8gMiArIHcgLyAyKTtcbiAgICAgICAgdGhpcy4kKCcjYScpLnN0eWxlLnNldFByb3BlcnR5KFwiLS12YWx1ZVwiLCBNYXRoLm1pbih3LCBNYXRoLm1heCgwLCBheCkpICsgXCJweFwiKTtcbiAgICAgICAgdGhpcy4kKCcjYScpLnN0eWxlLmJvcmRlckJvdHRvbUNvbG9yID0gYXggPCAwIHx8IHcgPCBheCA/IFwicmVkXCIgOiBcIndoaXRlXCI7XG4gICAgICAgIHRoaXMuJCgnI2EnKS5zdHlsZS50b3AgPSBwcm9wcy53aWR0aCArIFwicHhcIjtcbiAgICAgICAgY29uc3QgYnggPSBNYXRoLnJvdW5kKC1iIC8gMC4wMDA1ICogdyAvIDIgKyB3IC8gMik7XG4gICAgICAgIHRoaXMuJCgnI2InKS5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdmFsdWVcIiwgTWF0aC5taW4odywgTWF0aC5tYXgoMCwgYngpKSArIFwicHhcIik7XG4gICAgICAgIHRoaXMuJCgnI2InKS5zdHlsZS5ib3JkZXJCb3R0b21Db2xvciA9IGJ4IDwgMCB8fCB3IDwgYnggPyBcInJlZFwiIDogXCJ3aGl0ZVwiO1xuICAgICAgICB0aGlzLiQoJyNiJykuc3R5bGUudG9wID0gcHJvcHMud2lkdGggKyBcInB4XCI7XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLndvcmxkLm5zcGVjaWVzO1xuICAgICAgICB0aGlzLiQoJyNjdXJzb3InKS5zdHlsZS5sZWZ0ID0gcHJvcHMud2lkdGggKiAoMSArIGopIC8gKG4gKyAxKSArIHByb3BzLndpZHRoIC8gKG4gKyAxKSAqIDAuMSArIFwicHhcIjtcbiAgICAgICAgdGhpcy4kKCcjY3Vyc29yJykuc3R5bGUudG9wID0gcHJvcHMud2lkdGggKiAoMSArIGkpIC8gKG4gKyAxKSArIHByb3BzLndpZHRoIC8gKG4gKyAxKSAqIDAuMSArIFwicHhcIjtcbiAgICAgICAgdGhpcy4kKCcjY3Vyc29yJykuc3R5bGUud2lkdGggPSBwcm9wcy53aWR0aCAvIChuICsgMSkgKiAwLjkgKyBcInB4XCI7XG4gICAgICAgIHRoaXMuJCgnI2N1cnNvcicpLnN0eWxlLmhlaWdodCA9IHByb3BzLndpZHRoIC8gKG4gKyAxKSAqIDAuOSArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcInVwZGF0ZVwiLCBudWxsKTtcbiAgICB9LFxuICAgIHJlbmRlcl9tYXRyaXgoKSB7XG4gICAgICBpZiAoIXRoaXMud29ybGQpIHJldHVybjtcbiAgICAgIGNvbnN0IG4gPSB0aGlzLndvcmxkLm5zcGVjaWVzO1xuICAgICAgY29uc3QgY2FudmFzID0gdGhpcy4kKFwiI21hdHJpeFwiKTtcbiAgICAgIGNvbnN0IGcgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNvbnN0IHBhbGV0dGUgPSBbLi4uQXJyYXkobildLm1hcCgoXywgaSkgPT4gdGhpcy5jb2xvckZ1bmMoaSAvIG4pKTtcbiAgICAgIGNvbnN0IGRpc3QgPSBuZXcgUExTcGVjaWVzRGlzdHJpYnV0aW9uKG4sIHRoaXMud29ybGQucGFydGljbGVzKTtcbiAgICAgIGNvbnN0IGRpc3RfbWF4ID0gTWF0aC5tYXgoLi4uZGlzdC5kaXN0cmlidXRpb24pICogMS4yO1xuICAgICAgZy5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICBnLnNjYWxlKGNhbnZhcy53aWR0aCAvIChuICsgMSksIGNhbnZhcy5oZWlnaHQgLyAobiArIDEpKTtcbiAgICAgIGcuZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgICAgZy5maWxsUmVjdCgwLCAwLCBuICsgMSwgbiArIDEpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgLy8gXHU1REU2XHU1MDc0XHUzMDZFXHUzMERFXHUzMEZDXHUzMEFGXG4gICAgICAgIGcuYmVnaW5QYXRoKCk7XG4gICAgICAgIGcuZmlsbFN0eWxlID0gcGFsZXR0ZVtpXTtcbiAgICAgICAgZy5hcmMoMC4zLCAxLjUgKyBpLCAwLjMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgZy5maWxsKCk7XG5cbiAgICAgICAgLy8gXHU0RTBBXHUzMDZFXHUzMERFXHUzMEZDXHUzMEFGXG4gICAgICAgIGcuYmVnaW5QYXRoKCk7XG4gICAgICAgIGcuZmlsbFN0eWxlID0gcGFsZXR0ZVtpXTtcbiAgICAgICAgZy5hcmMoMS41ICsgaSwgMC41LCAwLjMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgZy5maWxsKCk7XG4gICAgICAgIGcuZmlsbFN0eWxlID0gXCIjM2MzXCI7XG4gICAgICAgIGcuZmlsbFJlY3QoMC43LCAxLjEgKyBpICsgKDEgLSBkaXN0LmRpc3RyaWJ1dGlvbltpXSAvIGRpc3RfbWF4KSAqIDAuOSwgMC4yLCBkaXN0LmRpc3RyaWJ1dGlvbltpXSAvIGRpc3RfbWF4ICogMC45KTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbG9yU2NhbGUpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICBsZXQgW2EsIGJdID0gdGhpcy53b3JsZC5pbnRlcmFjdGlvbi5nZXQoaSwgaik7XG4gICAgICAgICAgaWYgKGkgPT0gaikge1xuICAgICAgICAgICAgZy5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAgICAgICAgIGcuZmlsbFJlY3QoMS4wNSArIGosIDEuMDUgKyBpLCAwLjksIDAuOSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNOYU4oYikpIHtcbiAgICAgICAgICAgIGcuZmlsbFN0eWxlID0gdGhpcy5jb2xvclNjYWxlLmNvbG9yKCgtYiAvIDAuMDAwNSArIDEpIC8gMik7XG4gICAgICAgICAgICBnLmZpbGxSZWN0KDEuMSArIGosIDEuMSArIGksIDAuOSwgMC45KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFpc05hTihhKSkge1xuICAgICAgICAgICAgZy5maWxsU3R5bGUgPSB0aGlzLmNvbG9yU2NhbGUuY29sb3IoKC1hIC8gMC4wMDE1ICsgMSkgLyAyKTtcbiAgICAgICAgICAgIGcuZmlsbFJlY3QoMS4xICsgaiwgMS4xICsgaSwgMC41LCAwLjUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyX3NjYWxlKCkge1xuICAgICAgaWYgKCF0aGlzLmNvbG9yU2NhbGUpIHJldHVybjtcbiAgICAgIGNvbnN0IGcgPSB0aGlzLiQoXCIjc2NhbGVcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDA7IGkrKykge1xuICAgICAgICBnLmZpbGxTdHlsZSA9IHRoaXMuY29sb3JTY2FsZS5jb2xvcihpIC8gMjAwKTtcbiAgICAgICAgZy5maWxsUmVjdChpIC8gMjAwLCAwLCAxIC8gMjAwICsgMC4wMSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0ZW1wbGF0ZTogKHRlbXBsYXRlLCBleHByZXNzaW9uVHlwZXMsIGJpbmRpbmdUeXBlcywgZ2V0Q29tcG9uZW50KSA9PiB0ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPjxjYW52YXMgZXhwcjM4PVwiZXhwcjM4XCIgaWQ9XCJtYXRyaXhcIj48L2NhbnZhcz48YnIvPjxjYW52YXMgZXhwcjM5PVwiZXhwcjM5XCIgaWQ9XCJzY2FsZVwiIGhlaWdodD1cIjQwXCI+PC9jYW52YXM+PGRpdiBleHByNDA9XCJleHByNDBcIiBpZD1cImFcIiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGRpdiBleHByNDE9XCJleHByNDFcIiBpZD1cImJcIiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGRpdiBleHByNDI9XCJleHByNDJcIiBpZD1cInNjYWxlLXRleHRcIj48L2Rpdj48ZGl2IGV4cHI0Mz1cImV4cHI0M1wiIGlkPVwiY3Vyc29yXCI+PC9kaXY+PC9kaXY+JywgW3tcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMzgnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIzOF0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkFUVFJJQlVURSxcbiAgICAgIG5hbWU6ICd3aWR0aCcsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5wcm9wcy53aWR0aFxuICAgIH0sIHtcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5BVFRSSUJVVEUsXG4gICAgICBuYW1lOiAnaGVpZ2h0JyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnByb3BzLndpZHRoXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIzOScsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjM5XScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ3dpZHRoJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnByb3BzLndpZHRoXG4gICAgfV1cbiAgfSwge1xuICAgIHR5cGU6IGJpbmRpbmdUeXBlcy5JRixcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5jdXJyZW50X2lqLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI0MCcsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjQwXScsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlKG51bGwsIFtdKVxuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLklGLFxuICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnN0YXRlLmN1cnJlbnRfaWosXG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjQxJyxcbiAgICBzZWxlY3RvcjogJ1tleHByNDFdJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUobnVsbCwgW10pXG4gIH0sIHtcbiAgICB0eXBlOiBiaW5kaW5nVHlwZXMuSUYsXG4gICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUuY3VycmVudF9paixcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByNDInLFxuICAgIHNlbGVjdG9yOiAnW2V4cHI0Ml0nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSgnICcsIFt7XG4gICAgICBleHByZXNzaW9uczogW3tcbiAgICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlRFWFQsXG4gICAgICAgIGNoaWxkTm9kZUluZGV4OiAwLFxuICAgICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zY2FsZVRleHQoKVxuICAgICAgfV1cbiAgICB9XSlcbiAgfSwge1xuICAgIHR5cGU6IGJpbmRpbmdUeXBlcy5JRixcbiAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5zdGF0ZS5jdXJyZW50X2lqLFxuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHI0MycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjQzXScsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlKG51bGwsIFtdKVxuICB9XSksXG4gIG5hbWU6ICdpbnRlcmFjdGlvbi1lZGl0b3InXG59O1xuXG52YXIgdDYgPSB7XG4gIGNzczogYGhlbHAtcG9wdXAsW2lzPVwiaGVscC1wb3B1cFwiXXsgZGlzcGxheTogbm9uZTsgfSBoZWxwLXBvcHVwIC5idXR0b25zLFtpcz1cImhlbHAtcG9wdXBcIl0gLmJ1dHRvbnN7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH0gaGVscC1wb3B1cCAucHJvZ3Jlc3MsW2lzPVwiaGVscC1wb3B1cFwiXSAucHJvZ3Jlc3N7IG1hcmdpbi10b3A6IDVweDsgfSBoZWxwLXBvcHVwIC5iYWNrZ3JvdW5kLFtpcz1cImhlbHAtcG9wdXBcIl0gLmJhY2tncm91bmR7IHBvc2l0aW9uOiBmaXhlZDsgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjE4ODIzNTI5NDEpOyB6LWluZGV4OiAxMDsgdG9wOiAwcHg7IGxlZnQ6IDBweDsgd2lkdGg6IDEwMHZ3OyBoZWlnaHQ6IDEwMHZoOyB9IGhlbHAtcG9wdXAgI2hlbHAtcG9wdXAsW2lzPVwiaGVscC1wb3B1cFwiXSAjaGVscC1wb3B1cHsgei1pbmRleDogMTU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogNXZ3OyB3aWR0aDogNTUwcHg7IG1heC13aWR0aDogY2FsYyh2YXIoLS0xMDB2dykgLSAxMHZ3KTsgdG9wOiA0MHB4OyB9IGhlbHAtcG9wdXAgI2hlbHAtdGV4dCxbaXM9XCJoZWxwLXBvcHVwXCJdICNoZWxwLXRleHR7IGxpbmUtaGVpZ2h0OiAxLjU7IG1pbi1oZWlnaHQ6IDhlbTsgfSBoZWxwLXBvcHVwICNuZXh0LWJ1dHRvbixbaXM9XCJoZWxwLXBvcHVwXCJdICNuZXh0LWJ1dHRvbnsgbWFyZ2luOiA1cHggMHB4OyB9IGhlbHAtcG9wdXAgLmFycm93LFtpcz1cImhlbHAtcG9wdXBcIl0gLmFycm93eyBwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IGJsb2NrOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZvbnQtc2l6ZTogMjRweDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiA1cHg7IGJvcmRlci1yYWRpdXM6IDNweDsgYmFja2dyb3VuZC1jb2xvcjogIzljMDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHotaW5kZXg6IDEwOyB9IGhlbHAtcG9wdXAgLmFycm93OjphZnRlcixbaXM9XCJoZWxwLXBvcHVwXCJdIC5hcnJvdzo6YWZ0ZXJ7IGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7IG1hcmdpbjogMCAxMHB4OyBib3JkZXItYm90dG9tOiAxNXB4IHNvbGlkICM5YzA7IGJvcmRlci1yaWdodDogMTVweCBzb2xpZCAjOWMwOyB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IHRvcDogMjVweDsgbGVmdDogMTBweDsgY29udGVudDogXCJcIjsgfWAsXG4gIGV4cG9ydHM6IHtcbiAgICBvbkJlZm9yZU1vdW50KCkge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IFtbYFx1N0M5Mlx1NUI1MFx1MzA2Qlx1NTQ3RFx1MzA0Q1x1NUJCRlx1MzA4Qlx1NEUxNlx1NzU0Q1x1MzA5Mlx1MzA2RVx1MzA5M1x1MzA3M1x1MzA4QVx1NzczQVx1MzA4MVx1MzA2QVx1MzA0Q1x1MzA4OVx1NkUyMVx1MzA4QVx1NkI2OVx1MzA0Rlx1MzBCNVx1MzBBNFx1MzBDOFx1MzA2N1x1MzA1OTxicj5cbiAgICAgICAgICA8YnI+XG4gICAgICAgICAgXHU5OEZEXHUzMDREXHUzMDVGXHUzMDg5IFtcdTZCMjFcdTMwNkVcdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcdTMwOTJcdTc1MUZcdTYyMTBdIFx1MzA5Mlx1NjJCQ1x1MzA1OVx1MzA2OFx1NzU3MFx1MzA2QVx1MzA4Qlx1NEUxNlx1NzU0Q1x1MzA2Qlx1NzlGQlx1MzA4Q1x1MzA3RVx1MzA1OWAsIFwibmV3LXdvcmxkXCJdLCBbYFtcdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcdThBMkRcdTVCOUFdIFx1MzA2N1x1MzA0QVx1NTJFN1x1MzA4MVx1MzA2RVx1OEEyRFx1NUI5QVx1MzA5Mlx1OTA3OFx1MzA5M1x1MzA2MFx1MzA4OVx1NEY1NVx1NUVBNlx1MzA0Qlx1NjJCQ1x1MzA1N1x1MzA2Nlx1MzA3Rlx1MzA2Nlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NGAsIFwicmVjb21tZW5kYXRpb25cIl0sIFtgW1x1MzA1M1x1MzA2RVx1MzBFRlx1MzBGQ1x1MzBFQlx1MzBDOVx1MzA5Mlx1MzBCN1x1MzBBN1x1MzBBMiZuYnNwO1xuICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj48aW9uLWljb24gbmFtZT1cInNoYXJlLXNvY2lhbFwiPjwvaW9uLWljb24+PC9zcGFuPjwvYT5dIFxuICAgICAgICAgICBcdTMwNjdcdTRFQ0FcdTMwNDRcdTMwOEJcdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcdTMwNzhcdTMwNkVcdTMwRUFcdTMwRjNcdTMwQUZcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwRkNcdTMwQzlcdTMwNzhcdTMwQjNcdTMwRDRcdTMwRkNcdTMwNjdcdTMwNERcdTMwN0VcdTMwNTlgLCBcImNvcHktdXJsXCJdLCBbYFtcdTYzQ0ZcdTc1M0JcdTUyMzZcdTVGQTFdIFx1MzA2RSBcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aW9uLWljb24gbmFtZT1cInBsYXktc2tpcC1iYWNrXCI+PC9pb24taWNvbj48L3NwYW4+IFxuICAgICAgICAgIFx1MzA2N1x1NzNGRVx1NTcyOFx1MzA2RVx1MzBFRlx1MzBGQ1x1MzBFQlx1MzBDOVx1MzA5Mlx1MzA2Rlx1MzA1OFx1MzA4MVx1MzA0Qlx1MzA4OVx1MzBFQVx1MzBEN1x1MzBFQ1x1MzBBNFx1MzA2N1x1MzA0RFx1MzA3RVx1MzA1OWAsIFwicmVwbGF5XCJdLCBbYFtcdTc1M0JcdTk3NjJcdTUyMzZcdTVGQTFdIFx1MzA2RSBcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aW9uLWljb24gbmFtZT1cImNvbG9yLXBhbGV0dGVcIj48L2lvbi1pY29uPjwvc3Bhbj4gXG4gICAgICAgICAgXHUzMDY3XHU3M0ZFXHUzMDhDXHUzMDhCXHUzMEFCXHUzMEU5XHUzMEZDXHUzMEI5XHUzMEIxXHUzMEZDXHUzMEVCXHUzMDkyXHU0RTBBXHU0RTBCXHU1REU2XHU1M0YzXHUzMDZCXHUzMDQ0XHUzMDU4XHUzMDhCXHUzMDY4XHU4MjcyXHUzMDRDXHU1OTA5XHUzMDhGXHUzMDhBXHUzMDdFXHUzMDU5YCwgXCJwYWxldHRlXCJdLCBbYFx1MzBDMFx1MzBENlx1MzBFQlx1MzBBRlx1MzBFQVx1MzBDM1x1MzBBRi9cdTMwQkZcdTMwQzNcdTMwRDdcdTMwNjdcdTMwRUZcdTMwRkNcdTMwRUJcdTMwQzlcdTMwNkJcdTYzMDdcdTMwOTJcdTdBODFcdTMwNjNcdThGQkNcdTMwODFcdTMwN0VcdTMwNTk8YnI+XG4gICAgICAgICAgPGJyPlxuICAgICAgICAgIFx1MzA1RFx1MzA4Q1x1MzA2N1x1MzA2Rlx1MzA0QVx1Njk3RFx1MzA1N1x1MzA3Rlx1MzA0Rlx1MzA2MFx1MzA1NVx1MzA0NGAsIFwicGFydGljbGVzLWRpc3BsYXlcIl1dLCB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuOiB0aGlzLm1lc3NhZ2VzLmxlbmd0aCxcbiAgICAgICAgaTogMFxuICAgICAgfTtcbiAgICAgIHRoaXMucm9vdC5zaG93ID0gKCkgPT4gdGhpcy5zaG93KCk7XG4gICAgfSxcbiAgICBvbk1vdW50ZWQoKSB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgb25CZWZvcmVVcGRhdGUocHJvcHMsIHN0YXRlKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5pID49IHRoaXMuc3RhdGUubikgdGhpcy5jbG9zZSgpO1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaSA8IDApIHRoaXMuc3RhdGUuaSA9IDA7XG4gICAgfSxcbiAgICBzaG93KCkge1xuICAgICAgY29uc3Qgc2Nyb2xsVG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMSArIHAnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsVG8gKyB3aW5kb3cuc2Nyb2xsWSk7XG4gICAgICBpZiAoIXRoaXMua2V5ZG93bikge1xuICAgICAgICB0aGlzLmtleWRvd24gPSBlID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyB8fCBlLmtleSA9PT0gJyAnIHx8IGUua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaSArPSAxO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5pIC09IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bik7XG4gICAgICB9XG4gICAgICB0aGlzLnJvb3Quc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRoaXMuc3RhdGUuaSA9IDA7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duKTtcbiAgICAgIHRoaXMua2V5ZG93biA9IG51bGw7XG4gICAgICB0aGlzLnJvb3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgdGhpcy5zdGF0ZS5pID0gMDtcbiAgICB9LFxuICAgIG9uVXBkYXRlZChwcm9wcywgc3RhdGUpIHtcbiAgICAgIGNvbnN0IGFycm93ID0gdGhpcy4kKCcuYXJyb3cnKTtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5tZXNzYWdlc1t0aGlzLnN0YXRlLmldWzFdO1xuICAgICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgICBhcnJvdy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gXHU4ODY4XHU3OTNBXHUzMDU3XHUzMDY2XHUzMDRBXHUzMDRCXHUzMDZBXHUzMDQ0XHUzMDY4IG9mZnNldFRvcCBcdTMwOTJcdTUzRDZcdTVGOTdcdTMwNjdcdTMwNERcdTMwNkFcdTMwNDRcbiAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQyMzU2NDYxL29mZnNldHRvcC1wcm9wZXJ0eS1vbi1lbGVtZW50LXdpdGgtZGlzcGxheS1ub25lLWlzLWFsd2F5cy0wXG4gICAgICBhcnJvdy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcbiAgICAgIGxldCB0YXJnZXRSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IHRhcmdldFRvcCA9IHRhcmdldFJlY3QudG9wIC0gNTA7XG4gICAgICBsZXQgdGFyZ2V0TGVmdCA9IHRhcmdldFJlY3QubGVmdCArIHRhcmdldFJlY3Qud2lkdGggLyAyIC0gMzA7XG4gICAgICBsZXQgYXJyb3dSZWN0ID0gYXJyb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBhcnJvdy5zdHlsZS50b3AgPSB0YXJnZXRUb3AgKyBhcnJvdy5vZmZzZXRUb3AgLSBhcnJvd1JlY3QudG9wICsgXCJweFwiO1xuICAgICAgYXJyb3cuc3R5bGUubGVmdCA9IHRhcmdldExlZnQgKyBhcnJvdy5vZmZzZXRMZWZ0IC0gYXJyb3dSZWN0LmxlZnQgKyBcInB4XCI7XG4gICAgICB0aGlzLmJsaW5rRWxlbWVudChhcnJvdyk7XG4gICAgfSxcbiAgICBhc3luYyBibGlua0VsZW1lbnQoZWxlbSwgZGlzcGxheSA9IFwiYmxvY2tcIikge1xuICAgICAgaWYgKHRoaXMuYmxpbmtpbmcpIHJldHVybjtcbiAgICAgIHRoaXMuYmxpbmtpbmcgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGF3YWl0IHV0aWwuc2xlZXAoMjAwKTtcbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgYXdhaXQgdXRpbC5zbGVlcCg2MDApO1xuICAgICAgfVxuICAgICAgdGhpcy5ibGlua2luZyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgdGVtcGxhdGU6ICh0ZW1wbGF0ZSwgZXhwcmVzc2lvblR5cGVzLCBiaW5kaW5nVHlwZXMsIGdldENvbXBvbmVudCkgPT4gdGVtcGxhdGUoJzxkaXYgZXhwcjMyPVwiZXhwcjMyXCIgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+PGFydGljbGUgY2xhc3M9XCJtZXNzYWdlIGlzLWluZm9cIiBpZD1cImhlbHAtcG9wdXBcIj48ZGl2IGNsYXNzPVwibWVzc2FnZS1oZWFkZXJcIj5cXG4gICAgICBcdTRGN0ZcdTMwNDRcdTY1QjlcXG4gICAgICA8YnV0dG9uIGV4cHIzMz1cImV4cHIzM1wiIGNsYXNzPVwiZGVsZXRlXCI+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm9keVwiPjxwIGlkPVwiaGVscC10ZXh0XCI+PHJhdyBleHByMzQ9XCJleHByMzRcIj48L3Jhdz48ZGl2IGNsYXNzPVwiYXJyb3cgYXJyb3ctbGJcIj5cdTMwNTNcdTMwNTNcdUZGMDE8L2Rpdj48L3A+PGRpdiBjbGFzcz1cImJ1dHRvbnNcIj48YnV0dG9uIGV4cHIzNT1cImV4cHIzNVwiIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJoZWxwLXByZXZcIj48L2J1dHRvbj48YnV0dG9uIGV4cHIzNj1cImV4cHIzNlwiIGNsYXNzPVwiYnV0dG9uIGlzLWluZm9cIiBpZD1cImhlbHAtbmV4dFwiPiA8L2J1dHRvbj48L2Rpdj48cHJvZ3Jlc3MgZXhwcjM3PVwiZXhwcjM3XCIgY2xhc3M9XCJwcm9ncmVzcyBpcy1saW5rXCIgaWQ9XCJoZWxwLXByb2dyZXNzXCI+IDwvcHJvZ3Jlc3M+PC9kaXY+PC9hcnRpY2xlPicsIFt7XG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjMyJyxcbiAgICBzZWxlY3RvcjogJ1tleHByMzJdJyxcbiAgICBleHByZXNzaW9uczogW3tcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNsaWNrJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLmNsb3NlXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIzMycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjMzXScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuRVZFTlQsXG4gICAgICBuYW1lOiAnb25jbGljaycsXG4gICAgICBldmFsdWF0ZTogX3Njb3BlID0+IF9zY29wZS5jbG9zZVxuICAgIH1dXG4gIH0sIHtcbiAgICB0eXBlOiBiaW5kaW5nVHlwZXMuVEFHLFxuICAgIGdldENvbXBvbmVudDogZ2V0Q29tcG9uZW50LFxuICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gJ3JhdycsXG4gICAgc2xvdHM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ2h0bWwnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUubWVzc2FnZXNbX3Njb3BlLnN0YXRlLmldWzBdXG4gICAgfV0sXG4gICAgcmVkdW5kYW50QXR0cmlidXRlOiAnZXhwcjM0JyxcbiAgICBzZWxlY3RvcjogJ1tleHByMzRdJ1xuICB9LCB7XG4gICAgdHlwZTogYmluZGluZ1R5cGVzLklGLFxuICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnN0YXRlLmkgIT0gMCxcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMzUnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIzNV0nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSgnXFxuICAgICAgICBcdTUyNERcdTMwNzgnLCBbe1xuICAgICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgICAgbmFtZTogJ29uY2xpY2snLFxuICAgICAgICBldmFsdWF0ZTogX3Njb3BlID0+ICgpID0+IF9zY29wZS51cGRhdGUoe1xuICAgICAgICAgIFwiaVwiOiBfc2NvcGUuc3RhdGUuaSAtIDFcbiAgICAgICAgfSlcbiAgICAgIH1dXG4gICAgfV0pXG4gIH0sIHtcbiAgICByZWR1bmRhbnRBdHRyaWJ1dGU6ICdleHByMzYnLFxuICAgIHNlbGVjdG9yOiAnW2V4cHIzNl0nLFxuICAgIGV4cHJlc3Npb25zOiBbe1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLlRFWFQsXG4gICAgICBjaGlsZE5vZGVJbmRleDogMCxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gW19zY29wZS5zdGF0ZS5pID09IF9zY29wZS5zdGF0ZS5uIC0gMSA/IFwiXHU5NTg5XHUzMDU4XHUzMDhCXCIgOiBcIlx1NkIyMVx1MzA3OFwiXS5qb2luKCcnKVxuICAgIH0sIHtcbiAgICAgIHR5cGU6IGV4cHJlc3Npb25UeXBlcy5FVkVOVCxcbiAgICAgIG5hbWU6ICdvbmNsaWNrJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gKCkgPT4gX3Njb3BlLnVwZGF0ZSh7XG4gICAgICAgIFwiaVwiOiBfc2NvcGUuc3RhdGUuaSArIDFcbiAgICAgIH0pXG4gICAgfV1cbiAgfSwge1xuICAgIHJlZHVuZGFudEF0dHJpYnV0ZTogJ2V4cHIzNycsXG4gICAgc2VsZWN0b3I6ICdbZXhwcjM3XScsXG4gICAgZXhwcmVzc2lvbnM6IFt7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuVEVYVCxcbiAgICAgIGNoaWxkTm9kZUluZGV4OiAwLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBbTWF0aC5yb3VuZChfc2NvcGUuc3RhdGUuaSAvIF9zY29wZS5zdGF0ZS5uICogMTAwKSwgJyAlJ10uam9pbignJylcbiAgICB9LCB7XG4gICAgICB0eXBlOiBleHByZXNzaW9uVHlwZXMuQVRUUklCVVRFLFxuICAgICAgbmFtZTogJ3ZhbHVlJyxcbiAgICAgIGV2YWx1YXRlOiBfc2NvcGUgPT4gX3Njb3BlLnN0YXRlLmkgKyAxXG4gICAgfSwge1xuICAgICAgdHlwZTogZXhwcmVzc2lvblR5cGVzLkFUVFJJQlVURSxcbiAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgZXZhbHVhdGU6IF9zY29wZSA9PiBfc2NvcGUuc3RhdGUublxuICAgIH1dXG4gIH1dKSxcbiAgbmFtZTogJ2hlbHAtcG9wdXAnXG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4gXHUzMDU5XHUzMDc5XHUzMDY2XHUzMDZFIHJpb3QgXHUzMEJGXHUzMEIwXHUzMDkyIHJlZ2lzdGVyIFx1MzA1OVx1MzA4QlxyXG4gXHU2NUIwXHUzMDU3XHUzMDQ0XHUzMEJGXHUzMEIwXHUzMDkyXHU4RkZEXHU1MkEwXHUzMDU3XHUzMDVGXHU1ODM0XHU1NDA4XHUzMDZCXHUzMDZGXHUzMDUzXHUzMDZFXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDgyXHU3REU4XHU5NkM2XHUzMDRDXHU1RkM1XHU4OTgxXHJcblxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcmVnaXN0ZXJBbGxUYWdzKHJpb3QpIHtcbiAgaW5zdGFsbFBsdWdpbnMocmlvdCk7XG4gIGxldCB0YWdzID0gW3QxLCB0MiwgdDMsIHQ0LCB0NSwgdDZdO1xuICBmb3IgKGxldCB0YWcgb2YgdGFncykgcmlvdC5yZWdpc3Rlcih0YWcubmFtZSwgdGFnKTtcbiAgcmV0dXJuIHRhZ3M7XG59XG5mdW5jdGlvbiBpbnN0YWxsUGx1Z2lucyhyaW90KSB7XG4gIC8vIHN0eWxlQXR0cmlidXRlIFx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1MzA5Mlx1MzBBNFx1MzBGM1x1MzBCOVx1MzBDOFx1MzBGQ1x1MzBFQlxuICAvLyBodHRwczovL3Jpb3QuanMub3JnL2phL21pZ3JhdGlvbi1ndWlkZS9cbiAgcmlvdC5pbnN0YWxsKGNvbXBvbmVudCA9PiB7XG4gICAgY29tcG9uZW50LnN0eWxlQXR0cmlidXRlID0gYXR0cmlidXRlcyA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykucmVkdWNlKChhY2MsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gaXRlbTtcbiAgICAgICAgcmV0dXJuIFsuLi5hY2MsIGAke2tleX06ICR7dmFsdWV9YF07XG4gICAgICB9LCBbXSkuam9pbignOycpO1xuICAgIH07XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfSk7XG5cbiAgLy8gXHUzMEM5XHUzMEU5XHUzMEMzXHUzMEIwXHU1MkQ1XHU0RjVDXHUzMDkyXHU3QzIxXHU1MzU4XHUzMDZCXHU1QjlBXHU3RkE5XHUzMDY3XHUzMDREXHUzMDhCXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU5XHUzMDhCXG4gIHJpb3QuaW5zdGFsbChjb21wb25lbnQgPT4ge1xuICAgIGNvbXBvbmVudC5kZWZpbmVEcmFnQmVoYXZpb3IgPSAoY3RybCwgaGFuZGxlcnMpID0+IHtcbiAgICAgIGxldCBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIGxldCBtb3VzZVgsIG1vdXNlWTtcbiAgICAgIGN0cmwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGUgPT4ge1xuICAgICAgICBpZiAoIWlzTmFOKGUucG9pbnRlcklkKSkgY3RybC5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgICAgIGxldCBjcmVjdCA9IGN0cmwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIFttb3VzZVgsIG1vdXNlWV0gPSBbZS5jbGllbnRYIC0gY3JlY3QubGVmdCB8IDAsIGUuY2xpZW50WSAtIGNyZWN0LnRvcCB8IDBdOyAvLyB8IDAgXHUzMDY3XHU2NTc0XHU2NTcwXHUzMDZCXHU3NkY0XHUzMDU3XHUzMDY2XHUzMDhCXG4gICAgICAgIG1vdXNlRG93biA9IHRydWU7XG4gICAgICAgIGlmIChoYW5kbGVycy5kb3duKSBoYW5kbGVycy5kb3duKGUsIG1vdXNlWCwgbW91c2VZKTtcbiAgICAgIH0pO1xuICAgICAgY3RybC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgZSA9PiB7XG4gICAgICAgIGxldCBjcmVjdCA9IGN0cmwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIFtuZXdYLCBuZXdZXSA9IFtlLmNsaWVudFggLSBjcmVjdC5sZWZ0IHwgMCwgZS5jbGllbnRZIC0gY3JlY3QudG9wIHwgMF07IC8vIHwgMCBcdTMwNjdcdTY1NzRcdTY1NzBcdTMwNkJcdTc2RjRcdTMwNTdcdTMwNjZcdTMwOEJcbiAgICAgICAgaWYgKGhhbmRsZXJzLm1vdmUpIGhhbmRsZXJzLm1vdmUoZSwgbW91c2VEb3duLCBuZXdYLCBuZXdZLCBtb3VzZVgsIG1vdXNlWSk7XG4gICAgICAgIFttb3VzZVgsIG1vdXNlWV0gPSBbbmV3WCwgbmV3WV07XG4gICAgICB9KTtcbiAgICAgIGN0cmwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIWlzTmFOKGUucG9pbnRlcklkKSkgY3RybC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgaWYgKGhhbmRsZXJzLnVwKSBoYW5kbGVycy51cChlLCBtb3VzZVgsIG1vdXNlWSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH0pO1xufVxuXG5leHBvcnQgeyByZWdpc3RlckFsbFRhZ3MgfTtcbiIsICJpbXBvcnQgKiBhcyByaW90IGZyb20gJ3Jpb3QnXHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsLmpzJ1xyXG5cclxuaW1wb3J0IHsgQ2FudmFzUmVuZGVyZXIgfSBmcm9tICcuL2NhbnZhcy1yZW5kZXJlci5qcydcclxuaW1wb3J0IHsgaW50ZXJhY3Rpb25TZXRzIH0gZnJvbSAnLi9pbnRlcmFjdGlvbi1zZXRzLmpzJ1xyXG5pbXBvcnQgeyBDb2xvclNjYWxlLCBjb2xvclNjYWxlTGlzdCB9IGZyb20gXCIuL2NvbG9yLXNjYWxlLmpzXCJcclxuaW1wb3J0IHsgUExTcGVjaWVzRGlzdHJpYnV0aW9uIH0gZnJvbSAnLi9wbC1zcGVjaWVzLWRpc3RyaWJ1dGlvbi5qcydcclxuaW1wb3J0IHsgUGFydGljbGVMaWZlIH0gZnJvbSAnLi9wYXJ0aWNsZS1saWZlLmpzJ1xyXG5pbXBvcnQgeyBYb3JTaGlmdDEyOCB9IGZyb20gJy4veG9yc2hpZnQxMjguanMnXHJcblxyXG4vLyBcdTMwNTlcdTMwNzlcdTMwNjZcdTMwNkVcdTMwQkZcdTMwQjBcdTMwOTJcdTU0MkJcdTMwODFcdTMwQjNcdTMwRjNcdTMwRDFcdTMwQTRcdTMwRUJcdTMwNTVcdTMwOENcdTMwNUZcdTMwODJcdTMwNkVcdTMwOTIgb2JqIFx1MzA0Qlx1MzA4OVx1OEFBRFx1MzA3Rlx1OEZCQ1x1MzA4MFxyXG5pbXBvcnQgeyByZWdpc3RlckFsbFRhZ3MgfSBmcm9tICcuLi9vYmovcmlvdF90YWdzLmpzJ1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcblxyXG4gIC8vIFx1MzBCMFx1MzBFRFx1MzBGQ1x1MzBEMFx1MzBFQlx1NTkwOVx1NjU3MFx1MzA5Mlx1OEEyRFx1NUI5QVxyXG4gIGxldCB3YXNtID0gYXdhaXQgdXRpbC5sb2FkV2FzbSgncGFydGljbGUtbGlmZS53YXNtJyk7XHJcbiAgd2luZG93Lndhc20gPSB3YXNtO1xyXG4gIHdpbmRvdy51dGlsID0gdXRpbDtcclxuICB3aW5kb3cuUExTcGVjaWVzRGlzdHJpYnV0aW9uID0gUExTcGVjaWVzRGlzdHJpYnV0aW9uO1xyXG5cclxuICAvLyByaW90IFx1MzBCRlx1MzBCMFx1MzA5Mlx1OEFBRFx1MzA3Rlx1OEZCQ1x1MzA3RlxyXG4gIHJlZ2lzdGVyQWxsVGFncyhyaW90KTtcclxuXHJcbiAgLy8gYm9keSBcdTMwNkVcdTZBMkFcdTVFNDUoXHUzMEI5XHUzMEFGXHUzMEVEXHUzMEZDXHUzMEVCXHUzMEQwXHUzMEZDXHUzMDkyXHU5NjY0XHUzMDQ0XHUzMDVGXHU1MDI0KVx1MzA5MiBcclxuICAvLyBDU1MgXHUzMDRCXHUzMDg5IHZhcigtLTEwMHZ3KSBcdTMwNjdcdTRGN0ZcdTMwNDhcdTMwOEJcdTMwODhcdTMwNDZcdTMwNkJcdTMwNTlcdTMwOEJcclxuXHJcbiAgY29uc3QgbWVhc3VyZVdpbmRvd1NpemUgPSAoKT0+XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoJy0tMTAwdncnLCBgJHtkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRofXB4YCk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBtZWFzdXJlV2luZG93U2l6ZSk7XHJcbiAgbWVhc3VyZVdpbmRvd1NpemUoKTtcclxuICBcclxuICAvLyBcdTMwQjNcdTMwRjNcdTMwRERcdTMwRkNcdTMwQ0RcdTMwRjNcdTMwQzhcdTMwOTJcdTY5Q0JcdTYyMTBcdTMwNTlcdTMwOEJcclxuXHJcbiAgbGV0IHdvcmxkO1xyXG4gIGxldCBjb2xvckZ1bmMgPSBudWxsO1xyXG4gIFxyXG4gIGxldCBkaXNwbGF5ID0gcmlvdC5tb3VudChcInBhcnRpY2xlcy1kaXNwbGF5XCIpWzBdO1xyXG4gIGRpc3BsYXkud29ybGQgPSAoKSA9PiB3b3JsZDtcclxuICBkaXNwbGF5LmNvbG9yRnVuYyA9ICgpID0+IGNvbG9yRnVuYztcclxuICBcclxuICBsZXQgY29sb3JTY2FsZUVkaXRvciA9IHJpb3QubW91bnQoXHJcbiAgICAgIFwiY29sb3Itc2NhbGUtZWRpdG9yXCIsIFxyXG4gICAgICB7Y29sb3JTY2FsZUxpc3Q6IGNvbG9yU2NhbGVMaXN0fVxyXG4gIClbMF07XHJcbiAgXHJcbiAgXHJcbiAgbGV0IGludF9lZGl0b3IgPSByaW90Lm1vdW50KFwiaW50ZXJhY3Rpb24tZWRpdG9yXCIpWzBdO1xyXG4gIFxyXG4gIGludF9lZGl0b3IuY29sb3JTY2FsZSA9ICAgXHJcbiAgICAgIG5ldyBDb2xvclNjYWxlKFsgIC8vIGhlYXRcclxuICAgICAgICBbMC80LCAgIDAsIDI1NSwgMjU1IF0sXHJcbiAgICAgICAgWzEvNCwgICAwLCAgIDAsIDE5MiBdLFxyXG4gICAgICAgIFsyLzQsICAgMCwgICAwLCAgIDAgXSxcclxuICAgICAgICBbMy80LCAxOTIsICAgMCwgICAwIF0sXHJcbiAgICAgICAgWzQvNCwgMjU1LCAyNTUsICAgMCBdLFxyXG4gICAgICBdKTtcclxuXHJcbiAgY29uc3QgY29udHJvbHMgPSByaW90Lm1vdW50KCdwbGNvbnRyb2xzJywgXHJcbiAgICAgICAgICB7cmVjb21tZW5kYXRpb25zOiBhd2FpdCAoYXdhaXQgZmV0Y2goJ3JlY29tbWVuZGF0aW9ucy5qc29uJykpLmpzb24oKX0pWzBdO1xyXG5cclxuICBjb250cm9scy5hZGRFdmVudExpc3RlbmVyKFwidXBkYXRlXCIsIChlKSA9PiB7XHJcbiAgICBpZih3b3JsZCkgd29ybGQudXBkYXRlKGUuZGV0YWlsKTtcclxuICAgIGNvbG9yU2NhbGVFZGl0b3IudXBkYXRlKGUuZGV0YWlsLnBhbGV0dGVTZXR0aW5nKTtcclxuICAgIGRpc3BsYXkudXBkYXRlKHt0YWlsOiBlLmRldGFpbC50YWlsLCBzY3JlZW46IGUuZGV0YWlsLnNjcmVlbiwgcGFydGljbGVTaXplOiBlLmRldGFpbC5wYXJ0aWNsZVNpemV9KTtcclxuICAgIHJlbmRlcmVyLm1heEZwcyA9IGUuZGV0YWlsLm1heGZwcztcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvbG9yLXNjYWxlLWVkaXRvcicpLnN0eWxlLmRpc3BsYXkgPSBlLmRldGFpbC5zaG93UGFsZXR0ZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgfSk7XHJcblxyXG4gIGNvbG9yU2NhbGVFZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcInVwZGF0ZVwiLCBlID0+IHtcclxuICAgIGNvbG9yRnVuYyA9IGUuZGV0YWlsO1xyXG4gICAgaW50X2VkaXRvci51cGRhdGUoKTtcclxuICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICBpZighY29sb3JTY2FsZUVkaXRvci5zdGF0ZS5tb3VzZURvd24pIHtcclxuICAgICAgY29udHJvbHMuc3RhdGUucGFsZXR0ZVNldHRpbmcgPSBjb2xvclNjYWxlRWRpdG9yLnN0YXRlO1xyXG4gICAgICBjb250cm9scy51cGRhdGVVUkwoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3QgZnBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZwcycpO1xyXG4gIGNvbnN0IHJlbmRlciA9ICgpPT4ge1xyXG4gICAgd29ybGQuaW50ZXJhY3RQYXJ0aWNsZXMoKTtcclxuICAgIHdvcmxkLnJlcGVsUGFydGljbGVzKGRpc3BsYXkuc3RhdGUucmVwZWxYLCBkaXNwbGF5LnN0YXRlLnJlcGVsWSk7XHJcbiAgICB3b3JsZC5tb3ZlUGFydGljbGVzKCk7XHJcbiAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgZnBzLmlubmVyVGV4dCA9IGAke1N0cmluZyhyZW5kZXJlci5mcHMpLnNsaWNlKDAsIDQpfSBmcHNgO1xyXG4gIH1cclxuICBjb25zdCByZW5kZXJlciA9IG5ldyBDYW52YXNSZW5kZXJlcihkaXNwbGF5LiQoJ2NhbnZhcycpLCByZW5kZXIsIGV4cG9ydFZpZCk7XHJcblxyXG4gIGNvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gIGNvbG9yU2NhbGVFZGl0b3IudXBkYXRlKCk7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVdvcmxkID0gKCkgPT4ge1xyXG4gICAgb3B0aW9ucyA9IGNvbnRyb2xzLnN0YXRlO1xyXG4gICAgaWYoIXdvcmxkKSB7XHJcbiAgICAgIHdvcmxkID0gbmV3IFBhcnRpY2xlTGlmZShvcHRpb25zLCBuZXcgWG9yU2hpZnQxMjgob3B0aW9ucy53b3JsZF9zZWVkKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgd29ybGQudXBkYXRlKG9wdGlvbnMsIG5ldyBYb3JTaGlmdDEyOChvcHRpb25zLndvcmxkX3NlZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBcdTc2RjhcdTRFOTJcdTRGNUNcdTc1MjhcdTMwOTJcdTYzMDdcdTVCOUFcdTMwNTlcdTMwOEJcclxuICAgIGludGVyYWN0aW9uU2V0c1tvcHRpb25zLmludHNldF0od29ybGQuaW50ZXJhY3Rpb24sIG5ldyBYb3JTaGlmdDEyOChvcHRpb25zLmludGVyYWN0X3NlZWQpKTtcclxuXHJcbiAgICAvLyBcdTdDOTJcdTVCNTBcdTdBMkVcdTMwNkJcdTUwNEZcdTMwOEFcdTMwOTJcdTYzMDFcdTMwNUZcdTMwNUJcdTMwOEJcdTMwNUZcdTMwODFcdTMwNkVcdTc4QkFcdTczODdcdTUyMDZcdTVFMDNcdTMwNkVcdTdEMkZcdTdBNERcdTMwOTJcdTRGNUNcdTMwOEJcclxuICAgIGxldCBkaXN0cmlidXRpb24gPSBuZXcgUExTcGVjaWVzRGlzdHJpYnV0aW9uKHdvcmxkLm5zcGVjaWVzLCB3b3JsZC5yYW5kKTtcclxuXHJcbiAgICAvLyBcdTdDOTJcdTVCNTBcdTMwNkVcdTUyMURcdTY3MUZcdTkxNERcdTdGNkVcdTMwOTJcdTZDN0FcdTMwODFcdTMwOEJcclxuICAgIHdvcmxkLnNldHVwUGFydGljbGVzKCAoaSwgaikgPT4gW1xyXG4gICAgICAvLyBcdTY3MkNcdTVGNTNcdTMwNkYgd29ybGQubmxhdHRpY2UgXHUzMDY3XHU1MjcyXHUzMDhCXHUzMDc5XHUzMDREXHUzMDZBXHUzMDZFXHUzMDYwXHUzMDUxXHUzMDhDXHUzMDY5XHU0RTkyXHU2M0RCXHU2MDI3XHUzMDZFXHUzMDVGXHUzMDgxXHUzMDUzXHUzMDZFXHUzMDdFXHUzMDdFXHJcbiAgICAgIGRpc3RyaWJ1dGlvbi5zcGVjaWVzKHdvcmxkLnJhbmQubmV4dCgpKSxcclxuICAgICAgaSAvICh3b3JsZC5ubGF0dGljZSAtIDEpIC0gMC41ICsgMC4yICogKHdvcmxkLnJhbmQubmV4dCgpIC0gMC41KSwgIC8vIHhcclxuICAgICAgaiAvICh3b3JsZC5ubGF0dGljZSAtIDEpIC0gMC41ICsgMC4yICogKHdvcmxkLnJhbmQubmV4dCgpIC0gMC41KSwgIC8vIHlcclxuICAgICAgMCwgMCAgLy8gdngsIHZ5XHJcbiAgICBdKTtcclxuXHJcbiAgICByZXR1cm4gd29ybGQ7XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHJlc3RhcnQgPSAocmFuZG9taXplID0gZmFsc2UpID0+IHtcclxuICAgIGlmKHJhbmRvbWl6ZSkge1xyXG4gICAgICBjb250cm9scy5zdGF0ZS5pbnRlcmFjdF9zZWVkID0gMioqNTYgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICBjb250cm9scy5zdGF0ZS53b3JsZF9zZWVkID0gMioqNTYgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICBjb250cm9scy51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXRpbC5kZXN0cnVjdCh3b3JsZCk7XHJcbiAgICBjcmVhdGVXb3JsZCgpO1xyXG4gICAgaW50X2VkaXRvci53b3JsZCA9IHdvcmxkO1xyXG4gICAgaW50X2VkaXRvci5jb2xvckZ1bmMgPSAoeCk9PiBjb2xvckZ1bmMoeCk7XHJcbiAgICBpbnRfZWRpdG9yLnVwZGF0ZSgpO1xyXG4gICAgcmVuZGVyZXIuc3RhcnQoKTtcclxuICAgIGRpc3BsYXkuaW5pdGlhbGl6ZVJlcXVpcmVkID0gdHJ1ZTtcclxuICB9XHJcbiAgXHJcbiAgcmVzdGFydCgpO1xyXG4gIFxyXG4gIGNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCAoZSkgPT4ge1xyXG4gICAgaWYoZS5kZXRhaWwucGF1c2UpIHtcclxuICAgICAgcmVuZGVyZXIuc3RvcCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVuZGVyZXIuc3RhcnQoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcihcInJlY29yZFwiLCAoZSkgPT4ge1xyXG4gICAgaWYoZS5kZXRhaWwucmVjb3JkaW5nKSB7XHJcbiAgICAgIHJlbmRlcmVyLnN0YXJ0UmVjb3JkaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZW5kZXJlci5zdG9wUmVjb3JkaW5nKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXN0YXJ0XCIsICgpID0+IHtcclxuICAgIHJlbmRlcmVyLnN0b3AoKTtcclxuICAgIHJlc3RhcnQoKTtcclxuICB9KTtcclxuXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctd29ybGRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgcmVuZGVyZXIuc3RvcCgpO1xyXG4gICAgcmVzdGFydCh0cnVlKTtcclxuICB9KTtcclxuICBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3ctZWRpdG9yXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JsZC1lZGl0b3JcIikuc3R5bGU7XHJcbiAgICBpZihzdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgIHN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JsZC1lZGl0b3JcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29weS11cmxcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQobG9jYXRpb24uaHJlZik7XHJcbiAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAoKT0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29weS11cmwtbWVzc2FnZVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiLFxyXG4gICAgICAxMDBcclxuICAgICk7XHJcbiAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAoKT0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29weS11cmwtbWVzc2FnZVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIsXHJcbiAgICAgIDE2MDBcclxuICAgICk7XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3B5LXVybC1tZXNzYWdlXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgY29uc3QgaGVscFBvcHVwID0gcmlvdC5tb3VudChcImhlbHAtcG9wdXBcIilbMF07XHJcbiAgbGV0IGhlbHAgPSBcIlwiO1xyXG4gIGhlbHBQb3B1cC5tZXNzYWdlcy5mb3JFYWNoKCAobWVzc2FnZSkgPT4ge1xyXG4gICAgaGVscCArPSBcIjxsaT5cIiArIG1lc3NhZ2VbMF0uc3BsaXQoLzxicj5bXFxzXFxuXSo8YnI+Lykuam9pbihcIjwvbGk+PGxpPlwiKSArIFwiPC9saT5cIjtcclxuICB9KTtcclxuICBjb25zdCBoZWxwTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVscC1saXN0XCIpLmlubmVySFRNTCA9IGhlbHA7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gIG1haW4oKVxyXG59KVxyXG5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLy8gXHU5MzMyXHU3NTNCXHUzMEM3XHUzMEZDXHUzMEJGXHUzMDkyIEJsb2IgXHUzMDY4XHUzMDU3XHUzMDY2XHU1M0Q3XHUzMDUxXHU1M0Q2XHUzMDhBXHU4ODY4XHU3OTNBXHUzMDU5XHUzMDhCXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmZ1bmN0aW9uIGV4cG9ydFZpZChibG9iKSB7XHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvJyk7XHJcbiAgd2hpbGUoZGl2LmZpcnN0Q2hpbGQpXHJcbiAgICBkaXYucmVtb3ZlQ2hpbGQoIGRpdi5maXJzdENoaWxkICk7ICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuXHJcblxyXG4gIGNvbnN0IHZpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgdmlkLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgdmlkLmNvbnRyb2xzID0gdHJ1ZTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmlkKTtcclxuXHJcbiAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xyXG5cclxuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gIGEuZG93bmxvYWQgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpICsgJy53ZWJtJztcclxuICBhLmhyZWYgPSB2aWQuc3JjO1xyXG4gIGEudGV4dENvbnRlbnQgPSAnZG93bmxvYWQgdGhlIHZpZGVvJztcclxuICBkaXYuYXBwZW5kQ2hpbGQoYSk7XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gXHU1QzExXHUzMDU3XHU1Rjg1XHUzMDYzXHUzMDY2XHUzMDRCXHUzMDg5XHUzMDU4XHUzMDgzXHUzMDZBXHUzMDQ0XHUzMDY4IHNjcm9sbCB0byBib3R0b20gXHUzMDRDXHUzMDQ2XHUzMDdFXHUzMDRGXHU4ODRDXHUzMDRCXHUzMDZBXHUzMDQ0XHJcbiAgICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgdmFyIGJvdHRvbSA9IGRvYy5zY3JvbGxIZWlnaHQgLSBkb2MuY2xpZW50SGVpZ2h0O1xyXG4gICAgd2luZG93LnNjcm9sbCgwLCBib3R0b20pO1xyXG4gIH0sIDEwMCk7XHJcbn1cclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDR0EsTUFBTSxnQ0FBZ0Msb0JBQUksSUFBSTtBQUE5QyxNQUNFLGtDQUFrQyxPQUFPLGdCQUFnQjtBQUQzRCxNQUVFLGNBQWMsb0JBQUksSUFBSTtBQUZ4QixNQUdFLGVBQWU7QUFIakIsTUFJRSxtQkFBbUI7QUFKckIsTUFLRSxvQkFBb0I7QUFMdEIsTUFNRSxxQkFBcUI7QUFOdkIsTUFPRSxvQkFBb0I7QUFQdEIsTUFRRSxzQkFBc0I7QUFSeEIsTUFTRSxpQkFBaUI7QUFUbkIsTUFVRSx1QkFBdUI7QUFWekIsTUFXRSxpQkFBaUI7QUFYbkIsTUFZRSx3QkFBd0I7QUFaMUIsTUFhRSxtQkFBbUI7QUFickIsTUFjRSxZQUFZO0FBZGQsTUFlRSxZQUFZO0FBZmQsTUFnQkUsWUFBWTtBQWhCZCxNQWlCRSxXQUFXO0FBakJiLE1Ba0JFLGlCQUFpQixPQUFPLE1BQU07QUFsQmhDLE1BbUJFLHdCQUF3QixPQUFPLGFBQWE7QUFuQjlDLE1Bb0JFLG9CQUFvQixPQUFPLFFBQVE7QUFwQnJDLE1BcUJFLHdCQUF3QixPQUFPLFlBQVk7QUFy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QUFLLEdBQUssR0FBSyxDQUFFO0FBQUEsTUFDcEIsQ0FBQyxJQUFFLEdBQUcsS0FBTyxHQUFLLENBQUU7QUFBQSxNQUNwQixDQUFDLElBQUUsR0FBRyxLQUFLLEtBQU8sQ0FBRTtBQUFBLElBQ3RCLENBQUM7QUFBQSxJQUNELElBQUksV0FBVztBQUFBO0FBQUEsTUFDYixDQUFDLElBQUUsR0FBSyxHQUFHLEtBQUssR0FBSTtBQUFBLE1BQ3BCLENBQUMsSUFBRSxHQUFLLEdBQUssR0FBRyxHQUFJO0FBQUEsTUFDcEIsQ0FBQyxJQUFFLEdBQUcsS0FBSyxLQUFLLEdBQUk7QUFBQSxNQUNwQixDQUFDLElBQUUsR0FBRyxLQUFPLEdBQUssQ0FBRTtBQUFBLE1BQ3BCLENBQUMsSUFBRSxHQUFHLEtBQUssS0FBTyxDQUFFO0FBQUEsSUFDdEIsQ0FBQztBQUFBLElBQ0QsSUFBSSxXQUFXO0FBQUE7QUFBQSxNQUNiLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLE1BQ3hDLENBQUMsSUFBRSxHQUFHLEdBQUcsV0FBVyxRQUFRLElBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLElBQzFDLENBQUM7QUFBQSxJQUNELElBQUksV0FBVztBQUFBO0FBQUEsTUFDYixD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LFFBQVEsTUFBTTtBQUNwQyxTQUFLO0FBQUEsRUFDUCxDQUFDO0FBTUQsV0FBUyxVQUFVLE1BQU07QUFDdkIsVUFBTSxNQUFNLFNBQVMsZUFBZSxPQUFPO0FBQzNDLFdBQU0sSUFBSTtBQUNSLFVBQUksWUFBYSxJQUFJLFVBQVc7QUFFbEMsVUFBTSxNQUFNLFNBQVMsY0FBYyxPQUFPO0FBQzFDLFFBQUksTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQ2xDLFFBQUksV0FBVztBQUNmLFFBQUksWUFBWSxHQUFHO0FBRW5CLFFBQUksWUFBWSxTQUFTLGNBQWMsSUFBSSxDQUFDO0FBRTVDLFVBQU1DLEtBQUksU0FBUyxjQUFjLEdBQUc7QUFDcEMsSUFBQUEsR0FBRSxXQUFXLFNBQVMsT0FBTyxPQUFPLENBQUMsSUFBSTtBQUN6QyxJQUFBQSxHQUFFLE9BQU8sSUFBSTtBQUNiLElBQUFBLEdBQUUsY0FBYztBQUNoQixRQUFJLFlBQVlBLEVBQUM7QUFFakIsZUFBVyxNQUFNO0FBRWYsVUFBSSxNQUFNLFNBQVM7QUFDbkIsVUFBSSxTQUFTLElBQUksZUFBZSxJQUFJO0FBQ3BDLGFBQU8sT0FBTyxHQUFHLE1BQU07QUFBQSxJQUN6QixHQUFHLEdBQUc7QUFBQSxFQUNSOyIsCiAgIm5hbWVzIjogWyJvcHRpb25zIiwgImEiLCAiYiIsICJnZXQiLCAibW91bnQiLCAib3B0aW9ucyIsICJleHByZXNzaW9ucyIsICJjb21wb25lbnQiLCAiYmluZGluZ3MiLCAiY29tcG9uZW50IiwgImNvbXBvbmVudCIsICJleHByZXNzaW9ucyIsICJhIiwgImNvbXBvbmVudCIsICJjb21wb25lbnQiLCAiY29tcG9uZW50IiwgImNvbXBvbmVudCIsICJjb21wb25lbnQiLCAib3B0aW9ucyIsICJ3YXNtIiwgInRzIiwgImIiLCAiUExTcGVjaWVzRGlzdHJpYnV0aW9uIiwgIndvcmxkIiwgImEiLCAiYiIsICJqIiwgInJlZ2lzdGVyIiwgIm9wdGlvbnMiLCAibmV3WCIsICJuZXdZIiwgIndvcmxkIiwgImNvbG9yRnVuYyIsICJleHByZXNzaW9uVHlwZXMiLCAiYmluZGluZ1R5cGVzIiwgIm9wdGlvbnMiLCAiYSIsICJiIiwgImNvbXBvbmVudCIsICJ3YXNtIiwgIlBMU3BlY2llc0Rpc3RyaWJ1dGlvbiIsICJ3b3JsZCIsICJjb2xvckZ1bmMiLCAiYSJdCn0K
