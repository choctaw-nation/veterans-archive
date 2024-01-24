<?php
/**
 * Single Veteran Post Type Display
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Veteran;
use ChoctawNation\Components\Divider;

get_header( 'search' );
$acf_fields    = array(
	'bio'                      => get_field( 'bio' ),
	'service_information'      => get_field( 'service_information' ),
	'has_additional_materials' => get_field( 'has_additional_materials' ),
	'additional_materials'     => get_field( 'additional_materials' ),
);
$veteran       = new Veteran( get_the_ID(), $acf_fields );
$divider       = new Divider();
$label_classes = 'display-6 fs-3 text-uppercase text-dark-blue d-block';
?>
<div class="container">
	<div class="row py-5">
		<div class="col">
			<?php get_template_part( 'template-parts/nav', 'breadcrumbs' ); ?>
		</div>
	</div>
	<article>
		<section class="biography p-2 my-2">
			<div class="row mb-4">
				<div class="col">
					<h1 class="display-1 text-dark-blue text-uppercase"><?php $veteran->the_full_name( true, true, true ); ?></h1>
					<?php $divider->the_divider(); ?>
				</div>
			</div>
			<div class="row row-cols-1 row-cols-lg-2 row-gap-3">
				<div class="col">
					<div class="row">
						<div class="col-6">
							<div class="ratio ratio-1x1">
								<?php
								$image_args           = array(
									'class'   => 'w-auto h-auto object-fit-cover img-thumbnail',
									'loading' => 'lazy',
								);
								$placeholder_image_id = 60;
								if ( has_post_thumbnail() ) {
									the_post_thumbnail( 'veteran-single', $image_args );
								} else {
									echo wp_get_attachment_image( $placeholder_image_id, 'veteran-single', $image_args );
								}
								?>
							</div>
						</div>
						<div class="col-6 bio">
							<div class="mb-4">
								<span class="<?php echo $label_classes; ?>">
									Gender:
								</span>
								<p><?php $veteran->the_gender(); ?></p>
							</div>
							<?php
							$fields = array(
								array(
									'label' => 'Maiden Name',
									'fn'    => 'maiden_name',
								),
								array(
									'label' => 'Home',
									'fn'    => 'hometown',
								),
								array(
									'label' => 'Birth Year',
									'fn'    => 'birth_date',
								),
								array(
									'label' => 'Death Year',
									'fn'    => 'death_date',
								),
							);
							foreach ( $fields as $field ) {
								$function = "get_the_{$field['fn']}";

								if ( $veteran->$function() ) {
									echo "<div class='mb-4'>
									<span class='{$label_classes}'>{$field['label']}:</span>
									<p>{$veteran->$function()}</p>
									</div>";
								}
							}
							?>
						</div>
					</div>
				</div>
				<div class="col service-info">
					<ul class="service-info-list list-unstyled">
						<?php
						$li_classes = 'service-info-list__item mb-4';
						if ( $veteran->get_the_service_dates() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>Dates of Service:</span><p>{$veteran->get_the_service_dates()}</p></li>";
						}
						if ( $veteran->get_the_wars() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>" . ( 1 < count( $veteran->wars ) ? 'Wars' : 'War' ) . ":</span><p>{$veteran->get_the_wars()}</p></li>";
						}
						if ( $veteran->get_the_service_branches() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>" . ( 1 < count( $veteran->branches_of_service ) ? 'Branches of Service' : 'Branch of Service' ) . ":</span><p>{$veteran->get_the_service_branches()}</p></li>";
						}
						if ( $veteran->get_the_highest_achieved_rank() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>Highest Achieved Rank:</span><p>{$veteran->get_the_highest_achieved_rank()}</p></li>";
						}
						?>
					</ul>
				</div>
			</div>
		</section>
		<?php if ( $veteran->has_tabbed_content() ) : ?>
		<section class="service mt-5 py-2">
			<div class="row my-3">
				<div class="col-auto">
					<?php $divider->the_divider( 'end', 'primary' ); ?>
					<h2 class="text-uppercase text-dark-blue">Service Details</h2>
				</div>
			</div>
			<?php get_template_part( 'template-parts/veterans/content', 'tabs', array( $veteran ) ); ?>
		</section>
		<?php endif; ?>
		<?php
		if ( $veteran->has_additional_materials ) {
			get_template_part( 'template-parts/veterans/content', 'additional-materials', array( $veteran ) );
		}
		?>
	</article>
</div>
<?php
get_footer();
