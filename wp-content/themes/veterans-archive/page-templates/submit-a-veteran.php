<?php
/**
 * Template Name: Submit a Veteran
 *
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Components\Divider;
use ChoctawNation\Enqueue_Type;

$loader  = new Asset_Loader( 'veteranSubmission', Enqueue_Type::script );
$divider = new Divider();
get_header( 'search' );
?>
<div class="container">
	<div class="row justify-content-center my-3">
		<div class="col-12 col-md-9">
			<h1 class="display-1 text-uppercase mt-3 text-dark-blue">Submit a Veteran</h1>
			<?php $divider->the_divider(); ?>
		</div>
	</div>
</div>
</div>
<div id="root"></div>
<aside class="container">
	<div class="row justify-content-center my-3">
		<div class="col-12 col-md-9">
			<?php get_template_part( 'template-parts/content', 'recaptcha-notice' ); ?>
		</div>
	</div>
</aside>
<?php
get_footer();