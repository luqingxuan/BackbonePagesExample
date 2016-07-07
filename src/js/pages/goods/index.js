require('css/pages/goods/index.css');

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
		'index' : 'index',
		'about' : 'about'
	},
	before : function(route='', params={}) {
	},
	after : function(route='', params={}) {
	},
	index : function(params={}) {
		var IndexView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _
			.template('Hello Marionette<a data-href="about?a=5" href="javascript:void(0);" class="route">about</a>')
		});

		var view = new IndexView();
		this.rootView.getRegion('content').show(view);
	},
	about : function(params={}) {
		var AboutView = Marionette.ItemView.extend({
			tagName : 'h1',
			template : _.template('About Marionette<a data-href="index" href="javascript:void(0);" class="route">index</a>')
		});

		var view = new AboutView();
		this.rootView.getRegion('content').show(view);
	}	
});

App.on("start", function() {
	this.rootView = new this.RootView();
	this.router=new this.Router({rootView:this.rootView});
	Backbone.history.start({
		root : 'goods/index.html',
		pushState:false,
		hashChange : true
	});
});

$(function(){
	App.start();
});

$(function() {
	// 鼠标操作跳转
	$(document.body).on('click', 'a.route', function(e) {
		App.router.navigate($(this).data('href'), {
			trigger : true
		});
		
		return false;
	});
});