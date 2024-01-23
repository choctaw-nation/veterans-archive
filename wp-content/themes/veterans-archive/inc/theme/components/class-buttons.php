<?php
/**
 * Class: Buttons
 * Generates Buttons
 *
 * @package ChoctawNation
 * @subpackage Components
 */

namespace ChoctawNation\Components;

class Buttons {
	public function the_button(
		array $element = array(
			'type'   => 'a',
			'href'   => '#',
			'target' => '_self',
		),
		$text = '',
		$colors = array(
			'border' => '',
			'bg'     => '',
			'text'   => '',
		)
	): void {
		echo $this->get_the_button( $element, $text, $colors );
	}

	public function get_the_button(
		array $element = array(
			'type'   => 'a',
			'href'   => '#',
			'target' => '_self',
		),
		$text = '',
		$colors = array(
			'border' => '',
			'bg'     => '',
			'text'   => '',
		)
	): string {
		$markup = '';
		if ( empty( $element['class'] ) ) {
			$element['class'] = '';
		}
		$markup .= $this->get_button( $element, $text );
		return $markup;
	}

	private function get_the_button_container( $inner_layers ): string {
		$markup = "<div class='btn-container'>{$inner_layers}</div>";
		return $markup;
	}

	private function get_button( $element, $text ) {
		switch ( $element['el'] ) {
			case 'input':
				return "<{$element['el']} type='{$element['type']}' class='{$element['class']}' value='{$element['value']}' />";
			case 'a':
				return "<{$element['el']} href='{$element['href']}' class='{$element['class']}'>{$text}</{$element['el']}>";
		}
	}
}
