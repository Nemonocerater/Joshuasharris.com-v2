
/*
	On Action:
		Change Url
		Fire Action
	Set Action:
		Takes Express style routes and an action function
*/

var routeDelimiter = '/';
var variableDelimiter = ':';

module.exports = exports = function Router() {
	var router = this;
	router.routes = {};

	router.set = function Router_set (route, cb) {
		if (route && cb) {
			if (router.routes[route]) {
				router.routes[route].push (cb);
			} else {
				router.routes[route] = [ cb ];
			}
		}
	}

	router.goTo = function (route) {
		var cbs = router.routes[route];
		cbs.forEach (function (cb) {
			cb();
		});
	}

	function bestMatchingRoute (route) {
		var depth = 0;
		var best_cbs = null;
		Object.keys(router.routes).forEach (function (routeName) {
			var newDepth = routeMatch (route, routeName);
			if (newDepth > depth) {
				depth = newDepth;
				best_cbs = router.routes[routeName];
			}
		});
		return cbs;
	}

	function routeMatch (route, pattern) {
		var routeParts = route.split(routeDelimiter);
		var patternParts = route.split(routeDelimiter);

		var score = 0;
		for (var i = 0; i < routeParts.length; i++) {
			if (patternParts[i].charAt(0) === variableDelimiter) break;
			if (patternParts[i] &&
				routeParts[i] &&
				patternParts[i] === routeParts[i])
			{
				score++;
			}
		}
		return score;
	}

}

