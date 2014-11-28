
var assert = require ('assert');
var Router = require ('../router.js');

describe ("Router", function () {
	describe ("set()", function () {
		it ("Should have a call back when a route is set", function () {
			var r = new Router();
			var route = "blah/foobar";
			var cb = function () { return 0; };
			r.set (route, cb);
			assert.ok (r.routes[route]);
		});

		it ("Should have multiple callbacks when multiple are set", function () {
			var r = new Router();
			var route = "blah/foobar";
			r.set (route, function() {});
			r.set (route, function() {});
			assert.strictEqual (r.routes[route].length, 2);
		});

		it ("Should have no reference if route is null", function () {
			var r = new Router();
			r.set (null, function() {});
			assert.equal (Object.keys(r.routes).length, 0);
		});

		it ("Should have no reference if cb is null", function () {
			var r = new Router();
			var route = "blah/foobar";
			r.set (route, null);
			assert.equal (Object.keys(r.routes).length, 0);
		});
	});

	describe ("goTo()", function () {
		it ("Should call function when route is changed", function () {
			var r = new Router();
			var route = "blah/foobar";
			var called = false;
			var cb = function () { called = true; };
			r.set (route, cb);
			r.goTo (route);
			assert.ok (called);
		});

		it ("Should call all functions when route is changed", function () {
			var r = new Router();
			var route = "blah/foobar";
			var called1 = false;
			r.set (route, function() { called1 = true; });
			var called2 = false;
			r.set (route, function() { called2 = true; });
			r.goTo (route);
			assert.ok (called1 && called2);
		});
	});

	describe ("Route Matching", function () {
		it ("Should not match a route with different sizes", function () {
			
		});
		it ("Should call the dominate route and not the lesser one", function () {

		});

	});
});
