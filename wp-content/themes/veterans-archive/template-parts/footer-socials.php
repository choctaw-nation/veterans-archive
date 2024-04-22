<?php
/**
 * Footer Social Menu
 *
 * @package ChoctawNation
 */

$socials = array(
	array(
		'icon_class' => 'fa-brands fa-x-twitter',
		'href'       => 'https://twitter.com/',
		'aria-label' => 'Follow Us on X (Twitter)',
	),
	array(
		'icon_class' => 'fa-brands fa-facebook-f',
		'href'       => 'https://facebook.com/',
		'aria-label' => 'Follow Us on Facebook',
	),
	array(
		'icon_class' => 'fa-brands fa-instagram',
		'href'       => 'https://instagram.com',
		'aria-label' => 'Follow Us on Instagram',
	),
);

?>
<div class="social-icons me-5 d-none">
	<?php foreach ( $socials as $social ) : ?>
	<a href="<?php echo $social['href']; ?>" class="social mx-2" target="_blank" rel="noopener noreferrer" aria-label="<?php echo $social['aria-label']; ?>">
		<i class="<?php echo "fa-2xl {$social['icon_class']}"; ?>"></i>
	</a>
	<?php endforeach; ?>
</div>
