<?php
/**
 * Class: Veteran Factory
 * Creates a Veteran Post Type sets its ACF fields accordingly
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
	 * @var int
	 */
	public $id;

	/**
	 * Consent to publish given
	 *
	 * @var bool $consent_given
	 */
	public bool $consent_given;

	public string $first_name;
	public string $last_name;

	public bool $has_media_material;
	public string $user_name;
	public string $user_email;

	public function __construct( array $params ) {
		$this->init_props( $params );
		// $id       = $this->create_veteran();
		$id       = 0;
		$this->id = $id;
		if ( $this->id ) {
			$this->set_acf_fields();
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
			foreach ( $params['choctaw_veteran_of_the_month'] as $nomination ) {
				$this->choctaw_veteran_of_the_month[] = new Choctaw_Veteran_Of_The_Month( $nomination );
			}
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
			'additional_decorations' => $params['additional_decorations'],
		);
		$decorations['decorations'] = $this->get_the_wp_terms( $params['decorations'], 'decoration' );

		if ( empty( $decorations['decorations'] ) && empty( $decorations['additional_decorations'] ) ) {
			$this->decorations = null;
		} else {
			$this->decorations = new Decorations( $decorations );
		}
	}

	/**
	 * Escapes array values
	 *
	 * @param array $user_input the array to escape
	 */
	private function handle_arrays( array $user_input ): ?array {
		$escaped = array();
		foreach ( $user_input as $value ) {
			$escaped[] = esc_textarea( $value );
		}
		return $escaped;
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
	 * Create a new veteran post type
	 */
	private function create_veteran() {
		$post_title = "{$this->first_name} {$this->last_name}";
		return wp_insert_post(
			array(
				'post_title' => $post_title,
				'post_type'  => 'veteran',
			)
		);
	}

	/**
	 * Set the ACF fields for the veteran post type
	 */
	private function set_acf_fields() {
	}
}
