<?php
/**
 * Base Header Content
 *
 * @package ChoctawNation
 */

?>
<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
	<?php wp_head(); ?>
</head>

<body <?php body_class( 'w-100 overflow-x-hidden' ); ?>>
	<?php wp_body_open(); ?>
	<header class="d-flex sticky-top bg-white shadow" id="site-header">
		<div class="container">
			<nav class="navbar py-0">
				<a class="navbar-brand my-1 d-flex align-items-center column-gap-3 flex-grow-0 w-50 flex-wrap justify-content-center justify-content-lg-start"
					href="<?php echo esc_url( site_url() ); ?>" aria-label="to Home Page">
					<img src="<?php echo get_template_directory_uri() . '/img/the-great-seal-min.svg'; ?>" alt="The Great Seal of the Choctaw Nation" class='d-inline-block logo' />
					<span class="flex-grow-1 d-inline-flex justify-content-center justify-content-lg-start fs-4">Choctaw Nation <br /> Veterans Archive</span>
				</a>
				<?php get_template_part( 'template-parts/header/nav', 'offcanvas' ); ?>
			</nav>
		</div>
	</header>