define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/EditContactTpl.html',
  'app/model/PersonModel',
  'app/view/AgendaView'
], function($, _, Backbone, contactEditTpl, PersonModel, AgendaView){
	
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
	var PersonEditView = Backbone.View.extend({
		el : '.page',
		events : {
			'submit .edit-contact-form' : 'saveUser',
			'click .cancel' : 'showList'
		},
		initialize : function ( options ) {
			this.flashMsg = options.flashMsg;
		},
		saveUser : function(ev) {
			ev.preventDefault();
			var userDetails = $(ev.currentTarget).serializeObject();
			var person = new PersonModel(userDetails);
			console.log(person);
			person.saveUser();
			if (userDetails.id) {
				this.flashMsg.options = { msg : 'User edited OK!', type : 'alert-success'};
			} else {
				this.flashMsg.options = { msg : 'User added OK!', type : 'alert-success'};
			}
			this.showList();
		},
		showList : function() {
			this.trigger( 'navigation', '/', { trigger: true } );
		},
		render : function(options) {
			var that = this;
			if (options.id) {
				that.person = new PersonModel({
					id : options.id
				});
				that.person.unserialize();
				var template = _.template(contactEditTpl, {
					person : that.person
				});
				that.$el.html(template);
			} else {
				var template = _.template(contactEditTpl, {
					person : null
				});
				that.$el.html(template);
			}
		},
		remove : function () {
			this.$el.empty();
			this.undelegateEvents();
		}
	});
	return PersonEditView;
}

);