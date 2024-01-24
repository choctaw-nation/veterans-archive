<?php
/**
 * Class: ACF Setter
 * Used by Veteran Factory to set ACF fields
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\ACF\Veteran_Data_Types\Choctaw_Veteran_Of_The_Month;
use ChoctawNation\ACF\Veteran_Data_Types\Dates_Of_Service;
use ChoctawNation\ACF\Veteran_Data_Types\Home_Area;

/**
 * ACF Setter
 */
class ACF_Setter {
	/**
	 * The veteran post ID
	 *
	 * @var int $id
	 */
	public $id;

	/**
	 * The errors
	 *
	 * @var array $errors
	 */
	private array $errors;

	/**
	 * Constructor
	 *
	 * @param int $id the veteran post ID
	 */
	public function __construct( int $id ) {
		$this->id     = $id;
		$this->errors = array();
	}

	/**
	 * Checks if there are any errors
	 *
	 * @return bool
	 */
	public function has_errors(): bool {
		return ( ! empty( $this->errors ) );
	}

	/**
	 * Gets the errors
	 *
	 * @return \WP_Error
	 */
	public function get_errors(): \WP_Error {
		return new \WP_Error( 'acf_error', 'There was an error updating the ACF fields', $this->errors );
	}

	/**
	 * Logs an error
	 *
	 * @param string $message the error message
	 * @param array  $data    the data that caused the error
	 */
	private function log_error( string $message, $data ) {
		$this->errors[] = array(
			'message' => $message,
			'data'    => $data,
		);
	}

	/**
	 * Set the ACF fields for the veteran post type
	 *
	 * @param Veteran_Factory $data the veteran data
	 */
	public function set_the_fields( Veteran_Factory $data ) {
		$this->set_the_acf_bio_fields( $data );
		$this->set_the_service_fields( $data );
		$this->set_the_additional_materials_fields( $data );
	}

	/**
	 * Set the ACF fields for the veteran post type
	 *
	 * @param Veteran_Factory $data the veteran data
	 */
	private function set_the_acf_bio_fields( Veteran_Factory $data ) {
		$group_key  = 'field_65a04a5814fe4';
		$sub_fields = array(
			'field_65a04a8114fe5' => $data->gender,
			'field_65a05f50b107b' => $data->middle_name,
			'field_65a151793506d' => $this->handle_acf_choices( 'field_65a151793506d', $data->suffix ),
			'field_65a05fbdc7129' => $data->nickname,
			'field_65a05b60200cc' => $data->maiden_name,
			'field_65a05b8c200cd' => array_map(
				function ( Home_Area $data ) {
					return array(
						'field_65a93a3541b0d' => $data->city,
						'field_65a93a3f41b0e' => $data->county,
						'field_65a93a4941b0f' => $data->state,

					);
				},
				$data->home_areas
			),
			'field_65a05bb0200ce' => $data->birth,
			'field_65a05bda200cf' => $data->death,
		);

		$status = update_field( $group_key, $sub_fields, $this->id );
		if ( false === $status ) {
			$this->log_error( 'Error updating the ACF "Bio" fields', $data );
		}
	}

	/**
	 * Set the ACF fields for the veteran post type
	 *
	 * @param Veteran_Factory $data the veteran data
	 */
	private function set_the_service_fields( Veteran_Factory $data ) {
		$group_key = 'field_65a062ee4fe42';
		$this->handle_taxonomy_terms( $data->branches_of_service );
		$this->handle_taxonomy_terms( $data->wars );
		$this->handle_taxonomy_terms( $data->decorations->decorations );

		$sub_fields = array(
			'field_65a063614fe43' => array_map(
				function ( Dates_Of_Service $dates ) {
					return array(
						'field_65a06447a1662' => $dates->service_start,
						'field_65a0645ba1663' => $dates->service_end,
					);
				},
				$data->dates_of_service
			),
			'field_65a0670a2e315' => array(
				'field_65a151ca3506e' => array_map(
					function ( $data ) {
						return array(
							'field_65a151f03506f' => $data,
						);
					},
					$data->decorations->additional_decorations
				),
			),
			'field_65a1493bbaa41' => array_map(
				function ( string $assignment ) {
					return array( 'field_65a14948baa42' => $assignment );
				},
				$data->overseas_duty
			),
			'field_65a153835565f' => array_map(
				function ( string $assignment ) {
					return array( 'field_65a1538355660' => $assignment );
				},
				$data->stateside_assignments
			),
			'field_65a1b10ed9054' => array_map(
				function ( string $job ) {
					return array( 'field_65a1b116d9055' => $job );
				},
				$data->jobs
			),
			'field_65a14c18ca41a' => array_map(
				function ( string $training ) {
					return array( 'field_65a14c36ca41b' => $training );
				},
				$data->advanced_training
			),
			'field_65a14c862dfb0' => $data->highest_achieved_rank,
			'field_65a14e8a0f8dd' => array_map(
				function ( string $units ) {
					return array( 'field_65a14e9f0f8de' => $units );
				},
				$data->military_units
			),
			'field_65a15504f27d8' => array_map(
				function ( Choctaw_Veteran_Of_The_Month $data ) {
					return array(
						'field_65a15510f27d9' => $data->year,
						'field_65a1554ef27da' => $data->district,
					);
				},
				$data->choctaw_veteran_of_the_month
			),
		);

		$status = update_field( $group_key, $sub_fields, $this->id );
		if ( false === $status ) {
			$this->log_error( 'Error updating the ACF "Bio" fields', $data );
		}
	}

	/**
	 * Set the ACF fields for the veteran post type
	 *
	 * @param Veteran_Factory $data the veteran data
	 */
	private function set_the_additional_materials_fields( Veteran_Factory $data ) {
		if ( empty( $data->additional_materials ) ) {
			return;
		}
		$status1 = update_field( 'field_65a149bd47a3b', 1, $this->id );
		if ( false === $status1 ) {
			$this->log_error( 'Error updating the ACF "Has Additional Materials" field', $data->additional_materials );
		}
		$additional_materials = array();
		foreach ( $data->additional_materials as $material ) {
			$additional_materials[] = array(
				'field_65a14f9b52784' => array(
					'field_65a15e6b4376b' => $material->description,
					'field_65a14fa752785' => 'link',
					'field_65a14fc952786' => $material->url,
				),
			);
		}

		$status2 = update_field( 'field_65a14f8c52783', $additional_materials, $this->id );
		if ( false === $status2 ) {
			$this->log_error( 'Error updating the ACF "Additional Materials" field', $data->additional_materials );
		}
	}

	/**
	 * Handles the taxonomy terms
	 *
	 * @param array $terms the terms to set
	 */
	private function handle_taxonomy_terms( array $terms ) {
		$ids    = array_map(
			function ( $term ) {
				return $term->term_id;
			},
			$terms
		);
		$result = wp_set_post_terms( $this->id, $ids, $terms[0]->taxonomy );
		if ( is_wp_error( $result ) ) {
			$this->log_error( $result->get_error_message(), $terms );
		}
	}

	/**
	 * Gets the Field Object and returns the key if the value is found in the lookup, else creates a new choice
	 *
	 * @param string $key the field's key to lookup
	 * @param mixed  $value the value to lookup
	 * @return string
	 */
	private function handle_acf_choices( string $key, $value ) {
		$acf_field = get_field_object( $key, false, false );
		if ( $acf_field ) {
			$choices = $acf_field['choices'];
			array_values( $choices );
			$key = array_search( $value, array_column( $choices, 'value' ), true );
			if ( $key ) {
				return $key;
			} else {
				return $value;
			}
		}
	}
}
