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
			<h1 class="display-1 fw-normal">Find a veteran</h1>
		</label>
	</div>
	<div class="col d-flex">
		<input type="text" class="form-control flex-grow-1" id="search" />
		<input class="btn btn-primary btn-lg text-white" type="submit" value="Search" />
	</div>
	<div class="col-12">
		<div class="form-text fs-6">
			Try searching by name, conflict, branch, or more
		</div>
	</div>
</form>
