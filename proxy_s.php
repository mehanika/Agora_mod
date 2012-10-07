<?php
if(isset($_GET['url'])) 
{
 header( 'Content-type: application/json');
echo file_get_contents($_GET['url']); 
}else{
echo 'error';
}
?>
