require('css/polyfill/bootstrap.css');

require('css/polyfill/jquery.css');

require('css/polyfill/layer.css');

//  Page CSS
require('css/pages/index.css');

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

window.App = new Marionette.Application();

App.RootView = Marionette.LayoutView.extend({
    el: '#app',
    regions: {
        header: '#header',
        content: '#content',
        footer: '#footer'
    }
});

App.Router = Backbone.Router.extend({
    initialize(options = {}) {
        this.rootView = options.rootView;
    },
    routes: {
        '': 'index',
        'index': 'index',
        'about': 'about'
    },
    before: function(route = '', params = {}) {

    },
    after: function(route = '', params = {}) {},
    index: function(params = {}) {
        var IndexView = Marionette.ItemView.extend({
            tagName: 'h1',
            template: _
                .template('Hello Marionette<a data-href="about?a=5" href="javascript:void(0);" class="route">about</a>')
        });

        var view = new IndexView();
        this.rootView.getRegion('content').show(view);
    },
    about: function(params = {}) {
        var AboutView = Marionette.ItemView.extend({
            tagName: 'h1',
            template: _.template('About Marionette<a data-href="index" href="javascript:void(0);" class="route">index</a>')
        });

        var view = new AboutView();
        this.rootView.getRegion('content').show(view);
    }
});

App.on("start", function() {
    this.rootView = new this.RootView();
    this.router = new this.Router({
        rootView: this.rootView
    });
    Backbone.history.start({
        root: location.pathname.replace(/^\//, ''),
        pushState: false,
        hashChange: true
    });
});

$(function() {
    App.start();
});

$(function() {
    // 鼠标操作跳转
    $(document.body).on('click', 'a.route', function(e) {
        var href = $(this).data('href');

        App.router.navigate(href, {
            trigger: true
        });

        return false;
    });
});
