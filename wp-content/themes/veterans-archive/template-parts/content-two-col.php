<?php
/**
 * Two Column Layout
 *
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Image;
use ChoctawNation\Components\Divider;

$divider = new Divider();
$acf        = $args['acf'];
$reversed   = $args['reversed'] ?? false;
$image      = new Image( $acf['image'], 'front-page-thumb' );

?>
<div class="row row-cols-1 row-cols-lg-2 <?php echo ( $reversed ? ' flex-row-reverse' : '' ); ?>">
	<div class="col">
		<div class="ratio ratio-16x9">
			<?php $image->the_image(); ?>
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
		echo acf_esc_html( $acf['subheadline'] );
		?>
		<?php if ( $acf['link'] ) : ?>
		<a href='<?php echo esc_url( $acf['link']['url'] ); ?>' class='btn btn-primary' target="<?php echo esc_attr( $acf['link']['target'] ); ?>">
			<?php echo esc_textarea( $acf['link']['title'] ); ?>
		</a>
		<?php endif; ?>
	</div>
</div>
