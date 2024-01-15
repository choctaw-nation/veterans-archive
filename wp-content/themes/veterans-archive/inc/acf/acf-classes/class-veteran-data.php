<?php
/**
 * Class: Veteran
 * Class to build markup based on ACF data
 *
 * @package ChoctawNation
 * @subpackage ACF
 */

namespace ChoctawNation\ACF;

use ChoctawNation\ACF\Veteran_Data_Types\Additional_Material;
use ChoctawNation\ACF\Veteran_Data_Types\Choctaw_Veteran_Of_The_Month;
use ChoctawNation\ACF\Veteran_Data_Types\Dates_Of_Service;
use ChoctawNation\ACF\Veteran_Data_Types\Decorations;

/**
 * Creates WP-like API to generate markup
 */
class Veteran_Data extends Generator {
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
	 * Home Town(s)
	 *
	 * @var ?string $home
	 */
	public ?string $home;

	/**
	 * Date of Birth
	 *
	 * @var \DateTime $birth
	 */
	public ?\DateTime $birth;

	/**
	 * Date of Death
	 *
	 * @var ?\DateTime $death
	 */
	public ?\DateTime $death;

	/**
	 * Military Branches served in
	 *
	 * @var \WP_Term[] $branches_of_service
	 */
	public ?array $branches_of_service;

	/**
	 * Dates of Service
	 *
	 * @var ChoctawNation\ACF\Veteran_Data_Types\Dates_Of_Service[] $dates_of_service
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
	 * @var Choctaw_Veteran_Of_The_Month $choctaw_veteran_of_the_month
	 */
	public ?Choctaw_Veteran_Of_The_Month $choctaw_veteran_of_the_month;

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

	// phpcs:ignore
	public function init_props( array $acf ) {
		$validated = $this->validate_acf( $acf );
		if ( ! $validated ) {
			return;
		}
		$this->set_the_bio( $acf['bio'] );
		$this->set_the_service_information( $acf['service_information'] );
		$this->has_additional_materials = $acf['has_additional_materials'];
		if ( $this->has_additional_materials ) {
			$this->set_the_additional_materials( $acf['additional_materials'] );
		}
	}

	private function validate_acf( array $acf ): bool {
		foreach ( $acf as $field ) {
			if ( ! $field ) {
				return false;
			} else {
				return true;
			}
		}
	}

	// phpcs:ignore
	private function set_the_bio( array $acf ) {
		$this->gender      = $acf['gender'];
		$this->maiden_name = ( 'Female' === $this->gender ) ? esc_textarea( $acf['maiden_name'] ) : null;
		$this->suffix      = esc_textarea( $acf['name_suffix'] );
		$this->middle_name = esc_textarea( $acf['middle_name'] );
		$this->nickname    = esc_textarea( $acf['nickname'] );
		$this->home        = esc_textarea( $acf['home'] );
		$this->birth       = $acf['date_of_birth'] ? new \DateTime( $acf['date_of_birth'] ) : null;
		$this->death       = $acf['date_of_death'] ? new \DateTime( $acf['date_of_death'] ) : null;
	}

	// phpcs:ignore
	private function set_the_service_information(array $acf) {
		$this->branches_of_service = $acf['military_branch'] ?: null;

		if ( $acf['dates_of_service'] ) {
			foreach ( $acf['dates_of_service'] as $date_of_service ) {
				$this->dates_of_service[] = new Dates_Of_Service( $date_of_service );
			}
		} else {
			$this->dates_of_service = null;
		}

		$this->wars = $acf['war'] ?: null;

		$decorations = new Decorations( $acf['decorations'] );
		if ( $decorations->have_decorations() ) {
			$this->decorations = $decorations;
		} else {
			$this->decorations = null;
		}

		$this->overseas_duty = $acf['overseas_duty'] ? $this->flatten_acf_repeater( $acf['overseas_duty'], 'location' ) : null;

		$this->stateside_assignments = $acf['stateside_assignments'] ? $this->flatten_acf_repeater( $acf['stateside_assignments'], 'assignment' ) : null;

		$this->jobs = $acf['jobs'] ? $this->flatten_acf_repeater( $acf['jobs'], 'job' ) : null;

		$this->advanced_training     = $acf['advanced_training'] ? $this->flatten_acf_repeater( $acf['advanced_training'], 'advanced_training_description' ) : null;
		$this->highest_achieved_rank = $acf['highest_rank_achieved'] ? $acf['highest_rank_achieved'][0] : null;

		$this->military_units = $acf['military_units'] ? $this->flatten_acf_repeater( $acf['military_units'], 'military_unit' ) : null;

		if ( $acf['choctaw_veteran_of_the_month'] ) {
			$this->choctaw_veteran_of_the_month = new Choctaw_Veteran_Of_The_Month( $acf['choctaw_veteran_of_the_month'] );
		} else {
			$this->choctaw_veteran_of_the_month = null;
		}
	}

	/**
	 * Flatten an ACF repeater field
	 *
	 * @param array  $acf_repeater the repeater field
	 * @param string $key the repeater's inner field key
	 */
	private function flatten_acf_repeater( array $acf_repeater, string $key ): array {
		$flattened = array();
		foreach ( $acf_repeater as $acf ) {
			$flattened[] = $acf[ $key ];
		}
		return $flattened;
	}

	// phpcs:ignore
	private function set_the_additional_materials(array $acf) {
		foreach ( $acf as  $additional_materials ) {
			$this->additional_materials[] = new Additional_Material( $additional_materials['additional_material'] );
		}
	}
}
