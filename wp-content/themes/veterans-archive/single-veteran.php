<?php
/**
 * Single Veteran Post Type Display
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Veteran;

get_header();
$acf_fields = array(
	'bio'                      => get_field( 'bio' ),
	'service_information'      => get_field( 'service_information' ),
	'has_additional_materials' => get_field( 'has_additional_materials' ),
	'additional_materials'     => get_field( 'additional_materials' ),
);
$veteran    = new Veteran( get_the_ID(), $acf_fields );
?>
<div class="container">
	<div class="row py-5">
		<div class="col">
			<?php get_template_part( 'template-parts/nav', 'breadcrumbs' ); ?>
		</div>
	</div>
	<article>
		<section class="biography p-2 my-2">
			<div class="row">
				<div class="col-4 col-md-6">
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
				<div class="col-8 col-md-6">
					<?php the_title( '<h1>', '</h1>' ); ?>
					<div class="bio">
						<p class="bio__fullname">
							<b>Full Name:</b> <?php $veteran->the_full_name( true, true, true ); ?>
						</p>
						<p class="bio__gender">
							<b>Gender:</b> <?php $veteran->the_gender(); ?>
						</p>
						<?php
						echo $veteran->get_the_maiden_name() ?
						"<p class='bio__maiden-name'><b>Maiden Name:</b> {$veteran->get_the_maiden_name()}</p>"
						: '';
						echo $veteran->get_the_hometown() ?
						"<p class='bio__home'><b>Home:</b> {$veteran->get_the_hometown()}</p>"
						: '';
						echo $veteran->get_the_birth_date() ?
						"<p class='bio__birth'><b>Birth Year:</b> {$veteran->get_the_birth_date()}</p>"
						: '';
						echo $veteran->get_the_death_date() ?
						"<p class='bio__death'><b>Death Year:</b> {$veteran->get_the_death_date()}</p>"
						: '';
						?>
					</div>
					<div class="service-info my-4">
						<h2 class="h3">Service Information</h2>
						<ul class="service-info-list list-unstyled">
						<?php
						if ( $veteran->get_the_service_dates() ) {
							echo "<li class='service-info-list__item'><b>Dates of Service:</b> {$veteran->get_the_service_dates()}</li>";
						}
						if ( $veteran->get_the_wars() ) {
							echo "<li class='service-info-list__item'><b>" . ( 1 < count( $veteran->wars ) ? 'Wars' : 'War' ) . ":</b> {$veteran->get_the_wars()}</li>";
						}
						if ( $veteran->get_the_service_branches() ) {
							echo "<li class='service-info-list__item'><b>" . ( 1 < count( $veteran->branches_of_service ) ? 'Branches of Service' : 'Branch of Service' ) . ":</b> {$veteran->get_the_service_branches()}</li>";
						}
						if ( $veteran->get_the_highest_achieved_rank() ) {
							echo "<li class='service-info-list__item'><b>Highest Achieved Rank:</b> {$veteran->get_the_highest_achieved_rank()}</li>";
						}
						?>
						</ul>
					</div>
				</div>
			</div>
		</section>
		<section class="service bg-secondary-subtle mb-5 pb-2 overflow-x-scroll border border-1 border-black rounded rounded-3">
			<?php get_template_part( 'template-parts/veterans/content', 'tabs', array( $veteran ) ); ?>
		</section>
		<?php
		if ( $veteran->has_additional_materials ) {
			get_template_part( 'template-parts/veterans/content', 'additional-materials', array( $veteran ) );
		}
		?>
	</article>
</div>
<?php
get_footer();
