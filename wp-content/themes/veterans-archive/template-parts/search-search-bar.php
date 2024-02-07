<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Buttons;

$with_browse = $args['with_browse'] || false;
?>
<search class="row my-3" id='search'>
	<form class="col" action="/veterans">
		<div class="row">
			<div class="col">
				<label for="search" class="form-label">
					<h1 class="fw-light display-1 text-uppercase text-light-green">Find a veteran</h1>
				</label>
			</div>
		</div>
		<div class="row align-items-stretch row-gap-2">
			<div class="col-lg-auto flex-grow-1 h-auto">
				<input type="text" class="form-control flex-grow-1 flex-shrink-0 h-auto py-3" id="search" name='s' placeholder='Try searching by name, conflict, branch, or more' />
			</div>
			<div class="col-lg-auto d-flex flex-wrap flex-sm-nowrap gap-2">
				<?php
					$buttons = new Buttons();
					$buttons->the_button(
						array(
							'element' => 'input',
							'type'    => 'submit',
							'class'   => 'btn-outline-light',
							'value'   => 'Search',
						),
					);
					if ( $with_browse ) {
						$buttons->the_button(
							array(
								'element' => 'a',
								'href'    => '/veterans',
								'class'   => 'btn-outline-light-green',
								'text'    => 'Browse',
							),
						);
					}
					?>
			</div>
		</div>
	</form>
</search>
