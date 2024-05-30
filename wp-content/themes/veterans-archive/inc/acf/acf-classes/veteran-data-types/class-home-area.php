<?php
/**
 * Class: Home Area
 *
 * @package ChoctawNation
 * @subpackage ACF
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Data Type for the Home Area ACF Repeater Field.
 */
class Home_Area {
	/**
	 * City
	 *
	 * @var ?string $city
	 */
	public ?string $city;

	/**
	 * County
	 *
	 * @var ?string $county
	 */
	public ?string $county;

	/**
	 * State
	 *
	 * @var string $state
	 */
	public string $state;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF array.
	 */
	public function __construct( array $acf ) {
		$this->city   = ! empty( $acf['city'] ) ? trim( esc_textarea( $acf['city'] ) ) : null;
		$this->county = ! empty( $acf['county'] ) ? trim( esc_textarea( $acf['county'] ) ) : null;
		$this->state  = $acf['state'];
	}
}
