/**
 * 
 */

// (nombre, dirección, celular, teléfono particular, email)
//var Person = {
//
//  id : '',
//  name : '',
//  address : '',
//  celphone : '',
//  phone : '',
//  email : '',
//
//  save : function () {
//    console.log('Saving ' + this.name);
//    //window.localStorage.setItem(this.id, );
//  },
//
//  serialize : function () {
//    this.keys();
//  }
//};



function Person(id, name, mail) {
  
  if ( id ) {
    this.id = id;
  } else {
    this.id = new Date().getTime();
  }
  this.name = name;
  this.mail = mail;

  this.address = '';
  this.celphone = '';
  this.phone = '';

}

Person.prototype.save = function() {
  if ( !this.id ) {
    this.id = new Date().getTime();
  }
  console.log('Saving: ' + this.serialize());
  window.localStorage.setItem(this.id, this.serialize());
  return (window.localStorage.getItem(this.id) === this.serialize());
};

Person.prototype.serialize = function() {
  console.log('Serializing: ' + this.name);
  return JSON.stringify(this);
};

Person.prototype.unserialize = function(json) {
  console.log('Restoring: ' + json);
  var p = this;
  JSON.parse(json, function(key, val) {
    p[key] = val;
  });
};

Person.prototype.edit = function() {

};