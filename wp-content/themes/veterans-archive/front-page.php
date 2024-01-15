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
get_header();

$slides = array(
	array(
		'title'   => 'About the Choctaw Veterans Archive',
		'content' => '<p>
	The Choctaw Veterans Archive is a collection of stories from
	Choctaw veterans of the United States Armed Forces. The goal
	of this project is to preserve the stories of veterans and
	make them accessible to the public.
</p>
<p>
	Choctaw veterans have served in every major conflict since
	the Choctaw Code Talkers of World War I. The Choctaw Nation
	is proud of its veterans and their service to our country.
</p>',
	),
	array(
		'title'   => 'Add A Choctaw Veteran',
		'content' => '<p>Have a veteran story to share? <a href="/submit-a-veteran">Click here to add them to the database.</a></p>',
	),
);
?>
<div class="container my-5 py-5">
	<section class="my-5 px-3 mx-auto">
		<div class="row">
			<?php get_template_part( 'template-parts/search', 'search-bar' ); ?>
		</div>
	</section>
	<section class="about">
		<hr class="my-3" />
		<div class="row justify-content-center">
			<div class="col-1 position-relative">
				<div class="swiper-button-prev"></div>
			</div>
			<div class="col-md-8">
				<div class="swiper">
					<div class="swiper-wrapper">
						<?php foreach ( $slides as $slide ) : ?>
						<div class="swiper-slide border rounded-5 border-secondary bg-white shadow h-100 card">
							<div class="card-header" style="--bs-card-cap-bg:transparent">
								<h2 class="display-2 mb-3 fw-normal">
									<?php echo $slide['title']; ?>
								</h2>
							</div>
							<div class="card-body">
								<?php echo $slide['content']; ?>
							</div>
						</div>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
			<div class="col-1 position-relative">
				<div class="swiper-button-next"></div>
			</div>
		</div>
	</section>
</div>
<?php
get_footer();
