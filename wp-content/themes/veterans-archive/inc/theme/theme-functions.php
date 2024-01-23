<?php
/**
 * The global helper functions to use
 *
 * @since 1.3
 * @package ChoctawNation
 */

/**
 * Returns/echoes a Divider Component
 *
 * @param "start"|"end" $direction [Optional] The direction of the divider.
 * @param string        $color [Optional] The color of the divider (maps to Bootstrap theme colors).
 * @param string|array  $additional_classes [Optional] Additional classes to add to the component.
 * @param bool          $should_echo [Optional] Whether to echo or return the component.
 */
function cno_divider( string $direction = 'start', string $color = 'green', string|array $additional_classes = null, bool $should_echo = true ) {
	if ( 'start' !== $direction && 'end' !== $direction ) {
		return;
	}
	$direction = 'end' === $direction ? ' order-last' : '';
	$classes   = array( 'divider', "divider-{$color}" );
	if ( is_string( $additional_classes ) ) {
		$classes[] = $additional_classes;
	} elseif ( is_array( $additional_classes ) ) {
		$classes = array_merge( $classes, $additional_classes );
	}
	$classes = join( ' ', $classes );
	$divider = "
	<div class='{$classes}'>
		<div class='divider__line{$direction}'></div>
		<div class='divider__dots-container'>
			<div class='divider__dot'></div>
			<div class='divider__dot'></div>
		</div>
	</div>";
	if ( $should_echo ) {
		echo $divider;
	} else {
		return $divider;
	}
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
