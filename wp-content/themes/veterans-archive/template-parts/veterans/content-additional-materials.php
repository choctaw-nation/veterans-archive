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
$divider              = new Divider();
$buttons              = new Buttons();
$additional_materials = array();

if ( $veteran->additional_materials ) {
	foreach ( $veteran->additional_materials as $additional_material ) {
		$material_type = $additional_material->type['label'];
		if ( ! isset( $additional_materials[ $material_type ] ) ) {
			$additional_materials[ $material_type ] = array();
		}

		$additional_materials[ $material_type ][] = $additional_material;
	}
}

?>
<section class="additional-material my-5">
	<div class="row my-3">
		<div class="col-auto">
			<?php $divider->the_divider( 'end', 'primary' ); ?>
			<h2 class="text-uppercase text-dark-blue fs-3">Additional Materials</h2>
		</div>
	</div>
	<?php $columns = count( $additional_materials ); ?>
	<div class="<?php echo "row row-cols-lg-{$columns} justify-content-between align-items-stretch row-gap-4"; ?>">
		<?php foreach ( $additional_materials as $material_type => $materials ) : ?>
		<div class="col">
			<h3 class="d-block p-3 display-6 text-bg-dark-blue text-uppercase text-white"><?php echo $material_type; ?></h3>
			<?php foreach ( $materials as $material ) : ?>
			<?php
				$material_type   = $material->type['value'];
				$is_text_or_link = 'text' === $material_type || 'link' === $material_type;
				$div_classes     = 'd-flex align-items-center text-green p-3';
				echo "<div class='{$div_classes}'>";
				if ( $is_text_or_link ) {
					$material->the_icon();
					echo "<a class='ms-3 text-dark-blue fs-5' href='{$material->url}' target='_blank'>{$material->get_the_title()}</a>";
				} else {
					$material->the_modal_button();
				}
					echo '</div>';
				?>

			<?php endforeach; ?>
		</div>
		<?php endforeach; ?>
	</div>
</section>
<?php if ( $veteran->needs_additional_materials_modal() ) : ?>
<div class="modal fade" tabindex="-1" id='additional-materials-modal' aria-labelledby="additional-materials-modal-label" aria-hidden='true'>
	<div class="modal-dialog modal-xl modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class='modal-title fs-4 text-dark-blue display-6 text-uppercase' id='additional-materials-modal-label'>Additional Materials</h1>
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