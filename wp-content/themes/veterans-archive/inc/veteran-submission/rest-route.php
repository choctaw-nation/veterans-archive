<?php
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'veterans-archive/v1',
			'/veterans',
			array(
				'methods'  => array( WP_REST_Server::READABLE, WP_REST_Server::CREATABLE ),
				'callback' => 'create_veteran',
			)
		);
	}
);

function create_veteran( WP_REST_Request $request ) {
	// Get the request parameters
	$params = $request->get_params();

	// Create a new veteran post type
	$veteran_id = wp_insert_post(
		array(
			'post_title' => $params['title'],
			'post_type'  => 'veteran',
		)
	);

	if ( $veteran_id ) {
		// Return the newly created veteran post ID
		return array( 'veteran_id' => $veteran_id );
	} else {
		// Return an error message if the veteran post creation fails
		return new WP_Error( 'create_veteran_failed', 'Failed to create veteran post', array( 'status' => 500 ) );
	}
}
