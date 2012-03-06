/**
 * @summary     jQuery UI TrayDialog
 * @description A tray dialog that slides out from somewhere.
 * @file        jquery.ui.traydialog.js
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
    //TODO: More standard positioning, like using the jquery ui positioning
    /**
     * The traydialog is a compact dialog that slides out horizontally.  It only contains the 
     * content area of a dialog and not the titlebar or normal button pane. The element that
     * the traydialog is created on is actually the element that, when clicked, causes the 
     * traydialog to open.  It is thin wrapper for the main jQuery UI Dialog widget.  Most of the 
     * options are passesd through to that widget
     * @require UI Core
     * @require UI Widget
     * @require UI Dialog
     * @example 
     *      $('#linkId').traydialog();
     * @samplemarkup
     * <pre>
     *     &lt;div class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-traydialog ui-traydialog-block-buttons">
     *         &lt;div id="linkId_dlg" class="ui-traydialog-content ui-dialog-content ui-widget-content">
     *            ...
     *         &lt;/div>
     *         &lt;div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">&lt;/div>
     *     &lt;/div>
     * </pre>
     */
    $.widget("ui.traydialog", {
        /**
         * Default options for the widget.
         */
        options: {
            /**
             * The width of the dialog. May be "auto"
             * @type {number|string}
             */
            width: "auto",
            /**
             * The height of the dialog, May be "auto"
             * @type {number|string}
             */
            height: "auto",
            /**
             * The minimum height of the dialog
             * @type {?number}
             */
            minHeight: null,
            /**
             * The minimum width of the dialog
             * @type {?number}
             */
            minWidth: null,
            /**
             * Horizontal pixel offset from the element clicked to open the dialog
             * @type {?number}
             */
            offsetX: null,
            /**
             * Vertical pixel offset from the element clicked to open the dialog
             * @type {?number}
             */
            offsetY: null,
            /**
             * Absolute horizontal position to open the dialog at
             * @type {?number}
             */
            posX: null,
            /**
             * Absolute vertical position to open the dialog at
             * @type {?number}
             */
            posY: null,
            /**
             * Id of an element containing content for the dialog
             * @type {?string}
             */
            content: null,
            /**
             * URL of content to load into the dialog
             * @type {?string}
             */
            src: null,
            /**
             * Whether or not to open the dialog as soon as it it created
             */
            autoOpen: false,
            /**
             * An object containing buttons for the dialog see the jQuery UI 
             * Dialog documentation for more info
             * @type {Object|Array.<Object>}
             */
            buttons: null,
            /**
             * How to display the buttons.  'inline' (default) will cause buttons to
             * display inline with the contents of the dialog, rather than below ('block').
             */
            buttonDisplay: 'inline'
        },
        /**
         * Creates the widget.
         */
        _create: function() {
            var self = this,
                id = self.element.attr("id"),
                el = self.element.click(function() {
                        self.open.call(self);
                    }).css({ cursor: 'pointer'}),
                options = self.options,
                height = (options.height === 'auto') ? options.height : options.height + "px",
                minHeight = (options.minHeight) ? options.minHeight + 'px' : '0px',
                dlg = (this.dlg = $('<div/>')).addClass('ui-traydialog-content').appendTo($('body')).css({'display':'inline-block'}).dialog({
                    resizable: false,
                    autoOpen: options.autoOpen,
                    width: options.width,
                    height: options.height,
                    minWidth: options.minWidth,
                    minHeight: options.minHeight,
                    draggable: false,
                    show: 'slide',
                    hide: 'slide',
                    open: function(event, ui) {
                        $(this).css({'min-height':minHeight, 'height':height});
                        setTimeout(function() {
                            self.dlg.parent().focus();
                        }, 600);
                    },
                    dialogClass: 'ui-traydialog ui-traydialog-' + options.buttonDisplay + '-buttons',
                    buttons: options.buttons
                });
    
                if (id === null || id === undefined || id === "") {
                    id = "tray_" + $.ui.traydialog.count++;
                }
                el.attr("id", id);
                dlg.attr("id", id + "_dlg");
    
                if (options.content) {
                    $("#" + options.content).show().appendTo(this.dlg);
                }
    
                self.dlg.parent().focusout(function(e) {
                    if (e && e.type !== 'click') {
                        var target = e.originalEvent.explicitOriginalTarget,
                            parents = $(target).parentsUntil(".ui-traydialog").andSelf();
                        if (target === self.element[0] || self.dlg.parent().has(target)) {
                            //TODO: figure out how to make this work with timepickrs in the dialog (or anything that relies on having focus)
    //                            setTimeout(function() {
    //                                self.dlg.parent().focus();
    //                            }, 600);
                            //return false;
                            return;
                        }
                    }
                    self.close.call(self);
                });
        },
        /**
         * Destroys the widget, returning the element to it's original state
         */
        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments);
            this.dlg.dialog("destroy");
            this.dlg.empty().remove();
        },
        /**
         * Opens the dialog
         */
        open: function() {
            if (this._trigger("beforeopen")) {
                var pos = this.element.offset(),
                options = this.options,
                w = this.element.outerWidth(),
                h = this.element.outerHeight(),
                posX = this.options.posX || (this.options.offsetX ? (pos.left + w + options.offsetX) : "center"),
                posY = this.options.posY || (this.options.offsetY ? (pos.top - $(document).scrollTop() + (1 + (h-options.offsetY)/2)) : "center");
                pos = [posX, posY];
                this.dlg.dialog('option', 'position', pos);
                if (this.options.src) {
                    this.dlg.load(this.options.src);
                } else if (options.content) { 
                    $("#" + options.content).show().appendTo(this.dlg);
                }
                this.dlg.dialog("open");
                this._trigger("afteropen");
            }
        },
        /**
         * Closes the dialog
         */
        close: function() {
            if (this._trigger("beforeclose")) {
                this.dlg.dialog("close");
                this._trigger("afterclose");
            }
        },
        /**
         * Handles setting options for the widget
         */
        _setOption: function(option, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            
            if (option === "buttons") {
                this.dlg.dialog("option", "buttons", value);
            }
        }
    });
    $.ui.traydialog.count = 0;
    
    /**
     * Event fired before the dialog opens.  Returning false from the event handler
     * will prevent the dialog from opening
     * @event
     * @name ui.traydialog#beforeopen
     * @param {Event}  e jQuery event object
     */
    
    /**
     * Event fired after the dialog opens.
     * @event
     * @name ui.traydialog#afteropen
     * @param {Event}  e jQuery event object
     */
    
    /**
     * Event fired before the dialog closes.  Returning false from the event handler
     * will prevent the dialog from closing
     * @event
     * @name ui.traydialog#beforeclose
     * @param {Event}  e jQuery event object
     */
    
    /**
     * Event fired after the dialog closes.
     * @event
     * @name ui.traydialog#afterclose
     * @param {Event}  e jQuery event object
     */
    
    /**
     * Default traydialog.
     * @demo Default Functionality
     * @demoscript
     *      $(function() {
     *          $("#link").traydialog({
     *              content: "content",
     *              buttons: {
     *                  close: function (e, ui) {
     *                      $("#link").traydialog("close");
     *                  }
     *              }
     *          });
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <a id="link">Link</a>
     *      </div>
     *      <div id="content" style="padding: 4px 4px 0;">Here's the traydialog content</div>
     * @memberof ui.traydialog
     * @name default
     */
    
    /**
     * Relatively positioned traydialog.
     * @demo Relative Positioning
     * @demoscript
     *      $(function() {
     *          $("#link").traydialog({
     *              content: "content",
     *              buttons: {
     *                  close: function (e, ui) {
     *                      $("#link").traydialog("close");
     *                  }
     *              },
     *              offsetX: -23,
     *              offsetY: -10
     *          });
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <a id="link">Link</a>
     *      </div>
     *      <div id="content" style="padding: 4px 4px 0;">Here's the traydialog content</div>
     * @memberof ui.traydialog
     * @name relposition
     */
    
    /**
     * Non-inline buttons.
     * @demo Non-inlne Buttons
     * @demoscript
     *      $(function() {
     *          $("#link").traydialog({
     *              content: "content",
     *              buttons: {
     *                  close: function (e, ui) {
     *                      $("#link").traydialog("close");
     *                  }
     *              },
     *              offsetX: -23,
     *              offsetY: -10,
     *              buttonDisplay: "block"
     *          });
     *      });
     * @demomarkup
     *      <div class="demo">
     *          <a id="link">Link</a>
     *      </div>
     *      <div id="content" style="padding: 4px 4px 0;">Here's the traydialog content</div>
     * @memberof ui.traydialog
     * @name blockbuttons
     */
})(jQuery);
