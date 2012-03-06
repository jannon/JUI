/**
 * @summary     jQuery UI Radioset
 * @description Create a simple widget for dealing with a set of radio button choices
 * @file        jquery.ui.radioset.js
 * @version     1.0
 * @author      Jannon Frank (jannon.net)
 * @license     MIT or GPL v3
 *
 * @copyright Copyright 2010 Jannon Frank, all rights reserved.
 *
 * This source file is free software, under either the MIT license or GPL v3 license
 * available at:
 *   http://jannon.net/license_mit
 *   http://jannon.net/license_gpl3
 */

(function($) {

    /**
     * This widget provides UI for creating a buttonset from a set of radio 
     * choices and managing the change events for it.  In particular, whenever 
     * the value has changed, an event is fired with the old and new values.
     * Additionally, it supports deselecting a choice by clicking it again.
     * @require UI Core
     * @require UI Widget
     * @require UI Button
     * @example
     *     $('#choices').radioset();
     */
    $.widget("ui.radioset", {
        /**
         * Default options for the widget.
         */
        options: {
            /**
             * Whether or not to deselect an option if it is clicked while already selected
             */
            allowDeselect: true
        },
        /**
         * Creates the widget.
         */
        _create: function() {
            var self = this,
                el = this.element.buttonset(),
                o = this.options;
            this.radioState = null;
            this.old = ($(":checked", el).length > 0) ? $(":checked", el).val() : null;

            $("label", el).mousedown(function(e) {
                var me = $(this),
                    input = $("#" + me.attr("for")),
                    name = input.attr("name"),
                    siblings = $("input[name='" + name + "']", el).not(input);
                siblings.each(function() {
                    if (this.checked === true) {
                        console.log("setting old value:", this.value);
                        self.old = this.value;
                    }
                });
                if (!input[0].checked || o.allowDeselect) {
                    input[0].checked = !input[0].checked;
                    //if unchecked, set old value
                    if (!input[0].checked) { self.old = this.value; }
                }
                self.radioState = input[0].checked;
            });

            $(":radio", el).click(function(e) {
                var val = self.radioState ? this.value : null;
                if (val !== self.old) {
                    self._trigger("change", null, {
                        "old": self.old,
                        "current": val
                    });
                }
                this.checked = self.radioState;
                $(this).button("refresh");
            });
        },
        /**
         * Handles setting options for the widget
         */
        _setOption: function(option, value) {
            $.Widget.prototype._setOption.apply( this, arguments );
        },
        /**
         * Destroys the widget, returning the element to it's original state
         */
        destroy: function() {
            this.old = null;
            this.radioState = null;
            this.element.buttonset("destroy");
        }
    });
    
    
    /**
     * Event fired whenever the selection changes.
     * @event
     * @name ui.radioset#change
     * @param {Event}  e jQuery event object
     * @param {Object} ui Event parameters from radioset
     * @param {string} ui.old The previous value
     * @param {string} ui.current The current value
     */
    
    /**
     * Default radioset.
     * @demo Default Functionality
     * @demoscript
     *      $(function() {
     *          $("#set").radioset();
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <div id="set">
     *              <label for="choice1">Choice 1</label>
     *              <input type="radio" name="choices" id="choice1" value="1"/>
     *              <label for="choice2">Choice 2</label>
     *              <input type="radio" name="choices" id="choice2" value="2"/>
     *          </div>
     *      </div>
     * @memberof ui.radioset
     * @name default
     */
})(jQuery);
