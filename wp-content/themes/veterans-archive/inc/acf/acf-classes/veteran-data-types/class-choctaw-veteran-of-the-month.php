<?php
/**
 * Class: Choctaw Veteran of the Month
 *
 * @package ChoctawNation
 * @subpackage ACF\Veteran_Data_Types
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Class Choctaw_Veteran_Of_The_Month
 */
class Choctaw_Veteran_Of_The_Month {
	/**
	 * Year Received
	 *
	 * @var int $year
	 */
	public int $year;

	/**
	 * Choctaw District
	 *
	 * @var int $district
	 */
	public int $district;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF data
	 */
	public function __construct( array $acf ) {
		$this->district = $acf['district'];
		$this->year     = $acf['year'];
	}
}
