<?php
/**
 * Header Search Bar
 *
 * @package ChoctawNation
 */

get_template_part( 'template-parts/header/base', 'header' );
?>
<header class="d-flex sticky-top bg-white" id="site-header">
	<div class="container">
		<nav class="navbar py-0">
			<a class="navbar-brand my-5" href="<?php echo esc_url( site_url() ); ?>" class="logo" aria-label="to Home Page">
				<?php echo bloginfo( 'title' ); ?>
			</a>
			<?php get_template_part( 'template-parts/header/nav', 'offcanvas' ); ?>
		</nav>
	</div>
</header>
<div class="text-bg-primary py-4">
	<div class="container">
		<?php get_template_part( 'template-parts/search', 'search-bar' ); ?>
	</div>
</div>