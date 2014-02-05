<?php

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The main agora configuration form
 *
 * It uses the standard core Moodle formslib. For more info about them, please
 * visit: http://docs.moodle.org/en/Development:lib/formslib.php
 *
 * @package    mod
 * @subpackage agora
 * @copyright  2011 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/moodleform_mod.php');

/**
 * Module instance settings form
 */
class mod_agora_mod_form extends moodleform_mod {

    /**
     * Defines forms elements
     */
    public function definition() {
	global $PAGE,$CFG;
	$PAGE->requires->js('/mod/agora/swfobject/swfobject.js');
        
	$jsmodule = array(
	    'name'     => 'mod_agora',
	    'fullpath' => '/mod/agora/prueba.js',
	    'requires' => array('base','gallery-checkboxgroups','io', 'json-parse', 'attribute','node' ,'json-stringify','stylesheet','handlebars-base', 'get'),
  
	);

	$PAGE->requires->js_init_call('M.mod_agora.init', array(), false, $jsmodule);
        
	$mform = $this->_form;
	$agorasettings = get_config('agora');
	
        //-------------------------------------------------------------------------------
        // Adding the "general" fieldset, where all the common settings are showed
        $mform->addElement('header', 'general', get_string('general', 'form'));
	$buttonarray=array();
        // Adding the standard "name" field
	
        $buttonarray[] =& $mform->addElement('text', 'busqueda', 'Búsqueda agora', array('size'=>'64','id'=>'campo_busqueda'));
        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEAN);
        }
	
	$lightbox = '<div id="shadowing"></div>
<div id="box">
  <div id="boxtitle"></div>
	

	<div id="preview"><iframe id="gframe"></iframe></div>
		<div class="buttons">
    <a id="descarga" target="_blank">Descargar documento</a>
    <a href="#" class="negative"  id="cancelar">
        <img src="'.$CFG->wwwroot.'/mod/agora/iconos/cross.png" alt=""/>
        Cancelar
    </a>
	<a  href= "#" class="positive"  name="save" id ="aceptarRecurso">
        <img src="'.$CFG->wwwroot.'/mod/agora/iconos/apply.png" alt=""/> 
        Aceptar
    </a>
</div>

	
</div>';
	 $buttonarray[] =& $mform->addElement('button', 'buscar', 'buscar',array('id'=>'boton_buscar'));
	
	 //$mform->addGroup($buttonarray, 'buttonar', '', array(' '), false);
	 
	 $mform->addElement('text', 'url_recurso', '',array('readonly'=>'readonly','class'=>'camposEscondios','id'=>'urlRecurso'));
	 $mform->addElement('text', 'name', '',array('readonly'=>'readonly','class'=>'camposEscondios','id'=>'tituloRecurso'));	
	 $mform->addElement('text', 'extension', '',array('readonly'=>'readonly','class'=>'camposEscondios','id'=>'extensionRecurso'));	 	
	$swf = 	'<script type="text/javascript" src="'.$CFG->wwwroot.'/mod/agora/swfobject/swfobject.js"></script>';
	 $mform->addElement('static', 'swf', '', $swf);

	 $js = '<script type="text/javascript" src="'.$CFG->wwwroot.'/mod/agora/module.js"></script>';
	
        //$mform->addElement('static', 'hotpot_mod_form_js', '', $js);
	$mform->addElement('static', 'resultado_busqueda', '', '<span id="div_agora"><div id="resultado_busqueda" style="display:none;"><table id="t_resultadoBusqueda" ></table></div><span id="aceptarRecursoSelect"></span></span>');
	$mform->addElement('static', 'detalle_recurso', '', '<div id="detalleRecurso" ></div>');
	$mform->addElement('static', 'lightbox', '', $lightbox);
	
       /**$mform->addRule('busqueda', null, 'required', null, 'client');
        $mform->addRule('busqueda', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        $mform->addHelpButton('busqueda', 'newmodulename', 'agora');**/
	//URl del servidor de agora
	$mform->addElement('text', 'agora_url', 'Direccion agora', 
			array('size'=>'64','id'=>'urlServidor'));
	$mform->setType('agora_url', PARAM_TEXT);
	 $mform->setDefault('agora_url', $CFG->urlServidor);	
        // Adding the standard "intro" and "introformat" fields
	
        $this->add_intro_editor();

        //-------------------------------------------------------------------------------
        // Adding the rest of agora settings, spreeading all them into this fieldset
        // or adding more fieldsets ('header' elements) if needed for better logic
       

      //  $mform->addElement('header', 'newmodulefieldset', get_string('newmodulefieldset', 'agora'));
       // $mform->addElement('static', 'label2', 'newmodulesetting2', 'Your agora fields go here. Replace me!');

        //-------------------------------------------------------------------------------
        // add standard elements, common to all modules
        $this->standard_coursemodule_elements();
        //-------------------------------------------------------------------------------
        // add standard buttons, common to all modules
        $this->add_action_buttons();
    }
}
