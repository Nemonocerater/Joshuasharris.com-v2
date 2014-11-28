var http = require ('browser-http');
var blogs = require ('./blogs.js');

function loadBlog (file) {
	window.location.hash = "#/" + file;
	http.request ('blogs/' + file + ".html", { type: "GET" })
		.then (renderBlog, loadBlogError);
}

function loadBlogError (error) {
	throw error;
}

function renderBlog (response) {
	document.getElementById ('blog').innerHTML = response.data;
}

function populateRecent () {
	var recent = document.getElementById ('recent');
	blogs.forEach( function (blog, index) {
		var a = document.createElement ('a');
		a.innerHTML = blog.title;
		a.href = "#/" + blog.file;
		a.onclick = function() { loadBlog (blog.file); };
		recent.appendChild (a);
	});
}

(function () {
	var fileName = window.location.hash.split('/')[1] || blogs[0].file;
	populateRecent();
	loadBlog (fileName);
})();
