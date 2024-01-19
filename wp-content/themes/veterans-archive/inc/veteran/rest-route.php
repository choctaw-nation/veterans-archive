<?php
/**
 * Veteran Rest API Route Handler
 *
 * TODO: #4 Convert this into a class
 *
 * @see https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/#examples
 *
 * @package ChoctawNation
 */

use ChoctawNation\Veteran_Factory;

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'veterans-archive/v1',
			'/veterans',
			array(
				'methods'             => array( WP_REST_Server::CREATABLE ),
				'callback'            => 'cno_create_veteran',
				'permission_callback' => '__return_true',
			)
		);
	}
);

/**
 * Callback function for the veteran rest api route
 *
 * @param WP_REST_Request $request The request object
 */
function cno_create_veteran( WP_REST_Request $request ) {
	// Get the request parameters
	$params = $request->get_params();

	// Create a new veteran post type
	$veteran = new Veteran_Factory( $params );

	if ( $veteran->id ) {
		$data = array(
			'status'  => 'ok',
			'message' => 'Veteran post created successfully',
			'data'    => $veteran,
		);
		return new WP_REST_Response( $data, 200, array( 'Content-Type' => 'application/json' ) );

	} else {
		// Return an error message if the veteran post creation fails
		return new WP_Error(
			'create_veteran_post',
			'Failed to create veteran post',
			array(
				'data' => $params,
				'code' => 500,
			)
		);
	}
}
