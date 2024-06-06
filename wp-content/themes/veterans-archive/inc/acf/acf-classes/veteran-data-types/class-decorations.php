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
	public ?array $decorations;

	/**
	 * Additional Decorations
	 *
	 * @var ?string[] $additional_decorations
	 */
	public ?array $additional_decorations;

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
		if ( $acf['decorations'] || $acf['additional_decorations'] ) {
			$this->decorations_exist = true;
			$this->init_props( $acf );
		} else {
			$this->decorations_exist = false;
		}
	}

	/**
	 * Initialize properties.
	 *
	 * @param array $acf ACF data.
	 */
	private function init_props( array $acf ) {
		$this->decorations = false === $acf['decorations'] ? null : $acf['decorations'];
		if ( ! is_array( $acf['additional_decorations'] ) ) {
			$this->additional_decorations = null;
			return;
		}
		foreach ( $acf['additional_decorations'] as $decoration ) {
			if ( isset( $decoration['name'] ) ) {
				$this->additional_decorations[] = trim( esc_textarea( $decoration['name'] ) );
			} else {
				$this->additional_decorations[] = trim( esc_textarea( $decoration ) );
			}
		}
	}

	/**
	 * Check if decorations exist.
	 *
	 * @return bool
	 */
	public function have_decorations(): bool {
		return $this->decorations_exist;
	}
}
