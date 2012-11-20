YUI().use("io", "json-parse", "attribute","node",'gallery-checkboxgroups' ,'json-stringify','stylesheet',
    function(Y) {

	var urlSeleccionada = false;
	var tituloRecursoSeleccionado = false;
	var idSeleccionada = "";

			
	

	function gradient(id, level)
	{
		var box = document.getElementById(id);
		box.style.opacity = level;
		box.style.MozOpacity = level;
		box.style.KhtmlOpacity = level;
		box.style.filter = "alpha(opacity=" + level * 100 + ")";
		box.style.display="block";
		return;
	}      	
	

	function fadein(id) 
	{
		var level = 0;
		while(level <= 1)
		{
			setTimeout( "gradient('" + id + "'," + level + ")", (level* 1000) + 10);
			level += 0.01;
		}
	}


		function openbox(titulo,_url)
		{
			var fadin = 1;
		  	var box = document.getElementById('box'); 
		  	document.getElementById('shadowing').style.display='block';

		  	var btitle = document.getElementById('boxtitle');
		  	btitle.innerHTML = titulo;
		  	var url = encodeURIComponent(_url);
			var descarga = document.getElementById('descarga');
			descarga.href=_url;
			var newUrl = 'http://docs.google.com/viewer?url='+url+'&embedded=true';

			var content = document.getElementById('boxcontent');
			var gframe  = document.getElementById('gframe');
			gframe.src= newUrl;
		//content.innerHTML = iframe;

			  if(fadin)
			  {
				 gradient("box", 0);
				 fadein("box");
			  }
			  else
			  { 	
			    box.style.display='block';
			  }
			  
			  return false;
		}

	function closebox()
	{
	   document.getElementById('box').style.display='none';
	   document.getElementById('shadowing').style.display='none';
		urlSeleccionada = false;
	tituloRecursoSeleccionado = false;
	}



	function obtenerFuncionVisualizacionDoumentos(extensionArchivo,url,titulo)
	{
		var funcionVisualizacion = "";
		//var urlDoc = encodeURIComponent(url);
		//var urlGdocsViewer = 'http://docs.google.com/viewer?url='+urlDoc+'&embedded=true';
		if(extensionArchivo == "ppt" || extensionArchivo == "pdf" || extensionArchivo == "doc" || extensionArchivo == "odt" || 			extensionArchivo == "xls")
		{
			funcionVisualizacion = "onclick=\"openbox('"+titulo+"','"+url+"'); return false;\""
		}

		return funcionVisualizacion;
	}


	function esExtensionValida(extensionArchivo)
	{

		if(extensionArchivo == "ppt" || extensionArchivo == "pdf" || extensionArchivo == "doc" || extensionArchivo == "odt" || 			extensionArchivo == "xls")
		{
			return true;
		}else{

			return true;
		}
	}

	function agregarFuncionesLightBox(extension)
	{
	
	var abrirLightBox  = function(o)
		{

			
			
			
			var enlaceSeleccionado =  o.currentTarget
			//var enlaceSeleccionado = o.target; 
                        var id = enlaceSeleccionado.get("id"); 
			
			
			var extension =  enlaceSeleccionado.get("ext");	
			if(esExtensionValida(extension))
			{
				o.preventDefault();
			
				var url = enlaceSeleccionado.get("href");						

				var titulo = enlaceSeleccionado.get("innerHTML");
				
				idSeleccionada = id;
				
				openbox(titulo,url);
				Y.one("#aceptarRecurso").set("value",id);

				urlSeleccionada = url;
		 		tituloRecursoSeleccionado = titulo;
				enlaceSeleccionado.onclick = function() {return false;};
				return false;
			}else if(extension == "swf")
			{
			 

			  o.preventDefault();
			
				var url = enlaceSeleccionado.get("href");						

				var titulo = enlaceSeleccionado.get("innerHTML");
				var id = enlaceSeleccionado.get("id");
				idSeleccionada = id;
				 mostrarSWF(url,titulo);	
				openbox(titulo,url);
				Y.one("#aceptarRecurso").set("value",id);
	
		   	  
			}

		}

		
	
	Y.delegate('click', abrirLightBox,'#t_resultadoBusqueda', 'tr td a.recursos');
	Y.delegate('click', function(o){alert(o.target.get("value"));},'#t_resultadoBusqueda', 'tr td input.idRecurso');
	
	}
	
	
	
	function mostrarResultadoT_Busqueda(recursos)
	{
		var resultado_busqueda = Y.one("#resultado_busqueda");
			var tablaResultados = mostrarTablaResultados(recursos);
			resultado_busqueda.setHTML(tablaResultados);

		if(recursos.length == 0 )
		{
			resultado_busqueda.setStyle("display", "none");
			
						
		}else{
			resultado_busqueda.setStyle("display", "");
			new Y.AtMostOneCheckboxGroup('.idRecurso');
		
		}
	}




	function mostrarTablaResultados(recursos)
{
		var tabla = Y.Node.create('<table id="t_resultadoBusqueda" ></table>');
		for(var i = 0; i < recursos.length; i++) {
		var recurso = recursos[i];
		
			var filaActual = obtenerFila(recurso);
			tabla.append(filaActual);
		}

	return tabla;
}


function obtenerFila(recurso)
{
   var fila = Y.Node.create('<tr></tr>');
   var columnaCheckbox = Y.Node.create('<td><input type="checkbox" class="idRecurso" value="'+recurso.id_recurso+'" 		id="check_'+recurso.id_recurso+'"/></td>');
  var columnaImagen =Y.Node.create( '<td><img src="' +recurso.icono + '" title="' + recurso.extension + '" width="16" height="16" border="0" /></td>');


 var columnaRecurso = Y.Node.create('<td><a ax="px" ext="'+recurso.extension+'" id="'+recurso.id_recurso+'" class="recursos" target="_blank" href="' + recurso.url_base + 'recurso/ver/contenido/' + recurso.id_recurso + '" onclick="javascript: return true;" title="' + recurso.comentario + '. ' + recurso.descripcion + '" '+'>' + recurso.titulo + '</a><br/>'+recurso.descripcion+ '<br/>Extension: <span id="ext_'+recurso.id_recurso+'">'+recurso.extension+'</span></td>');

	fila.append(columnaCheckbox);
	fila.append(columnaImagen);
	fila.append(columnaRecurso);

	return fila;
}


	
	function mostrarResultadoBusqueda(recursos)
	{
		var resultado_busqueda = Y.one("#resultado_busqueda");
		var text='<table id="t_resultadoBusqueda">';
		
		for(recurso in recursos) {

			if (recursos[recurso].titulo != '') {
				text += '<tr>';
				text+='<td><input type="checkbox" class="idRecurso" value="'+recursos[recurso].id_recurso+'" id="check_'+recursos[recurso].id_recurso+'"/></td>';
				text += '<td><img src="' + recursos[recurso].icono + '" title="' + recursos[recurso].extension + '" width="16" height="16" border="0" /></td>';
	var url =  recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso;
				text += '<td><a ax="px" ext="'+recursos[recurso].extension+'" id="'+recursos[recurso].id_recurso+'" class="recursos" target="_blank" href="' + recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso + '" onclick="javascript: return true;" title="' + recursos[recurso].comentario + '. ' + recursos[recurso].descripcion + '" '+'>' + recursos[recurso].titulo + '</a><br/>'+recursos[recurso].descripcion+ '<br/>Extension: <span id="ext_'+recursos[recurso].id_recurso+'">'+recursos[recurso].extension+'</span></td>';
				text += '</tr>';
			}
		}
		text += '</table>';

      Y.log("exito en en recibir la respuesta");
resultado_busqueda.set("innerHTML", text);


		if(recursos.length == 0 )
		{
			resultado_busqueda.setStyle("display", "none");
			
						
		}else{
			resultado_busqueda.setStyle("display", "");
			new Y.AtMostOneCheckboxGroup('.idRecurso');
		
		}

	}


	
	
        var handleStart = function(id, a) {
            Y.log("iniciando busqueda");
            //output.set("innerHTML", "<li>Loading news stories via Yahoo! Pipes feed...</li>");
        }

        //Event handler for the success event -- use this handler to write the fetched
        //RSS items to the page.
        var handleSuccess = function(id, o, a) {

            //We use JSON.parse to sanitize the JSON (as opposed to simply performing an
            //JavaScript eval of the data):
	
            var recursos = Y.JSON.parse(o.responseText);

            mostrarResultadoT_Busqueda(recursos);
	    agregarFuncionesLightBox();
            
        }

        //In the event that the HTTP status returned does not resolve to,
        //HTTP 2xx, a failure is reported and this function is called:
        var handleFailure = function(id, o, a) {
            Y.log("ERROR " + id + " " + a, "info", "example");
        }

        //With all the apparatus in place, we can now configure our
        //IO call.  The method property is defined, but if omitted,
        //IO will default to HTTP GET.
        var cfg = {
            method: "GET",
          
            on: {
                //Our event handlers previously defined:
                start: handleStart,
                success: handleSuccess,
                failure: handleFailure
            }
        };

      

	var url = "http://localhost/moodle/mod/agora/proxy_s.php?url=http://smile.esi.uclm.es/agora/recurso/ajax/buscar/?cadena=";

	//	/agora/recurso/ajax/buscar/?recueperar="
       
	 var handleClick = function(o) {
		var palabraBuscar = Y.one("#campo_busqueda").get("value");
		 var e_palabraBuscar = escape(palabraBuscar);
		var urlBusqueda = url+e_palabraBuscar;
            
	    		if(palabraBuscar.length <= 0)
			{
				
				 alert('Campo vacio');				
			}else
			{

				Y.io.header('X-Requested-With');
			    var obj = Y.io(urlBusqueda,cfg);
			}
			
			
		}

	function aceptarRecurso(o)
	{

		o.preventDefault();
		var checkboxSeleccionado = Y.one("#check_"+idSeleccionada);
		checkboxSeleccionado.set("checked","true");	
		

		//Estableciendo la url del recurso		
		var urlRecurso =  Y.one("#urlRecurso");
			
		urlRecurso.set("value",urlSeleccionada);
		
		//Estableciendo el titulo del recurso
		var titulo =  Y.one("#tituloRecurso");
		
		titulo.set("value",tituloRecursoSeleccionado);
		
		closebox();

		return false;
	}

	function mostrarSWF(ruta,nombre)
	{
		var so = new SWFObject(ruta, nombre, "500", "500", "8", "#336699");
			so.write("preview");
        }


	function mostrarDellaRecursoSeleccionado()
	{
		var tabla = Y.Node.create("<table></table>");
		Y.one("#detalleRecurso").appendChild(tabla);
	}

        //add the click handler to the Load button.
        Y.on("click", handleClick, "#boton_buscar");
	Y.on("click",closebox,"#cancelar");
	Y.on("click",aceptarRecurso,"#aceptarRecurso")
  
    
}
);




