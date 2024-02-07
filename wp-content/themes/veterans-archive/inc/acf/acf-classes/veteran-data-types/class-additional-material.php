<?php
/**
 * Class: Additional Materials
 *
 * @package ChoctawNation
 * @subpackage ACF\Veteran_Data_Types
 */

namespace ChoctawNation\ACF\Veteran_Data_Types;

/**
 * Class Additional_Material
 * Data type for additional materials
 */
class Additional_Material {
	/**
	 * Description of material
	 *
	 * @var string $description
	 */
	public ?string $description;

	/**
	 * Type of material as an array
	 *
	 * @var ?array $type
	 */
	public ?array $type;

	/**
	 * URL of material
	 *
	 * @var ?string $url
	 */
	public ?string $url;

	/**
	 * Array of URLs for photo gallery
	 *
	 * @var string[]|null $photo_gallery
	 */
	public ?array $photo_gallery;

	/**
	 * URL of video
	 *
	 * @var ?string $video
	 */
	public ?string $video;

	/**
	 * Constructor
	 *
	 * @param array $acf ACF data
	 */
	public function __construct( array $acf ) {
		$this->description = esc_textarea( $acf['description_of_material'] );
		$this->type        = $acf['material_type'];
		$this->set_the_url( $acf );
		if ( ! empty( $acf['photo_gallery'] ) ) {
			foreach ( $acf['photo_gallery'] as $photo ) {
				$this->photo_gallery[] = array(
					'url'    => esc_url( $photo['url'] ),
					'alt'    => esc_attr( $photo['alt'] ),
					'srcset' => wp_get_attachment_image_srcset( $photo['ID'] ),
				);
			}
		} else {
			$this->photo_gallery = null;
		}
		if ( ! empty( $acf['video'] ) ) {
			$this->video = $acf['video'];
		} else {
			$this->video = null;
		}
	}

	/**
	 * Gets the icon
	 */
	public function get_the_icon(): string {
		switch ( $this->type['value'] ) {
			case 'audio':
				return '<i class="fa-2xl fa-solid fa-volume-high"></i>';
			case 'photo-gallery':
				return '<i class="fa-2xl fa-solid fa-images"></i>';
			case 'text':
				return '<i class="fa-2xl fa-solid fa-file-pdf"></i>';
			case 'video':
				return '<i class="fa-2xl fa-solid fa-video"></i>';
			default:
				return '<i class="fa-2xl fa-solid fa-link"></i>';
		}
	}

	/**
	 * Echoes the additional material icon
	 */
	public function the_icon() {
		echo $this->get_the_icon();
	}

	/**
	 * Gets the title
	 */
	public function get_the_title() {
		return $this->description;
	}

	/**
	 * Echoes the title
	 */
	public function the_title() {
		echo $this->get_the_title();
	}

	public function get_the_modal_button() {
			$material_type   = $this->type['value'];
			$is_text_or_link = 'text' === $material_type || 'link' === $material_type;
			$label           = $this->type['label'];

			$btn_args = $is_text_or_link ?
			array(
				'href'    => $this->url,
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
					'data-cno-title' => $this->description,
				),
			);

			switch ( $material_type ) {
				case 'audio':
					$btn_args['attributes']['data-cno-src'] = wp_json_encode( $this->url );
					break;
				case 'photo-gallery':
					$btn_args['attributes']['data-cno-src'] = wp_json_encode( $this->photo_gallery, );
					break;
				case 'video':
					$btn_args['attributes']['data-cno-src'] = wp_json_encode( $this->video, );
					break;
			}
			$btn_args['class'] = 'btn-outline-primary';
			$btn_args['text']  = 'Audio' === $label ? "Listen to {$label} clip" : "View {$label}";
			return $btn_args;
	}

	/**
	 * Sets the URL
	 *
	 * @param array $acf ACF data
	 */
	private function set_the_url( array $acf ) {
		if ( ! empty( $acf['material_url'] ) ) {
			$this->url = esc_url( $acf['material_url'] );
		} elseif ( ! empty( $acf['pdf'] ) ) {
			$this->url = esc_url( $acf['pdf'] );
		} elseif ( ! empty( $acf['audio_file'] ) ) {
			$this->url = esc_url( $acf['audio_file']['url'] );
		} else {
			$this->url = null;
		}
	}
}
