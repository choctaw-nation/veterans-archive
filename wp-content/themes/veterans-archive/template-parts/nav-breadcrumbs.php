<?php
/**
 * Nav: Breadcrumbs
 *
 * @package ChoctawNation
 *
 * TODO: #34 Deprecate on live launch?
 */

?>
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item">
			<a href="/">Home</a>
		</li>
		<li class="breadcrumb-item">
			<a href="/veterans">Veterans</a>
		</li>
		<li class="breadcrumb-item active" aria-current="page">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</li>
	</ol>
</nav>
