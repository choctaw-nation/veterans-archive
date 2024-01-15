<?php
/**
 * Header Search Bar
 *
 * @package ChoctawNation
 */

use ChoctawNation\Navwalker;
get_template_part( 'template-parts/header/base', 'header' );
?>
<header class="d-flex sticky-top text-bg-primary" id="site-header">
	<div class="container">
		<nav class="navbar py-0">
			<a class="navbar-brand my-5" href="<?php echo esc_url( site_url() ); ?>" class="logo" aria-label="to Home Page">
				<?php echo bloginfo( 'title' ); ?>
			</a>
			<form class="col-12 col-sm-4 col-md-8 d-flex flex-grow-1 mx-0 my-3 my-md-0 mx-md-5 order-3 order-sm-2 p-0" role="search" action="
			<?php echo site_url() . '/veterans'; ?>">
				<input class='form-control me-2' type='search' placeholder='Find a Veteran' aria-label='Search' />
				<button class='btn btn-outline-light' type='submit'>
					Search
				</button>
			</form>
			<?php get_template_part( 'template-parts/header/nav', 'offcanvas' ); ?>
		</nav>
	</div>
</header>
