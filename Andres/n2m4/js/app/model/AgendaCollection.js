define ([
		 'backbone',
		 'app/model/PersonModel'
		 ],
		function ( Backbone, PersonModel ) {
			var Agenda = Backbone.Collection.extend({
				model: PersonModel
			});
			return Agenda;
		}
);