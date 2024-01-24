<?php
/**
 * Content: Veteran Preview
 * Used in Search Results/Archive Pages
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Veteran;
use ChoctawNation\Components\Buttons;
use ChoctawNation\Components\Divider;

$acf_fields = array(
	'bio'                      => get_field( 'bio' ),
	'service_information'      => get_field( 'service_information' ),
	'has_additional_materials' => get_field( 'has_additional_materials' ),
	'additional_materials'     => get_field( 'additional_materials' ),
);

$veteran = new Veteran( get_the_ID(), $acf_fields );
?>
<div class="card shadow h-100">
	<div class="ratio ratio-1x1 card-img-top">
		<?php
		$placeholder_image_id = 60;
		$image_args           = array(
			'loading' => 'lazy',
			'class'   => 'w-100 object-fit-cover',
		);

		if ( has_post_thumbnail() ) {
			the_post_thumbnail(
				'large',
				$image_args,
			);

		} else {
			echo wp_get_attachment_image( $placeholder_image_id, 'medium', false, $image_args );
		}
		?>
	</div>
	<div class="card-body d-flex flex-column">
		<?php
		$divider = new Divider();
		$divider->the_divider( 'end', 'green', 'mb-3' );
		?>
		<span class="card-title h4 text-uppercase text-dark-blue mb-4">
			<?php the_title(); ?>
		</span>
		<div class="card-text-py-2 mb-2">
			<div class="ms-4 at-a-glance">
				<?php
				$label_classes     = 'display-6 text-uppercase text-dark-blue fs-5 mb-0';
				$container_classes = 'mb-3';
				if ( $veteran->wars ) {
					echo "<div class='wars {$container_classes}'><p class='{$label_classes}'>" . ( count( $veteran->wars ) <= 1 ? 'War' : 'Wars' ) . ":</p><p>{$veteran->get_the_wars()}</p></div>";
				}
				if ( $veteran->get_the_service_dates() ) {
					echo "<div class='dates-of-service {$container_classes}'><p class='{$label_classes}'>Dates of Service:</p><p>{$veteran->get_the_service_dates()}</p></div>";
				}
				if ( $veteran->get_the_highest_achieved_rank() ) {
					echo "<div class='rank {$container_classes}'><p class='{$label_classes}'>Highest Achieved Rank:</p><p>{$veteran->get_the_highest_achieved_rank()}</p></div>";
				}
				?>
			</div>
		</div>
	</div>
	<div class="card-footer bg-dark-blue ">
		<div class="row row-cols-auto justify-content-between align-items-center row-gap-3">
			<?php
			$button = new Buttons();
			$button->the_button(
				array(
					'element' => 'a',
					'href'    => get_the_permalink(),
					'class'   => 'btn-outline-primary text-white',
					'text'    => 'Read More',
				),
				'dark-blue',
			);
			if ( $veteran->branches_of_service ) {
				$image = get_field( 'branch_icon', "military-branch_{$veteran->branches_of_service[0]->term_id}" );
				$image = wp_get_attachment_image(
					$image['id'],
					'thumbnail',
					false,
					array(
						'class'   => 'object-fit-contain',
						'loading' => 'lazy',
						'style'   => 'filter:invert(1);width:7.5rem;height:7.5rem;',
					)
				);
				echo "<figure>{$image}</figure>";
			}
			?>
		</div>
	</div>
</div>
