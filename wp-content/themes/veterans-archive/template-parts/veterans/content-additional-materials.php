<?php
/**
 * Content: Additional Materials
 * Handles the display of any attached Additional Material a veteran might have
 *
 * @package ChoctawNation
 */

use ChoctawNation\Components\Divider;

/**
 * The Veteran class
 *
 * @var \ChoctawNation\ACF\Veteran Veteran $veteran */
$veteran = $args[0];
$divider = new Divider();
?>
<section class="additional-material mt-5">
	<div class="row my-3">
		<div class="col-auto">
			<?php $divider->the_divider( 'end', 'primary' ); ?>
			<h2 class="text-uppercase text-dark-blue">Additional Materials</h2>
		</div>
	</div>
	<div class="row row-cols-lg-3 justify-content-between gap-5">
		<?php
		foreach ( $veteran->additional_materials as $additional_material ) :
			switch ( $additional_material->type ) {
				case 'audio':
					$icon = '<i class="fa-2xl fa-solid fa-volume-high"></i>';
					break;
				case 'photo-gallery':
					$icon = '<i class="fa-2xl fa-solid fa-images"></i>';
					break;
				default:
					$icon = '<i class="fa-2xl fa-solid fa-link"></i>';
			}
			?>
		<div class="card gx-0 flex-grow-1 flex-row">
			<div class="col-4 text-white bg-secondary p-5 d-flex justify-content-center align-items-center">
				<?php echo $icon; ?>
			</div>
			<div class="col-8">
				<div class="card-body">
					<h3 class="card-title mb-5">
						<?php echo $additional_material->description; ?>
					</h3>
					<a target="_blank" rel="noopener noreferrer" href="<?php echo $additional_material->url; ?>" class="btn btn-primary mt-auto">View</a>
				</div>
			</div>
		</div>
		<?php endforeach; ?>
	</div>
</section>
