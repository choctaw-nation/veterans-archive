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
			$buttons = new Buttons();
			$buttons->the_button(
				array(
					'element' => 'input',
					'type'    => 'submit',
					'class'   => 'btn-outline-light',
					'value'   => 'Search',
				),
				$bg_color,
				'ms-2'
			);
			if ( $with_browse ) {
				$buttons->the_button(
					array(
						'element' => 'a',
						'href'    => '/veterans',
						'class'   => 'btn-outline-light-green',
						'text'    => 'Browse',
					),
					$bg_color,
					'ms-2'
				);
			}
			?>
		</div>
		<div class="col-12">
			<div class="form-text fs-6 text-white">
				Try searching by name, conflict, branch, or more
			</div>
		</div>
		<?php if ( $with_filters ) : ?>
		<div class="col-12 my-3">
			<button>filter</button><button>filter</button><button>filter</button>
		</div>
		<?php endif; ?>
	</form>
</search>
