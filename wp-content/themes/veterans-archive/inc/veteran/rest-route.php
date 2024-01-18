<?php
/**
 * Veteran Rest API Route Handler
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
				'methods'  => array( WP_REST_Server::READABLE, WP_REST_Server::CREATABLE ),
				'callback' => 'cno_create_veteran',
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
	$veteran_id = cno_create_the_veteran_post( $params );

	if ( $veteran_id ) {
		$return_value = json_encode( array( 'veteran_id' => $veteran_id ) );
		// Return the newly created veteran post ID
		return $return_value;
	} else {
		// Return an error message if the veteran post creation fails
		return new WP_Error( 500, 'Failed to create veteran post', array( 'data' => $params ) );
	}
}


/**
 * Create a new veteran post type
 *
 * @param array $params The request parameters
 */
function cno_create_the_veteran_post( $params ): int {
	$veteran    = new Veteran_Factory( $params );
	$veteran_id = $veteran->id;
	return $veteran_id;
}
