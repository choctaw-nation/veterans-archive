<?php
/**
 * Component: Search Bar
 * The Primary Search Component
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Buttons;

$bg_color     = $args['bg_color'];
$with_browse  = $args['with_browse'] || false;
$with_filters = $args['with_filters'] || false;

?>
<search class="row my-3">
	<form class="col" action="/">
		<div class="row">
			<div class="col">
				<label for="search" class="form-label">
					<h1 class="fw-light display-1 text-uppercase text-light-green">Find a veteran</h1>
				</label>
			</div>
		</div>
		<div class="row align-items-center row-gap-2">
			<div class="col-lg-auto flex-grow-1">
				<input type="text" class="form-control flex-grow-1 flex-shrink-0" id="search" name='s' placeholder='Try searching by name, conflict, branch, or more' />
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
		<div class="row">
			<?php if ( $with_filters ) : ?>
			<div class="col-12 my-3">
				<button>filter</button><button>filter</button><button>filter</button>
			</div>
			<?php endif; ?>
		</div>
	</form>
</search>
