define([
  'jquery',
  'underscore',
  'backbone',
  'app/model/AgendaCollection',
  'text!templates/AgendaTpl.html',
  'app/model/PersonModel'
], function($, _, Backbone, Agenda, agendaTemplate, PersonModel){
	var AgendaView = Backbone.View.extend({
		el : '.page',
		events : {
			'click .delete' : 'deleteUser',
			'click .edit' : ''
		},
		deleteUser : function(ev) {
			window.localStorage.removeItem(ev.currentTarget.dataset.userid);
			this.flashMsg.options = { msg : 'User deleted', type : 'alert-success'};
			this.render();
		},
		initialize : function ( options ) {
			this.flashMsg = options.flashMsg;
		},
		render : function (s) {
			var t = this;
			var agenda = new Agenda(this.loadAgenda());
			var template = _.template(agendaTemplate,
					{
						agenda : agenda.models
					});
			t.$el.html(template);
			t.flashMsg.render();
		},
		loadAgenda : function () {
			var agenda = [];
			for (var i = 0; i < window.localStorage.length; i++) {
				var sObj = window.localStorage.getItem(localStorage.key(i));
				var per = new PersonModel(JSON.parse(sObj));
				agenda.push(per);
			}
			return agenda;
		},
		remove : function () {
			this.$el.empty();
			this.undelegateEvents();
		}
	});
	return AgendaView;
});