var btnEdit = '<button type="button" class="btn btn-default btn-sm editBtn"><span class="glyphicon glyphicon-pencil"></span></button>';
var btnDel = '<button type="button" class="btn btn-default btn-sm delBtn"><span class="glyphicon glyphicon-remove-sign"></span></button>';
var emptyRow = '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';

$(document).ready(function() {
  
  $( "#add-user" ).click ( function () {
    $( '#edit-row' ).fadeToggle();
  });

  $('form[name=contact]').submit(function(event) {
    event.preventDefault();
    var sObj = JSON.stringify($('form[name=contact]').serializeObject());
    var p = new Person( $('#usr-id').val() );
    p.unserialize ( sObj );  
    if ( p.save() ) {
      addToTable ( p );
      $( '#edit-row' ).fadeIn( 500 );
      $('form[name=contact]')[0].reset();
    }
  });
  
  loadAgenda();
  
  $('#cancel-user').click( function () {
    $('form[name=contact]')[0].reset();
    $( '#edit-row' ).fadeOut( 500 );
  });
  
});

var objToTable = [ 'id', 'name', 'address', 'celphone', 'phone', 'mail' ];

function addToTable (person) {
  
  var newRow = $( emptyRow );
  newRow.attr('id', person.id);
  var actualTr = $('#agenda tbody #' + person.id);
  if ( actualTr.length ) {
    actualTr.fadeOut( 500 );
    actualTr.replaceWith( newRow );
  } else {
    $('#agenda tbody').append( newRow );
  }
  
  var newEBtn = createEditBtn( person.id );
  var newDBtn = createDelBtn( person.id );
  var actionTd = newRow.find("td:last");
  actionTd.append( newEBtn ).append( ' ' ).append(newDBtn);
  newRow.find('td').each ( function (i) {
    $( this ).html(person[objToTable[i]]);
  });

}

function loadAgenda () {
  clearAgenda ();
  for (var i = 0; i < window.localStorage.length; i++) {
    var tmpP = new Person();
    tmpP.unserialize(window.localStorage.getItem(localStorage.key(i)));
    addToTable(tmpP);
  }
}

function clearAgenda () {
    $("#agenda tbody tr").remove();
}

function personFromId ( id ) {
  var tmpP = new Person();
  tmpP.unserialize( window.localStorage.getItem( id ) );
  return tmpP;
}

function loadFormWithPerson ( person ) {
  for (var i = 0; i < objToTable.length; i++) {
    $($('form[name=contact]')[0][objToTable[i]]).val(person[objToTable[i]]);
  }
}

function createDelBtn ( itemId ) {
  var btn = $( btnDel );
  btn.mouseover( function () {
    $( '#' + itemId ).addClass('danger');
  });
  
  btn.mouseout( function () {
    $( '#' + itemId ).removeClass('danger');
  });

  btn.click( function () {
    localStorage.removeItem( itemId );
    $( '#' + itemId ).remove();
  });
  return btn;
}

function createEditBtn ( itemId ) {
  var btn = $( btnEdit );
  btn.click( function () {
    person = personFromId( itemId );
    loadFormWithPerson( person );
    $( '#edit-row' ).hide().fadeIn( 500 );
  });
  return btn;
}
