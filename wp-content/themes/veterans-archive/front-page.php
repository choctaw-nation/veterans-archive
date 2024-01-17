<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since 1.0
 * @package ChoctawNation
 */

get_header();

get_template_part( 'template-parts/section', 'hero' );
?>

<section class="bg-primary container rounded-5 px-5 position-relative" id='search-bar'>
	<div class="row">
		<?php get_template_part( 'template-parts/search', 'search-bar' ); ?>
	</div>
</section>
<div class="container my-5 py-5">
	<?php the_content(); ?>
</div>
<?php
get_footer();