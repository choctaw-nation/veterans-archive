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
	<?php
	the_post_thumbnail(
		'hero',
		array(
			'class' => 'hero__img w-100 h-100 object-fit-cover skip-lazy',
		)
	);
	?>
</header>
