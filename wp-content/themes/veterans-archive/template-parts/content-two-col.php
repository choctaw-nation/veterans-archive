<?php
/**
 * Two Column Layout
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Image;
use ChoctawNation\Components\Buttons;
use ChoctawNation\Components\Divider;

$divider  = new Divider();
$acf      = $args['acf'];
$reversed = $args['reversed'] ?? false;
$image    = new Image( $acf['image'], 'front-page-thumb' );
$buttons  = new Buttons();

?>
<div class="row row-cols-1 row-cols-lg-2 <?php echo ( $reversed ? ' flex-row-reverse' : '' ); ?>">
	<div class="col">
		<div class="ratio ratio-16x9">
			<?php $image->the_image( 'object-fit-cover' ); ?>
		</div>
		<?php if ( ! empty( $acf['image']['caption'] ) ) : ?>
		<small>
			<?php echo esc_textarea( $acf['image']['caption'] ); ?>
		</small>
		<?php endif; ?>
	</div>
	<div class="col d-flex flex-column">
		<h2 class="text-dark-blue display-2 text-uppercase">
			<?php echo esc_textarea( $acf['headline'] ); ?>
		</h2>
		<?php
		$direction = $reversed ? 'start' : 'end';
		$divider->the_divider( $direction );
		echo "<div class='mb-auto'>" . acf_esc_html( $acf['subheadline'] ) . '</div>';
		?>
		<?php
		if ( $acf['link'] ) :
			$buttons->the_button(
				array(
					'element' => 'a',
					'href'    => esc_url( $acf['link']['url'] ),
					'class'   => 'btn-outline-primary',
					'target'  => $acf['link']['target'],
					'text'    => esc_textarea( $acf['link']['title'] ),
				),
				'align-self-start mt-3'
			);
			?>
		<?php endif; ?>
	</div>
</div>