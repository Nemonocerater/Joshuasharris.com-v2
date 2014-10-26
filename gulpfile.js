var exec = require ('child_process').exec;

var gulp = require ('gulp');
var browserify = require ('gulp-browserify');
var print = require ('gulp-print');
var rename = require ('gulp-rename');

gulp.task ('default', ['watch'], function () {});

gulp.task ('watch', function () {
	gulp.watch (
		['blog/script/*.js', 'blog/blogs.js', '!blog/script/*.min.js'],
		['compileBlogJs']
	);

	gulp.watch (
		['blog/**/*.html', 'blog/**/*.css', 'blog/script/*.min.js'],
		['push']
	);
});

gulp.task ('compileBlogJs', function () {
	return gulp.src ('blog/script/main.js')
		.pipe (browserify())
		.pipe (rename('main.min.js'))
		.pipe (gulp.dest ('blog/script/'));
});

gulp.task ('push', function () {
	console.log('pushin');
	exec ("rsync -rav -e ssh --exclude='*.swp' blog/ azombies@azombiestorygame.com:~/public_html/joshuasharris/blog", function (error, stdout, stderr) {
		console.log(error);
		console.log(stderr);
		console.log (stdout);
	});
});
