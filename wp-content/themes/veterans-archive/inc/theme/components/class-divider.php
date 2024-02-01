<?php
/**
 * Class: Divider
 * Generates the Divider Component
 *
 * @package ChoctawNation
 */

namespace ChoctawNation\Components;

/**
 * The Divider Component Class
 */
class Divider {
	/**
	 * Returns a Divider Component
	 *
	 * @param "start"|"end" $direction [Optional] The direction of the divider.
	 * @param string        $color [Optional] The color of the divider (maps to Bootstrap theme colors).
	 * @param string|array  $additional_classes [Optional] Additional classes to add to the component.
	 */
	public function get_the_divider( string $direction = 'start', string $color = 'green', string|array $additional_classes = null ): string {
		if ( 'start' !== $direction && 'end' !== $direction ) {
			return '';
		}
		$direction = 'end' === $direction ? ' order-last' : '';
		$classes   = array( 'divider', "divider-{$color}" );
		if ( is_string( $additional_classes ) ) {
			$classes[] = $additional_classes;
		} elseif ( is_array( $additional_classes ) ) {
			$classes = array_merge( $classes, $additional_classes );
		}
		$classes = join( ' ', $classes );
		$divider = "
		<div class='{$classes}'>
			<div class='divider__line{$direction}'></div>
			<div class='divider__dots-container'>
				<div class='divider__dot'></div>
				<div class='divider__dot'></div>
			</div>
		</div>";
		return $divider;
	}

	/**
	 * Echoes a Divider Component
	 *
	 * @param "start"|"end" $direction [Optional] The direction of the divider.
	 * @param string        $color [Optional] The color of the divider (maps to Bootstrap theme colors).
	 * @param string|array  $additional_classes [Optional] Additional classes to add to the component.
	 */
	public function the_divider( string $direction = 'start', string $color = 'green', string|array $additional_classes = null ): void {
		echo $this->get_the_divider( $direction, $color, $additional_classes );
	}
}
