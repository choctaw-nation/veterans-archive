<?php
/**
 * Class: Decorations
 *
 * @package ChoctawNation
 * @subpackage ACF\Veteran_Data_Types
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Class Decorations
 *
 * Represents a collection of decorations for a veteran.
 */
class Decorations {
	/**
	 * Decorations
	 *
	 * @var \WP_Term[] $decorations
	 */
	public array $decorations;

	/**
	 * Additional Decorations
	 *
	 * @var string[] $additional_decorations
	 */
	public array $additional_decorations;

	/**
	 * Decorations exist
	 *
	 * @var bool $decorations_exist
	 */
	private bool $decorations_exist;

	/**
	 * Decorations constructor.
	 *
	 * @param array $acf ACF data.
	 */
	public function __construct( array $acf ) {
		if ( false !== $acf['decorations'] && false !== $acf['additional_decorations'] ) {
			$this->decorations_exist = true;
			$this->init_props( $acf );
		} else {
			$this->decorations_exist = false;
		}
	}

	private function init_props( array $acf ) {
		$this->decorations = $acf['decorations'];
		foreach ( $acf['additional_decorations'] as $decoration ) {
			$this->additional_decorations[] = esc_textarea( $decoration['name'] );
		}
	}

	public function have_decorations(): bool {
		return $this->decorations_exist;
	}
}
