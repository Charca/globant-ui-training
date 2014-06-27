define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function ( $, _, Backbone, Router ) {
	var initialize = function(){
		Router.initialize();
	};
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	    	if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	          o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	return {
		initialize: initialize
	};
});