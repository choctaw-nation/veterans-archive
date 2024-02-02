<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package ChoctawNation
 */

get_header();
?>
<main class="mt-5 pt-5 bg-light">
	<section class="container">
		<div class="row">
			<div class="col">
				<h1 class='display-1'>404</h1>
				<p class='display-4'>Page not found.</p>
			</div>
		</div>
	</section>
	<section class="bg-dark-blue py-5 my-3">
		<div class="container">
			<div class="row">
				<?php get_template_part( 'template-parts/search', 'search-bar', array( 'with_browse' => true ) ); ?>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();