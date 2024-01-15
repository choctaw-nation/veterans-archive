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
			<search class="col-12 col-sm-4 flex-grow-1 order-3 order-sm-2 mx-0 my-3 my-md-0 mx-md-5 p-0">
				<form class="col-md-8 d-flex w-100" action="/">
					<label for="s" class="visually-hidden">Find a veteran</label>
					<input class='form-control me-2' type='search' placeholder='Find a Veteran' aria-label='Search' name='s' />
					<button class='btn btn-outline-light' type='submit'>
						Search
					</button>
				</form>
			</search>
			<?php get_template_part( 'template-parts/header/nav', 'offcanvas' ); ?>
		</nav>
	</div>
</header>
