<?php
/**
 * Class: Veteran Factory
 * Creates a Veteran Post Type prepares the data for ACF consumption.
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\ACF\Veteran_Data_Types\Additional_Material;
use ChoctawNation\ACF\Veteran_Data_Types\Choctaw_Veteran_Of_The_Month;
use ChoctawNation\ACF\Veteran_Data_Types\Decorations;
use ChoctawNation\ACF\Veteran_Setter;

/**
 * Veteran Factory
 */
class Veteran_Factory extends Veteran_Setter {
	/**
	 * The veteran post ID
	 *
	 * @var int|\WP_Error $id
	 */
	public $id;

	/**
	 * Consent to publish given
	 *
	 * @var bool $consent_given
	 */
	public bool $consent_given;

	/**
	 * The veteran's first name
	 *
	 * @var string $first_name
	 */
	public string $first_name;

	/**
	 * The veteran's last name
	 *
	 * @var string $last_name
	 */
	public string $last_name;

	/**
	 * If the submitter wants to add additional media material
	 *
	 * @var string $bio
	 */
	public bool $has_media_material;

	/**
	 * Submitter's name
	 *
	 * @var string $user_name
	 */
	public string $user_name;

	/**
	 * Submitter's email
	 *
	 * @var string $user_email
	 */
	public string $user_email;

	// phpcs:ignore
	public function __construct( array $params ) {
		$this->init_props( $params );
		$id = $this->create_veteran();
		if ( is_wp_error( $id ) ) {
			$this->id = $id;
			return;
		}
		if ( $id ) {
			$acf_setter = new ACF_Setter( $id );
			$acf_setter->set_the_fields( $this );
			if ( $acf_setter->has_errors() ) {
				$this->id = $acf_setter->get_errors();
				return;
			}
			$this->id = $id;
		}
	}

	/**
	 * Adds a few functions from original init_props function
	 *
	 * @param array $params the $_POST data
	 */
	protected function init_props( array $params ) {
		$this->first_name = esc_textarea( $params['bio']['first_name'] );
		$this->last_name  = esc_textarea( $params['bio']['last_name'] );
		$this->set_the_bio( $params['bio'] );
		$this->set_the_service_information( $params['service_information'] );
		$this->handle_the_additional_materials( $params['additional_materials'] );
		$this->set_contact_info( $params['contactInfo'] );
		$this->consent_given = $params['consentCheckbox'];
	}

	/**
	 * Sets service information to the class
	 *
	 * @param array $params the $_POST data
	 */
	protected function set_the_service_information( array $params ) {
		$this->branches_of_service = $this->get_the_wp_terms( $params['military_branch'], 'military-branch' );
		$this->set_the_dates_of_service( $params['dates_of_service'] );
		$this->wars = $this->get_the_wp_terms( $params['war'], 'war' );
		$this->set_the_decorations( $params['decorations'] );
		$this->overseas_duty         = $this->handle_arrays( $params['overseas_duty'] );
		$this->stateside_assignments = $this->handle_arrays( $params['stateside_assignments'] );
		$this->jobs                  = $this->handle_arrays( $params['jobs'] );
		$this->advanced_training     = $this->handle_arrays( $params['advanced_training'] );
		$this->highest_achieved_rank = $params['highest_rank_achieved'] ? esc_textarea( $params['highest_rank_achieved'] ) : null;
		$this->military_units        = $this->handle_arrays( $params['military_units'] );
		if ( ! empty( $params['choctaw_veteran_of_the_month'] ) ) {
			$this->set_the_choctaw_veteran_of_the_month( $params['choctaw_veteran_of_the_month'] );
		} else {
			$this->choctaw_veteran_of_the_month = null;
		}
	}

