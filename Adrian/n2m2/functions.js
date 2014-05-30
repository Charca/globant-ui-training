$(function(){
	//Definición de variables globales
	
	var operacion = "A"; //"A"=Agregando; "E"=Editando

	var indice_selec = -1; //Indice del elemento de la lista seleccionado

	var tbContactos = localStorage.getItem("tbContactos");//Devuelve los datos almancenados y se almacenan en la tabla

	tbContactos = JSON.parse(tbContactos); //Convierte String en Object

	if(tbContactos == null) //Si no hay datos, inicializa un arreglo vacío
		tbContactos = [];

	function Agregar(){
		var contacto = JSON.stringify({ //Convierte un object en string con sintaxis JSON
			Nombre    : $("#txtNom").val(),
			Dirección : $("#txtDir").val(),
			Teléfono  : $("#txtTel").val(),
			Email 	  : $("#txtEmail").val()
		});
		tbContactos.push(contacto);
		localStorage.setItem("tbContactos", JSON.stringify(tbContactos)); //Almacena un valor en el LocalStorage 
		alert("Los datos fueron guardados correctamente.");
		return true;
	}

	function Editar(){	//Modificar el elemento seleccionado de la tabla
		tbContactos[indice_selec] = JSON.stringify({
			Nombre    : $("#txtNom").val(),
			Dirección : $("#txtDir").val(),
			Teléfono  : $("#txtTel").val(),
			Email 	  : $("#txtEmail").val()
		});
		localStorage.setItem("tbContactos", JSON.stringify(tbContactos));
		alert("Los datos fueron editados correctamente.")
		operacion = "A"; //Adquiere valor por defecto
		return true;
	}

	function Borrar(){
		tbContactos.splice(indice_selec, 1);
		localStorage.setItem("tbContactos", JSON.stringify(tbContactos));
		alert("Contacto borrado.");
	}

	function Listar(){		
		$("#tblList").html("");
		$("#tblList").html(
			"<thead>"+
			"	<tr>"+
			"	<th></th>"+
			"	<th>Nombre</th>"+
			"	<th>Dirección</th>"+
			"	<th>Teléfono</th>"+
			"	<th>Email</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);
		for(var i in tbContactos){
			var cli = JSON.parse(tbContactos[i]);
		  	$("#tblList tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='Edit"+i+"' class='btnEdit'/><img src='delete.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
										 "	<td>"+cli.Nombre+"</td>" + 
										 "	<td>"+cli.Dirección+"</td>" + 
										 "	<td>"+cli.Teléfono+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
		  								 "</tr>");
		}
	}

//Patrón Observer sencillo usando JQuery.bind (suscribe) para suscribir las funciones a los objetos y que ésta sea notificada por ellos
//cuando ocurre algún evento (click en los botones guardar/editar/borrar)
	
	//Evento onSubmit en el botón guardar
	$("#frmAgenda").bind("submit",function(){		
		if(operacion == "A")
			return Agregar();
		else
			return Editar();
	});

	Listar(); //Para actualizar la tabla

	//Evento onClick en los botones de edición
	$(".btnEdit").bind("click", function(){

		operacion = "E"; //"E"=Editando
		indice_selec = parseInt($(this).attr("alt").replace("Edit", ""));
		
		var cli = JSON.parse(tbContactos[indice_selec]);
		$("#txtNom").val(cli.Nombre);
		$("#txtDir").val(cli.Dirección);
		$("#txtTel").val(cli.Teléfono);
		$("#txtEmail").val(cli.Email);
		$("#txtNom").focus();
	});

	//Evento onClick en los botones de borrado
	$(".btnDelete").bind("click", function(){
		indice_selec = parseInt($(this).attr("alt").replace("Delete", ""));
		Borrar();
		Listar();
	});
});