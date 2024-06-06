<?php
/**
 * Veteran Rest API Route Handler
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use ChoctawNation\ACF\Veteran_Setter;
use ChoctawNation\Veteran_Factory;
use WP_Error;

/**
 * Veteran Rest API Route Handler
 */
class Veteran_Rest_Route extends \WP_REST_Controller {
	private int $transient_expiration = 60 * 60 * 24; // 24 hours

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
				'permission_callback' => array( $this, 'create_veteran_permissions_check' ),
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
		$params  = $request->get_param( 'data' );
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
	 * Check if the current user can create a veteran post based on Google reCaptcha
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return bool|WP_Error Returns true if the user has permission, or false | WP_Error object if the user does not have permission.
	 */
	public function create_veteran_permissions_check( $request ): bool|WP_Error {
		$has_permission = false;
		$response       = wp_remote_post(
			'https://www.google.com/recaptcha/api/siteverify',
			array(
				'body' => array(
					'secret'   => RECAPTCHA_SECRET,
					'response' => $request->get_param( 'recaptcha' ),
				),
			)
		);
		if ( is_wp_error( $response ) ) {
			return $has_permission;
		} else {
			$response = json_decode( wp_remote_retrieve_body( $response ) );
			if ( $response->success && 'submit' === $response->action ) {
				if ( $response->score > 0.5 ) {
					$has_permission = true;
				} else {
					return new WP_Error( 'recaptcha_error', 'Your reCAPTCHA score is too low, so Google thinks you aren\'t a human.', array( 'status' => 403 ) );
				}
			}
		}
		return $has_permission;
	}

	/**
	 * Get veterans data
	 */
	public function get_veterans() {
		$current_post_count = wp_count_posts( 'veteran' )->publish;
		$cached_post_count  = get_transient( 'veteran_post_count' );
		$cached_data        = get_transient( 'veteran_data' );

		if ( ( ! $cached_post_count || ! $current_post_count !== $cached_post_count ) || ! $cached_data || empty( $cached_data['veterans'] ) ) {
			set_transient( 'veteran_post_count', $current_post_count, $this->transient_expiration );
			$this->set_veteran_data();
		}

		$cached_data = get_transient( 'veteran_data' );
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
				'order'          => 'ASC',
				'orderby'        => 'title',
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
			$veteran            = new Veteran_Setter( $acf_fields );
			$data['veterans'][] = array(
				'id'            => $post->ID,
				'title'         => $post->post_title,
				'permalink'     => get_permalink( $post->ID ),
				'vetData'       => $veteran,
				'featuredImage' => $this->get_the_veteran_thumbnail( $post->ID ),
				'vetIcon'       => $this->get_the_veteran_icon( $veteran ),
			);
		}

		set_transient( 'veteran_data', $data, $this->transient_expiration );
	}

	/**
	 * Get the veteran thumbnail
	 *
	 * @param int $post_id The veteran object.
	 */
	private function get_the_veteran_thumbnail( int $post_id ): string {
		$placeholder_image_id = 60;
		$image_size           = 'large';
		$image_args           = array(
			'loading' => 'lazy',
			'class'   => 'w-100 object-fit-cover',
		);
		return has_post_thumbnail( $post_id ) ? get_the_post_thumbnail(
			$post_id,
			$image_size,
			$image_args,
		) : wp_get_attachment_image( $placeholder_image_id, $image_size, false, $image_args );
	}

	/**
	 * Get the veteran branch of service icon
	 *
	 * @param Veteran_Setter $veteran The veteran object.
	 */
	private function get_the_veteran_icon( Veteran_Setter $veteran ): ?string {
		if ( $veteran->branches_of_service ) {
			$image = get_field( 'branch_icon', "military-branch_{$veteran->branches_of_service[0]->term_id}" );
			if ( ! $image ) {
				return null;
			}
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