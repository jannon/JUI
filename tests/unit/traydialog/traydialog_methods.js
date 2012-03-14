/*
 * traydialog_methods.js
 */
(function($) {

module("traydialog: methods", {
	teardown: function() {
		$("body>.ui-traydialog").remove();
		$("body .ui-traydialog-content").remove();
	}
});

test("init", function() {
	expect(6);

	$("<div></div>").appendTo('body').traydialog({autoOpen: true}).remove();
	ok(true, '.traydialog() called on element');

	$([]).traydialog({autoOpen: true}).remove();
	ok(true, '.traydialog() called on empty collection');

	$('<div></div>').traydialog({autoOpen: true}).remove();
	ok(true, '.traydialog() called on disconnected DOMElement - never connected');

	$('<div></div>').appendTo('body').remove().traydialog({autoOpen: true}).remove();
	ok(true, '.traydialog() called on disconnected DOMElement - removed');

	el = $('<div></div>').traydialog({autoOpen: true});
	var foo = el.traydialog("option", "foo");
	el.remove();
	ok(true, 'arbitrary option getter after init');

	$('<div></div>').traydialog({autoOpen: true}).traydialog("option", "foo", "bar").remove();
	ok(true, 'arbitrary option setter after init');
});

test("destroy", function() {
	expect(4);

	$("<div></div>").appendTo('body').traydialog().traydialog("destroy").remove();
	ok(true, '.traydialog("destroy") called on element');

	$([]).traydialog().traydialog("destroy").remove();
	ok(true, '.traydialog("destroy") called on empty collection');

	$('<div></div>').traydialog().traydialog("destroy").remove();
	ok(true, '.traydialog("destroy") called on disconnected DOMElement');

	var expected = $('<div></div>').traydialog(),
		actual = expected.traydialog('destroy');
	equal(actual, expected, 'destroy is chainable');
});

asyncTest("close", function() {
	expect(3);

	var expected = $('<div></div>').traydialog({autoOpen: true}),
		actual = expected.traydialog('close');
	equal(actual, expected, 'close is chainable');

	var el = $('<div></div>');
	el.traydialog({autoOpen: true})
		.bind("traydialogafterclose", function(e, ui) {
			ok(dlg(el).is(':hidden') && !dlg(el).is(':visible'), 'traydialog hidden after close method called');
			start();
		});
	ok(dlg(el).is(':visible') && !dlg(el).is(':hidden'), 'traydialog visible before close method called');
	el.traydialog('close');	
});

test("open", function() {
	expect(3);

	var expected = $('<div></div>').traydialog({autoOpen: true}),
		actual = expected.traydialog('open');
	equal(actual, expected, 'open is chainable');

	var el = $('<div></div>');
	el.traydialog();
	ok(dlg(el).is(':hidden') && !dlg(el).is(':visible'), 'dialog hidden before open method called');
	el.traydialog('open');
	ok(dlg(el).is(':visible') && !dlg(el).is(':hidden'), 'dialog visible after open method called');
});

test("dialog", function() {
	expect(1);
	
	var dlg = $('<div></div>').traydialog().traydialog('dialog');
	ok(dlg.hasClass('ui-dialog'), '.traydialog("dialog") returns dialog element');
});

})(jQuery);
