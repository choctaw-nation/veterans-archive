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
	<div class="row">
		<div class="col fs-6">
			<?php echo get_field( 'page_content' ); ?>
		</div>
	</div>
</div>
<?php
get_footer();