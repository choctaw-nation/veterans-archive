<?php
/**
 * Class: ACF Setter
 * Used by Veteran Factory to set ACF fields
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

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

	private array $errors;

	/**
	 * Constructor
	 *
	 * @param int $id the veteran post ID
	 */
	public function __construct( int $id ) {
		$this->id = $id;
	}

	/**
	 * Checks if there are any errors
	 *
	 * @return bool
	 */
	public function has_errors(): bool {
		return ( is_array( $this->errors ) && ! empty( $this->errors ) );
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
	private function log_error( string $message, array $data ) {
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
	}

	private function set_the_acf_bio_fields( Veteran_Factory $data ) {
		// $group_key  = 'field_65a04a5814fe4';
		$sub_fields = array(
			'field_65a04a8114fe5' => $data->gender,
			'field_65a05f50b107b' => $data->middle_name,
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
		);
		$suffix     = array(
			'key'           => 'field_65a151793506d',
			'value'         => $data->suffix,
			'handle_lookup' => array(
				'lookup' => 'choices',
			),
		);
		// if ( isset( $acf_field['handle_lookup'] ) ) {
		// $acf_field['value'] = $this->handle_acf_field_lookup( $acf_field );
		// }
		foreach ( $sub_fields as $key => $value ) {
			$value  = $value ?: '';
			$status = update_field( $key, $value, $this->id );
			if ( ! $status ) {
				$this->log_error( 'Error updating the "Bio" fields', $sub_fields );
			}
		}
	}

	/**
	 * Gets the Field Object and returns the key if the value is found in the lookup, else creates a new choice
	 *
	 * @param array $field the field to lookup
	 * @return string
	 */
	private function handle_acf_field_lookup( array $field ) {
		switch ( $field['handle_lookup']['lookup'] ) {
			case 'choices':
				return $this->handle_acf_choices( $field );
			case 'repeater':
				return $this->handle_acf_repeater( $field );
		}
	}

	/**
	 * Gets the Field Object and returns the key if the value is found in the lookup, else creates a new choice
	 *
	 * @param array $field the field to lookup
	 * @return string
	 */
	private function handle_acf_choices( array $field ) {
		$acf_field = get_field_object( $field['key'], false, false );
		if ( $acf_field ) {
			$choices = $acf_field[ $field['handle_lookup']['lookup'] ];
			array_values( $choices );
			$key = array_search( $field['value'], array_column( $choices, 'value' ), true );
			if ( $key ) {
				return $key;
			} else {
				return $field['value'];
			}
		}
	}

	/**
	 * Gets the Field Object and returns the key if the value is found in the lookup, else creates a new choice
	 *
	 * @param array $field the field to lookup
	 * @return string
	 */
	private function handle_acf_repeater( array $field ) {
		$acf_field = get_field_object( $field['key'], false, false );
		if ( $acf_field ) {
			$choices = $acf_field[ $field['handle_lookup']['lookup'] ];
			array_values( $choices );
			$key = array_search( $field['value'], array_column( $choices, 'value' ), true );
			if ( $key ) {
				return $key;
			} else {
				return $field['value'];
			}
		}
	}
}
