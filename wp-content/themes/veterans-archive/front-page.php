<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;

$loader = new Asset_Loader( 'frontPage', Enqueue_Type::both, 'pages' );

get_header(); ?>
<div class="container">
	<section class="py-5 my-5 px-3 mx-auto">
		<div class="row">
			<?php get_template_part( 'template-parts/search', 'search-bar' ); ?>
		</div>
	</section>
	<section class="about">
		<hr class="my-3" />
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h2 class="display-2 mb-3 fw-normal">
					About the Choctaw Veterans Archive
				</h2>
				<p>
					The Choctaw Veterans Archive is a collection of stories from
					Choctaw veterans of the United States Armed Forces. The goal
					of this project is to preserve the stories of veterans and
					make them accessible to the public.
				</p>
				<p>
					Choctaw veterans have served in every major conflict since
					the Choctaw Code Talkers of World War I. The Choctaw Nation
					is proud of its veterans and their service to our country.
				</p>
			</div>
		</div>
	</section>
</div>
<?php
get_footer();
