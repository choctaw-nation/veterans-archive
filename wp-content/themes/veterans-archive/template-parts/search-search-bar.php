<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Buttons;

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
			<?php
			// $buttons = new Buttons();
			// $buttons->the_button(
			// array(
			// 'el'    => 'input',
			// 'type'  => 'submit',
			// 'class' => 'btn btn-outline-light btn-lg ms-2 text-uppercase',
			// 'value' => 'Search',
			// ),
			// '',
			// array(
			// 'border' => 'white',
			// 'text'   => 'white',
			// )
			// );
			?>
			<div class="btn-container position-relative ms-2">
				<div class="btn-lower position-absolute top-0 w-100 h-100 z-1"></div>
				<input type="submit" value="Search" class="btn btn-outline-light btn-lg" />
			</div>
		</div>
		<div class="col-12">
			<div class="form-text fs-6 text-white">
				Try searching by name, conflict, branch, or more
			</div>
		</div>
	</form>
</search>
