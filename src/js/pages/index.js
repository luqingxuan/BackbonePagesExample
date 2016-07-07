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

App.Router = Marionette.AppRouter.extend({
	appRoutes : {
		'' : 'index',
		'about' : 'about'
	}
});

App.Controller = Marionette.Controller.extend({
	index : function() {
		App.IndexView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _.template('Hello Marionette<a href="about">about</a>')
		});

		var view = new App.IndexView();

		App.rootView.getRegion('content').show(view);
	},
	about : function() {
		App.AboutView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _.template('About Marionette<a href="">index</a>')
		});

		var view = new App.AboutView();

		App.rootView.getRegion('content').show(view);
	}
});

App.on("start", function() {

	App.rootView = new App.RootView();

	App.controller = new App.Controller();

	App.router = new App.Router({
		controller : App.controller
	});

	Backbone.history.start({
		pushState : true,
		root : ''
	});
});

$(function() {
	$(document.body).on('click', 'a', function(e) {
		e.preventDefault();
		App.router.navigate($(this).attr('href'), {
			trigger : true
		});
	});

	App.start();
});