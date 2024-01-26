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
<div class="container">
	<div class="row justify-content-center">
		<div class="col-12 col-md-8">
			<h1 class="display-1 text-uppercase mt-3 text-dark-blue">Submit a Veteran</h1>
		</div>
	</div>
</div>

</div>
<div id="root"></div>

<?php
get_footer();
