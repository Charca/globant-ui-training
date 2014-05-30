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

$( document ).ready(function() {

	$.get( "templates/header.html", function( data ) {
	  $( "#header" ).html( data );
	});

	$.get( "templates/footer.html", function( data ) {
	  $( "#footer" ).html( data );
	});
	
});