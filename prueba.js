/**
 * @namespace
 */
M.mod_agora = M.mod_agora || {};

/**
 * This function is initialized from PHP
 *
 * @param {Object} Y YUI instance
 */
M.mod_agora.init = function(Y) {
   
	var urlSeleccionada = false;
	var tituloRecursoSeleccionado = false;
	var idSeleccionada = "";
        var extensionSeleccionada ="";
        var idRecursoSeleccionado = "";
			
/*
 *@param {Integer} id
 *@para {Float}	leve
 *	
 */     
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
			//setTimeout( "gradient('" + id + "'," + level + ")", (level* 1000) + 10);
			setTimeout(function(){ gradient(id,level);},(level* 1000) + 10);
			level += 0.01;
		}
	}

/*
 *Funcion para abrir la caja de visualizacion de documentos
 *
 *@param {String} titulo
 *@param {String} _url
 *
 */

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
                
/*
 *Función para abrir la caja de visualizacion de archivos .swf
 *
 *@param {String}titulo
 *@param {String} _url
*/        

function openboxSWF(titulo,_url)
{
	var fadin = 1;
	
        var box = document.getElementById('box'); 
	
        document.getElementById('shadowing').style.display='block';

	var btitle = document.getElementById('boxtitle');
	
        btitle.innerHTML = titulo;
		  	
        var url = encodeURIComponent(_url);
			var descarga = document.getElementById('descarga');
			descarga.href=_url;
			//var newUrl = 'http://docs.google.com/viewer?url='+url+'&embedded=true';

			var content = document.getElementById('boxcontent');
			var gframe  = document.getElementById('gframe');
			Y.one('#preview').setStyle("display", "");
			//gframe.src= newUrl;
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
/*
 *Despliga el archivo .swf para que pueda ser visualizado
 * 
 * @param {String} ruta
 * @param {String} nombre
 */	
	function mostrarSWF(ruta,nombre)
	{
		swfobject.embedSWF(ruta, "preview", "100%", "80%", "9.0.0");
        }
/*
 *Cierra la caja de visualizacion
 * 
 * 
 */        

	function closebox()
	{
	   document.getElementById('box').style.display='none';
	   document.getElementById('shadowing').style.display='none';
	   urlSeleccionada = false;
	   tituloRecursoSeleccionado = false;
	   restablecerLightBox();
	       
	}
/*
 * Restablece la caja de visualizacion 
 */
	
	function restablecerLightBox()
	{
		 var preview = Y.Node.create('<div id="preview"><iframe id="gframe" scrolling="auto"></iframe></div>');
	   var box = Y.one('#box');
	   var titulo = Y.one('#boxtitle');
	   box.insert(preview,2);
	   var hijos = box.get('children');
	  var prueba = hijos.item(2).remove();
	}


     function esExtensionValida(extensionArchivo)
	{

		if(extensionArchivo == "ppt" || extensionArchivo == "pdf" || extensionArchivo == "doc" || extensionArchivo == "odt" || 			extensionArchivo == "xls")
		{
			return true;
		}else{

			return false;
		}
	}

/*
 *Abre la caja de visualizacion de documentos
 *
 * 
 *   
 */

    function abrirLightBoxT (enlaceRecurso,extension,idRecurso,tituloRecurso,urlRecurso)
    {

			
			
			
			var enlaceSeleccionado =  enlaceRecurso.currentTarget
			//var enlaceSeleccionado = o.target; 
                        var id = enlaceSeleccionado.get("id"); 
			
			extensionSeleccionada = extension;
			
			if(esExtensionValida(extension))
			{
				enlaceRecurso.preventDefault();
			
				var url = enlaceSeleccionado.get("href");						

				var titulo = enlaceSeleccionado.get("innerHTML");
				
				idSeleccionada = idRecurso;
				
				openbox(tituloRecurso,urlRecurso);
				Y.one("#aceptarRecurso").set("value",idRecurso);

				urlSeleccionada = urlRecurso;
		 		tituloRecursoSeleccionado = tituloRecurso;
                                
                                
				enlaceSeleccionado.onclick = function() {return false;};
				return false;
			}else if(extension == "swf")
			{
			 

			  enlaceRecurso.preventDefault();
			
				var url = enlaceSeleccionado.get("href");						

				var titulo = enlaceSeleccionado.get("innerHTML");
				var id = enlaceSeleccionado.get("id");
				
				idSeleccionada = idRecurso;
				urlSeleccionada = urlRecurso;
		 		tituloRecursoSeleccionado = tituloRecurso;
                               

				 mostrarSWF(urlRecurso,tituloRecurso);	
				openboxSWF(tituloRecurso,urlRecurso);
				Y.one("#aceptarRecurso").set("value",idRecurso);
	
		   	  
			}
}
	
	function mostrarResultadoT_Busqueda(recursos)
	{
		var resultado_busqueda = Y.one("#resultado_busqueda");
                
			var tablaResultados = mostrarTablaResultados(recursos);
			resultado_busqueda.setHTML(tablaResultados);
                        
                        //Checando
                        
                        //Creando boton para aceptar un recurso seleccionado
                        var botonAceptar = Y.Node.create('<input type="button" id="aceptarRecursoCheck" value= "Aceptar recurso"/>');
                        botonAceptar.on('click', aceptarRecurso);
                        // creando div para el boton
                        var divAceptar = Y.Node.create('<div id="acRecurso"></div>');
                        divAceptar.append(botonAceptar);
                        //Agregando el boton al div princial
                        Y.one('#aceptarRecursoSelect').setHTML(divAceptar);

		if(recursos.length == 0 )
		{
			resultado_busqueda.setStyle("display", "none");
			
						
		}else{
			resultado_busqueda.setStyle("display", "");
			
			//new Y.AtMostOneCheckboxGroup('.idRecurso');

		
		}
	}
        
        
        function obtenerDetallesRecurso()
        {
            ostrarDetalleRecursoSeleccionado();
        }


	function mostrarDetalleRecursoSeleccionado(idSeleccionada)
	{
            
               // alert(idSeleccionada);
		var tabla = Y.Node.create('<table id="t_detalleRecurso" ></table>');
		//fila de nombre del recurso		
		var filaNombre = Y.Node.create('<tr><td>Nombre</td></tr>');
		var nombreRecurso = Y.Node.create('<td></td>');
		nombreRecurso.setHTML("prueba");
		filaNombre.append(nombreRecurso);
		//fila de descripcion
		var filaDescripcion = Y.Node.create('<tr><td>Descripcion</td></tr>');
		var descripcionRecurso = Y.Node.create('<td></td>');
		descripcionRecurso.setHTML("Descripcion");	
		filaDescripcion.append(descripcionRecurso);		
		
		//Agrega todas las filas la tabla	
		tabla.append(filaNombre);	
		
		//Botones de visualizacion
		var opciones = Y.Node.create('<id = "opciones" div><input id="vis" type="button" name="visualizar" value="Visualizar"/></div>');
	        //var visualizar = Y.Node.create('<input type="button" value="Visualizar"/>');
		var cancelar = Y.Node.create('<input type="button" value="Cancelar"/>');
                cancelar.on('click',mostrarCamposBusqueda);
		//opciones.append(visualizar);
		opciones.append(cancelar);
		//Muestra la tabla
		
		var resultado_busqueda = Y.one("#resultado_busqueda");
		resultado_busqueda.setHTML(tabla);
		resultado_busqueda.append(opciones);
	


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
  var columnaImagen = crearColumnaImagen(recurso);

var enlace = crearEnlace(recurso);
var descripcion = Y.Node.create('<br/>'+recurso.descripcion+ '<br/>Extension: <span id="ext_'+recurso.id_recurso+'">'+recurso.extension+'</span>');
 var columnaRecurso = Y.Node.create('<td></td>');
  columnaRecurso.append(enlace);
  columnaRecurso.append(descripcion); 

	fila.append(columnaCheckbox);
	fila.append(columnaImagen);
	fila.append(columnaRecurso);

	return fila;
}

/*
 * Crea un enlace para mostrar los recursos encontrados
 * @param {Object} recurso
 * 
 */
function crearEnlace(recurso)
	{
	var enlace  = Y.Node.create('<a></a>');
        var urlRecurso = recurso.url_base + 'recurso/ver/contenido/' + recurso.id_recurso;
	enlace.set("href", urlRecurso);
	enlace.set("ext", recurso.extension);
	var extension = recurso.extension;
	enlace.set("id",recurso.id_recurso);
	enlace.set("innerHTML", recurso.titulo);
	enlace.on("click",abrirLightBoxT,null,extension,recurso.id_recurso,recurso.titulo,urlRecurso);
	return enlace;	
	}
        
        
        function crearColumnaImagen(recurso)
        {
            var enlace  = Y.Node.create('<a><img src="' +recurso.icono + '" title="' + recurso.extension + '" width="16" height="16" border="0" /></a>');
            var urlRecurso = recurso.url_base + 'recurso/ver/contenido/' + recurso.id_recurso;
	enlace.set("href", urlRecurso);
	enlace.set("ext", recurso.extension);
	var extension = recurso.extension;
	enlace.set("id",recurso.id_recurso);
	enlace.on("click",abrirLightBoxT,null,extension,recurso.id_recurso,recurso.titulo,urlRecurso);
        var columnaImagen = Y.Node.create('<td></td>');
        columnaImagen.setHTML(enlace);
	return columnaImagen ;	
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

      

	var url = "http://localhost/moodle/mod/agora/proxy_s.php?url=http://sel.uady.mx/agora/recurso/ajax/buscar/?cadena=";
        var urlProxy = M.cfg.wwwroot+'/mod/agora/proxy_s.php?url=';
        var webServiceAgora = '/agora/recurso/ajax/buscar/?cadena='
       
	 var handleClick = function(o) {
                //alert(urlProxy);
		var palabraBuscar = Y.one("#campo_busqueda").get("value");
		var e_palabraBuscar = escape(palabraBuscar);
                var direccionServidor = Y.one('#urlServidor').get('value'); 
		var urlBusqueda = url+e_palabraBuscar;
            
                        
            
            
	    		if(palabraBuscar.length <= 0)
			{
				
				 alert('Campo vacio');				
			}
                        else if(!esURLValida(direccionServidor))
                        {
                            alert('Direccion del servidor no valida');	
                        }
                        else
			{
                            
                            
                                var urlBusqueda = obtenerURLBusqueda(palabraBuscar,direccionServidor);
                               
				Y.io.header('X-Requested-With');
			    var obj = Y.io(urlBusqueda,cfg);
			}
			
			
		}
                
         function obtenerURLBusqueda(palabraBuscar,direccionServidor)
         {
               var urlProxy = M.cfg.wwwroot+'/mod/agora/proxy_s.php?url=';
                var webServiceAgora = '/agora/recurso/ajax/buscar/?cadena='
                var urlServidor = new String(direccionServidor);
                       if(urlServidor.charAt(urlServidor.length) == '\\')
                         {
                                 alert('termina con slash')
                         }
                         var e_palabraBuscar = escape(palabraBuscar);
                         
                         
                  return  urlProxy+direccionServidor+webServiceAgora+e_palabraBuscar;       
                       
         }

	function aceptarRecurso(o)
	{

		o.preventDefault();
		var checkboxSeleccionado = Y.one("#check_"+idSeleccionada);
		//checkboxSeleccionado.set("checked","true");	
		

		//Estableciendo la url del recurso		
		var urlRecurso =  Y.one("#urlRecurso");
			
		urlRecurso.set("value",urlSeleccionada);
		
		//Estableciendo el titulo del recurso
		var titulo =  Y.one("#tituloRecurso");
		
		titulo.set("value",tituloRecursoSeleccionado);
	
        
                //Estableciendo la extension del recurso
                var extension = Y.one('#extensionRecurso');
                extension.set('value',extensionSeleccionada);
                
                esconderCamposBusqueda();
		mostrarDetalleRecursoSeleccionado(idRecursoSeleccionado);
		closebox();

		return false;
	}
        
        function esconderCamposBusqueda()
        {
            Y.one('#fitem_campo_busqueda').setStyle("display", "none");
            Y.one('#fitem_urlServidor').setStyle("display", "none");
            Y.one('#acRecurso').setStyle("display", "none");
            Y.one('#fitem_boton_buscar').setStyle("display", "none");
            Y.one('#campo_busqueda').set('value','');
           
        }
        
        
        function mostrarCamposBusqueda()
        {
            Y.one('#fitem_campo_busqueda').setStyle("display", "");
            Y.one('#fitem_urlServidor').setStyle("display", "");
            Y.one('#acRecurso').remove();
            Y.one('#fitem_boton_buscar').setStyle("display", "");
            Y.one('#resultado_busqueda').set("innerHTML", "");
        }
        
        function esURLValida(url) 
        {
        
            var RegExp = /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

            if(RegExp.test(url))
            {

                return true;
            }
            else{
                return false;
            }
        }

	
	function seleccionarUnChecbox(o)
	{
            var checkbox = o.currentTarget;
            var seleccionado = checkbox.get("checked");
            if(seleccionado)
            {
                if(idRecursoSeleccionado!="")
                  {
                      var checboxAnterior = Y.one('#check_'+idRecursoSeleccionado);
                      checboxAnterior.set('checked',false);
                  }
                
                var idRecurso = checkbox.get('value');
                //alert(idRecurso);
                idRecursoSeleccionado = idRecurso;
                
               //alert( idRecursoSeleccionado);
            }
            
	}

	

        //add the click handler to the Load button.
        Y.on("click", handleClick, "#boton_buscar");
	Y.on("click",closebox,"#cancelar");
	Y.on("click",aceptarRecurso,"#aceptarRecurso");
	Y.delegate("click",seleccionarUnChecbox,'#resultado_busqueda', 'input.idRecurso');
       
}
