<?php
/**
 * Archive: Veterans
 *
 * @package ChoctawNation
 */

get_header( 'search' );
?>
<?php if ( ! have_posts() ) : ?>
<div class="container">
	<div class="row">
		<div class="col">
			<p>Couldn't find any veterans matching your search criteria. Please try again.</p>
		</div>
	</div>
</div>
<?php else : ?>
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
	<?php
endif;
get_footer();
