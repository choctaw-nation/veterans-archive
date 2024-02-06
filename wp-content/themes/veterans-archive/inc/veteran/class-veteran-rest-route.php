<?php
/**
 * Veteran Rest API Route Handler
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\ACF\Veteran;
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

		register_rest_route(
			$namespace,
			'/' . $base,
			array(
				'methods'             => array( \WP_REST_Server::READABLE ),
				'callback'            => array( $this, 'get_veterans' ),
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

	/**
	 * Get veterans data
	 *
	 * @param \WP_REST_Request $request The request object.
	 */
	public function get_veterans( $request ) {
		// Check if the current post count of 'veteran' is equal to the cached post count
		$current_post_count = wp_count_posts( 'veteran' )->publish;
		$cached_post_count  = get_transient( 'veteran_post_count' );

		if ( ! $cached_post_count || $current_post_count !== $cached_post_count ) {
			// Update the post count transient
			set_transient( 'veteran_post_count', $current_post_count );

			// Set the veteran data to the cache
			$this->set_veteran_data();
		}
		// Get the cached data
		$cached_data = get_transient( 'veteran_data' );

		// Return the cached data
		return new \WP_REST_Response( $cached_data, 200, array( 'Content-Type' => 'application/json' ) );
	}

	/**
	 * Gets the veteran data and ACF data and caches the result
	 */
	public function set_veteran_data() {
		$posts = get_posts(
			array(
				'post_type'      => 'veteran',
				'posts_per_page' => -1,
			)
		);
		$data  = array(
			'searchFilters' => array(
				'wars'        => get_terms( 'war' ),
				'branches'    => get_terms( 'military-branch' ),
				'decorations' => get_terms( 'decoration' ),
			),
		);

		foreach ( $posts as $post ) {
			$acf_fields         = array(
				'bio'                      => get_field( 'bio', $post->ID ),
				'service_information'      => get_field( 'service_information', $post->ID ),
				'has_additional_materials' => get_field( 'has_additional_materials', $post->ID ),
				'additional_materials'     => get_field( 'additional_materials', $post->ID ),
			);
			$veteran            = new Veteran( $post->ID, $acf_fields );
			$data['veterans'][] = array(
				'title'         => $post->post_title,
				'permalink'     => get_permalink( $post->ID ),
				'vetData'       => $veteran,
				'featuredImage' => $this->get_the_veteran_thumbnail( $veteran ),
				'vetIcon'       => $this->get_the_veteran_icon( $veteran ),
			);
		}

		set_transient( 'veteran_data', $data );
	}

	/**
	 * Get the veteran thumbnail
	 *
	 * @param Veteran $veteran The veteran object.
	 */
	private function get_the_veteran_thumbnail( Veteran $veteran ): string {
		$placeholder_image_id = 60;
		$image_size           = 'large';
		$image_args           = array(
			'loading' => 'lazy',
			'class'   => 'w-100 object-fit-cover',
		);
		return has_post_thumbnail( $veteran->post_id ) ? get_the_post_thumbnail(
			$veteran->post_id,
			$image_size,
			$image_args,
		) : wp_get_attachment_image( $placeholder_image_id, $image_size, false, $image_args );
	}

	/**
	 * Get the veteran branch of service icon
	 *
	 * @param Veteran $veteran The veteran object.
	 */
	private function get_the_veteran_icon( Veteran $veteran ): ?string {
		if ( $veteran->branches_of_service ) {
			$image = get_field( 'branch_icon', "military-branch_{$veteran->branches_of_service[0]->term_id}" );
			$image = wp_get_attachment_image(
				$image['id'],
				'thumbnail',
				false,
				array(
					'class'   => 'object-fit-contain',
					'loading' => 'lazy',
					'style'   => 'filter:invert(1);width:7.5rem;height:7.5rem;',
				)
			);
			return $image;
		} else {
			return null;
		}
	}
}
