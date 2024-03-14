<?php
/**
 * Template Name: Blank, Container
 *
 * @package ChoctawNation
 */

get_header( 'search' );
get_template_part( 'template-parts/section', 'hero' );
?>
<div class="container my-5 py-5">
	<?php echo get_field( 'page_content' ); ?>
</div>
<?php
get_footer();
