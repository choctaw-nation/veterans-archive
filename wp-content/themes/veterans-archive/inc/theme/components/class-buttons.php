<?php
/**
 * Class: Buttons
 * Generates Buttons
 *
 * @package ChoctawNation
 * @subpackage Components
 */

namespace ChoctawNation\Components;

/**
 * Button Generator
 */
class Buttons {
	private array $args;
	private string|array $container_class;
	private string $bg_color;

	/**
	 * Initializes the class properties
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string       $bg_color bootstrap color (e.g. `primary`, `secondary`) or hex code. **This is the color of the background the button sits on** for a "transparency" effect. Essentially, it creates the "gap" in the border of the button.
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	private function init_props( $args, string $bg_color, string|array $container_class = '' ) {
		$this->set_the_bg_color( $bg_color );
		$this->args            = $args;
		$this->container_class = $container_class;
	}

	/**
	 * Echoes the Button Component
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string       $bg_color bootstrap color (e.g. `primary`, `secondary`) or hex code. **This is the color of the background the button sits on** for a "transparency" effect. Essentially, it creates the "gap" in the border of the button.
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function the_button( array $args, string $bg_color, string|array $container_class = '' ): void {
		echo $this->get_the_button( $args, $bg_color, $container_class );
	}

	/**
	 * Returns the Button Component
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string       $bg_color bootstrap color (e.g. `primary`, `secondary`) or hex code. **This is the color of the background the button sits on** for a "transparency" effect. Essentially, it creates the "gap" in the border of the button.
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function get_the_button( array $args, string $bg_color, string|array $container_class = '' ): string {
		$this->init_props( $args, $bg_color, $container_class );
		return $this->get_the_button_container( $this->get_button() );
	}

	/**
	 * Sets the background color. Handles hex and bootstrap color names
	 *
	 * @param string $bg_color The background color
	 */
	private function set_the_bg_color( string $bg_color ) {
		$is_hex         = preg_match( '/^#[a-fA-F0-9]{6}$/', $bg_color );
		$this->bg_color = $is_hex ? $bg_color : "var(--bs-{$bg_color})";
	}

	/**
	 * Generates the Button container. Handles the background color and any positional classes
	 *
	 * @param string $inner_layers The inner button layers
	 */
	private function get_the_button_container( string $inner_layers ): string {
		$classes = array( 'btn-container', 'position-relative' );
		if ( $this->container_class && is_string( $this->container_class ) ) {
			$classes = array_unique( array_merge( $classes, explode( ' ', $this->container_class ) ) );
		}
		$classes = join( ' ', $classes );
		$markup  = "<div class='{$classes}' style='color:{$this->bg_color};'>" . $this->get_the_clip_path() . $inner_layers . '</div>';
		return $markup;
	}

	/**
	 * Generates the button element
	 */
	private function get_button() {
		$classes = 'btn btn-lg text-uppercase display-6 fs-5' . ( isset( $this->args['class'] ) ? ' ' . $this->args['class'] : '' );
		switch ( $this->args['element'] ) {
			case 'input':
				return $this->get_the_input( $classes );
			case 'a':
				return $this->get_the_anchor( $classes );
			default:
				return "<{$this->args['element']} class='{$classes}'>{$this->args['text']}</{$this->args['element']}>";
		}
	}

	/**
	 * Generates the "clip path" layer for the button
	 */
	private function get_the_clip_path(): string {
		$clip = '<div class="btn-lower position-absolute top-0 w-100 h-100 z-1"></div>';
		return $clip;
	}

	/**
	 * Generates the input element
	 *
	 * @param string $classes The classes for the input element
	 */
	private function get_the_input( $classes ): string {
		$element = "<{$this->args['element']} type='{$this->args['type']}' class='{$classes}' value='{$this->args['value']}'";

		$attribute = $this->get_the_attribute( 'aria-label' );
		if ( $attribute ) {
			$element .= " {$attribute}";
		}

		$element .= '/>';
		return $element;
	}

	/**
	 * Generates the anchor element
	 *
	 * @param string $classes The classes for the anchor element
	 */
	private function get_the_anchor( $classes ): string {
		$anchor     = "<{$this->args['element']} href='{$this->args['href']}' class='{$classes}'";
		$attributes = array(
			'target',
			'rel',
			'aria-label',
		);
		foreach ( $attributes as $attr ) {
			$attribute = $this->get_the_attribute( $attr );
			if ( $attribute ) {
				$anchor .= " {$attribute}";
			}
		}

		$anchor .= ">{$this->args['text']}</{$this->args['element']}>";
		return $anchor;
	}

	/**
	 * Generates the attribute for the element
	 *
	 * @param string $attr The attribute to generate
	 */
	private function get_the_attribute( string $attr ): ?string {
		if ( isset( $this->args[ $attr ] ) ) {
			return "{$attr}='{$this->args[$attr]}'";
		}
		return null;
	}
}
