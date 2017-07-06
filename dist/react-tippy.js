(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("popper.js"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define("reactTippy", ["react", "popper.js", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["reactTippy"] = factory(require("react"), require("popper.js"), require("react-dom"));
	else
		root["reactTippy"] = factory(root["React"], root["Popper"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_35__, __WEBPACK_EXTERNAL_MODULE_36__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Browser = exports.Browser = {};

if (typeof window !== 'undefined') {
    Browser.SUPPORTED = !!window.requestAnimationFrame;
    Browser.SUPPORTS_TOUCH = 'ontouchstart' in window;
    Browser.touch = false;
    Browser.dynamicInputDetection = true;
    // Chrome device/touch emulation can make this dynamic
    Browser.iOS = function () {
        return (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream
        );
    };
}

/**
* The global storage array which holds all data reference objects
* from every instance
* This allows us to hide tooltips from all instances, finding the ref when
* clicking on the body, and for followCursor
*/
var Store = exports.Store = [];

/**
* Selector constants used for grabbing elements
*/
var Selectors = exports.Selectors = {
    POPPER: '.tippy-popper',
    TOOLTIP: '.tippy-tooltip',
    CONTENT: '.tippy-tooltip-content',
    CIRCLE: '[x-circle]',
    ARROW: '[x-arrow]',
    TOOLTIPPED_EL: '[data-tooltipped]',
    CONTROLLER: '[data-tippy-controller]'

    /**
    * The default settings applied to each instance
    */
};var Defaults = exports.Defaults = {
    html: false,
    position: 'top',
    animation: 'shift',
    animateFill: true,
    arrow: false,
    arrowSize: 'regular',
    delay: 0,
    trigger: 'mouseover focus',
    duration: 350,
    interactive: false,
    interactiveBorder: 2,
    theme: 'dark',
    size: 'regular',
    distance: 10,
    offset: 0,
    hideOnClick: true,
    multiple: false,
    followCursor: false,
    inertia: false,
    flipDuration: 350,
    sticky: false,
    stickyDuration: 200,
    appendTo: null,
    zIndex: 9999,
    touchHold: false,
    performance: false,
    useContext: false,
    reactInstance: undefined,
    popperOptions: {},
    open: undefined,
    onRequestClose: function onRequestClose() {}

    /**
    * The keys of the defaults object for reducing down into a new object
    * Used in `getIndividualSettings()`
    */
};var DefaultsKeys = exports.DefaultsKeys = Browser.SUPPORTED && Object.keys(Defaults);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prefix;
/**
* Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
* @param {String} property
* @return {String} - browser supported prefixed property
*/
function prefix(property) {
    var prefixes = [false, 'webkit'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
        var _prefix = prefixes[i];
        var prefixedProp = _prefix ? '' + _prefix + upperProp : property;
        if (typeof window.document.body.style[prefixedProp] !== 'undefined') {
            return prefixedProp;
        }
    }

    return null;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;
/**
* Ponyfill for Array.prototype.find
* @param {Array} arr
* @param {Function} checkFn
* @return item in the array
*/
function find(arr, checkFn) {
  if (Array.prototype.find) {
    return arr.find(checkFn);
  }

  // use `filter` as fallback
  return arr.filter(checkFn)[0];
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getCorePlacement;
/**
* Returns the non-shifted placement (e.g., 'bottom-start' => 'bottom')
* @param {String} placement
* @return {String}
*/
function getCorePlacement(placement) {
    return placement.replace(/-.+/, '');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isVisible;
/**
* Determines if a popper is currently visible
* @param {Element} popper
* @return {Boolean}
*/
function isVisible(popper) {
    return popper.style.visibility === 'visible';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _tippy = __webpack_require__(27);

var _tippy2 = _interopRequireDefault(_tippy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  html: null,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  delay: 0,
  hideDelay: 0,
  trigger: 'mouseover focus',
  duration: 375,
  hideDuration: 375,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  popperOptions: {},
  beforeShown: function beforeShown() {},
  shown: function shown() {},
  beforeHidden: function beforeHidden() {},
  hidden: function hidden() {},
  disabled: false,
  arrowSize: 'regular',
  size: 'regular',
  className: '',
  style: {},
  distance: 10,
  onRequestClose: function onRequestClose() {},
  sticky: false,
  stickyDuration: 200,
  unmountHTMLWhenHide: false
};

var propKeys = Object.keys(defaultProps);

var detectPropsChanged = function detectPropsChanged(props, prevProps) {
  var result = [];
  propKeys.forEach(function (key) {
    if (props[key] !== prevProps[key]) {
      result.push(key);
    }
  });
  return result;
};

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.initTippy = _this._initTippy.bind(_this);
    _this.destroyTippy = _this._destroyTippy.bind(_this);
    _this.updateTippy = _this._updateTippy.bind(_this);
    _this.updateReactDom = _this._updateReactDom.bind(_this);
    _this.showTooltip = _this._showTooltip.bind(_this);
    _this.hideTooltip = _this._hideTooltip.bind(_this);
    _this.updateSettings = _this._updateSettings.bind(_this);
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.initTippy();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.destroyTippy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // enable and disabled
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.props.disabled === false && prevProps.disabled === true) {
        this.updateSettings('disabled', false);
        this.destroyTippy();
        this.initTippy();
        return;
      }

      if (this.props.disabled === true && prevProps.disabled === false) {
        this.updateSettings('disabled', true);
        this.destroyTippy();
        return;
      }

      // open
      if (this.props.open === true && !prevProps.open) {
        this.updateSettings('open', true);
        setTimeout(function () {
          _this2.showTooltip();
        }, 0);
        return;
      }
      if (this.props.open === false && prevProps.open === true) {
        this.updateSettings('open', false);
        this.hideTooltip();
        return;
      }

      if (this.props.html !== prevProps.html) {
        this.updateReactDom();
        return;
      }

      // Update content
      if (this.props.title !== prevProps.title) {
        this.updateTippy();
        return;
      }

      // update otherProps
      var propChanges = detectPropsChanged(this.props, prevProps);
      propChanges.forEach(function (key) {
        _this2.updateSettings(key, _this2.props[key]);
      });
    }
  }, {
    key: '_showTooltip',
    value: function _showTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.show(popper, this.props.duration);
      }
    }
  }, {
    key: '_hideTooltip',
    value: function _hideTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.hide(popper, this.props.hideDuration);
      }
    }
  }, {
    key: '_updateSettings',
    value: function _updateSettings(name, value) {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.updateSettings(popper, name, value);
      }
    }
  }, {
    key: '_updateReactDom',
    value: function _updateReactDom() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        this.updateSettings('ReactDOM', this.props.html);
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        var isVisible = popper.style.visibility === 'visible' || this.props.open;
        if (isVisible) {
          this.tippy.updateForReact(popper, this.props.html);
        }
      }
    }
  }, {
    key: '_updateTippy',
    value: function _updateTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.update(popper);
      }
    }
  }, {
    key: '_initTippy',
    value: function _initTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (!this.props.disabled) {
        this.tooltipDOM.setAttribute('title', this.props.title);
        this.tippy = (0, _tippy2.default)(this.tooltipDOM, {
          disabled: this.props.disabled,
          position: this.props.position,
          animation: this.props.animation,
          animateFill: this.props.animateFill,
          arrow: this.props.arrow,
          arrowSize: this.props.arrowSize,
          delay: this.props.delay,
          hideDelay: this.props.hideDelay,
          trigger: this.props.trigger,
          duration: this.props.duration,
          hideDuration: this.props.hideDuration,
          interactive: this.props.interactive,
          interactiveBorder: this.props.interactiveBorder,
          theme: this.props.theme,
          offset: this.props.offset,
          hideOnClick: this.props.hideOnClick,
          multiple: this.props.multiple,
          size: this.props.size,
          followCursor: this.props.followCursor,
          inertia: this.props.inertia,
          popperOptions: this.props.popperOptions,
          beforeShown: this.props.beforeShown,
          shown: this.props.shown,
          beforeHidden: this.props.beforeHidden,
          hidden: this.props.hidden,
          distance: this.props.distance,
          reactDOM: this.props.html,
          unmountHTMLWhenHide: this.props.unmountHTMLWhenHide,
          open: this.props.open,
          sticky: this.props.sticky,
          stickyDuration: this.props.stickyDuration,
          onRequestClose: this.props.onRequestClose,
          useContext: this.props.useContext,
          reactInstance: this.props.useContext ? this : undefined
        });
        if (this.props.open) {
          this.showTooltip();
        }
      } else {
        this.tippy = null;
      }
    }
  }, {
    key: '_destroyTippy',
    value: function _destroyTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.updateSettings('open', false);
        this.tippy.hide(popper, 0);
        this.tippy.destroy(popper);
        this.tippy = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(tooltip) {
            _this3.tooltipDOM = tooltip;
          },
          title: this.props.title,
          className: this.props.className,
          style: _extends({
            display: 'inline'
          }, this.props.style)
        },
        this.props.children
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = followCursorHandler;

