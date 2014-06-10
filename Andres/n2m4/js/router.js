define([
    'jquery',
    'underscore',
    'backbone',
    'app/view/AgendaView',
    'app/view/PersonEditView',
    'app/view/FlashMsgView'
  ], function($, _, Backbone, AgendaView, PersonEditView, FlashMsgView){
	
	var AppRouter = Backbone.Router.extend({
		routes : {
			'' : 'home',
			'new' : 'edit',
			'edit/:id' : 'edit',
			'*actions': 'defaultAction'
		}
	});
	
	var router = new AppRouter();
	
    var initialize = function(){
		
    	var currentView = { remove : function (){} };
    	var flashMessage = new FlashMsgView();
    	
		router.on('route:home', function() {
			currentView.remove();
			currentView = new AgendaView( { flashMsg : flashMessage } );
			currentView.on('navigation', function ( route, options ) {
		    	router.navigate( route, options );
		    });
			currentView.render();
		});
		router.on('route:edit', function(id) {
			currentView.remove();
			currentView = new PersonEditView( { flashMsg : flashMessage } );
			currentView.on('navigation', function ( route, options ) {
		    	router.navigate( route, options );
		    });
			currentView.render({
				id : id
			});
		});
		router.on('defaultAction', function(actions){
		    console.log('No route:', actions);
		});
		Backbone.history.start();
			
    };

    return {
    	initialize : initialize
    };
});