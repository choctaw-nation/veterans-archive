<?php
/**
 * Nav: Breadcrumbs
 *
 * @package ChoctawNation
 */

?>
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item" aria-current="page">
			<a href="/">Home</a>
		</li>
		<li class="breadcrumb-item" aria-current="page">
			<a href="/veterans">Veterans</a>
		</li>
		<li class="breadcrumb-item active" aria-current="page">
			<?php the_title(); ?>
		</li>
	</ol>
</nav>
