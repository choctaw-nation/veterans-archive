<?php
/** The Mobile Menu
 *
 * @package ChoctawNation
 * @since 1.0
 */

use ChoctawNation\Navwalker;

?>
<button class="navbar-toggler order-2 order-sm-3 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
		aria-label="Toggle navigation">
	<span class="navbar-toggler-icon"></span>
</button>
<div class="offcanvas offcanvas-end ms-auto flex-grow-0" id='navbarNav' tabindex="-1">
	<div class="offcanvas-header mt-5">
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	</div>
	<?php
	if ( has_nav_menu( 'primary_menu' ) ) {
		wp_nav_menu(
			array(
				'theme_location'  => 'primary_menu',
				'menu_class'      => 'navbar-nav header-nav',
				'container'       => 'div',
				'container_class' => 'offcanvas-body',
				'walker'          => new Navwalker(),
			)
		);
	}
	?>
</div>
