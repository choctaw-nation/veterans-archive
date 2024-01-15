<?php
/**
 * Content: Veteran Preview
 * Used in Search Results/Archive Pages
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Veteran;

$acf_fields = array(
	'bio'                      => get_field( 'bio' ),
	'service_information'      => get_field( 'service_information' ),
	'has_additional_materials' => get_field( 'has_additional_materials' ),
	'additional_materials'     => get_field( 'additional_materials' ),
);

$veteran = new Veteran( get_the_ID(), $acf_fields );
?>
<div class="card shadow h-100">
	<?php
	$placeholder_image_id = 60;
	$image_args           = array(
		'loading' => 'lazy',
		'class'   => 'w-100 card-img-top object-fit-cover',
		'style'   => 'max-height:15rem',
	);
	if ( has_post_thumbnail() ) {
		the_post_thumbnail(
			'medium',
			$image_args
		);
	} else {
		echo wp_get_attachment_image( $placeholder_image_id, 'medium', false, $image_args );
	}
	?>
	<div class="card-body d-flex flex-column">
		<span class="card-title h3">
			<?php the_title(); ?>
		</span>
		<div class="card-text-py-2 mb-2">
			<div class="at-a-glance">
				<?php
				if ( $veteran->wars ) {
					echo '<p class="wars"><b>' . ( count( $veteran->wars ) <= 1 ? 'War' : 'Wars' ) . "</b>: {$veteran->get_the_wars()}</p>";
				}
				if ( $veteran->get_the_service_dates() ) {
					echo "<p class='dates-of-service'><b>Dates of Service: </b> {$veteran->get_the_service_dates()}</p>";
				}
				if ( $veteran->branches_of_service ) {
					echo '<p class="service-branch"><b>' . ( count( $veteran->branches_of_service ) <= 1 ? 'Branch of Service' : 'Branches of Service' ) . "</b>: {$veteran->get_the_service_branches()}</p>";
				}
				if ( $veteran->get_the_highest_achieved_rank() ) {
					echo "<p class='rank'><b>Highest Achieved Rank: </b> {$veteran->get_the_highest_achieved_rank()}</p>";
				}
				?>
			</div>
		</div>
		<a href='<?php the_permalink(); ?>' class="btn btn-outline-primary mt-auto align-self-start btn-lg">Read More</a>
	</div>
</div>
