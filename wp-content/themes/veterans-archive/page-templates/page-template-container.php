<?php
/**
 * Template Name: Blank, Container
 *
 * @package ChoctawNation
 */

get_header( 'search' );
get_template_part( 'template-parts/section', 'hero' );
?>
<div class="container">
	<?php the_content(); ?>
</div>