function gradient(id, level)
{
	var box = document.getElementById(id);
	box.style.opacity = level;
	box.style.MozOpacity = level;
	box.style.KhtmlOpacity = level;
	box.style.filter = "alpha(opacity=" + level * 100 + ")";
	box.style.display="block";
	return;
}

/**
function fadein(id) 
{
	var level = 0;
	while(level <= 1)
	{
		setTimeout( "gradient('" + id + "'," + level + ")", (level* 1000) + 10);
		level += 0.01;
	}
}

function openbox(titulo,_url,idRecurso)
{
var fadin = 1;
  var box = document.getElementById('box'); 
  document.getElementById('shadowing').style.display='block';

  var btitle = document.getElementById('boxtitle');
  btitle.innerHTML = "Calidad de los objetos de aprendizaje";
  var url = encodeURIComponent(_url);
	var descarga = document.getElementById('descarga');
	descarga.href=_url;
	var newUrl = 'http://docs.google.com/viewer?url='+url+'&embedded=true';

	var content = document.getElementById('boxcontent');
	var gframe  = document.getElementById('gframe');
	gframe.src= newUrl;
//content.innerHTML = iframe;

  if(fadin)
  {
	 gradient("box", 0);
	 fadein("box");
  }
  else
  { 	
    box.style.display='block';
  }
  
  return false;
}

function closebox()
{
   document.getElementById('box').style.display='none';
   document.getElementById('shadowing').style.display='none';
}**/

