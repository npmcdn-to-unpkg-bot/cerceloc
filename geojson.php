<?php
/* By Adrian Short http://adrianshort.org */
require('../../../wp-load.php');
require('../../../wp-admin/includes/plugin.php');

/* From http://code.garyjones.co.uk/get-wordpress-plugin-version/ */
// function geolocation_plus_version_number() {
//   $data = get_plugin_data( __FILE__ . "/../geolocation.php");
//   return $data['Name'] . " " . $data['Version'];
// }

function geolocation_plus_plugin_get_version() {
    if ( ! function_exists( 'get_plugins' ) )
        require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
    $plugin_folder = get_plugins( '/' . plugin_basename( dirname( __FILE__ ) ) );
    $plugin_file = "geolocation.php";
    return $plugin_folder[$plugin_file]['Name'] . " " . $plugin_folder[$plugin_file]['Version'];
}


header("Content-Type: application/json; charset=UTF-8");
?>
{
  "type": "FeatureCollection",
  "features": [
<?php

// Get all the published posts
//$query = new WP_Query('post_type=post&post_status=publish&posts_per_page=-1');
  $query = new WP_Query( array( 'category_name' => 'cerce_poi' ) );

while( $query->have_posts() ): $query->the_post();

  $lat = get_post_meta(get_the_ID(), 'geo_latitude', true);
  $lng = get_post_meta(get_the_ID(), 'geo_longitude', true);

  // Only output the posts that have got geodata
  if ($lat > '' && $lng > '') {
?>
	  {
		"type": "Feature",
		"geometry": {
		  "type": "Point",
		  "coordinates": [<?php echo "$lng, $lat"?>]
		},
		"properties": {
		  "name": "<?php the_title_rss() ?>",
		  "pub_date": "<?php echo mysql2date('Y-m-d H:i:s', get_post_time('Y-m-d H:i:s', true), false); ?>",
		  "author": "<?php the_author() ?>",
		  "link": "<?php the_permalink_rss() ?>" ,
		  "description": "<?php the_excerpt_rss() ?>"

		}
	 }
   <?php
	 if ($query->current_post + 1< $query->post_count):
	   echo ",";
     endif;
   ?>

<?php
  }
endwhile;

wp_reset_postdata();

?>
 ]
}
