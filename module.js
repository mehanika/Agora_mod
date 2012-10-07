YUI().use("io", "json-parse", "node", 'json-stringify',
    function(Y) {
	
        //Data fetched will be displayed in a UL in the
        //element #output:
       /// var output = Y.one("#output ul");

        //Event handler called when the transaction begins:
        var handleStart = function(id, a) {
            Y.log("iniciando busqueda");
            //output.set("innerHTML", "<li>Loading news stories via Yahoo! Pipes feed...</li>");
        }

        //Event handler for the success event -- use this handler to write the fetched
        //RSS items to the page.
        var handleSuccess = function(id, o, a) {

            //We use JSON.parse to sanitize the JSON (as opposed to simply performing an
            //JavaScript eval of the data):
		var resultado_busqueda = Y.one("#resultado_busqueda");
            var recursos = Y.JSON.parse(o.responseText);

          
var text='<table>';
			for(recurso in recursos) {

				if (recursos[recurso].titulo != '') {
					text += '<tr>';
					text += '<td><img src="' + recursos[recurso].icono + '" title="' + recursos[recurso].extension + '" width="16" height="16" border="0" /></td>';
					text += '<td><a href="' + recursos[recurso].url_base + 'recurso/ver/contenido/' + recursos[recurso].id_recurso + '" title="' + recursos[recurso].comentario + '. ' + recursos[recurso].descripcion + '">' + recursos[recurso].titulo + '</a></td>';
					text += '</tr>';
				}
			}
			text += '</table>';

          Y.log("exito en en recibir la respuesta");
	resultado_busqueda.set("innerHTML", text);
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
		var palabraBuscar = escape(palabraBuscar);
		var urlBusqueda = url+palabraBuscar;
            Y.log("Click detected; beginning io request to Yahoo! Pipes.", "info", "example");
	    // Remove the default "X-Requested-With" header as this will
	    // prevent the request from succeeding; the Pipes
	    // resource will not accept user-defined HTTP headers.
	  Y.io.header('X-Requested-With');
            var obj = Y.io(
                //this is a specific Pipes feed, populated with cycling news:
               urlBusqueda,
                cfg
            );
        }

        //add the click handler to the Load button.
        Y.on("click", handleClick, "#boton_buscar");
    }
);
