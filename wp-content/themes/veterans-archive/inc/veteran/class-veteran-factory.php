<?php
/**
 * Class: Veteran Factory
 * Creates a Veteran Post Type sets its ACF fields accordingly
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

/**
 * Veteran Factory
 */
class Veteran_Factory extends Veteran_Data {
	/**
	 * The veteran post ID
	 *
	 * @var int
	 */
	public $id;


	public function __construct( array $params ) {
		$this->init_props( $params );
		$id       = $this->create_veteran();
		$this->id = $id;
		if ( $this->id ) {
			$this->set_acf_fields();
		}
	}

	/**
	 * Secures the data (sanitize and esc) and initialize the class properties
	 *
	 * @param array $params the $_POST data
	 */
	private function init_props( array $params ) {
	}

	/**
	 * Create a new veteran post type
	 */
	private function create_veteran() {
		return wp_insert_post(
			array(
				'post_title' => "{$this->params['bio']['firstName']} {$this->params['bio']['lastName']}",
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
