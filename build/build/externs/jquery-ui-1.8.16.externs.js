/**
 * @fileoverview Externs for jQuery UI 1.8.16
 *
 * @externs
 */

// Undocumented jQuery externs called by ui
/**
 * @param {Element} elem
 * @param {string} name
 * @param {boolean=} force
 * @return {string}
 * @nosideeffects
 */
jQuery.prototype.curCSS = function(elem, name, force) {};

/** @const */
jQuery.expr;

/** @type {Object.<string, function(Element, RegExp)>} */
jQuery.expr[":"];

/**
 * @param {Element} elem
 * @return {boolean}
 */
jQuery.expr.hidden = function(elem) {};

/** @type {Object.<string, function(Element, RegExp)>} */
jQuery.expr.filters;

//UI Namespace
jQuery.ui;

// jquery.ui.core.js externs
/** @type {string} */
jQuery.ui.version;

/** @enum */
jQuery.ui.keyCode = {
  ALT: 18,
  BACKSPACE: 8,
  CAPS_LOCK: 20,
  COMMA: 188,
  COMMAND: 91,
  COMMAND_LEFT: 91, // COMMAND
  COMMAND_RIGHT: 93,
  CONTROL: 17,
  DELETE: 46,
  DOWN: 40,
  END: 35,
  ENTER: 13,
  ESCAPE: 27,
  HOME: 36,
  INSERT: 45,
  LEFT: 37,
  MENU: 93, // COMMAND_RIGHT
  NUMPAD_ADD: 107,
  NUMPAD_DECIMAL: 110,
  NUMPAD_DIVIDE: 111,
  NUMPAD_ENTER: 108,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_SUBTRACT: 109,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PERIOD: 190,
  RIGHT: 39,
  SHIFT: 16,
  SPACE: 32,
  TAB: 9,
  UP: 38,
  WINDOWS: 91 // COMMAND
}

/** @deprecated */
jQuery.ui.plugin;

/**
 * @param {string} module
 * @param {Object.<string, *>} option
 * @param {Object.<string, Array.<*>>} set
 * @deprecated
 */
jQuery.ui.plugin.add = function(module, option, set) {};

/**
 * @param {jQuery} instance
 * @param {string} name
 * @param {...*} args
 * @deprecated
 */
jQuery.ui.plugin.call = function(instance, name, args) {};

// Widget class
/**
 * @constructor
 */
jQuery.prototype.Widget = function() {};

jQuery.prototype.Widget.prototype._setOption = function(option, value) {};
jQuery.prototype.Widget.prototype.destroy = function() {};
jQuery.prototype.Widget.prototype._trigger = function(name, event, data) {};

// widget factory
/**
 * @param {string} name
 * @param {Object} proto1
 * @param {Object=} proto2
 */
jQuery.prototype.widget = function(name, proto1, proto2) {};

// The widgets
/**
 * @return {jQuery}
 */
jQuery.prototype.draggable = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.droppable = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.resizable =  function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.selectable = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.sortable = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.accordion = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.autocomplete = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.menu = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.button = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.buttonset = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.datepicker = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.dialog = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.progressbar = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.slider = function () {};

/**
 * @return {jQuery}
 */
jQuery.prototype.tabs = function () {};