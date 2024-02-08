<?php
/**
 * Content: Additional Materials
 * Handles the display of any attached Additional Material a veteran might have
 *
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Enqueue_Type;
use ChoctawNation\Components\Buttons;
use ChoctawNation\Components\Divider;

/**
 * The Veteran class
 *
 * @var \ChoctawNation\ACF\Veteran Veteran $veteran */
$veteran = $args[0];
if ( $veteran->needs_additional_materials_modal() ) {
	$loader = new Asset_Loader( 'veteranSingle', Enqueue_Type::both, 'pages', );
}
$divider = new Divider();
$buttons = new Buttons();
?>
<section class="additional-material my-5">
	<div class="row my-3">
		<div class="col-auto">
			<?php $divider->the_divider( 'end', 'primary' ); ?>
			<h2 class="text-uppercase text-dark-blue fs-3">Additional Materials</h2>
		</div>
	</div>
	<div class="row row-cols-lg-3 justify-content-between align-items-stretch row-gap-4">
		<?php
		foreach ( $veteran->additional_materials as $additional_material ) :
			switch ( $additional_material->type['value'] ) {
				case 'audio':
					$icon = '<i class="fa-2xl fa-solid fa-volume-high"></i>';
					break;
				case 'photo-gallery':
					$icon = '<i class="fa-2xl fa-solid fa-images"></i>';
					break;
				case 'text':
					$icon = '<i class="fa-2xl fa-solid fa-file-pdf"></i>';
					break;
				case 'video':
					$icon = '<i class="fa-2xl fa-solid fa-video"></i>';
					break;
				default:
					$icon = '<i class="fa-2xl fa-solid fa-link"></i>';
			}
			?>
		<div class="col flex-grow-1">
			<div class="card gx-0 flex-row h-100">
				<div class="col-4 text-white bg-secondary p-5 d-flex justify-content-center align-items-center">
					<?php echo $icon; ?>
				</div>
				<div class="col-8">
					<div class="card-body h-100 d-flex flex-column">
						<h3 class="card-title mb-5">
							<?php echo $additional_material->description; ?>
						</h3>
						<?php
						$btn_args = cno_build_veteran_button_args( $additional_material );
						$buttons->the_button(
							$btn_args,
							'mt-auto align-self-start'
						);
						?>
					</div>
				</div>
			</div>
		</div>
		<?php endforeach; ?>
	</div>
</section>
<?php if ( $veteran->needs_additional_materials_modal() ) : ?>
<div class="modal fade" tabindex="-1" id='additional-materials-modal' aria-labelledby="additional-materials-modal-label" aria-hidden='true'>
	<div class="modal-dialog modal-xl modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class='modal-title fs-4 text-dark-blue display-6 text-uppercase' id='additional-materials-modal-label'>Hi there</h1>
				<button type="button" class="btn-close" data-bs-dismiss='modal' aria-label='Close modal'></button>
			</div>
			<div class="modal-body overflow-x-hidden"></div>
			<div class="modal-footer">
				<?php
				$buttons->the_button(
					array(
						'element'    => 'button',
						'text'       => 'Close',
						'class'      => 'btn-outline-dark-blue',
						'attributes' => array(
							'data-bs-dismiss' => 'modal',
							'type'            => 'button',
						),
					),
				);
				?>
			</div>
		</div>
	</div>
</div>
<?php endif; ?>