YUI().use('node',"json-parse",'json-stringify', function (Y) {
    // Node is available and ready for use. Add implementation
    // code here.



function mostrarTablaResultados(recursos)
{

		for(var i = 0; i < recursos.length; i++) {
		var recurso = recursos[i];
		var tabla = Y.Node.create('<table id="t_resultadoBusqueda" ></table>');
			var filaActual = obtenerFila(recurso);
			tabla.append(filaActual);
		}

	return tabla;
}


function obtenerFila(recurso)
{
   var fila = Y.Node.create('<tr></r>');
   var columnaCheckbox = Y.Node.create('<td><input type="checkbox" class="idRecurso" value="'+recurso.id_recurso+'" 		id="check_'+recurso.id_recurso+'"/></td>');
  var columnaImagen =Y.Node.create( '<td><img src="' + recursos[recurso].icono + '" title="' + recursos[recurso].extension + '" width="16" height="16" border="0" /></td>');


 var columnaRecurso = Y.Node.create('<td><a ax="px" ext="'+recursos[recurso].extension+'" id="'+recursos[recurso].id_recurso+'" class="recursos" target="_blank" href="' + recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso + '" onclick="javascript: return true;" title="' + recursos[recurso].comentario + '. ' + recursos[recurso].descripcion + '" '+'>' + recursos[recurso].titulo + '</a><br/>'+recursos[recurso].descripcion+ '<br/>Extension: <span id="ext_'+recursos[recurso].id_recurso+'">'+recursos[recurso].extension+'</span></td>');

	fila.append(columnaCheckbox);
	fila.append(columnaImagen);
	fila.append(columnaRecurso);
}

});
