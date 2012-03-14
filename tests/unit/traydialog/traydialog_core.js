/*
 * traydialog_core.js
 */

var el,
	offsetBefore, offsetAfter,
	heightBefore, heightAfter,
	widthBefore, widthAfter,
	dragged;

function target(element) {
	var l = element || el;
	return l.traydialog('widget');
}
function dlg(element) {
	var l = element || el;
	return l.traydialog('dialog');
}

function isOpen(why, el) {
	ok(dlg(el).is(":visible"), why);
}

function isNotOpen(why, el) {
	ok(!dlg(el).is(":visible"), why);
}

function broder(el, side){
	return parseInt(el.css('border-' + side + '-width'), 10);
}

function margin(el, side) {
	return parseInt(el.css('margin-' + side), 10);
}

(function($) {

module("traydialog: core");

test("title id", function() {
	expect(6);

	var targetId, trayId;

	// reset the uuid so we know what values to expect
	$.ui.traydialog.uuid = 0;

	el = $('<div></div>').traydialog();
	targetId = target().attr('id');
	equal(targetId, 'tray_0', 'auto-numbered target id');
	ok($("#" + targetId + "_dlg").length, 'auto-numbered tray id');
	el.remove();

	el = $('<div></div>').traydialog();
	targetId = target().attr('id');
	equal(targetId, 'tray_1', 'auto-numbered target id');
	ok($("#" + targetId + "_dlg").length, 'auto-numbered tray id');
	el.remove();
	
	el = $('<div id="foo">').traydialog();
	targetId = target().attr('id');
	equal(targetId, 'foo', 'carried over target id');
	ok($("#" + targetId + "_dlg").length, 'carried over tray id');
	el.remove();
});

test("ARIA", function() {
	expect(1);

	el = $('<div></div>').traydialog();
	ok(target().attr('aria-haspopup'), 'has aria-haspopup attribute');
	el.remove();
});

test("widget method", function() {
	var traydialog = $("<div>").appendTo("#main").traydialog();
	deepEqual(traydialog[0], traydialog.traydialog("widget")[0]);
});

})(jQuery);
