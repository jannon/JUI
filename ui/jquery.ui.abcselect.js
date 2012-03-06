/**
 * @summary     jQuery UI ABCSelect
 * @description Create a simple widget for selecting letters of the alphabet
 * @file        jquery.ui.abselect.js
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

    var /* Classes for the bar containing the letters */
        barClasses = "ui-widget ui-widget-content ui-abcselect ui-corner-all",
        /* Classes for the individual letters */
        defaultClasses = "ui-state-default ui-abcselect-item ui-corner-all",
        /* Classes for the selected letters */
        selectClasses = "ui-abcselect-selected",
        abcs = "All A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
    
    /**
     * This widget provides UI for selecting letters of the English alphabet.  This is
     * useful when a set of items being displayed on a web site is large and can naturally be 
     * filtered alphabetically.
     * @require UI Core
     * @require UI Widget
     * @example 
     *      $('&lt;ul/&gt;').abcselect();
     * @samplemarkup
     * <pre>
     *  &lt;ul class="ui-widget-content ui-abcselect ui-corner-top"&gt;
     *      &lt;li class="ui-abcselect-all ui-abcselect-item ui-corner-all ui-state-highlight ui-abcselect-selected"&gt;All&lt;/li&gt;
     *      &lt;li class="ui-abcselect-a ui-abcselect-item ui-corner-all ui-state-default"&gt;A&lt;/li&gt;
     *      &lt;li class="ui-abcselect-b ui-abcselect-item ui-corner-all ui-state-default"&gt;B&lt;/li&gt;
     *      &lt;li class="ui-abcselect-c ui-abcselect-item ui-corner-all ui-state-default"&gt;C&lt;/li&gt;
     *      ...
     *  &lt;/ul&gt;
     * </pre>
     */
    $.widget("ui.abcselect", {
        /**
         * Default options for the abcselect widget
         */
        options: {
            /**
             * The letters that are selected
             */
            selection: ['All'],
            
            /**
             * Class given to letters on hover
             */
            hoverClass: "ui-state-hover",
            
            /**
             * Class given to letters on click
             */
            activeClass: "ui-state-active",
            
            /**
             * Class given to letters when selected
             */
            selectedClass: "ui-state-highlight",
            
            /**
             * Whether or not to allow multiple selections
             */
            allowMultiple: true
        },
        /**
         * Creates the widget.
         */
        _create: function() {
            
            /* Let's just (effectively) loop once but still set everything up if we need to */
            var self = this,
                o = this.options,
                abcArray = abcs.split(' '),
                children = this.element.children('li'), 
                have = (this.numOriginalChildren = children.length),
                need = abcArray.length,
                list = this.element, i;

            for (i = 0; i < have; i++) {
                children.get(i).addClass('ui-abcselect-' + abcArray[i].toLowerCase()).html(abcArray[i]);
            }
            for(i = have; i < need; i++) {
                $('<li/>').addClass('ui-abcselect-' + abcArray[i].toLowerCase()).html(abcArray[i]).appendTo(list);
            }
            
            /* delegate all the events to the main element */
            this.element.addClass(barClasses)
            .delegate('li', 'click.abcselect', this, function(e) {
                var el = $(e.currentTarget),
                    selection = el.text();
                el.addClass(o.selectedClass + " " + selectClasses);
                if (o.allowMultiple && (e.ctrlKey || e.metaKey) && selection !== 'All' && $.inArray('All', o.selection) === -1) {
                    self.add(selection);   
                } else {
                    self.element.children('.ui-abcselect-selected').not(el).removeClass(o.selectedClass + " " + selectClasses);
                    self._setOption('selection', selection);
                }
            })
            .delegate('li', 'mouseenter.abcselect', this, function(e) {
                $(e.currentTarget).addClass(o.hoverClass);
            })
            .delegate('li', 'mouseleave.abcselect', this, function(e) {
                var el = $(e.currentTarget);
                el.removeClass(o.hoverClass);
                if (el.hasClass(selectClasses)) {
                    el.addClass(o.selectedClass);
                }
            })
           .delegate('li', 'mousedown.abcselect', this, function(e) {
                $(e.currentTarget).addClass(o.activeClass);
            })
            .delegate('li', 'mouseup.abcselect', this, function(e) {
                var el = $(e.currentTarget);
                el.removeClass(o.activeClass);
                if (el.hasClass(selectClasses)) {
                    el.addClass(o.selectedClass);
                }
            })
            .children('li').addClass(defaultClasses);
           
           /* set initial state */
           $.each(o.selection, function(i, val) {
               $('.ui-abcselect-' + val.toLowerCase()).addClass(o.selectedClass + " " + selectClasses);
           });
        },
        /**
         * Handles setting options for the widget
         */
        _setOption: function(option, value) {
            if (option === 'selection') {
                var s = this.options.selection; 
                // if there is more than one current selection or the new selection is not among them
                if (s.length !== 1 || $.inArray(value, s) === -1) {
                    this.options.selection = [value];
                    this._fireChange();
                }
            } else {
                $.Widget.prototype._setOption.apply( this, arguments );
            }
        },
        /**
         * Destroys the widget, returning the element to it's original state
         */
        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments);
            this.element.undelegate("abcselect").removeClass(barClasses)
                .find("li").removeClass(defaultClasses).removeClass(selectClasses)
                .eq(this.numOriginalChildren).nextAll().andSelf().remove();
        },
        /**
         * Clears the selection
         */
        clear: function() {
            this.options.selection = [];
            this._fireChange();
            return this.element;
        },
        /**
         * Adds a letter to the selection
         * @param {string} letter The letter to add to the selection
         */
        add: function(letter) {
            if ($.inArray(letter, this.options.selection) === -1) {
                this.options.selection.push(letter);
                this._fireChange();
            }
            return this.element;
        },
        /**
         * Removes a letter from the current selection
         * @param {string} letter The letter to remove from the selection
         */
        remove: function(letter) {
            var i = $.inArray(letter, this.options.selection);
            if ( i !== -1) {
                this.options.selection.splice(i, 1);
                this._fireChange();
            }
            return this.element;
        },
        /**
         * Retrieves the current selection
         * @returns {Array} Currently selected letters
         */
        selection: function() {
            return (this.options.selection.length === 1 && this.options.selection[0] === 'All') ? [""] : this.options.selection;
        },
        /**
         * Fires a change event
         */
        _fireChange: function() {
            var val = (this.options.selection.length === 1 && this.options.selection[0] === 'All') ? [""] : this.options.selection;
            this._trigger('change', 0, {
                'data': val
            });
        }
    });
    
    /**
     * Event fired whenever the selection changes.
     * @event
     * @name ui.abcselect#change
     * @param {Event}  e jQuery event object
     * @param {Object} ui Event parameters from abcselect
     * @param {Array.<string>}  ui.data The array of the currently selected letters (or 'All')
     */
    
    /**
     * Default abcselect.
     * @demo Default Functionality
     * @demoscript
     *      $(function() {
     *          $("#abc").abcselect();
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <ul id="abc"></ul>
     *      </div>
     * @memberof ui.abcselect
     * @name default
     */
    
    /**
     * Single selection only.
     * @demo Single Selection
     * @demoscript
     *      $(function() {
     *          $("#abc").abcselect({allowMultiple: false});
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <ul id="abc"></ul>
     *      </div>
     * @memberof ui.abcselect
     * @name single
     */
})(jQuery);