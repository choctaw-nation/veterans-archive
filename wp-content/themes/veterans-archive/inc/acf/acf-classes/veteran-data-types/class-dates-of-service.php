<?php
/**
 * Class: Dates Of Service
 *
 * @package ChoctawNation
 * @subpackage ACF\Veteran_Data_Types
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Class Dates_Of_Service
 *
 * Represents the dates of service for a veteran.
 */
class Dates_Of_Service {
	/**
	 * Start of service
	 *
	 * @var int $service_start
	 */
	public ?int $service_start;

	/**
	 * End of service
	 *
	 * @var int $service_end
	 */
	public ?int $service_end;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF data.
	 */
	public function __construct( array $acf ) {
		$this->service_start = ! empty( $acf['service_start'] ) ? $acf['service_start'] : null;
		$this->service_end   = ! empty( $acf['service_end'] ) ? $acf['service_end'] : null;
	}
}
