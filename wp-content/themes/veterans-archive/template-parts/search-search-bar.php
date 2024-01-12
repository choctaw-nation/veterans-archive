<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

?>
<form class="row" action="/veterans">
	<div class="col-12">
		<label for="search" class="form-label">
			<h1 class="display-1">Find a veteran</h1>
		</label>
	</div>
	<div class="col d-flex">
		<input type="text" class="form-control flex-grow-1" id="search" />
		<input class="btn btn-secondary" type="submit" value="Search" />
	</div>
	<div class="col-12">
		<div class="form-text">
			Try searching by name, conflict, branch, or more
		</div>
	</div>
</form>