var _globals = __webpack_require__(0);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Mousemove event listener callback method for follow cursor setting
* @param {MouseEvent} e
*/
function followCursorHandler(e) {
    var _this = this;

    var ref = (0, _find2.default)(_globals.Store, function (ref) {
        return ref.el === _this;
    });
    var popper = ref.popper;


    var position = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
    var halfPopperWidth = Math.round(popper.offsetWidth / 2);
    var halfPopperHeight = Math.round(popper.offsetHeight / 2);
    var viewportPadding = 5;
    var pageWidth = document.documentElement.offsetWidth || document.body.offsetWidth;

    var pageX = e.pageX,
        pageY = e.pageY;


    var x = void 0,
        y = void 0;

    switch (position) {
        case 'top':
            x = pageX - halfPopperWidth;
            y = pageY - 2.5 * halfPopperHeight;
            break;
        case 'left':
            x = pageX - 2 * halfPopperWidth - 15;
            y = pageY - halfPopperHeight;
            break;
        case 'right':
            x = pageX + halfPopperHeight;
            y = pageY - halfPopperHeight;
            break;
        case 'bottom':
            x = pageX - halfPopperWidth;
            y = pageY + halfPopperHeight / 1.5;
            break;
    }

    var isRightOverflowing = pageX + viewportPadding + halfPopperWidth > pageWidth;
    var isLeftOverflowing = pageX - viewportPadding - halfPopperWidth < 0;

    // Prevent left/right overflow
    if (position === 'top' || position === 'bottom') {
        if (isRightOverflowing) {
            x = pageWidth - viewportPadding - 2 * halfPopperWidth;
        }

        if (isLeftOverflowing) {
            x = viewportPadding;
        }
    }

    popper.style.left = y + 'px';
    popper.style.top = x + 'px';
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = closest;

var _matches = __webpack_require__(9);

/**
* Ponyfill to get the closest parent element
* @param {Element} element - child of parent to be returned
* @param {String} parentSelector - selector to match the parent if found
* @return {Element}
*/
function closest(element, parentSelector) {
    var _closest = Element.prototype.closest || function (selector) {
        var el = this;
        while (el) {
            if (_matches.matches.call(el, selector)) {
                return el;
            }
            el = el.parentElement;
        }
    };

    return _closest.call(element, parentSelector);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOffsetDistanceInPx;

var _globals = __webpack_require__(0);

/**
* Returns the distance taking into account the default distance due to
* the transform: translate setting in CSS
* @param {Number} distance
* @return {String}
*/
function getOffsetDistanceInPx(distance) {
    return -(distance - _globals.Defaults.distance) + 'px';
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var matches = exports.matches = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
    while (--i >= 0 && matches.item(i) !== this) {}
    return i > -1;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queueExecution;
/**
* Waits until next repaint to execute a fn
* @return {Function}
*/
function queueExecution(fn) {
  window.requestAnimationFrame(function () {
    setTimeout(fn, 0);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeTitle;
/**
* Removes the title from the tooltipped element
* @param {Element} el
*/
function removeTitle(el) {
    var title = el.getAttribute('title');
    el.setAttribute('data-original-title', title || 'html');
    el.removeAttribute('title');
}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withTooltip = function withTooltip(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _react2.default.createElement(
      _component2.default,
      options,
      _react2.default.createElement(Component, props)
    );
  };
};

exports.default = withTooltip;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTooltip = exports.Tooltip = undefined;

var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

var _hoc = __webpack_require__(13);

var _hoc2 = _interopRequireDefault(_hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tooltip = _component2.default;
exports.withTooltip = _hoc2.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createPopperElement;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getOffsetDistanceInPx = __webpack_require__(8);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a popper element then returns it
* @param {Number} id - the popper id
* @param {String} title - the tooltip's `title` attribute
* @param {Object} settings - individual settings
* @return {Element} - the popper element
*/
function createPopperElement(id, title, settings) {
    var position = settings.position,
        distance = settings.distance,
        arrow = settings.arrow,
        animateFill = settings.animateFill,
        inertia = settings.inertia,
        animation = settings.animation,
        arrowSize = settings.arrowSize,
        size = settings.size,
        theme = settings.theme,
        html = settings.html,
        zIndex = settings.zIndex,
        interactive = settings.interactive;


    var popper = document.createElement('div');
    popper.setAttribute('class', 'tippy-popper');
    popper.setAttribute('role', 'tooltip');
    popper.setAttribute('aria-hidden', 'true');
    popper.setAttribute('id', 'tippy-tooltip-' + id);
    popper.style.zIndex = zIndex;

    var tooltip = document.createElement('div');
    tooltip.setAttribute('class', 'tippy-tooltip tippy-tooltip--' + size + ' leave');
    tooltip.setAttribute('data-animation', animation);

    theme.split(' ').forEach(function (t) {
        tooltip.classList.add(t + '-theme');
    });

    if (arrow) {
        // Add an arrow
        var _arrow = document.createElement('div');
        _arrow.setAttribute('class', 'arrow-' + arrowSize);
        _arrow.setAttribute('x-arrow', '');
        tooltip.appendChild(_arrow);
    }

    if (animateFill) {
        // Create animateFill circle element for animation
        tooltip.setAttribute('data-animatefill', '');
        var circle = document.createElement('div');
        circle.setAttribute('class', 'leave');
        circle.setAttribute('x-circle', '');
        tooltip.appendChild(circle);
    }

    if (inertia) {
        // Change transition timing function cubic bezier
        tooltip.setAttribute('data-inertia', '');
    }

    if (interactive) {
        tooltip.setAttribute('data-interactive', '');
    }

    // Tooltip content (text or HTML)
    var content = document.createElement('div');
    content.setAttribute('class', 'tippy-tooltip-content');

    if (html) {

        var templateId = void 0;

        if (html instanceof Element) {
            content.appendChild(html);
            templateId = '#' + html.id || 'tippy-html-template';
        } else {
            content.innerHTML = document.getElementById(html.replace('#', '')).innerHTML;
            templateId = html;
        }

        popper.classList.add('html-template');
        interactive && popper.setAttribute('tabindex', '-1');
        tooltip.setAttribute('data-template-id', templateId);
    } else {
        content.innerHTML = title;
    }

    // Init distance. Further updates are made in the popper instance's `onUpdate()` method
    tooltip.style[(0, _getCorePlacement2.default)(position)] = (0, _getOffsetDistanceInPx2.default)(distance);

    tooltip.appendChild(content);
    popper.appendChild(tooltip);

    return popper;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createPopperInstance;

var _popper = __webpack_require__(35);

var _popper2 = _interopRequireDefault(_popper);

var _globals = __webpack_require__(0);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getOffsetDistanceInPx = __webpack_require__(8);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a new popper instance
* @param {Object} refData
* @return {Object} - the popper instance
*/
function createPopperInstance(refData) {
    var el = refData.el,
        popper = refData.popper,
        _refData$settings = refData.settings,
        position = _refData$settings.position,
        popperOptions = _refData$settings.popperOptions,
        offset = _refData$settings.offset,
        distance = _refData$settings.distance;


    var tooltip = popper.querySelector(_globals.Selectors.TOOLTIP);

    var config = _extends({
        placement: position
    }, popperOptions || {}, {
        modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
            flip: _extends({
                padding: distance + 5 /* 5px from viewport boundary */
            }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
            offset: _extends({
                offset: offset
            }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
        }),
        onUpdate: function onUpdate() {
            tooltip.style.top = '';
            tooltip.style.bottom = '';
            tooltip.style.left = '';
            tooltip.style.right = '';
            tooltip.style[(0, _getCorePlacement2.default)(popper.getAttribute('x-placement'))] = (0, _getOffsetDistanceInPx2.default)(distance);
        }
    });

    return new _popper2.default(el, popper, config);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.default = createTooltips;

var _getIndividualSettings = __webpack_require__(21);

var _getIndividualSettings2 = _interopRequireDefault(_getIndividualSettings);

var _createPopperElement = __webpack_require__(15);

var _createPopperElement2 = _interopRequireDefault(_createPopperElement);

var _createTrigger = __webpack_require__(18);

var _createTrigger2 = _interopRequireDefault(_createTrigger);

var _getEventListenerHandlers = __webpack_require__(20);

var _getEventListenerHandlers2 = _interopRequireDefault(_getEventListenerHandlers);

var _removeTitle = __webpack_require__(11);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCounter = 1;

/**
* Creates tooltips for all el elements that match the instance's selector
* @param {Element[]} els - Array of elements
* @return {Object[]} Array of ref data objects
*/
function createTooltips(els) {
        var _this = this;

        return els.reduce(function (a, el) {

                var settings = _this.settings.performance ? _this.settings : (0, _getIndividualSettings2.default)(el, _this.settings);

                // animateFill is disabled if an arrow is true
                if (settings.arrow) settings.animateFill = false;

                var html = settings.html,
                    trigger = settings.trigger,
                    touchHold = settings.touchHold;


                var title = el.getAttribute('title');
                if (!title && !html) return a;

                var id = idCounter;
                el.setAttribute('data-tooltipped', '');
                el.setAttribute('aria-describedby', 'tippy-tooltip-' + id);
                (0, _removeTitle2.default)(el);

                var popper = (0, _createPopperElement2.default)(id, title, settings);
                var handlers = _getEventListenerHandlers2.default.call(_this, el, popper, settings);
                var listeners = [];

                trigger.trim().split(' ').forEach(function (event) {
                        return listeners = listeners.concat((0, _createTrigger2.default)(event, el, handlers, touchHold));
                });

                a.push({
                        id: id,
                        el: el,
                        popper: popper,
                        settings: settings,
                        listeners: listeners,
                        tippyInstance: _this
                });

                idCounter++;

                return a;
        }, []);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createTrigger;

var _globals = __webpack_require__(0);

/**
* Creates a trigger
* @param {Object} event - the custom event specified in the `trigger` setting
* @param {Element} el - tooltipped element
* @param {Object} handlers - the handlers for each listener
* @param {Boolean} touchHold
* @return {Array} - array of listener objects
*/
function createTrigger(event, el, handlers, touchHold) {
    var listeners = [];

    if (event === 'manual') return listeners;

    // Enter
    el.addEventListener(event, handlers.handleTrigger);
    listeners.push({
        event: event,
        handler: handlers.handleTrigger
    });

    // Leave
    if (event === 'mouseover') {

        if (_globals.Browser.SUPPORTS_TOUCH && touchHold) {
            el.addEventListener('touchstart', handlers.handleTrigger);
            listeners.push({
                event: 'touchstart',
                handler: handlers.handleTrigger
            });
            el.addEventListener('touchend', handlers.handleMouseout);
            listeners.push({
                event: 'touchend',
                handler: handlers.handleMouseout
            });
        }

        el.addEventListener('mouseout', handlers.handleMouseout);
        listeners.push({
            event: 'mouseout',
            handler: handlers.handleMouseout
        });
    }

    if (event === 'focus') {
        el.addEventListener('blur', handlers.handleBlur);
        listeners.push({
            event: 'blur',
            handler: handlers.handleBlur
        });
    }

    return listeners;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getArrayOfElements;
/**
* Returns an array of elements based on the selector input
* @param {String|Element} selector
* @return {Elements[]}
*/
function getArrayOfElements(selector) {
    if (selector instanceof Element) {
        return [selector];
    }

    return [].slice.call(document.querySelectorAll(selector));
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getEventListenerHandlers;

var _globals = __webpack_require__(0);

var _isVisible = __webpack_require__(4);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _closest = __webpack_require__(7);

var _closest2 = _interopRequireDefault(_closest);

var _cursorIsOutsideInteractiveBorder = __webpack_require__(29);

var _cursorIsOutsideInteractiveBorder2 = _interopRequireDefault(_cursorIsOutsideInteractiveBorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns relevant listener callbacks for each ref
* @param {Element} el
* @param {Element} popper
* @param {Object} settings
* @return {Object} - relevant listener callback methods
*/
function getEventListenerHandlers(el, popper, settings) {
    var _this = this;

    var position = settings.position,
        delay = settings.delay,
        duration = settings.duration,
        interactive = settings.interactive,
        interactiveBorder = settings.interactiveBorder,
        distance = settings.distance,
        hideOnClick = settings.hideOnClick,
        trigger = settings.trigger,
        touchHold = settings.touchHold,
        touchWait = settings.touchWait;


    var showDelay = void 0,
        hideDelay = void 0;

    var clearTimeouts = function clearTimeouts() {
        clearTimeout(showDelay);
        clearTimeout(hideDelay);
    };

    var _show = function _show() {
        clearTimeouts();

        // Not hidden. For clicking when it also has a `focus` event listener
        if ((0, _isVisible2.default)(popper)) return;
        var _delay = Array.isArray(delay) ? delay[0] : delay;

        if (delay) {
            showDelay = setTimeout(function () {
                return _this.show(popper);
            }, _delay);
        } else {
            _this.show(popper);
        }
    };

    var show = function show(event) {
        return _this.callbacks.wait ? _this.callbacks.wait.call(popper, _show, event) : _show();
    };

    var hide = function hide() {
        clearTimeouts();

        var _delay = Array.isArray(delay) ? delay[1] : delay;

        if (delay) {
            hideDelay = setTimeout(function () {
                return _this.hide(popper);
            }, _delay);
        } else {
            _this.hide(popper);
        }
    };

    var handleTrigger = function handleTrigger(event) {

        var mouseoverTouch = event.type === 'mouseover' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch;

        if (mouseoverTouch && touchHold) return;

        // Toggle show/hide when clicking click-triggered tooltips
        var isClick = event.type === 'click';
        var isNotPersistent = hideOnClick !== 'persistent';

        isClick && (0, _isVisible2.default)(popper) && isNotPersistent ? hide() : show(event);

        if (mouseoverTouch && _globals.Browser.iOS() && el.click) {
            el.click();
        }
    };

    var handleMouseout = function handleMouseout(event) {

        // Don't fire 'mouseout', use the 'touchend'
        if (event.type === 'mouseout' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch && touchHold) {
            return;
        }

        if (interactive) {
            // Temporarily handle mousemove to check if the mouse left somewhere
            // other than its popper
            var handleMousemove = function handleMousemove(event) {

                var triggerHide = function triggerHide() {
                    document.body.removeEventListener('mouseout', hide);
                    document.removeEventListener('mousemove', handleMousemove);
                    hide();
                };

                var closestTooltippedEl = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);

                var isOverPopper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER) === popper;
                var isOverEl = closestTooltippedEl === el;
                var isClickTriggered = trigger.indexOf('click') !== -1;
                var isOverOtherTooltippedEl = closestTooltippedEl && closestTooltippedEl !== el;

                if (isOverOtherTooltippedEl) {
                    return triggerHide();
                }

                if (isOverPopper || isOverEl || isClickTriggered) return;

                if ((0, _cursorIsOutsideInteractiveBorder2.default)(event, popper, settings)) {
                    triggerHide();
                }
            };

            document.body.addEventListener('mouseout', hide);
            document.addEventListener('mousemove', handleMousemove);

            return;
        }

        // If it's not interactive, just hide it
        hide();
    };

    var handleBlur = function handleBlur(event) {
        // Ignore blur on touch devices, if there is no `relatedTarget`, hide
        // If the related target is a popper, ignore
        if (_globals.Browser.touch || !event.relatedTarget) return;
        if ((0, _closest2.default)(event.relatedTarget, _globals.Selectors.POPPER)) return;

        hide();
    };

    return {
        handleTrigger: handleTrigger,
        handleMouseout: handleMouseout,
        handleBlur: handleBlur
    };
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getIndividualSettings;

var _globals = __webpack_require__(0);

/**
* Returns an object of settings to override global settings
* @param {Element} el - the tooltipped element
* @param {Object} instanceSettings
* @return {Object} - individual settings
*/
function getIndividualSettings(el, instanceSettings) {

    var settings = _globals.DefaultsKeys.reduce(function (acc, key) {
        var val = el.getAttribute('data-' + key.toLowerCase()) || instanceSettings[key];

        // Convert strings to booleans
        if (val === 'false') val = false;
        if (val === 'true') val = true;

        // Convert number strings to true numbers
        if (isFinite(val) && !isNaN(parseFloat(val))) {
            val = parseFloat(val);
        }

        // Convert array strings to actual arrays
        if (typeof val === 'string' && val.trim().charAt(0) === '[') {
            val = JSON.parse(val);
        }

        acc[key] = val;

        return acc;
    }, {});

    return Object.assign({}, instanceSettings, settings);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hideAllPoppers;

var _globals = __webpack_require__(0);

/**
* Hides all poppers
* @param {Object} exclude - reference to exclude if needed
*/
function hideAllPoppers(exclude) {
    _globals.Store.forEach(function (ref) {
        var popper = ref.popper,
            tippyInstance = ref.tippyInstance,
            _ref$settings = ref.settings,
            appendTo = _ref$settings.appendTo,
            hideOnClick = _ref$settings.hideOnClick,
            trigger = _ref$settings.trigger;

        // Don't hide already hidden ones

        if (!appendTo.contains(popper)) return;

        // hideOnClick can have the truthy value of 'persistent', so strict check is needed
        var isHideOnClick = hideOnClick === true || trigger.indexOf('focus') !== -1;
        var isNotCurrentRef = !exclude || popper !== exclude.popper;

        if (isHideOnClick && isNotCurrentRef) {
            ref.settings.onRequestClose();
            tippyInstance.hide(popper);
        }
    });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;

var _globals = __webpack_require__(0);

var _hideAllPoppers = __webpack_require__(22);

var _hideAllPoppers2 = _interopRequireDefault(_hideAllPoppers);

var _closest = __webpack_require__(7);

var _closest2 = _interopRequireDefault(_closest);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* To run a single time, once DOM is presumed to be ready
* @return {Boolean} whether the function has run or not
*/
function init() {

    if (init.done) return false;
    init.done = true;

    // If the script is in <head>, document.body is null, so it's set in the
    // init function
    _globals.Defaults.appendTo = document.body;

    var touchHandler = function touchHandler() {
        _globals.Browser.touch = true;

        if (_globals.Browser.iOS()) {
            document.body.classList.add('tippy-touch');
        }

        if (_globals.Browser.dynamicInputDetection) {
            document.addEventListener('mousemove', mousemoveHandler);
        }
    };

    var mousemoveHandler = function () {
        var time = void 0;

        return function () {
            var now = performance && performance.now();

            if (now && now - time < 10) {
                _globals.Browser.touch = false;
                document.removeEventListener('mousemove', mousemoveHandler);
                if (!_globals.Browser.iOS() && document.body.classList.contains('tippy-touch')) {
                    document.body.classList.remove('tippy-touch');
                }
            }

            time = now;
        };
    }();

    var clickHandler = function clickHandler(event) {

        // Simulated events dispatched on the document
        if (!(event.target instanceof Element)) {
            return (0, _hideAllPoppers2.default)();
        }

        var el = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);
        var popper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER);

        if (popper) {
            var ref = (0, _find2.default)(_globals.Store, function (ref) {
                return ref.popper === popper;
            });
            var interactive = ref.settings.interactive;

            if (interactive) return;
        }

        if (el) {
            var _ref = (0, _find2.default)(_globals.Store, function (ref) {
                return ref.el === el;
            });
            var _ref$settings = _ref.settings,
                hideOnClick = _ref$settings.hideOnClick,
                multiple = _ref$settings.multiple,
                trigger = _ref$settings.trigger;

            // If they clicked before the show() was to fire, clear it


            // Hide all poppers except the one belonging to the element that was clicked IF
            // `multiple` is false AND they are a touch user, OR
            // `multiple` is false AND it's triggered by a click

            if (!multiple && _globals.Browser.touch || !multiple && trigger.indexOf('click') !== -1) {
                return (0, _hideAllPoppers2.default)(_ref);
            }

            // If hideOnClick is not strictly true or triggered by a click don't hide poppers
            if (hideOnClick !== true || trigger.indexOf('click') !== -1) return;
        }

        // Don't trigger a hide for tippy controllers, and don't needlessly run loop
        if ((0, _closest2.default)(event.target, _globals.Selectors.CONTROLLER) || !document.querySelector(_globals.Selectors.POPPER)) return;

        (0, _hideAllPoppers2.default)();
    };

    // Hook events
    document.addEventListener('click', clickHandler);
    document.addEventListener('touchstart', touchHandler);

    if (!_globals.Browser.SUPPORTS_TOUCH && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
        document.addEventListener('pointerdown', touchHandler);
    }

    return true;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeSticky;

var _queueExecution = __webpack_require__(10);

var _queueExecution2 = _interopRequireDefault(_queueExecution);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _isVisible = __webpack_require__(4);

var _isVisible2 = _interopRequireDefault(_isVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Updates a popper's position on each animation frame to make it stick to a moving element
* @param {Object} refData
*/
function makeSticky(refData) {
    var popper = refData.popper,
        popperInstance = refData.popperInstance,
        stickyDuration = refData.settings.stickyDuration;


    var applyTransitionDuration = function applyTransitionDuration() {
        return popper.style[(0, _prefix2.default)('transitionDuration')] = stickyDuration + 'ms';
    };

    var removeTransitionDuration = function removeTransitionDuration() {
        return popper.style[(0, _prefix2.default)('transitionDuration')] = '';
    };

    var updatePosition = function updatePosition() {
        popperInstance && popperInstance.scheduleUpdate();

        applyTransitionDuration();

        (0, _isVisible2.default)(popper) ? window.requestAnimationFrame(updatePosition) : removeTransitionDuration();
    };

    // Wait until Popper's position has been updated initially
    (0, _queueExecution2.default)(updatePosition);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mountPopper;

var _globals = __webpack_require__(0);

var _followCursorHandler = __webpack_require__(6);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _createPopperInstance = __webpack_require__(16);

var _createPopperInstance2 = _interopRequireDefault(_createPopperInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Appends the popper and creates a popper instance if one does not exist
* Also updates its position if need be and enables event listeners
* @param {Object} ref -  the element/popper reference
*/
function mountPopper(ref) {
    var el = ref.el,
        popper = ref.popper,
        _ref$settings = ref.settings,
        appendTo = _ref$settings.appendTo,
        followCursor = _ref$settings.followCursor;

    // Already on the DOM

    if (appendTo.contains(popper)) return;

    appendTo.appendChild(popper);

    if (!ref.popperInstance) {
        // Create instance if it hasn't been created yet
        ref.popperInstance = (0, _createPopperInstance2.default)(ref);
    } else {
        ref.popperInstance.update();

        if (!followCursor || _globals.Browser.touch) {
            ref.popperInstance.enableEventListeners();
        }
    }

    // Since touch is determined dynamically, followCursor setting
    // is set on mount
    if (followCursor && !_globals.Browser.touch) {
        el.addEventListener('mousemove', _followCursorHandler2.default);
        ref.popperInstance.disableEventListeners();
    }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onTransitionEnd;

var _globals = __webpack_require__(0);

/**
* Prepares the callback functions for `show` and `hide` methods
* @param {Object} ref -  the element/popper reference
* @param {Number} duration
* @param {Function} callback - callback function to fire once transitions complete
*/
function onTransitionEnd(ref, duration, callback) {

    // Make callback synchronous if duration is 0
    if (!duration) {
        return callback();
    }

    var tooltip = ref.popper.querySelector(_globals.Selectors.TOOLTIP);
    var transitionendFired = false;

    var listenerCallback = function listenerCallback(e) {
        if (e.target !== tooltip) return;

        transitionendFired = true;

        tooltip.removeEventListener('webkitTransitionEnd', listenerCallback);
        tooltip.removeEventListener('transitionend', listenerCallback);

        callback();
    };

    // Wait for transitions to complete
    tooltip.addEventListener('webkitTransitionEnd', listenerCallback);
    tooltip.addEventListener('transitionend', listenerCallback);

    // transitionend listener sometimes may not fire
    clearTimeout(ref._transitionendTimeout);
    ref._transitionendTimeout = setTimeout(function () {
        !transitionendFired && callback();
    }, duration);
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Utility functions */


/* Core library functions */


var _globals = __webpack_require__(0);

var _reactDom = __webpack_require__(36);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _init = __webpack_require__(23);

var _init2 = _interopRequireDefault(_init);

var _queueExecution = __webpack_require__(10);

var _queueExecution2 = _interopRequireDefault(_queueExecution);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _findIndex = __webpack_require__(31);

var _findIndex2 = _interopRequireDefault(_findIndex);

var _removeTitle = __webpack_require__(11);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _elementIsInViewport = __webpack_require__(30);

var _elementIsInViewport2 = _interopRequireDefault(_elementIsInViewport);

var _triggerReflow = __webpack_require__(34);

var _triggerReflow2 = _interopRequireDefault(_triggerReflow);

var _modifyClassList = __webpack_require__(32);

var _modifyClassList2 = _interopRequireDefault(_modifyClassList);

var _applyTransitionDuration = __webpack_require__(28);

var _applyTransitionDuration2 = _interopRequireDefault(_applyTransitionDuration);

var _isVisible = __webpack_require__(4);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _noop = __webpack_require__(33);

var _noop2 = _interopRequireDefault(_noop);

var _followCursorHandler = __webpack_require__(6);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _getArrayOfElements = __webpack_require__(19);

var _getArrayOfElements2 = _interopRequireDefault(_getArrayOfElements);

var _onTransitionEnd = __webpack_require__(26);

var _onTransitionEnd2 = _interopRequireDefault(_onTransitionEnd);

var _mountPopper = __webpack_require__(25);

var _mountPopper2 = _interopRequireDefault(_mountPopper);

var _makeSticky = __webpack_require__(24);

var _makeSticky2 = _interopRequireDefault(_makeSticky);

var _createTooltips = __webpack_require__(17);

var _createTooltips2 = _interopRequireDefault(_createTooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @param {String|Element} selector
* @param {Object} settings (optional) - the object of settings to be applied to the instance
*/
var Tippy = function () {
    function Tippy(selector) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Tippy);

        // Use default browser tooltip on unsupported browsers
        if (!_globals.Browser.SUPPORTED) return;

        // DOM is presumably mostly ready (for document.body) by instantiation time
        (0, _init2.default)();

        this.state = {
            destroyed: false
        };

        this.selector = selector;

        this.settings = Object.assign({}, _globals.Defaults, settings);

        this.callbacks = {
            wait: settings.wait,
            show: settings.show || _noop2.default,
            shown: settings.shown || _noop2.default,
            hide: settings.hide || _noop2.default,
            hidden: settings.hidden || _noop2.default
        };

        this.store = _createTooltips2.default.call(this, (0, _getArrayOfElements2.default)(selector));
        _globals.Store.push.apply(_globals.Store, this.store);
    }

    /**
    * Returns the reference element's popper element reference
    * @param {Element} el
    * @return {Element}
    */


    _createClass(Tippy, [{
        key: 'getPopperElement',
        value: function getPopperElement(el) {
            try {
                return (0, _find2.default)(this.store, function (ref) {
                    return ref.el === el;
                }).popper;
            } catch (e) {
                console.error('[getPopperElement]: Element passed as the argument does not exist in the instance');
            }
        }

        /**
        * Returns a popper's reference element
        * @param {Element} popper
        * @return {Element}
        */

    }, {
        key: 'getReferenceElement',
        value: function getReferenceElement(popper) {
            try {
                return (0, _find2.default)(this.store, function (ref) {
                    return ref.popper === popper;
                }).el;
            } catch (e) {
                console.error('[getReferenceElement]: Popper passed as the argument does not exist in the instance');
            }
        }

        /**
        * Returns the reference data object from either the reference element or popper element
        * @param {Element} x (reference element or popper)
        * @return {Object}
        */

    }, {
        key: 'getReferenceData',
        value: function getReferenceData(x) {
            return (0, _find2.default)(this.store, function (ref) {
                return ref.el === x || ref.popper === x;
            });
        }

        /**
        * Update settings
        * @param {DOMElement} - popper
        * @param {string} - name
        * @param {string} - value
        */

    }, {
        key: 'updateSettings',
        value: function updateSettings(popper, name, value) {
            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });
            var newSettings = _extends({}, ref.settings, _defineProperty({}, name, value));
            ref.settings = newSettings;
        }
    }, {
        key: 'updateForReact',


        /**
        * Update for React
        * @param {DOMElement} - popper
        * @param {ReactElement} - content
        */
        value: function updateForReact(popper, updatedContent) {
            var tooltipContent = popper.querySelector(_globals.Selectors.CONTENT);
            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });

            var _ref$settings = ref.settings,
                useContext = _ref$settings.useContext,
                reactInstance = _ref$settings.reactInstance;

            if (useContext) {
                _reactDom2.default.unstable_renderSubtreeIntoContainer(ref.settings.reactInstance, updatedContent, tooltipContent);
            } else {
                _reactDom2.default.render(updatedContent, tooltipContent);
            }
        }
        /**
        * Shows a popper
        * @param {Element} popper
        * @param {Number} customDuration (optional)
        */

    }, {
        key: 'show',
        value: function show(popper, customDuration) {
            var _this = this;

            if (this.state.destroyed) return;

            this.callbacks.show.call(popper);

            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });
            var tooltip = popper.querySelector(_globals.Selectors.TOOLTIP);
            var circle = popper.querySelector(_globals.Selectors.CIRCLE);
            var content = popper.querySelector(_globals.Selectors.CONTENT);

            if (ref.settings.open === false) {
                return;
            }

            if (ref.settings.reactDOM) {
                this.updateForReact(popper, ref.settings.reactDOM);
            }

            var el = ref.el,
                _ref$settings2 = ref.settings,
                appendTo = _ref$settings2.appendTo,
                sticky = _ref$settings2.sticky,
                interactive = _ref$settings2.interactive,
                followCursor = _ref$settings2.followCursor,
                flipDuration = _ref$settings2.flipDuration,
                duration = _ref$settings2.duration;


            var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[0] : duration;

            // Remove transition duration (prevent a transition when popper changes position)
            (0, _applyTransitionDuration2.default)([popper, tooltip, circle], 0);

            (0, _mountPopper2.default)(ref);

            popper.style.visibility = 'visible';
            popper.setAttribute('aria-hidden', 'false');

            // Wait for popper to update position and alter x-placement
            (0, _queueExecution2.default)(function () {
                if (!(0, _isVisible2.default)(popper)) return;

                // Sometimes the arrow will not be in the correct position,
                // force another update
                if (!followCursor || _globals.Browser.touch) {
                    ref.popperInstance.update();
                }

                // Re-apply transition durations
                (0, _applyTransitionDuration2.default)([tooltip, circle], _duration, true);
                if (!followCursor || _globals.Browser.touch) {
                    (0, _applyTransitionDuration2.default)([popper], flipDuration, true);
                }

                // Make content fade out a bit faster than the tooltip if `animateFill`
                if (circle) content.style.opacity = 1;

                // Interactive tooltips receive a class of 'active'
                interactive && el.classList.add('active');

                // Update popper's position on every animation frame
                sticky && (0, _makeSticky2.default)(ref);

                // Repaint/reflow is required for CSS transition when appending
                (0, _triggerReflow2.default)(tooltip, circle);

                (0, _modifyClassList2.default)([tooltip, circle], function (list) {
                    list.contains('tippy-notransition') && list.remove('tippy-notransition');
                    list.remove('leave');
                    list.add('enter');
                });

                // Wait for transitions to complete
                (0, _onTransitionEnd2.default)(ref, _duration, function () {
                    if (!(0, _isVisible2.default)(popper) || ref._onShownFired) return;

                    // Focus interactive tooltips only
                    interactive && popper.focus();

                    // Remove transitions from tooltip
                    tooltip.classList.add('tippy-notransition');

                    // Prevents shown() from firing more than once from early transition cancellations
                    ref._onShownFired = true;

                    _this.callbacks.shown.call(popper);
                });
            });
        }

        /**
        * Hides a popper
        * @param {Element} popper
        * @param {Number} customDuration (optional)
        */

    }, {
        key: 'hide',
        value: function hide(popper, customDuration) {
            var _this2 = this;

            if (this.state.destroyed) return;

            this.callbacks.hide.call(popper);

            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });
            var tooltip = popper.querySelector(_globals.Selectors.TOOLTIP);
            var circle = popper.querySelector(_globals.Selectors.CIRCLE);
            var content = popper.querySelector(_globals.Selectors.CONTENT);

            // Prevent hide if open
            if (ref.settings.disabled === false && ref.settings.open) {
                return;
            }

            if (ref.settings.unmountHTMLWhenHide && ref.settings.reactDOM) {
                _reactDom2.default.unmountComponentAtNode(content);
            }

            var el = ref.el,
                _ref$settings3 = ref.settings,
                appendTo = _ref$settings3.appendTo,
                sticky = _ref$settings3.sticky,
                interactive = _ref$settings3.interactive,
                followCursor = _ref$settings3.followCursor,
                html = _ref$settings3.html,
                trigger = _ref$settings3.trigger,
                duration = _ref$settings3.duration;


            var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[1] : duration;

            ref._onShownFired = false;
            interactive && el.classList.remove('active');

            popper.style.visibility = 'hidden';
            popper.setAttribute('aria-hidden', 'true');

            (0, _applyTransitionDuration2.default)([tooltip, circle, circle ? content : null], _duration);

            if (circle) content.style.opacity = 0;

            (0, _modifyClassList2.default)([tooltip, circle], function (list) {
                list.contains('tippy-tooltip') && list.remove('tippy-notransition');
                list.remove('enter');
                list.add('leave');
            });

            // Re-focus click-triggered html elements
            // and the tooltipped element IS in the viewport (otherwise it causes unsightly scrolling
            // if the tooltip is closed and the element isn't in the viewport anymore)
            if (html && trigger.indexOf('click') !== -1 && (0, _elementIsInViewport2.default)(el)) {
                el.focus();
            }

            // Wait for transitions to complete
            (0, _onTransitionEnd2.default)(ref, _duration, function () {
                if ((0, _isVisible2.default)(popper) || !appendTo.contains(popper)) return;

                el.removeEventListener('mousemove', _followCursorHandler2.default);

                ref.popperInstance.disableEventListeners();

                appendTo.removeChild(popper);

                _this2.callbacks.hidden.call(popper);
            });
        }

        /**
        * Updates a popper with new content
        * @param {Element} popper
        */

    }, {
        key: 'update',
        value: function update(popper) {
            if (this.state.destroyed) return;

            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });
            var content = popper.querySelector(_globals.Selectors.CONTENT);
            var el = ref.el,
                html = ref.settings.html;


            if (html instanceof Element) {
                console.warn('Aborted: update() should not be used if `html` is a DOM element');
                return;
            }

            content.innerHTML = html ? document.getElementById(html.replace('#', '')).innerHTML : el.getAttribute('title') || el.getAttribute('data-original-title');

            if (!html) (0, _removeTitle2.default)(el);
        }

        /**
        * Destroys a popper
        * @param {Element} popper
        * @param {Boolean} _isLast - private param used by destroyAll to optimize
        */

    }, {
        key: 'destroy',
        value: function destroy(popper, _isLast) {
            var _this3 = this;

            if (this.state.destroyed) return;

            var ref = (0, _find2.default)(this.store, function (ref) {
                return ref.popper === popper;
            });
            var el = ref.el,
                popperInstance = ref.popperInstance,
                listeners = ref.listeners;

            // Ensure the popper is hidden

            if ((0, _isVisible2.default)(popper)) {
                this.hide(popper, 0);
            }

            // Remove Tippy-only event listeners from tooltipped element
            listeners.forEach(function (listener) {
                return el.removeEventListener(listener.event, listener.handler);
            });

            // Restore original title
            el.setAttribute('title', el.getAttribute('data-original-title'));

            el.removeAttribute('data-original-title');
            el.removeAttribute('data-tooltipped');
            el.removeAttribute('aria-describedby');

            popperInstance && popperInstance.destroy();

            // Remove from store
            _globals.Store.splice((0, _findIndex2.default)(_globals.Store, function (ref) {
                return ref.popper === popper;
            }), 1);

            // Ensure filter is called only once
            if (_isLast === undefined || _isLast) {
                this.store = _globals.Store.filter(function (ref) {
                    return ref.tippyInstance === _this3;
                });
            }
        }

        /**
        * Destroys all tooltips created by the instance
        */

    }, {
        key: 'destroyAll',
        value: function destroyAll() {
            var _this4 = this;

            if (this.state.destroyed) return;

            var storeLength = this.store.length;

            this.store.forEach(function (_ref, index) {
                var popper = _ref.popper;

                _this4.destroy(popper, index === storeLength - 1);
            });

            this.store = null;
            this.state.destroyed = true;
        }
    }]);

    return Tippy;
}();

function tippy(selector, settings) {
    return new Tippy(selector, settings);
}

tippy.Browser = _globals.Browser;
tippy.Defaults = _globals.Defaults;
tippy.disableDynamicInputDetection = function () {
    return _globals.Browser.dynamicInputDetection = false;
};
tippy.enableDynamicInputDetection = function () {
    return _globals.Browser.dynamicInputDetection = true;
};

exports.default = tippy;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = applyTransitionDuration;

var _globals = __webpack_require__(0);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _matches = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Applies the transition duration to each element
* @param {Element[]} els - Array of elements
* @param {Number} duration
*/
function applyTransitionDuration(els, duration) {
    var _duration = void 0;

    els.forEach(function (el) {
        if (!el) return;

        var isCircle = _matches.matches.call(el, _globals.Selectors.CIRCLE);
        var isContent = _matches.matches.call(el, _globals.Selectors.CONTENT);

        _duration = isCircle ? Math.round(_duration / 1.1) : isContent ? Math.round(duration / 1.3) : duration;

        el.style[(0, _prefix2.default)('transitionDuration')] = _duration + 'ms';
    });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cursorIsOutsideInteractiveBorder;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Determines if the mouse's cursor is outside the interactive border
* @param {MouseEvent} event
* @param {Element} popper
* @param {Object} settings
* @return {Boolean}
*/
function cursorIsOutsideInteractiveBorder(event, popper, settings) {
    if (!popper.getAttribute('x-placement')) return true;

    var x = event.clientX,
        y = event.clientY;
    var interactiveBorder = settings.interactiveBorder,
        distance = settings.distance;


    var rect = popper.getBoundingClientRect();
    var corePosition = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
    var borderWithDistance = interactiveBorder + distance;

    var exceeds = {
        top: rect.top - y > interactiveBorder,
        bottom: y - rect.bottom > interactiveBorder,
        left: rect.left - x > interactiveBorder,
        right: x - rect.right > interactiveBorder
    };

    switch (corePosition) {
        case 'top':
            exceeds.top = rect.top - y > borderWithDistance;
            break;
        case 'bottom':
            exceeds.bottom = y - rect.bottom > borderWithDistance;
            break;
        case 'left':
            exceeds.left = rect.left - x > borderWithDistance;
            break;
        case 'right':
            exceeds.right = x - rect.right > borderWithDistance;
            break;
    }

    return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = elementIsInViewport;
/**
* Determines if an element is visible in the viewport
* @param {Element} el
* @return {Boolean}
*/
function elementIsInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findIndex;

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Ponyfill for Array.prototype.findIndex
* @param {Array} arr
* @param {Function} checkFn
* @return index of the item in the array
*/
function findIndex(arr, checkFn) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(checkFn);
  }

  // fallback
  return arr.indexOf((0, _find2.default)(arr, checkFn));
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = modifyClassList;
/**
* Modifies elements' class lists
* @param {Element[]} els - Array of elements
* @param {Function} callback
*/
function modifyClassList(els, callback) {
    els.forEach(function (el) {
        if (!el) return;
        callback(el.classList);
    });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;
function noop() {}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = triggerReflow;

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Triggers a document repaint or reflow for CSS transition
* @param {Element} tooltip
* @param {Element} circle
*/
function triggerReflow(tooltip, circle) {
    // Safari needs the specific 'transform' property to be accessed
    circle ? window.getComputedStyle(circle)[(0, _prefix2.default)('transform')] : window.getComputedStyle(tooltip).opacity;
}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_35__;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-tippy.js.map