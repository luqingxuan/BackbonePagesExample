// 修正bootstrap样式
require('css/polyfill/bootstrap.css');

// 修正jQuery插件样式
require('css/polyfill/jquery.css');

// 修正SexyButton插件样式
require('css/polyfill/sexybuttons.css');

// ES6 Object.assign fix
require('core-js/es6/object');

// ES6 Fetch Object fix
require('fetch-polyfill');

// ES6 Promise Object fix
require('es6-promise').polyfill();

window.$ = $;

// 国际化支持
moment.locale('zh-CN');

// 解决严格模式下，没有声明就使用的报错
window.moment = moment;

/** ******************************************************************* */
/** **************backbone query paramenter bug fix******************** */
/** ******************************************************************* */

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for stripping urls of hash.
var pathStripper = /#.*$/;

var trailingSlash = /\/$/;

_.extend(Backbone.History.prototype,
		{
			getFragment : function(fragment, forcePushState) {
				/* jshint eqnull:true */
				if (fragment == null) {
					if (this._usePushState || !this._wantsHashChange
							|| forcePushState) {
						fragment = this.location.pathname;
						var root = this.root.replace(trailingSlash, '');
						var search = this.location.search;
						if (!fragment.indexOf(root)) {
							fragment = fragment.substr(root.length);
						}
						if (search && this._hasPushState) {
							fragment += search;
						}
					} else {
						fragment = this.getHash();
					}
				}
				return fragment.replace(routeStripper, '');
			}
		});

/** ******************************************************************* */
/** **************************$$$$$$$********************************** */
/** ******************************************************************* */

// 本地存储插件
$.Storage = require('jstorage');

// cookie
$.Cookies = require("js-cookie");

// 数值/货币格式化插件
$.Accounting = require("accounting");

// XSS过滤
$.XSS = require("xss");