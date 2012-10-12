YUI().use("io", "json-parse", "node", 'json-stringify',
    function(Y) {

        //Data fetched will be displayed in a UL in the
        //element #output:
       /// var output = Y.one("#output ul");

        //Event handler called when the transaction begins:
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
	
	
	
	
	function mostrarResultadoBusqueda(recursos)
	{
		var resultado_busqueda = Y.one("#resultado_busqueda");
		var text='<table>';
		for(recurso in recursos) {

			if (recursos[recurso].titulo != '') {
				text += '<tr>';
				text += '<td><img src="' + recursos[recurso].icono + '" title="' + recursos[recurso].extension + '" width="16" height="16" border="0" /></td>';
	var url =  recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso;
				text += '<td><a target="_blank" href="' + recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso + '" title="' + recursos[recurso].comentario + '. ' + recursos[recurso].descripcion + '" '+obtenerFuncionVisualizacionDoumentos(recursos[recurso].extension,url,recursos[recurso].titulo)+'>' + recursos[recurso].titulo + '</a></td>';
				text += '</tr>';
			}
		}
		text += '</table>';

      Y.log("exito en en recibir la respuesta");
resultado_busqueda.set("innerHTML", text);
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

            mostrarResultadoBusqueda(recursos)
            
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

      

	var url = "http://localhost/moodle/mod/agora/proxy_s.php?url=http://smile.esi.uclm.es/agora/recurso/ajax/buscar/?cadena="

       
	 var handleClick = function(o) {
		var palabraBuscar = Y.one("#campo_busqueda").get("value");
		palabraBuscar = escape(palabraBuscar);
		var urlBusqueda = url+palabraBuscar;
            Y.log("Click detected; beginning io request to Yahoo! Pipes.", "info", "example");
	    // Remove the default "X-Requested-With" header as this will
	    // prevent the request from succeeding; the Pipes
	    // resource will not accept user-defined HTTP headers.
	  Y.io.header('X-Requested-With');
            var obj = Y.io(urlBusqueda,cfg);
        }

        //add the click handler to the Load button.
        Y.on("click", handleClick, "#boton_buscar");
  
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
}
