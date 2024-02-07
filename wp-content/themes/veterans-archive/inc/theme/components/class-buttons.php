<?php
/**
 * Class: Buttons
 * Generates Buttons
 *
 * @see https://github.com/choctaw-nation/veterans-archive/wiki#custom-buttons
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

	/**
	 * Initializes the class properties
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	private function init_props( array $args, string|array $container_class = '' ) {
		$this->args            = $args;
		$this->container_class = $container_class;
	}

	/**
	 * Echoes the Button Component
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function the_button( array $args, string|array $container_class = '' ): void {
		echo $this->get_the_button( $args, $container_class );
	}

	/**
	 * Returns the Button Component
	 *
	 * @param array        $args contains all the args the element might have (depending on the element).
	 * @param string|array $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function get_the_button( array $args, string|array $container_class = '' ): string {
		$this->init_props( $args, $container_class );
		return $this->get_the_button_container( $this->get_button() );
	}

	/**
	 * Returns the Tab Button Component
	 *
	 * @param string $id              The id of the tab
	 * @param string $text            The text of the tab
	 * @param bool   $is_active       [Optional] Whether the tab is active
	 * @param string $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function get_the_tab_button( string $id, string $text, bool $is_active = false, string $container_class = '' ) {
		$this->init_props(
			array(
				'class' => ( $is_active ? 'border-dark-blue ' : '' ) . 'btn-outline-primary',
			),
			$container_class
		);
		$this->container_class .= 'align-items-stretch';
		$classes                = array(
			'nav-link',
			'btn',
			'btn-outline-primary',
			'text-uppercase',
			'display-6',
			'fs-5',
			'border-0',
			'z-2',
			'mb-0',
		);
		$classes[]              = $is_active ? 'active' : '';
		$classes                = join( ' ', $classes );
		$tab_button             = "<button role='tab' type='button' data-bs-toggle='tab' class='{$classes}' aria-controls='{$id}-tab-pane'  id='{$id}-tab' data-bs-target='#{$id}-tab-pane'";
		$tab_button            .= $is_active ? "aria-selected='true'" : "aria-selected='false'";
		$tab_button            .= ">{$text}</button>";
		return $this->get_the_button_container( $tab_button );
	}

	/**
	 * Echoes the Tab Button Component
	 *
	 * @param string $id        The id of the tab
	 * @param string $text      The text of the tab
	 * @param bool   $is_active [Optional] Whether the tab is active
	 * @param string $container_class [Optional] for positioning (e.g. `ms-2` or `my-5`)
	 */
	public function the_tab_button( string $id, string $text, bool $is_active = false, $container_class = '' ) {
		echo $this->get_the_tab_button( $id, $text, $is_active, $container_class );
	}

	/**
	 * Generates the Button container. Handles the background color and any positional classes
	 *
	 * @param string $inner_layers The inner button layers
	 */
	private function get_the_button_container( string $inner_layers ): string {
		$classes = array(
			'btn-container',
			'position-relative',
			'd-inline-flex',
			'justify-content-center',
			'align-items-center',
			'p-1',
		);
		if ( $this->container_class && is_string( $this->container_class ) ) {
			$classes = array_unique( array_merge( $classes, explode( ' ', $this->container_class ) ) );
		}
		$classes = join( ' ', $classes );
		$markup  = "<div class='{$classes}'>" . $this->get_the_clip_path() . $inner_layers . '</div>';
		return $markup;
	}

	/**
	 * Generates the button element
	 */
	private function get_button() {
		$classes = array(
			'btn',
			'text-uppercase',
			'display-6',
			'fs-5',
			'z-2',
			'w-100',
		);
		if ( isset( $this->args['class'] ) ) {
			$classes = array( ...$classes, $this->args['class'], 'border-0' );
			if ( strrpos( $this->args['class'], 'light' ) ) {
				$classes[] = str_replace( 'btn-outline', 'text', $this->args['class'] );
			}
			if ( strrpos( $this->args['class'], 'dark' ) ) {
				$classes[] = str_replace( 'btn-outline', 'text', $this->args['class'] );
			}
		}
		$classes = join( ' ', $classes );

		switch ( $this->args['element'] ) {
			case 'input':
				return $this->get_the_input( $classes );
			case 'a':
				return $this->get_the_anchor( $classes );
			default:
				return $this->get_the_element( $classes );
		}
	}

	/**
	 * Generates the "clip path" layer for the button
	 */
	private function get_the_clip_path(): string {
		$classes = $this->args['class'] . ' btn btn-lower position-absolute top-0 w-100 h-100 z-1';
		$clip    = "<div class='{$classes}'></div>";
		return $clip;
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
	 * Generates the element
	 *
	 * @param string $classes The classes for the element
	 */
	private function get_the_element( $classes ): string {
		$element = "<{$this->args['element']} class='{$classes}'";
		if ( isset( $this->args['attributes'] ) ) {
			foreach ( $this->args['attributes'] as $attr => $value ) {
				$element .= " {$attr}='{$value}'";
			}
		}
		$element .= ">{$this->args['text']}</{$this->args['element']}>";
		return $element;
	}
}
