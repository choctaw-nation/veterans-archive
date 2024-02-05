<?php
/**
 * Archive: Veterans
 *
 * @package ChoctawNation
 */

wp_enqueue_script( 'search' );
get_header();
?>
<?php if ( ! have_posts() ) : ?>
<div class="container">
	<div class="row my-5 py-5">
		<div class="col">
			<p>Couldn't find any veterans! Please try again.</p>
		</div>
	</div>
</div>
<?php else : ?>
<div id="search">
	<div class="container my-5 py-5">
		<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-4">
			<?php while ( have_posts() ) : ?>
				<?php the_post(); ?>
			<div class="col">
				<?php get_template_part( 'template-parts/veterans/content', 'veteran-preview' ); ?>
			</div>
			<?php endwhile; ?>
		</div>
	</div>
</div>
	<?php
endif;
get_footer();
