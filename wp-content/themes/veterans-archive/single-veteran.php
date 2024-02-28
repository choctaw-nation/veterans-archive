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
	<div class="row mt-5">
		<div class="col">
			<a href="/veterans" class='display-6 fs-5 text-uppercase'><i class="fa-sharp fa-solid fa-caret-left"></i>&nbsp;Back to All Veterans</a>
		</div>
	</div>
	<article>
		<section class="p-2 my-2" id='biography'>
			<div class="row mb-4">
				<div class="col">
					<h1 class="display-1 text-dark-blue text-uppercase">
						<?php $veteran->the_full_name( true, true, true ); ?>
					</h1>
					<?php $divider->the_divider(); ?>
				</div>
			</div>
			<div class="row row-gap-3 align-items-md-center align-items-lg-start">
				<div class="col-8 col-lg-6" id='bio'>
					<div class="row">
						<div class="col-6">
							<div class="ratio ratio-1x1">
								<?php
								$image_args           = array(
									'class'   => 'object-fit-cover',
									'loading' => 'lazy',
								);
								$placeholder_image_id = 60;
								if ( has_post_thumbnail() ) {
									the_post_thumbnail( 'medium_large', $image_args );
								} else {
									echo wp_get_attachment_image( $placeholder_image_id, 'medium_large', $image_args );
								}
								?>
							</div>
						</div>
						<div class="col-6 bio">
							<div class="mb-4">
								<span class="<?php echo $label_classes; ?>">
									Gender
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
									<span class='{$label_classes}'>{$field['label']}</span>
									<p>{$veteran->$function()}</p>
									</div>";
								}
							}
							?>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-8 col-lg-4 order-3 order-md-2" id='service-info'>
					<ul class="service-info-list list-unstyled">
						<?php
						$li_classes = 'service-info-list__item mb-4';
						if ( $veteran->get_the_service_dates() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>Dates of Service</span><p>{$veteran->get_the_service_dates()}</p></li>";
						}
						if ( $veteran->get_the_wars() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>" . ( 1 < count( $veteran->wars ) ? 'Conflicts' : 'Conflict' ) . "</span><p>{$veteran->get_the_wars()}</p></li>";
						}
						if ( $veteran->get_the_service_branches() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>" . ( 1 < count( $veteran->branches_of_service ) ? 'Branches of Service' : 'Branch of Service' ) . "</span><p>{$veteran->get_the_service_branches()}</p></li>";
						}
						if ( $veteran->get_the_military_units() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>" . ( 1 < count( $veteran->branches_of_service ) ? 'Military Units' : 'Military Unit' ) . "</span><p>{$veteran->get_the_military_units()}</p></li>";
						}
						if ( $veteran->get_the_highest_achieved_rank() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>Highest Achieved Rank</span><p>{$veteran->get_the_highest_achieved_rank()}</p></li>";
						}
						if ( $veteran->get_the_choctaw_veteran_of_the_month() ) {
							echo "<li class='{$li_classes}'><span class='{$label_classes}'>Choctaw Veteran of the Month</span><p>{$veteran->get_the_choctaw_veteran_of_the_month()}</p></li>";
						}
						?>
					</ul>
				</div>
				<div class="col-4 col-lg-2 order-2 order-md-last" id="branch">
					<figure class="ratio ratio-1x1">
						<?php
						if ( $veteran->branches_of_service ) {
							$image = get_field( 'branch_icon', "military-branch_{$veteran->branches_of_service[0]->term_id}" );
							echo wp_get_attachment_image(
								$image['id'],
								'medium_large',
								false,
								array(
									'class'   => 'object-fit-contain',
									'loading' => 'lazy',
									'style'   => 'max-height:20rem;',
								)
							);
						}
						?>
					</figure>

				</div>
			</div>
		</section>
		<?php if ( $veteran->has_tabbed_content() ) : ?>
		<section class="mt-3 py-2" id='service'>
			<div class="row my-3">
				<div class="col-auto">
					<?php $divider->the_divider( 'end', 'primary' ); ?>
					<h2 class="text-uppercase text-dark-blue fs-3">Service Details</h2>
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
