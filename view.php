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
 * Prints a particular instance of agora
 *
 * You can have a rather longer description of the file as well,
 * if you like, and it can span multiple lines.
 *
 * @package    mod
 * @subpackage agora
 * @copyright  2011 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/// (Replace agora with the name of your module and remove this line)

require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');

$id = optional_param('id', 0, PARAM_INT); // course_module ID, or
$n  = optional_param('n', 0, PARAM_INT);  // agora instance ID - it should be named as the first character of the module
global $CFG;
if ($id) {
    $cm         = get_coursemodule_from_id('agora', $id, 0, false, MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $agora  = $DB->get_record('agora', array('id' => $cm->instance), '*', MUST_EXIST);
} elseif ($n) {
    $agora  = $DB->get_record('agora', array('id' => $n), '*', MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $agora->course), '*', MUST_EXIST);
    $cm         = get_coursemodule_from_instance('agora', $agora->id, $course->id, false, MUST_EXIST);
} else {
    error('You must specify a course_module ID or an instance ID');
}

require_login($course, true, $cm);
$context = get_context_instance(CONTEXT_MODULE, $cm->id);

add_to_log($course->id, 'agora', 'view', "view.php?id={$cm->id}", $agora->id, $cm->id);

/// Print the page header

$PAGE->set_url('/mod/agora/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($agora->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($context);
$PAGE->requires->js('/mod/agora/swfobject/swfobject.js');
// other things you may want to set - remove if not needed
//$PAGE->set_cacheable(false);
//$PAGE->set_focuscontrol('some-html-id');
//$PAGE->add_body_class('agora-'.$somevar);
$agorasettings = get_config('agora');
// Output starts here
echo $OUTPUT->header();

if ($agora->intro) { // Conditions to show the intro can change to look for own settings or whatever
    echo $OUTPUT->box(format_module_intro('agora', $agora, $cm->id), 'generalbox mod_introbox', 'agora_introl');
}

// Replace the following lines with you own code
echo $OUTPUT->heading($agora->name);




echo $OUTPUT->container_start('recurso');
      echo $OUTPUT->container_start('descarga');
		echo '<div class="buttons"><a href="'.$agora->url_recurso.'" id="descarga" target="_blank">Descargar documento</a></div>';
	echo $OUTPUT->container_end();
	//obteniendo la extension del recurso	
	$extension = $agora->extension;
	
	if($extension == 'swf')
	{
		echo $OUTPUT->container_start('visualizacion');
			echo '<object id="flash_player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="80%" height="40%">';
				echo '<param name="movie" value="'.$agora->url_recurso.'" />';
			//<!--[if !IE]>-->
				echo '<object id="flash_player" type="application/x-shockwave-flash" data="'.$agora->url_recurso.'" width="780" height="420">';
			//<!--<![endif]-->
			  
			//<!--[if !IE]>-->
				echo '</object>';
			///<!--<![endif]-->
		      	echo '</object>';
		echo $OUTPUT->container_end();
	} 
	else if( $extension == 'doc' || $extension == 'ppt' || $extension == 'pdf')
	{	

	echo $OUTPUT->container_start('visualizacion');
		echo '<div id="doc_view"><iframe id="document_view" src="http://docs.google.com/viewer?url='.urlencode($agora->url_recurso).'&embedded=true" width="600" height="780" style="border: none;"></iframe></div>';
	echo $OUTPUT->container_end();
	}	

echo $OUTPUT->container_end();

// Finish the page
echo $OUTPUT->footer();
