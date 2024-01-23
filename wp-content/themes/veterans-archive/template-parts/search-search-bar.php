<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

?>
<search class="my-3">
	<form class="row" action="/">
		<div class="col-12">
			<label for="s" class="form-label">
				<h1 class="fw-light display-1 text-uppercase text-light-green">Find a veteran</h1>
			</label>
		</div>
		<div class="col d-flex">
			<input type="text" class="form-control flex-grow-1" id="search" name='s' />
			<input class="btn btn-outline-light btn-lg text-white ms-2" type="submit" value="Search" />
		</div>
		<div class="col-12">
			<div class="form-text fs-6 text-white">
				Try searching by name, conflict, branch, or more
			</div>
		</div>
	</form>
</search>
