<?php
/**
 * Content: Additional Materials
 * Handles the display of any attached Additional Material a veteran might have
 *
 * @package ChoctawNation
 */

$veteran              = $args[0];
$additional_materials = $veteran->get_the_additional_materials();
?>
<section class="additional-material my-5">
	<h2>Additional Material</h2>
	<div class="row row-cols-lg-3 justify-content-between gap-5">
		<?php foreach ( $additional_materials as $additional_material ) : ?>
		<div class="card gx-0 flex-grow-1" aria-hidden="true">
			<div class="row">
				<div class="col-4">
					<!-- <img src={placeholder.src} class="card-img-top w-100 h-100 object-fit-cover" alt="placeholder image" /> -->
				</div>
				<div class="col-8">
					<div class="card-body">
						<h5 class="card-title placeholder-glow">
							<!-- <span class="placeholder col-6" /> -->
						</h5>
						<p class="card-text placeholder-glow">
							<!-- <span class="placeholder col-7" />
							<span class="placeholder col-4" />
							<span class="placeholder col-4" />
							<span class="placeholder col-6" />
							<span class="placeholder col-8" /> -->
						</p>
						<a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
					</div>
				</div>
			</div>
		</div>
		<?php endforeach; ?>
	</div>
</section>
