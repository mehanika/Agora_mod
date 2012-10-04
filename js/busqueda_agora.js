YUI({ filter:'raw' }).use("io-xdr", "json-parse", "node",
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
            var oRSS = Y.JSON.parse(o.responseText);

            //From here, we simply access the JSON data from where it's provided
            //in the Yahoo! Pipes output:
          Y.log("exito en en recibir la respuesta");
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
            xdr: {
                use:'native'
            },
            on: {
                //Our event handlers previously defined:
                start: handleStart,
                success: handleSuccess,
                failure: handleFailure
            }
        };

        //Wire the button to a click handler to fire our request each
        //time the button is clicked:
	var palabra_a_buscar = "mod";
	var url = "proxy.php?url=http://smile.esi.uclm.es/agora/recurso/ajax/buscar/?cadena="
	var urlBusqueda = url+palabra_a_buscar;
        var handleClick = function(o) {
            Y.log("Click detected; beginning io request to Yahoo! Pipes.", "info", "example");
	    // Remove the default "X-Requested-With" header as this will
	    // prevent the request from succeeding; the Pipes
	    // resource will not accept user-defined HTTP headers.
	  
            var obj = Y.io(
                //this is a specific Pipes feed, populated with cycling news:
               urlBusqueda,
                cfg
            );
        }

        //add the click handler to the Load button.
        Y.on("click", handleClick, "#pipes");
    }
);
