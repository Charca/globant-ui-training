var btnEdit = '<button type="button" class="btn btn-default btn-sm editBtn"><span class="glyphicon glyphicon-pencil"></span></button>';
var btnDel = '<button type="button" class="btn btn-default btn-sm delBtn"><span class="glyphicon glyphicon-remove-sign"></span></button>';
var emptyRow = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
var table = $('#agenda');

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
  
  $('.delBtn').mouseover( function () {
    $( this ).parent().parent().addClass('danger');
  });
  
  $('.delBtn').mouseout( function () {
    $( this ).parent().parent().removeClass('danger');
  });

  $('.delBtn').click( function () {
    localStorage.removeItem( $( this ).parent().parent().find('td:first').html() );
    $( this ).parent().parent().remove();
  });
  
  $('.editBtn').click( function () {
    person = personFromRow($( this ).parent().parent());
    loadFormWithPerson( person );
    $( '#edit-row' ).fadeIn( 500 );
  });
  
});

var objToTable = [ 'id', 'name', 'address', 'celphone', 'phone', 'mail' ];

function addToTable (person) {
  
  var newRow = $( emptyRow );
  newRow.attr('id', person.id);
  if ( $('#agenda tbody #' + person.id).length ) {
    $('#agenda tbody #' + person.id).fadeOut( 1000 );
    $('#agenda tbody #' + person.id).replaceWith( newRow );
  } else {
    $('#agenda tbody').append( newRow );
  }
  
  newEBtn = createEditBtn();
  newDBtn = createDelBtn();
  newRow.find("td:last").append(newEBtn);
  newRow.find("td:last").append(' ');
  newRow.find("td:last").append(newDBtn).attr('align', 'center');
  newRow.find('td').each ( function (i) {
    $( this ).html(person[objToTable[i]]);
  });
  //$('#agenda tr').find('td:last').attr('align', 'center');
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

function falseSubmit () {
  $( "form" ).submit(function( event ) {
    if ( $( "input:first" ).val() === "correct" ) {
    $( "span" ).text( "Validated..." ).show();
    return;
    }
    $( "span" ).text( "Not valid!" ).show().fadeOut( 500 );
    event.preventDefault();
    });
}

function personFromRow ( row ) {
  var tmpP = new Person();
  row.find('td').each ( function (i) {
    if (objToTable[i]) {
      tmpP[objToTable[i]] = $( this ).html();
    }
  });
  return tmpP;
}

function loadFormWithPerson ( person ) {
  for (var i = 0; i < objToTable.length; i++) {
    $($('form[name=contact]')[0][objToTable[i]]).val(person[objToTable[i]]);
  }
}

function createDelBtn () {
  var btn = $( btnDel );
  btn.mouseover( function () {
    $( this ).parent().parent().addClass('danger');
  });
  
  btn.mouseout( function () {
    $( this ).parent().parent().removeClass('danger');
  });

  btn.click( function () {
    localStorage.removeItem( $( this ).parent().parent().find('td:first').html() );
    $( this ).parent().parent().remove();
  });
  return btn;
}

function createEditBtn () {
  var btn = $( btnEdit );
  btn.click( function () {
    person = personFromRow($( this ).parent().parent());
    loadFormWithPerson( person );
    $( '#edit-row' ).hide().fadeIn( 500 );
  });
  return btn;
}
