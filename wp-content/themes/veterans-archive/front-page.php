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
<main class="site-content">
	<?php get_template_part( 'template-parts/section', 'hero', array( 'id' => $post->ID ) ); ?>
	<section id="section-2" class="py-5">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">Blank on purpose.</div>
				<div class="col-lg-6 bg-secondary py-5 border border-2 rounded-2">
					<h2 class="text-white">A text element</h2>
					<p>A subheadline element that has a lot of text. Hopefully if I keep typing there will be enough characters to break onto a second line.</p>
				</div>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();
