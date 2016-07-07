require('css/pages/index.css');

window.App = new Marionette.Application();

App.RootView = Marionette.LayoutView.extend({
	el : '#app',
	regions : {
		header : '#header',
		content : '#content',
		footer : '#footer'
	}
});

App.Router = Backbone.Router.extend({
	initialize(options={}){
		this.rootView=options.rootView;
	},
	routes : {
		'' : 'index',
		'about' : 'about'
	},
	before : function(route, params) {

	},
	after : function(route, params) {

	},
	index : function(route, params) {
		var IndexView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _
					.template('Hello Marionette<a href="about?a=5" class="route">about</a>')
		});

		var view = new IndexView();
		this.rootView.getRegion('content').show(view);
	},
	about : function(route, params) {
		var AboutView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _.template('About Marionette<a href="/" class="route">index</a>')
		});

		var view = new AboutView();
		this.rootView.getRegion('content').show(view);
	}
});

App.on("start", function() {
	this.rootView = new this.RootView();

	this.router = new this.Router({
		rootView : this.rootView
	});

	Backbone.history.start({
		root : '',
		pushState : true
	});
});

$(function() {
	
	$(document.body).on('click', 'a.route', function(e) {
		e.preventDefault();
		App.router.navigate($(this).attr('href'), {
			trigger : true
		});
	});

	App.start();
});