	/**
	 * Gets the WP Term objects for a given array of lookups
	 *
	 * @param array  $lookups the array of terms to search for
	 * @param string $taxonomy the taxonomy to search
	 * @return \WP_Term[]|null
	 */
	private function get_the_wp_terms( array $lookups, string $taxonomy ): ?array {
		$selected = array_filter(
			$lookups,
			function ( $value ) {
				if ( $value ) {
					return $value;
				}
			}
		);
		$wp_terms = array();
		foreach ( $selected as $lookup ) {
			$term = get_term_by( 'name', $lookup, $taxonomy );
			if ( $term ) {
				$wp_terms[] = $term;
			}
		}
		return empty( $wp_terms ) ? null : $wp_terms;
	}

	/**
	 * Prepares the decorations data to be used as a constructor for the Decorations class
	 *
	 * @param array $params the $_POST data
	 */
	private function set_the_decorations( array $params ) {
		$decorations                = array(
			'decorations'            => array(),
			'additional_decorations' => $this->flatten_array( $params['additional_decorations'] ),
		);
		$decorations['decorations'] = $this->get_the_wp_terms( $params['decorations'], 'decoration' );

		if ( empty( $decorations['decorations'] ) && $this->is_empty_array( $decorations['additional_decorations'] ) ) {
			$this->decorations = null;
		} else {
			$this->decorations = new Decorations( $decorations );
		}
	}

	/**
	 * Checks if an array's values are empty
	 *
	 * @param array $arr the array to check
	 */
	private function is_empty_array( array $arr ) {
		if ( empty( $arr ) ) {
			return true;
		}
		$is_empty = array();
		foreach ( $arr as $item ) {
			$is_empty[] = empty( $item ) ? 1 : 0;
		}
		return array_unique( $is_empty ) === array( 1 );
	}

	/**
	 * Flattens and escapes array values
	 *
	 * @param array $user_input the array to escape
	 */
	private function handle_arrays( array $user_input ): ?array {
		$flat_array = $this->flatten_array( $user_input );
		if ( $this->is_empty_array( $flat_array ) ) {
			return null;
		}
		$escaped = array();
		foreach ( $flat_array as $value ) {
			$escaped[] = esc_textarea( $value );
		}
		return $escaped;
	}

	/**
	 * Flattens a multidimensional array
	 *
	 * @param array $arr the array to flatten
	 */
	private function flatten_array( array $arr ): array {
		$flat_array = array();
		foreach ( $arr as $item ) {
			if ( is_array( $item ) ) {
				$flat_array = array_merge( $flat_array, $this->flatten_array( $item ) );
			} else {
				$flat_array[] = $item;
			}
		}
		return $flat_array;
	}

	/**
	 * Sets the Choctaw Veteran of the Month data
	 *
	 * @param array $nominations the $_POST data
	 */
	private function set_the_choctaw_veteran_of_the_month( array $nominations ) {
		foreach ( $nominations as $nomination ) {
			if ( $this->is_empty_array( $nomination ) ) {
				$this->choctaw_veteran_of_the_month = null;
			} else {
				$this->choctaw_veteran_of_the_month[] = new Choctaw_Veteran_Of_The_Month( $nomination );
			}
		}
	}

	/**
	 * Sets the additional materials and inits the $has_media_material property
	 *
	 * @param array $materials the $_POST data
	 */
	private function handle_the_additional_materials( array $materials ) {
		$this->has_media_material = $materials['media_material'];
		foreach ( $materials['links'] as $link ) {
			$this->additional_materials[] = new Additional_Material( $link );

		}
	}

	/**
	 * Sets the contact info
	 *
	 * @param array $acf the $_POST data
	 */
	private function set_contact_info( array $acf ) {
		$this->user_name  = esc_textarea( $acf['name'] );
		$this->user_email = sanitize_email( $acf['email'] );
	}

	/**
	 * Create a new veteran post type. Returns the post ID on success or a WP_Error object on failure
	 */
	private function create_veteran(): int|\WP_Error {
		$post_title = "{$this->first_name} {$this->last_name}";
		return wp_insert_post(
			array(
				'post_title' => $post_title,
				'post_type'  => 'veteran',
			),
			true
		);
	}
}
