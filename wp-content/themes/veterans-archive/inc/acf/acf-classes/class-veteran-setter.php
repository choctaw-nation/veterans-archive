<?php
/**
 * Class: Veteran Setter
 * Class to build markup based on ACF data
 *
 * @package ChoctawNation
 * @subpackage ACF
 */

namespace ChoctawNation\ACF;

use ChoctawNation\Veteran_Data;
use ChoctawNation\ACF\Veteran_Data_Types\Additional_Material;
use ChoctawNation\ACF\Veteran_Data_Types\Choctaw_Veteran_Of_The_Month;
use ChoctawNation\ACF\Veteran_Data_Types\Dates_Of_Service;
use ChoctawNation\ACF\Veteran_Data_Types\Decorations;
use ChoctawNation\ACF\Veteran_Data_Types\Home_Area;


/**
 * Creates WP-like API to generate markup
 */
class Veteran_Setter extends Veteran_Data {
	protected bool $needs_additional_materials_modal;

	public function __construct( array $acf ) {
		$this->init_props( $acf );
	}

	// phpcs:ignore
	protected function init_props( array $acf ) {
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
	protected function set_the_bio( array $acf ) {
		$this->gender      = $acf['gender'];
		$this->maiden_name = ( 'Female' === $this->gender ) ? esc_textarea( $acf['maiden_name'] ) : null;
		$this->set_the_name_suffix( $acf );

		$this->middle_name = empty( $acf['middle_name'] ) ? null : esc_textarea( $acf['middle_name'] );
		$this->nickname    = empty( $acf['nickname'] ) ? null : esc_textarea( $acf['nickname'] );
		if ( $acf['home_areas'] ) {
			$this->set_the_home_areas( $acf['home_areas'] );
		} else {
			$this->home_areas = null;
		}
		$this->birth = $acf['year_of_birth'] ?: null;
		$this->death = $acf['year_of_death'] ?: null;
	}

	private function set_the_name_suffix( array $acf ) {
		if ( ! empty( $acf['name_suffix'] ) && empty( $acf['name_suffixOther'] ) ) {
			$this->suffix = esc_textarea( $acf['name_suffix'] );
		} elseif ( ! empty( $acf['name_suffixOther'] ) ) {
			$this->suffix = esc_textarea( $acf['name_suffixOther'] );
		} else {
			$this->suffix = null;
		}
	}

	private function set_the_home_areas( array $acf ) {
		$is_empty = count(
			array_filter(
				$acf,
				function ( $areas ) {
					foreach ( $areas as $area ) {
						return empty( $area );
					}
				}
			)
		);
		if ( $is_empty || empty( $acf ) ) {
			$this->home_areas = null;
		} else {
			foreach ( $acf as $home_area ) {
				$this->home_areas[] = new Home_Area( $home_area );
			}
		}
	}

	// phpcs:ignore
	protected function set_the_service_information(array $acf) {
		$this->branches_of_service = $acf['military_branch'] ?: null;

		if ( $acf['dates_of_service'] ) {
			$this->set_the_dates_of_service( $acf['dates_of_service'] );
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
		$this->highest_achieved_rank = $acf['highest_rank_achieved'] ? esc_textarea( $acf['highest_rank_achieved'] ) : null;

		$this->military_units = $acf['military_units'] ? $this->flatten_acf_repeater( $acf['military_units'], 'military_unit' ) : null;

		if ( $acf['choctaw_veteran_of_the_month'] ) {
			foreach ( $acf['choctaw_veteran_of_the_month'] as $nomination ) {
				$this->choctaw_veteran_of_the_month[] = new Choctaw_Veteran_Of_The_Month( $nomination );

			}
		} else {
			$this->choctaw_veteran_of_the_month = null;
		}
	}

	protected function set_the_dates_of_service( array $acf ) {
		if ( empty( $acf ) ) {
			$this->dates_of_service = null;
		}
		foreach ( $acf as $date_of_service ) {
			$this->dates_of_service[] = new Dates_Of_Service( $date_of_service );
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
	protected function set_the_additional_materials(array $acf) {
		foreach ( $acf as  $additional_materials ) {
			$this->additional_materials[] = new Additional_Material( $additional_materials['additional_material'] );
		}
		$this->needs_additional_materials_modal = $this->needs_additional_materials_modal();
	}

	private function needs_additional_materials_modal(): bool {
		foreach ( $this->additional_materials as $additional_material ) {
			if ( 'link' !== $additional_material->type['value'] && 'text' !== $additional_material->type['value'] ) {
				return true;
			}
		}
		return false;
	}

	public function __serialize() {
		return array(
			'gender'                       => $this->gender,
			'maiden_name'                  => $this->maiden_name,
			'suffix'                       => $this->suffix,
			'middle_name'                  => $this->middle_name,
			'nickname'                     => $this->nickname,
			'home_areas'                   => $this->home_areas,
			'birth'                        => $this->birth,
			'death'                        => $this->death,
			'branches_of_service'          => $this->branches_of_service,
			'dates_of_service'             => $this->dates_of_service,
			'wars'                         => $this->wars,
			'decorations'                  => $this->decorations,
			'overseas_duty'                => $this->overseas_duty,
			'stateside_assignments'        => $this->stateside_assignments,
			'jobs'                         => $this->jobs,
			'advanced_training'            => $this->advanced_training,
			'highest_achieved_rank'        => $this->highest_achieved_rank,
			'military_units'               => $this->military_units,
			'choctaw_veteran_of_the_month' => $this->choctaw_veteran_of_the_month,
			'has_additional_materials'     => $this->has_additional_materials,
			'additional_materials'         => $this->has_additional_materials ? $this->additional_materials : null,
		);
	}

	public function __unserialize( $serialized_data ) {
		foreach ( $serialized_data as $key => $value ) {
			$this->$key = $value;
		}
	}
}