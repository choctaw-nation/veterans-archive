<?php
/**
 * Abstract Class: Veteran Data
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\ACF\Veteran_Data_Types\Additional_Material;
use ChoctawNation\ACF\Veteran_Data_Types\Choctaw_Veteran_Of_The_Month;
use ChoctawNation\ACF\Veteran_Data_Types\Dates_Of_Service;
use ChoctawNation\ACF\Veteran_Data_Types\Decorations;
use ChoctawNation\ACF\Veteran_Data_Types\Home_Area;

/**
 * Creates WP-like API to generate markup
 */
abstract class Veteran_Data {
	/**
	 * Male or Female
	 *
	 * @var string $gender
	 */
	public ?string $gender;

	/**
	 * Middle Name or Initial
	 *
	 * @var ?string $middle_name
	 */
	public ?string $middle_name;

	/**
	 * Nickname
	 *
	 * @var ?string $nickname
	 */
	public ?string $nickname;

	/**
	 * Maiden Name
	 *
	 * @var ?string $maiden_name
	 */
	public ?string $maiden_name;

	/**
	 * Suffix
	 *
	 * @var ?string $suffix
	 */
	public ?string $suffix;

	/**
	 * Home Areas
	 *
	 * @var Home_Area[] $home_areas
	 */
	public ?array $home_areas;

	/**
	 * Date of Birth
	 *
	 * @var int $birth
	 */
	public ?int $birth;

	/**
	 * Date of Death
	 *
	 * @var ?int $death
	 */
	public ?int $death;

	/**
	 * Military Branches served in
	 *
	 * @var \WP_Term[] $branches_of_service
	 */
	public ?array $branches_of_service;

	/**
	 * Dates of Service
	 *
	 * @var Dates_Of_Service[] $dates_of_service
	 */
	public ?array $dates_of_service;

	/**
	 * Wars served in
	 *
	 * @var \WP_Term[] $wars
	 */
	public ?array $wars;

	/**
	 * Decorations received
	 *
	 * @var Decorations $decorations
	 */
	public ?Decorations $decorations;

	/**
	 * Overseas Duty
	 *
	 * @var string[] $overseas_duty
	 */
	public ?array $overseas_duty;

	/**
	 * Stateside Assignments
	 *
	 * @var string[] $stateside_assignments
	 */
	public ?array $stateside_assignments;

	/**
	 * Jobs held
	 *
	 * @var string[] $jobs
	 */
	public ?array $jobs;

	/**
	 * Advanced Training received
	 *
	 * @var string[] $advanced_training
	 */
	public ?array $advanced_training;

	/**
	 * Highest achieved rank
	 *
	 * @var string $highest_achieved_rank
	 */
	public ?string $highest_achieved_rank;

	/**
	 * Military Units
	 *
	 * @var string[] $military_units
	 */
	public ?array $military_units;

	/**
	 * When the veteran was Choctaw Veteran of the Month
	 *
	 * @var ?Choctaw_Veteran_Of_The_Month[] $choctaw_veteran_of_the_month
	 */
	public ?array $choctaw_veteran_of_the_month;

	/**
	 * Whether additional materials exist
	 *
	 * @var bool $has_additional_materials
	 */
	public bool $has_additional_materials;

	/**
	 * Additional Materials
	 *
	 * @var Additional_Material[] $additional_materials
	 */
	public ?array $additional_materials;
}
