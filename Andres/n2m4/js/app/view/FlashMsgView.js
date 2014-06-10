define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/FlashMessageTpl.html'
], function($, _, Backbone, flashMsgTpl){
	 
	var FlashMsgView = Backbone.View.extend({
		el : '.flashMessage',
		render : function () {
			if (!this.options) {
				this.options = { msg : 'UNDEFINED', type :  'alert-danger'};
			}
			var flashMsg = _.template(flashMsgTpl, {
				msg : this.options.msg,
				type : this.options.type
			});
			var fm = $(flashMsg);
			this.$el.html(fm);
			setTimeout(function (){
				fm.fadeOut({ duration : 400, easing : 'linear' });
			}, 3000);
		}
	});
	
	return FlashMsgView;
});