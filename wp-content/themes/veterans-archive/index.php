<?php
/**
 * The primary archive page
 *
 * @package ChoctawNation
 */

get_header( 'search' );
if ( is_search() ) :
	get_template_part( 'template-parts/content', 'search-results' );
else: ?>
<div class='container my-5 py-5'>
	<?php if ( !have_posts() ) : ?>
	<h1 class='text-center'>No results found.</h1>
	<?php else : ?>
	<div class="row row-cols-auto row-cols-lg-4 row-gap-4">
		<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<div class="col">
			<?php get_template_part( 'template-parts/veterans/content', 'veteran-preview' ); ?>
		</div>
		<?php endwhile; ?>
	</div>
	<?php endif;?>
</div>
<?php
endif;
get_footer();
