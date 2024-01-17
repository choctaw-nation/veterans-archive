<?php
/**
 * Template Name: Submit a Veteran
 *
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;

$loader = new Asset_Loader( 'veteranSubmission', Enqueue_Type::script );
get_header();
get_template_part( 'template-parts/section', 'hero' );
?>

<div id="root"></div>

<?php
get_footer();