<?php
/**
 * The Hero Section
 *
 * @package ChoctawNation
 * @since 1.1.0
 */

if ( ! has_post_thumbnail() ) {
	return;
}
?>

<header class="hero position-relative">
	<div class="hero__bg w-100 h-100 object-fit-cover" style="background-image:url(<?php the_post_thumbnail_url( 'hero' ); ?>);">
	</div>
</header>
