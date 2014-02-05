/**
 * @namespace
 */
M.mod_agora = M.mod_agora || {};
var direccionServidor;
/**
 * This function is initialized from PHP
 *
 * @param {Object} Y YUI instance
 */
M.mod_agora.init = function(Y) {
   
	var urlSeleccionada = false;
	var tituloRecursoSeleccionado = false;
	var checkboxManager = {};
	var idSeleccionada = "";
        var extensionSeleccionada ="";
        var idRecursoSeleccionado = "";
        direccionServidor = Y.one('#urlServidor').get('value'); 
			
/*
 *
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
/**
 *Valida si la extension del archivo puede ser visualizada
 *@param {String} extensionArchivo
 *
 **/

     function esExtensionValida(extensionArchivo)
	{

		if(extensionArchivo == "ppt" || extensionArchivo == "pdf" || extensionArchivo == "doc" || extensionArchivo == "odt" || 	extensionArchivo == "xls")
		{
			return true;
		}else{

			return false;
		}
	}

/*
 *Abre la caja de visualizacion de documentos
 *
 * @param {Object} enlaceRecurso
 * @param {String} extension
 * @param {Integer} idRecurso
 * @param {String} tituloReccurso
 * @param {String} urlRecurso 
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

/**
 *Despliega la tabla con los resultados obtenidos en la busqueda
 *@param {Object} recursos
 *
 **/
	function mostrarResultadoT_Busqueda(recursos)
	{
		var resultado_busqueda = Y.one("#resultado_busqueda");
                
                        
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

			checkboxManager = new Y.AtMostOneCheckboxGroup('.idRecurso');

		
		}
	}
        
        
      
/**
 * Muestra los datos de un recurso seleccionado
 **/
