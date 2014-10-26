var http = require ('browser-http');
var blogs = require ('../blogs.js');

function loadBlog (index) {
	var blog = blogs[index];
	http.request ('blogs/' + blog.file, { type: "GET" })
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
		a.onclick = function() { loadBlog (index); };
		recent.appendChild (a);
	});
}

populateRecent();
loadBlog(0);

