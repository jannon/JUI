/*
 * traydialog_events.js
 */
(function($) {

module("traydialog: events");

test("beforeopen", function() {
	expect(9);

	var el = $("<div></div>");
	el.traydialog({
		beforeopen: function(ev, ui) {
			ok(true, 'autoOpen: true fires beforeopen callback');
			equal(this, el[0], "context of callback");
			equal(ev.type, 'traydialogbeforeopen', 'event type in callback');
			deepEqual(ui, {}, 'ui hash in callback');
			return false;
		}
	});
	el.traydialog("open");
	isNotOpen('beforeopen callback should prevent dialog from opening', el);
	el.remove();

	el = $("<div></div>").traydialog().bind('traydialogbeforeopen', function(ev, ui) {
		ok(true, 'traydialog("open") fires beforeopen event');
		equal(this, el[0], 'context of event');
		deepEqual(ui, {}, 'ui hash in event');
		return false;
	});
	el.traydialog("open");
	isNotOpen('beforeopen callback should prevent dialog from opening', el);
	el.remove();
});

asyncTest("afteropen, autoOpen", function() {
	expect(4);

	var el = $("<div></div>");
	el.traydialog({
		autoOpen: true,
		afteropen: function(ev, ui) {
			ok(true, 'autoOpen: true fires afteropen callback');
			equal(this, el[0], "context of callback");
			equal(ev.type, 'traydialogafteropen', 'event type in callback');
			deepEqual(ui, {}, 'ui hash in callback');
			el.remove();
			start();
		}
	});
});

asyncTest("afteropen, 'open' method", function() {
	expect(7);

	var el = $("<div></div>");
	el.traydialog({
		afteropen: function(ev, ui) {
			ok(true, '.traydialog("open") fires afteropen callback');
			equal(this, el[0], "context of callback");
			equal(ev.type, 'traydialogafteropen', 'event type in callback');
			deepEqual(ui, {}, 'ui hash in callback');
		}
	}).bind('traydialogafteropen', function(ev, ui) {
		ok(true, 'traydialog("open") fires afteropen event');
		equal(this, el[0], 'context of event');
		deepEqual(ui, {}, 'ui hash in event');
		el.remove();
		start();
	});
	el.traydialog("open");
});

asyncTest("afterclose", function() {
	expect(7);
	
	var el = $('<div></div>');
	el.bind('traydialogafterclose', function(ev, ui) {
	    ok(true, '.traydialog("close") fires traydialogafterclose event');
        equal(this, el[0], 'context of event');
        deepEqual(ui, {}, 'ui hash in event');
        el.remove();
        start();
    })
    .traydialog({
		autoOpen: true,
		afterclose: function(ev, ui) {
		    ok(true, '.traydialog("close") fires afterclose callback');
			equal(this, el[0], "context of callback");
			equal(ev.type, 'traydialogafterclose', 'event type in callback');
			deepEqual(ui, {}, 'ui hash in callback');
		},
		afteropen: function(ev, ui) {
		    el.traydialog("close");
		}
	});
});

asyncTest("beforeclose, callback", function() {
	expect(5);
	var el = $('<div></div>');
	el.traydialog({
		autoOpen: true,
		beforeclose: function(ev, ui) {
			ok(true, '.traydialog("close") fires beforeclose callback');
			equal(this, el[0], "context of callback");
			equal(ev.type, 'traydialogbeforeclose', 'event type in callback');
			deepEqual(ui, {}, 'ui hash in callback');
			return false;
		},
		afteropen: function(ev, ui) {
			el.traydialog('close');
			isOpen('beforeclose callback should prevent dialog from closing', el);
			el.remove();
			start();
		}
	});
});

asyncTest("beforeclose, option", function() {
	expect(5);
	var el = $('<div></div>');
	el.traydialog({
		autoOpen: true,
		afteropen: function(ev, ui) {
			el.traydialog('option', 'beforeclose', function(ev, ui) {
				ok(true, '.tryadialog("close") fires beforeclose callback');
				equal(this, el[0], "context of callback");
				equal(ev.type, 'traydialogbeforeclose', 'event type in callback');
				deepEqual(ui, {}, 'ui hash in callback');
				return false;
			});
			
			el.traydialog('close');
			isOpen('beforeClose callback should prevent dialog from closing', el);
			el.remove();
			start();
		}
	});
});

asyncTest("beforeclose, bind", function() {
	expect(4);
	var el = $('<div></div>');
	el.bind('traydialogbeforeclose', function(ev, ui) {
		ok(true, '.traydialog("close") triggers traydialogbeforeclose event');
		equal(this, el[0], "context of event");
		deepEqual(ui, {}, 'ui hash in event');
		return false;
	}).traydialog({
		autoOpen: true,
		afteropen: function(ev, ui) {
			el.traydialog('close');
			isOpen('traydialogbeforeclose event should prevent dialog from closing', el);
			el.remove();
			start();
		}
	});
});

})(jQuery);
