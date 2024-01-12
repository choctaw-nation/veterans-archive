<?php
/**
 * Archive: Veterans
 *
 * @package ChoctawNation
 */

get_header();
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
<?php while ( have_posts() ) : ?>
<?php the_post(); ?>
<div class="container-fluid">
	<div class="row row-cols-auto row-cols-lg-4">
		<div class="col">
			<?php get_template_part( 'template-parts/veterans/content', 'veteran-preview' ); ?>
		</div>
	</div>
</div>
<?php endwhile; ?>
<?php
endif;
get_footer();