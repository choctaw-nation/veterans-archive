<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

?>
<search>
	<form class="row" action="/">
		<div class="col-12">
			<label for="s" class="form-label">
				<h1 class="display-1 fw-normal">Find a veteran</h1>
			</label>
		</div>
		<div class="col d-flex">
			<input type="text" class="form-control flex-grow-1" id="search" name='s' />
			<input class="btn btn-primary btn-lg text-white ms-2" type="submit" value="Search" />
			<a href="/veterans" class="btn btn-outline-secondary btn-lg ms-2">Browse</a>
		</div>
		<div class="col-12">
			<div class="form-text fs-6">
				Try searching by name, conflict, branch, or more
			</div>
		</div>
	</form>
</search>