function mostrarDetalleRecursoSeleccionado(_recursoSeleccionado)
{
    
            var recursoSeleccionado = _recursoSeleccionado[0];
                //var tamañoArreglo = recursoSeleccionado.length;
                //
               // obtenerDetalleRecuro(idSeleccionada);
             
            Y.log("disciplina: "+recursoSeleccionado.discipline);
            
               // alert(idSeleccionada);
		var tabla = Y.Node.create('<table id="t_detalleRecurso" ></table>');
		//fila de nombre del recurso		
		var filaNombre = Y.Node.create('<tr><td>Titulo</td></tr>');
		var nombreRecurso = Y.Node.create('<td></td>');
                
                var titulo = recursoSeleccionado.title == null ? "Sin titulo" : recursoSeleccionado.title;
                var campoTextoNombre = Y.Node.create('<input type="text" size="40"/>');
                campoTextoNombre.set("value",titulo);
		nombreRecurso.setHTML(titulo);
		filaNombre.append(nombreRecurso);
		tabla.append(filaNombre);
                
                
                //fila de descripcion
		var filaDescripcion = Y.Node.create('<tr><td>Descripcion</td></tr>');
		var descripcionRecurso = Y.Node.create('<td></td>');
                var descripcion = recursoSeleccionado.description == null ? "Sin descripcion" : recursoSeleccionado.description;
                Y.log("desc "+descripcion);
                descripcionRecurso.set("innerHTML",descripcion);
		filaDescripcion.append(descripcionRecurso);		
		tabla.append(filaDescripcion);
                
		
                //Agregando fila de disciplina
                var filaDisciplina = Y.Node.create('<tr><td>Disciplina</td></tr>');
                var disciplinaRecurso = Y.Node.create('<td></td>');
                var disciplina = recursoSeleccionado.discipline == null ? "Sin desciplina" : recursoSeleccionado.discipline;
                disciplinaRecurso.set("innerHTML", disciplina);
                filaDisciplina.append(disciplinaRecurso);
                tabla.append(filaDisciplina);
                
                //Agrega todas las filas la tabla	
			
		
                
                
                
		//Botones de visualizacion
		var opciones = Y.Node.create('<id = "opciones" div></div>');
                var extension = recursoSeleccionado.extension;
                if(esExtensionValida(extension) || extension == "swf")
                 {
                     
                     var url = direccionServidor+'recurso/ver/contenido/'+recursoSeleccionado.id_recurso;
                     var visualizar = Y.Node.create('<input type="button" value="Visualizar"/>');
                     visualizar.on("click",abrirLightBoxT,null,extension,recursoSeleccionado.id_recurso,titulo,url);
                     opciones.append(visualizar);
                 }   
                    
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

/**
 *@param {int} idRecurso identificador del recurso seleccionado
 **/
function obtenerDetalleRecuro(idRecurso)
{
    //obtiene la url del servidor
    var direccionServidor = Y.one('#urlServidor').get('value');
    
    //obtiene la url para hacer la peticion de los datos del recurso
    var urlDetalleRecurso =  obtenerURLDetalleRecuros(idRecurso, direccionServidor);
     
    var exitoPeticion = function(id, o, a){
         
         
      Y.log("Respuesta "+o.responseText); 
      try {
        var recurso = Y.JSON.parse(o.responseText);
        Y.log(recurso);
        esconderCamposBusqueda();
        mostrarDetalleRecursoSeleccionado(recurso);
      }
      catch (e) {
        alert('Error al obtener los datos del recurso'); 
        
      }
     
         
     };
     
     var configuracionPeticion = {
            method: "GET",
          
            on: {
                
                
                success: exitoPeticion,
                failure: function(o)
                    { alert('Error al obtener los datos del recurso'); 
                        mostrarCamposBusqueda();
                    }
            }
        };
     
     Y.io.header('X-Requested-With');
     var obj = Y.io(urlDetalleRecurso,configuracionPeticion);
}

/*
 * @param {Array} recursos Arreglo de resultados de la busqueda de recursos 
 * @return {Objetc}
 */
function mostrarTablaResultados(recursos)
{

   // Load the precompiled template JS onto the page.
    //console.log(M.cfg);
        
    window.Handlebars = Y.Handlebars;
    var tabla = null;
    Y.Get.js(M.cfg.wwwroot+'/mod/agora/js_templates/table-template.js', function (err) {
        
        if (err) {
            Y.error('Template failed to load: ' + err);
            console.log(err);
            return;
        }

        // Render the template and insert its output into the page.
        var output = Y.Handlebars.templates['table-template']({recurso:recursos});
        Y.log(output);
        Y.one("#t_resultadoBusqueda").setHTML(output);
        establecerEscuchadores();
    });

    

	return tabla;
}


function establecerEscuchadores(idRecurso){

	//Estableciendo accion para la imagen
	Y.on("click", abrirVistaPreviaArchivo,"a.preview_link")

}


function abrirVistaPreviaArchivo(element){

	element.preventDefault();
	//console.log(element);
	var direccionRecurso = element.target.get('href');
	console.log(direccionRecurso);

	var n = direccionRecurso.lastIndexOf('/');

	var idRecurso = direccionRecurso.substring(n+1);

	Y.log("id recurso "+idRecurso);

	var direccionServidor = Y.one('#urlServidor').get('value');
    
    //obtiene la url para hacer la peticion de los datos del recurso
    var urlDetalleRecurso =  obtenerURLDetalleRecuros(idRecurso, direccionServidor);

     var configuracionPeticion = {
            method: "GET",
          
            on: {
                
                
                success: function(id, o, a){

				      try {
				        var recurso = Y.JSON.parse(o.responseText);
				        Y.log(recurso);
				        esconderCamposBusqueda();
				        
				      }
				      catch (e) {
				        alert('Error al obtener los datos del recurso'); 
				        Y.error(e);
				        mostrarCamposBusqueda();

				      }

                },
                failure: function(o)
                    { alert('Error al obtener los datos del recurso'); 
                        mostrarCamposBusqueda();
                    }
            }
        };
     
     Y.io.header('X-Requested-With');
     var obj = Y.io(urlDetalleRecurso,configuracionPeticion);
}

/*
 *@param {Object} recurso Recurso 
 *
 */
function obtenerFila(recurso)
{
    var fila = Y.Node.create('<tr></tr>');
    
    var columnaCheckbox = Y.Node.create('<td><input type="checkbox" class="idRecurso" value="'+recurso.id_recurso+'" 		id="check_'+recurso.id_recurso+'"/></td>');
    
    var columnaImagen = crearColumnaImagen(recurso);
    
    var enlace = crearEnlace(recurso);
    
    var descripcionRecurso   = recurso.descripcion == null ? "Sin descripcion" :recurso.descripcion;
    
    var descripcion = Y.Node.create('<br/>'+descripcionRecurso+ '<br/>Extension: <span id="ext_'+recurso.id_recurso+'">'+recurso.extension+'</span>');
    
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
    
    var tituloRecurso =  recurso.titulo == null ? "Sin t&iacute;tulo" :  recurso.titulo;
    
    enlace.set("innerHTML", tituloRecurso);

    enlace.on("click",abrirLightBoxT,null,extension,recurso.id_recurso,recurso.titulo,urlRecurso);
    
    return enlace;	
}
        
/*
 *        
 */        
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


var handleStart = function(id, a) 
{
            Y.log("iniciando busqueda");
            //output.set("innerHTML", "<li>Loading news stories via Yahoo! Pipes feed...</li>");
}

        //Event handler for the success event -- use this handler to write the fetched
        //RSS items to the page.
var handleSuccess = function(id, o, a) 
{

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

      
       
	 var handleClick = function(o) {
     
		var palabraBuscar = Y.one("#campo_busqueda").get("value");
		var e_palabraBuscar = escape(palabraBuscar);
                direccionServidor = Y.one('#urlServidor').get('value'); 
	
            
                        
            
            
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
                
                
/*
 *Obtiene la url del servidor para realizar la busqueda
 *@param {String} palabraBuscar palabra que se desea buscar
 *@param {String} direccionServidor direccion actual del servidor
 *@return url de busqueda
 */                                
function obtenerURLBusqueda(palabraBuscar,direccionServidor)
{
    var urlProxy = M.cfg.wwwroot+'/mod/agora/proxy_s.php?url=';
                var webServiceAgora = '/recurso/ajax/buscar/?cadena='
                var urlServidor = new String(direccionServidor);
                       if(urlServidor.charAt(urlServidor.length) == '\\')
                         {
                                 alert('termina con slash')
                         }
                         var e_palabraBuscar = escape(palabraBuscar);
                         
                         
                  return  urlProxy+direccionServidor+webServiceAgora+e_palabraBuscar;       
                       
         }
         
 /*
  * Obtiene la url para poder obtener los datos de un recurso en especifico
  * @param {String} idRecurso
  * @param {String} direccionServidor
  * @return Direccion para obtener los datos de un recurso 
  */
 function obtenerURLDetalleRecuros(idRecurso,direccionServidor)
 {
               var urlProxy = M.cfg.wwwroot+'/mod/agora/proxy_s.php?url=';
                var webServiceAgora = '/agora/recurso/ajax/describir/?id='
                var urlServidor = new String(direccionServidor);
                       if(urlServidor.charAt(urlServidor.length) == '\\')
                         {
                                 alert('termina con slash')
                         }
                         //var e_palabraBuscar = escape(palabraBuscar);
                         
                         
                  return  urlProxy+direccionServidor+webServiceAgora+idRecurso;       
                       
}

/*
 * @param {Object}
 */
function aceptarRecurso(o)
{

		o.preventDefault();

		//obteniendo id de el recurso selecionado
		var checkSeleccionado =  Y.one("input.idRecurso:checked");
		
		if(checkSeleccionado == null)
		{
			alert("No se ha seleccionado ningun recurso");
			console.log("No se ha seleccionado ningun recurso");
		}
		else
		{
			var _idRecurso = checkSeleccionado.get("value");
			console.log("id recurso seleccionado: "+_idRecurso);

			var urlRecurso =  Y.one("#urlRecurso");
			
			urlRecurso.set("value",urlSeleccionada);
		
			//Estableciendo el titulo del recurso
			var titulo =  Y.one("#tituloRecurso");
			
			titulo.set("value",tituloRecursoSeleccionado);
	
        
            //Estableciendo la extension del recurso
            var extension = Y.one('#extensionRecurso');
            extension.set('value',extensionSeleccionada);
                
             
            obtenerDetalleRecuro(_idRecurso);
			closebox();
		}
		

		

		return false;
	}

	/**
	*	Obtiene el identificador de recurso seleccionado
	*
	*/

	function obtenerIdRecursoSeleccionado()
	{

	}


   /*
    * Esconde los campos de busqueda
    */       
       function esconderCamposBusqueda()
        {
            Y.one('#fitem_campo_busqueda').setStyle("display", "none");
            Y.one('#fitem_urlServidor').setStyle("display", "none");
            Y.one('#acRecurso').setStyle("display", "none");
            Y.one('#fitem_boton_buscar').setStyle("display", "none");
            Y.one('#campo_busqueda').set('value','');
           
        }
        
        /*
         * Muestra los campos de busqueda
         */
        function mostrarCamposBusqueda()
        {
            Y.one('#fitem_campo_busqueda').setStyle("display", "");
            Y.one('#fitem_urlServidor').setStyle("display", "");
            Y.one('#acRecurso').remove();
            Y.one('#fitem_boton_buscar').setStyle("display", "");
            Y.one('#resultado_busqueda').set("innerHTML", "");
            //idRecursoSeleccionado = "";
        }



        
        /*
         * Valida la url del servidor
         */
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

	/*
         * 
         */
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

	

       
        Y.on("click", handleClick, "#boton_buscar");
	Y.on("click",closebox,"#cancelar");
	Y.on("click",aceptarRecurso,"#aceptarRecurso");
	
}
