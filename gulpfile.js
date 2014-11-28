var fs = require ('fs');
var http = require ('http');
var exec = require ('child_process').exec;

var gulp = require ('gulp');
var browserify = require ('gulp-browserify');
var gLess = require ('gulp-less');
var gMinifyCss = require ('gulp-minify-css');
var gPrint = require ('gulp-print');
var gRename = require ('gulp-rename');
var gUglify = require ('gulp-uglify');

var sequence = require ('run-sequence');

gulp.task ('default', ['watch', 'startLocalServer'], function () {});

gulp.task ('watch', function () {
	watchCompilableBlogFiles ();
	gulp.watch (
		['blog/**/*.html', 'blog/**/*.css', 'blog/script/*.min.js'],
		['push']
	);
});

gulp.task ('watchLocal', function () {
	watchCompilableBlogFiles ();
});

function watchCompilableBlogFiles () {
	gulp.watch (
		['blog/script/*.js', '!blog/script/*.min.js', '!blog/script/test/*'],
		['compileBlogJs']
	);

	gulp.watch (
		['blog/style/*.less'], 
		['compileBlogLess']
	);
}

gulp.task ('compileBlogJs', function () {
	return gulp.src ('blog/script/main.js')
		.pipe (browserify())
		.pipe (gUglify())
		.pipe (gRename ('main.min.js'))
		.pipe (gulp.dest ('blog/script/'));
});

gulp.task ('compileBlogLess', function () {
	return gulp.src ('blog/style/main.less')
		.pipe (gLess())
		.pipe (gMinifyCss())
		.pipe (gRename ('main.css'))
		.pipe (gulp.dest ('blog/style/'));
});

var rsyncInclude = [
	'script/main.min.js'
];
var rsyncExclude = [
	'.DS_Store', // Damn you Mac
	'*.swp',
	'*.less',
	'script/*'
];
gulp.task ('push', function () {
	var rsyncCmd = ["rsync -rav -e ssh "];
	rsyncInclude.forEach (function (value) {
		rsyncCmd.push ("--include='" + value + "' ");
	});
	rsyncExclude.forEach (function (value) {
		rsyncCmd.push ("--exclude='" + value + "' ");
	});
	rsyncCmd.push ("blog/ azombies@azombiestorygame.com:~/public_html/joshuasharris/blog");
	
	console.log("=== RSYNC ======================");
	exec (rsyncCmd.join(''), function (error, stdout, stderr) {
		console.log(error);
		console.log(stderr);
		console.log (stdout);
		console.log("=== END RSYNC ==================");
	});
});

gulp.task ('build', ['compileBlogJs', /*'compileBlogLess',*/ 'push']);

/*******************************
 * Local Server
 */

var port = 5995;

gulp.task ('startLocalServer', function () {
	http.createServer(function (req, res) {
		console.log (req.url);
		if (req.url == '/') {
			respondWithFileHtml ('blog/index.html', res);
		} else {
			respondWithFileHtml ('blog' + req.url, res);
		}

	})
	.listen (port, '127.0.0.1');
});

function respondWithFileHtml (file, res) {
	fs.readFile (file, function (err, data) {
		if (err) console.log (err);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end (data);
	});
}
