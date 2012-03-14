/*
 * traydialog_options.js
 */
(function($) {

module("traydialog: options", {
	teardown: function() {
		$("body>.ui-traydialog").remove();
		$("body .ui-traydialog-content").remove();
		$("#content").remove();
	},
	setup: function() {
		$('<span id="content">foo</span>').appendTo($("body"));
	}
});

/**
content: null,
src: null,
buttonDisplay: 'inline'
*/

asyncTest("position, default center on window", function() {
	var el = $('<div></div>');
	el.traydialog({
		autoOpen: true,
		content: "content",
		afteropen: function(e, ui) {
			var dialog = el.traydialog('dialog');
			var offset = dialog.offset();
			deepEqual(offset.left, Math.round(($(window).width() - dialog.outerWidth()) / 2) + $(window).scrollLeft());
			deepEqual(offset.top, Math.round(($(window).height() - dialog.outerHeight()) / 2) + $(window).scrollTop());
			el.remove();
			start();
		}
	});
});

asyncTest("position, absolute", function() {
	var xPos = 20, yPos = 20;
	var el = $('<div></div>');
	el.traydialog({ 
		autoOpen: true, 
		content: "content",
		posX: xPos, 
		posY: yPos,
		afteropen: function(e, ui) {
			var dialog = el.traydialog('dialog');
			var offset = dialog.offset();
			deepEqual(offset.left, $(window).scrollLeft() + xPos);
			deepEqual(offset.top, $(window).scrollTop() + yPos);
			el.remove();
			start();
		}
	});
});

asyncTest("position, at another element", function() {
	var xPos = 20, yPos = 40;
	var el = $('<span style="display:inline-block;">link</span>').appendTo($("body"));
	
	//scrolling so the 'fit' doesn't affect results
    $(window).scrollTop($(document).height() - $(window).height());
    
	el.traydialog({
		autoOpen: true,
		content: "content",
		offsetX: xPos,
		offsetY: yPos,
		afteropen: function(e, ui) {
			var dialog = el.traydialog('dialog');
			var offset = dialog.offset();
			var elOffset = el.offset();
			var startX = elOffset.left + el.outerWidth();
			
			deepEqual(offset.left, Math.round(startX + xPos));
			deepEqual(offset.top, Math.round(elOffset.top + (1 + (el.outerHeight()-yPos)/2)));
			el.remove();
			start();
		}
	});
});

})(jQuery);
