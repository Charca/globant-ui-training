define(
		['backbone'],
		function ( Backbone ) {
			var PersonModel = Backbone.Model.extend({

				defaults : {
					id : null,
					name : '',
					mail : '',
					address : '',
					cellphone : '',
					phone : ''
				},
				saveUser : function() {
					if (!this.get('id')) {
						this.set('id', new Date().getTime());
					}
					window.localStorage.setItem(this.get('id'), this.serialize(this));
					return (window.localStorage.getItem(this.get('id')) === this.serialize());
				},
				serialize : function() {
					return JSON.stringify(this);
				},
				remove : function () {
					localStorage.removeItem( this.attributes.id );
				},
				unserialize : function(json) {
					if (!json && this.attributes.id) {
						var json = window.localStorage.getItem(this.attributes.id);
					} else {
						//throw new Exception('Cacho');
					}
					var p = this.attributes;
					JSON.parse(json, function(key, val) {
						p[key] = val;
					});
				}
			});
			return PersonModel;
		}
);