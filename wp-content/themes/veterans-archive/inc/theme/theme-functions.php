<?php
/**
 * The global helper functions to use
 *
 * @since 1.3
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Veteran_Data_Types\Additional_Material;

/**
 * Builds the Additional Materials button arguments to dynamically populate a modal's content
 *
 * @param Additional_Material $additional_material The Veteran's additional material data
 */
function cno_build_veteran_button_args( Additional_Material $additional_material ): array {
	$material_type   = $additional_material->type['value'];
	$is_text_or_link = 'text' === $material_type || 'link' === $material_type;
	$label           = $additional_material->type['label'];

	$btn_args = $is_text_or_link ?
	array(
		'href'    => $additional_material->url,
		'target'  => '_blank',
		'rel'     => 'noopener noreferrer',
		'element' => 'a',
	) :
	array(
		'element'    => 'button',
		'attributes' => array(
			'type'           => 'button',
			'data-bs-toggle' => 'modal',
			'data-bs-target' => '#additional-materials-modal',
			'data-cno-type'  => $material_type,
			'data-cno-title' => $additional_material->description,
		),
	);

	switch ( $material_type ) {
		case 'audio':
			$btn_args['attributes']['data-cno-src'] = wp_json_encode( $additional_material->url );
			break;
		case 'photo-gallery':
			$btn_args['attributes']['data-cno-src'] = wp_json_encode( $additional_material->photo_gallery, );
			break;
	}
	$btn_args['class'] = 'btn-outline-primary';
	$btn_args['text']  = 'Audio' === $label ? "Listen to {$label} clip" : "View {$label}";
	return $btn_args;
}


/**
 * Enqueues the page style.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_style( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";
	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_unique( array_merge( $deps, array( 'global' ) ) );
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$total_deps,
			$asset['version'],
		);

	} else {
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.css" )
		);
	}
}

/**
 * Enqueues the page script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_script( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";

	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_merge( $asset['dependencies'], $deps, array( 'global' ) );
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$total_deps,
			$asset['version'],
			array( 'strategy' => 'defer' )
		);
	} else {
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.js" ),
			array( 'strategy' => 'defer' )
		);
	}
}

/**
 * Enqueues both the page style and script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Associative array of dependencies for styles and scripts.
 */
function cno_enqueue_page_assets( string $id, array $deps = array() ) {
	$default_deps = array(
		'styles'  => array( 'global' ),
		'scripts' => array( 'global' ),
	);

	$deps = wp_parse_args( $deps, $default_deps );

	cno_enqueue_page_style( $id, $deps['styles'] );
	cno_enqueue_page_script( $id, $deps['scripts'] );
}

/** Sets Yoast to bottom of Custom Fields */
add_filter(
	'wpseo_metabox_prio',
	function (): string {
		return 'low';
	}
);
