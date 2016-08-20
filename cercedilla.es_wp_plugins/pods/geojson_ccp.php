<?php
require('../../../wp-load.php');
require('../../../wp-admin/includes/plugin.php');
header("Content-Type: application/json; charset=UTF-8");

//var_dump($_GET['layer']); die;
?>
{
  "type": "FeatureCollection",
  "features": [
  <?php
//this is normally where the WP Loop would be. Instead we add a loop to get pods stuff
  $mypod = pods('ccpoi_'.$_GET['layer']);
//$mypod = pods('ccpoi_publictransport');
  $mypod->find('name ASC');
  while ( $mypod->fetch() ) :
    // set our variables
    $id = $mypod->id();
    $name= $mypod->field('nombre');
    $address= $mypod->field('direccion');
    $nature= ($mypod->field('naturaleza'))? $mypod->field('naturaleza'): '';
    $latlon = $mypod->field('latlon');
    $anchorlink = $mypod->field('anchorlink');
    $myArray = explode(',', $latlon);
    $lat = $myArray[0];
    $lon = $myArray[1];

    ?>
    {
    "type": "Feature",
    "id":<?php echo $id;?>,
    "geometry": {
      "type": "Point",
      "coordinates": [<?php echo $lon.",".$lat;?>]
    },
    "properties": {
      "name": "<?php echo $name;?>",
      "address": "<?php echo $address;?>",
    	"nature":"<?php echo $nature;?>",
    	"anchorlink":"<?php echo $anchorlink;?>",
    	"layer": "<?php echo $_GET['layer'];?>",
    	"popupContent": "<?php echo '<strong>'.$name.'</strong><p><a href=\'#'.$anchorlink.'\'>Ver detalle</a></p>'?>"
    }
   }
   <?php if($mypod->position() < $mypod->total_found()): echo ","; endif; ?>
<?php endwhile; ?>
 ]
}
