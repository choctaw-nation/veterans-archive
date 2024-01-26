<?php
/**
 * Veteran Rest API Route Handler
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\Veteran_Factory;
/**
 * Veteran Rest API Route Handler
 */
class Veteran_Rest_Route extends \WP_REST_Controller {

	// phpcs:ignore
	public function register_routes() {
		$version   = '1';
		$namespace = 'veterans-archive/v' . $version;
		$base      = 'veterans';
		register_rest_route(
			$namespace,
			'/' . $base,
			array(
				'methods'             => array( \WP_REST_Server::CREATABLE ),
				'callback'            => array( $this, 'create_veteran' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Create a veteran post
	 *
	 * @param \WP_REST_Request $request The request object.
	 */
	public function create_veteran( $request ) {
		$params  = $request->get_params();
		$veteran = new Veteran_Factory( $params );
		$code    = 500;
		$data    = array(
			'data'   => $veteran,
			'status' => 'error',
		);
		if ( ! is_wp_error( $veteran->id ) ) {
			$data['status']  = 'ok';
			$data['message'] = 'Veteran post created successfully';
			$code            = 200;
			$emailer         = new Email_Generator( $veteran );
			$error           = $emailer->send_emails();
			if ( $error ) {
				$code            = 500;
				$data['status']  = 'error';
				$data['message'] = $error;
			}
		} else {
			return $veteran->id;
		}
		return new \WP_REST_Response( $data, $code, array( 'Content-Type' => 'application/json' ) );
	}
}
