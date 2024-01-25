<?php
/**
 * Header Search Bar
 *
 * @package ChoctawNation
 */

get_template_part( 'template-parts/header/base', 'header' );
?>
<div class="text-bg-dark-blue py-4">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/search',
			'search-bar',
			array(
				'bg_color'     => 'dark-blue',
				'with_browse'  => false,
				'with_filters' => true,
			)
		);
		?>
	</div>
</div>
